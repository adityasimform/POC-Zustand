import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button
    className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
    {...props}
  >
    {children}
  </button>
);

export default Button;
