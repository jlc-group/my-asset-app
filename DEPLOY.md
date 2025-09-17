# Cloudflare Pages Deployment Guide

## วิธีการ Deploy ขึ้น Cloudflare Pages

### ขั้นตอนที่ 1: เตรียม Cloudflare Account
1. สมัครหรือเข้าสู่ระบบ [Cloudflare](https://dash.cloudflare.com/)
2. ไปที่ **Pages** ในเมนูด้านซ้าย

### ขั้นตอนที่ 2: Connect GitHub Repository
1. คลิก **"Create a project"**
2. เลือก **"Connect to Git"**
3. เลือก GitHub และ authorize Cloudflare
4. เลือก repository: `jlc-group/my-asset-app`

### ขั้นตอนที่ 3: Configure Build Settings
```
Project name: my-asset-app
Production branch: main
Build command: npm run build (หรือเว้นว่างไว้)
Build output directory: build
```

### ขั้นตอนที่ 4: Deploy
1. คลิก **"Save and Deploy"**
2. รอให้ build เสร็จ (ประมาณ 1-2 นาที)
3. เว็บไซต์จะพร้อมใช้งานที่ URL ที่ Cloudflare ให้มา

### Features ที่ทำงานบน Cloudflare Pages:
- ✅ React Frontend (Static Files)
- ✅ API Endpoint: `/post/submit` (Cloudflare Functions)
- ✅ CORS Support
- ✅ Proxy ไปยัง Google Apps Script
- ✅ HTTPS โดยอัตโนมัติ
- ✅ Global CDN

### หมายเหตุ:
- ไม่ต้องใช้ `index.js` (Express server) เพราะ Cloudflare Pages ใช้ Functions แทน
- API endpoint จะเป็น `https://your-app.pages.dev/post/submit`
- React app จะโหลดจาก `/build` directory