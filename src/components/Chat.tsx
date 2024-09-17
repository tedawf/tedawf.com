"use client";

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

  return (
    <Accordion type="single" collapsible className="relative z-40 shadow">
      <AccordionItem value="item-1">
        <div className="fixed bottom-8 right-8 w-80 rounded-md border bg-background">
          <div className="flex h-full w-full flex-col">
            <AccordionTrigger className="border-b px-6">
              <ChatHeader />
            </AccordionTrigger>
            <AccordionContent className="flex h-80 flex-col p-0">
              <ChatMessages
                messages={messages}
                error={error}
                isLoading={isLoading}
              />
              <ChatInput
                input={input}
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
                setMessages={setMessages}
                isLoading={isLoading}
              />
            </AccordionContent>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
}
