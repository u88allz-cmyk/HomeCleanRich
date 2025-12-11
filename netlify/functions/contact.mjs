import crypto from 'crypto';

async function sendSolapiSMS(apiKey, apiSecret, sender, to, text) {
  const date = new Date().toISOString();
  const salt = crypto.randomBytes(32).toString('hex');
  const signature = crypto.createHmac('sha256', apiSecret)
    .update(date + salt)
    .digest('hex');

  const response = await fetch('https://api.solapi.com/messages/v4/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `HMAC-SHA256 apiKey=${apiKey}, date=${date}, salt=${salt}, signature=${signature}`
    },
    body: JSON.stringify({
      message: {
        to: to,
        from: sender,
        text: text
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errorMessage || 'SMS 발송 실패');
  }

  return await response.json();
}

export const handler = async (event, context) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { name, phone, services, message } = body;

    if (!name || !phone || !services || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "필수 항목을 모두 입력해주세요." })
      };
    }

    const apiKey = process.env.SOLAPI_API_KEY;
    const apiSecret = process.env.SOLAPI_API_SECRET;
    const sender = process.env.SOLAPI_SENDER;
    const ownerPhone = process.env.OWNER_PHONE;

    if (!apiKey || !apiSecret || !sender || !ownerPhone) {
      console.warn("SMS 환경변수가 설정되지 않았습니다.");
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true, 
          message: "상담 신청이 접수되었습니다.",
          smsStatus: "환경변수 미설정"
        })
      };
    }

    const serviceList = Array.isArray(services) ? services.join(", ") : services;
    
    const text = `[홈클린리치 상담신청]
고객명: ${name}
연락처: ${phone}
서비스: ${serviceList}
문의내용: ${message}`;

    await sendSolapiSMS(
      apiKey,
      apiSecret,
      sender.replace(/-/g, ""),
      ownerPhone.replace(/-/g, ""),
      text
    );

    console.log(`SMS 발송 성공: ${name}님의 상담신청`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: "상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.",
        smsStatus: "발송완료"
      })
    };

  } catch (error) {
    console.error("Error:", error.message || error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message || "서버 오류가 발생했습니다." })
    };
  }
};
