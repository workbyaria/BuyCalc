/**
 * Design tokens — warm glassmorphism (Stitch reference).
 * Runtime theme uses `data-theme` on document.documentElement; see index.css.
 */
export const themeIds = ['latte', 'minimal', 'ice', 'pink', 'matcha'];

export const colors = {
  background: '#F5EFE6',
  backgroundTo: '#EDE4D8',
  primaryBrown: '#6B5949',
  text: '#3A3A3A',
  subtext: '#7A7A7A',
  accentWarm: '#6b4a3c',
  glassBorder: 'rgba(255, 255, 255, 0.35)',
};

export const glassStyle = {
  background: 'rgba(255, 255, 255, 0.22)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  borderRadius: 26,
  border: '1px solid rgba(255,255,255,0.35)',
  boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
};
