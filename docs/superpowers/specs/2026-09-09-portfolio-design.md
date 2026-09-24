# Technical Specification: K V Santhosh — Personal Developer Portfolio

**Date:** 2026-09-09  
**Status:** Approved / Spec Review  
**Project:** Bespoke Personal Portfolio Web Application  
**Primary Stack:** Vite + React + TypeScript + Tailwind CSS + Motion (Framer Motion) + Lenis

---

## 1. Executive Summary & Core Objective

The goal of this project is to build a distinctive, high-craft, editorial developer portfolio for **K V Santhosh**—a Software Engineer specializing in Systems, Backend Engineering, and Applied AI/ML.

The design philosophy is **"Kinetic Monolith & Systems Telemetry"**:
- An editorial aesthetic inspired by premium creative design studios and high-performance digital publications (drawing inspiration from the craft, pacing, and motion hierarchy of sites like `landonorris.com`).
- A high-contrast obsidian and chalk-bone palette punctuated by a single razor-sharp cadmium orange accent.
- Strictly authentic content derived from Santhosh's verified resume: BNY Mellon (SDE Intern), C2C Advanced Systems (Web Developer Intern), UrbanResolve, HireMatrix, SRM University AP (CGPA 9.29), and industry certifications (Oracle Java SE 17, MongoDB, SAP GenAI).
- Zero generic template patterns, zero purple/blue gradients, zero glowing blob slop, zero fake terminals, and zero ungrounded buzzwords.
- Memorable, tactile interactive micro-experiences for every major case study.

---

## 2. Information Architecture & Section Flow

1. **Global Telemetry HUD & Navigation (Fixed / Floating Bar):**
   - Left: `K V SANTHOSH` + Live Chennai `IST` dynamic clock + subtle active pulse.
   - Center: Seamless section anchors (`Work`, `Experience`, `Systems`, `Contact`).
   - Right: Quick Action `[Resume (R)]` drawer trigger + keyboard hint (`[J/K]`).

2. **Hero Section ("The Editorial Monolith"):**
   - High-contrast display typography with kinetic staggered word reveal.
   - Integrated studio portrait of Santhosh (`Santhosh_Portrait.jpg`) with subtle pointer-driven parallax depth on desktop.
   - Context telemetry badges: `SRM UNIVERSITY AP • CGPA 9.29/10` and `BNY SDE INTERN`.
   - Editorial hook on backend systems and autonomous AI agents.
   - Direct jump anchor to selected work.

3. **Selected Work: Four Flagship Marquee Case Studies:**
   - **01: BNY (Bank of New York Mellon)** — Enterprise AI Agents & Dynamic Dashboard Generation.
     - *Interactive Artifact:* **Agent Query & Dynamic Dashboard Simulator** (simulate plain-English query → GraphQL dispatch → dynamic multi-dataset visual dashboard).
   - **02: UrbanResolve** — Municipal Issue Lifecycle & AI Triage Platform.
     - *Interactive Artifact:* **6-State Ticket Lifecycle & Vision Triage Flow** (interactive step-through from GPS/image capture to Google Cloud Vision routing and resolution upload).
   - **03: HireMatrix** — AI-Orchestrated Recruitment Pipeline.
     - *Interactive Artifact:* **Kanban Pipeline & Gemini Scoring Inspector** (interactive 5-stage recruitment board + AI resume score match breakdown).
   - **04: Organica Ops (C2C Advanced Systems)** — Enterprise Operations Platform & RBAC Core.
     - *Interactive Artifact:* **5-Role RBAC Matrix Inspector** (interactive switcher across Admin, Manager, Team Lead, Employee, Customer with live route & API permission matrix).

4. **Production Trajectory (Experience Timeline):**
   - Bank of New York Mellon (BNY) — SDE Intern (Jun 2026 – Aug 2026).
   - C2C Advanced Systems Chennai Ltd. — Web Developer Intern (May 2025 – Jul 2025).
   - Comprehensive detail on engineering scope, architecture decisions, and business impact.

5. **Technical Capabilities, Education & Verified Credentials:**
   - Engineered domain breakdown:
     - Distributed Systems & Backend
     - AI & Agent Orchestration
     - Data Stores & Caching
     - Languages & Core Engineering
     - Infrastructure & Security
   - Verified Credentials:
     - Oracle Certified Professional: Java SE 17 Developer
     - MongoDB Certified Associate Developer
     - SAP Certified: Generative AI Developer
   - Academic Background:
     - SRM University AP: B.Tech CSE (AI & ML) — CGPA 9.29/10
     - Kendriya Vidyalaya HVF: 12th CBSE (87%) & 10th CBSE (91.4%)

6. **Interactive Resume Drawer (Modal / Slide-Over):**
   - Accessible via HUD, page CTA, or pressing `[R]`.
   - Typeset editorial resume with direct 1-click PDF print stylesheet and raw `.md` copy.

7. **Contact & Colophon:**
   - Instant 1-click clipboard copy of `santhoshvedakrishnan@gmail.com` with tactile confirmation toast.
   - Verified social links: GitHub (`github.com/santhoshkv24`) and LinkedIn (`linkedin.com/in/santhosh-vedakrishnan`).
   - Colophon detailing tech stack, typography, and design principles.

---

## 3. Design System & Tokens

### 3.1 Color Palette
- **Background Root:** `#08090a` (Deep Carbon Obsidian)
- **Surface Elevation 1 (Card/Panel):** `#111316`
- **Surface Elevation 2 (Interactive Inset):** `#181b1f`
- **Hairline Borders:** `rgba(255, 255, 255, 0.08)` to `rgba(255, 255, 255, 0.14)`
- **Primary Text:** `#f4f3ee` (Chalk Bone White — high contrast, warm)
- **Secondary Text:** `#9ca3af` (Slate Mist — WCAG AA compliant on dark surfaces)
- **Muted Metadata:** `#6b7280` to `#717682` (Tabular data, timestamps; never sub-contrast for readable text)
- **Cadmium Accent:** `#ff4d00` (Electric Cadmium Orange for active indicators, status dots, and focal interactions)
- **Accent Soft:** `rgba(255, 77, 0, 0.12)` (Pill highlight backing)

### 3.2 Typography System
- **Display Headings:** High-character Grotesque / Sans (`Syne` or `Cabinet Grotesk` / `Space Grotesk` or `Inter Display`), tracking `-0.035em` to `-0.05em`.
- **Editorial & Body UI:** `Plus Jakarta Sans` / `Inter`, 15–18px, line height 1.6, tracking `-0.01em`.
- **Telemetry & Code:** `JetBrains Mono` / `Space Mono` for clocks, coordinates, tech tags, and matrix displays.

### 3.3 Radii & Geometry
- Strict architectural restraint: `rounded-none` to `rounded-sm` (2px) and `rounded-md` (6px max).
- No bubbly 24px+ pill cards.
- Hairline structural divider lines.

### 3.4 Motion & Physics
- **Scroll Engine:** Lenis smooth scrolling with calibrated `lerp: 0.1`, preserving native touch scrolling on mobile.
- **Micro-Transitions:** Spring physics (`stiffness: 280, damping: 28`) for cursor and hover feedback.
- **Scroll Animations:** Crisp deceleration cubic bezier `[0.16, 1, 0.3, 1]` for staggered reveals.
- **Accessibility:** Instant fallback when `prefers-reduced-motion: reduce` is detected (all animations drop to instant opacity swaps).

---

## 4. Detailed Component Specifications

### 4.1 Global HUD & Navigation (`HeaderHUD.tsx`)
- Fixed at the top with a subtle backdrop blur (`bg-[#08090a]/85 backdrop-blur-md`).
- Shows live Chennai time in `HH:mm:ss IST` updated every second.
- Displays section navigation anchors that smoothly scroll to sections.
- Keyboard navigation:
  - Press `[R]` to toggle the Resume Drawer.
  - Press `[J]` to jump to next section, `[K]` to jump to previous section.
- Mobile: Streamlined, accessible mobile drawer menu.

### 4.2 Hero Section (`Hero.tsx`)
- Asymmetric layout with large typography on the left and portrait on the right.
- Headline:
  ```
  K V SANTHOSH
  SOFTWARE ENGINEER
  SYSTEMS & APPLIED AI
  ```
- Portrait frame:
  - Custom container using `Santhosh_Portrait.jpg`.
  - Subtle pointer parallax tilt on desktop (max 6deg tilt, 15px translation) with spring return.
  - Telemetry tags overlay: `SRM UNIVERSITY AP • CGPA 9.29` & `BNY SDE INTERN`.
- Subtitle:
  - "Specializing in high-throughput backend architectures, autonomous AI agents, and enterprise full-stack systems. Engineered with precision."
- Action bar: "Explore Selected Work ↓" and "View Credentials".

### 4.3 Marquee Case Studies (`SelectedWork.tsx`)

#### Case Study 1: BNY Mellon (Eliza AI Agent Platform)
- Metadata: `01 / FLAGSHIP PRODUCTION` • `SDE Intern (Jun 2026 – Aug 2026)`
- Core Tech: `LLMs`, `AI Agents`, `GraphQL`, `Prompt Engineering`, `Dynamic Dashboards`
- Problem: Enterprise static reports created high latency and friction across siloed financial datasets.
- Solution: Built conversational AI agents on BNY's internal Eliza platform, parsing natural-language intent into GraphQL queries for on-demand data extraction and automated dashboard synthesis.
- **Interactive Simulator:**
  - Presets:
    1. "Query liquidity vs risk exposure across APAC & EMEA"
    2. "Summarize trade execution latency spikes for Q2"
    3. "Generate multi-dataset visual breakdown for portfolio risk"
  - Interactive stages displayed:
    - Step 1: User prompt parsing & intent extraction.
    - Step 2: GraphQL query assembly & schema validation.
    - Step 3: Multi-dataset execution & aggregation.
    - Step 4: Dynamic dashboard render with live bar/line metrics and key insight summary.

#### Case Study 2: UrbanResolve (Municipal Issue Lifecycle & AI Triage)
- Metadata: `02 / FULL-STACK SYSTEM` • `Civic Infrastructure & SLA Engine`
- Core Tech: `Java 17`, `Spring Boot`, `Spring Security`, `PostgreSQL`, `Google Cloud Vision`, `Cloudinary`, `React`, `Tailwind CSS`
- Problem: Civic issue reports suffered from manual triage bottlenecks, lack of automated routing, and SLA non-compliance.
- Solution: Engineered a high-reliability Spring Boot backend with Google Cloud Vision AI classification, GPS capture, 6-state ticket lifecycle, AES data encryption, and executive SLA monitoring.
- **Interactive Simulator:**
  - Interactive 6-state ticket lifecycle stepper:
    `Reported (GPS Tagged)` → `AI Vision Triage` → `Dept Assigned (Roads/Sanitation)` → `In Progress` → `Escalated (SLA Warning)` → `Resolved (Proof Uploaded)`.
  - Users can toggle state to see what triggers occur at each transition.

#### Case Study 3: HireMatrix (AI-Orchestrated Recruitment Pipeline)
- Metadata: `03 / ENTERPRISE PLATFORM` • `Talent Acquisition & AI Scoring`
- Core Tech: `React 19`, `Express 5`, `Node.js`, `MongoDB`, `Google Gemini`, `Google Calendar/Meet`, `JWT`
- Problem: Fragmented recruitment workflows, unstructured interview feedback, and manual resume screening slowdowns.
- Solution: Centralized hiring platform with drag-and-drop 5-stage Kanban, automated Google Gemini resume scoring against job criteria, 5-role RBAC, and one-click Google Calendar/Meet scheduling.
- **Interactive Simulator:**
  - Interactive Kanban board preview with candidate cards across 5 stages (`Applied`, `AI Screened`, `Technical`, `Partner`, `Hired`).
  - Clickable candidate profile displaying simulated Gemini AI resume evaluation with score breakdown (Skill match, Experience depth, Architectural aptitude).

#### Case Study 4: Organica Ops (C2C Advanced Systems)
- Metadata: `04 / ENTERPRISE CORE` • `Web Developer Intern (May 2025 – Jul 2025)`
- Core Tech: `React 19`, `MUI v7`, `Node.js`, `Express`, `MySQL`, `JWT`, `Bcrypt`, `Helmet.js`
- Problem: Enterprise tasking, cross-department scheduling, and client deliverables required strict segregation of duty and audit trails.
- Solution: Architected 8+ backend REST modules, MySQL stored procedures, and a granular 5-role RBAC security matrix with Helmet security headers and rate limiting.
- **Interactive Simulator:**
  - Role switcher (`Admin`, `Manager`, `Team Lead`, `Employee`, `Customer`).
  - Active permissions matrix: routes accessible, API permissions (Read/Write/Delete/Execute Stored Procs), and data visibility boundary.

### 4.4 Production Trajectory (`Experience.tsx`)
- Detailed chronological layout:
  - **Bank of New York Mellon (BNY)**: SDE Intern, Chennai.
  - **C2C Advanced Systems Chennai Ltd.**: Web Developer Intern, Chennai.
- Clear structural highlights of achievements, technologies, and system architecture contributions.

### 4.5 Technical Capabilities & Credentials (`TechnicalMatrix.tsx`)
- Domain-driven capability matrix (Languages, Backend & Systems, AI/ML, Data Stores, Security & DevOps).
- Verified Credentials display with official credential badges:
  - Oracle Certified Professional: Java SE 17 Developer
  - MongoDB Certified Associate Developer
  - SAP Certified: Generative AI Developer
- Academic Credentials:
  - SRM University AP: B.Tech Computer Science Engineering (AI & ML), CGPA: 9.29/10
  - Kendriya Vidyalaya HVF: 12th CBSE (87%), 10th CBSE (91.4%)

### 4.6 Interactive Resume Drawer (`ResumeDrawer.tsx`)
- Slide-over panel from right edge.
- Meticulously typeset clean resume view matching the exact content of `resume.md`.
- Action buttons:
  - `Print / Save as PDF`: Triggers window.print() with custom print styling.
  - `Copy Markdown`: Copies raw markdown to clipboard.
  - `Download .md`: Triggers file download of `resume.md`.
- Accessible via Escape key, close button, or background overlay click.

### 4.7 Fluid Magnetic Cursor (`CustomCursor.tsx`)
- Weighted spring follow (`useSpring`).
- Context-aware sizing:
  - Default: 8px solid cadmium dot with subtle 24px outer ring.
  - Hover on link/button: Ring expands to 48px with magnetic snapping.
  - Hover on interactive widget: Displays subtle label `[INSPECT]`.
- Disabled on touchscreens (`@media (pointer: coarse)`), iPads/mobile, and when reduced motion is preferred.

### 4.8 Contact & Colophon (`Footer.tsx`)
- Big typography: "LET'S BUILD RESILIENT SYSTEMS."
- Instant email copy button (`santhoshvedakrishnan@gmail.com`) with active copied state.
- Social links: GitHub, LinkedIn.
- Colophon: "Designed with architectural restraint. Built with Vite, React 19, TypeScript, Tailwind CSS, Motion, and Lenis."

---

## 5. Directory & File Structure

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
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── types/
    │   └── portfolio.ts
    ├── data/
    │   ├── resumeData.ts
    │   └── projectsData.ts
    ├── context/
    │   └── CursorContext.tsx
    ├── hooks/
    │   ├── useLenis.ts
    │   ├── useKeyboardNav.ts
    │   └── useReducedMotion.ts
    ├── components/
    │   ├── HeaderHUD.tsx
    │   ├── Hero.tsx
    │   ├── SelectedWork.tsx
    │   ├── Experience.tsx
    │   ├── TechnicalMatrix.tsx
    │   ├── ResumeDrawer.tsx
    │   ├── CustomCursor.tsx
    │   ├── Footer.tsx
    │   └── widgets/
    │       ├── BnySimulator.tsx
    │       ├── UrbanResolveLifecycle.tsx
    │       ├── HireMatrixKanban.tsx
    │       └── OrganicaRbacMatrix.tsx
    └── utils/
        └── cn.ts
```

---

## 6. Verification & Quality Gates

- **Visual & Typography Polish:** No default Tailwind card look. Architectural layout, tight tracking, bespoke hairline borders, intentional cadmium orange accents.
- **Strict Factual Alignment:** All data points matched 100% against `resume.md`. No invented companies, metrics, or technologies.
- **Performance & Smoothness:** 60fps scrolling, minimal re-renders, zero layout shifts, optimized portrait image loading.
- **Mobile Responsiveness:** Clean degradation on tablet and mobile viewports, touch targets >= 44px, custom cursor disabled, horizontal widgets wrap cleanly.
- **Accessibility:** Keyboard navigable (`[J/K]`, `[R]`, `Tab`, `Escape`), semantic HTML tags (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`), WCAG AA compliant text contrast.
