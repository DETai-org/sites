"use client";

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

// ===============================================================
// 🚀 BUTTON VARIANTS — ВАРИАНТЫ КНОПОК
// Здесь определяются ВСЕ стили кнопок (PRIMARY, SECONDARY и др.)
// ===============================================================

const variantClasses: Record<ButtonVariant, string> = {
  primary: `
  btn-shimmer
  bg-gradient-to-br from-[#B68E3C] to-[#F2D389]
  text-basic-dark
  shadow-[0_0_15px_rgba(201,168,106,0.25)]
  transition-all duration-300
  hover:brightness-105 active:brightness-90
`,
  secondary:
    "border-2 border-accent-primary text-accent-primary hover:bg-accent-soft/20 hover:text-accent-hover active:bg-accent-soft/10 transition-all duration-300",
};


export default function Button(props: ButtonProps) {
  if (props.as === "a") {
    const { variant = "primary", className, children, ...anchorProps } = props;

    return (
      <a
        className={cn(
          "group relative inline-flex items-center justify-center overflow-hidden gap-2 px-6 py-3 text-base font-sans font-medium leading-tight rounded-lg transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary",
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
        "group relative inline-flex items-center justify-center overflow-hidden gap-2 px-6 py-3 text-base font-sans font-medium leading-tight rounded-lg transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary",
        variantClasses[variant],
        className,
      )}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
