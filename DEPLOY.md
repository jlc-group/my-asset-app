# Cloudflare Pages Deployment Guide

## 🚀 วิธีการ Deploy ขึ้น Cloudflare Pages ผ่าน GitHub (แนะนำ)

### ขั้นตอนที่ 1: เตรียม Cloudflare Account
1. สมัครหรือเข้าสู่ระบบ [Cloudflare](https://dash.cloudflare.com/)
2. ไปที่ **Pages** ในเมนูด้านซ้าย

### ขั้นตอนที่ 2: Connect GitHub Repository
1. คลิก **"Create a project"** (หรือ "Connect to Git" หากมีโปรเจกต์อื่นอยู่แล้ว)
2. เลือก **"Connect to Git"**
3. เลือก **GitHub** และ authorize Cloudflare เข้าถึง GitHub account
4. เลือก repository: `jlc-group/my-asset-app`

### ขั้นตอนที่ 3: Configure Build Settings
```
Project name: my-asset-app
Production branch: main
Build command: (เว้นว่างไว้ - ไม่ต้องใส่เพราะเป็น static files)
Build output directory: build
Deploy command: npm run deploy
Root directory: (เว้นว่างไว้)
```

**หมายเหตุ:** ใช้ `npm run deploy` แทน `wrangler pages deploy build` เพื่อให้ใช้ wrangler ที่ติดตั้งใน node_modules

### ขั้นตอนที่ 4: Deploy และ Auto-Update
1. คลิก **"Save and Deploy"**
2. รอให้ build เสร็จ (ประมาณ 30 วินาที - 1 นาที)
3. เว็บไซต์จะพร้อมใช้งานที่ URL ที่ Cloudflare ให้มา
4. **🎯 จากนี้ไป ทุกครั้งที่ push ขึ้น GitHub branch `main` Cloudflare จะ build และ deploy ใหม่โดยอัตโนมัติ!**

### ✅ ข้อดีของการใช้ GitHub Integration:
- 🔄 **Auto-deployment** - push โค้ดขึ้น GitHub แล้ว deploy เอง
- 📝 **Build logs** - ดู log การ build ได้ใน Cloudflare dashboard
- 🌿 **Branch preview** - สาขาอื่น ๆ จะได้ preview URL แยก
- 🔙 **Easy rollback** - ย้อนกลับเวอร์ชันเก่าได้ง่าย
- 👥 **Team collaboration** - ทีมงานสามารถ push และ deploy ได้

### Features ที่ทำงานบน Cloudflare Pages:
- ✅ React Frontend (Static Files)
- ✅ API Endpoint: `/post/submit` (Cloudflare Functions)
- ✅ CORS Support
- ✅ Proxy ไปยัง Google Apps Script
- ✅ HTTPS โดยอัตโนมัติ
- ✅ Global CDN

### 🔄 การอัปเดตในอนาคต (GitHub Integration):
เมื่อคุณแก้ไขโค้ดและต้องการอัปเดต:
```bash
git add .
git commit -m "อัปเดตโปรแกรม"
git push origin main
```
**Cloudflare จะ build และ deploy ใหม่โดยอัตโนมัติ!** ⚡

### 📋 วิธีตรวจสอบการ deploy:
1. ไปที่ [Cloudflare Pages Dashboard](https://dash.cloudflare.com/) 
2. เลือกโปรเจกต์ `my-asset-app`
3. ดู **Deployments** tab สำหรับสถานะการ build
4. ดู **Functions** tab สำหรับ API logs

### หมายเหตุ:
- ❌ ไม่ต้องใช้ `wrangler` CLI หลังจากตั้งค่า GitHub integration แล้ว
- ❌ ไม่ต้องใช้ `index.js` (Express server) เพราะ Cloudflare Pages ใช้ Functions แทน
- ✅ API endpoint จะเป็น `https://your-app.pages.dev/post/submit`
- ✅ React app จะโหลดจาก `/build` directory
- ✅ ทุกการเปลี่ยนแปลงใน GitHub จะ deploy อัตโนมัติ