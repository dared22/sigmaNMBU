import { cn } from "@/lib/cn";
import { type ButtonHTMLAttributes, forwardRef } from "react";

export type ButtonVariant = "primary" | "ghost" | "terminal" | "glitch";

const base =
  "inline-flex items-center justify-center gap-2 px-5 py-2.5 font-label text-[11px] font-bold uppercase tracking-[0.24em] disabled:cursor-not-allowed disabled:opacity-45";

const variants: Record<ButtonVariant, string> = {
  primary:
    "rounded-sm border border-secondary bg-secondary text-on-secondary shadow-[0_0_15px_rgba(134,208,239,0.3)] transition-all duration-150 hover:-translate-y-px hover:shadow-glow-lg",
  ghost:
    "ghost-border rounded-sm bg-transparent text-on-surface transition-colors duration-150 hover:bg-surface-variant hover:text-secondary",
  terminal:
    "rounded-sm border border-outline-variant bg-surface-container-highest text-on-surface transition-colors duration-150 hover:bg-secondary hover:text-on-secondary",
  glitch:
    "rounded-sm border border-secondary bg-secondary text-on-secondary transition-all duration-150 data-[state=pressed]:animate-glitch hover:-translate-y-px hover:shadow-glow-md",
};

/**
 * Shared button styling. Use this when the trigger must render as an `<a>` or
 * `<Link>` (a real `<button>` cannot be nested inside an anchor), so links and
 * buttons stay visually identical without invalid markup.
 */
export function buttonClassName(
  variant: ButtonVariant = "primary",
  className?: string,
) {
  return cn(base, variants[variant], className);
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonClassName(variant, className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
