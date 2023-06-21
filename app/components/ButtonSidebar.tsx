"use client";

import { IconType } from "react-icons/lib";

interface ButtonSidebarProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  active?: boolean;
  icon?: IconType;
}
const ButtonSidebar: React.FC<ButtonSidebarProps> = ({
  label,
  onClick,
  disabled,
  active,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-2.5 flex rounded-md gap-6 items-center disabled:opacity-70 disabled:cursor-not-allowed hover:text-white duration-300 w-full
        ${active ? "bg-gradient-to-tr from-primary to-darker" : "bg-none"} 
        ${active ? "text-white cursor-default" : "text-darker"} 
        ${active ? "hover:bg-accent" : "hover:bg-accent"} 
      `}
    >
      {Icon && <Icon size={23} />}
      {label}
    </button>
  );
};

export default ButtonSidebar;
