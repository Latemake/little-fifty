import {getBike,rearFender} from './catalog.js';
export const STEP = 1 / 120;
export const GRAVITY = 9.81;
// Catch up through ordinary slow frames instead of slowing the entire game below 20 FPS.
// Long tab suspensions are handled by pausing in main.js.
export function advanceBike(b, input, elapsed, remainder = 0, previous) {
  let pending = remainder + Math.min(Math.max(elapsed, 0), .25);
  while (pending + 1e-10 >= STEP) { if(previous)Object.assign(previous,b);updateBike(b, input, STEP); pending -= STEP; }
  return Math.max(0, pending);
}
const continuous=['x','z','heading','speed','pitch','pitchRate','steer','lean','suspension','throttle','brake','acceleration','crashTime','fenderBend','fenderBreakTime'];
export function interpolateBike(previous,current,alpha,out={}) {
  Object.assign(out,current);const t=Math.max(0,Math.min(1,alpha));
  for(const key of continuous)out[key]=previous[key]+(current[key]-previous[key])*t;
  return out;
}
export function bikeRoll(b){return b.crashed?Math.min(1.38,b.crashTime*1.4):-b.steer*Math.min(b.speed*.012,.17);}
export function fenderContact(b,out={},bend=b.fenderBend){
  const spec=getBike(b.id),fender=rearFender(b.id),roll=bikeRoll(b),length=fender.rootZ+fender.reach;
  const y=fender.height+b.suspension-fender.thickness*.5-(bend>1e-6?length*(1-Math.cos(bend))/bend:0);
  const z=fender.rootZ-(bend>1e-6?length*Math.sin(bend)/bend:length);
  const localX=-y*Math.sin(roll),localZ=-y*Math.cos(roll)*Math.sin(b.pitch)+z*Math.cos(b.pitch);
  out.x=b.x+localX*Math.cos(b.heading)+localZ*Math.sin(b.heading);
  out.y=spec.radius+y*Math.cos(roll)*Math.cos(b.pitch)+z*Math.sin(b.pitch);
  out.z=b.z-localX*Math.sin(b.heading)+localZ*Math.cos(b.heading);return out;
}
export function centerOfMass(lean) {
  return { forward: .95 - .25 * lean, height: .55 };
}
export function balancePoint(lean) {
  const mass = centerOfMass(lean);
  return Math.atan2(mass.forward, mass.height);
}
export function createBike(id = 'rieju') {
  return { id: getBike(id).id, throttle: 0, brake: 0, acceleration: 0, x: 0, z: 0, heading: 0, speed: 0, pitch: 0, pitchRate: 0,
    steer: 0, lean: 0, suspension: 0, springRate: 0, scraping:false,scrapeStrength:0,fenderBend:0,fenderBroken:false,fenderBreakTime:0,crashed: false, crashTime: 0 };
}
export function updateBike(b, input, dt) {
  const spec = getBike(b.id);
  if(b.fenderBroken)b.fenderBreakTime+=dt;
  if (b.crashed) {
    b.crashTime += dt;
    b.speed *= Math.exp(-3 * dt);
    b.throttle*=Math.exp(-12*dt);b.scraping=false;b.scrapeStrength=0;
    b.pitch += (1.95 - b.pitch) * (1-Math.exp(-4*dt));
  } else {
    const throttle = input.throttle ? 1 : 0;
    const brake = input.brake ? 1 : 0;
    b.throttle += (throttle - b.throttle) * (1 - Math.exp(-(throttle ? (spec.electric ? 16 : 9) : 24) * dt));
    b.brake += (brake - b.brake) * (1 - Math.exp(-18 * dt));
    const totalMass = spec.mass + 75, maxSpeed = spec.topSpeed / 3.6;
    const force = Math.min(spec.wheelTorque / spec.radius, spec.powerKW * 1000 / Math.max(b.speed, 1));
    const speedLimiter=Math.max(0,1-(b.speed/maxSpeed)**12);
    const driveAcceleration=b.throttle*force/totalMass*speedLimiter;
    const drag=(1-b.throttle)*(.20+.003*b.speed**2);
    // The brake can only remove available forward motion, including this step's drive.
    const brakeDeceleration=Math.min(b.brake*12,Math.max(0,b.speed/dt+driveAcceleration-drag));
    const acceleration=driveAcceleration-brakeDeceleration-drag;
    const oldSpeed=b.speed;
    b.speed = Math.max(0, Math.min(maxSpeed, b.speed + acceleration * dt));
    b.acceleration = (b.speed-oldSpeed)/dt;
    b.steer += ((Number(input.left || false) - Number(input.right || false)) - b.steer) * Math.min(1, dt * 7);
    b.heading += b.steer * (input.steeringSensitivity ?? 1) * Math.min(b.speed / 7, 1) * .95 / (1 + b.speed * .04) * (b.pitch > .12 ? .55 : 1) * dt;
    // Moving the rider changes the combined center of mass, not the bike's pose.
    // Forward input wins if both lean directions are held.
    const leanTarget = input.forward ? -1 : input.back ? 1 : 0;
    b.lean += (leanTarget - b.lean) * (1 - Math.exp(-8 * dt));
    const mass = centerOfMass(b.lean);
    // Moments in Nm about the rear axle, divided by kg*m² inertia.
    // Effective COM/distributed inertia are gameplay estimates; g is Earth gravity.
    const lever=mass.forward*Math.cos(b.pitch)-mass.height*Math.sin(b.pitch);
    const inertia=totalMass*(mass.forward**2+mass.height**2+.12*spec.wheelbase**2);
    const gravityTorque=-totalMass*GRAVITY*lever;
    // Available drive falls with motor power and the speed limiter instead of
    // magically holding the front up at top speed. Retain an arcade lift
    // assist for the stock 50cc; body position still determines the balance point.
    const availableTorque=force*spec.radius;
    const torqueRatio=(availableTorque/totalMass)/(110/160);
    const liftPerMass=GRAVITY*.95*(.93+.17*Math.exp(-b.speed/4))*Math.pow(torqueRatio,.28);
    const brakeHold=oldSpeed<.1?Math.max(0,1-brakeDeceleration/Math.max(driveAcceleration,.001)):1;
    const driveTorque=totalMass*b.throttle*liftPerMass*speedLimiter*brakeHold*(input.forward?.15:1);
    const brakeTorque=totalMass*brakeDeceleration*(mass.forward*Math.sin(b.pitch)+mass.height*Math.cos(b.pitch));
    // Small damping removes oscillation without making a falling front float.
    b.pitchRate+=((gravityTorque+driveTorque-brakeTorque)/inertia-.35*b.pitchRate)*dt;
    b.pitch += b.pitchRate * dt;
    if (b.pitch < 0) {
      if (b.pitchRate < -.3) b.springRate += b.pitchRate * .12;
      b.pitch = 0; b.pitchRate = 0;
    }
    // Damped suspension compresses under acceleration and landing impacts.
    b.springRate += (-70 * b.suspension - 12 * b.springRate - b.acceleration * .1) * dt;
    b.suspension = Math.max(-.09, Math.min(.05, b.suspension + b.springRate * dt));
    const depth=Math.max(0,.015-fenderContact(b,{},0).y);
    b.scraping=!b.fenderBroken&&depth>0&&b.pitch>.7;
    b.scrapeStrength=b.scraping?Math.min(1,depth*12+.2):0;
    if(b.scraping){
      // Plastic bends out of the way. It applies NO stabilising pitch torque,
      // damping or speed clamp to the bike, and cannot become a third wheel.
      let low=0,high=rearFender(b.id).maxBend;
      if(fenderContact(b,{},high).y<.015){b.fenderBend=high;b.fenderBroken=true;b.fenderBreakTime=0;b.scraping=false;b.scrapeStrength=0;}
      else{for(let i=0;i<12;i++){const mid=(low+high)*.5;if(fenderContact(b,{},mid).y<.015)low=mid;else high=mid;}b.fenderBend=high;}
    }else if(!b.fenderBroken){b.fenderBend*=Math.exp(-18*dt);if(b.fenderBend<.0001)b.fenderBend=0;}
    if(b.pitch>1.85){b.crashed=true;b.crashTime=0;}
  }
  b.x += Math.sin(b.heading) * b.speed * dt;
  b.z += Math.cos(b.heading) * b.speed * dt;
}
