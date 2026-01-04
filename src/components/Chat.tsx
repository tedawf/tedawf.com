import { useChatbot } from "@/contexts/ChatContext";
import { Suspense, lazy, useCallback, useState } from "react";
import ChatHeader from "./ChatHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/Accordion";
import { Skeleton } from "./ui/skeleton";

const ChatPanel = lazy(() => import("./ChatPanel"));

function ChatPanelFallback() {
  return (
    <div className="flex flex-1 flex-col justify-between">
      <div className="flex flex-1 flex-col justify-end gap-3 overflow-hidden p-2 sm:gap-4 sm:p-3">
        <div className="flex items-start justify-end">
          <Skeleton className="h-10 w-[220px] rounded-lg sm:w-64" />
        </div>

        <div className="flex items-start justify-start">
          <Skeleton className="mr-2 mt-0.5 h-4 w-4 shrink-0 rounded-full sm:mr-2.5 sm:h-5 sm:w-5" />
          <Skeleton className="h-20 w-[220px] rounded-lg sm:w-64" />
        </div>

        <div className="flex items-start justify-end">
          <Skeleton className="h-10 w-[220px] rounded-lg sm:w-64" />
        </div>

        <div className="flex items-start justify-start">
          <Skeleton className="mr-2 mt-0.5 h-4 w-4 shrink-0 rounded-full sm:mr-2.5 sm:h-5 sm:w-5" />
          <Skeleton className="h-20 w-[220px] rounded-lg sm:w-64" />
        </div>
      </div>

      <div className="flex gap-1.5 border-t px-2 py-2 backdrop-blur-sm sm:gap-2 sm:px-3 sm:py-2.5">
        <Skeleton className="h-9 w-10 sm:h-10 sm:w-12" />
        <Skeleton className="h-8 flex-1 sm:h-9" />
        <Skeleton className="h-9 w-10 sm:h-10 sm:w-12" />
      </div>

      <span className="sr-only" role="status" aria-live="polite">
        Loading chat…
      </span>
    </div>
  );
}

export default function Chat() {
  const { isVisible } = useChatbot();

  const [expandedValue, setExpandedValue] = useState<string>("");
  const [hasOpened, setHasOpened] = useState(false);

  const handleValueChange = useCallback((nextValue: string) => {
    setExpandedValue(nextValue);
    if (nextValue) {
      setHasOpened(true);
    }
  }, []);

  const isExpanded = expandedValue === "item-1";

  return (
    isVisible && (
      <Accordion
        type="single"
        collapsible
        value={expandedValue}
        onValueChange={handleValueChange}
        className="relative z-40 flex"
      >
        <AccordionItem
          value="item-1"
          className="fixed bottom-4 right-4 w-[320px] rounded-lg border bg-background shadow-lg shadow-black/10 sm:bottom-8 sm:right-8 sm:w-96 dark:shadow-black/30"
        >
          <AccordionTrigger className="border-b px-6">
            <ChatHeader />
          </AccordionTrigger>
          <AccordionContent
            forceMount={hasOpened ? true : undefined}
            className="p-0"
          >
            {hasOpened && (
              <div
                className={
                  isExpanded
                    ? "flex max-h-[400px] min-h-[350px] flex-col justify-between rounded-b-lg sm:max-h-[500px] sm:min-h-[400px]"
                    : "hidden"
                }
              >
                <Suspense fallback={<ChatPanelFallback />}>
                  <ChatPanel isExpanded={isExpanded} />
                </Suspense>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  );
}
