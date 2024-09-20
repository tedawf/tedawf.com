import { createContext, ReactNode, useContext, useState } from "react";

const ChatContext = createContext({
  isVisible: true,
  toggleChatbot: () => {},
});

export const useChatbot = () => useContext(ChatContext);

interface Props {
  children: ReactNode;
}

export function ChatProvider({ children }: Props) {
  const [isVisible, setIsVisible] = useState(true);

  const toggleChatbot = () => {
    setIsVisible(!isVisible);
  };

  return (
    <ChatContext.Provider value={{ isVisible, toggleChatbot }}>
      {children}
    </ChatContext.Provider>
  );
}
