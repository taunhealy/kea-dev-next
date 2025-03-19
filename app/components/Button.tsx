import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  className?: string;
  children: React.ReactNode;
}

// Utility function to merge Tailwind classes
const cn = (...inputs: any) => twMerge(clsx(inputs));

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  children,
  ...props
}) => {
  const [isPartyMode, setIsPartyMode] = useState(false);

  useEffect(() => {
    const partyMode = document.getElementById("party-mode");
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setIsPartyMode(!partyMode?.classList.contains("hidden"));
        }
      });
    });

    if (partyMode) {
      observer.observe(partyMode, { attributes: true });
      setIsPartyMode(!partyMode.classList.contains("hidden"));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <button
      data-party-mode
      className={cn(
        "text-main rounded-lg transition-colors duration-300 px-6 py-2",
        "focus:outline-none focus:ring-2 focus:ring-tertiary focus:ring-offset-2",
        variant === "primary" && [
          "bg-primary text-black",
          "hover:bg-primary/90",
          "dark:bg-secondary dark:hover:bg-secondary/80",
        ],
        variant === "secondary" && [
          "bg-secondary text-white",
          "hover:bg-secondary/90",
          "dark:bg-tertiary dark:hover:bg-tertiary/80",
        ],
        isPartyMode && "animate-pulse",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
