# 龍女體育 AI 即時賽事分析中心｜會員制 Supabase 版

## 功能
- 匿名訪客可看今日賽事、台彩盤、基本 AI 分析
- 會員登入後可看：
  - 平台推薦人內容
  - 推薦人近期準確度
  - 會員留言區
  - 「今天轟啦 / 我下對面」真實統計
- 管理員可進 `/admin`
  - 建立會員帳號
  - 建立平台推薦人
  - 新增推薦人對單場賽事的建議

## 部署流程
1. 建立 Supabase 專案
2. 到 Supabase SQL Editor 執行 `supabase/schema.sql`
3. 到 Supabase → Project Settings → API 複製：
   - Project URL
   - service_role key
4. 上傳本專案到 GitHub
5. Vercel 匯入 GitHub 專案
6. 在 Vercel Project → Settings → Environment Variables 新增：
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
7. Deploy / Redeploy

## 建立第一個管理員
最簡單做法：
1. Supabase Dashboard → Authentication → Users → Add user
2. 建立你的管理員 Email / Password
3. 到 SQL Editor 執行：

```sql
insert into public.profiles (id, email, nickname, role, is_active)
select id, email, '管理員', 'admin', true
from auth.users
where email = '你的管理員Email'
on conflict (id) do update set role='admin', nickname='管理員', is_active=true;
```

之後打開：
`https://你的網址.vercel.app/admin`

登入後就能建立會員和推薦人。

## 注意
- service_role key 絕對不能放前台，只能放 Vercel 環境變數。
- 本站不提供真實下注、不保證結果，僅為資訊分析與會員互動平台。
