import React from "react";

// Components
import { Button } from "../Button";

import "./header.scss";

interface PropsType {
  readonly title?: string;
  readonly onCloseSettings: () => void;
}

const HeaderRaw = ({ title, onCloseSettings }: PropsType) => {
  return (
    <header id="settings-header">
      <h3>{title}</h3>

      <Button
        aria-label="Close"
        className="settings-close"
        onClick={onCloseSettings}
      />
    </header>
  );
};

export const Header = React.memo<PropsType>(HeaderRaw);
