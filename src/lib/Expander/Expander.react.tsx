import React, { useState, useCallback } from "react";

// Components
import { Switch } from "./Switch";

import "./expander.scss";

interface PropsType extends React.HTMLAttributes<HTMLDivElement> {
  readonly id: string;
  readonly title: string;
  readonly children: React.ReactNode;
  readonly isRequired?: boolean;
  readonly isDisabled?: boolean;
}

interface InternalProps extends PropsType {
  readonly onToggleSelection: () => void;
}

const ExpanderRaw = ({
  title,
  children,
  isRequired,
  isDisabled,
  onToggleSelection,
  ...props
}: InternalProps) => {
  const [open, setOpen] = useState(false);

  const toggleExpander = useCallback((event: React.MouseEvent) => {
    setOpen((x) => !x);
  }, []);

  return (
    <div className="expander" {...props}>
      <div className="expander-header" onClick={toggleExpander}>
        <div className="expander-title">
          <span className={`caret ${open ? "up" : "down"}`} />
          <h5>{title}</h5>
        </div>

        <Switch
          disabled={isDisabled || isRequired}
          defaultChecked={isRequired}
          onChange={onToggleSelection}
        />
      </div>

      {open && <div className="expander-content">{children}</div>}
    </div>
  );
};

export const Expander = React.memo<PropsType>(ExpanderRaw);
