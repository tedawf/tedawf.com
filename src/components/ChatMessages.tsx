import { Message } from "ai";
import ChatMessage from "./ChatMessage";

interface ChatMessagesProps {
  messages: Message[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="h-full overflow-y-auto p-3">
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>
            <ChatMessage message={msg} />
          </li>
        ))}
      </ul>
    </div>
  );
}
