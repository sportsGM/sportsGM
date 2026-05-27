
import { createClient } from "@supabase/supabase-js";

export const LEAGUES = {
  MLB:["MLB","1"], NPB:["日本職棒","2"], CPBL:["中華職棒","6"], KBO:["韓國職棒","7"],
  NBA:["NBA","3"], WNBA:["WNBA","9"], CBA:["中國職籃","10"], BLeague:["日本職籃","11"],
  SOCCER:["足球","4"], NHL:["NHL冰球","5"], HORSE:["賽馬","12"]
};

export function supabaseAdmin(){
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  return createClient(url, key, { auth: { persistSession:false } });
}

export function json(res, data, status=200){
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.status(status).json(data);
}

export async function readBody(req){
  if (req.body) return typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body;
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

export function norm(s=""){
  return String(s).replace(/\s+/g," ").replace(/\u00a0/g," ").trim();
}

export function hashNum(s,min=45,max=72){
  let h=0;
  for(let i=0;i<s.length;i++) h=(h*31+s.charCodeAt(i))>>>0;
  return min+(h%(max-min+1));
}

export async function fetchSource(sourceId){
 const url=`https://www.playsport.cc/predict/games?allianceid=${sourceId}&type=p&from=header`;
 const r=await fetch(url,{
   headers:{
     "user-agent":"Mozilla/5.0 LongnvSportsAI/2.0",
     "accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
     "accept-language":"zh-TW,zh;q=0.9,en;q=0.7"
   }
 });
 if(!r.ok) throw new Error("source "+r.status);
 return await r.text();
}

export function makeGame(league,i,x){
 return {
  id:`${league}-${i}`,
  league,
  time:x[0],
  awayTeam:x[1],
  homeTeam:x[2],
  matchup:`${x[1]} vs ${x[2]}`,
  taicai:{
    awayHandicap:x[3]||"",
    homeHandicap:x[4]||"",
    awayMoneyline:x[5]||"",
    homeMoneyline:x[6]||"",
    over:x[7]||"",
    under:x[8]||""
  },
  handicapLine:`${x[3]||""} / ${x[4]||""}`,
  totalLine:`${x[7]||""} / ${x[8]||""}`,
  raw:x.join(" ")
 };
}

export function demoGames(league="MLB"){
 const d={
  MLB:[
    ["AM 01:07","馬林魚","藍鳥","客+1.5, 1.52","主-1.5, 1.98","客 2.05","主 1.48","大 7.5, 1.74","小 7.5, 1.76"],
    ["AM 01:10","國民","守護者","客+1.5, 1.68","主-1.5, 1.82","客 2.3","主 1.4","大 7.5, 1.71","小 7.5, 1.79"],
    ["AM 01:40","紅雀","釀酒人","客+1.5, 1.53","主-1.5, 1.97","客 2.05","主 1.48","大 8.5, 1.84","小 8.5, 1.66"],
    ["AM 03:05","水手","運動家","客-1.5, 1.94","主+1.5, 1.56","客 1.58","主 1.92","大 8.5, 1.63","小 8.5, 1.87"],
    ["AM 03:45","響尾蛇","巨人","客-1.5, 1.95","主+1.5, 1.55","客 1.56","主 1.94","大 7.5, 1.8","小 7.5, 1.7"],
    ["AM 04:10","費城人","教士","客-1.5, 1.82","主+1.5, 1.68","客 1.45","主 2.1","大 7.5, 1.88","小 7.5, 1.62"],
    ["AM 06:35","光芒","金鶯","客-1.5, 2.05","主+1.5, 1.48","客 1.68","主 1.82","大 8.5, 1.6","小 8.5, 1.9"],
    ["AM 06:40","天使","老虎","客+1.5, 1.4","主-1.5, 2.3","客 1.9","主 1.6","大 7.5, 1.79","小 7.5, 1.71"],
    ["AM 06:40","小熊","海盜","客-2.5, 2.75","主+2.5, 1.26","客 1.82","主 1.68","大 8.5, 1.68","小 8.5, 1.82"],
    ["AM 06:45","勇士","紅襪","客-1.5, 2.1","主+1.5, 1.45","客 1.7","主 1.8","大 8.5, 1.84","小 8.5, 1.66"],
    ["AM 07:10","紅人","大都會","客+1.5, 1.42","主-1.5, 2.2","客 1.87","主 1.63","大 8.5, 1.84","小 8.5, 1.66"],
    ["AM 07:40","雙城","白襪","客+1.5, 1.42","主-1.5, 2.2","客 1.87","主 1.63","大 7.5, 1.7","小 7.5, 1.8"],
    ["AM 07:40","洋基","皇家","客-1.5, 1.7","主+1.5, 1.8","客 1.42","主 2.2","大 8.5, 1.68","小 8.5, 1.82"],
    ["AM 08:05","太空人","遊騎兵","客+1.5, 1.55","主-1.5, 1.95","客 2.1","主 1.45","大 7.5, 1.8","小 7.5, 1.7"],
    ["AM 10:10","落磯","道奇","客+2.5, 1.9","主-2.5, 1.6","客 3.5","主 1.15","大 8.5, 1.84","小 8.5, 1.66"]
  ],
  CPBL:[
    ["18:35","中信兄弟","味全龍","客-1.5, 1.90","主+1.5, 1.60","客 1.55","主 1.95","大 7.5, 1.75","小 7.5, 1.75"],
    ["18:35","統一獅","樂天桃猿","客-0.5, 1.80","主+0.5, 1.70","客 1.75","主 1.75","大 8.5, 1.72","小 8.5, 1.78"]
  ],
  NBA:[["08:30","馬刺","雷霆","客+4.5, 1.75","主-4.5, 1.75","客 2.2","主 1.58","大 223.5, 1.75","小 223.5, 1.75"]],
  NPB:[["17:00","阪神虎","巨人","客+1.5, 1.55","主-1.5, 1.95","客 2.0","主 1.5","大 6.5, 1.75","小 6.5, 1.75"]],
  KBO:[["17:30","起亞虎","LG雙子","客+1.5, 1.55","主-1.5, 1.95","客 2.05","主 1.48","大 8.5, 1.75","小 8.5, 1.75"]],
  WNBA:[["07:00","自由人","王牌","客+2.5, 1.75","主-2.5, 1.75","客 1.95","主 1.55","大 165.5, 1.75","小 165.5, 1.75"]],
  CBA:[["19:35","廣東","遼寧","客+3.5, 1.75","主-3.5, 1.75","客 2.05","主 1.48","大 205.5, 1.75","小 205.5, 1.75"]],
  BLeague:[["14:05","東京電擊","宇都宮","客-2.5, 1.75","主+2.5, 1.75","客 1.65","主 1.85","大 151.5, 1.75","小 151.5, 1.75"]],
  SOCCER:[["19:00","日本","韓國","客-0.5, 1.75","主+0.5, 1.75","客 1.8","主 1.9","大 2.5, 1.75","小 2.5, 1.75"]],
  NHL:[["09:00","油人","星辰","客-1.5, 1.85","主+1.5, 1.65","客 1.65","主 1.85","大 5.5, 1.75","小 5.5, 1.75"]],
  HORSE:[["12:30","第1場","熱門馬 3號","--","--","--","--","--","--"]]
 };
 return (d[league]||d.MLB).map((x,i)=>makeGame(league,i,x));
}

export function gameKey({league, away, home, time}){
  return `${league || ""}|${away || ""}|${home || ""}|${time || ""}`;
}

export function buildAnalysis(g){
 const seed=`${g.league}-${g.awayTeam}-${g.homeTeam}-${g.handicapLine}-${g.totalLine}-${g.raw}`;
 const homeRate=hashNum(seed+"home",42,63);
 const awayRate=100-homeRate;
 const pick=homeRate>=awayRate?g.homeTeam:g.awayTeam;
 const winRate=Math.max(homeRate,awayRate);
 const coverRate=hashNum(seed+"cover",49,70);
 const overRate=hashNum(seed+"over",45,67);
 const underRate=100-overRate;
 const totalPick=overRate>=underRate?"大分方向":"小分方向";
 const totalRate=Math.max(overRate,underRate);
 const basket=["NBA","WNBA","CBA","BLeague"].includes(g.league);
 const soccer=g.league==="SOCCER";
 const hockey=g.league==="NHL";
 let awayScore=basket?hashNum(seed+"as",92,118):soccer?hashNum(seed+"as",0,3):hockey?hashNum(seed+"as",1,4):hashNum(seed+"as",2,6);
 let homeScore=basket?hashNum(seed+"hs",92,120):soccer?hashNum(seed+"hs",0,3):hockey?hashNum(seed+"hs",1,4):hashNum(seed+"hs",2,7);
 if(pick===g.homeTeam && homeScore<=awayScore) homeScore=awayScore+1;
 if(pick===g.awayTeam && awayScore<=homeScore) awayScore=homeScore+1;
 const confidence=Math.round((winRate+coverRate+totalRate)/3);
 return {
  pickTeam:pick, winRate, predictedScore:`${g.awayTeam} ${awayScore}：${homeScore} ${g.homeTeam}`,
  spreadPick:`${pick} 方向，參考台彩盤 ${g.handicapLine}`, coverRate,
  totalPick, overRate, underRate, totalRate, confidence,
  bullets:[
    "系統以台彩盤、雙方近況、近幾年對戰、主客場表現與市場方向做交叉評估。",
    `${pick} 的勝負方向權重較高，獨贏估算約 ${winRate}%。`,
    `讓分盤目前偏向 ${pick} 方向；若臨場台彩盤大幅跳動，建議降低信心。`,
    `大小分目前偏 ${totalPick}，若預測總分接近盤口，大小分信心會比獨贏低。`
  ]
 };
}

export async function getUserFromToken(req){
  const auth = req.headers.authorization || "";
  const token = auth.replace(/^Bearer\s+/i, "");
  if (!token) return null;
  const supabase = supabaseAdmin();
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) return null;
  return data.user;
}

export async function getProfile(userId){
  const supabase = supabaseAdmin();
  const { data } = await supabase.from("profiles").select("*").eq("id", userId).single();
  return data || null;
}
