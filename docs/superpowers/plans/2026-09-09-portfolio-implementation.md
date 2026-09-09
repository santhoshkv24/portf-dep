# Personal Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bespoke, editorial developer portfolio web application for K V Santhosh adhering to the "Kinetic Monolith & Systems Telemetry" design direction with 4 interactive case study simulators, Lenis smooth scrolling, subtle HUD telemetry, magnetic cursor, and an interactive resume drawer.

**Architecture:** A high-performance Vite + React 19 + TypeScript single-page application styled with Tailwind CSS, utilizing Framer Motion for kinetic typography and spring physics, and Lenis for inertia-based smooth scrolling. The data layer strictly maps the factual resume to structured TypeScript models, and interactive micro-widgets simulate the core architectures of Santhosh's 4 flagship projects.

**Tech Stack:** Vite, React 19, TypeScript, Tailwind CSS, Motion (`framer-motion`), Lenis, Lucide React, Vitest, React Testing Library.

**Spec:** `docs/superpowers/specs/2026-09-09-portfolio-design.md`

## Global Constraints

- **Source of Truth:** All professional data, dates, roles, companies, metrics, and education must be 100% strictly derived from `resume.md`. No invented companies, achievements, or tech stacks.
- **Design Foundation:** Deep obsidian `#08090a`, bone-white `#f4f3ee`, hairline borders `rgba(255,255,255,0.08)`, and surgical cadmium orange `#ff4d00` accents. No generic AI templates, no purple-blue gradients, no excessive rounded cards.
- **Performance:** Smooth 60fps scrolling, zero layout shifts, native mobile scrolling preserved, full `prefers-reduced-motion` compliance.
- **Responsive:** Fluid layout from 320px mobile to 2560px ultra-wide displays.
- **Accessibility:** Semantic HTML5 (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`), keyboard navigation (`[J/K]` jumping, `[R]` resume trigger, `Escape` to close), and WCAG AA contrast compliance.

---

## File Structure

```
portfolio/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── public/
│   ├── Santhosh_Portrait.jpg
│   └── resume.md
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── types/
│   │   └── portfolio.ts
│   ├── data/
│   │   ├── resumeData.ts
│   │   └── projectsData.ts
│   ├── context/
│   │   └── CursorContext.tsx
│   ├── hooks/
│   │   ├── useLenis.ts
│   │   ├── useKeyboardNav.ts
│   │   └── useReducedMotion.ts
│   ├── utils/
│   │   └── cn.ts
│   ├── components/
│   │   ├── HeaderHUD.tsx
│   │   ├── Hero.tsx
│   │   ├── SelectedWork.tsx
│   │   ├── Experience.tsx
│   │   ├── TechnicalMatrix.tsx
│   │   ├── ResumeDrawer.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── Footer.tsx
│   │   └── widgets/
│   │       ├── BnySimulator.tsx
│   │       ├── UrbanResolveLifecycle.tsx
│   │       ├── HireMatrixKanban.tsx
│   │       └── OrganicaRbacMatrix.tsx
└── tests/
    ├── setup.ts
    ├── data.test.ts
    ├── HeaderHUD.test.tsx
    ├── Hero.test.tsx
    ├── BnySimulator.test.tsx
    ├── UrbanResolveLifecycle.test.tsx
    ├── HireMatrixKanban.test.tsx
    ├── OrganicaRbacMatrix.test.tsx
    ├── Experience.test.tsx
    ├── TechnicalMatrix.test.tsx
    ├── ResumeDrawer.test.tsx
    └── App.test.tsx
```

---

### Task 1: Scaffolding, Tooling & Design System Foundations

**Files:**
- Create: `package.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `src/index.css`, `src/utils/cn.ts`, `tests/setup.ts`
- Modify: None
- Test: `tests/setup.test.ts`

**Interfaces:**
- Consumes: None
- Produces: Base React + Vite + Tailwind + Vitest build pipeline and `cn(...inputs: ClassValue[]): string` utility.

- [ ] **Step 1: Write test for utility and environment setup**

Create `tests/setup.test.ts`:
```typescript
import { describe, it, expect } from 'vitest';
import { cn } from '../src/utils/cn';

describe('Environment & Utility Setup', () => {
  it('correctly merges conditional tailwind classes', () => {
    expect(cn('px-4 py-2', true && 'bg-obsidian', false && 'hidden')).toBe('px-4 py-2 bg-obsidian');
  });
});
```

- [ ] **Step 2: Create package.json and install dependencies**

Create `package.json` with dependencies: `react`, `react-dom`, `lucide-react`, `clsx`, `tailwind-merge`, `lenis`, `motion`, `@testing-library/react`, `@testing-library/jest-dom`, `vitest`, `jsdom`, `typescript`, `@types/react`, `@types/react-dom`, `tailwindcss`, `postcss`, `autoprefixer`, `vite`.

- [ ] **Step 3: Configure Vite, TypeScript, Tailwind, and PostCSS**

Create `vite.config.ts`, `tsconfig.json`, `tailwind.config.js` with Kinetic Monolith tokens:
```javascript
// tailwind.config.js tokens:
colors: {
  obsidian: '#08090a',
  surface: '#111316',
  'surface-elevated': '#181b1f',
  chalk: '#f4f3ee',
  mist: '#9ca3af',
  cadmium: '#ff4d00',
  'cadmium-hover': '#ff6b2b',
}
```

- [ ] **Step 4: Create index.html, index.css, and src/utils/cn.ts**

Setup Google Fonts import (`Syne`, `Plus Jakarta Sans`, `JetBrains Mono`) in `index.html` or `index.css`.  
Create `src/utils/cn.ts` using `clsx` and `twMerge`.  
Copy `Santhosh_Portrait.jpg` and `resume.md` to `public/`.

- [ ] **Step 5: Run tests and verify build**

Run: `npm install && npx vitest run tests/setup.test.ts`  
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "chore: scaffold vite react tailwind project with design tokens"
```

---

### Task 2: Data Models & Strict Resume Ingestion

**Files:**
- Create: `src/types/portfolio.ts`, `src/data/resumeData.ts`, `src/data/projectsData.ts`
- Test: `tests/data.test.ts`

**Interfaces:**
- Consumes: `resume.md`
- Produces: `resumeData` (profile, experience, education, certifications, skills) and `projectsData` (the 4 flagship case studies with full narrative & metadata).

- [ ] **Step 1: Write test to verify factual resume data completeness**

Create `tests/data.test.ts`:
```typescript
import { describe, it, expect } from 'vitest';
import { resumeData } from '../src/data/resumeData';
import { projectsData } from '../src/data/projectsData';

describe('Strict Resume Ingestion', () => {
  it('contains verified profile details', () => {
    expect(resumeData.name).toBe('K V SANTHOSH');
    expect(resumeData.email).toBe('santhoshvedakrishnan@gmail.com');
    expect(resumeData.education[0].cgpa).toBe('9.29/10');
  });

  it('contains both official internships', () => {
    const roles = resumeData.experience.map(e => e.company);
    expect(roles).toContain('Bank of New York Mellon (BNY)');
    expect(roles).toContain('C2C Advanced Systems Chennai Ltd.');
  });

  it('contains the 4 marquee case studies with required architecture specs', () => {
    expect(projectsData).toHaveLength(4);
    const ids = projectsData.map(p => p.id);
    expect(ids).toEqual(['bny-eliza', 'urban-resolve', 'hire-matrix', 'organica-ops']);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/data.test.ts`  
Expected: FAIL (files missing).

- [ ] **Step 3: Implement src/types/portfolio.ts, src/data/resumeData.ts, and src/data/projectsData.ts**

Define all types: `ExperienceItem`, `EducationItem`, `CertificationItem`, `SkillCategory`, `ProjectCaseStudy`.  
Populate `resumeData` and `projectsData` strictly from `resume.md`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/data.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/types/portfolio.ts src/data/ tests/data.test.ts
git commit -m "feat: implement typed resume data models and project case studies"
```

---

### Task 3: Smooth Scrolling, Reduced Motion, Keyboard Nav & Magnetic Cursor Context

**Files:**
- Create: `src/hooks/useLenis.ts`, `src/hooks/useReducedMotion.ts`, `src/hooks/useKeyboardNav.ts`, `src/context/CursorContext.tsx`, `src/components/CustomCursor.tsx`
- Test: `tests/hooks.test.ts`

**Interfaces:**
- Consumes: React hooks, Lenis
- Produces: `useLenis()`, `useReducedMotion()`, `useKeyboardNav()`, `CursorProvider`, `useCursor()`, `<CustomCursor />`

- [ ] **Step 1: Write test for reduced motion and keyboard hooks**

Create `tests/hooks.test.ts` to test reduced motion detection and keyboard hotkey dispatch.

- [ ] **Step 2: Implement hooks and CursorContext**

- `useLenis.ts`: initializes Lenis on desktop, integrates requestAnimationFrame loop, cleans up on unmount.
- `useReducedMotion.ts`: checks `window.matchMedia('(prefers-reduced-motion: reduce)')`.
- `useKeyboardNav.ts`: listens for keydown `[J]` (next section), `[K]` (previous section), `[R]` (toggle resume drawer), and `[Escape]` (close drawer).
- `CursorContext.tsx`: provides `cursorState: 'default' | 'hover' | 'inspect' | 'drag'` and `cursorText: string`.
- `CustomCursor.tsx`: renders spring-animated dot + ring cursor with context label, hidden on touch screens.

- [ ] **Step 3: Run tests and verify**

Run: `npx vitest run tests/hooks.test.ts`  
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/hooks/ src/context/ src/components/CustomCursor.tsx tests/hooks.test.ts
git commit -m "feat: add lenis smooth scrolling, keyboard navigation, and magnetic cursor"
```

---

### Task 4: Global Telemetry HUD & Header Navigation

**Files:**
- Create: `src/components/HeaderHUD.tsx`
- Test: `tests/HeaderHUD.test.tsx`

**Interfaces:**
- Consumes: `resumeData`, `useKeyboardNav`, `onResumeOpen: () => void`
- Produces: `<HeaderHUD onOpenResume={...} />`

- [ ] **Step 1: Write test for HeaderHUD**

Create `tests/HeaderHUD.test.tsx`:
- Verifies name `K V SANTHOSH` displays.
- Verifies Chennai IST clock updates.
- Verifies navigation links (`Work`, `Experience`, `Systems`, `Contact`) exist.
- Verifies clicking Resume button calls `onResumeOpen`.

- [ ] **Step 2: Implement HeaderHUD.tsx**

Build the fixed header with hairline bottom border, live ticking IST clock (`HH:mm:ss IST`), navigation links with smooth scrolling, and `[Resume (R)]` button.

- [ ] **Step 3: Run test to verify it passes**

Run: `npx vitest run tests/HeaderHUD.test.tsx`  
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/HeaderHUD.tsx tests/HeaderHUD.test.tsx
git commit -m "feat: add global telemetry hud and navigation header"
```

---

### Task 5: Hero Section ("The Editorial Monolith")

**Files:**
- Create: `src/components/Hero.tsx`
- Test: `tests/Hero.test.tsx`

**Interfaces:**
- Consumes: `resumeData`, `Santhosh_Portrait.jpg`, `onResumeOpen: () => void`
- Produces: `<Hero onOpenResume={...} />`

- [ ] **Step 1: Write test for Hero component**

Create `tests/Hero.test.tsx`:
- Verifies headline "K V SANTHOSH" and "SOFTWARE ENGINEER / SYSTEMS & APPLIED AI" render.
- Verifies portrait image renders with proper alt text and dimensions.
- Verifies context badges (`SRM UNIVERSITY AP • CGPA 9.29`, `BNY SDE INTERN`).
- Verifies "Explore Selected Work" anchor points to `#work`.

- [ ] **Step 2: Implement Hero.tsx**

- Asymmetric 12-column grid.
- Kinetic staggered typography entrance via Motion.
- Desktop pointer-driven parallax tilt on portrait container (cleanly disabled on touch/reduced-motion).
- Action buttons: "Explore Selected Work ↓" and "View Credentials".

- [ ] **Step 3: Run test to verify it passes**

Run: `npx vitest run tests/Hero.test.tsx`  
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.tsx tests/Hero.test.tsx
git commit -m "feat: build editorial monolith hero section with integrated portrait"
```

---

### Task 6: Case Study 01 (BNY Mellon) & Agent Query Simulator

**Files:**
- Create: `src/components/widgets/BnySimulator.tsx`
- Test: `tests/BnySimulator.test.tsx`

**Interfaces:**
- Consumes: Project 1 metadata
- Produces: `<BnySimulator />`

- [ ] **Step 1: Write test for BnySimulator**

Create `tests/BnySimulator.test.tsx`:
- Tests clicking sample prompts:
  1. "Query liquidity vs risk exposure across APAC & EMEA"
  2. "Summarize trade execution latency spikes for Q2"
  3. "Generate multi-dataset visual breakdown for portfolio risk"
- Tests simulator state flow: Intent recognition -> GraphQL query dispatch -> Multi-dataset aggregation -> Visual dashboard generation.

- [ ] **Step 2: Implement BnySimulator.tsx**

Build the interactive simulation showing the Eliza platform agent in action with dynamic metric charts and query console.

- [ ] **Step 3: Run test to verify it passes**

Run: `npx vitest run tests/BnySimulator.test.tsx`  
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/widgets/BnySimulator.tsx tests/BnySimulator.test.tsx
git commit -m "feat: implement bny agent query and dynamic dashboard simulator"
```

---

### Task 7: Case Study 02 (UrbanResolve) & 6-State Lifecycle Inspector

**Files:**
- Create: `src/components/widgets/UrbanResolveLifecycle.tsx`
- Test: `tests/UrbanResolveLifecycle.test.tsx`

**Interfaces:**
- Consumes: Project 2 metadata
- Produces: `<UrbanResolveLifecycle />`

- [ ] **Step 1: Write test for UrbanResolveLifecycle**

Create `tests/UrbanResolveLifecycle.test.tsx`:
- Verifies the 6 states (`Reported`, `AI Vision Triage`, `Dept Assigned`, `In Progress`, `Escalated/SLA`, `Resolved`).
- Tests stepping through the states or clicking a state to inspect payload, triggers, and automated Vision routing.

- [ ] **Step 2: Implement UrbanResolveLifecycle.tsx**

Build the interactive lifecycle stepper showing GPS tagging, Cloud Vision image recognition routing, and SLA escalation handling.

- [ ] **Step 3: Run test to verify it passes**

Run: `npx vitest run tests/UrbanResolveLifecycle.test.tsx`  
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/widgets/UrbanResolveLifecycle.tsx tests/UrbanResolveLifecycle.test.tsx
git commit -m "feat: implement urbanresolve 6-state ticket lifecycle and vision inspector"
```

---

### Task 8: Case Study 03 (HireMatrix) & Kanban/Gemini AI Scoring Inspector

**Files:**
- Create: `src/components/widgets/HireMatrixKanban.tsx`
- Test: `tests/HireMatrixKanban.test.tsx`

**Interfaces:**
- Consumes: Project 3 metadata
- Produces: `<HireMatrixKanban />`

- [ ] **Step 1: Write test for HireMatrixKanban**

Create `tests/HireMatrixKanban.test.tsx`:
- Verifies 5 Kanban stages (`Applied`, `AI Screened`, `Interview`, `Offer`, `Hired`).
- Tests clicking candidate card to inspect simulated Gemini AI resume evaluation with score breakdown and matching criteria.

- [ ] **Step 2: Implement HireMatrixKanban.tsx**

Build the interactive Kanban pipeline and candidate score card inspector.

- [ ] **Step 3: Run test to verify it passes**

Run: `npx vitest run tests/HireMatrixKanban.test.tsx`  
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/widgets/HireMatrixKanban.tsx tests/HireMatrixKanban.test.tsx
git commit -m "feat: implement hirematrix kanban pipeline and gemini scoring simulator"
```

---

### Task 9: Case Study 04 (Organica Ops) & 5-Role RBAC Matrix Inspector

**Files:**
- Create: `src/components/widgets/OrganicaRbacMatrix.tsx`
- Test: `tests/OrganicaRbacMatrix.test.tsx`

**Interfaces:**
- Consumes: Project 4 metadata
- Produces: `<OrganicaRbacMatrix />`

- [ ] **Step 1: Write test for OrganicaRbacMatrix**

Create `tests/OrganicaRbacMatrix.test.tsx`:
- Verifies 5 roles: `Admin`, `Manager`, `Team Lead`, `Employee`, `Customer`.
- Tests switching roles updates active permissions, API route guards, and stored procedure execution privileges.

- [ ] **Step 2: Implement OrganicaRbacMatrix.tsx**

Build the interactive security and permission matrix inspector.

- [ ] **Step 3: Run test to verify it passes**

Run: `npx vitest run tests/OrganicaRbacMatrix.test.tsx`  
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/widgets/OrganicaRbacMatrix.tsx tests/OrganicaRbacMatrix.test.tsx
git commit -m "feat: implement organica ops 5-role rbac matrix inspector"
```

---

### Task 10: Selected Work Master Section Assembly

**Files:**
- Create: `src/components/SelectedWork.tsx`
- Test: `tests/SelectedWork.test.tsx`

**Interfaces:**
- Consumes: `projectsData`, `BnySimulator`, `UrbanResolveLifecycle`, `HireMatrixKanban`, `OrganicaRbacMatrix`
- Produces: `<SelectedWork />`

- [ ] **Step 1: Write test for SelectedWork**

Create `tests/SelectedWork.test.tsx`:
- Verifies all 4 projects render in sequence:
  1. BNY (Bank of New York Mellon)
  2. UrbanResolve
  3. HireMatrix
  4. Organica Ops (C2C Advanced Systems)
- Verifies what I built, why, technical innovations, and results for each project.

- [ ] **Step 2: Implement SelectedWork.tsx**

Build the master section with editorial layout pacing, large display index numerals (`01`, `02`, `03`, `04`), tech tags, architecture highlights, and embedded interactive simulators.

- [ ] **Step 3: Run test to verify it passes**

Run: `npx vitest run tests/SelectedWork.test.tsx`  
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/SelectedWork.tsx tests/SelectedWork.test.tsx
git commit -m "feat: assemble selected work section with 4 marquee case studies"
```

---

### Task 11: Production Trajectory (Experience Timeline)

**Files:**
- Create: `src/components/Experience.tsx`
- Test: `tests/Experience.test.tsx`

**Interfaces:**
- Consumes: `resumeData.experience`
- Produces: `<Experience />`

- [ ] **Step 1: Write test for Experience component**

Create `tests/Experience.test.tsx`:
- Verifies BNY Mellon SDE Intern (Jun 2026 - Aug 2026) and C2C Advanced Systems Web Developer Intern (May 2025 - Jul 2025).
- Verifies bullet points, technologies, and achievements.

- [ ] **Step 2: Implement Experience.tsx**

Build the chronological editorial timeline with hairline connector rules, expandable technical notes, and verified company credentials.

- [ ] **Step 3: Run test to verify it passes**

Run: `npx vitest run tests/Experience.test.tsx`  
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/Experience.tsx tests/Experience.test.tsx
git commit -m "feat: build production trajectory experience timeline"
```

---

### Task 12: Technical Capabilities, Education & Verified Credentials

**Files:**
- Create: `src/components/TechnicalMatrix.tsx`
- Test: `tests/TechnicalMatrix.test.tsx`

**Interfaces:**
- Consumes: `resumeData.skills`, `resumeData.certifications`, `resumeData.education`
- Produces: `<TechnicalMatrix />`

- [ ] **Step 1: Write test for TechnicalMatrix component**

Create `tests/TechnicalMatrix.test.tsx`:
- Verifies skill categories: Languages, Frameworks & Tech, Tools, Core Competencies.
- Verifies 3 certifications: Oracle Certified Java SE 17, MongoDB Certified Developer, SAP Generative AI Developer.
- Verifies SRM University AP (CGPA: 9.29/10) and Kendriya Vidyalaya HVF.

- [ ] **Step 2: Implement TechnicalMatrix.tsx**

Build the architectural grid with domain groupings, verified credentials showcase with badge styling, and academic background.

- [ ] **Step 3: Run test to verify it passes**

Run: `npx vitest run tests/TechnicalMatrix.test.tsx`  
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/TechnicalMatrix.tsx tests/TechnicalMatrix.test.tsx
git commit -m "feat: build technical capabilities, education and verified credentials section"
```

---

### Task 13: Interactive Resume Drawer & Quick-View Modal

**Files:**
- Create: `src/components/ResumeDrawer.tsx`
- Test: `tests/ResumeDrawer.test.tsx`

**Interfaces:**
- Consumes: `resumeData`, `isOpen: boolean`, `onClose: () => void`
- Produces: `<ResumeDrawer isOpen={...} onClose={...} />`

- [ ] **Step 1: Write test for ResumeDrawer**

Create `tests/ResumeDrawer.test.tsx`:
- Verifies drawer opens when `isOpen` is true.
- Verifies print button calls `window.print()`.
- Verifies copy markdown button copies markdown to clipboard.
- Verifies close button and Escape key dismiss the drawer.

- [ ] **Step 2: Implement ResumeDrawer.tsx**

Build the slide-over panel with dedicated `@media print` CSS for pristine 1-2 page printing, markdown raw copy, and full resume content.

- [ ] **Step 3: Run test to verify it passes**

Run: `npx vitest run tests/ResumeDrawer.test.tsx`  
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/ResumeDrawer.tsx tests/ResumeDrawer.test.tsx
git commit -m "feat: build interactive resume drawer with print and markdown export"
```

---

### Task 14: Contact Section, Colophon & Footer

**Files:**
- Create: `src/components/Footer.tsx`
- Test: `tests/Footer.test.tsx`

**Interfaces:**
- Consumes: `resumeData`
- Produces: `<Footer />`

- [ ] **Step 1: Write test for Footer component**

Create `tests/Footer.test.tsx`:
- Verifies email copy button copies `santhoshvedakrishnan@gmail.com` and displays confirmation.
- Verifies LinkedIn and GitHub external links.
- Verifies colophon text.

- [ ] **Step 2: Implement Footer.tsx**

Build the editorial closing section with high-impact typography, tactile email copy interaction with toast feedback, verified social links, and colophon.

- [ ] **Step 3: Run test to verify it passes**

Run: `npx vitest run tests/Footer.test.tsx`  
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.tsx tests/Footer.test.tsx
git commit -m "feat: build closing contact section, email copy feedback and colophon"
```

---

### Task 15: Full Application Integration, Accessibility Audit & Verification

**Files:**
- Modify: `src/App.tsx`, `src/main.tsx`
- Test: `tests/App.test.tsx`

**Interfaces:**
- Consumes: All components, hooks, contexts
- Produces: Complete working portfolio application

- [ ] **Step 1: Write integration test for full application**

Create `tests/App.test.tsx`:
- Tests that full page mounts cleanly without errors.
- Tests that section navigation jumps properly.
- Tests that pressing `[R]` toggles the Resume drawer.

- [ ] **Step 2: Implement src/App.tsx**

Assemble:
- `CursorProvider` + `<CustomCursor />`
- `useLenis()` smooth scroll
- `<HeaderHUD onOpenResume={...} />`
- `<Hero onOpenResume={...} />`
- `<SelectedWork />`
- `<Experience />`
- `<TechnicalMatrix />`
- `<Footer />`
- `<ResumeDrawer isOpen={isResumeOpen} onClose={...} />`

- [ ] **Step 3: Run full test suite and build verification**

Run: `npx vitest run`  
Run: `npm run build`  
Expected: ALL TESTS PASS, production build succeeds with zero TypeScript or bundling errors.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx src/main.tsx tests/App.test.tsx
git commit -m "feat: complete full application integration and pass all verification tests"
```
