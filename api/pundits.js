
import { supabaseAdmin, json, getUserFromToken } from "./_shared.js";

export default async function handler(req,res){
 const supabase = supabaseAdmin();
 const game_key = req.query.game_key;
 const user = await getUserFromToken(req);
 if(!user) return json(res,{ok:false,locked:true,error:"login_required"},401);

 const { data: picks, error } = await supabase
   .from("pundit_picks")
   .select("id, game_key, market, pick, line, reason, created_at, pundits(id, nickname, avatar, bio, accuracy_30, accuracy_all)")
   .eq("game_key", game_key)
   .order("created_at",{ascending:false});

 if(error) return json(res,{ok:false,error:error.message},500);
 return json(res,{ok:true,picks:picks || []});
}
