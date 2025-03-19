import { atom } from 'nanostores';

export type Theme = 'dark' | 'light';
export const $theme = atom<Theme>('dark');

export function setTheme(theme: Theme) {
  $theme.set(theme);
  document.documentElement.setAttribute('data-theme', theme);
  // Persist theme choice in localStorage
  localStorage.setItem('theme', theme);
}

// Initialize theme from localStorage or system preference
export function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') as Theme;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  setTheme(initialTheme);
}