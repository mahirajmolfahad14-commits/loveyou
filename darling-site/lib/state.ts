import type Lenis from "lenis";
/** Shared mutable state read every frame by the WebGL layer (kept outside React on purpose). */
export const state: { progress: number; px: number; py: number; lenis: Lenis | null } = {
  progress: 0, px: 0, py: 0, lenis: null,
};
