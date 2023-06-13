import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  icon?: IconType;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  required,
  register,
  icon: Icon,
  errors,
  placeholder,
}) => {
  return (
    <div className="mb-1">
      <label htmlFor={id} className="block mb-2 text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-darker/60">
          {Icon && <Icon size={20} />}
        </div>
        <input
          id={id}
          disabled={disabled}
          {...register(id, { required })}
          type={type}
          className={`bg-gray-50 border-[3px] border-gray-300 text-sm font-medium rounded-lg block w-full p-2.5
          ${Icon ? "pl-10" : "pl-4"}
          ${errors[id] ? "border-red-200" : "border-primary/10"}
          ${errors[id] ? "focus:outline-red-400" : "focus:outline-primary/60"}
          `}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default Input;