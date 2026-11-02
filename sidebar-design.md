## HTML Structure

```html
<nav class="sidebar bg-neutral-50 min-h-screen" aria-label="Main navigation">
  <div class="sidebar-container px-6 py-4 flex items-center justify-between">
    <a href="/" class="flex items-center gap-2">
      <div class="w-8 h-8 rounded-md bg-base-blue flex items-center justify-center">
        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16l-4-4m0 0l-4 4m4-4v3a3 3 0 003-3h7a3 3 0 003-3v-3m-4 0a3 3 0 013 3H3a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v-3m-4 0a3 3 0 013-3h7a3 3 0 013 3v3m-4 0a3 3 0 013-3h7a3 3 0 013 3v3"/>
        </svg>
      </div>
      <span class="self-center text-neutral-900 text-sm font-medium">MSEDCL Audit</span>
    </a>
    <button id="menu-toggle" class="sidebar-toggle p-2 rounded-md hover:bg-neutral-100 focus:outline-none focus:bg-neutral-100" aria-expanded="true" aria-label="Toggle navigation">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>
  </div>
  <ul role="navigation" aria-label="Main navigation sections" class="space-y-1">
    <li><a href="/dashboard" class="sidebar-item flex items-center px-3 py-2 rounded-md hover:bg-neutral-100 focus:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-base-blue focus-visible:ring-offset-2 data-[state=active]:bg-base-blue data-[state=active]:text-white">
      <span class="w-5 h-5 flex-shrink-0"><svg class="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg></span><span class="ms-2 text-neutral-900 text-sm font-medium">Dashboard</span><span class="absolute right-2 w-1.5 h-1.5 rounded-full bg-green-500 collapsed:hidden"></span></a></li>
    <li><a href="/warnings" class="sidebar-item flex items-center px-3 py-2 rounded-md bg-base-blue text-white"><span class="w-5 h-5 flex-shrink-0"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg></span><span class="ms-2 text-neutral-900 text-sm font-medium">Warnings</span><span class="absolute right-2 w-1.5 h-1.5 rounded-full bg-green-500 collapsed:hidden"></span></a></li>
  </ul>
</nav>
```
# MSEDCL Quality Audit - Sidebar Design (MongoDB Style)

## Design Specifications

### Colors
- Sidebar BG: `#F8F9FA` (neutral-50)
- Primary: `#016BF8` (base-blue)
- Hover: `#F1F5F9` (neutral-100)
- Text: `#1E293B` (neutral-900), `#64748B` (neutral-500)
- Border: `#E2E8F0` (neutral-200)

### Typography
- Font: `Euclid Circular A`, system-ui, sans-serif
- Size: 14px base, 16px active
- Weight: 400 regular, 500 medium
- Line height: 4px baseline grid

### Layout
- Expanded width: 300px
- Collapsed width: 56px
- Padding: 12px vertical, 16px horizontal (desktop)

### States
- Default: bg-neutral-50, text-neutral-900
- Hover: bg-neutral-100
- Active: bg-base-blue (#016BF8), text-white
- Focus: outline 2px #016BF8
- Disabled: opacity-50, text-neutral-500