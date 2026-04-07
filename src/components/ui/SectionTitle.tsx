import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "",
        className,
      )}
    >
      {eyebrow && (
        <p
          className="text-[#cc2929] uppercase mb-4"
          style={{
            fontFamily: "var(--font-oswald)",
            fontSize: 13,
            letterSpacing: "0.2em",
            fontWeight: 500,
          }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="text-white"
        style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(36px, 6vw, 52px)",
          lineHeight: 1,
          letterSpacing: "0.02em",
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-[#999] mt-4"
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 18,
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
