import React, { useState, useCallback } from "react";
import Cookies from "js-cookie";

// Constants
import { COOKIE_PREFIX } from "./CookieConsent.constants";

export const CookieContext = React.createContext<{
  revision: number;
  permissions: string[];
}>({
  revision: 0,
  permissions: [],
});

interface PropsType {
  readonly children: React.ReactNode;
}

const CookieConsentRaw = ({ children }: PropsType) => {
  console.log(Cookies.get(COOKIE_PREFIX));
  const [permissions, setPermissions] = useState([]);

  return (
    <CookieContext.Provider value={{ revision: 0, permissions }}>
      {children}
    </CookieContext.Provider>
  );
};

export const CookieConsent = React.memo<PropsType>(CookieConsentRaw);
