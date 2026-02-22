# CLAUDE.md — Project Documentation
## Athkar / Daily Wird Static Website

---

## Project Overview

A mobile-first static Arabic website for prophetic supplications (أذكار), deployed via GitHub Pages.

- **Live URL:** https://abdualhumud.github.io/Abdulrahman-/
- **Repository:** https://github.com/abdualhumud/Abdulrahman-
- **Branch deployed:** `master`
- **Pages source:** root of master branch
- **Files:** `index.html` (main page) + `wird.html` (daily wird page)

---

## Architecture

Single-file static HTML — no build tools, no backend, no dependencies except Google Fonts.

```
index.html   — 50 prophetic supplications (جوامع دعاء النبي ﷺ)
wird.html    — Daily Wird: 4 Quranic surahs + 3 hadith adhkar
CLAUDE.md    — this file
```

---

## Design System

### Colors — Two Themes Only (no others)

| Variable | Cream (default) | Dark / Night |
|---|---|---|
| `--bg` | `#FAF6F0` | `#1A1612` |
| `--card` | `#FFFDF9` | `#242018` |
| `--border` | `#E8DDD0` | `#3A3228` |
| `--accent` | `#7A5C3E` | `#C8A87A` |
| `--accent2` | `#A07850` | `#E0C090` |
| `--text` | `#2C1F0F` | `#F5EDD8` |
| `--muted` | `#7A6652` | `#B0906A` |
| `--ref-bg` | `#F5EDE2` | `#2E2820` |
| `--header-bg` | `#7A5C3E` | `#2E2820` |
| `--header-fg` | `#FFFDF9` | `#F5EDD8` |
| `--counter-bg` | `#7A5C3E` | `#C8A87A` |
| `--counter-fg` | `#FFFFFF` | `#1A1612` |

Theme applied via `data-theme="dark"` on `<body>`. Default (cream) uses `:root`.

### Font Sizes

```js
const FONT_SIZES = [
  { label: 'صغير',  px: 18 },
  { label: 'متوسط', px: 24 },  // default index = 1
  { label: 'كبير',  px: 30 },
  { label: 'أكبر',  px: 36 }
];
let fontIdx = 1; // متوسط is default
```

Font: **Amiri** (Google Fonts), Arabic serif.

### Persistence

Both pages share the same localStorage keys:
- `athkar-theme` — `'cream'` or `'dark'`
- `athkar-font` — integer index 0–3

---

## Header Layout

### index.html

```
Row 1: [title-area (title + اللون swatches)] | [font-controls] | [🌙 toggle]
Row 2: [📖 الورد اليومي button — left-aligned (flex-end in RTL)]
```

### wird.html

```
Row 1: [← رجوع] | [title-area (title + اللون swatches)] | [font-controls] | [🌙 toggle]
```

### Color Swatch Widget

```html
<div class="color-selector">
  <span class="color-label">اللون</span>
  <button class="color-swatch swatch-cream active" id="swatch-cream"
          onclick="setPillTheme(false)"></button>
  <button class="color-swatch swatch-dark" id="swatch-dark"
          onclick="setPillTheme(true)"></button>
</div>
```

- Cream swatch: `#FAF6F0` circle
- Dark swatch: `#1A1612` circle
- Active swatch: white ring `box-shadow: 0 0 0 2.5px #fff` + `scale(1.18)`
- Both swatches stay in sync with the 🌙/☀️ toggle via `applyTheme()`

---

## Basmala Rules — CRITICAL

| Context | Basmala shown? |
|---|---|
| Quranic surah cards (wird.html) | **YES** — as a `.basmala-inline` span, verse ﴿١﴾ in Al-Fatiha; as a separate `.basmala` div in other surahs |
| Hadith / dhikr cards | **NO** — never |
| Main page dua cards (index.html) | **NO** — all 50 cards are hadith |

Do NOT add `بسم الله` to any hadith card. This was a recurring mistake to avoid.

---

## Al-Fatiha Verse Numbering

Al-Fatiha is the **only** surah where the Basmala counts as verse ﴿١﴾.

```html
<div class="verses">
  <span class="verse-line basmala-v">
    <span class="basmala-inline">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</span>
    <span class="verse-num">﴿١﴾</span>
  </span>
  <span class="verse-line">الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ <span class="verse-num">﴿٢﴾</span></span>
  <span class="verse-line">الرَّحْمَنِ الرَّحِيمِ <span class="verse-num">﴿٣﴾</span></span>
  <span class="verse-line">مَالِكِ يَوْمِ الدِّينِ <span class="verse-num">﴿٤﴾</span></span>
  <span class="verse-line">إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ <span class="verse-num">﴿٥﴾</span></span>
  <span class="verse-line">اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ <span class="verse-num">﴿٦﴾</span></span>
  <span class="verse-line">صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ <span class="verse-num">﴿٧﴾</span></span>
</div>
```

For Al-Ikhlas, Al-Falaq, An-Nas: Basmala stays as a separate `<div class="basmala">` (no verse number), verses start at ﴿١﴾.

---

## Quranic Text (Verified)

Use standard Arabic with full tashkeel. Verified text:

### Al-Fatiha (الفاتحة)
بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ ﴿١﴾ — الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ﴿٢﴾ — الرَّحْمَنِ الرَّحِيمِ ﴿٣﴾ — مَالِكِ يَوْمِ الدِّينِ ﴿٤﴾ — إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴿٥﴾ — اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ﴿٦﴾ — صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ﴿٧﴾

### Al-Ikhlas (الإخلاص) — Basmala + 4 verses
قُلْ هُوَ اللَّهُ أَحَدٌ ﴿١﴾ — اللَّهُ الصَّمَدُ ﴿٢﴾ — لَمْ يَلِدْ وَلَمْ يُولَدْ ﴿٣﴾ — وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ ﴿٤﴾

### Al-Falaq (الفلق) — Basmala + 5 verses
قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ﴿١﴾ — مِن شَرِّ مَا خَلَقَ ﴿٢﴾ — وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ﴿٣﴾ — وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ﴿٤﴾ — وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ ﴿٥﴾

### An-Nas (الناس) — Basmala + 6 verses
قُلْ أَعُوذُ بِرَبِّ النَّاسِ ﴿١﴾ — مَلِكِ النَّاسِ ﴿٢﴾ — إِلَهِ النَّاسِ ﴿٣﴾ — مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ﴿٤﴾ — الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ﴿٥﴾ — مِنَ الْجِنَّةِ وَالنَّاسِ ﴿٦﴾

---

## Daily Wird Page (wird.html) — Card Structure

### Quran cards (w1–w4)

```html
<article class="wird-card" id="w1">
  <div class="card-header"><div class="surah-badge">سورة الفاتحة</div></div>
  <!-- Al-Fatiha: Basmala is verse 1 (inline in verses div) -->
  <!-- Other surahs: <div class="basmala">...</div> before <div class="verses"> -->
  <div class="verses">
    <span class="verse-line">...<span class="verse-num">﴿١﴾</span></span>
  </div>
  <div class="wird-ref">...</div>
  <div class="counter-area">...</div>
</article>
```

### Hadith cards (w5–w7) — NO basmala div

```html
<article class="wird-card" id="w5">
  <div class="card-header"><div class="hadith-badge">...</div></div>
  <div class="wird-text">«...»</div>
  <div class="wird-ref">...</div>
  <div class="counter-area">...</div>
</article>
```

---

## Deployment

```bash
# Push local branch to master (GitHub Pages serves from master)
git -c http.sslVerify=false push origin claude/great-rosalind:master

# Check Pages build status
curl -k -s -H "Authorization: token TOKEN" \
  "https://api.github.com/repos/abdualhumud/Abdulrahman-/pages" | grep "status"
```

- SSL bypass (`-c http.sslVerify=false`) is required on this Windows machine
- Pages build takes ~20–40 seconds after push
- Status changes from `"building"` to `"built"` when live

---

## Design Rules (User Preferences)

1. **Do NOT redesign** — only refine. Preserve spacing, structure, visual identity.
2. **Only two themes** — Cream and Dark/Night. No green, blue, rose, or other colors.
3. **Default font** — Medium (متوسط, 24px). Not large.
4. **RTL layout** — `lang="ar" dir="rtl"`. In RTL, `flex-end` = visual LEFT.
5. **Basmala** — Quran only. Never add to hadith.
6. **No extra features** — Do not add anything not explicitly requested.
7. **Header design** — warm brown/cream (`#7A5C3E` header). Do not flatten to black/white.
8. **Wird button** — below font controls, aligned to the visual LEFT of the header.

---

## Common Mistakes to Avoid

| Mistake | Correct approach |
|---|---|
| Adding Basmala to hadith cards | Basmala is Quran-only |
| Setting default font to large (32px) | Default is `fontIdx = 1` (متوسط, 24px) |
| Replacing warm brown header with flat black | Restore `--header-bg: #7A5C3E` |
| Adding a third theme color | Only cream + dark |
| Merging or shortening Quranic verses | Each verse on its own line, exact wording |
| Numbering Al-Fatiha without Basmala as ﴿١﴾ | Basmala = verse 1 in Fatiha only |
| Using `timeout /t` on Windows bash | Use `sleep N` instead |
| Using `findstr` in bash | Use `grep` instead |

---

## Git Workflow

```bash
# Working branch
git checkout claude/great-rosalind

# Stage and commit
git add index.html wird.html
git commit -m "Description"

# Deploy to GitHub Pages
git -c http.sslVerify=false push origin claude/great-rosalind:master
```

If `index.lock` error appears: find and remove stale lock with `find /c/Users/... -name "*.lock"`.
