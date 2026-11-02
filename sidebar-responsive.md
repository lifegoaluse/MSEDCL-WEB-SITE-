# Sidebar Tailwind CSS & Responsive (MongoDB Style)

## Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Euclid Circular A", "system-ui", "sans-serif"],
        mono: ["Source Code Pro", "monospace"],
      },
      colors: {
        "base-blue": "#016BF8",
        "neutral": {
          "50": "#F8F9FA",
          "100": "#F1F5F9",
          "200": "#E2E8F0",
          "500": "#64748B",
          "900": "#1E293B",
        },
      },
      borderRadius: {
        sm: "6px",
      },
    },
  },
};
```

## Responsive Breakpoints

### Desktop (≥ 1024px)
- Sidebar: 300px width
- Full text labels
- Hover states active

```css
@media (min-width: 1024px) {
  .sidebar { width: 300px; }
  .sidebar-item { padding: 12px 16px; }
  .collapsed:hidden { display: flex !important; }
  .collapsed:block { display: none !important; }
}
```

### Tablet (768px - 1023px)
- Sidebar: 240px width
- Ellipsis on long text
- Collapse button visible

```css
@media (max-width: 1023px) and (min-width: 768px) {
  .sidebar { width: 240px; }
  .sidebar-item { padding: 8px 12px; }
  .sidebar-item span:not(:first-child) { 
    max-width: 120px; 
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis; 
  }
}
```

### Mobile (< 768px)
- Sidebar: 56px collapsed, expands on toggle
- Fullscreen drawer
- All items accessible

```css
@media (max-width: 768px) {
  .sidebar { 
    position: fixed;
    top: 0; left: 0; bottom: 0; z-index: 100;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  .sidebar.open { transform: translateX(0); }
  .sidebar-toggle { display: block; }
  .sidebar-item span { display: block; }
}
```
```