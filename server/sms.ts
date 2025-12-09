import { SolapiMessageService } from "solapi";

const apiKey = process.env.SOLAPI_API_KEY;
const apiSecret = process.env.SOLAPI_API_SECRET;
const sender = process.env.SOLAPI_SENDER;
const ownerPhone = process.env.OWNER_PHONE;

if (!apiKey || !apiSecret || !sender || !ownerPhone) {
  console.warn("SMS 환경변수가 설정되지 않았습니다. SMS 발송이 비활성화됩니다.");
}

const messageService = apiKey && apiSecret 
  ? new SolapiMessageService(apiKey, apiSecret)
  : null;

interface ContactInfo {
  name: string;
  phone: string;
  services: string[];
  message: string;
}

export async function sendConsultationSMS(contact: ContactInfo): Promise<boolean> {
  if (!messageService || !sender || !ownerPhone) {
    console.warn("SMS 서비스가 설정되지 않아 문자 발송을 건너뜁니다.");
    return false;
  }

  try {
    const serviceList = contact.services.join(", ");
    const text = `[홈클린리치 상담신청]
고객명: ${contact.name}
연락처: ${contact.phone}
서비스: ${serviceList}
문의내용: ${contact.message}`;

    await messageService.send({
      to: ownerPhone.replace(/-/g, ""),
      from: sender.replace(/-/g, ""),
      text: text,
      subject: "홈클린리치 상담신청"
    });

    console.log(`SMS 발송 성공: ${contact.name}님의 상담신청`);
    return true;
  } catch (error: any) {
    console.error("SMS 발송 실패:", error.message || error);
    return false;
  }
}
