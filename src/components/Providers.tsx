"use client";

import { ChatProvider } from "@/contexts/ChatContext";
import { ThemeProvider, useTheme } from "next-themes";
import React, { useEffect } from "react";
import { Toaster } from "sonner";
import Chat from "./Chat";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      enableSystem
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
    >
      <ThemeColorUpdater />
      <ChatProvider>
        {children}
        <Chat />
      </ChatProvider>
      <ToastProvider />
    </ThemeProvider>
  );
}

function ToastProvider() {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      className="mt-12"
      position="top-right"
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
}

function ThemeColorUpdater() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // Use a timeout 0ms to ensure the browser has applied the new theme's styles
    const timerId = setTimeout(() => {
      // Get the computed background color from the body
      const bodyStyles = window.getComputedStyle(document.body);
      const backgroundColor = bodyStyles.backgroundColor;

      // Find the meta tag
      let metaThemeColor = document.querySelector<HTMLMetaElement>(
        "meta[name='theme-color']",
      );

      if (metaThemeColor) {
        // If it exists, update it
        metaThemeColor.content = backgroundColor;
      } else {
        // Create and append it to the head
        metaThemeColor = document.createElement("meta");
        metaThemeColor.name = "theme-color";
        metaThemeColor.content = backgroundColor;
        document.head.appendChild(metaThemeColor);
      }
    }, 0);

    // Cleanup to clear the timeout if the component unmounts or theme changes quickly
    return () => clearTimeout(timerId);
  }, [resolvedTheme]); // Re-run this effect whenever the theme changes

  return null;
}
