import { create } from 'storybook/theming/create';

// Mirrors src/index.css's theme tokens (--hue: 185) so the Storybook chrome
// reads as part of the same sci-fi dashboard, not a generic Storybook install.
const LOGO_SVG = `
<svg width="150" height="32" viewBox="0 0 150 32" xmlns="http://www.w3.org/2000/svg">
  <circle cx="15" cy="16" r="12" stroke="hsl(185, 100%, 43%)" stroke-width="1.5" fill="none" />
  <circle cx="15" cy="16" r="7" stroke="hsl(185, 100%, 43%)" stroke-width="1" opacity="0.5" fill="none" />
  <circle cx="15" cy="16" r="2.5" fill="hsl(185, 100%, 43%)" />
  <line x1="2" y1="16" x2="11" y2="16" stroke="hsl(185, 100%, 43%)" stroke-width="1" />
  <line x1="19" y1="16" x2="28" y2="16" stroke="hsl(185, 100%, 43%)" stroke-width="1" />
  <text x="36" y="18" font-family="Orbitron, sans-serif" font-size="13" font-weight="800" letter-spacing="2" fill="hsl(185, 100%, 43%)">ORION</text>
  <text x="36" y="28" font-family="'Share Tech Mono', monospace" font-size="6.5" letter-spacing="1" fill="hsl(185, 45%, 55%)">DATACENTER OS</text>
</svg>
`.trim();

export default create({
  base: 'dark',

  brandTitle: 'ORION · Datacenter OS',
  brandImage: `data:image/svg+xml,${encodeURIComponent(LOGO_SVG)}`,
  brandTarget: '_self',

  colorPrimary: 'hsl(185, 100%, 43%)',
  colorSecondary: 'hsl(185, 100%, 43%)',

  // UI surfaces
  appBg: 'hsl(185, 88%, 3%)',
  appContentBg: 'hsl(185, 88%, 4.5%)',
  appPreviewBg: 'hsl(185, 88%, 3%)',
  appBorderColor: 'hsla(185, 80%, 50%, 0.13)',
  appBorderRadius: 2,

  // Typography
  fontBase: '"Exo 2", sans-serif',
  fontCode: '"Share Tech Mono", monospace',

  // Text
  textColor: 'hsl(185, 60%, 90%)',
  textInverseColor: 'hsl(185, 88%, 4%)',
  textMutedColor: 'hsl(185, 38%, 42%)',

  // Toolbar
  barBg: 'hsl(185, 88%, 4.5%)',
  barTextColor: 'hsl(185, 45%, 60%)',
  barHoverColor: 'hsl(185, 100%, 43%)',
  barSelectedColor: 'hsl(185, 100%, 43%)',

  // Buttons / booleans
  buttonBg: 'hsl(185, 78%, 9%)',
  buttonBorder: 'hsla(185, 80%, 50%, 0.24)',
  booleanBg: 'hsl(185, 78%, 9%)',
  booleanSelectedBg: 'hsl(185, 100%, 43%)',

  // Form inputs
  inputBg: 'hsl(185, 78%, 7.5%)',
  inputBorder: 'hsla(185, 80%, 50%, 0.13)',
  inputTextColor: 'hsl(185, 60%, 90%)',
  inputBorderRadius: 2,

  // Grid / editors
  gridCellSize: 12,
});
