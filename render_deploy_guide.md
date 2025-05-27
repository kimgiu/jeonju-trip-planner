# Render 배포 가이드

## 프론트엔드 (Static Site)
1. New → Static Site
2. Build Command: npm install && npm run build && npm run export
3. Publish Directory: out

## 백엔드 (Web Service)
1. New → Web Service
2. Build Command: npm install
3. Start Command: node server.js
4. Add Environment Variable: OPENAI_API_KEY = [당신의 키]

