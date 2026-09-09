import {createTouchControls} from './touch.js';
import {createAudio} from './audio.js';
import * as T from 'three';
import './style.css';
import './touch.css';
import {createBike,advanceBike,balancePoint,interpolateBike,STEP} from './physics.js';
import {createSparks} from './sparks.js';
import {createModel} from './bike.js';
import {createWorld} from './world.js';
import {loadSettings,setupMenu} from './ui.js';
import {getBike,loadBikeId} from './catalog.js';
let selectedId=loadBikeId();
const settings=loadSettings();
const sound=createAudio();
const scene=new T.Scene();scene.fog=new T.Fog(0xd2d4b7,110,250);
scene.add(new T.HemisphereLight(0xc9e5ed,0x6c7040,2));
const sun=new T.DirectionalLight(0xffdfaa,3.1);sun.position.set(-18,28,-12);sun.castShadow=true;
Object.assign(sun.shadow.camera,{left:-24,right:24,top:28,bottom:-24,near:1,far:85});sun.shadow.bias=-.00025;sun.shadow.normalBias=.025;scene.add(sun,sun.target);
const renderer=new T.WebGLRenderer({antialias:true,powerPreference:'high-performance'});renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.12;document.body.prepend(renderer.domElement);
const camera=new T.PerspectiveCamera(settings.fov,1,.1,1200);
let model=createModel(selectedId);scene.add(model.root);const world=createWorld(scene,Math.min(8,renderer.capabilities.getMaxAnisotropy()));
const sparks=createSparks(scene);
const shadow=new T.Mesh(new T.CircleGeometry(.8,24),new T.MeshBasicMaterial({color:0x293b26,transparent:true,opacity:.14,depthWrite:false}));shadow.rotation.x=-Math.PI/2;shadow.scale.set(.6,1.7,1);scene.add(shadow);
const keys=new Set();let bike=createBike(selectedId),remainder=0,last=null,mode='menu',started=false,menuTime=0;
const previous={...bike},rendered={...bike};let hudTime=0;
let firstPerson=false;
const touch=createTouchControls({active:()=>mode==='ride',camera:()=>{firstPerson=!firstPerson;},reset:()=>reset()});
const cameraLabel=document.getElementById('camera-mode');
let preview=createBike(selectedId);
function showBike(id){
  if(model.spec.id!==id){scene.remove(model.root);model.dispose();model=createModel(id);scene.add(model.root);}
  preview=createBike(id);const spec=getBike(id);
  document.getElementById('preview-name').textContent=spec.name;document.getElementById('preview-type').textContent=spec.version;
  document.getElementById('ride-bike').textContent=getBike(selectedId).name;
}
const el=Object.fromEntries(['speed','angle','balance-fill','balance-marker','point','state','hint','crash','menu','hud','ride-controls'].map(id=>[id,document.getElementById(id)]));
const look=new T.Vector3(),desired=new T.Vector3();
const cameraOffset=new T.Vector3(.9,2.1,-settings.distance);
const lightOffset=new T.Vector3(-18,28,-17),lightRight=new T.Vector3().crossVectors(new T.Vector3(0,1,0),lightOffset).normalize(),lightUp=new T.Vector3().crossVectors(lightOffset,lightRight).normalize(),shadowCenter=new T.Vector3();
function applySettings(){
  sound.setVolume(settings.volume);
  const high=settings.quality==='high';renderer.setPixelRatio(Math.min(devicePixelRatio,high?1.5:1));renderer.shadowMap.enabled=high;
  const size=high?1024:512;
  if(sun.shadow.mapSize.x!==size){sun.shadow.mapSize.set(size,size);sun.shadow.map?.dispose();sun.shadow.map=null;}
  scene.traverse(o=>{if(o.material){for(const m of [].concat(o.material))m.needsUpdate=true;}});
  el['ride-controls'].hidden=!settings.controls;
}
function reset(){sound.quiet();bike=createBike(selectedId);Object.assign(previous,bike);sparks.clear();keys.clear();touch.clear();remainder=0;last=null;hudTime=0;cameraOffset.set(.9,2.1,-settings.distance);camera.position.copy(cameraOffset);look.set(0,1.05,1);el.crash.hidden=true;}
function openMenu(){sound.quiet();mode='menu';keys.clear();touch.clear();remainder=0;last=null;el.menu.hidden=false;el.hud.hidden=true;document.body.classList.add('in-menu');ui.show('home');document.getElementById('play').innerHTML=started?'JATKA AJOA <span>↗</span>':'LÄHDE AJAMAAN <span>↗</span>';}
function play(){sound.start();showBike(selectedId);if(!started){reset();started=true;}mode='ride';Object.assign(previous,bike);keys.clear();touch.clear();last=null;remainder=0;hudTime=0;el.menu.hidden=true;el.hud.hidden=false;document.body.classList.remove('in-menu');const h=bike.heading;cameraOffset.set(-Math.sin(h)*settings.distance+Math.cos(h)*.9,2.1,-Math.cos(h)*settings.distance-Math.sin(h)*.9);camera.position.set(bike.x,0,bike.z).add(cameraOffset);look.set(bike.x,1.1,bike.z+.5);}
const ui=setupMenu(settings,{play,change:applySettings,preview:showBike,equip(id){selectedId=id;showBike(id);reset();}});showBike(selectedId);document.getElementById('menu-button').onclick=openMenu;document.getElementById('reset').onclick=reset;
const codes=['ArrowDown','ArrowUp','Space','ShiftLeft','ShiftRight','KeyW','KeyS','KeyA','KeyD','KeyR','KeyC'];
addEventListener('keydown',e=>{
  if(e.code==='Escape'&&!e.repeat){if(mode==='ride')openMenu();else if(started)play();return;}
  if(mode!=='ride')return;if(codes.includes(e.code))e.preventDefault();keys.add(e.code);if(e.code==='KeyR'&&!e.repeat)reset();
  if(e.code==='KeyC'&&!e.repeat)firstPerson=!firstPerson;
});
addEventListener('keyup',e=>keys.delete(e.code));
addEventListener('blur',()=>{keys.clear();touch.clear();if(mode==='ride')openMenu();});
document.addEventListener('visibilitychange',()=>{keys.clear();touch.clear();last=null;remainder=0;if(document.hidden&&mode==='ride')openMenu();});
function resize(){camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);}addEventListener('resize',resize);applySettings();resize();reset();
renderer.setAnimationLoop(time=>{
  const dt=last===null?0:Math.min((time-last)/1000,.25);last=time;
  let shown=bike;
  if(mode==='ride'){
    const input={throttle:touch.state.throttle||keys.has('KeyW'),brake:touch.state.brake||keys.has('KeyS'),left:keys.has('KeyA')?1:touch.state.left,right:keys.has('KeyD')?1:touch.state.right,back:touch.state.back||keys.has('ArrowDown')||keys.has('Space'),forward:touch.state.forward||keys.has('ArrowUp')||keys.has('ShiftLeft')||keys.has('ShiftRight'),steeringSensitivity:settings.steering};
    remainder=advanceBike(bike,input,dt,remainder,previous);
    shown=interpolateBike(previous,bike,remainder/STEP,rendered);
    const pace=T.MathUtils.smoothstep(shown.speed,0,22);
    const h=shown.heading,d=settings.distance-.45*pace+(shown.crashed?1:0);
    // Smooth only the follow offset. Bike and camera share the exact interpolated
    // translation, eliminating differential lag/jitter at high speed.
    desired.set(-Math.sin(h)*d+Math.cos(h)*.9,2.1-.25*pace+Math.min(shown.pitch,1.2)*.55,-Math.cos(h)*d-Math.sin(h)*.9);
    cameraOffset.lerp(desired,1-Math.exp(-9*dt));camera.position.set(shown.x,0,shown.z).add(cameraOffset);
    look.set(shown.x+Math.sin(h)*(shown.crashed?-.3:1.2),shown.crashed?.7:1.05,shown.z+Math.cos(h)*(shown.crashed?-.3:1.2));
    const rideFov=(firstPerson&&!shown.crashed?Math.max(70,settings.fov):settings.fov)+10*pace;
    camera.fov+=(rideFov-camera.fov)*(1-Math.exp(-4*dt));
    hudTime-=dt;
    if(hudTime<=0){hudTime=.1;
    const angle=bike.pitch*180/Math.PI,point=balancePoint(bike.lean)*180/Math.PI;
    el.speed.textContent=Math.round(bike.speed*3.6);el.angle.textContent=Math.round(angle)+'°';el.point.textContent=Math.round(point)+'°';
    el['balance-fill'].style.width=Math.min(100,angle)+'%';el['balance-marker'].style.left=point+'%';
    el.state.textContent=bike.crashed?'YLIKEULIMINEN':bike.fenderBroken?'TAKAKATE POIKKI':bike.scraping?'MUOVIKATE TAIPUU':Math.abs(angle-point)<4?'TASAPAINOSSA':angle>10?'YHDELLÄ PYÖRÄLLÄ':bike.speed>1?'VAPAA AJO':'VALMIS AJOON';
    el.hint.textContent=bike.crashed?'R — takaisin satulaan.':bike.fenderBroken?'Takakate irtosi. R korjaa pyörän.':bike.scraping?'Kate ei kannattele! Jarruta: S.':angle>point?'↑ Paino eteen / S takajarru.':angle>point-12?'Kevennä kaasua. Tasapainota ↓ / ↑.':angle>10?'Annostele kaasua ja siirrä painoa.':'W + ↓ nostaa. ↑ pitää keulan alhaalla.';
    el.crash.hidden=!bike.crashed||bike.crashTime<1.25;
    }
  }else{
    shown=preview;menuTime+=dt;
    const orbit=Math.sin(menuTime*.12)*.12;
    camera.position.set(4.0+orbit,2.0,4.3-orbit);look.set(-1.35,.8,1.1);camera.fov=43;
  }
  model.update(shown,dt);world.update(shown.z,shown.x);
  const cockpit=mode==='ride'&&firstPerson&&!shown.crashed;
  model.head.visible=!cockpit;
  camera.near=cockpit?.035:.1;
  if(cockpit){
    model.eyes.getWorldPosition(camera.position);
    // Eye position follows the animated rider; keep the horizon readable while balancing.
    camera.position.y=Math.max(.45,camera.position.y);
    look.set(camera.position.x+Math.sin(shown.heading)*12,camera.position.y-6+Math.min(shown.pitch,1.5)*3,camera.position.z+Math.cos(shown.heading)*12);
  }
  const cameraText=cockpit?'1. persoona':'3. persoona';
  if(cameraLabel.textContent!==cameraText)cameraLabel.textContent=cameraText;
  sound.update(bike,getBike(selectedId),mode==='ride');
  sparks.update(shown,dt,mode==='ride');
  shadow.position.set(shown.x,.018,shown.z+.5);shadow.rotation.z=-shown.heading;
  // Snap the shadow camera in light space to prevent shadows crawling over asphalt.
  shadowCenter.set(shown.x,0,shown.z+5);
  for(const [axis,span] of [[lightRight,48],[lightUp,52]]){const step=span/sun.shadow.mapSize.x,projection=shadowCenter.dot(axis);shadowCenter.addScaledVector(axis,Math.round(projection/step)*step-projection);}
  sun.target.position.copy(shadowCenter);sun.position.copy(shadowCenter).add(lightOffset);
  camera.updateProjectionMatrix();camera.lookAt(look);renderer.render(scene,camera);
});


