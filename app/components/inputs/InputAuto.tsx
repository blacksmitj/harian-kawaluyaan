import AsyncCreatableSelect from "react-select/async-creatable";

interface InputAutoProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  onSearch: (search: string) => void;
}

const InputAuto: React.FC<InputAutoProps> = ({
  label,
  value,
  onChange,
  onSearch,
}) => {
  const filter = (input: string) => {
    const option = onSearch(input);
    // return option.filter((i) =>
    //   i.label.toLowerCase().includes(input.toLowerCase())
    // );
  };

  const promiseOptions = (input: string) => {
    filter(input);
  };

  return (
    <div className="mb-1">
      <label className="block mb-2 text-sm font-medium">{label}</label>
      <div className="relative">
        <AsyncCreatableSelect
          cacheOptions // Default Props
          defaultOptions // Default Props
          loadOptions={promiseOptions} // Default Props
          value={value}
          onChange={(value) => onChange(value as string)}
          classNames={{
            control: () => "p-1 border-[3px] z-0 !important",
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
    </div>
  );
};

export default InputAuto;
