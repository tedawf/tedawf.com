import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/Accordion";

export default function Chat() {
  return (
    <Accordion type="single" collapsible className="relative z-40 shadow">
      <AccordionItem value="item-1">
        <div className="fixed bottom-8 right-8 w-80 rounded-md border bg-background">
          <div className="flex h-full w-full flex-col">
            <AccordionTrigger className="border-b px-6">
              <ChatHeader />
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex h-80 flex-col">
                messages
                <ChatInput className="px-4" />
              </div>
            </AccordionContent>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
}
