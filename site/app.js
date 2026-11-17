import { matchesCourse, readSaved } from './model.js';
const $ = selector => document.querySelector(selector);
const cards = [...document.querySelectorAll('.course-card')];
const courses = cards.map(card => ({id:card.dataset.id, name:card.querySelector('h3').textContent,area:card.dataset.area,setting:card.dataset.setting,access:'Public',description:card.querySelector('.course-copy > p:not(.eyebrow)').textContent}));
let storage; try {storage=window.localStorage;} catch {storage=null;}
let saved=readSaved(storage,courses.map(c=>c.id)), savedOnly=false, toastTimer;
const announce = text => { $('#toast').textContent=text;$('#toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').hidden=true,3500); };
function render(){
  let count=0;
  const filters={query:$('#query').value,area:$('#area').value,setting:$('#setting').value,savedOnly,saved};
  courses.forEach((course,index)=>{const match=matchesCourse(course,filters);cards[index].hidden=!match;if(match)count++;});
  $('#result-count').textContent=`${count} ${savedOnly?'saved ':''}course option${count===1?'':'s'}`;
  $('#empty').hidden=count>0;$('#saved-count').textContent=saved.length;$('#saved-toggle').setAttribute('aria-pressed',String(savedOnly));
  document.querySelectorAll('[data-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===filters.setting)));
  document.querySelectorAll('[data-save]').forEach(button=>{const active=saved.includes(button.dataset.save);button.textContent=active?'♥':'♡';button.setAttribute('aria-pressed',String(active));button.setAttribute('aria-label',`${active?'Remove':'Save'} ${courses.find(c=>c.id===button.dataset.save).name}${active?' from shortlist':''}`);});
}
function persist(){try{if(!storage)throw Error();storage.setItem('golfing-naples-shortlist',JSON.stringify(saved));return true;}catch{return false;}}
$('#search-form').addEventListener('submit',event=>{event.preventDefault();render();});
['#query','#area','#setting'].forEach(selector=>$(selector).addEventListener(selector==='#query'?'input':'change',render));
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{$('#setting').value=button.dataset.filter;render();}));
document.querySelectorAll('[data-save]').forEach(button=>button.addEventListener('click',()=>{const id=button.dataset.save,removing=saved.includes(id);saved=removing?saved.filter(x=>x!==id):[...saved,id];const persisted=persist();render();announce(persisted?(removing?'Removed from your shortlist.':'Saved to your shortlist.'):'Shortlist updated for this visit. Browser storage is unavailable.');}));
$('#saved-toggle').addEventListener('click',()=>{savedOnly=!savedOnly;if(savedOnly){$('#query').value='';$('#area').value='';$('#setting').value='';}render();$('#courses').scrollIntoView({behavior:'smooth'});});
$('#reset').addEventListener('click',()=>{$('#search-form').reset();savedOnly=false;render();$('#query').focus();});
document.querySelectorAll('[data-area-pick]').forEach(button=>button.addEventListener('click',()=>{$('#search-form').reset();$('#area').value=button.dataset.areaPick;savedOnly=false;render();$('#courses').scrollIntoView({behavior:'smooth'});$('#area').focus({preventScroll:true});}));
$('#privacy-open').addEventListener('click',()=>$('#privacy').showModal());
$('.dialog-close').addEventListener('click',()=>$('#privacy').close());
$('#privacy').addEventListener('click',event=>{if(event.target===$('#privacy')){const r=$('#privacy').getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)$('#privacy').close();}});
$('#clear-saved').addEventListener('click',()=>{saved=[];const ok=persist();render();$('#privacy-status').textContent=ok?'Your shortlist has been cleared.':'Shortlist cleared for this visit. Browser storage is unavailable.';});
window.addEventListener('storage',event=>{if(event.key==='golfing-naples-shortlist'){saved=readSaved(storage,courses.map(c=>c.id));render();}});
render();
