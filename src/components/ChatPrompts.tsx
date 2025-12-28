import { useEffect, useState } from "react";
import { Button } from "./ui/Button";

interface ChatPromptsProps {
  onPromptClick: (prompt: string) => void;
}

const allPrompts = [
  "Tell me about Ted's experience",
  "What projects has Ted worked on?",
  "What technologies does Ted use?",
  "What is Ted's current role?",
  "Tell me about Ted's skills",
  "What companies has Ted worked at?",

  // Portfolio & career
  "What is Ted currently working on?",
  "What kind of developer is Ted?",
  "What problems does Ted like solving?",
  "What areas is Ted strongest in?",
  "What is Ted focusing on learning now?",

  // Projects & blog
  "Which project best represents Ted's work?",
  "What was the motivation behind Ted's projects?",
  "What technical challenges has Ted written about?",
  "What tools or frameworks does Ted frequently mention?",
  "What has Ted built outside of work?",

  // Engineering approach
  "How does Ted approach system design?",
  "What does Ted care about in clean architecture?",
  "How does Ted balance speed vs correctness?",
  "What engineering principles does Ted follow?",
  "What tradeoffs does Ted often discuss?",

  // Practical / conversational
  "What can you help me with?",
  "Where should I start if I want to explore Ted's work?",
  "What should I read to understand Ted's thinking?",
  "Is Ted more backend or frontend focused?",
  "How can I contact Ted?"
];

function getRandomPrompts(prompts: string[], count: number): string[] {
  const shuffled = [...prompts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function ChatPrompts({ onPromptClick }: ChatPromptsProps) {
  const [randomPrompts, setRandomPrompts] = useState<string[]>([]);

  useEffect(() => {
    setRandomPrompts(getRandomPrompts(allPrompts, 3));
  }, []);

  return (
    <div className="mt-2 flex w-full max-w-[200px] flex-col gap-1.5 sm:mt-3 sm:max-w-[250px] sm:gap-2">
      <p className="text-center text-xs text-muted-foreground">Try asking:</p>
      <div className="flex flex-col gap-1 sm:gap-1.5">
        {randomPrompts.map((prompt) => (
          <Button
            key={prompt}
            variant="outline"
            size="sm"
            onClick={() => onPromptClick(prompt)}
            className="h-auto min-h-[32px] w-full justify-start whitespace-normal break-words px-2 py-1.5 text-left text-xs leading-normal sm:min-h-[36px] sm:px-3 sm:py-2"
          >
            <span className="line-clamp-2">{prompt}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
