import Link from "next/link";
import React from "react";

type LinkWithIconProps = {
  href: string;
  icon?: React.ReactNode;
  position: "left" | "right";
  text?: string;
};

export default function LinkWithIcon({
  href,
  icon,
  position,
  text,
}: LinkWithIconProps) {
  return (
    <Link href={href} className="link flex items-center gap-2 font-light">
      {position === "left" && icon}
      <span>{text}</span>
      {position === "right" && icon}
    </Link>
  );
}
