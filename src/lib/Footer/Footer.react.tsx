import React from "react";

// Components
import { Button } from "../Button";

import "./footer.scss";

export interface PropsType {
  readonly text?: {
    readonly rejectOptional?: string;
    readonly acceptAll?: string;
    readonly saveSettings?: string;
  };

  readonly onAcceptAll: () => void;
  readonly onAcceptRequired: () => void;
  readonly onAcceptCurrent: () => void;
}

const DEFAULT_TEXT = {
  REJECT_OPTIONAL: "Reject optional",
  ACCEPT_ALL: "Accept all",
  SAVE_SETTINGS: "Save Settings",
};

const FooterRaw = ({
  onAcceptAll,
  onAcceptRequired,
  onAcceptCurrent,
  text = {},
}: PropsType) => {
  const {
    rejectOptional = DEFAULT_TEXT.REJECT_OPTIONAL,
    acceptAll = DEFAULT_TEXT.ACCEPT_ALL,
    saveSettings = DEFAULT_TEXT.SAVE_SETTINGS,
  } = text;

  return (
    <div id="settings-footer" className="footer-wrapper">
      <div className="button-group">
        <Button type="button" onClick={onAcceptRequired}>
          {rejectOptional}
        </Button>
        <Button type="button" onClick={onAcceptAll}>
          {acceptAll}
        </Button>
      </div>

      <Button type="button" onClick={onAcceptCurrent}>
        {saveSettings}
      </Button>
    </div>
  );
};

export const Footer = React.memo<PropsType>(FooterRaw);
