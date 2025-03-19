"use client";

import { usePartyMode } from "../context/PartyModeContext";

export default function PartyButton() {
  const { isPartyMode, setPartyMode } = usePartyMode();

  const handleClick = () => {
    setPartyMode(!isPartyMode);
  };

  return (
    <button
      id="party-toggle"
      onClick={handleClick}
      data-party-mode
      className={`${
        isPartyMode ? "bg-[#00FF88]" : "bg-white"
      } hover:bg-[#00FF88] text-black px-4 py-2 rounded-full shadow-lg transition-colors duration-300`}
    >
      🎉 Party Mode
    </button>
  );
}
