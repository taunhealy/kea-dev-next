"use client";

import { createContext, useContext, useState } from "react";

type PartyModeContextType = {
  isPartyMode: boolean;
  setPartyMode: (isParty: boolean) => void;
};

const PartyModeContext = createContext<PartyModeContextType | undefined>(
  undefined
);

export function PartyModeProvider({ children }: { children: React.ReactNode }) {
  const [isPartyMode, setIsPartyModeState] = useState(false);

  const setPartyMode = (isParty: boolean) => {
    console.log("Setting party mode:", isParty); // Debug log
    setIsPartyModeState(isParty);

    // Handle party mode button styling
    document.querySelectorAll("[data-party-mode]").forEach((element) => {
      if (isParty) {
        element.classList.add("party-button");
        element.classList.remove("party-fade-out");
      } else {
        element.classList.add("party-fade-out");
        setTimeout(() => {
          element.classList.remove("party-button");
        }, 500);
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
