import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons";

interface InputNomoraturProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const InputNomoratur: React.FC<InputNomoraturProps> = ({
  id,
  label,
  type = "number",
  disabled,
  required,
  register,
  errors,
}) => {
  return (
    <div className="mb-1">
      <label htmlFor={id} className="block mb-2 text-md font-medium">
        {label}
      </label>
      <div className="relative text-2xl">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-darker/60">
          0
        </div>
        <input
          id={id}
          disabled={disabled}
          {...register(id, { required })}
          type={type}
          className={`bg-gray-50 border-[3px] border-gray-300 font-medium rounded-lg block w-full p-2 pl-8
          ${errors[id] ? "border-red-200" : "border-primary/10"}
          ${errors[id] ? "focus:outline-red-400" : "focus:outline-primary/60"}
          `}
          placeholder="5311640"
        />
      </div>
    </div>
  );
};

export default InputNomoratur;
