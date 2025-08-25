import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type LinkWithIconProps = {
  href: string;
  icon?: React.ReactNode;
  position: "left" | "right";
  text?: string;
  className?: string;
};

export default function LinkWithIcon({
  href,
  icon,
  position,
  text,
  className,
}: LinkWithIconProps) {
  return (
    <Link
      href={href}
      className={cn("link flex items-center gap-2 font-light", className)}
    >
      {position === "left" && icon}
      <span>{text}</span>
      {position === "right" && icon}
    </Link>
  );
}
