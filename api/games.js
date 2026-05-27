
import * as cheerio from "cheerio";
import { LEAGUES, norm, demoGames, fetchSource, makeGame, json } from "./_shared.js";

function isTimeLine(s){ return /^(AM|PM)\s*\d{1,2}:\d{2}$/i.test(s); }
function isGameNo(s){ return /^\d{2,4}$/.test(s); }
function isTeamName(s){
  if(!s || s.length>18) return false;
  if(/對戰資訊|客|主|大|小|讓分|不讓分|大小|贏|輸|%|,|\d|AM|PM|預測|登入|日期|賽事/.test(s)) return false;
  if(/[A-Za-z]{3,}/.test(s)) return false;
  return /[\u4e00-\u9fff]/.test(s);
}
function firstAfter(lines,start,end,regex){
  for(let i=start;i<end;i++) if(regex.test(lines[i])) return lines[i];
  return "";
}
function parseFromText(html, league){
  const $=cheerio.load(html);
  const lines=$("body").text().split(/\n+/).map(norm).filter(Boolean);
  const out=[];
  for(let i=0;i<lines.length;i++){
    if(!isTimeLine(lines[i])) continue;
    const block=[];
    for(let j=i;j<Math.min(lines.length,i+45);j++){
      if(j>i && isGameNo(lines[j]) && isTimeLine(lines[j+1]||"")) break;
      if(j>i && isTimeLine(lines[j])) break;
      block.push(lines[j]);
    }
    const awayMarker=block.findIndex(x=>x==="客" || /^客\s/.test(x));
    const homeMarker=block.findIndex((x,idx)=>idx>awayMarker && (x==="主" || /^主\s/.test(x)));
    if(awayMarker<0 || homeMarker<0) continue;
    let awayTeam="";
    for(let k=awayMarker-1;k>=0;k--){ if(isTeamName(block[k])) { awayTeam=block[k]; break; } }
    let homeTeam="";
    for(let k=homeMarker-1;k>awayMarker;k--){ if(isTeamName(block[k])) { homeTeam=block[k]; break; } }
    if(!awayTeam || !homeTeam) continue;
    const awayPartEnd=homeMarker;
    const homePartEnd=block.length;
    const awayHandicap=firstAfter(block,awayMarker,awayPartEnd,/^客[+-]\d+(\.\d+)?,/);
    const awayMoneyline=firstAfter(block,awayMarker,awayPartEnd,/^客\s+\d+(\.\d+)?$/);
    const over=firstAfter(block,awayMarker,awayPartEnd,/^大\s*\d+(\.\d+)?,/);
    const homeHandicap=firstAfter(block,homeMarker,homePartEnd,/^主[+-]\d+(\.\d+)?,/);
    const homeMoneyline=firstAfter(block,homeMarker,homePartEnd,/^主\s+\d+(\.\d+)?$/);
    const under=firstAfter(block,homeMarker,homePartEnd,/^小\s*\d+(\.\d+)?,/);
    out.push(makeGame(league,out.length,[block[0], awayTeam, homeTeam, awayHandicap || "客盤解析中", homeHandicap || "主盤解析中", awayMoneyline || "客獨贏解析中", homeMoneyline || "主獨贏解析中", over || "大分解析中", under || "小分解析中"]));
  }
  return out;
}
export default async function handler(req,res){
 const key=String(req.query.league || "MLB").toUpperCase();
 const info=LEAGUES[key] || LEAGUES.MLB;
 try{
  const html=await fetchSource(info[1]);
  let games=parseFromText(html,key);
  if(!games.length) games=demoGames(key);
  res.setHeader("cache-control","public, s-maxage=30, stale-while-revalidate=60");
  return json(res,{ok:true,league:key,leagueName:info[0],updatedAt:new Date().toISOString(),games});
 }catch(e){
  return json(res,{ok:false,league:key,leagueName:info[0],updatedAt:new Date().toISOString(),notice:"即時資料暫時讀取不到，先顯示備援賽事。",games:demoGames(key)});
 }
}
