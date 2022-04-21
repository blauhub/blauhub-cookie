import React, { useState, useCallback } from "react";

// Components
import { Expander } from "./Expander";
import { Button } from "./Button";
import { Header } from "./Header";
import { Footer } from "./Footer";

import "./consent.scss";

interface PropsType {
  readonly title?: React.ReactNode;
}

const config = {
  mode: "opt-in", // 'opt-in', 'opt-out'
  current_lang: "en",
  auto_language: null,
  autorun: true, // run as soon as loaded
  page_scripts: true,
  hide_from_bots: true,
  cookie_name: "cc_cookie",
  cookie_expiration: 182, // default: 6 months (in days)
  cookie_domain: window.location.hostname, // default: current domain
  cookie_path: "/",
  cookie_same_site: "Lax",
  use_rfc_cookie: false,
  autoclear_cookies: true,
  revision: 0,
  script_selector: "data-cookiecategory",
};

const blocks = [
  {
    title: "Necessary cookies",
    description:
      "These cookies are required for you to browse the website and use its features.",
    toggle: {
      value: "required",
      enabled: true,
      readonly: true,
    },
  },
  {
    title: "Functional cookies",
    description:
      "To improve our service we collect anonymous information about how you use our website.",
    toggle: {
      value: "functional",
      enabled: false,
      readonly: false,
    },
  },
];

const CookieConsentRaw = ({ title }: PropsType) => {
  const [isVisible, setIsVisible] = useState(false);

  const onOpenSettings = useCallback(() => {
    setIsVisible(true);
  }, []);

  const onCloseSettings = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <div id="cookie-wrapper">
      <div id="cookie-overlay" />

      <div id="cookie-modal">
        <div role="dialog" aria-modal="true">
          <header role="heading">{title}</header>
          <div>DESCRIPTION</div>
        </div>

        <div id="button-wrapper">
          <Button type="button" onClick={onOpenSettings}>
            Open Settings
          </Button>
          <Button type="button" variant="primary" onClick={onOpenSettings}>
            Accept necessary
          </Button>
          <Button type="button" variant="primary" onClick={onOpenSettings}>
            Accept all
          </Button>
        </div>
      </div>

      {/* {isVisible && ( */}
      <div
        id="settings-wrapper"
        role="dialog"
        style={{
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? "all" : "none",
        }}
      >
        <Header title="Cookie settings" onCloseSettings={onCloseSettings} />

        <div id="settings-body">
          <Expander isDisabled isChecked />
          <Expander />
        </div>

        <Footer />
      </div>
      {/* )} */}
    </div>
  );
};

export const CookieConsent = React.memo<PropsType>(CookieConsentRaw);
