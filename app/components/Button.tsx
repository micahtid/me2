"use client";

import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
    className?: string;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, className, children }) => {
  return (
    <button onClick={onClick} className={twMerge(className, "px-4 py-2 bg-blue-500/30 text-white font-semibold rounded-md shadow-md")}>
        {children}
    </button>
  )
}

export default Button