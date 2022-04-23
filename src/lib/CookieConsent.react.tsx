import React, { useState, useMemo, useContext, useCallback } from "react";
import Cookies from "js-cookie";

// Components
import { Expander } from "./Expander";
import { Button } from "./Button";
import { Header } from "./Header";
import { Footer, FooterProps } from "./Footer";

// Constants
import { COOKIE_PREFIX } from "./CookieConsent.constants";

// Context
import { CookieContext } from "./CookieConsentContext.react";

import "./consent.scss";

type SettingsProps = FooterProps["text"] & {
  readonly title?: React.ReactNode;
};

export interface PropsType {
  readonly isOpen?: boolean;
  readonly title?: React.ReactNode;
  readonly description?: React.ReactNode;
  readonly children?: React.ReactNode;
  readonly onAcceptSelection?: (permisssions: string[]) => void;
  readonly text?: {
    readonly openSettings?: string;
    readonly acceptNecessary?: string;
    readonly acceptAll?: string;

    readonly settings?: SettingsProps;
  };
}

const DEFAULT_TEXT = {
  OPEN_SETTINGS: "Open settings",
  ACCEPT_NECESSARY: "Accept necessary",
  ACCEPT_ALL: "Accept all",
};

const SETTINGS_TEXT = {
  TITLE: "Cookie settings",
};

const COOKIE_CONFIG = {
  expires: 182, // 6 months
};

const elementIsExpander = (child: React.ReactElement) =>
  child.type === Expander;

const getAllExpander = (expander: React.ReactNode) =>
  React.Children.toArray(expander).filter(elementIsExpander);

const CookieConsentRaw = ({
  isOpen,
  title,
  description,
  children,
  onAcceptSelection,
  text = {},
}: PropsType) => {
  const expander = useMemo(() => getAllExpander(children), [children]);
  const expanderIds: string[] = expander.map(
    (expander: React.ReactElement) => expander.props.id
  );

  const uniqueIds = [...new Set(expanderIds)];

  if (uniqueIds.length !== expanderIds.length)
    throw new Error("Ids must be unique");

  const requiredPermissions: string[] = useMemo(
    () =>
      expander
        .filter((child: React.ReactElement) => child.props.isRequired)
        .map((child: React.ReactElement) => child.props.id),
    [expander]
  );

  const { setPermissions } = useContext(CookieContext);

  const [selected, setSelected] = useState<string[]>(requiredPermissions);
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
        ...COOKIE_CONFIG,
      });

      setPermissions(selection);

      if (onAcceptSelection) {
        onAcceptSelection(selection);
      }
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

  if (!isOpen) return null;

  const {
    openSettings = DEFAULT_TEXT.OPEN_SETTINGS,
    acceptNecessary = DEFAULT_TEXT.ACCEPT_NECESSARY,
    acceptAll = DEFAULT_TEXT.ACCEPT_ALL,
    settings = {},
  } = text;

  const { title: settingsTitle = SETTINGS_TEXT.TITLE } = settings;

  return (
    <div id="cookie-wrapper">
      <div id="cookie-overlay" />

      <div id="cookie-modal">
        <div role="dialog" aria-modal="true">
          <header role="heading">{title}</header>
          <div>{description}</div>
        </div>

        <div className="footer-wrapper">
          <Button type="button" onClick={onOpenSettings}>
            {openSettings}
          </Button>

          <div className="button-group">
            <Button type="button" variant="primary" onClick={onAcceptRequired}>
              {acceptNecessary}
            </Button>
            <Button type="button" variant="primary" onClick={onAcceptAll}>
              {acceptAll}
            </Button>
          </div>
        </div>
      </div>

      <div
        id="settings-wrapper"
        role="dialog"
        className={settingsVisible ? "visible" : ""}
      >
        <Header title={settingsTitle} onCloseSettings={onCloseSettings} />

        <div id="settings-body">
          {React.Children.map(children, (child: React.ReactElement) => {
            if (elementIsExpander(child)) {
              return React.cloneElement(child, {
                ...child.props,
                onToggleSelection: requiredPermissions.includes(child.props.id)
                  ? undefined
                  : onToggleSelection(child.props.id),
              });
            } else {
              return child;
            }
          })}
        </div>

        <Footer
          text={settings}
          onAcceptAll={onAcceptAll}
          onAcceptRequired={onAcceptRequired}
          onAcceptCurrent={onAcceptCurrent}
        />
      </div>
    </div>
  );
};

export const CookieConsent = React.memo<PropsType>(CookieConsentRaw);
