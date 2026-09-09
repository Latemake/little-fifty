import * as T from 'three';
export function createRider(parent,spec,h){
 const {box,bar,sphere,mesh,material,poseBar,label}=h;
 const white=0xeceee3,dark=0x263136,orange=0xea7248,skin=0xc88c6b,hip=spec.seat-spec.radius+.10;
 const root=new T.Group();root.name='rider';parent.add(root);const body=new T.Group();root.add(body);
 const hips=box(root,[.31,.18,.25],[0,hip-.02,.45],dark,.065);hips.userData.animated=!!spec.scooter;
 const torso=mesh(body,new T.CylinderGeometry(.23,.17,.43,8),material(orange),[0,.25,0]);torso.scale.z=.66;
 box(body,[.29,.27,.07],[0,.28,.15],dark,.055);box(body,[.24,.23,.04],[0,.28,-.145],white,.045);
 label(body,'LF',[.17,.07],[0,.29,-.169],Math.PI,'#273236','#eceee3');
 for(const side of [-1,1]){sphere(body,[.105,.115,.11],[side*.205,.40,0],orange);box(body,[.055,.23,.018],[side*.12,.26,.188],white,.005);}
 bar(body,[0,.45,0],[0,.54,.015],.065,skin);
 const head=new T.Group();head.position.set(0,.68,.025);body.add(head);
 head.name='rider-head';
 const eyes=new T.Object3D();eyes.name='rider-eyes';eyes.position.set(0,.035,.08);head.add(eyes);
 sphere(head,[.175,.211,.195],[0,0,-.025],white);
 // A shaped face sits inside the helmet opening, behind clear riding goggles.
 sphere(head,[.123,.151,.078],[0,-.008,.163],skin);
 sphere(head,[.083,.062,.055],[0,-.105,.181],skin);
 for(const side of [-1,1]){
  sphere(head,[.048,.04,.029],[side*.068,-.033,.221],0xd69b7a);
  sphere(head,[.035,.016,.014],[side*.051,.027,.237],0xf5eee2);
  sphere(head,[.012,.013,.006],[side*.050,.027,.250],0x526d63);
  sphere(head,[.0055,.008,.003],[side*.050,.027,.256],0x172326);
  sphere(head,[.0025,.003,.002],[side*.047,.031,.259],0xffffff);
  const brow=box(head,[.066,.012,.012],[side*.053,.056,.240],0x573d30,.004);brow.rotation.z=side*.08;
  box(head,[.018,.089,.029],[side*.116,.028,.223],dark,.007);
  box(head,[.027,.04,.17],[side*.171,.025,.02],dark,.008);
 }
 sphere(head,[.019,.038,.026],[0,-.006,.25],skin);
 sphere(head,[.025,.016,.020],[0,-.032,.266],0xd79c7b);
 box(head,[.056,.009,.010],[0,-.075,.237],0x92574d,.004);
 box(head,[.046,.007,.008],[0,-.085,.236],0xe3ab8a,.003);
 for(const y of [-.014,.074])box(head,[.239,.014,.025],[0,y,.236],dark,.006);
 const lens=box(head,[.216,.073,.009],[0,.030,.273],0xc3e2dc,.012);
 lens.material=material(0xc3e2dc,0,.16);lens.material.transparent=true;lens.material.opacity=.14;lens.material.depthWrite=false;
 for(const side of [-1,1]){const cheek=box(head,[.047,.105,.15],[side*.139,-.102,.115],white,.018);cheek.rotation.x=.25;}
 box(head,[.235,.043,.12],[0,-.163,.18],white,.018);box(head,[.115,.017,.012],[0,-.163,.245],dark,.004);
 const peak=box(head,[.34,.021,.24],[0,.17,.145],white,.012);peak.rotation.x=-.12;
 box(head,[.12,.015,.11],[0,.204,-.035],dark,.005);
 const arms=[],legs=[];
 for(const side of [-1,1]){
  const glove=new T.Group();glove.name=side===-1?'throttle-hand':'left-hand';root.add(glove);box(glove,[.11,.075,.105],[0,0,0],dark,.025);box(glove,[.075,.018,.045],[0,.04,-.005],white,.008);
  for(let f=0;f<3;f++)box(glove,[.024,.04,.055],[-.033+f*.033,-.025,.035],dark,.01);
  const finger=box(glove,[.02,.026,.10],[side*.055,-.005,.025],orange,.008);
  arms.push({side,glove,finger,upper:bar(root,[0,0,0],[0,1,0],.078,orange),lower:bar(root,[0,0,0],[0,1,0],.061,white),elbow:sphere(root,[.079,.075,.078],[0,0,0],dark)});
  const boot=new T.Group();boot.name=side===-1?'support-foot':'balance-foot';root.add(boot);box(boot,[.135,.16,.18],[0,.035,0],white,.03);box(boot,[.145,.085,.26],[0,-.06,.065],dark,.024);
  for(let j=0;j<3;j++)box(boot,[.15,.016,.025],[0,-.01+j*.04,.09],0x849394,.004);
  legs.push({side,boot,thigh:bar(root,[0,0,0],[0,1,0],.105,dark),shin:bar(root,[0,0,0],[0,1,0],.076,dark),knee:sphere(root,[.10,.11,.085],[0,0,0],white)});
 }
 for(const arm of arms)for(const part of [arm.finger,arm.upper,arm.lower,arm.elbow])part.userData.animated=true;
 for(const leg of legs)for(const part of [leg.thigh,leg.shin,leg.knee])part.userData.animated=true;
 let time=0,oneFoot=0;const shoulder=new T.Vector3(),wrist=new T.Vector3(),releasedHand=new T.Vector3();
 return {root,head,eyes,update(b,dt,grips){
  time+=dt;const load=Math.min(Math.abs(b.acceleration||0),10),throttle=b.throttle||0,brake=b.brake||0;
  const footTarget=spec.scooter&&!b.crashed?T.MathUtils.smoothstep(b.pitch,.08,.35):0;
  oneFoot+=(footTarget-oneFoot)*(1-Math.exp(-9*dt));
  const bounce=(spec.electric?0:Math.sin(time*(18+throttle*25))*.002)*(b.speed>0||throttle?1:.35);
  body.position.set(0,hip-.01-load*.003+bounce,.45-b.lean*(spec.scooter?.15:.075));
  if(spec.scooter)hips.position.set(0,body.position.y-.02,body.position.z);
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
   const knee=spec.scooter?[leg.side*(.09+.14*release),hip-.39,.50-b.lean*.09]:[leg.side*(.23+.12*release),hip-.24,.73-b.lean*.025-.14*release];
   const foot=spec.scooter?[leg.side*(.06+.2*release),.18+.12*release,(leg.side===-1?.57:.29)-.35*release]:[leg.side*(.23+.20*release),.10+.12*release,.60-.45*release];
   if(spec.scooter&&leg.side===1&&!b.crashed){
    const balance=T.MathUtils.clamp(b.lean*.4+b.pitchRate*.3,-.5,.5);
    foot[0]+=.10*oneFoot;foot[1]+=(.34+balance*.10)*oneFoot;foot[2]-=(.66+balance*.18)*oneFoot;
    knee[1]+=.035*oneFoot;knee[2]-=(.30+balance*.08)*oneFoot;
   }
   poseBar(leg.thigh,[leg.side*.14,hip-.01,.45-(spec.scooter?b.lean*.15:0)],knee);poseBar(leg.shin,knee,foot);leg.knee.position.set(...knee);leg.boot.position.set(...foot);leg.boot.rotation.x=(!spec.electric&&leg.side===-1)?brake*.18:0;
   if(spec.scooter&&leg.side===1&&!b.crashed)leg.boot.rotation.x=-.25*oneFoot;
  }
 }};
}
