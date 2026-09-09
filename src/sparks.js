import * as T from 'three';
import {fenderContact} from './physics.js';
// Small non-glowing plastic flecks; there is no metal skid or spark effect.
export function createSparks(scene){
 const count=180,positions=new Float32Array(count*6),colors=new Float32Array(count*6),life=new Float32Array(count),duration=new Float32Array(count),velocities=new Float32Array(count*3),heads=new Float32Array(count*3);
 const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.BufferAttribute(positions,3).setUsage(T.DynamicDrawUsage));geometry.setAttribute('color',new T.BufferAttribute(colors,3).setUsage(T.DynamicDrawUsage));
 const material=new T.LineBasicMaterial({vertexColors:true,transparent:true,opacity:.55,depthWrite:false,toneMapped:false});
 const mesh=new T.LineSegments(geometry,material);mesh.frustumCulled=false;mesh.name='plastic-flecks';scene.add(mesh);
 let cursor=0,budget=0;const contact={};
 return {mesh,capacity:count,clear(){life.fill(0);colors.fill(0);budget=0;mesh.visible=false;},update(b,dt,active=true){
  mesh.visible=active;if(!active)return;
  const step=Math.min(dt,.1);
  if(b.scraping&&!b.crashed&&b.speed>.8){
   fenderContact(b,contact);budget+=Math.min(dt,.08)*(10+Math.min(b.speed,25))*b.scrapeStrength;
   const sin=Math.sin(b.heading),cos=Math.cos(b.heading);
   while(budget>=1){budget--;const i=cursor++%count,k=i*3;life[i]=duration[i]=.18+Math.random()*.34;
    heads[k]=contact.x;heads[k+1]=.025;heads[k+2]=contact.z;
    const backward=2+Math.random()*5,side=(Math.random()-.5)*4;
    velocities[k]=-sin*backward+cos*side;velocities[k+1]=.5+Math.random()*2;velocities[k+2]=-cos*backward-sin*side;
   }
  }else budget=0;
  for(let i=0;i<count;i++){
   const k=i*3,v=i*6;life[i]=Math.max(0,life[i]-step);
   if(life[i]===0){colors.fill(0,v,v+6);continue;}
   heads[k]+=velocities[k]*step;heads[k+1]+=velocities[k+1]*step;heads[k+2]+=velocities[k+2]*step;velocities[k+1]-=9*step;
   if(heads[k+1]<.018){heads[k+1]=.018;velocities[k+1]=Math.abs(velocities[k+1])*.3;}
   positions[v]=heads[k];positions[v+1]=heads[k+1];positions[v+2]=heads[k+2];
   positions[v+3]=heads[k]-velocities[k]*.025;positions[v+4]=Math.max(.018,heads[k+1]-velocities[k+1]*.025);positions[v+5]=heads[k+2]-velocities[k+2]*.025;
   const fade=life[i]/duration[i];for(const offset of [0,3]){colors[v+offset]=fade*.55;colors[v+offset+1]=fade*.56;colors[v+offset+2]=fade*.52;}
  }
  geometry.attributes.position.needsUpdate=true;geometry.attributes.color.needsUpdate=true;
 }};
}
