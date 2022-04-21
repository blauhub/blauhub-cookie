import React, { useState, useMemo, useCallback } from "react";

// Components
import { Expander } from "./Expander";
import { Button } from "./Button";
import { Header } from "./Header";
import { Footer } from "./Footer";

import "./consent.scss";

interface PropsType {
  readonly isOpen?: boolean;
  readonly title?: React.ReactNode;
  readonly children?: React.ReactNode;
  readonly onAcceptSelection: (permisssions: string[]) => void;
}

// const config = {
//   mode: "opt-in", // 'opt-in', 'opt-out'
//   current_lang: "en",
//   auto_language: null,
//   autorun: true, // run as soon as loaded
//   page_scripts: true,
//   hide_from_bots: true,
//   cookie_name: "cc_cookie",
//   cookie_expiration: 182, // default: 6 months (in days)
//   cookie_domain: window.location.hostname, // default: current domain
//   cookie_path: "/",
//   cookie_same_site: "Lax",
//   use_rfc_cookie: false,
//   autoclear_cookies: true,
//   revision: 0,
//   script_selector: "data-cookiecategory",
// };

const blocks = [
  {
    title: "Necessary cookies",
    description:
      "These cookies are required for you to browse the website and use its features.",
    toggle: {
      enabled: true,
      readonly: true,
    },
  },
  {
    title: "Functional cookies",
    description:
      "To improve our service we collect anonymous information about how you use our website.",
    toggle: {
      enabled: false,
      readonly: false,
    },
  },
];

export const CookieContext = React.createContext<{
  permissions: string[];
}>({
  permissions: [],
});

const getAllExpander = (expander: React.ReactNode) =>
  React.Children.toArray(expander).filter(
    (child: React.ReactElement) => child.type === Expander
  );

const CookieConsentRaw = ({
  isOpen,
  title,
  children,
  onAcceptSelection,
}: PropsType) => {
  const requiredPermissions = useMemo(
    () =>
      getAllExpander(children)
        .filter(
          (child: React.ReactElement) =>
            child.props.isRequired || child.props.defaultChecked
        )
        .map((child: React.ReactElement) => child.props.id),
    []
  );

  const [selected, setSelected] = useState<string[]>(requiredPermissions);
  const [isVisible, setIsVisible] = useState(false);

  const onOpenSettings = useCallback(() => {
    setIsVisible(!!children);
  }, [children]);

  const onCloseSettings = useCallback(() => {
    setIsVisible(false);
  }, []);

  const onToggleSelection = useCallback(
    (id: string) => () => {
      setSelected((oldSelected) => {
        if (oldSelected.includes(id)) {
          return oldSelected.filter((x) => x !== id);
        } else {
          return [...oldSelected, id];
        }
      });
    },
    []
  );

  const onAcceptAll = useCallback(() => {
    const permissions: string[] = getAllExpander(children).map(
      (child: React.ReactElement) => child.props.id
    );

    onAcceptSelection(permissions);
  }, [children, onAcceptSelection]);

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
          <Button type="button" variant="primary" onClick={undefined}>
            Accept necessary
          </Button>
          <Button type="button" variant="primary" onClick={onAcceptAll}>
            Accept all
          </Button>
        </div>
      </div>

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
          {React.Children.map(children, (child: React.ReactElement) =>
            React.cloneElement(child, {
              ...child.props,
              onToggleSelection: requiredPermissions.includes(child.props.id)
                ? undefined
                : onToggleSelection(child.props.id),
            })
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export const CookieConsent = React.memo<PropsType>(CookieConsentRaw);
