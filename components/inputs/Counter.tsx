"use client";

import { useCallback, useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  maximalCounter?: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
  maximalCounter,
}) => {
  const [counterMessage, setCounterMessage] = useState("");

  useEffect(() => {
    if (maximalCounter && maximalCounter < value) {
      onChange(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maximalCounter]);

  const onAdd = useCallback(() => {
    if (maximalCounter) {
      if (value >= maximalCounter) {
        setCounterMessage(
          "Pengguna " + title + " tidak bisa lebih dari " + maximalCounter
        );
        return;
      }
    }
    onChange(value + 1);
    setCounterMessage("");
  }, [onChange, value, maximalCounter, title]);

  const onReduce = useCallback(() => {
    if (value <= 0) {
      setCounterMessage("Pengguna " + title + " tidak bisa lebih dari 0");
      return;
    }
    onChange(value - 1);
    setCounterMessage("");
  }, [onChange, value, title]);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row gap-4 items-center justify-between">
        <div className="flex flex-col">
          <div className="font-medium text-sm">{title}</div>
          <div className="font-light text-gray-600 text-xs">{subtitle}</div>
        </div>
        <div className="flex flex-row items-center gap-4">
          <div
            onClick={onReduce}
            className="
              w-10
              h-10
              rounded-full
              border-[3px]
              border-emerald-600/10
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
          <div className="font-light text-2xl px-2 py-2 rounded-lg">
            {value}
          </div>
          <div
            onClick={onAdd}
            className="
              w-10
              h-10
              rounded-full
              border-[3px]
              border-emerald-600/10
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
      <div className="text-xs text-rose-400">
        {counterMessage && counterMessage}
      </div>
    </div>
  );
};

export default Counter;
