import React from "react";

// Components
import { Button } from "../Button";

import "./footer.scss";

interface PropsType {
  readonly onAcceptAll: () => void;
  readonly onAcceptRequired: () => void;
  readonly onAcceptCurrent: () => void;
}

const FooterRaw = ({
  onAcceptAll,
  onAcceptRequired,
  onAcceptCurrent,
}: PropsType) => {
  return (
    <div id="settings-footer">
      <div>
        <Button type="button" onClick={onAcceptRequired}>
          Reject optional
        </Button>
        <Button type="button" onClick={onAcceptAll}>
          Accept all
        </Button>
      </div>

      <Button type="button" onClick={onAcceptCurrent}>
        Save Settings
      </Button>
    </div>
  );
};

export const Footer = React.memo<PropsType>(FooterRaw);
