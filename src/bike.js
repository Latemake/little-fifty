import * as T from 'three';
import {getBike,rearFender} from './catalog.js';
import {bikeRoll} from './physics.js';
import {modelTools} from './model-tools.js';
import {createRider} from './rider.js';
export function createModel(id='rieju'){
 const spec=getBike(id),h=modelTools(),{mesh,material,box,bar,sphere,label}=h;
 const root=new T.Group(),pitch=new T.Group(),chassis=new T.Group();root.add(pitch);pitch.add(chassis);
 const dark=0x20272a,silver=0x9fa9ad,white=0xeeeede,accent=spec.accent,seat=spec.seat-spec.radius,wb=spec.wheelbase;
 const steering=new T.Group();steering.name='front-steering';steering.position.set(0,.59,wb-.20);chassis.add(steering);
 function wheel(parent,z,y=0){
  const group=new T.Group();parent.add(group);group.position.set(0,y,z);
  const radius=spec.radius,thickness=spec.scooter?.032:id==='light'?.053:.069;
  const tire=mesh(group,new T.TorusGeometry(radius-thickness,thickness,10,28),material(0x171c1d));tire.rotation.y=Math.PI/2;
  const rim=mesh(group,new T.TorusGeometry(radius-(spec.scooter?.045:.09),.019,6,28),material(id==='rieju'?silver:dark,.65,.32));rim.rotation.y=Math.PI/2;
  const spokeGeometry=new T.CylinderGeometry(.005,.005,radius-.09,5),spokes=new T.InstancedMesh(spokeGeometry,material(silver,.7,.3),20),dummy=new T.Object3D();
  for(let i=0;i<20;i++){const angle=i*Math.PI/10;dummy.position.set(0,Math.cos(angle)*(radius-.09)*.5,Math.sin(angle)*(radius-.09)*.5);dummy.rotation.x=angle;dummy.updateMatrix();spokes.setMatrixAt(i,dummy.matrix);}group.add(spokes);
  // Register instanced geometry for cleanup when switching bikes.
  h.trackInstances(spokes);
  for(const x of [-.07,.07]){const r=spec.scooter?.073:.115;const disc=mesh(group,new T.CylinderGeometry(r,r,.012,24),material(silver,.75,.35),[x,0,0]);disc.rotation.z=Math.PI/2;}
  bar(group,[-.12,0,0],[.12,0,0],.038,accent,.3);
  if(spec.electric){const treadGeo=new T.BoxGeometry(.085,.018,.043),tread=new T.InstancedMesh(treadGeo,material(0x171c1d),32);for(let i=0;i<32;i++){const a=i*Math.PI/16;dummy.position.set(0,Math.cos(a)*radius,Math.sin(a)*radius);dummy.rotation.x=a;dummy.updateMatrix();tread.setMatrixAt(i,dummy.matrix);}group.add(tread);h.trackInstances(tread);}
  return group;
 }
 const rear=wheel(pitch,0),front=wheel(steering,.20,-.59);
 if(!spec.scooter){
 for(const side of [-1,1]){
  const x=side*(id==='ultra'?.155:.12);
  bar(chassis,[x,0,0],[x,.19,.60],id==='light'?.034:.045,spec.frame,.6);
  bar(chassis,[x,.19,.60],[x,seat+.02,wb-.25],id==='ultra'?.073:.045,spec.frame,.6);
  bar(chassis,[x,seat+.02,wb-.25],[x,seat,.31],.035,spec.frame,.5);
  bar(chassis,[x,seat,.31],[x,.19,.60],.032,spec.frame,.5);
  bar(steering,[side*.12,.1,-.025],[side*.12,-.59,.20],id==='light'?.024:.032,silver,.75);
  bar(steering,[side*.12,.09,-.025],[side*.12,-.24,.08],id==='light'?.033:.043,id==='rieju'?silver:0xb09d67,.6);
  box(steering,[.065,.21,.07],[side*.12,-.42,.15],spec.electric?dark:white,.02);
  bar(chassis,[side*.12,.07,.60],[side*.29,.07,.60],.021,silver,.7);
 }
 bar(chassis,[0,.12,.25],[0,seat-.03,.63],.044,silver,.65);
 // Coil spring follows the chassis and makes suspension compression readable.
 const coilPoints=[];for(let i=0;i<=70;i++){const t=i/70;coilPoints.push(new T.Vector3(Math.cos(t*Math.PI*14)*.06,.17+t*(seat-.23),.29+t*.29+Math.sin(t*Math.PI*14)*.04));}
 mesh(chassis,new T.TubeGeometry(new T.CatmullRomCurve3(coilPoints),70,.009,5,false),material(accent,.25,.4));
 box(chassis,[id==='light'?.22:.29,.075,id==='light'?.49:.75],[0,seat+.018,id==='light'?.35:.42],dark,.035);
 for(let i=0;i<6;i++)box(chassis,[id==='light'?.205:.28,.008,.018],[0,seat+.059,.20+i*.065],0x3f4644,.003);
 const fender=box(steering,[id==='light'?.16:.25,.035,spec.electric?.44:.56],[0,-.22,.29],id==='rieju'?accent:dark,.017);fender.rotation.x=-.05;
 }else{
  // Battery deck, twin swingarms and tall folding stem; no seat or motorcycle frame.
  box(chassis,[.22,.10,.58],[0,.06,.46],spec.frame,.015);
  box(chassis,[.21,.012,.55],[0,.117,.46],dark,.006);
  for(let i=0;i<9;i++)box(chassis,[.19,.005,.009],[0,.126,.23+i*.055],0x42494a,.002);
  for(const side of [-1,1]){
   bar(chassis,[side*.09,0,0],[side*.09,.075,.26],.025,spec.frame,.4);
   bar(chassis,[side*.094,.015,.04],[side*.094,.06,.21],.019,accent);
   label(chassis,'G2',[.30,.065],[side*.119,.06,.47],side*Math.PI/2,'#ff971e','#596064');
   bar(steering,[side*.082,-.59,.20],[side*.082,-.40,.03],.025,spec.frame,.5);
   box(steering,[.015,.055,.10],[side*.109,-.535,.145],accent,.004);
  }
  bar(chassis,[0,.09,.74],[0,.32,.88],.05,spec.frame,.4);
  bar(steering,[0,-.29,.14],[0,seat+.23-.59,-.01],.031,spec.frame,.5);
  box(steering,[.083,.17,.065],[0,-.20,.125],dark,.012);
  label(steering,'KUKIRIN G2',[.055,.39],[0,.13,.066],0,'#ff971e','#30383a');
  bar(steering,[.045,-.20,.14],[.045,seat+.14-.59,.04],.007,dark);
  box(steering,[.105,.025,.19],[0,-.435,.22],dark,.009);
  const heel=box(chassis,[.18,.027,.18],[0,.18,.14],dark,.009);heel.rotation.x=.28;
  box(chassis,[.11,.02,.018],[0,.21,.055],0xe84636,.004);
  for(const z of [.16,.83]){
   bar(chassis,[0,.06,z-.03],[0,.17,z+.04],.022,silver,.4);
   for(let j=0;j<5;j++){const coil=mesh(chassis,new T.TorusGeometry(.029,.006,5,10),material(dark),[0,.08+j*.017,z+j*.009]);coil.rotation.x=Math.PI/2;}
  }
  const hub=mesh(rear,new T.CylinderGeometry(.076,.076,.09,18),material(dark,.4));hub.rotation.z=Math.PI/2;
 }
 const tail=rearFender(id);
 const tailLength=tail.reach+tail.rootZ,tailRoot=new T.Group();tailRoot.name='rear-fender';tailRoot.position.set(0,tail.height,tail.rootZ);chassis.add(tailRoot);
 const tailGeometry=new T.BoxGeometry(tail.width,tail.thickness,tailLength,1,1,14);tailGeometry.translate(0,0,-tailLength/2);
 const plastic=mesh(tailRoot,tailGeometry,material(id==='rieju'?white:dark));plastic.userData.animated=true;
 const tailBase=tailGeometry.attributes.position.array.slice(),tailAttribute=tailGeometry.attributes.position;
 const scrapeTip=new T.Object3D();scrapeTip.name='scrape-contact';tailRoot.add(scrapeTip);
 let tailDetached=false,lastBend=-1;const tailStart=new T.Vector3(),tailRotation=new T.Quaternion(),tailSpin=new T.Quaternion(),tailBounds=new T.Box3();
 function panel(points,x,color){const shape=new T.Shape();points.forEach(([z,y],i)=>i?shape.lineTo(z,y):shape.moveTo(z,y));shape.closePath();const p=mesh(chassis,new T.ExtrudeGeometry(shape,{depth:.025,bevelEnabled:true,bevelSegments:1,steps:1,bevelSize:.008,bevelThickness:.006}),material(color));p.rotation.y=-Math.PI/2;p.position.x=x;return p;}
 if(id==='rieju'){
  box(chassis,[.30,.23,.31],[0,.18,.65],silver,.04);
  for(let i=0;i<5;i++)box(chassis,[.31,.017,.24],[0,.18+i*.035,.64],dark,.004);
  box(chassis,[.30,.14,.30],[0,seat-.075,.88],accent,.05);
  for(const side of [-1,1]){
   panel([[.29,seat-.20],[.93,seat-.17],[1.10,seat+.01],[.69,seat+.04]],side*.19,accent);
   panel([[.05,seat-.10],[.38,seat-.20],[.55,seat-.02],[.08,seat+.015]],side*.17,white);
   label(chassis,'RIEJU',[.35,.085],[side*.218,seat-.08,.76],side*Math.PI/2,'#f5f1e4','#c72e2d');
  }
  // Recognisable two-stroke expansion chamber and raised silencer.
  sphere(chassis,[.14,.115,.25],[.23,.11,.86],silver);
  bar(chassis,[.23,.13,1.0],[.23,.24,.54],.04,silver,.7);
  bar(chassis,[.23,.24,.54],[.24,seat-.09,.14],.035,silver,.7);
  bar(chassis,[.24,seat-.09,.24],[.24,seat-.055,-.12],.068,silver,.75);
  box(steering,[.27,.27,.065],[0,.01,.07],white,.04);
  label(steering,'MRT 50',[.22,.06],[0,-.06,.106]);
 }else if(!spec.scooter){
  const large=id==='ultra';
  const battery=box(chassis,[large?.36:.23,large?.40:.35,large?.45:.29],[0,seat-.21,large?.69:.65],dark,.04);battery.rotation.x=-.15;
  box(chassis,[large?.31:.21,.028,.25],[0,seat+.004,.76],dark,.014);
  const motor=mesh(chassis,new T.CylinderGeometry(large?.14:.105,large?.14:.105,large?.31:.23,20),material(dark,.5,.35),[0,.13,.61]);motor.rotation.z=Math.PI/2;
  for(const side of [-1,1]){
   label(chassis,large?'ULTRA BEE':'SUR-RON',[large?.36:.27,.065],[side*(large?.205:.15),seat-.18,.67],side*Math.PI/2,'#e6eedc','#23292b');
   if(large){panel([[.39,seat-.22],[.95,seat-.12],[1.06,seat+.01],[.65,seat+.015]],side*.22,white);panel([[.52,seat-.14],[.85,seat-.08],[.95,seat],[.69,seat]],side*.246,accent);}
   else bar(chassis,[side*.145,.19,.60],[side*.145,seat-.01,wb-.26],.04,accent,.25);
  }
  if(large){box(steering,[.26,.25,.06],[0,.015,.07],white,.035);label(steering,'ULTRA',[.21,.055],[0,-.05,.105]);}
 }
 const lamp=box(steering,[id==='light'?.19:.15,.06,.06],[0,.065,.115],0xe1eddf,.018);lamp.material=material(0xe1eddf,.15,.25);
 const bars=new T.Group();bars.position.set(0,seat+.23-.59,-.01);steering.add(bars);
 bar(bars,[-.36,0,0],[-.12,-.035,.02],.018,dark,.3);bar(bars,[-.12,-.035,.02],[.12,-.035,.02],.022,silver,.5);bar(bars,[.12,-.035,.02],[.36,0,0],.018,dark,.3);
 box(bars,[.12,.045,.08],[0,-.003,.035],dark,.01);box(bars,[.085,.006,.044],[0,.023,.035],0x688f89,.005);
 const grips=[new T.Vector3(),new T.Vector3()],levers=[];
 for(const side of [-1,1]){bar(bars,[side*.28,0,0],[side*.40,0,0],.026,dark);const lever=new T.Group();lever.position.set(side*.25,0,.035);bars.add(lever);bar(lever,[0,0,0],[side*.13,0,.055],.009,silver,.7);levers.push(lever);}
 const rider=createRider(chassis,spec,h);let spin=0,detached=false;
 const fallStart=new T.Vector3(),fallRotation=new T.Quaternion(),fallEnd=new T.Vector3(.65,-spec.radius-.25,-1.35),landRotation=new T.Quaternion().setFromEuler(new T.Euler(-Math.PI/2,0,.12)),bounds=new T.Box3();
 h.batch(root);
 return {root,spec,head:rider.head,eyes:rider.eyes,setFirstPerson:rider.setFirstPerson,dispose:h.dispose,update(b,dt){
  root.position.set(b.x,spec.radius,b.z);root.rotation.y=b.heading;pitch.rotation.x=-b.pitch;
  pitch.rotation.z=bikeRoll(b);chassis.position.y=b.suspension;
  // Front hub remains on the ground as the fork compresses. Steering turns the complete fork, wheel and controls.
  front.position.y=-.59-b.suspension;steering.rotation.y=b.steer*.25;
  spin+=b.speed*dt/spec.radius;rear.rotation.x=front.rotation.x=spin;
  steering.updateMatrix();bars.updateMatrix();
  grips[0].set(-.35,0,0).applyMatrix4(bars.matrix).applyMatrix4(steering.matrix);grips[1].set(.35,0,0).applyMatrix4(bars.matrix).applyMatrix4(steering.matrix);
  levers.forEach((l,i)=>l.rotation.y=spec.electric&&i===1?(b.brake||0)*.35:0);
  rider.update(b,dt,grips);
  const bend=b.fenderBend;
  if(bend!==lastBend){
    for(let i=0;i<tailAttribute.count;i++){
      const k=i*3,distance=-tailBase[k+2],angle=bend*distance/tailLength;
      tailAttribute.setXYZ(i,tailBase[k]*(1-.2*distance/tailLength),tailBase[k+1]-(bend>1e-6?tailLength*(1-Math.cos(angle))/bend:0),bend>1e-6?-tailLength*Math.sin(angle)/bend:tailBase[k+2]);
    }
    tailAttribute.needsUpdate=true;tailGeometry.computeVertexNormals();tailGeometry.computeBoundingBox();tailGeometry.computeBoundingSphere();lastBend=bend;
  }
  scrapeTip.position.set(0,-tail.thickness*.5-(bend>1e-6?tailLength*(1-Math.cos(bend))/bend:0),bend>1e-6?-tailLength*Math.sin(bend)/bend:-tailLength);
  if(b.fenderBroken){
    root.updateMatrixWorld(true);
    if(!tailDetached){root.attach(tailRoot);tailStart.copy(tailRoot.position);tailRotation.copy(tailRoot.quaternion);tailDetached=true;}
    const t=Math.min(b.fenderBreakTime,2);
    tailRoot.position.copy(tailStart);tailRoot.position.x+=t*.35;tailRoot.position.z-=t*1.8;tailRoot.position.y+=.3*t-4.9*t*t;
    tailSpin.setFromEuler(new T.Euler(t*4,t*2,0));tailRoot.quaternion.copy(tailRotation).multiply(tailSpin);
    root.updateMatrixWorld(true);tailBounds.setFromObject(tailRoot);tailRoot.position.y+=Math.max(0,.018-tailBounds.min.y);tailRoot.visible=b.fenderBreakTime<2;
  }else if(tailDetached){chassis.add(tailRoot);tailRoot.position.set(0,tail.height,tail.rootZ);tailRoot.quaternion.identity();tailRoot.visible=true;tailDetached=false;}
  if(b.crashed){
    root.updateMatrixWorld(true);
    if(!detached){root.attach(rider.root);fallStart.copy(rider.root.position);fallRotation.copy(rider.root.quaternion);detached=true;}
    const t=Math.min(1,b.crashTime/1.15),ease=t*t*(3-2*t);
    rider.root.position.lerpVectors(fallStart,fallEnd,ease);rider.root.position.y+=Math.sin(t*Math.PI)*.25;
    rider.root.quaternion.slerpQuaternions(fallRotation,landRotation,ease);
    // Rest both bike and rider on the ground instead of clipping through it.
    root.updateMatrixWorld(true);bounds.setFromObject(pitch);root.position.y+=Math.max(0,.015-bounds.min.y);
    root.updateMatrixWorld(true);bounds.setFromObject(rider.root);rider.root.position.y+=Math.max(0,.025-bounds.min.y);
  }else if(detached){chassis.add(rider.root);rider.root.position.set(0,0,0);rider.root.quaternion.identity();detached=false;}
 }};
}
