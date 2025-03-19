"use client";

import { createContext, useContext, useState, useEffect } from "react";

type PartyModeContextType = {
  isPartyMode: boolean;
  setPartyMode: (isParty: boolean) => void;
};

const PartyModeContext = createContext<PartyModeContextType | undefined>(
  undefined
);

export function PartyModeProvider({ children }: { children: React.ReactNode }) {
  const [isPartyMode, setIsPartyModeState] = useState(true);

  const setPartyMode = (isParty: boolean) => {
    setIsPartyModeState(isParty);
    const partyMode = document.getElementById("party-mode");

    if (partyMode) {
      if (!isParty) {
        partyMode.classList.add("fade-out");
        setTimeout(() => {
          partyMode.classList.add("hidden");
          partyMode.classList.remove("fade-out");
        }, 7000);
      } else {
        partyMode.classList.remove("hidden", "fade-out");
      }
    }

    document.querySelectorAll("[data-party-mode]").forEach((element) => {
      if (isParty) {
        element.classList.add("party-button");
        element.classList.remove("party-fade-out");
      } else {
        element.classList.add("party-fade-out");
        setTimeout(() => {
          element.classList.remove("party-button");
        }, 7000);
      }
    });
  };

  return (
    <PartyModeContext.Provider value={{ isPartyMode, setPartyMode }}>
      {children}
    </PartyModeContext.Provider>
  );
}

export function usePartyMode() {
  const context = useContext(PartyModeContext);
  if (context === undefined) {
    throw new Error("usePartyMode must be used within a PartyModeProvider");
  }
  return context;
}
