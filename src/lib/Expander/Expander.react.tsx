import React, { useState, useCallback } from "react";

// Components
import { Switch } from "./Switch";

import "./expander.scss";

interface PropsType extends React.HTMLAttributes<HTMLDivElement> {
  readonly id: string;
  readonly isRequired?: boolean;
  readonly isDisabled?: boolean;
  readonly defaultChecked?: boolean;
}

interface InternalProps extends PropsType {
  readonly onToggleSelection: () => void;
}

const ExpanderRaw = ({
  isRequired,
  isDisabled,
  defaultChecked = false,
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
          <h5>title</h5>
        </div>

        <Switch
          disabled={isDisabled || isRequired}
          defaultChecked={isRequired || defaultChecked}
          onChange={onToggleSelection}
        />
      </div>

      {open && (
        <div className="expander-content">
          <span>hallo</span>
        </div>
      )}
    </div>
  );
};

export const Expander = React.memo<PropsType>(ExpanderRaw);
