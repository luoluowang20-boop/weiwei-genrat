import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const root = new URL('../', import.meta.url);
let site = process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '');
if (site) {
  const url = new URL(site);
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.pathname !== '/') throw new Error('SITE_URL must be an HTTPS origin, such as https://your-domain.com');
  site = url.origin;
}
const preview = process.env.VERCEL_ENV === 'preview';
const indexable = Boolean(site) && !preview;
const escapeXml = text => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
await mkdir(new URL('dist/', root), { recursive: true });
await cp(new URL('src/', root), new URL('dist/', root), { recursive: true });
const html = await readFile(new URL('src/index.html', root), 'utf8');
const metadata = [site ? `<link rel="canonical" href="${escapeXml(site)}/">` : '', `<meta name="robots" content="${indexable ? 'index,follow' : 'noindex,follow'}">`].filter(Boolean).join('\n  ');
await writeFile(new URL('dist/index.html', root), html.replace('<!-- SITE_METADATA -->', metadata));
await writeFile(new URL('dist/robots.txt', root), indexable ? `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n');
await writeFile(new URL('dist/sitemap.xml', root), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${indexable ? `\n  <url><loc>${escapeXml(site)}/</loc></url>\n` : ''}</urlset>\n`);
console.log(`Built ${fileURLToPath(new URL('dist/', root))}\nSite: ${site || 'local only (set SITE_URL for production)'}\nIndexable: ${indexable}`);
