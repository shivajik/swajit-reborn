

# Implementation Plan: Swajit Engineering Website

This is a large single-page website with 10 sections. I'll break it into manageable components.

## Files to Create/Modify

### 1. Update Design System (`src/index.css`)
- Set CSS variables: primary dark navy (`222 80% 20%`), accent gold (`45 90% 50%`), appropriate foreground colors

### 2. Create Section Components (all in `src/components/`)

| Component | Description |
|-----------|-------------|
| `Navbar.tsx` | Sticky dark navy navbar with logo text, nav links (smooth scroll), mobile hamburger menu, "Request Quote" CTA button |
| `HeroSection.tsx` | Full-width carousel (using embla) with 3 slides, overlay text, CTA button |
| `AboutSection.tsx` | Company intro, "Why Choose Us" bullet points, founding info |
| `InfrastructureSection.tsx` | Cards grid: Machine Shop, HT Shop, Press Shop, Assembly Shop, PLC HT Shop with sq ft details |
| `ProductsSection.tsx` | 8 product category cards in a grid (Sugar, Cement, Steel, Chemical, Automobile, Boiler, Solvent, Heavy Duty) with icons and product lists |
| `StatsSection.tsx` | Dark navy background, animated counters: 32+ years, 300+ sugar clients, 100+ cement/steel plants, 250+ team, 18+ countries, ₹105 Cr turnover |
| `ClientsSection.tsx` | Category tabs (Sugar, OEM, Chemical, Steel, Cement, Export) with client logo placeholders/names in grid |
| `ExportSection.tsx` | World reach section listing 18 export countries |
| `CertificationsSection.tsx` | ISO badge, testing facilities highlights |
| `Footer.tsx` | 4-column dark navy footer with company info, quick links, industries, contact details |

### 3. Update `src/pages/Index.tsx`
- Import and compose all sections in order
- Add `id` attributes to each section for smooth scroll navigation

### 4. Custom Hooks
- `useCounterAnimation.ts` — Intersection Observer + counter animation for stats section

### 5. Styling Approach
- Tailwind throughout, alternating section backgrounds (white / light gray / dark navy)
- Bold uppercase section headings with gold accent underlines
- Scroll-triggered fade-in animations via CSS classes
- Responsive: mobile hamburger menu, stacked grids on small screens

### Execution Order
1. Design system (CSS variables)
2. Navbar + Footer (page frame)
3. Hero carousel
4. About, Infrastructure, Products, Stats sections
5. Clients, Export, Certifications sections
6. Wire everything in Index.tsx

