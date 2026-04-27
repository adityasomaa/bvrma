import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  width?: "default" | "wide" | "narrow";
  bg?: "default" | "muted" | "primary";
}

export function Section({
  eyebrow,
  title,
  subtitle,
  width = "default",
  bg = "default",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "py-20 md:py-28",
        bg === "muted" && "bg-muted/40",
        bg === "primary" && "bg-primary-950 text-primary-50",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "mx-auto px-4 sm:px-6 lg:px-8",
          width === "wide" && "max-w-7xl",
          width === "default" && "max-w-6xl",
          width === "narrow" && "max-w-3xl"
        )}
      >
        {(eyebrow || title || subtitle) && (
          <header className="mb-12 md:mb-16 max-w-3xl">
            {eyebrow && (
              <div className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-primary-700 dark:text-primary-300">
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="font-display text-4xl md:text-5xl font-semibold leading-[1.05] tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{subtitle}</p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
