# 龍女體育 AI 即時賽事分析中心 Vercel 正式版

這是 Vercel 部署版，不是 GitHub Pages 靜態版。

## 功能
- 首頁可選球類：棒球、籃球、其他
- 可選聯盟：MLB、日職、中職、韓棒、NBA、WNBA、足球、NHL 等
- 首頁顯示今日賽事
- 點某一場才開始 AI 分析
- 前台不顯示資料來源名稱
- 以盤口指標、近況、近年戰績、主客場與市場方向產生分析
- 顯示推薦隊伍、預測比分、獨贏率、讓分過盤率、大小分方向

## 部署方式
1. 解壓縮這個 ZIP
2. 把整個資料夾內容上傳到 GitHub
3. 到 Vercel → Add New Project
4. Import GitHub 專案
5. Framework Preset 選 Other
6. Build Command 可以留空，或填 npm run build
7. Deploy

## 注意
這個版本使用公開頁資料做盤口與賽事指標，不會登入任何第三方帳號，也不提供真實下注或金流。
如果來源頁改版，api/games.js 的解析規則可能需要調整。
