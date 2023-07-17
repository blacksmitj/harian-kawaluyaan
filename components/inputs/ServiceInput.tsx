"use client";

import { IconType } from "react-icons";

interface ServiceInputProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const ServiceInput: React.FC<ServiceInputProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        hover:bg-accent hover:text-white rounded-xl p-1 flex flex-row items-center gap-3 duration-300 cursor-pointer h-full text-left overflow-hidden
        ${selected ? "bg-primary" : "bg-neutral-50"}
        ${selected ? "text-white" : "text-primary"}
      `}
    >
      <div
        className={` -m-2 pl-1 border-r-2 
        `}
      >
        <Icon size={26} className="m-4" />
      </div>
      <div className="font-medium text-xs ml-2">{label}</div>
    </div>
  );
};

export default ServiceInput;
