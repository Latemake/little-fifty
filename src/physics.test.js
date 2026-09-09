import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createBike,updateBike,advanceBike,balancePoint,STEP,fenderContact,interpolateBike} from './physics.js';
import {BIKES} from './catalog.js';
const run=(b,input,seconds)=>{for(let i=0;i<seconds/STEP;i++)updateBike(b,input,STEP);};
test('driving, steering and braking',()=>{
 const b=createBike();run(b,{throttle:true,forward:true},5);assert.ok(b.speed>10);assert.equal(b.pitch,0);
 run(b,{throttle:true,left:true,forward:true},1);assert.ok(b.heading>0&&b.x>0);
 run(b,{brake:true},4);assert.equal(b.speed,0);
});
test('W lifts slightly; backward lean makes it easier and can cause a crash',()=>{
 const neutral=createBike(),back=createBike();run(neutral,{throttle:true},1);run(back,{throttle:true,back:true},1);
 assert.ok(neutral.pitch>0);assert.ok(back.pitch>neutral.pitch*4);
 run(back,{throttle:true,back:true},8);assert.equal(back.crashed,true);assert.equal(createBike().lean,0);
});
test('forward input prevents lift at all speeds and wins over backward input',()=>{
 for(const speed of [0,3,10,20])for(const back of [false,true]){
 const b=createBike();b.speed=speed;b.lean=1;run(b,{throttle:true,forward:true,back},10);assert.equal(b.pitch,0);assert.equal(b.crashed,false);
 }
 const b=createBike();run(b,{back:true},5);assert.equal(b.pitch,0);
});
test('gravity reverses at the physical balance point for every lean position',()=>{
 for(const lean of [-1,0,1])for(const offset of [-.05,0,.05]){
 const b=createBike();b.lean=lean;b.pitch=balancePoint(lean)+offset;
 updateBike(b,{back:lean===1,forward:lean===-1},STEP);
 if(offset===0)assert.ok(Math.abs(b.pitchRate)<1e-12);else assert.equal(Math.sign(b.pitchRate),Math.sign(offset));
 }
 assert.ok(balancePoint(1)<balancePoint(0));
});
test('throttle release below balance and forward lean lower the wheel',()=>{
 for(const input of [{},{throttle:true,forward:true}]){
 const b=createBike();b.speed=12;b.pitch=.8;run(b,input,5);assert.equal(b.pitch,0);assert.equal(b.crashed,false);
 }
});
test('two minute wheelie balanced using throttle and rear brake',()=>{
 const b=createBike();b.pitch=balancePoint(0)-.04;b.speed=10;let min=10,max=0;
 for(let i=0;i<120/STEP;i++){
 const correction=balancePoint(0)-.04-b.pitch-.7*b.pitchRate;
 updateBike(b,{throttle:correction>0,brake:correction<-.025},STEP);min=Math.min(min,b.pitch);max=Math.max(max,b.pitch);
 }
 assert.equal(b.crashed,false);assert.ok(min>.9&&max<1.1);
});
test('10 FPS and 60 FPS advance the same riding time and distance',()=>{
 const results=[];
 for(const fps of [10,20,30,60,144]){
  const b=createBike();let remainder=0;
  for(let i=0;i<fps*10;i++)remainder=advanceBike(b,{throttle:true,forward:true},1/fps,remainder);
  results.push(b);
 }
 for(const b of results){assert.ok(Math.abs(b.z-results[0].z)<1e-8);assert.ok(Math.abs(b.speed-results[0].speed)<1e-8);}
 assert.ok(results[0].z>60&&results[0].z<125); // A stock 45 km/h Rieju cannot cover 130 m in 10 s.
});
test('each bike reaches its own top speed while forward lean keeps the wheel down',()=>{
 for(const spec of Object.values(BIKES)){
  const b=createBike(spec.id);run(b,{throttle:true,forward:true},90);
  assert.ok(Math.abs(b.speed*3.6-spec.topSpeed)<.1);assert.equal(b.pitch,0);assert.equal(b.crashed,false);
  run(b,{brake:true,forward:true},4);assert.equal(b.speed,0);
 }
});
test('wheel torque gives the two electric bikes stronger acceleration and lift',()=>{
 const lifts=[],speeds=[];
 for(const id of ['rieju','light','ultra']){
  const b=createBike(id);run(b,{throttle:true,back:true},1);lifts.push(b.pitch);
  const straight=createBike(id);run(straight,{throttle:true,forward:true},2);speeds.push(straight.speed);
 }
 assert.ok(lifts[0]<lifts[1]&&lifts[1]<lifts[2]);assert.ok(speeds[0]<speeds[1]&&speeds[1]<speeds[2]);
});
test('all bikes can recover below balance, crash backwards, and reset their throttle',()=>{
 for(const id of Object.keys(BIKES)){
  const b=createBike(id);b.pitch=.8;b.speed=8;run(b,{forward:true},4);assert.equal(b.pitch,0);
  run(b,{throttle:true,back:true},8);assert.equal(b.crashed,true);
  const fresh=createBike(id);assert.equal(fresh.id,id);assert.equal(fresh.throttle,0);assert.equal(fresh.crashed,false);
 }
});
test('gently touching plastic bends at the ground and springs back after braking',()=>{
 for(const id of Object.keys(BIKES)){
  const b=createBike(id);b.speed=10;assert.ok(fenderContact(b).y>.5);
  while(fenderContact(b).y>.01)b.pitch+=.001;
  updateBike(b,{},STEP);
  assert.equal(b.scraping,true);assert.equal(b.crashed,false);assert.ok(Math.abs(fenderContact(b).y-.015)<.0001);assert.ok(b.fenderBend>0);
  run(b,{brake:true,forward:true},4);assert.equal(b.crashed,false);assert.equal(b.pitch,0);assert.equal(b.scraping,false);assert.equal(b.fenderBroken,false);assert.equal(b.fenderBend,0);
 }
});
test('letting go during a scrape cannot rest the bike on its fender',()=>{
 for(const id of Object.keys(BIKES)){
  const b=createBike(id);b.speed=10;b.lean=1;
  while(fenderContact(b).y>.012)b.pitch+=.001;
  run(b,{},2);assert.equal(b.fenderBroken,true);assert.equal(b.crashed,true);assert.equal(b.scraping,false);
 }
});
test('forcing rotation through a scrape causes a crash and reset clears scrape state',()=>{
 for(const id of Object.keys(BIKES)){
  const b=createBike(id);b.speed=3;let touched=false;
  for(let i=0;i<1200&&!b.crashed;i++){updateBike(b,{throttle:true,back:true},STEP);touched||=b.scraping;}
  assert.ok(touched&&b.crashed&&b.fenderBroken);run(b,{},2);assert.equal(b.scraping,false);assert.ok(b.crashTime>=1.9);
  const fresh=createBike(id);assert.equal(fresh.scraping,false);assert.equal(fresh.crashTime,0);assert.equal(fresh.fenderBroken,false);assert.equal(fresh.fenderBend,0);
 }
});
test('gravity drops the front promptly without flattening the balance point',()=>{
 for(const id of Object.keys(BIKES))for(const degrees of [30,45,55]){
  const b=createBike(id);b.speed=8;b.pitch=degrees*Math.PI/180;let elapsed=0;
  while(b.pitch>0&&elapsed<3){updateBike(b,{},STEP);elapsed+=STEP;}
  assert.equal(b.crashed,false);assert.equal(b.pitch,0);
  assert.ok(elapsed<(degrees===30?.65:degrees===45?.95:1.45));
  assert.ok(b.suspension<0||b.springRate<0); // Suspension absorbs the landing.
 }
});
test('closing the throttle removes drive quickly and rear brake shortens the fall',()=>{
 for(const id of Object.keys(BIKES)){
  const coast=createBike(id),braked=createBike(id);
  for(const b of [coast,braked]){b.pitch=.8;b.speed=8;b.throttle=1;}
  run(coast,{},.2);run(braked,{brake:true},.2);
  assert.ok(coast.throttle<.01);assert.ok(braked.pitch<coast.pitch);assert.ok(coast.pitchRate<0);
 }
});
test('full throttle at the speed limiter does not hold up the front',()=>{
 for(const spec of Object.values(BIKES)){
  const b=createBike(spec.id);b.speed=spec.topSpeed/3.6;b.throttle=1;b.pitch=.8;
  run(b,{throttle:true},1);assert.equal(b.pitch,0);assert.equal(b.crashed,false);
 }
});
test('stationary rear brake adds no pitch torque or suspension load',()=>{
 for(const id of Object.keys(BIKES)){
  const coast=createBike(id);coast.pitch=.8;
  const braked={...coast,brake:1};
  updateBike(coast,{},STEP);updateBike(braked,{brake:true},STEP);
  assert.equal(braked.pitchRate,coast.pitchRate);
  assert.equal(braked.acceleration,0);assert.equal(braked.suspension,coast.suspension);
  const held=createBike(id);held.brake=1;
  run(held,{throttle:true,back:true,brake:true},2);
  assert.ok(held.speed<1e-10);assert.equal(held.pitch,0);
 }
});
test('backward lean and throttle cannot initiate a wheelie near top speed',()=>{
 for(const spec of Object.values(BIKES))for(const ratio of [.95,.99,1]){
  const b=createBike(spec.id);b.speed=spec.topSpeed/3.6*ratio;b.throttle=1;b.lean=1;
  run(b,{throttle:true,back:true},2);assert.equal(b.pitch,0);
 }
});
test('plastic contact adds no pitch support, angular damping or speed limit',()=>{
 for(const id of Object.keys(BIKES)){
  const intact=createBike(id);intact.speed=10;intact.pitch=1.65;intact.pitchRate=.8;
  const broken={...intact,fenderBroken:true};
  for(let i=0;i<10;i++){updateBike(intact,{},STEP);updateBike(broken,{},STEP);assert.equal(intact.pitch,broken.pitch);assert.equal(intact.pitchRate,broken.pitchRate);assert.equal(intact.speed,broken.speed);}
 }
});
test('render interpolation eliminates repeated poses between 120 Hz simulation steps',()=>{
 const b=createBike('ultra'),previous={...b},out={};b.speed=20;Object.assign(previous,b);
 let remainder=0,lastPosition=null;const distances=[];
 for(let i=0;i<144;i++){
  remainder=advanceBike(b,{forward:true},1/144,remainder,previous);interpolateBike(previous,b,remainder/STEP,out);
  if(i>2)distances.push(out.z-lastPosition);lastPosition=out.z;
 }
 assert.ok(distances.every(d=>d>.12&&d<.15));
 const midpoint=interpolateBike({...b,z:0},{...b,z:2},.5);assert.equal(midpoint.z,1);
});
