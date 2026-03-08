

## Plan: Update Logo, Favicon & White Navbar

### Changes

1. **Copy uploaded assets into the project**
   - `user-uploads://cropped-Swajit.png` → `src/assets/logo.png` (for navbar)
   - `user-uploads://Favicon.png` → `public/favicon.png` (for favicon)

2. **Update `index.html`**
   - Change `<title>` to "Swajit Engineering Pvt. Ltd."
   - Add `<link rel="icon" href="/favicon.png" type="image/png">`
   - Update meta descriptions and OG tags

3. **Update `Navbar.tsx`** — Switch to white background with dark text
   - Replace the gold circle + "S" placeholder with the actual Swajit logo image
   - Change `bg-primary` → `bg-white shadow-md`
   - Change nav link colors from `text-primary-foreground` → `text-primary` (dark navy)
   - Active link stays `text-accent` (gold)
   - Mobile menu also gets white background with dark text
   - Hamburger icon color → dark navy

### My Suggestion on White Navbar

A white navbar is a great choice for this site. Here's why and how to make it work well:

- **Contrast**: The dark navy text on white gives a clean, professional look that suits an industrial/engineering brand.
- **Logo visibility**: Your full-color Swajit logo will pop much better on white than on the current dark navy background.
- **Scroll effect**: We could optionally add a subtle shadow that intensifies on scroll, giving a floating glass-like feel. This keeps it lightweight at the top but grounded when scrolling.
- **CTA button**: The gold "Request Quote" button will stand out even more against white.
- **Hero section**: Since the hero has its own dark overlay, the transition from white navbar to dark hero creates a nice visual separation.

The only trade-off is that on the hero section, the white navbar won't blend seamlessly — but this is actually desirable as it keeps the navigation always clearly visible and distinct.

