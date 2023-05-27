"use client";

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 0) {
      return;
    }
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex flex-row gap-4 items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onReduce}
          className="
            w-10
            h-10
            rounded-full
            border-[3px]
            border-primary/10
            flex
            items-center
            justify-center
            cursor-pointer
            hover:border-accent
            transition
            "
        >
          <AiOutlineMinus />
        </div>
        <div className="font-light text-2xl px-2 py-2 rounded-lg">{value}</div>
        <div
          onClick={onAdd}
          className="
            w-10
            h-10
            rounded-full
            border-[3px]
            border-primary/10
            flex
            items-center
            justify-center
            cursor-pointer
            hover:border-accent
            transition
            "
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
