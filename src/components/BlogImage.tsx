"use client";

import Image from "next/image";
import { ExternalLink, Maximize2, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface BlogImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function BlogImage({
  src,
  alt,
  width = 1200,
  height = 800,
  className,
}: BlogImageProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleOpenInNewTab = () => {
    window.open(src, "_blank", "noopener,noreferrer");
  };

  return (
    <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
      <div className={cn("mb-16", className)}>
        <figure className="relative w-full">
          <DialogTrigger asChild>
            <button
              type="button"
              className="block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label="View full size"
            >
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="h-auto w-full rounded-[32px] object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </button>
          </DialogTrigger>

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32 rounded-b-[32px] bg-gradient-to-t from-background/90 via-background/60 to-transparent"
            aria-hidden
          />

          <div className="absolute inset-x-0 bottom-5 flex justify-center gap-3 text-sm font-medium">
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
                className="pointer-events-auto rounded-full px-4 shadow-lg bg-white text-foreground hover:bg-white/90 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
                aria-label="Open preview"
              >
                <Maximize2 className="h-4 w-4" />
                View full size
              </Button>
            </DialogTrigger>
            <Button
              variant="secondary"
              size="sm"
              className="pointer-events-auto rounded-full px-4 shadow-lg bg-white text-foreground hover:bg-white/90 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
              onClick={handleOpenInNewTab}
              aria-label="Open in new tab"
            >
              <ExternalLink className="h-4 w-4" />
              Open in new tab
            </Button>
          </div>
        </figure>
      </div>

      <DialogContent className="w-full max-w-[min(92vw,1200px)] border-none bg-transparent p-0 shadow-none [&>button:last-of-type]:hidden">
        <div className="relative mx-auto flex min-h-[60vh] w-full items-center justify-center px-4 py-10">
          <DialogClose
            className="absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-foreground shadow-lg transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
            aria-label="Close image viewer"
          >
            <X className="h-5 w-5" />
          </DialogClose>

          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="h-auto max-h-[88vh] w-full max-w-[min(90vw,1200px)] select-none rounded-[32px] object-contain"
            priority={false}
            sizes="100vw"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
