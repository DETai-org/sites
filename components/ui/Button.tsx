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
  relative
  overflow-hidden
  bg-gradient-to-br from-[#C9A86A] to-[#E6D3A3]
  text-basic-dark
  shadow-[0_0_15px_rgba(201,168,106,0.25)]
  transition-all duration-300
  hover:brightness-105 active:brightness-90

  before:absolute before:inset-0 before:rounded-lg
  before:bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.45),transparent)]
  before:w-[200%] before:h-full
  before:opacity-0
  before:translate-x-[-150%]
  before:transition-all before:duration-700

  group-hover:before:opacity-100
  group-hover:before:translate-x-[150%]

  after:absolute after:inset-0 after:rounded-lg
  after:shadow-[inset_0_0_15px_rgba(255,255,255,0.22)]
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
          "group inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-sans font-medium leading-tight rounded-lg transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary",
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
        "group inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-sans font-medium leading-tight rounded-lg transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary",
        variantClasses[variant],
        className,
      )}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
