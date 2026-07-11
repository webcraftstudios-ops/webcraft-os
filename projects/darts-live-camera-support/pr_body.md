**Active issue / Sprint**: #25 — Sprint 2.2.2.2: Responsive TV layout & kiosk mode

**Product Objective**:
Implement a robust desktop and 16:9 TV layout, correct tablet/mobile stacking without horizontal scrolling, and a safe browser fullscreen (kiosk) mode while preserving all existing score functionality.

**Implementation Summary**:
- Created a defensive `useFullscreen` hook with iOS/Edge fallbacks.
- Added a "Kiosk Mode" toggle button to the `Scoreboard` header.
- Updated Tailwind grid breakpoints (using `lg:`) to establish a solid 3-column UI for 16:9 displays and sensible stacking on tablets.
- Applied `min-w-0` constraints to prevent large `BigNumber` outputs (e.g., 501) from overflowing the container horizontally.

**Changed Files**:
- `app/src/components/Scoreboard.tsx`
- `app/src/hooks/useFullscreen.ts` (new)

**Build & Test Results**:
- *Local Build*: Skipped (environment missing `npm` binary); relies on CI workflow.
- *Smoke Tests*: Needs manual validation on iPad/Safari and 16:9 TV displays.

**Screenshots**:
*(Please attach screenshots of the new responsive layout and fullscreen mode here before merging)*

**Known Limitations / Risks**:
- The Fullscreen API is subject to browser security policies and may fail silently if invoked outside a trusted user gesture or within restricted iframes. The hook is designed to fail gracefully.

**Deferred Work**:
- Animations, finish overlay, and camera functionality (explicitly out of scope for this sprint).
