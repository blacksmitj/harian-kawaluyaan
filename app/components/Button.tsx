"use client";

import { IconType } from "react-icons/lib";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  neutral?: boolean;
  small?: boolean;
  icon?: IconType;
}
const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  neutral,
  small,
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
        w-full
        hover:bg-accent
        ${
          neutral ? "bg-neutral-50" : "bg-gradient-to-tr from-primary to-darker"
        }
        ${neutral ? "text-darker" : "text-white-prime"}
        ${neutral ? "hover:text-white" : ""}
        ${small ? "py-1" : "py-3"}
        ${small ? "text-sm" : "text-md"}
      `}
    >
      {Icon && (
        <Icon
          size={24}
          className="
						mr-2
					"
        />
      )}
      {label}
    </button>
  );
};

export default Button;
