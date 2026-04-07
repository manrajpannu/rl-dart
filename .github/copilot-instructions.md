# Project Guidelines

## Scope
These instructions apply to the whole workspace. Keep changes focused, minimal, and consistent with existing class-based Three.js patterns.

## Build And Run
- Install dependencies: `npm install`
- Start dev server: `npm run dev` (or `npx vite`)
- Build for GitHub Pages: `npm run build`
- Preview production build: `npm run preview`
- Deploy site: `npm run deploy`
- Tests are not configured yet (`npm test` intentionally fails).

## Architecture
- Main loop and fixed timestep live in `src/main.js`.
- `src/Engine.js` orchestrates scene entities, mode switching, and per-frame updates.
- Core entities are grouped by domain:
  - `src/Car/` for car behavior, camera, and boost visuals
  - `src/Ball/` for ball logic, movement, collision, and health bars
  - `src/modes/` for gameplay modes (`Mode`, `Freeplay`, `ChallengeMode`)
- Shared tuning values live in `src/physicsConfig.js`; prefer changing configuration there instead of hardcoding new constants.

## Project Conventions
- Prefer ES modules and class-based composition (`THREE.Group`) used across `src/`.
- Movement strategies under `src/Ball/Movement/` follow a common interface with `update(ball, dt)` and `reset(...)`.
- Keep rendering and update responsibilities separate: scene graph construction in constructors, simulation in `update(dt)` methods.
- Use `import.meta.env.BASE_URL` for asset URLs so paths work in both local dev and GitHub Pages deploys.

## Deployment And Environment Gotchas
- Vite `base` is set to `/rl-dart/` and build output is `docs/` in `vite.config.js`; preserve this unless deployment target changes.
- `docs/` is a generated build output directory. Do not hand-edit generated assets.
- Physics uses a fixed timestep accumulator; avoid converting core updates to frame-time-only logic.

## Reference Docs
- Project overview and controls: `README.md`
- Contribution workflow: `CONTRIBUTING.md`
- Community behavior expectations: `CODE_OF_CONDUCT.md`