import React from "react";
import ReactDOM from "react-dom/client";
import { CookieConsent } from "../../src/lib/CookieConsent.react";
import {
  CookieConsentContext,
  useCookieConstent,
} from "../../src/lib/CookieConsentContext.react";

import { Expander } from "../../src//lib/Expander";

const NestedComponent = () => {
  const permissions = useCookieConstent();

  return (
    <p>
      {permissions.length === 0
        ? "Nothing here yet"
        : `Yout chose: ${permissions.join(",")}`}
    </p>
  );
};

const main = () => {
  const container = document.getElementById("root");

  if (!container) throw new Error("Container not found");

  const root = ReactDOM.createRoot(container);

  root.render(
    <CookieConsentContext>
      <CookieConsent
        isOpen
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
        <Expander id="marketing" title="Marketing">
          <p>Detail Info 2</p>
        </Expander>
        <Expander id="analytics" title="Analytics">
          <p>Detail Info 3</p>
        </Expander>
        <Expander id="advertisment" title="Ads">
          <p>Detail Info 4</p>
        </Expander>
      </CookieConsent>

      <NestedComponent />
    </CookieConsentContext>
  );
};

main();
