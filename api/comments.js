
import { supabaseAdmin, readBody, json, getUserFromToken, getProfile, gameKey } from "./_shared.js";

export default async function handler(req,res){
 const supabase = supabaseAdmin();
 const user = await getUserFromToken(req);
 const profile = user ? await getProfile(user.id) : null;
 const game_key = req.query.game_key;

 if(req.method === "GET"){
   if(!user) return json(res,{ok:false,locked:true,error:"login_required"},401);
   const { data, error } = await supabase.from("comments").select("id, game_key, nickname, content, created_at").eq("game_key", game_key).order("created_at",{ascending:false}).limit(100);
   if(error) return json(res,{ok:false,error:error.message},500);
   return json(res,{ok:true,comments:data || []});
 }

 if(req.method === "POST"){
   if(!user) return json(res,{ok:false,error:"login_required"},401);
   const body = await readBody(req);
   const nickname = profile?.nickname || body.nickname || "會員";
   const { data, error } = await supabase.from("comments").insert({
     game_key: body.game_key,
     user_id: user.id,
     nickname,
     content: String(body.content || "").slice(0,500)
   }).select().single();
   if(error) return json(res,{ok:false,error:error.message},500);
   return json(res,{ok:true,comment:data});
 }

 return json(res,{ok:false,error:"method_not_allowed"},405);
}
