# MSEDCL Quality Audit - Sidebar Design System (MongoDB Style)

Complete sidebar navigation design adapted from MongoDB Cloud's design system.

## Files in this Design System

| File | Purpose |
|------|---------|
| `sidebar-colors.md` | Color palette and typography specifications |
| `sidebar-html.md` | HTML structure and component markup |
| `sidebar-responsive.md` | Tailwind CSS config and responsive breakpoints |
| `sidebar-js.md` | JavaScript toggle functionality and accessibility |

## Design Overview

### Colors
- `neutral-50` (#F8F9FA): Sidebar background (default)
- `neutral-100` (#F1F5F9): Hover state
- `base-blue` (#016BF8): Active, focus, primary accent
- `neutral-900` (#1E293B): Primary text
- `neutral-500` (#64748B): Muted/secondary text

### Typography
- Font: `Euclid Circular A`, system-ui, sans-serif
- Base: 14px, Active: 16px
- 4px baseline grid for all vertical spacing

### Layout
- Expanded: 300px (desktop)
- Collapsed: 56px (mobile/tablet)
- Padding: 12px vertical, 16px horizontal (desktop)

### States
- Default: bg-neutral-50, text-neutral-900
- Hover: bg-neutral-100
- Active: bg-base-blue (#016BF8), text-white
- Focus: outline 2px #016BF8
- Disabled: opacity-50, text-neutral-500

### Responsive
- Desktop: 300px, full labels
- Tablet: 240px, ellipsis on long text
- Mobile: 56px, drawer on toggle

### Accessibility
- `aria-label`, `aria-expanded`
- `focus-visible:outline` states
- Keyboard navigable
- 4.5:1 color contrast minimum
- Respects `prefers-reduced-motion`

## Usage

Include the HTML structure, Tailwind config, and JavaScript from the respective files. The sidebar supports:
- Active item highlighting
- Hover states
- Collapsible/expandable for mobile
- Focus-visible accessibility
- Role-based navigation (admin/quality/manager)