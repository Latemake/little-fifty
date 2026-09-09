export function createTouchControls({active,camera,reset}){
 const root=document.createElement('div');root.id='touch-controls';
 root.innerHTML=`<div class="touch-tools"><button id="touch-camera" aria-label="Vaihda kameraa">◉ <span>KAMERA</span></button><button id="touch-reset" aria-label="Aloita uudelleen">↻ <span>UUDELLEEN</span></button></div>
 <div id="touch-stick" role="group" aria-label="Ohjaus ja painonsiirto"><span class="stick-up">ETEEN</span><span class="stick-down">TAAKSE</span><span class="stick-left">‹</span><span class="stick-right">›</span><i></i></div>
 <div class="touch-pedals"><button id="touch-brake">JARRU</button><button id="touch-gas">KAASU <span>↑</span></button></div>`;
 document.getElementById('hud').append(root);
 const state={throttle:false,brake:false,left:0,right:0,back:false,forward:false};
 const stick=root.querySelector('#touch-stick'),knob=stick.querySelector('i'),pointers=new Map();let stickId=null;
 const query=matchMedia('(any-pointer: coarse)');
 const detect=()=>document.body.classList.toggle('touch-device',query.matches||navigator.maxTouchPoints>0);detect();query.addEventListener('change',detect);
 function clear(){pointers.clear();stickId=null;Object.assign(state,{throttle:false,brake:false,left:0,right:0,back:false,forward:false});knob.style.transform='translate(0px,0px)';root.querySelectorAll('.held').forEach(b=>b.classList.remove('held'));}
 function move(e){
  if(e.pointerId!==stickId)return;
  const r=stick.getBoundingClientRect(),radius=r.width*.32;
  let x=(e.clientX-r.left-r.width/2)/radius,y=(e.clientY-r.top-r.height/2)/radius;
  const length=Math.max(1,Math.hypot(x,y));x/=length;y/=length;
  state.left=x<-.15?(-x-.15)/.85:0;state.right=x>.15?(x-.15)/.85:0;
  state.forward=y<-.3;state.back=y>.3;
  knob.style.transform=`translate(${x*radius}px,${y*radius}px)`;
 }
 stick.addEventListener('pointerdown',e=>{if(!active()||stickId!==null)return;e.preventDefault();stickId=e.pointerId;stick.setPointerCapture(e.pointerId);move(e);});
 stick.addEventListener('pointermove',move);
 function releaseStick(e){if(e.pointerId!==stickId)return;stickId=null;state.left=state.right=0;state.forward=state.back=false;knob.style.transform='translate(0px,0px)';}
 for(const event of ['pointerup','pointercancel','lostpointercapture'])stick.addEventListener(event,releaseStick);
 for(const [id,key] of [['touch-gas','throttle'],['touch-brake','brake']]){
  const button=root.querySelector('#'+id);
  button.addEventListener('pointerdown',e=>{if(!active())return;e.preventDefault();button.setPointerCapture(e.pointerId);pointers.set(e.pointerId,key);state[key]=true;button.classList.add('held');});
  for(const event of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(event,e=>{pointers.delete(e.pointerId);state[key]=[...pointers.values()].includes(key);button.classList.toggle('held',state[key]);});
 }
 root.addEventListener('contextmenu',e=>e.preventDefault());
 root.querySelector('#touch-camera').onclick=()=>{if(active())camera();};
 root.querySelector('#touch-reset').onclick=()=>{if(active())reset();};
 addEventListener('blur',clear);addEventListener('resize',clear);document.addEventListener('visibilitychange',clear);
 return {state,clear};
}
