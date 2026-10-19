const $=(s,r=document)=>[...r.querySelectorAll(s)];
// split headings into animated words
$('[data-split]').forEach(el=>{el.innerHTML=el.textContent.split(' ').map((w,i)=>`<span class="wrap"><span class="word" style="--d:${i*.08}s">${w}</span></span>`).join(' ')});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
$('[data-r],[data-split]').forEach(e=>io.observe(e));
// scroll progress + parallax glow
const prog=document.getElementById('prog'),glow=$('.glow')[0];
addEventListener('scroll',()=>{const h=document.documentElement;prog.style.width=scrollY/(h.scrollHeight-innerHeight)*100+'%';glow.style.transform=`translateY(${scrollY*.25}px) scale(${1+scrollY/4000})`},{passive:true});
// card spotlight
$('.card').forEach(c=>c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--x',e.clientX-r.left+'px');c.style.setProperty('--y',e.clientY-r.top+'px')}));
// live counters
const fmt=n=>Math.round(n).toLocaleString();
function count(el,to,suf=''){const t0=performance.now();(function f(t){const p=Math.min((t-t0)/1800,1);el.textContent=fmt(to*(1-Math.pow(1-p,4)))+suf;if(p<1)requestAnimationFrame(f)})(t0)}
const seen=new Set();
async function stats(){try{const s=await(await fetch('/api/stats')).json();$('[data-stat]').forEach(el=>{const k=el.dataset.stat,v=s[k]||0;if(!seen.has(k)){seen.add(k);const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){count(el,v,el.dataset.suf||'');o.disconnect()}});o.observe(el)}else el.textContent=fmt(v)+(el.dataset.suf||'')})}catch(e){}}
stats();setInterval(stats,60000);
// terminal typing
const t=document.getElementById('typ');if(t){const L=['~/aurora $ /automod setup','Loading module: automod.ts...','<span class=ok>[SUCCESS] Process completed in 0.4ms.</span>'];let i=0,j=0,out='';(function type(){if(i>=L.length){setTimeout(()=>{i=j=0;out='';type()},4000);return}const raw=L[i].startsWith('<')?L[i]:L[i];if(L[i].startsWith('<')||j>=L[i].length){out+=L[i]+'\n';i++;j=0;t.innerHTML=out;setTimeout(type,500)}else{t.innerHTML=out+L[i].slice(0,++j)+'▌';setTimeout(type,35)}})()}
