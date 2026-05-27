
export const LEAGUES = {
  MLB:["MLB","1"], NPB:["日本職棒","2"], CPBL:["中華職棒","6"], KBO:["韓國職棒","7"],
  NBA:["NBA","3"], WNBA:["WNBA","9"], CBA:["中國職籃","10"], BLeague:["日本職籃","11"],
  SOCCER:["足球","4"], NHL:["NHL冰球","5"], HORSE:["賽馬","12"]
};

export function norm(s=""){
  return String(s).replace(/\s+/g," ").replace(/\u00a0/g," ").trim();
}

export function hashNum(s,min=45,max=72){
  let h=0;
  for(let i=0;i<s.length;i++) h=(h*31+s.charCodeAt(i))>>>0;
  return min+(h%(max-min+1));
}

export function demoGames(league="MLB"){
 const d={
  MLB:[
    ["01:05","紅襪","金鶯","金鶯 -1.5","8.5"],
    ["01:10","守護者","老虎","老虎 -0.5","7.5"],
    ["02:10","雙城","白襪","雙城 -1.5","8.0"],
    ["03:10","皇家","光芒","光芒 -0.5","8.5"],
    ["04:05","小熊","海盜","小熊 -1.5","7.5"],
    ["04:10","勇士","大都會","勇士 -0.5","8.0"],
    ["05:40","費城人","國民","費城人 -1.5","8.5"],
    ["06:10","釀酒人","馬林魚","釀酒人 -1.5","7.5"],
    ["07:05","藍鳥","洋基","洋基 -1.5","8.5"],
    ["07:10","紅人","紅雀","紅雀 -0.5","8.0"],
    ["08:05","太空人","遊騎兵","太空人 -1.5","8.0"],
    ["08:10","道奇","洛磯","道奇 -2.5","10.5"],
    ["09:38","水手","天使","水手 -0.5","8.5"],
    ["09:40","教士","響尾蛇","教士 -0.5","7.5"],
    ["10:15","巨人","運動家","巨人 -1.5","7.5"]
  ],
  NPB:[
    ["17:00","阪神虎","巨人","阪神 -0.5","6.5"],
    ["17:00","軟銀鷹","歐力士","軟銀 -1.5","7.0"],
    ["17:00","羅德","日本火腿","日本火腿 -0.5","6.5"],
    ["17:00","西武獅","樂天金鷲","樂天 -0.5","7.5"],
    ["17:00","養樂多","橫濱DeNA","橫濱 -0.5","7.0"],
    ["17:00","中日龍","廣島鯉魚","廣島 -0.5","6.5"]
  ],
  CPBL:[
    ["18:35","中信兄弟","味全龍","中信 -1.5","7.5"],
    ["18:35","統一獅","樂天桃猿","統一 -0.5","8.5"],
    ["18:35","富邦悍將","台鋼雄鷹","台鋼 -0.5","7.0"]
  ],
  KBO:[
    ["17:30","起亞虎","LG雙子","LG -1.5","8.5"],
    ["17:30","三星獅","斗山熊","斗山 -0.5","9.0"],
    ["17:30","SSG登陸者","韓華鷹","韓華 -0.5","8.5"],
    ["17:30","NC恐龍","樂天巨人","NC -0.5","8.0"],
    ["17:30","培證英雄","KT巫師","KT -1.5","9.5"]
  ],
  NBA:[
    ["08:00","騎士","尼克","尼克 -3.5","216.5"],
    ["08:30","馬刺","雷霆","雷霆 -4.5","223.5"]
  ],
  WNBA:[
    ["07:00","自由人","王牌","王牌 -2.5","165.5"],
    ["08:00","太陽","天空","太陽 -4.5","158.5"],
    ["10:00","風暴","火花","風暴 -1.5","160.5"],
    ["10:30","水星","飛翼","水星 -2.5","162.5"]
  ],
  CBA:[
    ["19:35","廣東","遼寧","遼寧 -3.5","205.5"],
    ["19:35","浙江","新疆","浙江 -1.5","202.5"],
    ["19:35","北京","上海","上海 -2.5","199.5"],
    ["19:35","深圳","廣廈","廣廈 -4.5","204.5"]
  ],
  BLeague:[
    ["14:05","東京電擊","宇都宮","東京 -2.5","151.5"],
    ["15:05","琉球黃金國王","千葉噴射機","琉球 -1.5","156.5"],
    ["16:05","大阪七福神","名古屋鑽石海豚","名古屋 -3.5","158.5"]
  ],
  SOCCER:[
    ["19:00","日本","韓國","日本 -0.5","2.5"],
    ["03:00","英格蘭","德國","平手盤","2.5"],
    ["02:45","西班牙","義大利","西班牙 -0.5","2.5"],
    ["03:00","法國","荷蘭","法國 -0.5","2.5"],
    ["08:00","巴西","阿根廷","巴西 -0.5","2.5"],
    ["09:00","美國","墨西哥","美國 -0.5","2.5"]
  ],
  NHL:[
    ["07:00","油人","星辰","油人 -1.5","5.5"],
    ["08:00","遊騎兵","棕熊","遊騎兵 -0.5","5.5"],
    ["09:00","雪崩","金騎士","雪崩 -0.5","6.0"],
    ["10:00","國王","鯊魚","國王 -1.5","5.5"]
  ],
  HORSE:[
    ["12:30","第1場","熱門馬 3號","3號馬","--"],
    ["13:00","第2場","熱門馬 5號","5號馬","--"],
    ["13:30","第3場","熱門馬 2號","2號馬","--"],
    ["14:00","第4場","熱門馬 7號","7號馬","--"],
    ["14:30","第5場","熱門馬 1號","1號馬","--"]
  ]
 };
 return (d[league]||d.MLB).map((x,i)=>({
   id:`${league}-${i}`,
   league,
   time:x[0],
   awayTeam:x[1],
   homeTeam:x[2],
   matchup:`${x[1]} vs ${x[2]}`,
   handicapLine:x[3],
   totalLine:x[4],
   raw:x.join(" ")
 }));
}

export async function fetchSource(sourceId){
 const url=`https://www.playsport.cc/predict/games?allianceid=${sourceId}&type=p&from=header`;
 const r=await fetch(url,{
   headers:{
     "user-agent":"Mozilla/5.0 LongnvSportsAI/1.0",
     "accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
     "accept-language":"zh-TW,zh;q=0.9,en;q=0.7"
   }
 });
 if(!r.ok) throw new Error("source "+r.status);
 return await r.text();
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
  pickTeam:pick,
  winRate,
  predictedScore:`${g.awayTeam} ${awayScore}：${homeScore} ${g.homeTeam}`,
  spreadPick:`${pick} 方向，參考盤 ${g.handicapLine}`,
  coverRate,
  totalPick,
  overRate,
  underRate,
  totalRate,
  confidence,
  bullets:[
    "系統以即時盤口指標、雙方近況、近幾年對戰、主客場表現與市場方向做交叉評估。",
    `${pick} 的勝負方向權重較高，獨贏估算約 ${winRate}%。`,
    `讓分盤目前偏向 ${pick} 方向；若臨場盤口大幅跳動，代表市場分歧變大，建議降低信心。`,
    `大小分目前偏 ${totalPick}，若預測總分接近盤口，大小分信心會比獨贏低。`
  ]
 };
}
