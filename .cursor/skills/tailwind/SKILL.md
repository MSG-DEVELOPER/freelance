---
name: tailwind
description: >
  Tailwind CSS UI design guide based on Refactoring UI principles.
  Use this skill whenever the user asks to build, improve, or review interfaces
  with Tailwind: components, layouts, dashboards, forms, landing pages, or any
  web UI. Covers visual hierarchy, spacing, typography, color, shadows, depth,
  and images — all translated into concrete Tailwind classes. Trigger on any
  mention of Tailwind, component design, UI, CSS styles, or visual review of
  interfaces.
---

# Tailwind UI — Refactoring UI Principles

Practical guide translating *Refactoring UI* (Adam Wathan & Steve Schoger) design principles into Tailwind CSS classes.

---

## 1. Start with a Feature, Not a Layout

- Design the **feature** first (the search bar, the form, the card) before thinking about nav, sidebar, or shell.
- In Tailwind: start with the minimum component, no unnecessary grids or wrappers.
- Design in **grayscale first** (`bg-gray-*`, `text-gray-*`). Add color later once hierarchy is clear.
- Don't design features you're not ready to build.

---

## 2. Visual Hierarchy

Hierarchy is your most powerful tool. It doesn't depend on size alone.

### Use Weight and Color, Not Just Size

```html
<!-- ✅ Correct: hierarchy through weight and color -->
<p class="text-base font-semibold text-gray-900">Primary title</p>
<p class="text-sm text-gray-500">Secondary text</p>
<p class="text-xs text-gray-400">Tertiary content / copyright</p>

<!-- ❌ Avoid: size alone for hierarchy -->
<p class="text-2xl">Title</p>
<p class="text-xs">Subtitle</p>
```

**Recommended text palette:**
- Primary: `text-gray-900`
- Secondary: `text-gray-500`
- Tertiary: `text-gray-400`
- Weights: `font-normal` (400) and `font-semibold` (600) / `font-bold` (700). Avoid weights below 400 for small text.

### Grey Text on Colored Backgrounds

Never use `text-gray-*` on colored backgrounds — grey looks washed out. Instead, use a color derived from the background with the same hue but adjusted lightness/saturation.

```html
<!-- ✅ Correct: color derived from background -->
<div class="bg-blue-600">
  <p class="text-white">Primary text</p>
  <p class="text-blue-200">Secondary text</p>   <!-- same hue, lighter -->
</div>

<!-- ❌ Avoid -->
<div class="bg-blue-600">
  <p class="text-gray-300">Secondary text</p>  <!-- looks dull -->
</div>
```

### Emphasize by De-emphasizing

If the primary element isn't standing out, instead of making it heavier, **reduce the contrast of competing elements**.

```html
<!-- Active nav: de-emphasize the inactive items -->
<nav class="flex gap-4">
  <a class="text-gray-900 font-medium">Active</a>
  <a class="text-gray-400">Inactive</a>
  <a class="text-gray-400">Inactive</a>
</nav>
```

### Action Hierarchy (Buttons)

```html
<!-- Primary: solid, high contrast -->
<button class="bg-blue-600 text-white px-4 py-2 rounded font-medium">Confirm</button>

<!-- Secondary: outline or low contrast -->
<button class="border border-blue-600 text-blue-600 px-4 py-2 rounded">Cancel</button>

<!-- Tertiary: plain link -->
<button class="text-blue-600 underline">Learn more</button>
```

Destructive actions don't always need to be big and red. Only style them that way on the confirmation step where they are the primary action.

### Labels as a Last Resort

Avoid the `Label: Value` pattern whenever context or format makes it unnecessary:
- `janedoe@example.com` is clearly an email.
- Instead of `Bedrooms: 3` → `3 bedrooms`.
- When a label is necessary, treat it as supporting content: `text-xs text-gray-500`.

### Separate Visual Hierarchy from Document Hierarchy

The HTML tag (`h1`, `h2`…) defines semantics. Visual style is independent.

```html
<!-- h1 for semantics, but visually small (it's a section label) -->
<h1 class="text-xs font-semibold text-gray-500 uppercase tracking-widest">
  Summary
</h1>

<!-- p visually prominent (it's the important data) -->
<p class="text-4xl font-bold text-gray-900">$12,400</p>
```

### Balance Weight and Contrast

Icons are visually "heavy" — they cover a lot of surface area. Reduce their contrast to balance them against text.

```html
<!-- ✅ Soften icon to balance with text -->
<div class="flex items-center gap-2">
  <svg class="w-5 h-5 text-gray-400">...</svg>
  <span class="text-gray-900 font-medium">Label</span>
</div>
```

Conversely, thin borders can be emphasized by increasing their width rather than darkening their color.

---

## 3. Spacing and Sizing

### Start with Too Much Space

It's always easier to remove space than to add it. Start with generous padding/margin and reduce.

```html
<!-- Start here -->
<div class="p-12 space-y-8">...</div>

<!-- Reduce if needed -->
<div class="p-8 space-y-6">...</div>
```

### Tailwind Spacing Scale (4px base)

Tailwind already implements the scale recommended in Refactoring UI. Always use it — avoid arbitrary values like `p-[13px]` without good reason.

| Class | px | Typical use |
|-------|----|-------------|
| `p-1` | 4px | Micro-padding (badges, chips) |
| `p-2` | 8px | Icon padding, small inputs |
| `p-3` | 12px | Compact buttons |
| `p-4` | 16px | Standard buttons |
| `p-6` | 24px | Small cards |
| `p-8` | 32px | Sections |
| `p-12` | 48px | Airy sections |
| `p-16` | 64px | Hero sections |

### Ambiguous Spacing → Always More Space Between Groups

```html
<!-- ✅ Space between groups > space within groups -->
<div class="space-y-6">          <!-- between field groups -->
  <div class="space-y-1">        <!-- between label and its input -->
    <label class="text-sm text-gray-700">Email</label>
    <input class="..." />
  </div>
  <div class="space-y-1">
    <label class="text-sm text-gray-700">Password</label>
    <input class="..." />
  </div>
</div>
```

### You Don't Have to Fill the Whole Screen

```html
<!-- Use max-w to limit to the actual needed width -->
<div class="max-w-md mx-auto">...</div>   <!-- login form -->
<div class="max-w-2xl mx-auto">...</div>  <!-- article -->
<div class="max-w-4xl mx-auto">...</div>  <!-- main dashboard -->
```

### Grids Are a Tool, Not a Religion

Sidebars and fixed-content elements → **fixed width**, not percentage-based:

```html
<!-- ✅ Fixed sidebar, flexible content -->
<div class="flex">
  <aside class="w-64 shrink-0">...</aside>
  <main class="flex-1 min-w-0">...</main>
</div>

<!-- ❌ % sidebar can break at certain breakpoints -->
<div class="grid grid-cols-12">
  <aside class="col-span-3">...</aside>
  <main class="col-span-9">...</main>
</div>
```

### Relative Sizing Doesn't Scale Linearly

On mobile, large headings should shrink **disproportionately** more than body text — not just scaled uniformly:

```html
<!-- ✅ Independent scaling -->
<h1 class="text-2xl md:text-4xl lg:text-5xl font-bold">Title</h1>
<p class="text-sm md:text-base">Body text</p>
```

---

## 4. Typography

### Tailwind Type Scale (use it, don't invent values)

```
text-xs   → 12px
text-sm   → 14px
text-base → 16px
text-lg   → 18px
text-xl   → 20px
text-2xl  → 24px
text-3xl  → 30px
text-4xl  → 36px
text-5xl  → 48px
text-6xl  → 60px
```

Use `px`/`rem` via Tailwind classes. **Never use `em`** for font sizes in design systems — it creates unpredictable cascade.

### Line Length: 45–75 Characters

```html
<p class="max-w-prose">...</p>       <!-- Tailwind: ~65ch, ideal for reading -->
<p class="max-w-sm">...</p>          <!-- narrower if the design calls for it -->
```

Use `max-w-prose` for any long text block.

### Baseline Alignment, Not Center, for Mixed Sizes

```html
<!-- ✅ Baseline when mixing font sizes -->
<div class="flex items-baseline gap-2">
  <span class="text-4xl font-bold text-gray-900">1,234</span>
  <span class="text-sm text-gray-500">users</span>
</div>

<!-- ❌ items-center can look visually misaligned -->
```

### Proportional Line-Height

- Small/body text: `leading-relaxed` (1.625) or `leading-loose` (2) for long lines.
- Large headings: `leading-tight` (1.25) or `leading-none` (1).
- Larger font size → shorter line-height. Smaller font size or long lines → taller line-height.

```html
<h1 class="text-5xl font-bold leading-tight">Large heading</h1>
<p class="text-base leading-relaxed max-w-prose">Body paragraph...</p>
```

### Letter-Spacing

- Headlines using a body font (e.g. Inter at large sizes): `tracking-tight` for a condensed effect.
- ALL CAPS text: always `tracking-wider` or `tracking-widest` for legibility.

```html
<h2 class="text-4xl font-bold tracking-tight">Headline</h2>
<span class="text-xs font-semibold uppercase tracking-widest text-gray-500">Category</span>
```

### Font Choice

For UI, use neutral sans-serif fonts. Tailwind's default `font-sans` already includes system fonts (Inter, Segoe UI, Roboto…) — use it as a safe base.

Choose fonts with at least 5 available weights. On Google Fonts, filter by "10+ styles."

---

## 5. Color

### Think in HSL, Not Hex

HSL (Hue, Saturation, Lightness) is more intuitive for adjusting colors. Tailwind's palette is built on implicit HSL values.

### Full Palette: Grays + Primary + Accent

You need **more colors than you think**. Minimum per category:

- **Grays**: 8–10 shades. Use Tailwind's full scale: `gray-50` to `gray-950`.
- **Primary color**: 5–10 shades. e.g. `blue-100` to `blue-900`.
- **Accent colors**: for semantic states.

```html
<!-- Semantic states -->
<div class="bg-green-50 border border-green-200 text-green-800">✅ Success</div>
<div class="bg-yellow-50 border border-yellow-200 text-yellow-800">⚠️ Warning</div>
<div class="bg-red-50 border border-red-200 text-red-800">❌ Error</div>
<div class="bg-blue-50 border border-blue-200 text-blue-800">ℹ️ Info</div>
```

### Define Shades Up Front

Don't use `lighten`/`darken` in CSS-in-JS or `opacity` to create variations. Pick a concrete shade from Tailwind's palette.

9-shade scale (100 → 900) with **500 as the base**:
- 900: text on light backgrounds
- 700–800: hover states
- 500: base color (buttons, active elements)
- 300–400: disabled elements, secondary icons
- 100–200: tinted backgrounds (alerts, badges)

### Lightness Kills Saturation

At very light or dark values, increase saturation to keep the color vivid. Tailwind's scale already handles this — respect it. Don't use `opacity-50` on background colors to create variations.

### Grays Don't Have to Be Neutral

Grays with a touch of saturation look more refined:
- **Cool grays**: `slate-*` (blue tint)
- **Neutral grays**: `gray-*` / `zinc-*`
- **Warm grays**: `stone-*` / `neutral-*`

Keep the temperature consistent throughout the design.

### Color Accessibility

WCAG: minimum contrast 4.5:1 for normal text (<18px), 3:1 for large text.

```html
<!-- ✅ Dark text on light colored background (more accessible) -->
<div class="bg-blue-100 text-blue-900">Accessible and subtle</div>

<!-- Check contrast before using white on mid-range colors -->
<div class="bg-blue-400 text-white">⚠️ Verify contrast ratio</div>
```

**Never rely on color alone** to communicate information. Always pair with icons, text, or patterns.

```html
<!-- ✅ Color + icon + text -->
<span class="text-green-600">↑ +12%</span>
<span class="text-red-600">↓ -8%</span>
```

---

## 6. Depth and Shadows

### Shadow System (z-axis)

Tailwind's built-in shadow scale maps directly to elevation:

| Class | Elevation | Use |
|-------|-----------|-----|
| `shadow-sm` | Minimal | Buttons, inputs, chips |
| `shadow` | Low | Cards, forms |
| `shadow-md` | Medium | Dropdowns, tooltips |
| `shadow-lg` | High | Modals, floating sidebars |
| `shadow-xl` | Maximum | Critical overlays |
| `shadow-none` | None | Pressed/active state |

```html
<button class="shadow-sm hover:shadow transition-shadow">Button</button>
<div class="shadow-md">Dropdown</div>
<div class="shadow-xl">Modal</div>
```

### Two-Part Shadows for Realism

```html
<!-- Combine direct light shadow + ambient shadow -->
<div class="shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.08)]">
  Card with natural shadow
</div>
```

### Simulating Light (Raised vs. Inset)

**Raised element** (button, card): lighter top edge + shadow below.

```html
<button class="
  border-t border-white/20
  shadow-[0_1px_2px_rgba(0,0,0,0.2)]
  bg-blue-600 text-white px-4 py-2 rounded
">
  Raised button
</button>
```

**Inset element** (input, well):

```html
<input class="
  shadow-inner
  border border-gray-300
  bg-gray-50
  rounded px-3 py-2
" />
```

### Flat Design with Depth

Without shadows, depth can be created with color alone:
- Element lighter than background → feels closer / raised.
- Element darker than background → feels inset.

```html
<div class="bg-white">
  <div class="bg-gray-50">...</div>          <!-- inset feel -->
  <div class="bg-white border border-gray-100">...</div>  <!-- card -->
</div>
```

Solid shadows with no blur radius also work for a flat-but-depth look:

```html
<div class="shadow-[2px_2px_0px_#1a1a1a] border border-gray-900">
  Flat card with solid shadow
</div>
```

---

## 7. Images

- Always use `object-cover` in fixed-size containers for user images.
- Don't scale SVG icons beyond their design size (~24px). If you need large icons, wrap them in a shape with a background color.
- Don't use full-app screenshots scaled down to 30% — use partial screenshots or reduced-resolution shots.

```html
<!-- Avatar or user image -->
<div class="w-10 h-10 rounded-full overflow-hidden">
  <img src="..." class="w-full h-full object-cover" />
</div>

<!-- Small icon in large space -->
<div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
  <svg class="w-5 h-5 text-blue-600">...</svg>
</div>
```

**Text over images**: combine overlay + drop shadow for guaranteed legibility.

```html
<div class="relative">
  <img src="..." class="w-full h-64 object-cover brightness-75" />
  <p class="absolute inset-0 flex items-center justify-center
            text-white text-2xl font-bold drop-shadow-lg">
    Readable text
  </p>
</div>
```

**User-uploaded images**: prevent background bleed with a subtle inner shadow instead of a border.

```html
<div class="w-16 h-16 rounded-full overflow-hidden ring-1 ring-black/5 shadow-inner">
  <img src="..." class="w-full h-full object-cover" />
</div>
```

---

## 8. Finishing Touches

### Fewer Borders

Before adding a border to separate elements, consider:

```html
<!-- Option 1: different background -->
<div class="bg-gray-50">...</div>
<div class="bg-white">...</div>

<!-- Option 2: subtle shadow -->
<div class="shadow-sm">...</div>

<!-- Option 3: more space -->
<div class="mt-8">...</div>
```

### Accent Borders to Add Color Without Complexity

```html
<!-- Top border on card -->
<div class="border-t-4 border-blue-500 rounded-b-lg shadow p-6">...</div>

<!-- Left border on alert -->
<div class="border-l-4 border-yellow-400 bg-yellow-50 p-4">⚠️ Warning</div>

<!-- Top border on active nav item -->
<a class="border-t-2 border-blue-600 pt-1 text-blue-600">Active</a>
```

### Empty States

Never leave an empty state untreated. Include an illustration/icon + call-to-action:

```html
<div class="text-center py-16">
  <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
    <svg class="w-8 h-8 text-gray-400">...</svg>
  </div>
  <h3 class="text-lg font-semibold text-gray-900 mb-1">No projects yet</h3>
  <p class="text-gray-500 mb-6">Create your first project to get started.</p>
  <button class="bg-blue-600 text-white px-4 py-2 rounded font-medium">
    New project
  </button>
</div>
```

### Supercharging Defaults

- Bullet lists → icons with `text-blue-500`
- Links → `font-medium text-blue-600 underline decoration-2 underline-offset-2`
- Checkboxes/radios → `accent-blue-600` or custom styled
- Subtle backgrounds → `bg-gradient-to-br from-blue-50 to-indigo-50` (hues ≤30° apart)
- Dropdowns → use multiple columns, colored icons, supporting text
- Tables → combine related columns, add images, use color for data enrichment
- Radio buttons → consider selectable cards instead of plain radio inputs

### Background Decoration

```html
<!-- Subtle gradient (hues ≤30° apart) -->
<div class="bg-gradient-to-br from-blue-600 to-indigo-700">...</div>

<!-- Section with different background -->
<section class="bg-gray-50 py-16">...</section>
```

---

## Pre-delivery Checklist

- [ ] Is hierarchy clear using weight/color, not just size?
- [ ] Does text have 2–3 color levels (not all `gray-900`)?
- [ ] Does spacing use Tailwind's scale (no arbitrary values)?
- [ ] Is there enough breathing room? (start with too much, remove as needed)
- [ ] Is text width constrained to `max-w-prose` or ~65ch?
- [ ] Do shadows reflect the z-axis hierarchy of the component?
- [ ] Is the color palette defined (grays + primary + accent)?
- [ ] Does contrast meet WCAG 4.5:1 for normal text?
- [ ] Are icons at their intended size (not scaled excessively)?
- [ ] Is there a designed empty state if the component can be empty?
- [ ] Are fewer borders used than initially seemed necessary?
