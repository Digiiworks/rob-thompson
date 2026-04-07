import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

const base =
  "inline-flex items-center justify-center uppercase transition-colors duration-200 cursor-pointer border";
const sizes = "px-8 py-[14px] text-[15px] tracking-[0.08em]";
const variants: Record<Variant, string> = {
  primary:
    "bg-[#cc2929] text-white border-[#cc2929] hover:bg-[#8b0000] hover:border-[#8b0000]",
  secondary:
    "bg-transparent text-white border-white hover:text-[#cc2929] hover:border-[#cc2929]",
};

interface Props {
  href?: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  external?: boolean;
}

export default function Button({
  href,
  variant = "primary",
  children,
  className,
  type = "button",
  onClick,
  disabled,
  external,
}: Props) {
  const cls = cn(
    base,
    sizes,
    variants[variant],
    "font-[var(--font-oswald)]",
    disabled && "opacity-50 cursor-not-allowed",
    className,
  );
  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={cls}
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cls}
      style={{ fontFamily: "var(--font-oswald)" }}
    >
      {children}
    </button>
  );
}
