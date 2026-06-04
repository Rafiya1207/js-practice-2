export interface Message {
  role: string;
  content: string;
}
export interface ChatResponse {
  message: Message;
}
