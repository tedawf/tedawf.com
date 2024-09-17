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
  } = useChat({
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content: "i am assistant",
      },
      {
        id: "2",
        role: "user",
        content: "i am user",
      },
      {
        id: "3",
        role: "assistant",
        content: "i am assistant again",
      },
      {
        id: "4",
        role: "user",
        content: "i am user again",
      },
      {
        id: "5",
        role: "assistant",
        content: "i am assistant again",
      },
      {
        id: "6",
        role: "user",
        content: `[link](https://tedawf.com): 
- item 1
- item 2
- item 3  

what is const first = useRef(second)
asdasdasda sn fa ksln aslknvk lasasadsad asdaasfls bvlkas vbakslas
asdasdasd`,
      },
    ],
  });

  return (
    <Accordion type="single" collapsible className="relative z-40 shadow">
      <AccordionItem value="item-1">
        <div className="fixed bottom-8 right-8 w-80 rounded-md border bg-background">
          <div className="flex h-full w-full flex-col">
            <AccordionTrigger className="border-b px-6">
              <ChatHeader />
            </AccordionTrigger>
            <AccordionContent className="flex h-80 flex-col p-0">
              <ChatMessages messages={messages} />
              <ChatInput
                input={input}
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
                setMessages={setMessages}
              />
            </AccordionContent>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
}
