import * as T from 'three';
export function createRider(parent,spec,h){
 const {box,bar,sphere,mesh,material,poseBar,label}=h;
 const white=0xeceee3,dark=0x263136,orange=0xea7248,skin=0xc88c6b,hip=spec.seat-spec.radius+.10;
 const root=new T.Group();root.name='rider';parent.add(root);const body=new T.Group();root.add(body);
 box(root,[.31,.18,.25],[0,hip-.02,.45],dark,.065);
 const torso=mesh(body,new T.CylinderGeometry(.23,.17,.43,8),material(orange),[0,.25,0]);torso.scale.z=.66;
 box(body,[.29,.27,.07],[0,.28,.15],dark,.055);box(body,[.24,.23,.04],[0,.28,-.145],white,.045);
 label(body,'LF',[.17,.07],[0,.29,-.169],Math.PI,'#273236','#eceee3');
 for(const side of [-1,1]){sphere(body,[.105,.115,.11],[side*.205,.40,0],orange);box(body,[.055,.23,.018],[side*.12,.26,.188],white,.005);}
 bar(body,[0,.45,0],[0,.54,.015],.065,skin);
 const head=new T.Group();head.position.set(0,.68,.025);body.add(head);
 head.name='rider-head';
 const eyes=new T.Object3D();eyes.name='rider-eyes';eyes.position.set(0,.035,.08);head.add(eyes);
 sphere(head,[.188,.208,.215],[0,0,0],white);
 sphere(head,[.148,.073,.07],[0,.014,.177],skin);
 box(head,[.31,.11,.075],[0,.035,.20],dark,.035);
 const lens=box(head,[.26,.066,.018],[0,.035,.244],0x608491,.022);lens.material=material(0x608491,.65,.18);
 box(head,[.13,.011,.01],[-.045,.051,.257],0xc4e5dd,.003);
 for(const side of [-1,1]){const cheek=box(head,[.06,.12,.17],[side*.135,-.095,.12],white,.026);cheek.rotation.x=.25;}
 box(head,[.255,.065,.14],[0,-.14,.19],white,.025);box(head,[.135,.025,.012],[0,-.14,.268],dark,.004);
 const peak=box(head,[.39,.025,.27],[0,.165,.16],white,.016);peak.rotation.x=-.12;
 box(head,[.12,.015,.11],[0,.204,-.035],dark,.005);
 const arms=[],legs=[];
 for(const side of [-1,1]){
  const glove=new T.Group();glove.name=side===-1?'throttle-hand':'left-hand';root.add(glove);box(glove,[.11,.075,.105],[0,0,0],dark,.025);box(glove,[.075,.018,.045],[0,.04,-.005],white,.008);
  for(let f=0;f<3;f++)box(glove,[.024,.04,.055],[-.033+f*.033,-.025,.035],dark,.01);
  const finger=box(glove,[.02,.026,.10],[side*.055,-.005,.025],orange,.008);
  arms.push({side,glove,finger,upper:bar(root,[0,0,0],[0,1,0],.078,orange),lower:bar(root,[0,0,0],[0,1,0],.061,white),elbow:sphere(root,[.079,.075,.078],[0,0,0],dark)});
  const boot=new T.Group();root.add(boot);box(boot,[.135,.16,.18],[0,.035,0],white,.03);box(boot,[.145,.085,.26],[0,-.06,.065],dark,.024);
  for(let j=0;j<3;j++)box(boot,[.15,.016,.025],[0,-.01+j*.04,.09],0x849394,.004);
  legs.push({side,boot,thigh:bar(root,[0,0,0],[0,1,0],.105,dark),shin:bar(root,[0,0,0],[0,1,0],.076,dark),knee:sphere(root,[.10,.11,.085],[0,0,0],white)});
 }
 for(const arm of arms)for(const part of [arm.finger,arm.upper,arm.lower,arm.elbow])part.userData.animated=true;
 for(const leg of legs)for(const part of [leg.thigh,leg.shin,leg.knee])part.userData.animated=true;
 let time=0;const shoulder=new T.Vector3(),wrist=new T.Vector3(),releasedHand=new T.Vector3();
 return {root,head,eyes,update(b,dt,grips){
  time+=dt;const load=Math.min(Math.abs(b.acceleration||0),10),throttle=b.throttle||0,brake=b.brake||0;
  const bounce=(spec.electric?0:Math.sin(time*(18+throttle*25))*.002)*(b.speed>0||throttle?1:.35);
  body.position.set(0,hip-.01-load*.003+bounce,.45-b.lean*.075);
  body.rotation.set(-b.lean*.32+throttle*.055-brake*.11,0,-b.steer*.035);
  head.rotation.set(Math.min(b.pitch,.9)*.10, b.steer*.14,0);
  body.updateMatrix();
  for(const arm of arms){
   shoulder.set(arm.side*.205,.39,0).applyMatrix4(body.matrix);
   wrist.copy(grips[arm.side===-1?0:1]);
   if(b.crashed)wrist.lerp(releasedHand.set(arm.side*.48,hip+.32,.3),Math.min(1,b.crashTime*5));
   arm.glove.position.copy(wrist);arm.glove.rotation.set(arm.side===-1?-throttle*.65:0,b.steer*.24,0);
   arm.finger.rotation.x=spec.electric&&arm.side===1?-brake*.45:0;
   const elbow=[(shoulder.x+wrist.x)*.5+arm.side*.065,(shoulder.y+wrist.y)*.5-.11,(shoulder.z+wrist.z)*.5-.035];
   poseBar(arm.upper,shoulder.toArray(),elbow);poseBar(arm.lower,elbow,wrist.toArray());arm.elbow.position.set(...elbow);
  }
  for(const leg of legs){
   const release=b.crashed?Math.min(1,b.crashTime*3):0;
   const knee=[leg.side*(.23+.12*release),hip-.24,.73-b.lean*.025-.14*release];const foot=[leg.side*(.23+.20*release),.10+.12*release,.60-.45*release];
   poseBar(leg.thigh,[leg.side*.14,hip-.01,.45],knee);poseBar(leg.shin,knee,foot);leg.knee.position.set(...knee);leg.boot.position.set(...foot);leg.boot.rotation.x=(!spec.electric&&leg.side===-1)?brake*.18:0;
  }
 }};
}
