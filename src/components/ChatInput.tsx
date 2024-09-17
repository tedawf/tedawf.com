import { ChatRequestOptions, Message } from "ai";
import { SendHorizontal, Trash } from "lucide-react";
import { HTMLAttributes } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

interface ChatInputProps extends HTMLAttributes<HTMLFormElement> {
  input: string;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions,
  ) => void;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  setMessages: (
    messages: Message[] | ((messages: Message[]) => Message[]),
  ) => void;
}

export default function ChatInput({
  input,
  handleSubmit,
  handleInputChange,
  setMessages,
}: ChatInputProps) {
  return (
    <form onSubmit={handleSubmit} className="flex gap-1 border-t px-2 py-3">
      <Button
        title="Clear chat"
        variant="ghost"
        onClick={() => setMessages([])}
        className="px-3 py-2"
      >
        <Trash className="size-4 text-rose-500" />
      </Button>
      <Input
        autoFocus
        placeholder="Ask something..."
        className="bg-muted border-none"
        value={input}
        onChange={handleInputChange}
      />
      <Button title="Send message" variant="ghost" className="px-3 py-2">
        <SendHorizontal className="size-4" />
      </Button>
    </form>
  );
}
