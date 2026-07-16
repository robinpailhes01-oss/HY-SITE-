import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brass text-marine-300 hover:bg-brass-100 border border-transparent",
  outline:
    "border border-current bg-transparent hover:bg-marine/5",
  ghost: "bg-transparent hover:bg-marine/5 border border-transparent",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-semibold tracking-wide uppercase transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass disabled:pointer-events-none disabled:opacity-50";

interface ButtonAsButton
  extends ButtonBaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: undefined;
}

interface ButtonAsLink
  extends ButtonBaseProps,
    Omit<React.ComponentProps<typeof Link>, "className" | "children"> {
  href: string;
}

type Props = ButtonAsButton | ButtonAsLink;

export function Button({ variant = "primary", className, children, ...props }: Props) {
  const classes = cn(baseClasses, variantClasses[variant], className);

  if ("href" in props && props.href) {
    return (
      <Link className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
