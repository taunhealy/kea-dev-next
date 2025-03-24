"use client";

import { usePartyMode } from "../context/PartyModeContext";
import { Button } from "@/app/components/ui/button";

export default function PartyButton() {
  const { isPartyMode, setPartyMode } = usePartyMode();

  const handleClick = () => {
    setPartyMode(!isPartyMode);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[10000]">
      <Button
        id="party-toggle"
        onClick={handleClick}
        data-party-mode
        variant="outline"
      >
        🎉 Celebrate
      </Button>
    </div>
  );
}
