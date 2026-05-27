
import { LEAGUES, buildAnalysis, json } from "./_shared.js";
export default async function handler(req,res){
 const key=String(req.query.league || "MLB").toUpperCase();
 const info=LEAGUES[key] || LEAGUES.MLB;
 const game={
  id:req.query.gameId || `${key}-manual`,
  league:key, time:req.query.time || "待確認",
  awayTeam:req.query.away || "客隊", homeTeam:req.query.home || "主隊",
  matchup:`${req.query.away || "客隊"} vs ${req.query.home || "主隊"}`,
  taicai:{awayHandicap:req.query.awayHandicap || "", homeHandicap:req.query.homeHandicap || "", awayMoneyline:req.query.awayMoneyline || "", homeMoneyline:req.query.homeMoneyline || "", over:req.query.over || "", under:req.query.under || ""},
  handicapLine:`${req.query.awayHandicap || ""} / ${req.query.homeHandicap || ""}`,
  totalLine:`${req.query.over || ""} / ${req.query.under || ""}`,
  raw:`${req.query.away || ""} ${req.query.home || ""} ${req.query.awayHandicap || ""} ${req.query.homeHandicap || ""} ${req.query.over || ""} ${req.query.under || ""}`
 };
 return json(res,{ok:true,league:key,leagueName:info[0],updatedAt:new Date().toISOString(),game,analysis:buildAnalysis(game)});
}
