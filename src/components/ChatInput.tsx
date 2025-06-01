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
  isLoading: boolean;
  messages: Message[];
}

export default function ChatInput({
  input,
  handleSubmit,
  handleInputChange,
  setMessages,
  isLoading,
  messages,
}: ChatInputProps) {
  console.log(messages);
  return (
    <form onSubmit={handleSubmit} className="flex gap-1 border-t px-2 py-3">
      <Button
        title="Clear chat"
        variant="outline"
        onClick={() => setMessages([])}
        className="px-3 py-2"
        disabled={messages.length === 0}
        type="button"
      >
        <Trash className="size-4 text-rose-500" />
      </Button>
      <Input
        autoFocus
        placeholder="Ask something..."
        // className="bg-muted"
        value={input}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
      />
      <Button
        title="Send message"
        variant="default"
        className="px-3 py-2"
        disabled={input.length === 0}
        type="submit"
      >
        <SendHorizontal className="size-4" />
      </Button>
    </form>
  );
}
