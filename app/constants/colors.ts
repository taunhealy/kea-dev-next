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
