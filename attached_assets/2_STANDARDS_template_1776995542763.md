# STANDARDS.md

## BAIS:3300 - Digital Product Management · Module 8 | Personal Landing Page Project

_This file contains technical instructions for this project. Every time you
begin a coding session, ask your LLM to read this file before writing any code.
The LLM will follow these standards automatically without you needing to repeat
them in every prompt._

_To start a session, paste this into your LLM:_
_"Please read my STANDARDS.md file before we begin. I will be asking you to build
and modify my personal landing page."_

---

## 1. Project Overview

[2–3 sentences describing what this site is, who it is for, and what a
successful outcome looks like. Draw from Sections 1 and 2 of your PRD.]

---

## 2. Technical Standards

These rules apply to every file in this project without exception.

**Languages and versions:**

- HTML5 — use semantic elements throughout: `<header>`, `<main>`, `<section>`,
  `<article>`, `<footer>`, `<nav>`
- CSS3 — all styles must be written in `css/stylesheet.css`; no inline `style=""`
  attributes; no `<style>` tags in any HTML file
- HTML5 and CSS3 code must pass validation

**Folder structure:**

<pre>
/your-website-project (Root Folder)  
├── index.html  
├── /css  
│    └── stylesheet.css  
├── /js  
│    └── scripts.js  
├── /images  
│    └── headshot.jpg
</pre>

**Framework:**

- [Delete one of the following options:]
- No framework — vanilla CSS only
- Bootstrap 5.3 loaded via CDN in the `<head>` of `index.html`
- Tailwind CSS

**Architecture:**

- Static site — no JavaScript, no server-side code, no database, no back-end
- Single `index.html` file in the project root
- External stylesheet: `stylesheet.css` in the css folder and referenced by relative path
- All images stored in the `images/` subfolder and referenced by relative path
  (e.g., `src="images/photo.jpg"`) — never link to external image URLs
- Do not link to or embed my resume anywhere on the site

**Responsiveness:**

- Fully responsive at all screen widths from 320px and wider
- No horizontal scrolling on any viewport

**Accessibility — WCAG 2.2 Level AA (non-negotiable):**

- All `<img>` elements must have a descriptive `alt` attribute
- Color contrast ratio: minimum 4.5:1 for normal text, 3:1 for large text
- Heading hierarchy must be logical: `<h1>` → `<h2>` → `<h3>`, no levels skipped
- All link text must be descriptive — no "click here", "read more", or bare URLs
- Page `<title>` element must be descriptive (not "Untitled" or "index")
- All interactive elements (links, buttons) must be keyboard navigable

**Compatibility:**

- Must render correctly on Chrome, Safari, and Firefox; must be mobile-responsive (works on screens 375px and wider)

## **Security:**

- Links to external sites should open in a new tab (`target="_blank"` with `rel="noopener noreferrer"`)

---

## 3. Design Standards

These visual rules apply to the entire site. Claude must follow them on every
build and every revision.

**Color palette:**

| Role                 | Hex Code        | Usage                                 |
| -------------------- | --------------- | ------------------------------------- |
| Background           | [e.g., #F8F9FA] | Page background                       |
| Primary text         | [e.g., #212529] | Body copy, paragraphs                 |
| Accent               | [e.g., #0D6E6E] | Section headings, links, skill tags   |
| Secondary background | [e.g., #E9ECEF] | Section backgrounds, card backgrounds |

**OR:** Navy / teal / white. Clean and modern, not flashy.

**Typography:**

- Heading font: [font name, e.g., Inter] — import from Google Fonts
- Body font: [font name, e.g., Inter]
- Body size: [e.g., 16px], line height: [e.g., 1.6]
- H1 (page name): [e.g., 1.5rem, bold]
- H2 (section headings): [e.g., 1.25rem, bold, accent color]

**Imagery:** Professional headshot only. No stock photos or clip art. No emojis.

**Layout:**

- Maximum content width: [e.g., 800px], centered on the page
- Navigation: [e.g., sticky top bar with anchor links to each section]
- Section spacing: [e.g., 60px top and bottom padding on each section]
- Single column on mobile, two-column on desktop for project cards. Generous whitespace.

**Component styles:**

_Profile photo:_

- [e.g., Circular crop, 160px diameter, centered in the hero section]

_Skill tags:_

- [e.g., Rounded pill badges — accent color background with white text for
  technical skills; secondary background with dark text for professional skills]

_Contact links:_

- [e.g., Display as labeled icon badges opening in a new tab; include LinkedIn,
  GitHub, and email]

_Navigation links:_

- [e.g., Plain text links, accent color on hover, no underline by default]

**Tone:**

- **Three words that describe the desired feel:** Professional, Approachable, Data-driven
- [e.g., Clean and minimal. Professional but approachable. Not a corporate
  brochure, not a creative portfolio.]
- **Writing tone:** First person, direct, and confident. Avoid buzzwords like 'passionate' or 'synergy.'

**Reference sites:**

- [e.g., read.cv — for overall simplicity and whitespace]
- [e.g., brittanychiang.com — for section hierarchy (light background only,
  not dark mode)]

_Remember: this document is a living artifact. Update it as you learn more._
