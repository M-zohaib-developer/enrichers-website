# Header & Footer — Exact Spec

Source of truth: **https://enrichers-demo.innovidio.com/candidates/a**
Values below were extracted from that site's own compiled CSS
(`/_next/static/chunks/2e-_dy4czkefg.css` + `2huu90ye43l0j.css`), not estimated.

Rule for this build: **no colour literal may appear in any component.**
Every colour comes from a token defined in `globals.css`.

---

## 1. Design tokens — put all of these in `globals.css`

### 1.1 Primitive palette (tier 1 — never used directly in components)

```css
:root {
  /* brand blue */
  --e-cube-50:  #f0f8fd;
  --e-cube-100: #dceffa;
  --e-cube-200: #b7e0f5;
  --e-cube-300: #8acfef;
  --e-cube-400: #4fb4e6;
  --e-cube-500: #1c95d0;
  --e-cube-600: #1480b8;
  --e-cube-700: #0b6aa2;
  --e-cube-800: #0a4f7c;
  --e-cube-900: #0a3558;

  /* brand navy */
  --e-midnight-700: #13294a;
  --e-midnight-800: #0f2445;
  --e-midnight-900: #0a1f3d;
  --e-midnight-950: #07111f;

  /* neutrals */
  --e-neutral-0:   #fff;
  --e-neutral-25:  #f5f7fa;
  --e-neutral-50:  #edf1f5;
  --e-neutral-100: #e3e8ee;
  --e-neutral-200: #c9d2dc;
  --e-neutral-400: #7d8a9c;
  --e-neutral-500: #5e6b7d;
  --e-neutral-700: #3a4556;
  --e-neutral-900: #0c1522;

  /* accents */
  --e-verdigris: #0e8a7b;
  --e-slate:     #52627a;
  --e-sandstone: #d6cbb3;
  --e-logo-red:  #d9272e;
}
```

### 1.2 Semantic tokens (tier 2 — this is what components use)

```
--color-text            --color-surface          --color-action
--color-text-secondary  --color-surface-sunken   --color-action-hover
--color-text-muted      --color-surface-inverse  --color-on-action
--color-text-link       --color-background       --color-focus
--color-border          --color-border-subtle    --color-border-strong
--color-positive        --color-negative         --color-warning  --color-info
```

### 1.3 Theme classes (tier 3 — a block sets its own theme, children inherit)

```css
.theme-light {
  background: var(--e-neutral-0);
  color: var(--e-neutral-900);
  --color-text: var(--e-neutral-900);
  --color-text-secondary: var(--e-neutral-700);
  --color-text-muted: var(--e-neutral-500);
  --color-border: var(--e-neutral-200);
  --color-border-subtle: var(--e-neutral-100);
  --color-border-strong: var(--e-neutral-400);
  --color-surface: var(--e-neutral-0);
  --color-surface-sunken: var(--e-neutral-50);
  --color-text-link: var(--e-cube-700);
  --color-action: var(--e-midnight-900);
  --color-action-hover: var(--e-midnight-700);
  --color-on-action: var(--e-neutral-0);
  --color-focus: var(--e-cube-500);
}

/* header AND footer both use this one */
.theme-inverse {
  background: var(--e-midnight-900);
  color: var(--e-neutral-0);
  --color-text: var(--e-neutral-0);
  --color-text-secondary: #c3cdd9;
  --color-text-muted: #93a1b3;
  --color-border: #2a3f5c;
  --color-border-subtle: #1c2e47;
  --color-border-strong: #5e7391;
  --color-surface: #0e1c31;
  --color-text-link: #5cb8ea;
  --color-action: var(--e-cube-500);
  --color-action-hover: var(--e-cube-400);
  --color-on-action: var(--e-neutral-900);
  --color-focus: var(--e-cube-400);
}
```

### 1.4 Typography scale

```css
--font-display: "Albert Sans", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
--font-text:    "Source Sans 3", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
--font-serif:   "Source Serif 4", Georgia, "Times New Roman", serif;
--font-mono:    "Source Code Pro", SFMono-Regular, Menlo, Consolas, monospace;

--font-size-display-xl: clamp(48px, 6.2vw, 88px);
--font-size-display:    clamp(40px, 4.8vw, 64px);
--font-size-h1:         clamp(34px, 3.6vw, 48px);
--font-size-h2:         clamp(28px, 2.8vw, 36px);
--font-size-h3:         clamp(23px, 2.2vw, 28px);
--font-size-h4:         clamp(20px, 1.7vw, 22px);
--font-size-h5:         18px;
--font-size-h6:         14px;
--font-size-body-lg:    20px;
--font-size-body:       17px;
--font-size-body-sm:    15px;
--font-size-button:     15px;
--font-size-caption:    13px;
--font-size-label:      13px;
--font-size-overline:   12px;

--line-height-tight:   1.05;
--line-height-heading: 1.15;
--line-height-snug:    1.3;
--line-height-ui:      1.4;
--line-height-body:    1.6;

--letter-spacing-display:  -0.03em;
--letter-spacing-heading:  -0.015em;
--letter-spacing-label:     0.04em;
--letter-spacing-overline:  0.14em;

--font-weight-light:    300;
--font-weight-normal:   400;
--font-weight-medium:   500;
--font-weight-semibold: 600;
--font-weight-bold:     700;
```

Body base:
```css
body {
  background: var(--color-background);
  color: var(--color-text);
  font-family: var(--font-text);
  font-size: var(--font-size-body);     /* 17px */
  line-height: var(--line-height-body); /* 1.6  */
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
```

### 1.5 Radius / shadow / motion / layout

```css
--radius-xs: 2px;  --radius-sm: 4px;  --radius-md: 6px;
--radius-lg: 10px; --radius-full: 9999px;

/* light */
--shadow-sm: 0 1px 2px #0a1f3d0f;
--shadow-md: 0 4px 12px -2px #0a1f3d14, 0 2px 4px #0a1f3d0a;
--shadow-lg: 0 16px 40px -8px #0a1f3d29, 0 4px 10px #0a1f3d0f;
/* inverse */
--shadow-sm: 0 1px 2px #0006;
--shadow-md: 0 6px 16px -4px #00000080;
--shadow-lg: 0 20px 48px -12px #0009;

--duration-instant:    80ms;
--duration-fast:       0.14s;
--duration-normal:     0.22s;
--duration-slow:       0.36s;
--duration-deliberate: 0.64s;
--ease-standard:   cubic-bezier(0.2, 0, 0, 1);
--ease-emphasized: cubic-bezier(0.3, 0, 0, 1);
--ease-enter:      cubic-bezier(0, 0, 0.2, 1);
--ease-exit:       cubic-bezier(0.4, 0, 1, 1);

--wide-max:    1440px;
--content-max: 1280px;
--measure:     680px;
--header-h:    72px;
```

Responsive gutter:
| Min width | `--gutter` |
|---|---|
| 0 | 16px |
| 390px | 20px |
| 480px | 24px |
| 768px | 32px |
| 1024px | 48px |

```css
.container-wide {
  width: 100%;
  max-width: calc(var(--wide-max) + 2 * var(--gutter));
  padding-inline: var(--gutter);
  margin-inline: auto;
}
```

### 1.6 Icon style — applies to EVERY svg in header and footer

```
fill="none"  stroke="currentColor"  stroke-width="1.5"
stroke-linecap="square"  stroke-linejoin="miter"
```
Sharp corners, not rounded. Sizes: nav chevron 16, hamburger 24, footer contact 18, footer doc 16.

---

## 2. Header — exact values

Shell: `position:sticky; top:0; z-index:40; border-bottom:1px solid #ffffff1a` + `.theme-inverse`

Bar: `.container-wide` + `display:flex; align-items:center; gap:24px; height:72px`

| Element | Property | Exact value |
|---|---|---|
| Logo | width | 160px, height auto, `flex-shrink:0` |
| Nav wrapper | — | `margin-left:auto`, hidden → `display:block` at **1024px** |
| Nav list | — | `display:flex; align-items:center; gap:4px` |
| Nav item | box | `display:flex; height:72px; align-items:center; gap:4px; padding-inline:12px` |
| Nav item | font-size | **15px** |
| Nav item | font-weight | **600** |
| Nav item | line-height | 1.6 (inherited) |
| Nav item | font-family | Source Sans 3 (inherited) |
| Nav item | colour | `#ffffffd9` (white 85%) → hover `#fff` |
| Nav chevron | — | 16×16, `transition-transform var(--duration-fast)` = 0.14s |
| Right cluster | — | `margin-left:auto; display:flex; align-items:center; gap:8px`; at 1024px `margin-left:8px` |
| "Book a consultation" | visibility | hidden → `inline-flex` at **1280px** |
| | box | `height:44px; align-items:center; padding-inline:12px` |
| | font | 15px / 600 |
| | colour | `#ffffffd9` → hover `#fff` |
| "Open an account" | visibility | wrapper hidden → `inline-flex` at **640px** |
| | box | `display:inline-flex; align-items:center; justify-content:center; gap:8px; height:44px; padding-inline:20px; border-radius:4px` |
| | font | 15px / 600 |
| | colour | bg `#fff`, text `var(--e-midnight-900)` → hover bg `var(--e-cube-50)` |
| | transition | `transition-colors` |
| Hamburger | box | `inline-flex; height:44px; width:44px; align-items:center; justify-content:center; border-radius:4px` |
| | colour | `#fff`, hover bg `#ffffff1a` |
| | visibility | hidden at **1024px** |
| | icon | 24×24 |

Nav content: 5 items — `Trade & invest` (mega), `The group` (mega), `Research` (link), `About` (mega), `Contact` (link).
Mega buttons carry `aria-expanded` + `aria-controls="mega-0|1|3"`.

---

## 3. Footer — exact values

Shell: `.theme-inverse` + `position:relative; overflow:hidden`
Container: `.container-wide` + `padding-top:64px; padding-bottom:40px`; at 768px `padding-top:80px`

### Band 1 — brand + links
`display:grid; gap:40px`; at 1024px `grid-template-columns: 1fr 2.2fr`

| Element | Property | Exact value |
|---|---|---|
| Logo | width | **184px**, height auto |
| Tagline | box | `margin-top:24px; max-width:34ch` |
| | font | 15px / 400 / 1.6 |
| | colour | `#ffffffb3` (white 70%) |
| Contact list | box | `margin-top:24px`; items `margin-top:4px` |
| Contact link | box | `inline-flex; min-height:40px; align-items:center; gap:8px` |
| | font | 15px / 400 |
| | colour | `#ffffffd9` → hover `#fff` |
| | icon | 18×18 |
| Link grid | — | `display:grid; grid-template-columns:repeat(2,1fr); gap:32px`; at 768px `repeat(4,1fr)` |
| Group heading | font-size | **12px** |
| | font-weight | **600** |
| | text-transform | uppercase |
| | letter-spacing | **0.14em** |
| | colour | `#ffffff80` (white 50%) |
| Group list | box | `margin-top:16px`; items `margin-top:8px` |
| Group link | font | 15px / 400 |
| | colour | `#fffc` (white 80%) → hover `#fff` |
| | hover | `text-decoration:underline; text-underline-offset:4px` |

Four groups: `Trade & invest`, `The group`, `Insights & learning`, `Company`.

### Band 2 — regulation + legal
`margin-top:56px; border-top:1px solid #ffffff26; padding-top:40px; display:grid; gap:32px`; at 1024px `1fr 2.2fr`

| Element | Property | Exact value |
|---|---|---|
| Heading | — | same overline style as above (12px / 600 / uppercase / 0.14em / white 50%) |
| Doc link | box | `inline-flex; align-items:center; gap:8px` |
| | font | 15px / 400, colour `#fffc` → hover `#fff` + underline offset 4px |
| | icon | 16×16 |
| Legal column | spacing | children `margin-top:16px` |
| | font-size | **13px** |
| | line-height | **1.625** |
| | colour | `#ffffffa6` (white 65%) |
| Legal bold span | — | `font-weight:600; colour:#ffffffd9` (white 85%) |

### Band 3 — copyright
`margin-top:40px; border-top:1px solid #ffffff26; padding-top:24px`
`display:flex; flex-direction:column; gap:12px`; at 768px `row` + `align-items:center` + `justify-content:space-between`

| Element | Property | Exact value |
|---|---|---|
| Text | font | **13px**, colour `#ffffff8c` (white 55%) |
| Link list | — | `display:flex; flex-wrap:wrap; column-gap:20px; row-gap:8px` |
| Link | hover | `#fff` |

---

## 4. White-opacity values used (map these to tokens, do not inline)

| Class on live site | Resolved | Suggested token |
|---|---|---|
| `text-white/85` | `#ffffffd9` | `--color-text` (inverse) |
| `text-white/80` | `#fffc` | `--color-text-secondary` |
| `text-white/70` | `#ffffffb3` | `--color-text-muted` |
| `text-white/65` | `#ffffffa6` | `--color-text-legal` |
| `text-white/55` | `#ffffff8c` | `--color-text-faint` |
| `text-white/50` | `#ffffff80` | `--color-text-overline` |
| `border-white/15` | `#ffffff26` | `--color-border-subtle` |
| `border-white/10` | `#ffffff1a` | `--color-border-hairline` |
| `bg-white/10` | `#ffffff1a` | `--color-hover-ghost` |

---

## 5. Breakpoints

| Name | Width | Used for |
|---|---|---|
| — | 390px | gutter 20px |
| — | 480px | gutter 24px |
| sm | 640px | "Open an account" appears |
| md | 768px | gutter 32px; footer 4 columns; copyright row |
| lg | 1024px | gutter 48px; desktop nav on, hamburger off; footer `1fr 2.2fr` |
| xl | 1280px | "Book a consultation" appears |
