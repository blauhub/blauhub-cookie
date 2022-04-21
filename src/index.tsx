import React from "react";
import ReactDOM from "react-dom";
import { CookieConsent } from "./lib/CookieConsent.react";

import { Expander } from "./lib/Expander";

ReactDOM.render(
  <CookieConsent
    title="🍪 Cookie settings"
    description={
      <p>
        Blauhub.io uses cookies to ensure you get the best experience on our
        website. While some cookies are necessary, some are used to gather
        anonymous data to improve our website. Read more at privacy policy.
      </p>
    }
    onAcceptSelection={console.log}
  >
    <p>Description preceeding cookie actions</p>

    <Expander id="functional" title="Text 1" isRequired>
      <p>Detail Info</p>
    </Expander>
    <Expander id="marketing" title="Text 2">
      <p>Detail Info 2</p>
    </Expander>
  </CookieConsent>,
  document.getElementById("root")
);
