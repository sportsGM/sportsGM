
import { supabaseAdmin, readBody, json, getUserFromToken } from "./_shared.js";

async function counts(supabase, game_key){
 const { data, error } = await supabase.from("reactions").select("reaction_type").eq("game_key", game_key);
 if(error) throw error;
 return {
  boom: (data || []).filter(x=>x.reaction_type==="boom").length,
  opposite: (data || []).filter(x=>x.reaction_type==="opposite").length
 };
}

export default async function handler(req,res){
 const supabase = supabaseAdmin();
 const game_key = req.query.game_key;

 if(req.method === "GET"){
   try { return json(res,{ok:true,counts: await counts(supabase, game_key)}); }
   catch(e){ return json(res,{ok:false,error:e.message},500); }
 }

 if(req.method === "POST"){
   const user = await getUserFromToken(req);
   if(!user) return json(res,{ok:false,error:"login_required"},401);
   const body = await readBody(req);
   const reaction_type = body.reaction_type === "opposite" ? "opposite" : "boom";
   const { error } = await supabase.from("reactions").upsert({
     game_key: body.game_key,
     user_id: user.id,
     reaction_type
   }, { onConflict: "game_key,user_id" });
   if(error) return json(res,{ok:false,error:error.message},500);
   return json(res,{ok:true,counts: await counts(supabase, body.game_key)});
 }
 return json(res,{ok:false,error:"method_not_allowed"},405);
}
