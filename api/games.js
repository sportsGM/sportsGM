
import * as cheerio from "cheerio";
import { LEAGUES, norm, demoGames, fetchSource } from "./_shared.js";

function splitPair(text){
 const cleaned=norm(text);
 for(const sep of [" vs "," VS "," @ "," 對 ","－","-"]){
  if(cleaned.includes(sep)){
   const p=cleaned.split(sep).map(norm).filter(Boolean);
   if(p.length>=2) return [p[0],p[1]];
  }
 }
 return null;
}

function parseGames(html, league){
 const $=cheerio.load(html);
 const out=[];
 $("tr").each((_,tr)=>{
  const cells=$(tr).find("td").map((i,td)=>norm($(td).text())).get().filter(Boolean);
  if(cells.length<3) return;
  const raw=cells.join(" | ");
  if(!/讓分|不讓分|大小|大分|小分|賠率|預測|盤/.test(raw)) return;

  let p=null;
  for(const c of cells){ p=splitPair(c); if(p) break; }

  if(!p){
   const teamLike=cells.filter(x =>
    x.length<=18 &&
    !/讓分|不讓分|大小|賠率|預測|時間|日期|先發|盤|主|客/.test(x) &&
    !/^\d+(\.\d+)?$/.test(x)
   );
   if(teamLike.length>=2) p=[teamLike[0],teamLike[1]];
  }
  if(!p) return;

  out.push({
   id:`${league}-${out.length}`,
   league,
   time:cells.find(x=>/\d{1,2}:\d{2}/.test(x)) || "待確認",
   awayTeam:p[0],
   homeTeam:p[1],
   matchup:`${p[0]} vs ${p[1]}`,
   handicapLine:cells.find(x=>/讓分|[+-]\d+(\.\d+)?/.test(x)) || "盤口解析中",
   totalLine:cells.find(x=>/大小|大\s*\d|小\s*\d|[0-9]+\.[05]/.test(x)) || "大小分解析中",
   raw:raw.slice(0,300)
  });
 });
 return out.slice(0,60);
}

export default async function handler(req,res){
 const key=String(req.query.league || "MLB").toUpperCase();
 const info=LEAGUES[key] || LEAGUES.MLB;

 try{
  const html=await fetchSource(info[1]);
  let games=parseGames(html,key);
  if(!games.length) games=demoGames(key);

  res.setHeader("cache-control","public, s-maxage=30, stale-while-revalidate=60");
  res.status(200).json({
   ok:true,
   league:key,
   leagueName:info[0],
   updatedAt:new Date().toISOString(),
   games
  });
 }catch(e){
  res.status(200).json({
   ok:false,
   league:key,
   leagueName:info[0],
   updatedAt:new Date().toISOString(),
   notice:"即時資料暫時讀取不到，先顯示備援賽事。",
   games:demoGames(key)
  });
 }
}
