import React from "react";
import ReactDOM from "react-dom";
import { CookieConsent } from "./lib/CookieConsent.react";

import { Expander } from "./lib/Expander";

ReactDOM.render(
  <CookieConsent title="Hallo Cookies" onAcceptSelection={console.log}>
    <Expander id="functional" isRequired />
    <Expander id="marketing" defaultChecked />
  </CookieConsent>,
  document.getElementById("root")
);
