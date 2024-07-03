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
    <button onClick={onClick} className={twMerge("px-4 py-2 bg-secondary text-white font-semibold rounded-md shadow-md", className)}>
        {children}
    </button>
  )
}

export default Button