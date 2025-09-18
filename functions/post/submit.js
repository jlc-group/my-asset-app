// Cloudflare Pages Function สำหรับ API endpoint
export async function onRequestPost({ request, env }) {
  try {
    // ดึงข้อมูลจาก request body
    const formData = await request.json();
    console.log("Received from client:", formData);

    // URL ของ Google Apps Script (อ่านจากตัวแปรแวดล้อม หากไม่ได้กำหนดจะใช้ค่าเริ่มต้นนี้)
    const GOOGLE_SCRIPT_URL = env.GOOGLE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycby_iiH0Nok4Lx-SMVmJzS7PMlG938Tep89YzwQ0OnvMeT_Vdy89rIjMxqn_spLYRSyQ/exec";

    // ส่งข้อมูลไปยัง Google Apps Script
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const text = await response.text();
    console.log("Response from Apps Script:", text);

    // ส่งกลับผลลัพธ์
    return new Response(text, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });

  } catch (error) {
    console.error("Error forwarding to Google Script:", error.message);
    return new Response("ERROR forwarding to Google Script", { 
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

// Handle CORS preflight requests
export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}