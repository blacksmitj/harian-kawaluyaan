"use client";

import * as Select from "@radix-ui/react-select";
import { BsCheckLg, BsChevronDown, BsChevronUp } from "react-icons/bs";

interface SelectDateFilterProps {
  onValueChange: (value: string) => void;
}

const SelectDateFilter: React.FC<SelectDateFilterProps> = ({
  onValueChange,
}) => {
  return (
    <Select.Root defaultValue="month" onValueChange={onValueChange}>
      {/* Trigger Button */}
      <Select.Trigger className="inline-flex items-center justify-between px-4 gap-2 text-darker border-[1px] rounded-md outline-none py-2">
        <Select.Value className="md:text-sm text-xs" />
        <Select.Icon>
          <BsChevronDown size={14} />
        </Select.Icon>
      </Select.Trigger>

      {/* Content Select */}
      <Select.Portal>
        <Select.Content
          className="overflow-hidden bg-white border-[1px] rounded-md shadow-lg shadow-darker/20 text-darker"
          position="popper"
          side="left"
        >
          <Select.ScrollUpButton className="flex items-center justify-center bg-white cursor-default">
            <BsChevronUp size={14} />
          </Select.ScrollUpButton>

          <Select.Viewport className="p-2">
            <Select.Group className="flex flex-col gap-y-2">
              <Select.Label className="px-4 text-darker/60 bg-slate-50 py-2">
                Range waktu
              </Select.Label>

              <Select.Item
                className="rounded-md pl-7 px-2 py-2 relative select-none hover:bg-accent hover:text-white gap-2 flex items-center outline-none"
                value="day"
              >
                <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                  <BsCheckLg size={16} />
                </Select.ItemIndicator>
                <Select.ItemText>Hari ini</Select.ItemText>
              </Select.Item>
              <Select.Item
                className="rounded-md pl-7 px-2 py-2 relative select-none hover:bg-accent hover:text-white gap-2 flex items-center outline-none"
                value="week"
              >
                <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                  <BsCheckLg size={16} />
                </Select.ItemIndicator>
                <Select.ItemText>Mingguan</Select.ItemText>
              </Select.Item>
              <Select.Item
                className="rounded-md pl-7 px-2 py-2 relative select-none hover:bg-accent hover:text-white gap-2 flex items-center outline-none"
                value="month"
              >
                <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                  <BsCheckLg size={16} />
                </Select.ItemIndicator>
                <Select.ItemText>Bulanan</Select.ItemText>
              </Select.Item>

              <Select.Item
                className="rounded-md pl-7 px-2 py-2 relative select-none hover:bg-accent hover:text-white gap-2 flex items-center outline-none"
                value="year"
              >
                <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                  <BsCheckLg size={16} />
                </Select.ItemIndicator>
                <Select.ItemText>Tahunan</Select.ItemText>
              </Select.Item>
            </Select.Group>

            <Select.Separator />
          </Select.Viewport>
          <Select.ScrollDownButton />
          <Select.Arrow />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default SelectDateFilter;
