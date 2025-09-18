// index.js

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");
const open = require("open");

const app = express();
app.use(cors()); // หรือกำหนด origin เฉพาะได้
app.use(express.json()); // เพื่อ parse JSON Body

// Serve static files จากโฟลเดอร์ build
app.use(express.static(path.join(__dirname, 'build')));

// URL ของ Google Apps Script (Web App) ที่ Deploy ไว้
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby_iiH0Nok4Lx-SMVmJzS7PMlG938Tep89YzwQ0OnvMeT_Vdy89rIjMxqn_spLYRSyQ/exec"; // <-- ใส่ของคุณ

app.post("/post/submit", async (req, res) => {
  try {
    // รับข้อมูลจากฟอร์ม (React)
    const formData = req.body;
    console.log("Received from client:", formData);

    // ส่งต่อไปยัง Google Apps Script
    const response = await axios.post(GOOGLE_SCRIPT_URL, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // สมมติ Apps Script ส่งข้อความ "SUCCESS" หรืออื่น ๆ กลับมา
    const text = response.data;
    console.log("Response from Apps Script:", text);

    // ตอบกลับไปยัง React
    return res.status(200).send(text);
  } catch (error) {
    console.error("Error forwarding to Google Script:", error.message);
    return res.status(500).send("ERROR forwarding to Google Script");
  }
});

// Catch-all handler: ส่ง React app สำหรับทุก route ที่ไม่ใช่ API
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0'; // Bind to all IPv4 addresses

app.listen(PORT, HOST, async () => {
  const url = `http://localhost:${PORT}`;

  console.log(`\n🚀 Server is running!`);
  console.log(`📍 Local:    ${url}`);
  console.log(`📍 Network:  http://${HOST}:${PORT}`);
  console.log(`\n✨ Opening browser automatically...\n`);

  // เปิด browser อัตโนมัติ
  try {
    await open(url);
  } catch (error) {
    console.log('Could not open browser automatically');
    console.log(`Please open your browser and go to: ${url}`);
  }
});
