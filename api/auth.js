
import { supabaseAdmin, readBody, json } from "./_shared.js";
export default async function handler(req,res){
 const supabase = supabaseAdmin();
 if(req.method === "POST"){
  const body = await readBody(req);
  if(body.action === "login"){
    const { data, error } = await supabase.auth.signInWithPassword({ email: body.email, password: body.password });
    if(error) return json(res,{ok:false,error:error.message},401);
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single();
    return json(res,{ok:true,session:data.session,user:data.user,profile});
  }
 }
 return json(res,{ok:false,error:"Unsupported action"},400);
}
