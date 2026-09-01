# Hero V3 & Related Enhancements

## Goal Description
Upgrade the hero section to a premium, interactive layout with a floating badge, glowing rings, a subtle background glow, floating tech badges, and a mouse‑follow glow cursor. Add a personal line to the About section and update various section headers and layouts (projects, mobile responsiveness, etc.).

## User Review Required
- Confirm the exact text for the floating badge ("Available for Opportunities").
- Confirm the list of tech badges to display around the hero image (React.js, JavaScript, Next.js).
- Approve the new section header text for Projects ("Selected Work") and its description.
- Approve the personal line to add in the About section.

## Open Questions
[!IMPORTANT] Verify if the "GlowCursor" should be rendered globally (e.g., in `page.js`) or only within the hero section.
[!IMPORTANT] Should the new `ProjectShowcase` component replace the existing `ProjectCard` usage throughout the site?
[!IMPORTANT] Do you want the ring animations to use Tailwind utilities only, or custom CSS/inline styles?

## Proposed Changes
---
### Hero Section
- **Create `src/components/hero/HeroBadge.jsx`** (floating badge component).
- **Create `src/components/hero/HeroRings.jsx`** (outer glow rings and subtle background glow).
- **Create `src/components/hero/TechBadges.jsx`** (floating tech badge elements).
- Update `src/components/hero/Hero.jsx`:
  - Import and render `HeroBadge`, `HeroRings`, `TechBadges`.
  - Add `"use client"` at top.
  - Adjust grid classes for mobile (`grid-cols-1 lg:grid-cols-2`).
  - Add order classes to mobile (`order-1 lg:order-2` for image, `order-2 lg:order-1` for content).
  - Update heading/content to match provided copy.
- Import and render `GlowCursor` (new component) inside hero or globally.

---
### GlowCursor Component
- **Create `src/components/common/GlowCursor.jsx`** with code supplied by the user.
- Ensure it is a client component.
- Add import in `src/app/page.js` (or layout) so cursor follows mouse globally.

---
### ProjectShowcase Component
- **Create `src/components/projects/ProjectShowcase.jsx`** using the layout description:
  - Accept props: `title`, `image`, `reverse`, `technologies` (array of strings).
  - Use `motion.div` hover scaling for the image container.
  - Render tech stack pills similar to skill badges.
  - Apply conditional Tailwind class for order reversal.
- Update `src/components/projects/Projects.jsx` (or wherever project list is rendered) to use `ProjectShowcase` with data for Movie Station and BookDot.
- Replace old `ProjectCard` imports if no longer needed.

---
### About Section
- Open `src/components/about/About.jsx` and add the personal line after existing description:
  "Outside of development, I enjoy exploring new technologies, creating web experiences, and continuously improving my skills."

---
### Section Header Updates
- **Projects Section**: Change heading from "Projects" to "Selected Work" and add description: "A collection of projects that reflect my frontend development journey."
- Apply same style updates to About, Skills, Experience, Contact headings if needed (use same heading size and style).

---
### Mobile Upgrade
- Ensure hero grid uses `grid-cols-1 lg:grid-cols-2` and order classes as described.
- Verify other sections already use responsive grid utilities; adjust if necessary.

## Verification Plan
### Automated Tests
- Run `npm run dev` and manually inspect the hero section for badge, rings, tech badges, and glow cursor.
- Verify the ProjectShowcase layout alternates correctly with `reverse` prop.
- Check that the About section displays the new personal line.
- Confirm mobile view (using browser dev tools) shows photo first then content.
- Ensure no console errors (e.g., missing imports).

### Manual Verification
- Open the site in a browser, hover over the hero image and project screenshots to see animations.
- Resize the viewport to mobile size and confirm layout order.
- Click on the floating tech badges to ensure they are not interactive (just decorative).

---
**Implementation Steps**
1. Create `GlowCursor.jsx`.
2. Create `HeroBadge.jsx`, `HeroRings.jsx`, `TechBadges.jsx`.
3. Update `Hero.jsx` to import and render the new components, adjust markup and classes.
4. Add `GlowCursor` to `src/app/page.js` (or layout).
5. Create `ProjectShowcase.jsx`.
6. Update `Projects.jsx` (or relevant file) to use `ProjectShowcase` with provided data.
7. Update `About.jsx` with personal line.
8. Update section header text for Projects.
9. Test responsive grid ordering for hero.
10. Run the dev server and verify.

Please review the plan and provide any adjustments or approvals.

---
