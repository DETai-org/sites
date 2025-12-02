import { type ComponentPropsWithoutRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = ButtonBaseProps & ComponentPropsWithoutRef<"button"> & {
  as?: "button";
};

type ButtonAsLink = ButtonBaseProps & ComponentPropsWithoutRef<"a"> & {
  as: "a";
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gold-primary text-basic-dark shadow-[0_0_20px_rgba(212,175,106,0.25)] hover:bg-gold-dark hover:shadow-[0_0_30px_rgba(212,175,106,0.35)] transition-all duration-300",
  secondary:
    "border-2 border-gold-primary text-gold-primary hover:bg-gold-soft/20 hover:text-gold-dark transition-all duration-300",
};

export default function Button(props: ButtonProps) {
  if (props.as === "a") {
    const { variant = "primary", className, children, ...anchorProps } = props;

    return (
      <a
        className={cn(
          "inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-sans font-medium leading-tight rounded-lg transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-primary",
          variantClasses[variant],
          className,
        )}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  const { variant = "primary", className, children, ...buttonProps } = props;

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-sans font-medium leading-tight rounded-lg transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-primary",
        variantClasses[variant],
        className,
      )}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
