import React from "react";

// Components
import { Button } from "../Button";

import "./footer.scss";

interface PropsType {}

const FooterRaw = () => {
  return (
    <div id="settings-footer">
      <div>
        <Button type="button">Reject optional</Button>
        <Button type="button">Accept all</Button>
      </div>

      <Button type="button">Save Settings</Button>
    </div>
  );
};

export const Footer = React.memo<PropsType>(FooterRaw);
