# AGENTS.md — 3D Portfolio

## Stack
- React 18+ with TypeScript
- Vite (bundler / dev server)
- React Three Fiber + @react-three/drei
- Tailwind CSS
- ESLint + Prettier

## Quick start
```bash
npm create vite@latest . -- --template react-ts
npm install three @react-three/fiber @react-three/drei
npm install -D tailwindcss @tailwindcss/vite
npm run dev
```

## Commands
| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server (Vite) |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm run typecheck` | `tsc --noEmit` |

## Conventions
- Components in `src/components/`, one file per component
- Scene components (R3F) in `src/components/scenes/`
- Assets in `public/`
- Barrel exports via `src/components/index.ts`
- Named exports, no default exports
- Tailwind utility classes for styling

## R3F notes
- `<Canvas>` in top-level layout; children use R3F hooks
- Load models/textures via `useLoader` or `useGLTF.preload`
- `three` and `@react-three/fiber` peer versions must match
- Keep heavy 3D logic in scene components, not layout
