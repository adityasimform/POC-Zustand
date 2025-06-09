import React from "react";
import clsx from "clsx";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const Input: React.FC<InputProps> = ({
  label,
  id,
  disabled,
  className,
  type = "text",
  ...props
}) => {
  const baseClasses =
    "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white";

  const disabledClasses = "opacity-50 cursor-not-allowed";

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        disabled={disabled}
        className={clsx(baseClasses, disabled && disabledClasses, className)}
        {...props}
      />
    </div>
  );
};

export default Input;
