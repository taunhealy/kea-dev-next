"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";

import { usePartyMode } from "../context/PartyModeContext";
import { Button } from "@/app/components/ui/button";

export default function PartyButton() {
  const { isPartyMode, setPartyMode } = usePartyMode();

  const handleClick = () => {
    setPartyMode(!isPartyMode);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            id="party-toggle"
            onClick={handleClick}
            data-party-mode
            variant="outline"
            size="sm"
            className="font-primary text-sm"
          >
            🎉
          </Button>
        </TooltipTrigger>
        <TooltipContent className="font-primary">
          Cheers to epic adventures 🍻
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
