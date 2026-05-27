
import { LEAGUES, demoGames, buildAnalysis } from "./_shared.js";

export default async function handler(req,res){
 const key=String(req.query.league || "MLB").toUpperCase();
 const info=LEAGUES[key] || LEAGUES.MLB;

 const manualGame={
  id:req.query.gameId || `${key}-manual`,
  league:key,
  time:"待確認",
  awayTeam:req.query.away || "客隊",
  homeTeam:req.query.home || "主隊",
  matchup:`${req.query.away || "客隊"} vs ${req.query.home || "主隊"}`,
  handicapLine:req.query.handicap || "盤口解析中",
  totalLine:req.query.total || "大小分解析中",
  raw:`${req.query.away || ""} ${req.query.home || ""} ${req.query.handicap || ""} ${req.query.total || ""}`
 };

 const game=(req.query.away || req.query.home) ? manualGame : demoGames(key)[0];
 const analysis=buildAnalysis(game);

 res.setHeader("cache-control","no-store");
 res.status(200).json({
  ok:true,
  league:key,
  leagueName:info[0],
  updatedAt:new Date().toISOString(),
  game,
  analysis
 });
}
