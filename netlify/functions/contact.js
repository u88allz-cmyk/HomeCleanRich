const { SolapiMessageService } = require("solapi");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { name, phone, services, message } = body;

    if (!name || !phone || !services || !message) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          success: true, 
          message: "상담 신청이 접수되었습니다.",
          smsStatus: "환경변수 미설정"
        })
      };
    }

    const messageService = new SolapiMessageService(apiKey, apiSecret);
    const serviceList = Array.isArray(services) ? services.join(", ") : services;
    
    const text = `[홈클린리치 상담신청]
고객명: ${name}
연락처: ${phone}
서비스: ${serviceList}
문의내용: ${message}`;

    await messageService.send({
      to: ownerPhone.replace(/-/g, ""),
      from: sender.replace(/-/g, ""),
      text: text,
      subject: "홈클린리치 상담신청"
    });

    console.log(`SMS 발송 성공: ${name}님의 상담신청`);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "서버 오류가 발생했습니다." })
    };
  }
};
