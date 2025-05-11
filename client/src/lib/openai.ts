import { apiRequest } from "./queryClient";

export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
}

export async function sendChatMessage(message: string, history: Message[]) {
  const response = await apiRequest(
    "POST",
    "/api/chat",
    {
      message,
      history,
    }
  );
  
  return await response.json();
}
