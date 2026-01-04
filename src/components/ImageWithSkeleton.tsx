"use client";

import { cn } from "@/lib/utils";
import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

type ImageWithSkeletonProps = Omit<ImageProps, "onLoadingComplete"> & {
  containerClassName?: string;
  skeletonClassName?: string;
};

export default function ImageWithSkeleton({
  alt,
  containerClassName,
  skeletonClassName,
  className,
  onLoad,
  onError,
  ...props
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {!isLoaded && (
        <Skeleton
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 z-10 rounded-none bg-muted",
            skeletonClassName,
          )}
        />
      )}
      <Image
        alt={alt}
        {...props}
        className={cn("relative z-0", className)}
        onLoad={(event) => {
          setIsLoaded(true);
          onLoad?.(event);
        }}
        onError={(event) => {
          setIsLoaded(true);
          onError?.(event);
        }}
      />
    </div>
  );
}
