import React from "react";

import "./button.scss";

interface PropsType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: "primary" | "secondary";
  readonly children?: React.ReactNode;
}

const ButtonRaw = ({ children, className = "", ...props }: PropsType) => {
  return (
    <button className={`button ${className}`} {...props}>
      {children}
    </button>
  );
};

export const Button = React.memo<PropsType>(ButtonRaw);
