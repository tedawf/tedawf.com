import Link from "next/link";
import React from "react";

type LinkWithIconProps = {
  href: string;
  icon?: React.ReactNode;
  align: "left" | "right";
  text?: string;
};

export default function LinkWithIcon({
  href,
  icon,
  align,
  text,
}: LinkWithIconProps) {
  return (
    <Link
      href={href}
      className="link mb-8 inline-flex items-center gap-2 font-light"
    >
      {align === "left" && icon}
      <span>{text}</span>
      {align === "right" && icon}
    </Link>
  );
}
