import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
const root=new URL('../',import.meta.url);
const html=await readFile(new URL('site/index.html',root),'utf8');
test('production metadata is indexable and agrees with the canonical domain',async()=>{
 assert.match(html,/<meta name="robots" content="index,follow,max-image-preview:large">/);
 assert.doesNotMatch(html,/noindex/);
 assert.match(html,/<link rel="canonical" href="https:\/\/golfingnaples.com\/">/);
 assert.equal((html.match(/<h1\b/g)||[]).length,1);
 const robots=await readFile(new URL('site/robots.txt',root),'utf8');
 assert.match(robots,/User-agent: \*\s+Allow: \//);assert.doesNotMatch(robots,/Disallow:\s*\//);
 const sitemap=await readFile(new URL('site/sitemap.xml',root),'utf8');assert.match(sitemap,/<loc>https:\/\/golfingnaples.com\/<\/loc>/);
});
test('organization schema parses and is authorized by the content security policy',async()=>{
 const payload=html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1];
 const schema=JSON.parse(payload);assert.ok(schema['@graph'].some(e=>e['@type']==='Organization'&&e.name==='Golfing Naples'));
 const config=JSON.parse(await readFile(new URL('vercel.json',root),'utf8'));
 const csp=config.headers[0].headers.find(h=>h.key==='Content-Security-Policy').value;
 const hash=createHash('sha256').update(payload).digest('base64');assert.ok(csp.includes(`'sha256-${hash}'`));
});
test('preview builds remain noindexed and production builds restore crawlability',async()=>{
 const cwd=root;
 execFileSync(process.execPath,['scripts/build.mjs'],{cwd,env:{...process.env,VERCEL_ENV:'preview'}});
 assert.match(await readFile(new URL('dist/index.html',root),'utf8'),/<meta name="robots" content="noindex,nofollow">/);
 assert.match(await readFile(new URL('dist/robots.txt',root),'utf8'),/Disallow: \//);
 execFileSync(process.execPath,['scripts/build.mjs'],{cwd,env:{...process.env,VERCEL_ENV:'production'}});
 assert.doesNotMatch(await readFile(new URL('dist/index.html',root),'utf8'),/noindex/);
 assert.match(await readFile(new URL('dist/robots.txt',root),'utf8'),/Allow: \//);
});
