import { cp, rm, readFile, access, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
for (const file of ['index.html','styles.css','app.js','model.js','robots.txt','sitemap.xml','llms.txt','assets/social.jpg']) await access(`${root}/site/${file}`);
JSON.parse(await readFile(`${root}/vercel.json`,'utf8'));
await rm(`${root}/dist`,{recursive:true,force:true});
await cp(`${root}/site`,`${root}/dist`,{recursive:true});
// Keep Vercel previews out of search while allowing the production domain to be crawled.
if (['preview', 'development'].includes(process.env.VERCEL_ENV)) {
  const html = await readFile(`${root}/dist/index.html`, 'utf8');
  await writeFile(`${root}/dist/index.html`, html.replace(/<meta name="robots" content="[^"]*">/, '<meta name="robots" content="noindex,nofollow">'));
  await writeFile(`${root}/dist/robots.txt`, 'User-agent: *\nDisallow: /\n');
  await writeFile(`${root}/dist/sitemap.xml`, '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>\n');
}
console.log(`Built dist/: ${process.env.VERCEL_ENV || 'local production check'}.`);
