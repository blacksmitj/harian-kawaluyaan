import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputNomoraturProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  awal?: number;
  validate?: any;
}

const InputNomoratur: React.FC<InputNomoraturProps> = ({
  id,
  label,
  type = "number",
  disabled,
  required,
  register,
  errors,
  awal = 1,
  validate,
}) => {
  const errorMessage = errors[id]?.message;

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
          {...register(id, {
            required,
            min: 1,
            validate: validate,
          })}
          type={type}
          className={`bg-gray-50 border-[3px] border-gray-300 font-medium rounded-lg block w-full p-2 pl-8
          ${errors[id] ? "border-red-200" : "border-primary/10"}
          ${errors[id] ? "focus:outline-red-400" : "focus:outline-primary/60"}
          `}
          placeholder="5311640"
        />
      </div>
      <p className="text-xs text-red-400 p-1">
        {errors[id] && "" + errorMessage}
      </p>
    </div>
  );
};

export default InputNomoratur;
