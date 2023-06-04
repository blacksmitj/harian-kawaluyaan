"use client";

import useDidMountEffect from "@/app/hooks/useDidMountEffect";
import { useCallback, useEffect, useState } from "react";
import Select from "react-select";

export type listBatal = {
  value: number;
  label: string;
};

interface MultipleSelectProps {
  value?: listBatal[];
  awal: number;
  akhir: number;
  jumlahBatal?: number;
  onChange: (value: listBatal[]) => void;
}

const MultipleSelect: React.FC<MultipleSelectProps> = ({
  onChange,
  value,
  awal,
  akhir,
  jumlahBatal,
}) => {
  const isOptionDisabled = () => {
    if (jumlahBatal === 0) {
      return true;
    }

    if (value && jumlahBatal) {
      if (value.length >= jumlahBatal) {
        return true;
      }
    }
    return false;
  };

  useDidMountEffect(() => {
    console.log("berubah");
    onChange([]);
  }, [jumlahBatal]);

  const options: { value: number; label: string }[] = [];
  for (let i = Math.ceil(awal); i <= Math.floor(akhir); i++) {
    options.push({ value: i, label: "0" + i });
  }

  return (
    <div>
      <Select
        placeholder="ex.05311640"
        isMulti
        isClearable
        options={options}
        value={value}
        isOptionDisabled={isOptionDisabled}
        onChange={(value) => onChange(value as listBatal[])}
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
