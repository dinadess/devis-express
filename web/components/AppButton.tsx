import React, { ReactNode } from "react";
import { Button } from "./ui/button";

type AppButtonProps = {
  children: ReactNode;
  link?: boolean;
  variant?: string;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
};

const baseStyle =
  "font-medium px-6 py-3 rounded-[0.625rem] transition-colors cursor-pointer w-fit h-auto flex items-center gap-2.5";

const defaultStyle =
  "text-white bg-primary-color-500 hover:text-primary-color-900 hover:bg-secondary-color-500";

const outlineStyle =
  "text-black-400 bg-white border-2 border-gray-100 hover:text-white hover:border-transparent";

const AppButton = ({
  children,
  link,
  variant = "default",
  type,
  onClick,
  disabled,
}: AppButtonProps) => {
  return (
    <Button
      type={type}
      asChild={link}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${
        variant === "default" ? defaultStyle : outlineStyle
      }`}
    >
      {children}
    </Button>
  );
};

export default AppButton;
