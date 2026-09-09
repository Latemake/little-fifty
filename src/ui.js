import {BIKES,getBike,loadBikeId} from './catalog.js';
const defaults={quality:'high',fov:62,distance:5,steering:1,controls:true,volume:.55};
export function loadSettings(){let saved={};try{saved=JSON.parse(localStorage.getItem('little-fifty-settings'))||{};}catch{}const values={...defaults};if(matchMedia("(pointer: coarse)").matches)values.quality="low";for(const [key,min,max] of [['fov',50,80],['distance',4,7],['steering',.6,1.5],['volume',0,1]])if(Number.isFinite(saved[key]))values[key]=Math.max(min,Math.min(max,saved[key]));if(['high','low'].includes(saved.quality))values.quality=saved.quality;if(typeof saved.controls==='boolean')values.controls=saved.controls;return values;}
export function setupMenu(settings,{play,change,preview,equip}){
 let selected=loadBikeId(),viewed=selected,detailOpen=false;
 const grid=document.getElementById('bike-grid'),details=document.getElementById('shop-details'),menu=document.getElementById('menu'),back=document.getElementById('shop-back');
 for(const spec of Object.values(BIKES)){
  const button=document.createElement('button');button.className='bike-tile';button.dataset.bike=spec.id;button.setAttribute('aria-label',spec.name+' — avaa tiedot');button.setAttribute('aria-controls','shop-details');button.setAttribute('aria-expanded','false');
  const photo=document.createElement('img');photo.src=import.meta.env.BASE_URL+'bikes/'+spec.id+'.png';photo.alt=spec.name+((spec.id==='rieju'||spec.scooter)?' — pelimalli':' — tuotekuva');photo.width=800;photo.height=500;photo.decoding='async';
  const visual=document.createElement('span');visual.className='bike-tile-photo';visual.append(photo);
  const info=document.createElement('span');info.className='bike-tile-info';
  const type=document.createElement('span');type.className='eyebrow';type.textContent=spec.type;
  const name=document.createElement('strong');name.textContent=spec.name;
  const action=document.createElement('span');action.className='bike-tile-action';action.textContent='TUTUSTU PYÖRÄÄN ↗';info.append(type,name,action);button.append(visual,info);
  button.onclick=()=>{viewed=spec.id;detailOpen=true;grid.hidden=true;details.hidden=false;document.getElementById('shop-intro').hidden=true;menu.classList.remove('shop-catalog');back.textContent='← KAIKKI PYÖRÄT';button.setAttribute('aria-expanded','true');renderBike();preview(viewed);document.getElementById('shop-panel').scrollTop=0;document.getElementById('shop-name').focus({preventScroll:true});};grid.append(button);
 }
 function showCatalog(){detailOpen=false;grid.hidden=false;details.hidden=true;document.getElementById('shop-intro').hidden=false;menu.classList.add('shop-catalog');back.textContent='← PÄÄVALIKKO';grid.querySelectorAll('button').forEach(b=>b.setAttribute('aria-expanded','false'));preview(selected);}
 function renderBike(){
  const spec=getBike(viewed);
  document.getElementById('shop-name').textContent=spec.name;document.getElementById('shop-version').textContent=spec.version;document.getElementById('shop-description').textContent=spec.description;
  document.getElementById('shop-speed').textContent=spec.topSpeed;document.getElementById('shop-torque').textContent=spec.torqueLabel;document.getElementById('shop-engine').textContent=spec.electric?spec.powerKW+' kW':'50cc';
  const button=document.getElementById('equip');button.disabled=viewed===selected;button.textContent=viewed===selected?'KÄYTÖSSÄ ✓':'OTA KÄYTTÖÖN ↗';
 }
 document.getElementById('equip').onclick=()=>{selected=viewed;try{localStorage.setItem('little-fifty-bike',selected);}catch{}equip(selected);renderBike();};
 const show=panel=>{for(const name of ['home','settings','shop'])document.getElementById(name+'-panel').hidden=name!==panel;menu.classList.remove('shop-catalog');if(panel==='shop')showCatalog();else preview(selected);};
 back.onclick=()=>{if(detailOpen){showCatalog();grid.querySelector('[data-bike="'+viewed+'"]').focus({preventScroll:true});}else show('home');};
 document.querySelectorAll('[data-panel]').forEach(button=>button.onclick=()=>show(button.dataset.panel));document.getElementById('home').onclick=e=>{e.preventDefault();show('home');};document.getElementById('play').onclick=play;
 for(const key of Object.keys(defaults)){const input=document.getElementById(key);if(key==='controls')input.checked=settings[key];else input.value=settings[key];const refresh=()=>{const output=document.getElementById(key+'-value');if(output)output.value=key==='volume'?Math.round(settings[key]*100)+'%':settings[key]+(key==='fov'?'°':key==='distance'?' m':'×');};refresh();input.addEventListener('input',()=>{settings[key]=key==='controls'?input.checked:key==='quality'?input.value:Number(input.value);refresh();try{localStorage.setItem('little-fifty-settings',JSON.stringify(settings));}catch{}change();});}
 document.getElementById('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{}};
 renderBike();return {show};
}
