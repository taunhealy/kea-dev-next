export const CATEGORY_COLORS = {
  "brand-identity": "var(--color-secondary)", // Orange
  "web-design": "var(--color-tertiary)", // Purple
  "web-development": "var(--color-quaternary)", // Pink
  media: "var(--color-primary)", // Green
} as const;

export type CategoryColor = keyof typeof CATEGORY_COLORS;

export const getColorForCategory = (category: CategoryColor) => {
  return CATEGORY_COLORS[category] || "white";
};

// Tailwind classes for each category
export const CATEGORY_TAILWIND_CLASSES = {
  "brand-identity": {
    bg: "bg-secondary/90",
    shadow: "shadow-secondary/50",
  },
  "web-design": {
    bg: "bg-tertiary/90",
    shadow: "shadow-tertiary/50",
  },
  "web-development": {
    bg: "bg-quaternary/90",
    shadow: "shadow-quaternary/50",
  },
  media: {
    bg: "bg-primary/90",
    shadow: "shadow-primary/50",
  },
} as const;
