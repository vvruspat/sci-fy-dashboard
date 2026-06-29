/**
 * Chart color tokens — mirrors the CSS custom property system.
 * To change the entire theme: update HUE here AND --hue in index.css.
 *
 * HUE reference:
 *   185 = soft blue-cyan (current)
 *   165 = warm green-teal
 *   200 = deep ocean blue
 *   260 = sci-fi purple
 *    0  = red (danger mode)
 */
export const HUE = 185;

function hsl(h: number, s: number, l: number) {
  return `hsl(${h} ${s}% ${l}%)`;
}
function hsla(h: number, s: number, l: number, a: number) {
  return `hsla(${h} ${s}% ${l}% / ${a})`;
}

export const theme = {
  // ─── Accent scale ───────────────────────────────────
  accent:     hsl(HUE, 100, 43),   // --teal-300  primary bright
  accentMid:  hsl(HUE, 85,  36),   // --teal-500
  accentDim:  hsl(HUE, 74,  22),   // --teal-700  secondary series
  accentDark: hsl(HUE, 76,  15),   // --teal-800  dark fill

  // ─── Fills / gradients ──────────────────────────────
  fillHigh:   hsla(HUE, 80, 50, 0.30),
  fillMid:    hsla(HUE, 80, 50, 0.18),
  fillLow:    hsla(HUE, 80, 50, 0.06),
  fillNone:   hsla(HUE, 80, 50, 0),

  // ─── Grid / axis ────────────────────────────────────
  grid:       hsla(HUE, 80, 50, 0.05),
  axis:       hsl(HUE, 38, 28),
  cursor:     hsla(HUE, 80, 50, 0.03),

  // ─── Status (never changes with HUE) ────────────────
  danger:     'hsl(352 100% 62%)',
  warning:    'hsl(30 78% 62%)',

  // ─── Legend dots ────────────────────────────────────
  legendPrimary:   hsl(HUE, 100, 43),
  legendSecondary: hsl(HUE, 74,  22),
} as const;
