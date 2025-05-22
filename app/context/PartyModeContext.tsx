"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";

type PartyModeContextType = {
  isPartyMode: boolean;
  setPartyMode: (isParty: boolean) => void;
};

const PartyModeContext = createContext<PartyModeContextType | undefined>(
  undefined
);

export function PartyModeProvider({ children }: { children: React.ReactNode }) {
  const [isPartyMode, setIsPartyModeState] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const setPartyMode = (isParty: boolean) => {
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

    // Auto-disable party mode after 3 seconds
    if (isParty) {
      // Clear any existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Set new timer to turn off party mode after 3 seconds
      timerRef.current = setTimeout(() => {
        setIsPartyModeState(false);

        // Update button styling
        document.querySelectorAll("[data-party-mode]").forEach((element) => {
          element.classList.add("party-fade-out");
          setTimeout(() => {
            element.classList.remove("party-button");
          }, 500);
        });
      }, 3000);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

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
