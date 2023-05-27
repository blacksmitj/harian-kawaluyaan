"use client";

import React, { useCallback, useEffect, useRef } from "react";
import Select from "react-select";

interface MultipleSelectProps {
  listBatal: { nomoratur: number };
  jumlahBatal?: number;
  onChange: (value: []) => void;
}

const MultipleSelect: React.FC<MultipleSelectProps> = ({
  jumlahBatal,
  onChange,
  listBatal,
}) => {
  const nomoratur = [398843, 398846];
  const obj: { number: number }[] = [];

  for (let i = Math.ceil(nomoratur[0]); i <= Math.floor(nomoratur[1]); i++) {
    obj.push({ number: i });
  }

  // listBatal.map(batal => [])

  console.log(obj);

  return (
    <div>
      <Select
        placeholder="ex.05311640"
        isMulti
        isClearable
        options={obj}
        value={listBatal}
        onChange={(value) => onChange(value as listBatal)}
      />
    </div>
  );
};

export default MultipleSelect;
