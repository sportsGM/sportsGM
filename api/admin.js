
import { supabaseAdmin, readBody, json, getUserFromToken, getProfile } from "./_shared.js";

async function requireAdmin(req){
 const user = await getUserFromToken(req);
 if(!user) throw new Error("login_required");
 const profile = await getProfile(user.id);
 if(profile?.role !== "admin") throw new Error("admin_required");
 return { user, profile };
}

export default async function handler(req,res){
 const supabase = supabaseAdmin();
 try{
  await requireAdmin(req);
 }catch(e){
  return json(res,{ok:false,error:e.message},401);
 }

 const body = req.method === "POST" ? await readBody(req) : {};
 const action = body.action || req.query.action;

 if(action === "create_user"){
  const { data, error } = await supabase.auth.admin.createUser({
    email: body.email,
    password: body.password,
    email_confirm: true
  });
  if(error) return json(res,{ok:false,error:error.message},500);
  await supabase.from("profiles").upsert({
    id: data.user.id,
    email: body.email,
    nickname: body.nickname || body.email,
    role: body.role || "member",
    is_active: true
  });
  return json(res,{ok:true,user:data.user});
 }

 if(action === "create_pundit"){
  const { data, error } = await supabase.from("pundits").insert({
    nickname: body.nickname,
    avatar: body.avatar || "🎯",
    bio: body.bio || "",
    accuracy_30: Number(body.accuracy_30 || 0),
    accuracy_all: Number(body.accuracy_all || 0),
    is_active: true
  }).select().single();
  if(error) return json(res,{ok:false,error:error.message},500);
  return json(res,{ok:true,pundit:data});
 }

 if(action === "create_pundit_pick"){
  const { data, error } = await supabase.from("pundit_picks").insert({
    pundit_id: body.pundit_id,
    game_key: body.game_key,
    market: body.market,
    pick: body.pick,
    line: body.line || "",
    reason: body.reason || ""
  }).select().single();
  if(error) return json(res,{ok:false,error:error.message},500);
  return json(res,{ok:true,pick:data});
 }

 if(action === "list_pundits"){
  const { data, error } = await supabase.from("pundits").select("*").order("created_at",{ascending:false});
  if(error) return json(res,{ok:false,error:error.message},500);
  return json(res,{ok:true,pundits:data || []});
 }

 return json(res,{ok:false,error:"unknown_action"},400);
}
