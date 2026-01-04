"use client";

import { cn } from "@/lib/utils";
import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

type ImageWithSkeletonProps = ImageProps & {
  containerClassName?: string;
  skeletonClassName?: string;
};

export default function ImageWithSkeleton({
  alt,
  containerClassName,
  skeletonClassName,
  className,
  onLoadingComplete,
  ...props
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {!isLoaded && (
        <Skeleton
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 rounded-none bg-muted",
            skeletonClassName,
          )}
        />
      )}
      <Image
        alt={alt}
        {...props}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          className,
        )}
        onLoadingComplete={(img) => {
          setIsLoaded(true);
          onLoadingComplete?.(img);
        }}
      />
    </div>
  );
}
