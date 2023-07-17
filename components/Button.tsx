"use client";

import { IconType } from "react-icons/lib";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  neutral?: boolean;
  small?: boolean;
  fit?: boolean;
  icon?: IconType;
}
const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  neutral,
  small,
  fit,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex
        justify-center
        items-center
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        hover:bg-accent
        ${neutral ? "bg-neutral-100" : "bg-primary"}
        ${neutral ? "text-darker" : "text-white"}
        ${neutral ? "hover:text-white" : ""}
        ${small ? "py-1" : "py-3"}
        ${small ? "text-sm" : "text-md"}
        ${fit ? "w-fit px-3" : "w-full"}
      `}
    >
      {Icon && <Icon size={24} className={label ? `mr-2 -ml-3` : ""} />}
      {label}
    </button>
  );
};

export default Button;
