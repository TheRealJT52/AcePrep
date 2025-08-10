import { apiRequest } from "./queryClient";

export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
}

export type CourseType = "APUSH" | "APWH" | "APEURO" | "APES" | "APMACRO" | "APMICRO" | "APGOV" | "APBIO" | "APPSYCH" | "APCALCAB";

export async function sendChatMessage(message: string, history: Message[], course: CourseType = "APUSH") {
  const response = await apiRequest(
    "POST",
    "/api/chat",
    {
      message,
      history,
      course
    }
  );
  
  return await response.json();
}
