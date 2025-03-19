import { useState, useEffect } from 'react';
import { $theme, setTheme } from '../utils/themeStore';
import PartyButton from './PartyButton';
import ThemeToggle from './ThemeToggle';

export default function ButtonGroup() {
  return (
    <div className="fixed bottom-4 right-4 flex gap-2 z-[10000]">
      <ThemeToggle />
      <PartyButton />
    </div>
  );
}