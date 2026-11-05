
document.body.classList.add('loading');addEventListener('load',()=>setTimeout(()=>{document.querySelector('.loader')?.classList.add('done');document.body.classList.remove('loading')},850));
const bar=document.querySelector('.progress'),head=document.querySelector('.header');function scrollFx(){let max=document.documentElement.scrollHeight-innerHeight;if(bar)bar.style.width=(max?scrollY/max*100:0)+'%';head?.classList.toggle('compact',scrollY>50)}addEventListener('scroll',scrollFx,{passive:true});scrollFx();
document.querySelector('.menu')?.addEventListener('click',()=>document.querySelector('.nav')?.classList.toggle('open'));document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.nav')?.classList.remove('open')));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal,.left,.right').forEach(x=>io.observe(x));
let slides=[...document.querySelectorAll('.slide')],idx=0,slideTimer,paused=false,dots=document.querySelector('.dots');function show(n){if(!slides.length)return;idx=(n+slides.length)%slides.length;slides.forEach((s,i)=>s.classList.toggle('active',i===idx));if(dots)[...dots.children].forEach((d,i)=>d.classList.toggle('active',i===idx));let c=document.querySelector('.count');if(c)c.textContent=`0${idx+1} / 0${slides.length}`}if(slides.length){slides.forEach((s,i)=>{let b=document.createElement('button');b.setAttribute('aria-label','Show slide '+(i+1));b.onclick=()=>{show(i);restart()};dots?.append(b)});show(0);function restart(){clearInterval(slideTimer);slideTimer=setInterval(()=>{if(!paused)show(idx+1)},6200)}restart();document.querySelector('.next')?.addEventListener('click',()=>{show(idx+1);restart()});document.querySelector('.prev')?.addEventListener('click',()=>{show(idx-1);restart()});document.querySelector('.hero')?.addEventListener('mouseenter',()=>paused=true);document.querySelector('.hero')?.addEventListener('mouseleave',()=>paused=false)}
document.querySelectorAll('.product').forEach(c=>{c.addEventListener('mousemove',e=>{let r=c.getBoundingClientRect();c.style.setProperty('--rx',`${-((e.clientY-r.top)/r.height-.5)*4}deg`);c.style.setProperty('--ry',`${((e.clientX-r.left)/r.width-.5)*4}deg`)});c.addEventListener('mouseleave',()=>{c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')})});
document.querySelectorAll('.heart').forEach(b=>b.onclick=()=>{b.classList.toggle('active');b.textContent=b.classList.contains('active')?'♥':'♡'});document.querySelectorAll('.add').forEach(b=>b.onclick=()=>{b.textContent='ADDED TO BAG ✓';b.classList.add('added');setTimeout(()=>{b.textContent='ADD TO BAG';b.classList.remove('added')},1500)});
document.querySelectorAll('form[data-demo]').forEach(f=>f.onsubmit=e=>{e.preventDefault();f.querySelector('button').textContent='THANK YOU ✓'});document.querySelectorAll('video[data-lazy]').forEach(v=>{let vi=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)v.play().catch(()=>{});else v.pause()}),{threshold:.15});vi.observe(v)});document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());

// Enhanced campaign motion: staggered reveals, subtle parallax, pointer sheen and product filtering.
document.querySelectorAll('.products').forEach(grid=>[...grid.children].forEach((el,i)=>el.style.setProperty('--delay',`${(i%4)*90}ms`)));
const parallaxItems=document.querySelectorAll('.category img,.editorial-photo img,.model-photo img');
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
  addEventListener('scroll',()=>{const vh=innerHeight;parallaxItems.forEach(img=>{const r=img.getBoundingClientRect();if(r.bottom>0&&r.top<vh){const shift=(r.top-vh/2)*-.025;img.style.translate=`0 ${shift}px`}})},{passive:true});
}
document.querySelectorAll('.filter-chip').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter-chip').forEach(x=>x.classList.remove('active'));btn.classList.add('active');const filter=btn.dataset.filter;document.querySelectorAll('[data-category]').forEach(card=>card.hidden=filter!=='all'&&card.dataset.category!==filter)}));

document.querySelectorAll('.products').forEach(grid=>[...grid.children].forEach((el,i)=>el.style.setProperty('--delay',`${(i%4)*85}ms`)));


// Accessible playback controls for campaign films. Videos remain muted by default.
document.querySelectorAll('video').forEach((video)=>{
  const holder=video.parentElement;
  if(!holder || holder.querySelector('.video-control')) return;
  holder.style.position='relative';
  const control=document.createElement('button');
  control.className='video-control'; control.type='button'; control.setAttribute('aria-label','Pause campaign video'); control.textContent='Ⅱ';
  control.addEventListener('click',()=>{
    if(video.paused){video.play().catch(()=>{});control.textContent='Ⅱ';control.setAttribute('aria-label','Pause campaign video');}
    else{video.pause();control.textContent='▶';control.setAttribute('aria-label','Play campaign video');}
  });
  holder.appendChild(control);
});


// Collection discovery: category filtering and featured/name/price sorting.
const catalogSections=[...document.querySelectorAll('main > section[id]')].filter(s=>['rings','necklaces','earrings','bracelets'].includes(s.id));
document.querySelectorAll('[data-catalog]').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('[data-catalog]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
  catalogSections.forEach(section=>section.hidden=btn.dataset.catalog!=='all'&&section.id!==btn.dataset.catalog);
}));
const sortSelect=document.querySelector('#catalog-sort');
sortSelect?.addEventListener('change',()=>document.querySelectorAll('.products').forEach(grid=>{
  const cards=[...grid.querySelectorAll('.product')];
  const mode=sortSelect.value;
  cards.sort((a,b)=>{
    if(mode==='name')return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent);
    const price=el=>Number((el.querySelector('.prod-info strong')?.textContent||'').replace(/[^0-9]/g,''));
    if(mode==='price-low')return price(a)-price(b);if(mode==='price-high')return price(b)-price(a);return 0;
  }).forEach(card=>grid.appendChild(card));
}));
