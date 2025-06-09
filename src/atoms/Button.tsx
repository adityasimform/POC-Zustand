import React from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "danger";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className,
  type,
  disabled,
  ...props
}) => {
  const baseClasses =
    "px-4 py-2 rounded transition font-medium focus:outline-none";

  const variantClasses: Record<ButtonVariant, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  const disabledClasses = "opacity-50 cursor-not-allowed";

  return (
    <button
      type={type ?? "button"}
      disabled={disabled}
      className={clsx(
        baseClasses,
        variantClasses[variant] ?? variantClasses.primary,
        disabled && disabledClasses,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
