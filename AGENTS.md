# Agent instructions

## Component library conventions

This project follows atomic design: `src/atoms/`, `src/molecules/`, `src/organisms/`, `src/pages/`.

- **`atoms/` is sub-grouped by category** — `layout`, `typography`, `surfaces`, `feedback`,
  `data-display`, `form`. When adding a new atom, put it in the subfolder that matches its
  purpose (create a new subfolder only if none of the existing ones fit). Each component lives
  in its own folder: `ComponentName/ComponentName.tsx` (+ `.module.css` if it needs CSS),
  `index.ts` re-exporting it.
- **Molecules and organisms compose atoms — they don't own layout CSS.** Use the layout
  primitives in `atoms/layout/` (`Box`, `Stack`, `Cluster`, `Grid`, `Center`, `Divider`) for
  flex/grid/spacing/position instead of writing a `.module.css` for it. Decorative or
  variant-specific styling (colors, animations, shadows) that isn't pure layout belongs in a
  small dedicated atom, not in the molecule/organism's own stylesheet — even if that atom ends
  up used in only one place.
- **Every component must ship with a Storybook file.** Any new or modified component under
  `atoms/`, `molecules/`, `organisms/`, or `pages/` needs a matching `*.stories.tsx` in
  `src/stories/` before the work is considered done. No exceptions for "small" or "internal"
  atoms (e.g. layout primitives still need stories showing their variants/props).
- **Story `title` must mirror the folder structure**, so the Storybook sidebar reflects the same
  grouping as the codebase:
  - Atoms: `Atoms/<Subfolder>/<ComponentName>` — e.g. `Atoms/Layout/Box`, `Atoms/Feedback/Badge`,
    `Atoms/Data Display/Sparkline` (subfolder name title-cased, hyphens become spaces).
  - Molecules: `Molecules/<ComponentName>`
  - Organisms: `Organisms/<ComponentName>`
  - Pages: `Pages/<ComponentName>`
- Run `npm run storybook` locally to confirm a new story actually renders (no missing-arg
  errors, controls work) before considering the component finished.
