import React, { useState, useCallback } from "react";

// Components
import { Switch } from "./Switch";

import "./expander.scss";

interface PropsType {
  readonly isChecked?: boolean;
  readonly isDisabled?: boolean;
}

const ExpanderRaw = ({ isDisabled, isChecked }: PropsType) => {
  const [open, setOpen] = useState(false);

  const toggleExpander = useCallback((event: React.MouseEvent) => {
    setOpen((x) => !x);
  }, []);

  return (
    <div className="expander">
      <div className="expander-header" onClick={toggleExpander}>
        <div className="expander-title">
          <span className={`caret ${open ? "up" : "down"}`} />
          <h5>title</h5>
        </div>

        <Switch disabled={isDisabled} defaultChecked={isChecked} />
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
