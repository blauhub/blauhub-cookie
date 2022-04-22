import React, { useState, useContext } from "react";
import Cookies from "js-cookie";

// Constants
import { COOKIE_PREFIX } from "./CookieConsent.constants";

export const CookieContext = React.createContext<{
  // revision: number;
  permissions: string[];
  setPermissions: React.Dispatch<string[]>;
}>({
  // revision: 0,
  permissions: [],
  setPermissions: () => {},
});

interface PropsType {
  readonly children: React.ReactNode;
}

const getCookieState = () => {
  const state = Cookies.get(COOKIE_PREFIX);

  if (!state) return [];
  else return JSON.parse(state);
};

const CookieConsentContextRaw = ({ children }: PropsType) => {
  const [permissions, setPermissions] = useState(getCookieState());

  return (
    <CookieContext.Provider value={{ permissions, setPermissions }}>
      {children}
    </CookieContext.Provider>
  );
};

export const useCookieConstent = () => {
  const ctx = useContext(CookieContext);

  return ctx.permissions;
};

export const CookieConsentContext = React.memo<PropsType>(
  CookieConsentContextRaw
);
