import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const InputField = forwardRef(
  ({ label, error, className = "", ...props }: InputFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <div className="w-full">
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          {label}
        </label>
        <input
          ref={ref}
          className={`w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all duration-200 bg-gray-50/50 hover:bg-white text-gray-900 text-sm shadow-sm ${className}`}
          {...props}
        />
        {error && <p className="text-red-500 text-xs mt-1.5 font-medium">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = "InputField";
export default InputField;