import React from "react";

import "./switch.scss";

interface PropsType extends React.InputHTMLAttributes<HTMLInputElement> {}

const stopPropagation = (event: React.MouseEvent) => event.stopPropagation();

const SwitchRaw = ({ ...props }: PropsType) => {
  return (
    <label className="switch" onClick={stopPropagation}>
      <input type="checkbox" role="switch" {...props} />
    </label>
  );
};

export const Switch = React.memo<PropsType>(SwitchRaw);
