"use client";

import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

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
  className 
}: BlogImageProps) {
  const handleZoom = () => {
    window.open(src, '_blank');
  };

  return (
    <div className={cn("mb-16", className)}>
      <div className="group relative w-full overflow-hidden rounded-2xl">
        <Image
          src={src}
          alt={alt}
          className="h-auto w-full transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-black/10 dark:group-hover:shadow-black/40"
          width={width}
          height={height}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
        
        {/* Interactive overlay */}
        <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10">
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-4 top-4 h-10 w-10 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 hover:scale-110"
            onClick={handleZoom}
            aria-label="Open image in full size"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Click area for mobile */}
        <button
          className="absolute inset-0 cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          onClick={handleZoom}
          aria-label="Click to open image in full size"
        />
      </div>
    </div>
  );
}