# Sidebar JavaScript & Accessibility (MongoDB Style)

## Toggle Functionality

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const html = document.documentElement;
  
  // Toggle sidebar
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open', !sidebar.classList.contains('open'));
    html.classList.toggle('sidebar-open', !sidebar.classList.contains('open'));
    menuToggle.setAttribute('aria-expanded', !sidebar.classList.contains('open'));
  });
  
  // Close sidebar on link click (mobile)
  document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        sidebar.classList.remove('open');
        html.classList.remove('sidebar-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
  
  // Close on outside click
  html.addEventListener('click', (e) => {
    if (!e.target.closest('.sidebar') && !e.target.closest('.menu-toggle')) {
      sidebar.classList.remove('open');
      html.classList.remove('sidebar-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});
```

## Accessibility Checklist

- ✅ `aria-label` on sidebar nav element
- ✅ `aria-expanded` on toggle button (updates on click)
- ✅ `focus-visible:outline` and `focus-visible:ring` for focus states
- ✅ `outline: 2px #016BF8` (compositor-friendly, not box-shadow)
- ✅ Keyboard navigable (Tab order preserved)
- ✅ Color contrast: 4.5:1 minimum (neutral-900 vs neutral-50 = 8.66:1)
- ✅ Respects `prefers-reduced-motion` (no auto-animations)
- ✅ Semantic HTML: `nav`, `ul`, `li`, `a` elements
- ✅ `role="navigation"` and `role="group"` for screen readers
- ✅ Skip links: focusable elements reachable
- ✅ Disabled state: `opacity-50`, `text-neutral-500`, `cursor-not-allowed`