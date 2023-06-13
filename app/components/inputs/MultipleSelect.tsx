"use client";

import useDidMountEffect from "@/app/hooks/useDidMountEffect";
import Select from "react-select";

export type listCanceled = {
  value: number;
  label: string;
};

interface MultipleSelectProps {
  value?: listCanceled[];
  started: number;
  ended: number;
  canceled?: number;
  onChange: (value: listCanceled[]) => void;
}

const MultipleSelect: React.FC<MultipleSelectProps> = ({
  onChange,
  value,
  started,
  ended,
  canceled,
}) => {
  const isOptionDisabled = () => {
    if (canceled === 0) {
      return true;
    }

    if (value && canceled) {
      if (value.length >= canceled) {
        return true;
      }
    }
    return false;
  };

  useDidMountEffect(() => {
    onChange([]);
  }, [canceled]);

  const options: { value: number; label: string }[] = [];
  for (let i = Math.ceil(started); i <= Math.floor(ended); i++) {
    options.push({ value: i, label: "0" + i });
  }

  return (
    <div>
      <Select
        placeholder="ex.05311640"
        isMulti
        isClearable={false}
        options={options}
        value={value}
        isOptionDisabled={isOptionDisabled}
        onChange={(value) => onChange(value as listCanceled[])}
        noOptionsMessage={() => "Oops!! data tidak ditemukan."}
        classNames={{
          control: () => "p-1 border-[3px] !important",
          input: () => "text-xs",
          option: () => "text-xs",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "#0C7066",
            primary25: "#0D7D2720",
          },
        })}
      />
    </div>
  );
};

export default MultipleSelect;
