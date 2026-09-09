// Small synthesized sound bank: no downloads and no audio before a user gesture.
export function createAudio(){
 let ctx,master,engine,motor,engineGain,motorGain,roadGain,roadFilter,noise;
 let last=null,volume=.55;
 function start(){
  try{
   if(!ctx){
    ctx=new AudioContext();master=ctx.createGain();master.gain.value=volume*.3;master.connect(ctx.destination);
    const buffer=ctx.createBuffer(1,ctx.sampleRate,ctx.sampleRate),data=buffer.getChannelData(0);
    for(let i=0;i<data.length;i++)data[i]=Math.random()*2-1;
    noise=buffer;
    function tone(type){const osc=ctx.createOscillator(),gain=ctx.createGain();osc.type=type;gain.gain.value=0;osc.connect(gain).connect(master);osc.start();return [osc,gain];}
    [engine,engineGain]=tone('sawtooth');[motor,motorGain]=tone('sine');
    const roll=ctx.createBufferSource();roll.buffer=noise;roll.loop=true;
    roadFilter=ctx.createBiquadFilter();roadFilter.type='lowpass';roadGain=ctx.createGain();roadGain.gain.value=0;
    roll.connect(roadFilter).connect(roadGain).connect(master);roll.start();
   }
   ctx.resume().catch(()=>{});
  }catch{} // Audio availability never prevents playing.
 }
 function hit(strength,frequency,duration){
  const source=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),gain=ctx.createGain();
  source.buffer=noise;filter.type='lowpass';filter.frequency.value=frequency;
  gain.gain.setValueAtTime(strength,ctx.currentTime);gain.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+duration);
  source.connect(filter).connect(gain).connect(master);source.start();source.stop(ctx.currentTime+duration);
  source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect();};
 }
 function quiet(){if(!ctx)return;for(const gain of [engineGain,motorGain,roadGain])gain.gain.setTargetAtTime(0,ctx.currentTime,.025);last=null;}
 return {start,quiet,setVolume(value){volume=value;if(master)master.gain.setTargetAtTime(volume*.3,ctx.currentTime,.03);},update(b,spec,active){
  if(!ctx)return;if(!active){quiet();return;}
  const t=ctx.currentTime,speed=b.speed/spec.topSpeed*3.6,gas=b.throttle,running=!b.crashed;
  engine.frequency.setTargetAtTime(35+speed*70+gas*65,t,.07);
  motor.frequency.setTargetAtTime(110+b.speed*22+gas*65,t,.09);
  engineGain.gain.setTargetAtTime(running&&!spec.electric?.10+gas*.16:0,t,.05);
  motorGain.gain.setTargetAtTime(running&&spec.electric?(gas*.11+speed*.035):0,t,.06);
  roadFilter.frequency.setTargetAtTime(250+b.speed*45,t,.1);
  roadGain.gain.setTargetAtTime(Math.min(.28,b.speed*.008)+(b.scraping?.12:0),t,.08);
  if(last){
   if(b.crashed&&!last.crashed)hit(.75,650,.4);
   else if(last.pitch>.015&&b.pitch<=.015&&last.pitchRate<-.4)hit(Math.min(.5,-last.pitchRate*.13),280,.16);
   if(b.fenderBroken&&!last.fenderBroken)hit(.45,2600,.13);
  }
  last={pitch:b.pitch,pitchRate:b.pitchRate,crashed:b.crashed,fenderBroken:b.fenderBroken};
 }};
}
