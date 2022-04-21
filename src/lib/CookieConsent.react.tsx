import React, { useState, useMemo, useCallback } from "react";
import Cookies from "js-cookie";

// Components
import { Expander } from "./Expander";
import { Button } from "./Button";
import { Header } from "./Header";
import { Footer } from "./Footer";

import "./consent.scss";

interface PropsType {
  readonly blocking?: boolean;
  readonly title?: React.ReactNode;
  readonly description?: React.ReactNode;
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

export const CookieContext = React.createContext<{
  revision: number;
  permissions: string[];
}>({
  revision: 0,
  permissions: [],
});

const getAllExpander = (expander: React.ReactNode) =>
  React.Children.toArray(expander).filter(
    (child: React.ReactElement) => child.type === Expander
  );

const COOKIE_PREFIX = "bcc";

const CookieConsentRaw = ({
  blocking = true,
  title,
  description,
  children,
  onAcceptSelection,
}: PropsType) => {
  const requiredPermissions: string[] = useMemo(
    () =>
      getAllExpander(children)
        .filter((child: React.ReactElement) => child.props.isRequired)
        .map((child: React.ReactElement) => child.props.id),
    []
  );

  const [selected, setSelected] = useState<string[]>(requiredPermissions);
  const [open, setOpen] = useState(blocking && !Cookies.get(COOKIE_PREFIX));
  const [settingsVisible, setSettingsVisible] = useState(false);

  const onOpenSettings = useCallback(() => {
    setSettingsVisible(!!children);
  }, [children]);

  const onCloseSettings = useCallback(() => {
    setSettingsVisible(false);
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

  const saveOnAccept = useCallback(
    (selection: string[]) => {
      Cookies.set(COOKIE_PREFIX, JSON.stringify(selection), {
        expires: 182, // 6 months
      });

      setOpen(false);
      onAcceptSelection(selection);
    },
    [onAcceptSelection]
  );

  const onAcceptCurrent = useCallback(() => {
    saveOnAccept(selected);
  }, [selected, saveOnAccept]);

  const onAcceptRequired = useCallback(() => {
    saveOnAccept(requiredPermissions);
  }, [requiredPermissions, saveOnAccept]);

  const onAcceptAll = useCallback(() => {
    const permissions: string[] = getAllExpander(children).map(
      (child: React.ReactElement) => child.props.id
    );

    saveOnAccept(permissions);
  }, [children, saveOnAccept]);

  if (!open) return null;

  return (
    <div id="cookie-wrapper">
      <div id="cookie-overlay" />

      <div id="cookie-modal">
        <div role="dialog" aria-modal="true">
          <header role="heading">{title}</header>
          <div>{description}</div>
        </div>

        <div id="button-wrapper">
          <Button type="button" onClick={onOpenSettings}>
            Open Settings
          </Button>

          <div>
            <Button type="button" variant="primary" onClick={onAcceptRequired}>
              Accept necessary
            </Button>
            <Button type="button" variant="primary" onClick={onAcceptAll}>
              Accept all
            </Button>
          </div>
        </div>
      </div>

      <div
        id="settings-wrapper"
        role="dialog"
        style={{
          opacity: settingsVisible ? 1 : 0,
          pointerEvents: settingsVisible ? "all" : "none",
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

        <Footer
          onAcceptAll={onAcceptAll}
          onAcceptRequired={onAcceptRequired}
          onAcceptCurrent={onAcceptCurrent}
        />
      </div>
    </div>
  );
};

export const CookieConsent = React.memo<PropsType>(CookieConsentRaw);
