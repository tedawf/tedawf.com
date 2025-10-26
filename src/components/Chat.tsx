import { useChatbot } from "@/contexts/ChatContext";
import { useChat } from "ai/react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/Accordion";

export default function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat();

  const { isVisible } = useChatbot();

  return (
    isVisible && (
      <Accordion type="single" collapsible className="relative z-40 flex">
        <AccordionItem
          value="item-1"
          className="fixed bottom-4 right-4 w-[320px] rounded-md border bg-background sm:bottom-8 sm:right-8 sm:w-96"
        >
          <AccordionTrigger className="border-b px-6">
            <ChatHeader />
          </AccordionTrigger>
          <AccordionContent className="flex max-h-[400px] min-h-[350px] flex-col justify-between p-0 sm:max-h-[500px] sm:min-h-[400px]">
            <ChatMessages
              messages={messages}
              error={error}
              isLoading={isLoading}
              onPromptClick={(prompt) =>
                handleInputChange({
                  target: { value: prompt },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            />
            <ChatInput
              input={input}
              handleSubmit={handleSubmit}
              handleInputChange={handleInputChange}
              setMessages={setMessages}
              isLoading={isLoading}
              messages={messages}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  );
}
