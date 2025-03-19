import { useEffect, useState } from "react";
import { $partyMode } from "../utils/partyModeStore";
import HeroBeams from "./HeroBeams";
import PartyButton from "./PartyButton";

export default function PartyMode() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    return $partyMode.subscribe((value: any) => {
      setIsActive(value);
    });
  }, []);

  return (
    <div
      id="party-mode"
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-5000 ease-out ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
    >
      <HeroBeams />
      <PartyButton />
    </div>
  );
}
