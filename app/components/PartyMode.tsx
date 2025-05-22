"use client";

import { usePartyMode } from "../context/PartyModeContext";
import PartyModeFireworks from "./PartyModeFireworks";
import Confetti from "./Confetti";

export default function PartyMode() {
  const { isPartyMode } = usePartyMode();

  return (
    <>
      <div
        id="party-mode"
        className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-500 ease-out ${
          isPartyMode ? "opacity-100" : "opacity-0"
        }`}
      >
        <PartyModeFireworks isActive={isPartyMode} />
      </div>
      <Confetti isActive={isPartyMode} />
    </>
  );
}
