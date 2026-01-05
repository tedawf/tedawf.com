"use client";

import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

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
  return (
    <Dialog>
      <figure className={cn("mb-16 w-full", className)}>
        <DialogTrigger asChild>
          <button
            type="button"
            className="block w-full cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="View full size"
          >
            <ImageWithSkeleton
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="h-auto w-full select-none rounded-lg"
              containerClassName="w-full overflow-visible"
              skeletonClassName="rounded-lg bg-muted/30"
              priority
              quality={70}
              sizes="(max-width: 768px) 100vw, 864px"
            />
          </button>
        </DialogTrigger>
      </figure>

      <DialogPortal>
        <DialogOverlay className="bg-background/80 backdrop-blur-sm" />
        <DialogPrimitive.Content
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center p-4 outline-none sm:p-6",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          )}
        >
          <div className="fixed right-4 top-4 z-50 flex items-center gap-2 sm:right-6 sm:top-6">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="bg-background/80 backdrop-blur-sm"
                aria-label="Close image viewer"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>

          <div className="max-w-[min(92vw,1200px)]">
            <div className="rounded-xl border bg-background p-2 shadow-2xl">
              <ImageWithSkeleton
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="h-auto max-h-[85vh] w-auto max-w-[min(90vw,1160px)] select-none rounded-lg object-contain"
                skeletonClassName="rounded-lg bg-muted/30"
                quality={85}
                priority={false}
                sizes="100vw"
              />
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
