const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const canvas = document.getElementById('lines');
const ctx = canvas.getContext('2d');
const motion = document.getElementById('motion');
let paused = reduced.matches, frame, width, height, time = 0;
function size(){ width=innerWidth; height=innerHeight; const d=Math.min(devicePixelRatio||1,2); canvas.width=width*d;canvas.height=height*d;canvas.style.width=width+'px';canvas.style.height=height+'px';ctx.setTransform(d,0,0,d,0,0);draw(); }
function draw(){ctx.clearRect(0,0,width,height);for(let j=0;j<16;j++){ctx.beginPath();for(let x=0;x<=width+15;x+=15){const y=height*.32+j*34+Math.sin(x/340+time+j*.12)*75+Math.cos(x/600+time*.7)*45; if(x===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}ctx.strokeStyle=`rgba(175,122,240,${.035+(j%3)*.012})`;ctx.lineWidth=.7;ctx.stroke();}}
function animate(){time+=.0018;draw();frame=requestAnimationFrame(animate);}
function state(){motion.textContent=paused?'Play motion':'Pause motion';motion.setAttribute('aria-pressed',String(paused));document.body.classList.toggle('paused',paused);cancelAnimationFrame(frame);if(!paused)animate();else draw();}
motion.addEventListener('click',()=>{paused=!paused;state();});
reduced.addEventListener('change',()=>{paused=reduced.matches;state();});
document.addEventListener('visibilitychange',()=>{cancelAnimationFrame(frame);if(!document.hidden&&!paused)animate();});
addEventListener('resize',size);size();state();
document.getElementById('year').textContent=new Date().getFullYear();
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',String(b===button));});document.querySelectorAll('[data-category]').forEach(card=>card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter);}));
const details={python:['Learning by building','I’m exploring Python through practical exercises and small projects. This section will grow into a place to share useful things I build and lessons I pick up along the way.'],games:['Worlds worth exploring','I enjoy developing Minecraft mod ideas, imagining new abilities, and thinking about how a game world can feel more alive. This is where those concepts and future projects will live.'],design:['From idea to something real','From digital designs to engraving, I like seeing an idea become something tangible. This collection will feature images and creative work as I add them.']};
const dialog=document.getElementById('detail');
document.querySelectorAll('[data-detail]').forEach(card=>card.addEventListener('click',()=>{const [title,text]=details[card.dataset.detail];document.getElementById('detail-title').textContent=title;document.getElementById('detail-text').textContent=text;dialog.showModal();}));
document.getElementById('close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
