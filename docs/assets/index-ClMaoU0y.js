(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function Gl({active:i,camera:e,reset:t}){const n=document.createElement("div");n.id="touch-controls",n.innerHTML=`<div class="touch-tools"><button id="touch-camera" aria-label="Vaihda kameraa">◉ <span>KAMERA</span></button><button id="touch-reset" aria-label="Aloita uudelleen">↻ <span>UUDELLEEN</span></button></div>
 <div id="touch-stick" role="group" aria-label="Ohjaus ja painonsiirto"><span class="stick-up">ETEEN</span><span class="stick-down">TAAKSE</span><span class="stick-left">‹</span><span class="stick-right">›</span><i></i></div>
 <div class="touch-pedals"><button id="touch-brake">JARRU</button><button id="touch-gas">KAASU <span>↑</span></button></div>`,document.getElementById("hud").append(n);const r={throttle:!1,brake:!1,left:0,right:0,back:!1,forward:!1},s=n.querySelector("#touch-stick"),o=s.querySelector("i"),a=new Map;let l=null;const c=matchMedia("(any-pointer: coarse)"),u=()=>document.body.classList.toggle("touch-device",c.matches||navigator.maxTouchPoints>0);u(),c.addEventListener("change",u);function h(){a.clear(),l=null,Object.assign(r,{throttle:!1,brake:!1,left:0,right:0,back:!1,forward:!1}),o.style.transform="translate(0px,0px)",n.querySelectorAll(".held").forEach(g=>g.classList.remove("held"))}function p(g){if(g.pointerId!==l)return;const _=s.getBoundingClientRect(),d=_.width*.32;let f=(g.clientX-_.left-_.width/2)/d,M=(g.clientY-_.top-_.height/2)/d;const v=Math.max(1,Math.hypot(f,M));f/=v,M/=v,r.left=f<-.15?(-f-.15)/.85:0,r.right=f>.15?(f-.15)/.85:0,r.forward=M<-.3,r.back=M>.3,o.style.transform=`translate(${f*d}px,${M*d}px)`}s.addEventListener("pointerdown",g=>{!i()||l!==null||(g.preventDefault(),l=g.pointerId,s.setPointerCapture(g.pointerId),p(g))}),s.addEventListener("pointermove",p);function m(g){g.pointerId===l&&(l=null,r.left=r.right=0,r.forward=r.back=!1,o.style.transform="translate(0px,0px)")}for(const g of["pointerup","pointercancel","lostpointercapture"])s.addEventListener(g,m);for(const[g,_]of[["touch-gas","throttle"],["touch-brake","brake"]]){const d=n.querySelector("#"+g);d.addEventListener("pointerdown",f=>{i()&&(f.preventDefault(),d.setPointerCapture(f.pointerId),a.set(f.pointerId,_),r[_]=!0,d.classList.add("held"))});for(const f of["pointerup","pointercancel","lostpointercapture"])d.addEventListener(f,M=>{a.delete(M.pointerId),r[_]=[...a.values()].includes(_),d.classList.toggle("held",r[_])})}return n.addEventListener("contextmenu",g=>g.preventDefault()),n.querySelector("#touch-camera").onclick=()=>{i()&&e()},n.querySelector("#touch-reset").onclick=()=>{i()&&t()},addEventListener("blur",h),addEventListener("resize",h),document.addEventListener("visibilitychange",h),{state:r,clear:h}}function Wl(){let i,e,t,n,r,s,o,a,l,c=null,u=.55;function h(){try{if(!i){let f=function(v){const x=i.createOscillator(),R=i.createGain();return x.type=v,R.gain.value=0,x.connect(R).connect(e),x.start(),[x,R]};var g=f;i=new AudioContext,e=i.createGain(),e.gain.value=u*.3,e.connect(i.destination);const _=i.createBuffer(1,i.sampleRate,i.sampleRate),d=_.getChannelData(0);for(let v=0;v<d.length;v++)d[v]=Math.random()*2-1;l=_,[t,r]=f("sawtooth"),[n,s]=f("sine");const M=i.createBufferSource();M.buffer=l,M.loop=!0,a=i.createBiquadFilter(),a.type="lowpass",o=i.createGain(),o.gain.value=0,M.connect(a).connect(o).connect(e),M.start()}i.resume().catch(()=>{})}catch{}}function p(g,_,d){const f=i.createBufferSource(),M=i.createBiquadFilter(),v=i.createGain();f.buffer=l,M.type="lowpass",M.frequency.value=_,v.gain.setValueAtTime(g,i.currentTime),v.gain.exponentialRampToValueAtTime(.001,i.currentTime+d),f.connect(M).connect(v).connect(e),f.start(),f.stop(i.currentTime+d),f.onended=()=>{f.disconnect(),M.disconnect(),v.disconnect()}}function m(){if(i){for(const g of[r,s,o])g.gain.setTargetAtTime(0,i.currentTime,.025);c=null}}return{start:h,quiet:m,setVolume(g){u=g,e&&e.gain.setTargetAtTime(u*.3,i.currentTime,.03)},update(g,_,d){if(!i)return;if(!d){m();return}const f=i.currentTime,M=g.speed/_.topSpeed*3.6,v=g.throttle,x=!g.crashed;t.frequency.setTargetAtTime(35+M*70+v*65,f,.07),n.frequency.setTargetAtTime(110+g.speed*22+v*65,f,.09),r.gain.setTargetAtTime(x&&!_.electric?.1+v*.16:0,f,.05),s.gain.setTargetAtTime(x&&_.electric?v*.11+M*.035:0,f,.06),a.frequency.setTargetAtTime(250+g.speed*45,f,.1),o.gain.setTargetAtTime(Math.min(.28,g.speed*.008)+(g.scraping?.12:0),f,.08),c&&(g.crashed&&!c.crashed?p(.75,650,.4):c.pitch>.015&&g.pitch<=.015&&c.pitchRate<-.4&&p(Math.min(.5,-c.pitchRate*.13),280,.16),g.fenderBroken&&!c.fenderBroken&&p(.45,2600,.13)),c={pitch:g.pitch,pitchRate:g.pitchRate,crashed:g.crashed,fenderBroken:g.fenderBroken}}}}const Wo="180",Xl=0,va=1,ql=2,Uc=1,Nc=2,vn=3,Fn=0,Rt=1,xn=2,Un=0,Ei=1,xa=2,Ma=3,Sa=4,Yl=5,Yn=100,Kl=101,Jl=102,Zl=103,jl=104,$l=200,Ql=201,eu=202,tu=203,$s=204,Qs=205,nu=206,iu=207,ru=208,su=209,ou=210,au=211,cu=212,lu=213,uu=214,eo=0,to=1,no=2,Ai=3,io=4,ro=5,so=6,oo=7,Fc=0,hu=1,fu=2,Nn=0,du=1,pu=2,mu=3,Oc=4,gu=5,_u=6,vu=7,Bc=300,bi=301,wi=302,ao=303,co=304,us=306,jr=1e3,Jn=1001,lo=1002,zt=1003,xu=1004,_r=1005,on=1006,vs=1007,Zn=1008,ln=1009,zc=1010,kc=1011,nr=1012,Xo=1013,Qn=1014,an=1015,fr=1016,qo=1017,Yo=1018,ir=1020,Hc=35902,Vc=35899,Gc=1021,Wc=1022,Qt=1023,rr=1026,sr=1027,Ko=1028,Jo=1029,Xc=1030,Zo=1031,jo=1033,Wr=33776,Xr=33777,qr=33778,Yr=33779,uo=35840,ho=35841,fo=35842,po=35843,mo=36196,go=37492,_o=37496,vo=37808,xo=37809,Mo=37810,So=37811,yo=37812,Eo=37813,To=37814,Ao=37815,bo=37816,wo=37817,Ro=37818,Co=37819,Po=37820,Lo=37821,Do=36492,Io=36494,Uo=36495,No=36283,Fo=36284,Oo=36285,Bo=36286,Mu=3200,Su=3201,qc=0,yu=1,In="",Lt="srgb",Ri="srgb-linear",$r="linear",tt="srgb",ri=7680,ya=519,Eu=512,Tu=513,Au=514,Yc=515,bu=516,wu=517,Ru=518,Cu=519,Ea=35044,Ta=35048,Aa="300 es",cn=2e3,Qr=2001;class Ii{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Mt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ba=1234567;const Zi=Math.PI/180,or=180/Math.PI;function ni(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Mt[i&255]+Mt[i>>8&255]+Mt[i>>16&255]+Mt[i>>24&255]+"-"+Mt[e&255]+Mt[e>>8&255]+"-"+Mt[e>>16&15|64]+Mt[e>>24&255]+"-"+Mt[t&63|128]+Mt[t>>8&255]+"-"+Mt[t>>16&255]+Mt[t>>24&255]+Mt[n&255]+Mt[n>>8&255]+Mt[n>>16&255]+Mt[n>>24&255]).toLowerCase()}function qe(i,e,t){return Math.max(e,Math.min(t,i))}function $o(i,e){return(i%e+e)%e}function Pu(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function Lu(i,e,t){return i!==e?(t-i)/(e-i):0}function ji(i,e,t){return(1-t)*i+t*e}function Du(i,e,t,n){return ji(i,e,1-Math.exp(-t*n))}function Iu(i,e=1){return e-Math.abs($o(i,e*2)-e)}function Uu(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Nu(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Fu(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Ou(i,e){return i+Math.random()*(e-i)}function Bu(i){return i*(.5-Math.random())}function zu(i){i!==void 0&&(ba=i);let e=ba+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function ku(i){return i*Zi}function Hu(i){return i*or}function Vu(i){return(i&i-1)===0&&i!==0}function Gu(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Wu(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Xu(i,e,t,n,r){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),u=o((e+n)/2),h=s((e-n)/2),p=o((e-n)/2),m=s((n-e)/2),g=o((n-e)/2);switch(r){case"XYX":i.set(a*u,l*h,l*p,a*c);break;case"YZY":i.set(l*p,a*u,l*h,a*c);break;case"ZXZ":i.set(l*h,l*p,a*u,a*c);break;case"XZX":i.set(a*u,l*g,l*m,a*c);break;case"YXY":i.set(l*m,a*u,l*g,a*c);break;case"ZYZ":i.set(l*g,l*m,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function xi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function bt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const zo={DEG2RAD:Zi,RAD2DEG:or,generateUUID:ni,clamp:qe,euclideanModulo:$o,mapLinear:Pu,inverseLerp:Lu,lerp:ji,damp:Du,pingpong:Iu,smoothstep:Uu,smootherstep:Nu,randInt:Fu,randFloat:Ou,randFloatSpread:Bu,seededRandom:zu,degToRad:ku,radToDeg:Hu,isPowerOfTwo:Vu,ceilPowerOfTwo:Gu,floorPowerOfTwo:Wu,setQuaternionFromProperEuler:Xu,normalize:bt,denormalize:xi};class de{constructor(e=0,t=0){de.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*r+e.x,this.y=s*r+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Mn{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,o,a){let l=n[r+0],c=n[r+1],u=n[r+2],h=n[r+3];const p=s[o+0],m=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=p,e[t+1]=m,e[t+2]=g,e[t+3]=_;return}if(h!==_||l!==p||c!==m||u!==g){let d=1-a;const f=l*p+c*m+u*g+h*_,M=f>=0?1:-1,v=1-f*f;if(v>Number.EPSILON){const R=Math.sqrt(v),w=Math.atan2(R,f*M);d=Math.sin(d*w)/R,a=Math.sin(a*w)/R}const x=a*M;if(l=l*d+p*x,c=c*d+m*x,u=u*d+g*x,h=h*d+_*x,d===1-a){const R=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=R,c*=R,u*=R,h*=R}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,r,s,o){const a=n[r],l=n[r+1],c=n[r+2],u=n[r+3],h=s[o],p=s[o+1],m=s[o+2],g=s[o+3];return e[t]=a*g+u*h+l*m-c*p,e[t+1]=l*g+u*p+c*h-a*m,e[t+2]=c*g+u*m+a*p-l*h,e[t+3]=u*g-a*h-l*p-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(r/2),h=a(s/2),p=l(n/2),m=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=p*u*h+c*m*g,this._y=c*m*h-p*u*g,this._z=c*u*g+p*m*h,this._w=c*u*h-p*m*g;break;case"YXZ":this._x=p*u*h+c*m*g,this._y=c*m*h-p*u*g,this._z=c*u*g-p*m*h,this._w=c*u*h+p*m*g;break;case"ZXY":this._x=p*u*h-c*m*g,this._y=c*m*h+p*u*g,this._z=c*u*g+p*m*h,this._w=c*u*h-p*m*g;break;case"ZYX":this._x=p*u*h-c*m*g,this._y=c*m*h+p*u*g,this._z=c*u*g-p*m*h,this._w=c*u*h+p*m*g;break;case"YZX":this._x=p*u*h+c*m*g,this._y=c*m*h+p*u*g,this._z=c*u*g-p*m*h,this._w=c*u*h-p*m*g;break;case"XZY":this._x=p*u*h-c*m*g,this._y=c*m*h-p*u*g,this._z=c*u*g+p*m*h,this._w=c*u*h+p*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],p=n+a+h;if(p>0){const m=.5/Math.sqrt(p+1);this._w=.25/m,this._x=(u-l)*m,this._y=(s-c)*m,this._z=(o-r)*m}else if(n>a&&n>h){const m=2*Math.sqrt(1+n-a-h);this._w=(u-l)/m,this._x=.25*m,this._y=(r+o)/m,this._z=(s+c)/m}else if(a>h){const m=2*Math.sqrt(1+a-n-h);this._w=(s-c)/m,this._x=(r+o)/m,this._y=.25*m,this._z=(l+u)/m}else{const m=2*Math.sqrt(1+h-n-a);this._w=(o-r)/m,this._x=(s+c)/m,this._y=(l+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(qe(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-r*a,this._w=o*u-n*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const m=1-t;return this._w=m*o+t*this._w,this._x=m*n+t*this._x,this._y=m*r+t*this._y,this._z=m*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-t)*u)/c,p=Math.sin(t*u)/c;return this._w=o*h+this._w*p,this._x=n*h+this._x*p,this._y=r*h+this._y*p,this._z=s*h+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(e=0,t=0,n=0){D.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(wa.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(wa.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*n),u=2*(a*t-s*r),h=2*(s*n-o*t);return this.x=t+l*c+o*h-a*u,this.y=n+l*u+a*c-s*h,this.z=r+l*h+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-n*l,this.z=n*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return xs.copy(this).projectOnVector(e),this.sub(xs)}reflect(e){return this.sub(xs.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const xs=new D,wa=new Mn;class Ve{constructor(e,t,n,r,s,o,a,l,c){Ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,l,c)}set(e,t,n,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],h=n[7],p=n[2],m=n[5],g=n[8],_=r[0],d=r[3],f=r[6],M=r[1],v=r[4],x=r[7],R=r[2],w=r[5],C=r[8];return s[0]=o*_+a*M+l*R,s[3]=o*d+a*v+l*w,s[6]=o*f+a*x+l*C,s[1]=c*_+u*M+h*R,s[4]=c*d+u*v+h*w,s[7]=c*f+u*x+h*C,s[2]=p*_+m*M+g*R,s[5]=p*d+m*v+g*w,s[8]=p*f+m*x+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*s*u+n*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,p=a*l-u*s,m=c*s-o*l,g=t*h+n*p+r*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=h*_,e[1]=(r*c-u*n)*_,e[2]=(a*n-r*o)*_,e[3]=p*_,e[4]=(u*t-r*l)*_,e[5]=(r*s-a*t)*_,e[6]=m*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Ms.makeScale(e,t)),this}rotate(e){return this.premultiply(Ms.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ms.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ms=new Ve;function Kc(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function es(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function qu(){const i=es("canvas");return i.style.display="block",i}const Ra={};function ar(i){i in Ra||(Ra[i]=!0,console.warn(i))}function Yu(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const Ca=new Ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Pa=new Ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ku(){const i={enabled:!0,workingColorSpace:Ri,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===tt&&(r.r=yn(r.r),r.g=yn(r.g),r.b=yn(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===tt&&(r.r=Ti(r.r),r.g=Ti(r.g),r.b=Ti(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===In?$r:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return ar("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return ar("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ri]:{primaries:e,whitePoint:n,transfer:$r,toXYZ:Ca,fromXYZ:Pa,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Lt},outputColorSpaceConfig:{drawingBufferColorSpace:Lt}},[Lt]:{primaries:e,whitePoint:n,transfer:tt,toXYZ:Ca,fromXYZ:Pa,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Lt}}}),i}const Ze=Ku();function yn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ti(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let si;class Ju{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{si===void 0&&(si=es("canvas")),si.width=e.width,si.height=e.height;const r=si.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=si}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=es("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=yn(s[o]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(yn(t[n]/255)*255):t[n]=yn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Zu=0;class Qo{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Zu++}),this.uuid=ni(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Ss(r[o].image)):s.push(Ss(r[o]))}else s=Ss(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function Ss(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ju.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ju=0;const ys=new D;class Tt extends Ii{constructor(e=Tt.DEFAULT_IMAGE,t=Tt.DEFAULT_MAPPING,n=Jn,r=Jn,s=on,o=Zn,a=Qt,l=ln,c=Tt.DEFAULT_ANISOTROPY,u=In){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ju++}),this.uuid=ni(),this.name="",this.source=new Qo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new de(0,0),this.repeat=new de(1,1),this.center=new de(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ys).x}get height(){return this.source.getSize(ys).y}get depth(){return this.source.getSize(ys).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Bc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case jr:e.x=e.x-Math.floor(e.x);break;case Jn:e.x=e.x<0?0:1;break;case lo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case jr:e.y=e.y-Math.floor(e.y);break;case Jn:e.y=e.y<0?0:1;break;case lo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Tt.DEFAULT_IMAGE=null;Tt.DEFAULT_MAPPING=Bc;Tt.DEFAULT_ANISOTROPY=1;class ht{constructor(e=0,t=0,n=0,r=1){ht.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],u=l[4],h=l[8],p=l[1],m=l[5],g=l[9],_=l[2],d=l[6],f=l[10];if(Math.abs(u-p)<.01&&Math.abs(h-_)<.01&&Math.abs(g-d)<.01){if(Math.abs(u+p)<.1&&Math.abs(h+_)<.1&&Math.abs(g+d)<.1&&Math.abs(c+m+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(c+1)/2,x=(m+1)/2,R=(f+1)/2,w=(u+p)/4,C=(h+_)/4,P=(g+d)/4;return v>x&&v>R?v<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(v),r=w/n,s=C/n):x>R?x<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(x),n=w/r,s=P/r):R<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),n=C/s,r=P/s),this.set(n,r,s,t),this}let M=Math.sqrt((d-g)*(d-g)+(h-_)*(h-_)+(p-u)*(p-u));return Math.abs(M)<.001&&(M=1),this.x=(d-g)/M,this.y=(h-_)/M,this.z=(p-u)/M,this.w=Math.acos((c+m+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this.w=qe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this.w=qe(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class $u extends Ii{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:on,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ht(0,0,e,t),this.scissorTest=!1,this.viewport=new ht(0,0,e,t);const r={width:e,height:t,depth:n.depth},s=new Tt(r);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:on,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Qo(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ei extends $u{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Jc extends Tt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=zt,this.minFilter=zt,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Qu extends Tt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=zt,this.minFilter=zt,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class En{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Yt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Yt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Yt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Yt):Yt.fromBufferAttribute(s,o),Yt.applyMatrix4(e.matrixWorld),this.expandByPoint(Yt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),vr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),vr.copy(n.boundingBox)),vr.applyMatrix4(e.matrixWorld),this.union(vr)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Yt),Yt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(zi),xr.subVectors(this.max,zi),oi.subVectors(e.a,zi),ai.subVectors(e.b,zi),ci.subVectors(e.c,zi),wn.subVectors(ai,oi),Rn.subVectors(ci,ai),zn.subVectors(oi,ci);let t=[0,-wn.z,wn.y,0,-Rn.z,Rn.y,0,-zn.z,zn.y,wn.z,0,-wn.x,Rn.z,0,-Rn.x,zn.z,0,-zn.x,-wn.y,wn.x,0,-Rn.y,Rn.x,0,-zn.y,zn.x,0];return!Es(t,oi,ai,ci,xr)||(t=[1,0,0,0,1,0,0,0,1],!Es(t,oi,ai,ci,xr))?!1:(Mr.crossVectors(wn,Rn),t=[Mr.x,Mr.y,Mr.z],Es(t,oi,ai,ci,xr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Yt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Yt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(dn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),dn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),dn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),dn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),dn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),dn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),dn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),dn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(dn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const dn=[new D,new D,new D,new D,new D,new D,new D,new D],Yt=new D,vr=new En,oi=new D,ai=new D,ci=new D,wn=new D,Rn=new D,zn=new D,zi=new D,xr=new D,Mr=new D,kn=new D;function Es(i,e,t,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){kn.fromArray(i,s);const a=r.x*Math.abs(kn.x)+r.y*Math.abs(kn.y)+r.z*Math.abs(kn.z),l=e.dot(kn),c=t.dot(kn),u=n.dot(kn);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const eh=new En,ki=new D,Ts=new D;class Ui{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):eh.setFromPoints(e).getCenter(n);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ki.subVectors(e,this.center);const t=ki.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(ki,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ts.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ki.copy(e.center).add(Ts)),this.expandByPoint(ki.copy(e.center).sub(Ts))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const pn=new D,As=new D,Sr=new D,Cn=new D,bs=new D,yr=new D,ws=new D;class Zc{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,pn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=pn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(pn.copy(this.origin).addScaledVector(this.direction,t),pn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){As.copy(e).add(t).multiplyScalar(.5),Sr.copy(t).sub(e).normalize(),Cn.copy(this.origin).sub(As);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Sr),a=Cn.dot(this.direction),l=-Cn.dot(Sr),c=Cn.lengthSq(),u=Math.abs(1-o*o);let h,p,m,g;if(u>0)if(h=o*l-a,p=o*a-l,g=s*u,h>=0)if(p>=-g)if(p<=g){const _=1/u;h*=_,p*=_,m=h*(h+o*p+2*a)+p*(o*h+p+2*l)+c}else p=s,h=Math.max(0,-(o*p+a)),m=-h*h+p*(p+2*l)+c;else p=-s,h=Math.max(0,-(o*p+a)),m=-h*h+p*(p+2*l)+c;else p<=-g?(h=Math.max(0,-(-o*s+a)),p=h>0?-s:Math.min(Math.max(-s,-l),s),m=-h*h+p*(p+2*l)+c):p<=g?(h=0,p=Math.min(Math.max(-s,-l),s),m=p*(p+2*l)+c):(h=Math.max(0,-(o*s+a)),p=h>0?s:Math.min(Math.max(-s,-l),s),m=-h*h+p*(p+2*l)+c);else p=o>0?-s:s,h=Math.max(0,-(o*p+a)),m=-h*h+p*(p+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(As).addScaledVector(Sr,p),m}intersectSphere(e,t){pn.subVectors(e.center,this.origin);const n=pn.dot(this.direction),r=pn.dot(pn)-n*n,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,p=this.origin;return c>=0?(n=(e.min.x-p.x)*c,r=(e.max.x-p.x)*c):(n=(e.max.x-p.x)*c,r=(e.min.x-p.x)*c),u>=0?(s=(e.min.y-p.y)*u,o=(e.max.y-p.y)*u):(s=(e.max.y-p.y)*u,o=(e.min.y-p.y)*u),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(e.min.z-p.z)*h,l=(e.max.z-p.z)*h):(a=(e.max.z-p.z)*h,l=(e.min.z-p.z)*h),n>l||a>r)||((a>n||n!==n)&&(n=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,pn)!==null}intersectTriangle(e,t,n,r,s){bs.subVectors(t,e),yr.subVectors(n,e),ws.crossVectors(bs,yr);let o=this.direction.dot(ws),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Cn.subVectors(this.origin,e);const l=a*this.direction.dot(yr.crossVectors(Cn,yr));if(l<0)return null;const c=a*this.direction.dot(bs.cross(Cn));if(c<0||l+c>o)return null;const u=-a*Cn.dot(ws);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class st{constructor(e,t,n,r,s,o,a,l,c,u,h,p,m,g,_,d){st.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,l,c,u,h,p,m,g,_,d)}set(e,t,n,r,s,o,a,l,c,u,h,p,m,g,_,d){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=r,f[1]=s,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=u,f[10]=h,f[14]=p,f[3]=m,f[7]=g,f[11]=_,f[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new st().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/li.setFromMatrixColumn(e,0).length(),s=1/li.setFromMatrixColumn(e,1).length(),o=1/li.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const p=o*u,m=o*h,g=a*u,_=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=m+g*c,t[5]=p-_*c,t[9]=-a*l,t[2]=_-p*c,t[6]=g+m*c,t[10]=o*l}else if(e.order==="YXZ"){const p=l*u,m=l*h,g=c*u,_=c*h;t[0]=p+_*a,t[4]=g*a-m,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=m*a-g,t[6]=_+p*a,t[10]=o*l}else if(e.order==="ZXY"){const p=l*u,m=l*h,g=c*u,_=c*h;t[0]=p-_*a,t[4]=-o*h,t[8]=g+m*a,t[1]=m+g*a,t[5]=o*u,t[9]=_-p*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const p=o*u,m=o*h,g=a*u,_=a*h;t[0]=l*u,t[4]=g*c-m,t[8]=p*c+_,t[1]=l*h,t[5]=_*c+p,t[9]=m*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const p=o*l,m=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=_-p*h,t[8]=g*h+m,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=m*h+g,t[10]=p-_*h}else if(e.order==="XZY"){const p=o*l,m=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=p*h+_,t[5]=o*u,t[9]=m*h-g,t[2]=g*h-m,t[6]=a*u,t[10]=_*h+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(th,e,nh)}lookAt(e,t,n){const r=this.elements;return Ft.subVectors(e,t),Ft.lengthSq()===0&&(Ft.z=1),Ft.normalize(),Pn.crossVectors(n,Ft),Pn.lengthSq()===0&&(Math.abs(n.z)===1?Ft.x+=1e-4:Ft.z+=1e-4,Ft.normalize(),Pn.crossVectors(n,Ft)),Pn.normalize(),Er.crossVectors(Ft,Pn),r[0]=Pn.x,r[4]=Er.x,r[8]=Ft.x,r[1]=Pn.y,r[5]=Er.y,r[9]=Ft.y,r[2]=Pn.z,r[6]=Er.z,r[10]=Ft.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],h=n[5],p=n[9],m=n[13],g=n[2],_=n[6],d=n[10],f=n[14],M=n[3],v=n[7],x=n[11],R=n[15],w=r[0],C=r[4],P=r[8],E=r[12],y=r[1],L=r[5],U=r[9],V=r[13],N=r[2],k=r[6],K=r[10],j=r[14],G=r[3],ce=r[7],pe=r[11],xe=r[15];return s[0]=o*w+a*y+l*N+c*G,s[4]=o*C+a*L+l*k+c*ce,s[8]=o*P+a*U+l*K+c*pe,s[12]=o*E+a*V+l*j+c*xe,s[1]=u*w+h*y+p*N+m*G,s[5]=u*C+h*L+p*k+m*ce,s[9]=u*P+h*U+p*K+m*pe,s[13]=u*E+h*V+p*j+m*xe,s[2]=g*w+_*y+d*N+f*G,s[6]=g*C+_*L+d*k+f*ce,s[10]=g*P+_*U+d*K+f*pe,s[14]=g*E+_*V+d*j+f*xe,s[3]=M*w+v*y+x*N+R*G,s[7]=M*C+v*L+x*k+R*ce,s[11]=M*P+v*U+x*K+R*pe,s[15]=M*E+v*V+x*j+R*xe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],p=e[10],m=e[14],g=e[3],_=e[7],d=e[11],f=e[15];return g*(+s*l*h-r*c*h-s*a*p+n*c*p+r*a*m-n*l*m)+_*(+t*l*m-t*c*p+s*o*p-r*o*m+r*c*u-s*l*u)+d*(+t*c*h-t*a*m-s*o*h+n*o*m+s*a*u-n*c*u)+f*(-r*a*u-t*l*h+t*a*p+r*o*h-n*o*p+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],p=e[10],m=e[11],g=e[12],_=e[13],d=e[14],f=e[15],M=h*d*c-_*p*c+_*l*m-a*d*m-h*l*f+a*p*f,v=g*p*c-u*d*c-g*l*m+o*d*m+u*l*f-o*p*f,x=u*_*c-g*h*c+g*a*m-o*_*m-u*a*f+o*h*f,R=g*h*l-u*_*l-g*a*p+o*_*p+u*a*d-o*h*d,w=t*M+n*v+r*x+s*R;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/w;return e[0]=M*C,e[1]=(_*p*s-h*d*s-_*r*m+n*d*m+h*r*f-n*p*f)*C,e[2]=(a*d*s-_*l*s+_*r*c-n*d*c-a*r*f+n*l*f)*C,e[3]=(h*l*s-a*p*s-h*r*c+n*p*c+a*r*m-n*l*m)*C,e[4]=v*C,e[5]=(u*d*s-g*p*s+g*r*m-t*d*m-u*r*f+t*p*f)*C,e[6]=(g*l*s-o*d*s-g*r*c+t*d*c+o*r*f-t*l*f)*C,e[7]=(o*p*s-u*l*s+u*r*c-t*p*c-o*r*m+t*l*m)*C,e[8]=x*C,e[9]=(g*h*s-u*_*s-g*n*m+t*_*m+u*n*f-t*h*f)*C,e[10]=(o*_*s-g*a*s+g*n*c-t*_*c-o*n*f+t*a*f)*C,e[11]=(u*a*s-o*h*s-u*n*c+t*h*c+o*n*m-t*a*m)*C,e[12]=R*C,e[13]=(u*_*r-g*h*r+g*n*p-t*_*p-u*n*d+t*h*d)*C,e[14]=(g*a*r-o*_*r-g*n*l+t*_*l+o*n*d-t*a*d)*C,e[15]=(o*h*r-u*a*r+u*n*l-t*h*l-o*n*p+t*a*p)*C,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+n,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,o){return this.set(1,n,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,h=a+a,p=s*c,m=s*u,g=s*h,_=o*u,d=o*h,f=a*h,M=l*c,v=l*u,x=l*h,R=n.x,w=n.y,C=n.z;return r[0]=(1-(_+f))*R,r[1]=(m+x)*R,r[2]=(g-v)*R,r[3]=0,r[4]=(m-x)*w,r[5]=(1-(p+f))*w,r[6]=(d+M)*w,r[7]=0,r[8]=(g+v)*C,r[9]=(d-M)*C,r[10]=(1-(p+_))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=li.set(r[0],r[1],r[2]).length();const o=li.set(r[4],r[5],r[6]).length(),a=li.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Kt.copy(this);const c=1/s,u=1/o,h=1/a;return Kt.elements[0]*=c,Kt.elements[1]*=c,Kt.elements[2]*=c,Kt.elements[4]*=u,Kt.elements[5]*=u,Kt.elements[6]*=u,Kt.elements[8]*=h,Kt.elements[9]*=h,Kt.elements[10]*=h,t.setFromRotationMatrix(Kt),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,r,s,o,a=cn,l=!1){const c=this.elements,u=2*s/(t-e),h=2*s/(n-r),p=(t+e)/(t-e),m=(n+r)/(n-r);let g,_;if(l)g=s/(o-s),_=o*s/(o-s);else if(a===cn)g=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===Qr)g=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=p,c[12]=0,c[1]=0,c[5]=h,c[9]=m,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,o,a=cn,l=!1){const c=this.elements,u=2/(t-e),h=2/(n-r),p=-(t+e)/(t-e),m=-(n+r)/(n-r);let g,_;if(l)g=1/(o-s),_=o/(o-s);else if(a===cn)g=-2/(o-s),_=-(o+s)/(o-s);else if(a===Qr)g=-1/(o-s),_=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=p,c[1]=0,c[5]=h,c[9]=0,c[13]=m,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const li=new D,Kt=new st,th=new D(0,0,0),nh=new D(1,1,1),Pn=new D,Er=new D,Ft=new D,La=new st,Da=new Mn;class qt{constructor(e=0,t=0,n=0,r=qt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],h=r[2],p=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-qe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(qe(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-h,m),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-qe(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(p,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(qe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return La.makeRotationFromQuaternion(e),this.setFromRotationMatrix(La,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Da.setFromEuler(this),this.setFromQuaternion(Da,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}qt.DEFAULT_ORDER="XYZ";class jc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let ih=0;const Ia=new D,ui=new Mn,mn=new st,Tr=new D,Hi=new D,rh=new D,sh=new Mn,Ua=new D(1,0,0),Na=new D(0,1,0),Fa=new D(0,0,1),Oa={type:"added"},oh={type:"removed"},hi={type:"childadded",child:null},Rs={type:"childremoved",child:null};class ft extends Ii{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ih++}),this.uuid=ni(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ft.DEFAULT_UP.clone();const e=new D,t=new qt,n=new Mn,r=new D(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new st},normalMatrix:{value:new Ve}}),this.matrix=new st,this.matrixWorld=new st,this.matrixAutoUpdate=ft.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new jc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ui.setFromAxisAngle(e,t),this.quaternion.multiply(ui),this}rotateOnWorldAxis(e,t){return ui.setFromAxisAngle(e,t),this.quaternion.premultiply(ui),this}rotateX(e){return this.rotateOnAxis(Ua,e)}rotateY(e){return this.rotateOnAxis(Na,e)}rotateZ(e){return this.rotateOnAxis(Fa,e)}translateOnAxis(e,t){return Ia.copy(e).applyQuaternion(this.quaternion),this.position.add(Ia.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ua,e)}translateY(e){return this.translateOnAxis(Na,e)}translateZ(e){return this.translateOnAxis(Fa,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(mn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Tr.copy(e):Tr.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Hi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?mn.lookAt(Hi,Tr,this.up):mn.lookAt(Tr,Hi,this.up),this.quaternion.setFromRotationMatrix(mn),r&&(mn.extractRotation(r.matrixWorld),ui.setFromRotationMatrix(mn),this.quaternion.premultiply(ui.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Oa),hi.child=e,this.dispatchEvent(hi),hi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(oh),Rs.child=e,this.dispatchEvent(Rs),Rs.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),mn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),mn.multiply(e.parent.matrixWorld)),e.applyMatrix4(mn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Oa),hi.child=e,this.dispatchEvent(hi),hi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hi,e,rh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hi,sh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),p=o(e.skeletons),m=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),p.length>0&&(n.skeletons=p),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=r,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}ft.DEFAULT_UP=new D(0,1,0);ft.DEFAULT_MATRIX_AUTO_UPDATE=!0;ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Jt=new D,gn=new D,Cs=new D,_n=new D,fi=new D,di=new D,Ba=new D,Ps=new D,Ls=new D,Ds=new D,Is=new ht,Us=new ht,Ns=new ht;class $t{constructor(e=new D,t=new D,n=new D){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Jt.subVectors(e,t),r.cross(Jt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Jt.subVectors(r,t),gn.subVectors(n,t),Cs.subVectors(e,t);const o=Jt.dot(Jt),a=Jt.dot(gn),l=Jt.dot(Cs),c=gn.dot(gn),u=gn.dot(Cs),h=o*c-a*a;if(h===0)return s.set(0,0,0),null;const p=1/h,m=(c*l-a*u)*p,g=(o*u-a*l)*p;return s.set(1-m-g,g,m)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,_n)===null?!1:_n.x>=0&&_n.y>=0&&_n.x+_n.y<=1}static getInterpolation(e,t,n,r,s,o,a,l){return this.getBarycoord(e,t,n,r,_n)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,_n.x),l.addScaledVector(o,_n.y),l.addScaledVector(a,_n.z),l)}static getInterpolatedAttribute(e,t,n,r,s,o){return Is.setScalar(0),Us.setScalar(0),Ns.setScalar(0),Is.fromBufferAttribute(e,t),Us.fromBufferAttribute(e,n),Ns.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Is,s.x),o.addScaledVector(Us,s.y),o.addScaledVector(Ns,s.z),o}static isFrontFacing(e,t,n,r){return Jt.subVectors(n,t),gn.subVectors(e,t),Jt.cross(gn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Jt.subVectors(this.c,this.b),gn.subVectors(this.a,this.b),Jt.cross(gn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return $t.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return $t.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return $t.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return $t.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return $t.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let o,a;fi.subVectors(r,n),di.subVectors(s,n),Ps.subVectors(e,n);const l=fi.dot(Ps),c=di.dot(Ps);if(l<=0&&c<=0)return t.copy(n);Ls.subVectors(e,r);const u=fi.dot(Ls),h=di.dot(Ls);if(u>=0&&h<=u)return t.copy(r);const p=l*h-u*c;if(p<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(fi,o);Ds.subVectors(e,s);const m=fi.dot(Ds),g=di.dot(Ds);if(g>=0&&m<=g)return t.copy(s);const _=m*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(di,a);const d=u*g-m*h;if(d<=0&&h-u>=0&&m-g>=0)return Ba.subVectors(s,r),a=(h-u)/(h-u+(m-g)),t.copy(r).addScaledVector(Ba,a);const f=1/(d+_+p);return o=_*f,a=p*f,t.copy(n).addScaledVector(fi,o).addScaledVector(di,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const $c={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ln={h:0,s:0,l:0},Ar={h:0,s:0,l:0};function Fs(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ke{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Lt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ze.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Ze.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ze.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Ze.workingColorSpace){if(e=$o(e,1),t=qe(t,0,1),n=qe(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Fs(o,s,e+1/3),this.g=Fs(o,s,e),this.b=Fs(o,s,e-1/3)}return Ze.colorSpaceToWorking(this,r),this}setStyle(e,t=Lt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Lt){const n=$c[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=yn(e.r),this.g=yn(e.g),this.b=yn(e.b),this}copyLinearToSRGB(e){return this.r=Ti(e.r),this.g=Ti(e.g),this.b=Ti(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Lt){return Ze.workingToColorSpace(St.copy(this),e),Math.round(qe(St.r*255,0,255))*65536+Math.round(qe(St.g*255,0,255))*256+Math.round(qe(St.b*255,0,255))}getHexString(e=Lt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ze.workingColorSpace){Ze.workingToColorSpace(St.copy(this),t);const n=St.r,r=St.g,s=St.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case n:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-n)/h+2;break;case s:l=(n-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Ze.workingColorSpace){return Ze.workingToColorSpace(St.copy(this),t),e.r=St.r,e.g=St.g,e.b=St.b,e}getStyle(e=Lt){Ze.workingToColorSpace(St.copy(this),e);const t=St.r,n=St.g,r=St.b;return e!==Lt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Ln),this.setHSL(Ln.h+e,Ln.s+t,Ln.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ln),e.getHSL(Ar);const n=ji(Ln.h,Ar.h,t),r=ji(Ln.s,Ar.s,t),s=ji(Ln.l,Ar.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const St=new Ke;Ke.NAMES=$c;let ah=0;class Ni extends Ii{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ah++}),this.uuid=ni(),this.name="",this.type="Material",this.blending=Ei,this.side=Fn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=$s,this.blendDst=Qs,this.blendEquation=Yn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ke(0,0,0),this.blendAlpha=0,this.depthFunc=Ai,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ya,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ri,this.stencilZFail=ri,this.stencilZPass=ri,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ei&&(n.blending=this.blending),this.side!==Fn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==$s&&(n.blendSrc=this.blendSrc),this.blendDst!==Qs&&(n.blendDst=this.blendDst),this.blendEquation!==Yn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ai&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ya&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ri&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ri&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ri&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class hs extends Ni{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qt,this.combine=Fc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const pt=new D,br=new de;let ch=0;class It{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ch++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ea,this.updateRanges=[],this.gpuType=an,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)br.fromBufferAttribute(this,t),br.applyMatrix3(e),this.setXY(t,br.x,br.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)pt.fromBufferAttribute(this,t),pt.applyMatrix3(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)pt.fromBufferAttribute(this,t),pt.applyMatrix4(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)pt.fromBufferAttribute(this,t),pt.applyNormalMatrix(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)pt.fromBufferAttribute(this,t),pt.transformDirection(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=xi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=bt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=xi(t,this.array)),t}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=xi(t,this.array)),t}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=xi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=xi(t,this.array)),t}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),r=bt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),r=bt(r,this.array),s=bt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ea&&(e.usage=this.usage),e}}class Qc extends It{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class el extends It{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Qe extends It{constructor(e,t,n){super(new Float32Array(e),t,n)}}let lh=0;const Vt=new st,Os=new ft,pi=new D,Ot=new En,Vi=new En,vt=new D;class xt extends Ii{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:lh++}),this.uuid=ni(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Kc(e)?el:Qc)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ve().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Vt.makeRotationFromQuaternion(e),this.applyMatrix4(Vt),this}rotateX(e){return Vt.makeRotationX(e),this.applyMatrix4(Vt),this}rotateY(e){return Vt.makeRotationY(e),this.applyMatrix4(Vt),this}rotateZ(e){return Vt.makeRotationZ(e),this.applyMatrix4(Vt),this}translate(e,t,n){return Vt.makeTranslation(e,t,n),this.applyMatrix4(Vt),this}scale(e,t,n){return Vt.makeScale(e,t,n),this.applyMatrix4(Vt),this}lookAt(e){return Os.lookAt(e),Os.updateMatrix(),this.applyMatrix4(Os.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(pi).negate(),this.translate(pi.x,pi.y,pi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Qe(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new En);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];Ot.setFromBufferAttribute(s),this.morphTargetsRelative?(vt.addVectors(this.boundingBox.min,Ot.min),this.boundingBox.expandByPoint(vt),vt.addVectors(this.boundingBox.max,Ot.max),this.boundingBox.expandByPoint(vt)):(this.boundingBox.expandByPoint(Ot.min),this.boundingBox.expandByPoint(Ot.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ui);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){const n=this.boundingSphere.center;if(Ot.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Vi.setFromBufferAttribute(a),this.morphTargetsRelative?(vt.addVectors(Ot.min,Vi.min),Ot.expandByPoint(vt),vt.addVectors(Ot.max,Vi.max),Ot.expandByPoint(vt)):(Ot.expandByPoint(Vi.min),Ot.expandByPoint(Vi.max))}Ot.getCenter(n);let r=0;for(let s=0,o=e.count;s<o;s++)vt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(vt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)vt.fromBufferAttribute(a,c),l&&(pi.fromBufferAttribute(e,c),vt.add(pi)),r=Math.max(r,n.distanceToSquared(vt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new It(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let P=0;P<n.count;P++)a[P]=new D,l[P]=new D;const c=new D,u=new D,h=new D,p=new de,m=new de,g=new de,_=new D,d=new D;function f(P,E,y){c.fromBufferAttribute(n,P),u.fromBufferAttribute(n,E),h.fromBufferAttribute(n,y),p.fromBufferAttribute(s,P),m.fromBufferAttribute(s,E),g.fromBufferAttribute(s,y),u.sub(c),h.sub(c),m.sub(p),g.sub(p);const L=1/(m.x*g.y-g.x*m.y);isFinite(L)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(h,-m.y).multiplyScalar(L),d.copy(h).multiplyScalar(m.x).addScaledVector(u,-g.x).multiplyScalar(L),a[P].add(_),a[E].add(_),a[y].add(_),l[P].add(d),l[E].add(d),l[y].add(d))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let P=0,E=M.length;P<E;++P){const y=M[P],L=y.start,U=y.count;for(let V=L,N=L+U;V<N;V+=3)f(e.getX(V+0),e.getX(V+1),e.getX(V+2))}const v=new D,x=new D,R=new D,w=new D;function C(P){R.fromBufferAttribute(r,P),w.copy(R);const E=a[P];v.copy(E),v.sub(R.multiplyScalar(R.dot(E))).normalize(),x.crossVectors(w,E);const L=x.dot(l[P])<0?-1:1;o.setXYZW(P,v.x,v.y,v.z,L)}for(let P=0,E=M.length;P<E;++P){const y=M[P],L=y.start,U=y.count;for(let V=L,N=L+U;V<N;V+=3)C(e.getX(V+0)),C(e.getX(V+1)),C(e.getX(V+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new It(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let p=0,m=n.count;p<m;p++)n.setXYZ(p,0,0,0);const r=new D,s=new D,o=new D,a=new D,l=new D,c=new D,u=new D,h=new D;if(e)for(let p=0,m=e.count;p<m;p+=3){const g=e.getX(p+0),_=e.getX(p+1),d=e.getX(p+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,d),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,d),a.add(u),l.add(u),c.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(d,c.x,c.y,c.z)}else for(let p=0,m=t.count;p<m;p+=3)r.fromBufferAttribute(t,p+0),s.fromBufferAttribute(t,p+1),o.fromBufferAttribute(t,p+2),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),n.setXYZ(p+0,u.x,u.y,u.z),n.setXYZ(p+1,u.x,u.y,u.z),n.setXYZ(p+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)vt.fromBufferAttribute(e,t),vt.normalize(),e.setXYZ(t,vt.x,vt.y,vt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,h=a.normalized,p=new c.constructor(l.length*u);let m=0,g=0;for(let _=0,d=l.length;_<d;_++){a.isInterleavedBufferAttribute?m=l[_]*a.data.stride+a.offset:m=l[_]*u;for(let f=0;f<u;f++)p[g++]=c[m++]}return new It(p,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new xt,n=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,h=c.length;u<h;u++){const p=c[u],m=e(p,n);l.push(m)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,p=c.length;h<p;h++){const m=c[h];u.push(m.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let p=0,m=h.length;p<m;p++)u.push(h[p].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const za=new st,Hn=new Zc,wr=new Ui,ka=new D,Rr=new D,Cr=new D,Pr=new D,Bs=new D,Lr=new D,Ha=new D,Dr=new D;class Et extends ft{constructor(e=new xt,t=new hs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Lr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],h=s[l];u!==0&&(Bs.fromBufferAttribute(h,e),o?Lr.addScaledVector(Bs,u):Lr.addScaledVector(Bs.sub(t),u))}t.add(Lr)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),wr.copy(n.boundingSphere),wr.applyMatrix4(s),Hn.copy(e.ray).recast(e.near),!(wr.containsPoint(Hn.origin)===!1&&(Hn.intersectSphere(wr,ka)===null||Hn.origin.distanceToSquared(ka)>(e.far-e.near)**2))&&(za.copy(s).invert(),Hn.copy(e.ray).applyMatrix4(za),!(n.boundingBox!==null&&Hn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Hn)))}_computeIntersections(e,t,n){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,p=s.groups,m=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=p.length;g<_;g++){const d=p[g],f=o[d.materialIndex],M=Math.max(d.start,m.start),v=Math.min(a.count,Math.min(d.start+d.count,m.start+m.count));for(let x=M,R=v;x<R;x+=3){const w=a.getX(x),C=a.getX(x+1),P=a.getX(x+2);r=Ir(this,f,e,n,c,u,h,w,C,P),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=d.materialIndex,t.push(r))}}else{const g=Math.max(0,m.start),_=Math.min(a.count,m.start+m.count);for(let d=g,f=_;d<f;d+=3){const M=a.getX(d),v=a.getX(d+1),x=a.getX(d+2);r=Ir(this,o,e,n,c,u,h,M,v,x),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=p.length;g<_;g++){const d=p[g],f=o[d.materialIndex],M=Math.max(d.start,m.start),v=Math.min(l.count,Math.min(d.start+d.count,m.start+m.count));for(let x=M,R=v;x<R;x+=3){const w=x,C=x+1,P=x+2;r=Ir(this,f,e,n,c,u,h,w,C,P),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=d.materialIndex,t.push(r))}}else{const g=Math.max(0,m.start),_=Math.min(l.count,m.start+m.count);for(let d=g,f=_;d<f;d+=3){const M=d,v=d+1,x=d+2;r=Ir(this,o,e,n,c,u,h,M,v,x),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}}function uh(i,e,t,n,r,s,o,a){let l;if(e.side===Rt?l=n.intersectTriangle(o,s,r,!0,a):l=n.intersectTriangle(r,s,o,e.side===Fn,a),l===null)return null;Dr.copy(a),Dr.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Dr);return c<t.near||c>t.far?null:{distance:c,point:Dr.clone(),object:i}}function Ir(i,e,t,n,r,s,o,a,l,c){i.getVertexPosition(a,Rr),i.getVertexPosition(l,Cr),i.getVertexPosition(c,Pr);const u=uh(i,e,t,n,Rr,Cr,Pr,Ha);if(u){const h=new D;$t.getBarycoord(Ha,Rr,Cr,Pr,h),r&&(u.uv=$t.getInterpolatedAttribute(r,a,l,c,h,new de)),s&&(u.uv1=$t.getInterpolatedAttribute(s,a,l,c,h,new de)),o&&(u.normal=$t.getInterpolatedAttribute(o,a,l,c,h,new D),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const p={a,b:l,c,normal:new D,materialIndex:0};$t.getNormal(Rr,Cr,Pr,p.normal),u.face=p,u.barycoord=h}return u}class Tn extends xt{constructor(e=1,t=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],h=[];let p=0,m=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,r,o,2),g("x","z","y",1,-1,e,n,-t,r,o,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new Qe(c,3)),this.setAttribute("normal",new Qe(u,3)),this.setAttribute("uv",new Qe(h,2));function g(_,d,f,M,v,x,R,w,C,P,E){const y=x/C,L=R/P,U=x/2,V=R/2,N=w/2,k=C+1,K=P+1;let j=0,G=0;const ce=new D;for(let pe=0;pe<K;pe++){const xe=pe*L-V;for(let le=0;le<k;le++){const Ie=le*y-U;ce[_]=Ie*M,ce[d]=xe*v,ce[f]=N,c.push(ce.x,ce.y,ce.z),ce[_]=0,ce[d]=0,ce[f]=w>0?1:-1,u.push(ce.x,ce.y,ce.z),h.push(le/C),h.push(1-pe/P),j+=1}}for(let pe=0;pe<P;pe++)for(let xe=0;xe<C;xe++){const le=p+xe+k*pe,Ie=p+xe+k*(pe+1),We=p+(xe+1)+k*(pe+1),Le=p+(xe+1)+k*pe;l.push(le,Ie,Le),l.push(Ie,We,Le),G+=6}a.addGroup(m,G,E),m+=G,p+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Tn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ci(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function wt(i){const e={};for(let t=0;t<i.length;t++){const n=Ci(i[t]);for(const r in n)e[r]=n[r]}return e}function hh(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function tl(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ze.workingColorSpace}const fh={clone:Ci,merge:wt};var dh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ph=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class An extends Ni{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=dh,this.fragmentShader=ph,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ci(e.uniforms),this.uniformsGroups=hh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class nl extends ft{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new st,this.projectionMatrix=new st,this.projectionMatrixInverse=new st,this.coordinateSystem=cn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Dn=new D,Va=new de,Ga=new de;class Wt extends nl{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=or*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Zi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return or*2*Math.atan(Math.tan(Zi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Dn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Dn.x,Dn.y).multiplyScalar(-e/Dn.z),Dn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Dn.x,Dn.y).multiplyScalar(-e/Dn.z)}getViewSize(e,t){return this.getViewBounds(e,Va,Ga),t.subVectors(Ga,Va)}setViewOffset(e,t,n,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Zi*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*n/c,r*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const mi=-90,gi=1;class mh extends ft{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Wt(mi,gi,e,t);r.layers=this.layers,this.add(r);const s=new Wt(mi,gi,e,t);s.layers=this.layers,this.add(s);const o=new Wt(mi,gi,e,t);o.layers=this.layers,this.add(o);const a=new Wt(mi,gi,e,t);a.layers=this.layers,this.add(a);const l=new Wt(mi,gi,e,t);l.layers=this.layers,this.add(l);const c=new Wt(mi,gi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===cn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Qr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,h=e.getRenderTarget(),p=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,o),e.setRenderTarget(n,2,r),e.render(t,a),e.setRenderTarget(n,3,r),e.render(t,l),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(h,p,m),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class il extends Tt{constructor(e=[],t=bi,n,r,s,o,a,l,c,u){super(e,t,n,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class gh extends ei{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new il(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Tn(5,5,5),s=new An({name:"CubemapFromEquirect",uniforms:Ci(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Rt,blending:Un});s.uniforms.tEquirect.value=t;const o=new Et(r,s),a=t.minFilter;return t.minFilter===Zn&&(t.minFilter=on),new mh(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,r);e.setRenderTarget(s)}}class mt extends ft{constructor(){super(),this.isGroup=!0,this.type="Group"}}const _h={type:"move"};class zs{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new mt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new mt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new mt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const d=t.getJointPose(_,n),f=this._getHandJoint(c,_);d!==null&&(f.matrix.fromArray(d.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=d.radius),f.visible=d!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],p=u.position.distanceTo(h.position),m=.02,g=.005;c.inputState.pinching&&p>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&p<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(_h)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new mt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class ea{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ke(e),this.near=t,this.far=n}clone(){return new ea(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class vh extends ft{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qt,this.environmentIntensity=1,this.environmentRotation=new qt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class xh extends Tt{constructor(e=null,t=1,n=1,r,s,o,a,l,c=zt,u=zt,h,p){super(null,o,a,l,c,u,r,s,h,p),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Wa extends It{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const _i=new st,Xa=new st,Ur=[],qa=new En,Mh=new st,Gi=new Et,Wi=new Ui;class ts extends Et{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Wa(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,Mh)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new En),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,_i),qa.copy(e.boundingBox).applyMatrix4(_i),this.boundingBox.union(qa)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ui),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,_i),Wi.copy(e.boundingSphere).applyMatrix4(_i),this.boundingSphere.union(Wi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=r[o+a]}raycast(e,t){const n=this.matrixWorld,r=this.count;if(Gi.geometry=this.geometry,Gi.material=this.material,Gi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Wi.copy(this.boundingSphere),Wi.applyMatrix4(n),e.ray.intersectsSphere(Wi)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,_i),Xa.multiplyMatrices(n,_i),Gi.matrixWorld=Xa,Gi.raycast(e,Ur);for(let o=0,a=Ur.length;o<a;o++){const l=Ur[o];l.instanceId=s,l.object=this,t.push(l)}Ur.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Wa(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new xh(new Float32Array(r*this.count),r,this.count,Ko,an));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=r*e;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ks=new D,Sh=new D,yh=new Ve;class Xn{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=ks.subVectors(n,t).cross(Sh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ks),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||yh.getNormalMatrix(e),r=this.coplanarPoint(ks).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Vn=new Ui,Eh=new de(.5,.5),Nr=new D;class ta{constructor(e=new Xn,t=new Xn,n=new Xn,r=new Xn,s=new Xn,o=new Xn){this.planes=[e,t,n,r,s,o]}set(e,t,n,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=cn,n=!1){const r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],h=s[5],p=s[6],m=s[7],g=s[8],_=s[9],d=s[10],f=s[11],M=s[12],v=s[13],x=s[14],R=s[15];if(r[0].setComponents(c-o,m-u,f-g,R-M).normalize(),r[1].setComponents(c+o,m+u,f+g,R+M).normalize(),r[2].setComponents(c+a,m+h,f+_,R+v).normalize(),r[3].setComponents(c-a,m-h,f-_,R-v).normalize(),n)r[4].setComponents(l,p,d,x).normalize(),r[5].setComponents(c-l,m-p,f-d,R-x).normalize();else if(r[4].setComponents(c-l,m-p,f-d,R-x).normalize(),t===cn)r[5].setComponents(c+l,m+p,f+d,R+x).normalize();else if(t===Qr)r[5].setComponents(l,p,d,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Vn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Vn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Vn)}intersectsSprite(e){Vn.center.set(0,0,0);const t=Eh.distanceTo(e.center);return Vn.radius=.7071067811865476+t,Vn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Vn)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(Nr.x=r.normal.x>0?e.max.x:e.min.x,Nr.y=r.normal.y>0?e.max.y:e.min.y,Nr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Nr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class rl extends Ni{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ke(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ns=new D,is=new D,Ya=new st,Xi=new Zc,Fr=new Ui,Hs=new D,Ka=new D;class Th extends ft{constructor(e=new xt,t=new rl){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)ns.fromBufferAttribute(t,r-1),is.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=ns.distanceTo(is);e.setAttribute("lineDistance",new Qe(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Fr.copy(n.boundingSphere),Fr.applyMatrix4(r),Fr.radius+=s,e.ray.intersectsSphere(Fr)===!1)return;Ya.copy(r).invert(),Xi.copy(e.ray).applyMatrix4(Ya);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,p=n.attributes.position;if(u!==null){const m=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=m,d=g-1;_<d;_+=c){const f=u.getX(_),M=u.getX(_+1),v=Or(this,e,Xi,l,f,M,_);v&&t.push(v)}if(this.isLineLoop){const _=u.getX(g-1),d=u.getX(m),f=Or(this,e,Xi,l,_,d,g-1);f&&t.push(f)}}else{const m=Math.max(0,o.start),g=Math.min(p.count,o.start+o.count);for(let _=m,d=g-1;_<d;_+=c){const f=Or(this,e,Xi,l,_,_+1,_);f&&t.push(f)}if(this.isLineLoop){const _=Or(this,e,Xi,l,g-1,m,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Or(i,e,t,n,r,s,o){const a=i.geometry.attributes.position;if(ns.fromBufferAttribute(a,r),is.fromBufferAttribute(a,s),t.distanceSqToSegment(ns,is,Hs,Ka)>n)return;Hs.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Hs);if(!(c<e.near||c>e.far))return{distance:c,point:Ka.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const Ja=new D,Za=new D;class Ah extends Th{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)Ja.fromBufferAttribute(t,r),Za.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Ja.distanceTo(Za);e.setAttribute("lineDistance",new Qe(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class sl extends Tt{constructor(e,t,n,r,s,o,a,l,c){super(e,t,n,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ol extends Tt{constructor(e,t,n=Qn,r,s,o,a=zt,l=zt,c,u=rr,h=1){if(u!==rr&&u!==sr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const p={width:e,height:t,depth:h};super(p,r,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Qo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class al extends Tt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class na extends xt{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);const s=[],o=[],a=[],l=[],c=new D,u=new de;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let h=0,p=3;h<=t;h++,p+=3){const m=n+h/t*r;c.x=e*Math.cos(m),c.y=e*Math.sin(m),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[p]/e+1)/2,u.y=(o[p+1]/e+1)/2,l.push(u.x,u.y)}for(let h=1;h<=t;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new Qe(o,3)),this.setAttribute("normal",new Qe(a,3)),this.setAttribute("uv",new Qe(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new na(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Sn extends xt{constructor(e=1,t=1,n=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],h=[],p=[],m=[];let g=0;const _=[],d=n/2;let f=0;M(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(u),this.setAttribute("position",new Qe(h,3)),this.setAttribute("normal",new Qe(p,3)),this.setAttribute("uv",new Qe(m,2));function M(){const x=new D,R=new D;let w=0;const C=(t-e)/n;for(let P=0;P<=s;P++){const E=[],y=P/s,L=y*(t-e)+e;for(let U=0;U<=r;U++){const V=U/r,N=V*l+a,k=Math.sin(N),K=Math.cos(N);R.x=L*k,R.y=-y*n+d,R.z=L*K,h.push(R.x,R.y,R.z),x.set(k,C,K).normalize(),p.push(x.x,x.y,x.z),m.push(V,1-y),E.push(g++)}_.push(E)}for(let P=0;P<r;P++)for(let E=0;E<s;E++){const y=_[E][P],L=_[E+1][P],U=_[E+1][P+1],V=_[E][P+1];(e>0||E!==0)&&(u.push(y,L,V),w+=3),(t>0||E!==s-1)&&(u.push(L,U,V),w+=3)}c.addGroup(f,w,0),f+=w}function v(x){const R=g,w=new de,C=new D;let P=0;const E=x===!0?e:t,y=x===!0?1:-1;for(let U=1;U<=r;U++)h.push(0,d*y,0),p.push(0,y,0),m.push(.5,.5),g++;const L=g;for(let U=0;U<=r;U++){const N=U/r*l+a,k=Math.cos(N),K=Math.sin(N);C.x=E*K,C.y=d*y,C.z=E*k,h.push(C.x,C.y,C.z),p.push(0,y,0),w.x=k*.5+.5,w.y=K*.5*y+.5,m.push(w.x,w.y),g++}for(let U=0;U<r;U++){const V=R+U,N=L+U;x===!0?u.push(N,N+1,V):u.push(N+1,N,V),P+=3}c.addGroup(f,P,x===!0?1:2),f+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Sn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class rs extends Sn{constructor(e=1,t=1,n=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,n,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new rs(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ia extends xt{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};const s=[],o=[];a(r),c(n),u(),this.setAttribute("position",new Qe(s,3)),this.setAttribute("normal",new Qe(s.slice(),3)),this.setAttribute("uv",new Qe(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(M){const v=new D,x=new D,R=new D;for(let w=0;w<t.length;w+=3)m(t[w+0],v),m(t[w+1],x),m(t[w+2],R),l(v,x,R,M)}function l(M,v,x,R){const w=R+1,C=[];for(let P=0;P<=w;P++){C[P]=[];const E=M.clone().lerp(x,P/w),y=v.clone().lerp(x,P/w),L=w-P;for(let U=0;U<=L;U++)U===0&&P===w?C[P][U]=E:C[P][U]=E.clone().lerp(y,U/L)}for(let P=0;P<w;P++)for(let E=0;E<2*(w-P)-1;E++){const y=Math.floor(E/2);E%2===0?(p(C[P][y+1]),p(C[P+1][y]),p(C[P][y])):(p(C[P][y+1]),p(C[P+1][y+1]),p(C[P+1][y]))}}function c(M){const v=new D;for(let x=0;x<s.length;x+=3)v.x=s[x+0],v.y=s[x+1],v.z=s[x+2],v.normalize().multiplyScalar(M),s[x+0]=v.x,s[x+1]=v.y,s[x+2]=v.z}function u(){const M=new D;for(let v=0;v<s.length;v+=3){M.x=s[v+0],M.y=s[v+1],M.z=s[v+2];const x=d(M)/2/Math.PI+.5,R=f(M)/Math.PI+.5;o.push(x,1-R)}g(),h()}function h(){for(let M=0;M<o.length;M+=6){const v=o[M+0],x=o[M+2],R=o[M+4],w=Math.max(v,x,R),C=Math.min(v,x,R);w>.9&&C<.1&&(v<.2&&(o[M+0]+=1),x<.2&&(o[M+2]+=1),R<.2&&(o[M+4]+=1))}}function p(M){s.push(M.x,M.y,M.z)}function m(M,v){const x=M*3;v.x=e[x+0],v.y=e[x+1],v.z=e[x+2]}function g(){const M=new D,v=new D,x=new D,R=new D,w=new de,C=new de,P=new de;for(let E=0,y=0;E<s.length;E+=9,y+=6){M.set(s[E+0],s[E+1],s[E+2]),v.set(s[E+3],s[E+4],s[E+5]),x.set(s[E+6],s[E+7],s[E+8]),w.set(o[y+0],o[y+1]),C.set(o[y+2],o[y+3]),P.set(o[y+4],o[y+5]),R.copy(M).add(v).add(x).divideScalar(3);const L=d(R);_(w,y+0,M,L),_(C,y+2,v,L),_(P,y+4,x,L)}}function _(M,v,x,R){R<0&&M.x===1&&(o[v]=M.x-1),x.x===0&&x.z===0&&(o[v]=R/2/Math.PI+.5)}function d(M){return Math.atan2(M.z,-M.x)}function f(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ia(e.vertices,e.indices,e.radius,e.details)}}class hn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,r=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let r=0;const s=n.length;let o;t?o=t:o=e*n[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=n[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,n[r]===o)return r/(s-1);const u=n[r],p=n[r+1]-u,m=(o-u)/p;return(r+m)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=t||(o.isVector2?new de:new D);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new D,r=[],s=[],o=[],a=new D,l=new st;for(let m=0;m<=e;m++){const g=m/e;r[m]=this.getTangentAt(g,new D)}s[0]=new D,o[0]=new D;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),h=Math.abs(r[0].y),p=Math.abs(r[0].z);u<=c&&(c=u,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),p<=c&&n.set(0,0,1),a.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let m=1;m<=e;m++){if(s[m]=s[m-1].clone(),o[m]=o[m-1].clone(),a.crossVectors(r[m-1],r[m]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(qe(r[m-1].dot(r[m]),-1,1));s[m].applyMatrix4(l.makeRotationAxis(a,g))}o[m].crossVectors(r[m],s[m])}if(t===!0){let m=Math.acos(qe(s[0].dot(s[e]),-1,1));m/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(m=-m);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],m*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class ra extends hn{constructor(e=0,t=0,n=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new de){const n=t,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),p=l-this.aX,m=c-this.aY;l=p*u-m*h+this.aX,c=p*h+m*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class bh extends ra{constructor(e,t,n,r,s,o){super(e,t,n,n,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function sa(){let i=0,e=0,t=0,n=0;function r(s,o,a,l){i=s,e=a,t=-3*s+3*o-2*a-l,n=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,u,h){let p=(o-s)/c-(a-s)/(c+u)+(a-o)/u,m=(a-o)/u-(l-o)/(u+h)+(l-a)/h;p*=u,m*=u,r(o,a,p,m)},calc:function(s){const o=s*s,a=o*s;return i+e*s+t*o+n*a}}}const Br=new D,Vs=new sa,Gs=new sa,Ws=new sa;class cl extends hn{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new D){const n=t,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,u;this.closed||a>0?c=r[(a-1)%s]:(Br.subVectors(r[0],r[1]).add(r[0]),c=Br);const h=r[a%s],p=r[(a+1)%s];if(this.closed||a+2<s?u=r[(a+2)%s]:(Br.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=Br),this.curveType==="centripetal"||this.curveType==="chordal"){const m=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(h),m),_=Math.pow(h.distanceToSquared(p),m),d=Math.pow(p.distanceToSquared(u),m);_<1e-4&&(_=1),g<1e-4&&(g=_),d<1e-4&&(d=_),Vs.initNonuniformCatmullRom(c.x,h.x,p.x,u.x,g,_,d),Gs.initNonuniformCatmullRom(c.y,h.y,p.y,u.y,g,_,d),Ws.initNonuniformCatmullRom(c.z,h.z,p.z,u.z,g,_,d)}else this.curveType==="catmullrom"&&(Vs.initCatmullRom(c.x,h.x,p.x,u.x,this.tension),Gs.initCatmullRom(c.y,h.y,p.y,u.y,this.tension),Ws.initCatmullRom(c.z,h.z,p.z,u.z,this.tension));return n.set(Vs.calc(l),Gs.calc(l),Ws.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new D().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function ja(i,e,t,n,r){const s=(n-e)*.5,o=(r-t)*.5,a=i*i,l=i*a;return(2*t-2*n+s+o)*l+(-3*t+3*n-2*s-o)*a+s*i+t}function wh(i,e){const t=1-i;return t*t*e}function Rh(i,e){return 2*(1-i)*i*e}function Ch(i,e){return i*i*e}function $i(i,e,t,n){return wh(i,e)+Rh(i,t)+Ch(i,n)}function Ph(i,e){const t=1-i;return t*t*t*e}function Lh(i,e){const t=1-i;return 3*t*t*i*e}function Dh(i,e){return 3*(1-i)*i*i*e}function Ih(i,e){return i*i*i*e}function Qi(i,e,t,n,r){return Ph(i,e)+Lh(i,t)+Dh(i,n)+Ih(i,r)}class ll extends hn{constructor(e=new de,t=new de,n=new de,r=new de){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new de){const n=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Qi(e,r.x,s.x,o.x,a.x),Qi(e,r.y,s.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Uh extends hn{constructor(e=new D,t=new D,n=new D,r=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new D){const n=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Qi(e,r.x,s.x,o.x,a.x),Qi(e,r.y,s.y,o.y,a.y),Qi(e,r.z,s.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class ul extends hn{constructor(e=new de,t=new de){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new de){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new de){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Nh extends hn{constructor(e=new D,t=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new D){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new D){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class hl extends hn{constructor(e=new de,t=new de,n=new de){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new de){const n=t,r=this.v0,s=this.v1,o=this.v2;return n.set($i(e,r.x,s.x,o.x),$i(e,r.y,s.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class fl extends hn{constructor(e=new D,t=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new D){const n=t,r=this.v0,s=this.v1,o=this.v2;return n.set($i(e,r.x,s.x,o.x),$i(e,r.y,s.y,o.y),$i(e,r.z,s.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class dl extends hn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new de){const n=t,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],c=r[o],u=r[o>r.length-2?r.length-1:o+1],h=r[o>r.length-3?r.length-1:o+2];return n.set(ja(a,l.x,c.x,u.x,h.x),ja(a,l.y,c.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new de().fromArray(r))}return this}}var ss=Object.freeze({__proto__:null,ArcCurve:bh,CatmullRomCurve3:cl,CubicBezierCurve:ll,CubicBezierCurve3:Uh,EllipseCurve:ra,LineCurve:ul,LineCurve3:Nh,QuadraticBezierCurve:hl,QuadraticBezierCurve3:fl,SplineCurve:dl});class Fh extends hn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ss[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=n){const o=r[s]-n,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const r=e.curves[t];this.curves.push(new ss[r.type]().fromJSON(r))}return this}}class $a extends Fh{constructor(e){super(),this.type="Path",this.currentPoint=new de,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new ul(this.currentPoint.clone(),new de(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){const s=new hl(this.currentPoint.clone(),new de(e,t),new de(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,o){const a=new ll(this.currentPoint.clone(),new de(e,t),new de(n,r),new de(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new dl(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,r,s,o),this}absarc(e,t,n,r,s,o){return this.absellipse(e,t,n,n,r,s,o),this}ellipse(e,t,n,r,s,o,a,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,r,s,o,a,l),this}absellipse(e,t,n,r,s,o,a,l){const c=new ra(e,t,n,r,s,o,a,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class pl extends $a{constructor(e){super(e),this.uuid=ni(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const r=e.holes[t];this.holes.push(new $a().fromJSON(r))}return this}}function Oh(i,e,t=2){const n=e&&e.length,r=n?e[0]*t:i.length;let s=ml(i,0,r,t,!0);const o=[];if(!s||s.next===s.prev)return o;let a,l,c;if(n&&(s=Vh(i,e,s,t)),i.length>80*t){a=1/0,l=1/0;let u=-1/0,h=-1/0;for(let p=t;p<r;p+=t){const m=i[p],g=i[p+1];m<a&&(a=m),g<l&&(l=g),m>u&&(u=m),g>h&&(h=g)}c=Math.max(u-a,h-l),c=c!==0?32767/c:0}return cr(s,o,t,a,l,c,0),o}function ml(i,e,t,n,r){let s;if(r===Qh(i,e,t,n)>0)for(let o=e;o<t;o+=n)s=Qa(o/n|0,i[o],i[o+1],s);else for(let o=t-n;o>=e;o-=n)s=Qa(o/n|0,i[o],i[o+1],s);return s&&Pi(s,s.next)&&(ur(s),s=s.next),s}function ti(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Pi(t,t.next)||lt(t.prev,t,t.next)===0)){if(ur(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function cr(i,e,t,n,r,s,o){if(!i)return;!o&&s&&Yh(i,n,r,s);let a=i;for(;i.prev!==i.next;){const l=i.prev,c=i.next;if(s?zh(i,n,r,s):Bh(i)){e.push(l.i,i.i,c.i),ur(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=kh(ti(i),e),cr(i,e,t,n,r,s,2)):o===2&&Hh(i,e,t,n,r,s):cr(ti(i),e,t,n,r,s,1);break}}}function Bh(i){const e=i.prev,t=i,n=i.next;if(lt(e,t,n)>=0)return!1;const r=e.x,s=t.x,o=n.x,a=e.y,l=t.y,c=n.y,u=Math.min(r,s,o),h=Math.min(a,l,c),p=Math.max(r,s,o),m=Math.max(a,l,c);let g=n.next;for(;g!==e;){if(g.x>=u&&g.x<=p&&g.y>=h&&g.y<=m&&Ki(r,a,s,l,o,c,g.x,g.y)&&lt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function zh(i,e,t,n){const r=i.prev,s=i,o=i.next;if(lt(r,s,o)>=0)return!1;const a=r.x,l=s.x,c=o.x,u=r.y,h=s.y,p=o.y,m=Math.min(a,l,c),g=Math.min(u,h,p),_=Math.max(a,l,c),d=Math.max(u,h,p),f=ko(m,g,e,t,n),M=ko(_,d,e,t,n);let v=i.prevZ,x=i.nextZ;for(;v&&v.z>=f&&x&&x.z<=M;){if(v.x>=m&&v.x<=_&&v.y>=g&&v.y<=d&&v!==r&&v!==o&&Ki(a,u,l,h,c,p,v.x,v.y)&&lt(v.prev,v,v.next)>=0||(v=v.prevZ,x.x>=m&&x.x<=_&&x.y>=g&&x.y<=d&&x!==r&&x!==o&&Ki(a,u,l,h,c,p,x.x,x.y)&&lt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;v&&v.z>=f;){if(v.x>=m&&v.x<=_&&v.y>=g&&v.y<=d&&v!==r&&v!==o&&Ki(a,u,l,h,c,p,v.x,v.y)&&lt(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;x&&x.z<=M;){if(x.x>=m&&x.x<=_&&x.y>=g&&x.y<=d&&x!==r&&x!==o&&Ki(a,u,l,h,c,p,x.x,x.y)&&lt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function kh(i,e){let t=i;do{const n=t.prev,r=t.next.next;!Pi(n,r)&&_l(n,t,t.next,r)&&lr(n,r)&&lr(r,n)&&(e.push(n.i,t.i,r.i),ur(t),ur(t.next),t=i=r),t=t.next}while(t!==i);return ti(t)}function Hh(i,e,t,n,r,s){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Zh(o,a)){let l=vl(o,a);o=ti(o,o.next),l=ti(l,l.next),cr(o,e,t,n,r,s,0),cr(l,e,t,n,r,s,0);return}a=a.next}o=o.next}while(o!==i)}function Vh(i,e,t,n){const r=[];for(let s=0,o=e.length;s<o;s++){const a=e[s]*n,l=s<o-1?e[s+1]*n:i.length,c=ml(i,a,l,n,!1);c===c.next&&(c.steiner=!0),r.push(Jh(c))}r.sort(Gh);for(let s=0;s<r.length;s++)t=Wh(r[s],t);return t}function Gh(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=n-r}return t}function Wh(i,e){const t=Xh(i,e);if(!t)return e;const n=vl(t,i);return ti(n,n.next),ti(t,t.next)}function Xh(i,e){let t=e;const n=i.x,r=i.y;let s=-1/0,o;if(Pi(i,t))return t;do{if(Pi(i,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){const h=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=n&&h>s&&(s=h,o=t.x<t.next.x?t:t.next,h===n))return o}t=t.next}while(t!==e);if(!o)return null;const a=o,l=o.x,c=o.y;let u=1/0;t=o;do{if(n>=t.x&&t.x>=l&&n!==t.x&&gl(r<c?n:s,r,l,c,r<c?s:n,r,t.x,t.y)){const h=Math.abs(r-t.y)/(n-t.x);lr(t,i)&&(h<u||h===u&&(t.x>o.x||t.x===o.x&&qh(o,t)))&&(o=t,u=h)}t=t.next}while(t!==a);return o}function qh(i,e){return lt(i.prev,i,e.prev)<0&&lt(e.next,i,i.next)<0}function Yh(i,e,t,n){let r=i;do r.z===0&&(r.z=ko(r.x,r.y,e,t,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,Kh(r)}function Kh(i){let e,t=1;do{let n=i,r;i=null;let s=null;for(e=0;n;){e++;let o=n,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(r=n,n=n.nextZ,a--):(r=o,o=o.nextZ,l--),s?s.nextZ=r:i=r,r.prevZ=s,s=r;n=o}s.nextZ=null,t*=2}while(e>1);return i}function ko(i,e,t,n,r){return i=(i-t)*r|0,e=(e-n)*r|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Jh(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function gl(i,e,t,n,r,s,o,a){return(r-o)*(e-a)>=(i-o)*(s-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(s-a)>=(r-o)*(n-a)}function Ki(i,e,t,n,r,s,o,a){return!(i===o&&e===a)&&gl(i,e,t,n,r,s,o,a)}function Zh(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!jh(i,e)&&(lr(i,e)&&lr(e,i)&&$h(i,e)&&(lt(i.prev,i,e.prev)||lt(i,e.prev,e))||Pi(i,e)&&lt(i.prev,i,i.next)>0&&lt(e.prev,e,e.next)>0)}function lt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Pi(i,e){return i.x===e.x&&i.y===e.y}function _l(i,e,t,n){const r=kr(lt(i,e,t)),s=kr(lt(i,e,n)),o=kr(lt(t,n,i)),a=kr(lt(t,n,e));return!!(r!==s&&o!==a||r===0&&zr(i,t,e)||s===0&&zr(i,n,e)||o===0&&zr(t,i,n)||a===0&&zr(t,e,n))}function zr(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function kr(i){return i>0?1:i<0?-1:0}function jh(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&_l(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function lr(i,e){return lt(i.prev,i,i.next)<0?lt(i,e,i.next)>=0&&lt(i,i.prev,e)>=0:lt(i,e,i.prev)<0||lt(i,i.next,e)<0}function $h(i,e){let t=i,n=!1;const r=(i.x+e.x)/2,s=(i.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function vl(i,e){const t=Ho(i.i,i.x,i.y),n=Ho(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Qa(i,e,t,n){const r=Ho(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function ur(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Ho(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Qh(i,e,t,n){let r=0;for(let s=e,o=t-n;s<t;s+=n)r+=(i[o]-i[s])*(i[s+1]+i[o+1]),o=s;return r}class ef{static triangulate(e,t,n=2){return Oh(e,t,n)}}class Mi{static area(e){const t=e.length;let n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return n*.5}static isClockWise(e){return Mi.area(e)<0}static triangulateShape(e,t){const n=[],r=[],s=[];ec(e),tc(n,e);let o=e.length;t.forEach(ec);for(let l=0;l<t.length;l++)r.push(o),o+=t[l].length,tc(n,t[l]);const a=ef.triangulate(n,r);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function ec(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function tc(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class oa extends xt{constructor(e=new pl([new de(.5,.5),new de(-.5,.5),new de(-.5,-.5),new de(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,r=[],s=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];o(c)}this.setAttribute("position",new Qe(r,3)),this.setAttribute("uv",new Qe(s,2)),this.computeVertexNormals();function o(a){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,h=t.depth!==void 0?t.depth:1;let p=t.bevelEnabled!==void 0?t.bevelEnabled:!0,m=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:m-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,d=t.bevelSegments!==void 0?t.bevelSegments:3;const f=t.extrudePath,M=t.UVGenerator!==void 0?t.UVGenerator:tf;let v,x=!1,R,w,C,P;f&&(v=f.getSpacedPoints(u),x=!0,p=!1,R=f.computeFrenetFrames(u,!1),w=new D,C=new D,P=new D),p||(d=0,m=0,g=0,_=0);const E=a.extractPoints(c);let y=E.shape;const L=E.holes;if(!Mi.isClockWise(y)){y=y.reverse();for(let $=0,H=L.length;$<H;$++){const O=L[$];Mi.isClockWise(O)&&(L[$]=O.reverse())}}function V($){const O=10000000000000001e-36;let Y=$[0];for(let oe=1;oe<=$.length;oe++){const ne=oe%$.length,ue=$[ne],ze=ue.x-Y.x,Ne=ue.y-Y.y,A=ze*ze+Ne*Ne,S=Math.max(Math.abs(ue.x),Math.abs(ue.y),Math.abs(Y.x),Math.abs(Y.y)),F=O*S*S;if(A<=F){$.splice(ne,1),oe--;continue}Y=ue}}V(y),L.forEach(V);const N=L.length,k=y;for(let $=0;$<N;$++){const H=L[$];y=y.concat(H)}function K($,H,O){return H||console.error("THREE.ExtrudeGeometry: vec does not exist"),$.clone().addScaledVector(H,O)}const j=y.length;function G($,H,O){let Y,oe,ne;const ue=$.x-H.x,ze=$.y-H.y,Ne=O.x-$.x,A=O.y-$.y,S=ue*ue+ze*ze,F=ue*A-ze*Ne;if(Math.abs(F)>Number.EPSILON){const X=Math.sqrt(S),ee=Math.sqrt(Ne*Ne+A*A),J=H.x-ze/X,Re=H.y+ue/X,he=O.x-A/ee,Ae=O.y+Ne/ee,be=((he-J)*A-(Ae-Re)*Ne)/(ue*A-ze*Ne);Y=J+ue*be-$.x,oe=Re+ze*be-$.y;const ie=Y*Y+oe*oe;if(ie<=2)return new de(Y,oe);ne=Math.sqrt(ie/2)}else{let X=!1;ue>Number.EPSILON?Ne>Number.EPSILON&&(X=!0):ue<-Number.EPSILON?Ne<-Number.EPSILON&&(X=!0):Math.sign(ze)===Math.sign(A)&&(X=!0),X?(Y=-ze,oe=ue,ne=Math.sqrt(S)):(Y=ue,oe=ze,ne=Math.sqrt(S/2))}return new de(Y/ne,oe/ne)}const ce=[];for(let $=0,H=k.length,O=H-1,Y=$+1;$<H;$++,O++,Y++)O===H&&(O=0),Y===H&&(Y=0),ce[$]=G(k[$],k[O],k[Y]);const pe=[];let xe,le=ce.concat();for(let $=0,H=N;$<H;$++){const O=L[$];xe=[];for(let Y=0,oe=O.length,ne=oe-1,ue=Y+1;Y<oe;Y++,ne++,ue++)ne===oe&&(ne=0),ue===oe&&(ue=0),xe[Y]=G(O[Y],O[ne],O[ue]);pe.push(xe),le=le.concat(xe)}let Ie;if(d===0)Ie=Mi.triangulateShape(k,L);else{const $=[],H=[];for(let O=0;O<d;O++){const Y=O/d,oe=m*Math.cos(Y*Math.PI/2),ne=g*Math.sin(Y*Math.PI/2)+_;for(let ue=0,ze=k.length;ue<ze;ue++){const Ne=K(k[ue],ce[ue],ne);Ce(Ne.x,Ne.y,-oe),Y===0&&$.push(Ne)}for(let ue=0,ze=N;ue<ze;ue++){const Ne=L[ue];xe=pe[ue];const A=[];for(let S=0,F=Ne.length;S<F;S++){const X=K(Ne[S],xe[S],ne);Ce(X.x,X.y,-oe),Y===0&&A.push(X)}Y===0&&H.push(A)}}Ie=Mi.triangulateShape($,H)}const We=Ie.length,Le=g+_;for(let $=0;$<j;$++){const H=p?K(y[$],le[$],Le):y[$];x?(C.copy(R.normals[0]).multiplyScalar(H.x),w.copy(R.binormals[0]).multiplyScalar(H.y),P.copy(v[0]).add(C).add(w),Ce(P.x,P.y,P.z)):Ce(H.x,H.y,0)}for(let $=1;$<=u;$++)for(let H=0;H<j;H++){const O=p?K(y[H],le[H],Le):y[H];x?(C.copy(R.normals[$]).multiplyScalar(O.x),w.copy(R.binormals[$]).multiplyScalar(O.y),P.copy(v[$]).add(C).add(w),Ce(P.x,P.y,P.z)):Ce(O.x,O.y,h/u*$)}for(let $=d-1;$>=0;$--){const H=$/d,O=m*Math.cos(H*Math.PI/2),Y=g*Math.sin(H*Math.PI/2)+_;for(let oe=0,ne=k.length;oe<ne;oe++){const ue=K(k[oe],ce[oe],Y);Ce(ue.x,ue.y,h+O)}for(let oe=0,ne=L.length;oe<ne;oe++){const ue=L[oe];xe=pe[oe];for(let ze=0,Ne=ue.length;ze<Ne;ze++){const A=K(ue[ze],xe[ze],Y);x?Ce(A.x,A.y+v[u-1].y,v[u-1].x+O):Ce(A.x,A.y,h+O)}}}Z(),te();function Z(){const $=r.length/3;if(p){let H=0,O=j*H;for(let Y=0;Y<We;Y++){const oe=Ie[Y];Ee(oe[2]+O,oe[1]+O,oe[0]+O)}H=u+d*2,O=j*H;for(let Y=0;Y<We;Y++){const oe=Ie[Y];Ee(oe[0]+O,oe[1]+O,oe[2]+O)}}else{for(let H=0;H<We;H++){const O=Ie[H];Ee(O[2],O[1],O[0])}for(let H=0;H<We;H++){const O=Ie[H];Ee(O[0]+j*u,O[1]+j*u,O[2]+j*u)}}n.addGroup($,r.length/3-$,0)}function te(){const $=r.length/3;let H=0;Me(k,H),H+=k.length;for(let O=0,Y=L.length;O<Y;O++){const oe=L[O];Me(oe,H),H+=oe.length}n.addGroup($,r.length/3-$,1)}function Me($,H){let O=$.length;for(;--O>=0;){const Y=O;let oe=O-1;oe<0&&(oe=$.length-1);for(let ne=0,ue=u+d*2;ne<ue;ne++){const ze=j*ne,Ne=j*(ne+1),A=H+Y+ze,S=H+oe+ze,F=H+oe+Ne,X=H+Y+Ne;Xe(A,S,F,X)}}}function Ce($,H,O){l.push($),l.push(H),l.push(O)}function Ee($,H,O){je($),je(H),je(O);const Y=r.length/3,oe=M.generateTopUV(n,r,Y-3,Y-2,Y-1);b(oe[0]),b(oe[1]),b(oe[2])}function Xe($,H,O,Y){je($),je(H),je(Y),je(H),je(O),je(Y);const oe=r.length/3,ne=M.generateSideWallUV(n,r,oe-6,oe-3,oe-2,oe-1);b(ne[0]),b(ne[1]),b(ne[3]),b(ne[1]),b(ne[2]),b(ne[3])}function je($){r.push(l[$*3+0]),r.push(l[$*3+1]),r.push(l[$*3+2])}function b($){s.push($.x),s.push($.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return nf(t,n,e)}static fromJSON(e,t){const n=[];for(let s=0,o=e.shapes.length;s<o;s++){const a=t[e.shapes[s]];n.push(a)}const r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new ss[r.type]().fromJSON(r)),new oa(n,e.options)}}const tf={generateTopUV:function(i,e,t,n,r){const s=e[t*3],o=e[t*3+1],a=e[n*3],l=e[n*3+1],c=e[r*3],u=e[r*3+1];return[new de(s,o),new de(a,l),new de(c,u)]},generateSideWallUV:function(i,e,t,n,r,s){const o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[n*3],u=e[n*3+1],h=e[n*3+2],p=e[r*3],m=e[r*3+1],g=e[r*3+2],_=e[s*3],d=e[s*3+1],f=e[s*3+2];return Math.abs(a-u)<Math.abs(o-c)?[new de(o,1-l),new de(c,1-h),new de(p,1-g),new de(_,1-f)]:[new de(a,1-l),new de(u,1-h),new de(m,1-g),new de(d,1-f)]}};function nf(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,r=i.length;n<r;n++){const s=i[n];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class os extends ia{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new os(e.radius,e.detail)}}class dr extends xt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(r),c=a+1,u=l+1,h=e/a,p=t/l,m=[],g=[],_=[],d=[];for(let f=0;f<u;f++){const M=f*p-o;for(let v=0;v<c;v++){const x=v*h-s;g.push(x,-M,0),_.push(0,0,1),d.push(v/a),d.push(1-f/l)}}for(let f=0;f<l;f++)for(let M=0;M<a;M++){const v=M+c*f,x=M+c*(f+1),R=M+1+c*(f+1),w=M+1+c*f;m.push(v,x,w),m.push(x,R,w)}this.setIndex(m),this.setAttribute("position",new Qe(g,3)),this.setAttribute("normal",new Qe(_,3)),this.setAttribute("uv",new Qe(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new dr(e.width,e.height,e.widthSegments,e.heightSegments)}}class fs extends xt{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const u=[],h=new D,p=new D,m=[],g=[],_=[],d=[];for(let f=0;f<=n;f++){const M=[],v=f/n;let x=0;f===0&&o===0?x=.5/t:f===n&&l===Math.PI&&(x=-.5/t);for(let R=0;R<=t;R++){const w=R/t;h.x=-e*Math.cos(r+w*s)*Math.sin(o+v*a),h.y=e*Math.cos(o+v*a),h.z=e*Math.sin(r+w*s)*Math.sin(o+v*a),g.push(h.x,h.y,h.z),p.copy(h).normalize(),_.push(p.x,p.y,p.z),d.push(w+x,1-v),M.push(c++)}u.push(M)}for(let f=0;f<n;f++)for(let M=0;M<t;M++){const v=u[f][M+1],x=u[f][M],R=u[f+1][M],w=u[f+1][M+1];(f!==0||o>0)&&m.push(v,x,w),(f!==n-1||l<Math.PI)&&m.push(x,R,w)}this.setIndex(m),this.setAttribute("position",new Qe(g,3)),this.setAttribute("normal",new Qe(_,3)),this.setAttribute("uv",new Qe(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fs(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class er extends xt{constructor(e=1,t=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);const o=[],a=[],l=[],c=[],u=new D,h=new D,p=new D;for(let m=0;m<=n;m++)for(let g=0;g<=r;g++){const _=g/r*s,d=m/n*Math.PI*2;h.x=(e+t*Math.cos(d))*Math.cos(_),h.y=(e+t*Math.cos(d))*Math.sin(_),h.z=t*Math.sin(d),a.push(h.x,h.y,h.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),p.subVectors(h,u).normalize(),l.push(p.x,p.y,p.z),c.push(g/r),c.push(m/n)}for(let m=1;m<=n;m++)for(let g=1;g<=r;g++){const _=(r+1)*m+g-1,d=(r+1)*(m-1)+g-1,f=(r+1)*(m-1)+g,M=(r+1)*m+g;o.push(_,d,M),o.push(d,f,M)}this.setIndex(o),this.setAttribute("position",new Qe(a,3)),this.setAttribute("normal",new Qe(l,3)),this.setAttribute("uv",new Qe(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new er(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class aa extends xt{constructor(e=new fl(new D(-1,-1,0),new D(-1,1,0),new D(1,1,0)),t=64,n=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:s};const o=e.computeFrenetFrames(t,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new D,l=new D,c=new de;let u=new D;const h=[],p=[],m=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new Qe(h,3)),this.setAttribute("normal",new Qe(p,3)),this.setAttribute("uv",new Qe(m,2));function _(){for(let v=0;v<t;v++)d(v);d(s===!1?t:0),M(),f()}function d(v){u=e.getPointAt(v/t,u);const x=o.normals[v],R=o.binormals[v];for(let w=0;w<=r;w++){const C=w/r*Math.PI*2,P=Math.sin(C),E=-Math.cos(C);l.x=E*x.x+P*R.x,l.y=E*x.y+P*R.y,l.z=E*x.z+P*R.z,l.normalize(),p.push(l.x,l.y,l.z),a.x=u.x+n*l.x,a.y=u.y+n*l.y,a.z=u.z+n*l.z,h.push(a.x,a.y,a.z)}}function f(){for(let v=1;v<=t;v++)for(let x=1;x<=r;x++){const R=(r+1)*(v-1)+(x-1),w=(r+1)*v+(x-1),C=(r+1)*v+x,P=(r+1)*(v-1)+x;g.push(R,w,P),g.push(w,C,P)}}function M(){for(let v=0;v<=t;v++)for(let x=0;x<=r;x++)c.x=v/t,c.y=x/r,m.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new aa(new ss[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class Zt extends Ni{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ke(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ke(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=qc,this.normalScale=new de(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class rf extends Ni{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Mu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class sf extends Ni{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class xl extends ft{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ke(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class of extends xl{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ke(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Xs=new st,nc=new D,ic=new D;class af{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new de(512,512),this.mapType=ln,this.map=null,this.mapPass=null,this.matrix=new st,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ta,this._frameExtents=new de(1,1),this._viewportCount=1,this._viewports=[new ht(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;nc.setFromMatrixPosition(e.matrixWorld),t.position.copy(nc),ic.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ic),t.updateMatrixWorld(),Xs.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Xs,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Xs)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Ml extends nl{constructor(e=-1,t=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class cf extends af{constructor(){super(new Ml(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class lf extends xl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.target=new ft,this.shadow=new cf}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class uf extends Wt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}function rc(i,e,t,n){const r=hf(n);switch(t){case Gc:return i*e;case Ko:return i*e/r.components*r.byteLength;case Jo:return i*e/r.components*r.byteLength;case Xc:return i*e*2/r.components*r.byteLength;case Zo:return i*e*2/r.components*r.byteLength;case Wc:return i*e*3/r.components*r.byteLength;case Qt:return i*e*4/r.components*r.byteLength;case jo:return i*e*4/r.components*r.byteLength;case Wr:case Xr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case qr:case Yr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ho:case po:return Math.max(i,16)*Math.max(e,8)/4;case uo:case fo:return Math.max(i,8)*Math.max(e,8)/2;case mo:case go:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case _o:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case vo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case xo:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Mo:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case So:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case yo:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Eo:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case To:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ao:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case bo:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case wo:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ro:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Co:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Po:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Lo:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Do:case Io:case Uo:return Math.ceil(i/4)*Math.ceil(e/4)*16;case No:case Fo:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Oo:case Bo:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function hf(i){switch(i){case ln:case zc:return{byteLength:1,components:1};case nr:case kc:case fr:return{byteLength:2,components:1};case qo:case Yo:return{byteLength:2,components:4};case Qn:case Xo:case an:return{byteLength:4,components:1};case Hc:case Vc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Wo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Wo);function Sl(){let i=null,e=!1,t=null,n=null;function r(s,o){t(s,o),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function ff(i){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,h=c.byteLength,p=i.createBuffer();i.bindBuffer(l,p),i.bufferData(l,c,u),a.onUploadCallback();let m;if(c instanceof Float32Array)m=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)m=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=i.SHORT;else if(c instanceof Uint32Array)m=i.UNSIGNED_INT;else if(c instanceof Int32Array)m=i.INT;else if(c instanceof Int8Array)m=i.BYTE;else if(c instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:p,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,l,c){const u=l.array,h=l.updateRanges;if(i.bindBuffer(c,a),h.length===0)i.bufferSubData(c,0,u);else{h.sort((m,g)=>m.start-g.start);let p=0;for(let m=1;m<h.length;m++){const g=h[p],_=h[m];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++p,h[p]=_)}h.length=p+1;for(let m=0,g=h.length;m<g;m++){const _=h[m];i.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var df=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,pf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,mf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,gf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_f=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,vf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,xf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Mf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Sf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,yf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ef=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Tf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Af=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,bf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,wf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Rf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Cf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Pf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Lf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Df=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,If=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Uf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Nf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Ff=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Of=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Bf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,zf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,kf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Hf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Vf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Gf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Wf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Xf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,qf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Yf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Kf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Jf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Zf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,jf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,$f=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Qf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ed=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,td=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,nd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,id=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,rd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,sd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,od=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ad=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,cd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ld=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ud=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,hd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,fd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,dd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,pd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,md=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,gd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_d=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,xd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Md=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Sd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,yd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ed=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Td=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ad=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,bd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,wd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Rd=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Cd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Pd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Ld=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Dd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Id=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ud=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Nd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Fd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Od=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Bd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,zd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,kd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Hd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Vd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Gd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Wd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Xd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,qd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Yd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Kd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Jd=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Zd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,jd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,$d=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Qd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ep=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,tp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,np=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ip=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,rp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,sp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,op=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,ap=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,cp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,lp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,up=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,hp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const fp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,dp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_p=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,xp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Mp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Sp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,yp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ep=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ap=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,bp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,wp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Lp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Ip=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Up=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Np=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Op=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Hp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Vp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Wp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Xp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ge={alphahash_fragment:df,alphahash_pars_fragment:pf,alphamap_fragment:mf,alphamap_pars_fragment:gf,alphatest_fragment:_f,alphatest_pars_fragment:vf,aomap_fragment:xf,aomap_pars_fragment:Mf,batching_pars_vertex:Sf,batching_vertex:yf,begin_vertex:Ef,beginnormal_vertex:Tf,bsdfs:Af,iridescence_fragment:bf,bumpmap_pars_fragment:wf,clipping_planes_fragment:Rf,clipping_planes_pars_fragment:Cf,clipping_planes_pars_vertex:Pf,clipping_planes_vertex:Lf,color_fragment:Df,color_pars_fragment:If,color_pars_vertex:Uf,color_vertex:Nf,common:Ff,cube_uv_reflection_fragment:Of,defaultnormal_vertex:Bf,displacementmap_pars_vertex:zf,displacementmap_vertex:kf,emissivemap_fragment:Hf,emissivemap_pars_fragment:Vf,colorspace_fragment:Gf,colorspace_pars_fragment:Wf,envmap_fragment:Xf,envmap_common_pars_fragment:qf,envmap_pars_fragment:Yf,envmap_pars_vertex:Kf,envmap_physical_pars_fragment:sd,envmap_vertex:Jf,fog_vertex:Zf,fog_pars_vertex:jf,fog_fragment:$f,fog_pars_fragment:Qf,gradientmap_pars_fragment:ed,lightmap_pars_fragment:td,lights_lambert_fragment:nd,lights_lambert_pars_fragment:id,lights_pars_begin:rd,lights_toon_fragment:od,lights_toon_pars_fragment:ad,lights_phong_fragment:cd,lights_phong_pars_fragment:ld,lights_physical_fragment:ud,lights_physical_pars_fragment:hd,lights_fragment_begin:fd,lights_fragment_maps:dd,lights_fragment_end:pd,logdepthbuf_fragment:md,logdepthbuf_pars_fragment:gd,logdepthbuf_pars_vertex:_d,logdepthbuf_vertex:vd,map_fragment:xd,map_pars_fragment:Md,map_particle_fragment:Sd,map_particle_pars_fragment:yd,metalnessmap_fragment:Ed,metalnessmap_pars_fragment:Td,morphinstance_vertex:Ad,morphcolor_vertex:bd,morphnormal_vertex:wd,morphtarget_pars_vertex:Rd,morphtarget_vertex:Cd,normal_fragment_begin:Pd,normal_fragment_maps:Ld,normal_pars_fragment:Dd,normal_pars_vertex:Id,normal_vertex:Ud,normalmap_pars_fragment:Nd,clearcoat_normal_fragment_begin:Fd,clearcoat_normal_fragment_maps:Od,clearcoat_pars_fragment:Bd,iridescence_pars_fragment:zd,opaque_fragment:kd,packing:Hd,premultiplied_alpha_fragment:Vd,project_vertex:Gd,dithering_fragment:Wd,dithering_pars_fragment:Xd,roughnessmap_fragment:qd,roughnessmap_pars_fragment:Yd,shadowmap_pars_fragment:Kd,shadowmap_pars_vertex:Jd,shadowmap_vertex:Zd,shadowmask_pars_fragment:jd,skinbase_vertex:$d,skinning_pars_vertex:Qd,skinning_vertex:ep,skinnormal_vertex:tp,specularmap_fragment:np,specularmap_pars_fragment:ip,tonemapping_fragment:rp,tonemapping_pars_fragment:sp,transmission_fragment:op,transmission_pars_fragment:ap,uv_pars_fragment:cp,uv_pars_vertex:lp,uv_vertex:up,worldpos_vertex:hp,background_vert:fp,background_frag:dp,backgroundCube_vert:pp,backgroundCube_frag:mp,cube_vert:gp,cube_frag:_p,depth_vert:vp,depth_frag:xp,distanceRGBA_vert:Mp,distanceRGBA_frag:Sp,equirect_vert:yp,equirect_frag:Ep,linedashed_vert:Tp,linedashed_frag:Ap,meshbasic_vert:bp,meshbasic_frag:wp,meshlambert_vert:Rp,meshlambert_frag:Cp,meshmatcap_vert:Pp,meshmatcap_frag:Lp,meshnormal_vert:Dp,meshnormal_frag:Ip,meshphong_vert:Up,meshphong_frag:Np,meshphysical_vert:Fp,meshphysical_frag:Op,meshtoon_vert:Bp,meshtoon_frag:zp,points_vert:kp,points_frag:Hp,shadow_vert:Vp,shadow_frag:Gp,sprite_vert:Wp,sprite_frag:Xp},me={common:{diffuse:{value:new Ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new de(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new Ke(16777215)},opacity:{value:1},center:{value:new de(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},sn={basic:{uniforms:wt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:wt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Ke(0)}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:wt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Ke(0)},specular:{value:new Ke(1118481)},shininess:{value:30}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:wt([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new Ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:wt([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new Ke(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:wt([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:wt([me.points,me.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:wt([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:wt([me.common,me.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:wt([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:wt([me.sprite,me.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distanceRGBA:{uniforms:wt([me.common,me.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distanceRGBA_vert,fragmentShader:Ge.distanceRGBA_frag},shadow:{uniforms:wt([me.lights,me.fog,{color:{value:new Ke(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};sn.physical={uniforms:wt([sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new de(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new Ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new de},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new Ke(0)},specularColor:{value:new Ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new de},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const Hr={r:0,b:0,g:0},Gn=new qt,qp=new st;function Yp(i,e,t,n,r,s,o){const a=new Ke(0);let l=s===!0?0:1,c,u,h=null,p=0,m=null;function g(v){let x=v.isScene===!0?v.background:null;return x&&x.isTexture&&(x=(v.backgroundBlurriness>0?t:e).get(x)),x}function _(v){let x=!1;const R=g(v);R===null?f(a,l):R&&R.isColor&&(f(R,1),x=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function d(v,x){const R=g(x);R&&(R.isCubeTexture||R.mapping===us)?(u===void 0&&(u=new Et(new Tn(1,1,1),new An({name:"BackgroundCubeMaterial",uniforms:Ci(sn.backgroundCube.uniforms),vertexShader:sn.backgroundCube.vertexShader,fragmentShader:sn.backgroundCube.fragmentShader,side:Rt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,C,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Gn.copy(x.backgroundRotation),Gn.x*=-1,Gn.y*=-1,Gn.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(Gn.y*=-1,Gn.z*=-1),u.material.uniforms.envMap.value=R,u.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(qp.makeRotationFromEuler(Gn)),u.material.toneMapped=Ze.getTransfer(R.colorSpace)!==tt,(h!==R||p!==R.version||m!==i.toneMapping)&&(u.material.needsUpdate=!0,h=R,p=R.version,m=i.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):R&&R.isTexture&&(c===void 0&&(c=new Et(new dr(2,2),new An({name:"BackgroundMaterial",uniforms:Ci(sn.background.uniforms),vertexShader:sn.background.vertexShader,fragmentShader:sn.background.fragmentShader,side:Fn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=R,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=Ze.getTransfer(R.colorSpace)!==tt,R.matrixAutoUpdate===!0&&R.updateMatrix(),c.material.uniforms.uvTransform.value.copy(R.matrix),(h!==R||p!==R.version||m!==i.toneMapping)&&(c.material.needsUpdate=!0,h=R,p=R.version,m=i.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function f(v,x){v.getRGB(Hr,tl(i)),n.buffers.color.setClear(Hr.r,Hr.g,Hr.b,x,o)}function M(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,x=1){a.set(v),l=x,f(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,f(a,l)},render:_,addToRenderList:d,dispose:M}}function Kp(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=p(null);let s=r,o=!1;function a(y,L,U,V,N){let k=!1;const K=h(V,U,L);s!==K&&(s=K,c(s.object)),k=m(y,V,U,N),k&&g(y,V,U,N),N!==null&&e.update(N,i.ELEMENT_ARRAY_BUFFER),(k||o)&&(o=!1,x(y,L,U,V),N!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(N).buffer))}function l(){return i.createVertexArray()}function c(y){return i.bindVertexArray(y)}function u(y){return i.deleteVertexArray(y)}function h(y,L,U){const V=U.wireframe===!0;let N=n[y.id];N===void 0&&(N={},n[y.id]=N);let k=N[L.id];k===void 0&&(k={},N[L.id]=k);let K=k[V];return K===void 0&&(K=p(l()),k[V]=K),K}function p(y){const L=[],U=[],V=[];for(let N=0;N<t;N++)L[N]=0,U[N]=0,V[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:U,attributeDivisors:V,object:y,attributes:{},index:null}}function m(y,L,U,V){const N=s.attributes,k=L.attributes;let K=0;const j=U.getAttributes();for(const G in j)if(j[G].location>=0){const pe=N[G];let xe=k[G];if(xe===void 0&&(G==="instanceMatrix"&&y.instanceMatrix&&(xe=y.instanceMatrix),G==="instanceColor"&&y.instanceColor&&(xe=y.instanceColor)),pe===void 0||pe.attribute!==xe||xe&&pe.data!==xe.data)return!0;K++}return s.attributesNum!==K||s.index!==V}function g(y,L,U,V){const N={},k=L.attributes;let K=0;const j=U.getAttributes();for(const G in j)if(j[G].location>=0){let pe=k[G];pe===void 0&&(G==="instanceMatrix"&&y.instanceMatrix&&(pe=y.instanceMatrix),G==="instanceColor"&&y.instanceColor&&(pe=y.instanceColor));const xe={};xe.attribute=pe,pe&&pe.data&&(xe.data=pe.data),N[G]=xe,K++}s.attributes=N,s.attributesNum=K,s.index=V}function _(){const y=s.newAttributes;for(let L=0,U=y.length;L<U;L++)y[L]=0}function d(y){f(y,0)}function f(y,L){const U=s.newAttributes,V=s.enabledAttributes,N=s.attributeDivisors;U[y]=1,V[y]===0&&(i.enableVertexAttribArray(y),V[y]=1),N[y]!==L&&(i.vertexAttribDivisor(y,L),N[y]=L)}function M(){const y=s.newAttributes,L=s.enabledAttributes;for(let U=0,V=L.length;U<V;U++)L[U]!==y[U]&&(i.disableVertexAttribArray(U),L[U]=0)}function v(y,L,U,V,N,k,K){K===!0?i.vertexAttribIPointer(y,L,U,N,k):i.vertexAttribPointer(y,L,U,V,N,k)}function x(y,L,U,V){_();const N=V.attributes,k=U.getAttributes(),K=L.defaultAttributeValues;for(const j in k){const G=k[j];if(G.location>=0){let ce=N[j];if(ce===void 0&&(j==="instanceMatrix"&&y.instanceMatrix&&(ce=y.instanceMatrix),j==="instanceColor"&&y.instanceColor&&(ce=y.instanceColor)),ce!==void 0){const pe=ce.normalized,xe=ce.itemSize,le=e.get(ce);if(le===void 0)continue;const Ie=le.buffer,We=le.type,Le=le.bytesPerElement,Z=We===i.INT||We===i.UNSIGNED_INT||ce.gpuType===Xo;if(ce.isInterleavedBufferAttribute){const te=ce.data,Me=te.stride,Ce=ce.offset;if(te.isInstancedInterleavedBuffer){for(let Ee=0;Ee<G.locationSize;Ee++)f(G.location+Ee,te.meshPerAttribute);y.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let Ee=0;Ee<G.locationSize;Ee++)d(G.location+Ee);i.bindBuffer(i.ARRAY_BUFFER,Ie);for(let Ee=0;Ee<G.locationSize;Ee++)v(G.location+Ee,xe/G.locationSize,We,pe,Me*Le,(Ce+xe/G.locationSize*Ee)*Le,Z)}else{if(ce.isInstancedBufferAttribute){for(let te=0;te<G.locationSize;te++)f(G.location+te,ce.meshPerAttribute);y.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let te=0;te<G.locationSize;te++)d(G.location+te);i.bindBuffer(i.ARRAY_BUFFER,Ie);for(let te=0;te<G.locationSize;te++)v(G.location+te,xe/G.locationSize,We,pe,xe*Le,xe/G.locationSize*te*Le,Z)}}else if(K!==void 0){const pe=K[j];if(pe!==void 0)switch(pe.length){case 2:i.vertexAttrib2fv(G.location,pe);break;case 3:i.vertexAttrib3fv(G.location,pe);break;case 4:i.vertexAttrib4fv(G.location,pe);break;default:i.vertexAttrib1fv(G.location,pe)}}}}M()}function R(){P();for(const y in n){const L=n[y];for(const U in L){const V=L[U];for(const N in V)u(V[N].object),delete V[N];delete L[U]}delete n[y]}}function w(y){if(n[y.id]===void 0)return;const L=n[y.id];for(const U in L){const V=L[U];for(const N in V)u(V[N].object),delete V[N];delete L[U]}delete n[y.id]}function C(y){for(const L in n){const U=n[L];if(U[y.id]===void 0)continue;const V=U[y.id];for(const N in V)u(V[N].object),delete V[N];delete U[y.id]}}function P(){E(),o=!0,s!==r&&(s=r,c(s.object))}function E(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:P,resetDefaultState:E,dispose:R,releaseStatesOfGeometry:w,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:d,disableUnusedAttributes:M}}function Jp(i,e,t){let n;function r(c){n=c}function s(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,h){h!==0&&(i.drawArraysInstanced(n,c,u,h),t.update(u,n,h))}function a(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,h);let m=0;for(let g=0;g<h;g++)m+=u[g];t.update(m,n,1)}function l(c,u,h,p){if(h===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<c.length;g++)o(c[g],u[g],p[g]);else{m.multiDrawArraysInstancedWEBGL(n,c,0,u,0,p,0,h);let g=0;for(let _=0;_<h;_++)g+=u[_]*p[_];t.update(g,n,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Zp(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(C){return!(C!==Qt&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const P=C===fr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==ln&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==an&&!P)}function l(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,p=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),d=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:p,maxTextures:m,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:d,maxAttributes:f,maxVertexUniforms:M,maxVaryings:v,maxFragmentUniforms:x,vertexTextures:R,maxSamples:w}}function jp(i){const e=this;let t=null,n=0,r=!1,s=!1;const o=new Xn,a=new Ve,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,p){const m=h.length!==0||p||n!==0||r;return r=p,n=h.length,m},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,p){t=u(h,p,0)},this.setState=function(h,p,m){const g=h.clippingPlanes,_=h.clipIntersection,d=h.clipShadows,f=i.get(h);if(!r||g===null||g.length===0||s&&!d)s?u(null):c();else{const M=s?0:n,v=M*4;let x=f.clippingState||null;l.value=x,x=u(g,p,v,m);for(let R=0;R!==v;++R)x[R]=t[R];f.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,p,m,g){const _=h!==null?h.length:0;let d=null;if(_!==0){if(d=l.value,g!==!0||d===null){const f=m+_*4,M=p.matrixWorldInverse;a.getNormalMatrix(M),(d===null||d.length<f)&&(d=new Float32Array(f));for(let v=0,x=m;v!==_;++v,x+=4)o.copy(h[v]).applyMatrix4(M,a),o.normal.toArray(d,x),d[x+3]=o.constant}l.value=d,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,d}}function $p(i){let e=new WeakMap;function t(o,a){return a===ao?o.mapping=bi:a===co&&(o.mapping=wi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===ao||a===co)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new gh(l.height);return c.fromEquirectangularTexture(i,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const Si=4,sc=[.125,.215,.35,.446,.526,.582],Kn=20,qs=new Ml,oc=new Ke;let Ys=null,Ks=0,Js=0,Zs=!1;const qn=(1+Math.sqrt(5))/2,vi=1/qn,ac=[new D(-qn,vi,0),new D(qn,vi,0),new D(-vi,0,qn),new D(vi,0,qn),new D(0,qn,-vi),new D(0,qn,vi),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)],Qp=new D;class cc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100,s={}){const{size:o=256,position:a=Qp}=s;Ys=this._renderer.getRenderTarget(),Ks=this._renderer.getActiveCubeFace(),Js=this._renderer.getActiveMipmapLevel(),Zs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=uc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ys,Ks,Js),this._renderer.xr.enabled=Zs,e.scissorTest=!1,Vr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===bi||e.mapping===wi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ys=this._renderer.getRenderTarget(),Ks=this._renderer.getActiveCubeFace(),Js=this._renderer.getActiveMipmapLevel(),Zs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:on,minFilter:on,generateMipmaps:!1,type:fr,format:Qt,colorSpace:Ri,depthBuffer:!1},r=lc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=lc(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=em(s)),this._blurMaterial=tm(s,e,t)}return r}_compileMaterial(e){const t=new Et(this._lodPlanes[0],e);this._renderer.compile(t,qs)}_sceneToCubeUV(e,t,n,r,s){const l=new Wt(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,p=h.autoClear,m=h.toneMapping;h.getClearColor(oc),h.toneMapping=Nn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null));const _=new hs({name:"PMREM.Background",side:Rt,depthWrite:!1,depthTest:!1}),d=new Et(new Tn,_);let f=!1;const M=e.background;M?M.isColor&&(_.color.copy(M),e.background=null,f=!0):(_.color.copy(oc),f=!0);for(let v=0;v<6;v++){const x=v%3;x===0?(l.up.set(0,c[v],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[v],s.y,s.z)):x===1?(l.up.set(0,0,c[v]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[v],s.z)):(l.up.set(0,c[v],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[v]));const R=this._cubeSize;Vr(r,x*R,v>2?R:0,R,R),h.setRenderTarget(r),f&&h.render(d,l),h.render(e,l)}d.geometry.dispose(),d.material.dispose(),h.toneMapping=m,h.autoClear=p,e.background=M}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===bi||e.mapping===wi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=hc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=uc());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Et(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Vr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,qs)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=ac[(r-s-1)%ac.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,r,"latitudinal",s),this._halfBlur(o,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Et(this._lodPlanes[r],c),p=c.uniforms,m=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*Kn-1),_=s/g,d=isFinite(s)?1+Math.floor(u*_):Kn;d>Kn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${Kn}`);const f=[];let M=0;for(let C=0;C<Kn;++C){const P=C/_,E=Math.exp(-P*P/2);f.push(E),C===0?M+=E:C<d&&(M+=2*E)}for(let C=0;C<f.length;C++)f[C]=f[C]/M;p.envMap.value=e.texture,p.samples.value=d,p.weights.value=f,p.latitudinal.value=o==="latitudinal",a&&(p.poleAxis.value=a);const{_lodMax:v}=this;p.dTheta.value=g,p.mipInt.value=v-n;const x=this._sizeLods[r],R=3*x*(r>v-Si?r-v+Si:0),w=4*(this._cubeSize-x);Vr(t,R,w,3*x,2*x),l.setRenderTarget(t),l.render(h,qs)}}function em(i){const e=[],t=[],n=[];let r=i;const s=i-Si+1+sc.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let l=1/a;o>i-Si?l=sc[o-i+Si-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,h=1+c,p=[u,u,h,u,h,h,u,u,h,h,u,h],m=6,g=6,_=3,d=2,f=1,M=new Float32Array(_*g*m),v=new Float32Array(d*g*m),x=new Float32Array(f*g*m);for(let w=0;w<m;w++){const C=w%3*2/3-1,P=w>2?0:-1,E=[C,P,0,C+2/3,P,0,C+2/3,P+1,0,C,P,0,C+2/3,P+1,0,C,P+1,0];M.set(E,_*g*w),v.set(p,d*g*w);const y=[w,w,w,w,w,w];x.set(y,f*g*w)}const R=new xt;R.setAttribute("position",new It(M,_)),R.setAttribute("uv",new It(v,d)),R.setAttribute("faceIndex",new It(x,f)),e.push(R),r>Si&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function lc(i,e,t){const n=new ei(i,e,t);return n.texture.mapping=us,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Vr(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function tm(i,e,t){const n=new Float32Array(Kn),r=new D(0,1,0);return new An({name:"SphericalGaussianBlur",defines:{n:Kn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:ca(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function uc(){return new An({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ca(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function hc(){return new An({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ca(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function ca(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function nm(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===ao||l===co,u=l===bi||l===wi;if(c||u){let h=e.get(a);const p=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==p)return t===null&&(t=new cc(i)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const m=a.image;return c&&m&&m.height>0||u&&m&&r(m)?(t===null&&(t=new cc(i)),h=c?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function im(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&ar("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function rm(i,e,t,n){const r={},s=new WeakMap;function o(h){const p=h.target;p.index!==null&&e.remove(p.index);for(const g in p.attributes)e.remove(p.attributes[g]);p.removeEventListener("dispose",o),delete r[p.id];const m=s.get(p);m&&(e.remove(m),s.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function a(h,p){return r[p.id]===!0||(p.addEventListener("dispose",o),r[p.id]=!0,t.memory.geometries++),p}function l(h){const p=h.attributes;for(const m in p)e.update(p[m],i.ARRAY_BUFFER)}function c(h){const p=[],m=h.index,g=h.attributes.position;let _=0;if(m!==null){const M=m.array;_=m.version;for(let v=0,x=M.length;v<x;v+=3){const R=M[v+0],w=M[v+1],C=M[v+2];p.push(R,w,w,C,C,R)}}else if(g!==void 0){const M=g.array;_=g.version;for(let v=0,x=M.length/3-1;v<x;v+=3){const R=v+0,w=v+1,C=v+2;p.push(R,w,w,C,C,R)}}else return;const d=new(Kc(p)?el:Qc)(p,1);d.version=_;const f=s.get(h);f&&e.remove(f),s.set(h,d)}function u(h){const p=s.get(h);if(p){const m=h.index;m!==null&&p.version<m.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function sm(i,e,t){let n;function r(p){n=p}let s,o;function a(p){s=p.type,o=p.bytesPerElement}function l(p,m){i.drawElements(n,m,s,p*o),t.update(m,n,1)}function c(p,m,g){g!==0&&(i.drawElementsInstanced(n,m,s,p*o,g),t.update(m,n,g))}function u(p,m,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,s,p,0,g);let d=0;for(let f=0;f<g;f++)d+=m[f];t.update(d,n,1)}function h(p,m,g,_){if(g===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let f=0;f<p.length;f++)c(p[f]/o,m[f],_[f]);else{d.multiDrawElementsInstancedWEBGL(n,m,0,s,p,0,_,0,g);let f=0;for(let M=0;M<g;M++)f+=m[M]*_[M];t.update(f,n,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function om(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(s/3);break;case i.LINES:t.lines+=a*(s/2);break;case i.LINE_STRIP:t.lines+=a*(s-1);break;case i.LINE_LOOP:t.lines+=a*s;break;case i.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function am(i,e,t){const n=new WeakMap,r=new ht;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let p=n.get(a);if(p===void 0||p.count!==h){let y=function(){P.dispose(),n.delete(a),a.removeEventListener("dispose",y)};var m=y;p!==void 0&&p.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,d=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],M=a.morphAttributes.normal||[],v=a.morphAttributes.color||[];let x=0;g===!0&&(x=1),_===!0&&(x=2),d===!0&&(x=3);let R=a.attributes.position.count*x,w=1;R>e.maxTextureSize&&(w=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const C=new Float32Array(R*w*4*h),P=new Jc(C,R,w,h);P.type=an,P.needsUpdate=!0;const E=x*4;for(let L=0;L<h;L++){const U=f[L],V=M[L],N=v[L],k=R*w*4*L;for(let K=0;K<U.count;K++){const j=K*E;g===!0&&(r.fromBufferAttribute(U,K),C[k+j+0]=r.x,C[k+j+1]=r.y,C[k+j+2]=r.z,C[k+j+3]=0),_===!0&&(r.fromBufferAttribute(V,K),C[k+j+4]=r.x,C[k+j+5]=r.y,C[k+j+6]=r.z,C[k+j+7]=0),d===!0&&(r.fromBufferAttribute(N,K),C[k+j+8]=r.x,C[k+j+9]=r.y,C[k+j+10]=r.z,C[k+j+11]=N.itemSize===4?r.w:1)}}p={count:h,texture:P,size:new de(R,w)},n.set(a,p),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let g=0;for(let d=0;d<c.length;d++)g+=c[d];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:s}}function cm(i,e,t,n){let r=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,h=e.get(l,u);if(r.get(h)!==c&&(e.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const p=l.skeleton;r.get(p)!==c&&(p.update(),r.set(p,c))}return h}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const yl=new Tt,fc=new ol(1,1),El=new Jc,Tl=new Qu,Al=new il,dc=[],pc=[],mc=new Float32Array(16),gc=new Float32Array(9),_c=new Float32Array(4);function Fi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=dc[r];if(s===void 0&&(s=new Float32Array(r),dc[r]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(s,a)}return s}function gt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function _t(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ds(i,e){let t=pc[e];t===void 0&&(t=new Int32Array(e),pc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function lm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function um(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;i.uniform2fv(this.addr,e),_t(t,e)}}function hm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(gt(t,e))return;i.uniform3fv(this.addr,e),_t(t,e)}}function fm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;i.uniform4fv(this.addr,e),_t(t,e)}}function dm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(gt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),_t(t,e)}else{if(gt(t,n))return;_c.set(n),i.uniformMatrix2fv(this.addr,!1,_c),_t(t,n)}}function pm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(gt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),_t(t,e)}else{if(gt(t,n))return;gc.set(n),i.uniformMatrix3fv(this.addr,!1,gc),_t(t,n)}}function mm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(gt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),_t(t,e)}else{if(gt(t,n))return;mc.set(n),i.uniformMatrix4fv(this.addr,!1,mc),_t(t,n)}}function gm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function _m(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;i.uniform2iv(this.addr,e),_t(t,e)}}function vm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(gt(t,e))return;i.uniform3iv(this.addr,e),_t(t,e)}}function xm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;i.uniform4iv(this.addr,e),_t(t,e)}}function Mm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Sm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;i.uniform2uiv(this.addr,e),_t(t,e)}}function ym(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(gt(t,e))return;i.uniform3uiv(this.addr,e),_t(t,e)}}function Em(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;i.uniform4uiv(this.addr,e),_t(t,e)}}function Tm(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(fc.compareFunction=Yc,s=fc):s=yl,t.setTexture2D(e||s,r)}function Am(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Tl,r)}function bm(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Al,r)}function wm(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||El,r)}function Rm(i){switch(i){case 5126:return lm;case 35664:return um;case 35665:return hm;case 35666:return fm;case 35674:return dm;case 35675:return pm;case 35676:return mm;case 5124:case 35670:return gm;case 35667:case 35671:return _m;case 35668:case 35672:return vm;case 35669:case 35673:return xm;case 5125:return Mm;case 36294:return Sm;case 36295:return ym;case 36296:return Em;case 35678:case 36198:case 36298:case 36306:case 35682:return Tm;case 35679:case 36299:case 36307:return Am;case 35680:case 36300:case 36308:case 36293:return bm;case 36289:case 36303:case 36311:case 36292:return wm}}function Cm(i,e){i.uniform1fv(this.addr,e)}function Pm(i,e){const t=Fi(e,this.size,2);i.uniform2fv(this.addr,t)}function Lm(i,e){const t=Fi(e,this.size,3);i.uniform3fv(this.addr,t)}function Dm(i,e){const t=Fi(e,this.size,4);i.uniform4fv(this.addr,t)}function Im(i,e){const t=Fi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Um(i,e){const t=Fi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Nm(i,e){const t=Fi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Fm(i,e){i.uniform1iv(this.addr,e)}function Om(i,e){i.uniform2iv(this.addr,e)}function Bm(i,e){i.uniform3iv(this.addr,e)}function zm(i,e){i.uniform4iv(this.addr,e)}function km(i,e){i.uniform1uiv(this.addr,e)}function Hm(i,e){i.uniform2uiv(this.addr,e)}function Vm(i,e){i.uniform3uiv(this.addr,e)}function Gm(i,e){i.uniform4uiv(this.addr,e)}function Wm(i,e,t){const n=this.cache,r=e.length,s=ds(t,r);gt(n,s)||(i.uniform1iv(this.addr,s),_t(n,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||yl,s[o])}function Xm(i,e,t){const n=this.cache,r=e.length,s=ds(t,r);gt(n,s)||(i.uniform1iv(this.addr,s),_t(n,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Tl,s[o])}function qm(i,e,t){const n=this.cache,r=e.length,s=ds(t,r);gt(n,s)||(i.uniform1iv(this.addr,s),_t(n,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Al,s[o])}function Ym(i,e,t){const n=this.cache,r=e.length,s=ds(t,r);gt(n,s)||(i.uniform1iv(this.addr,s),_t(n,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||El,s[o])}function Km(i){switch(i){case 5126:return Cm;case 35664:return Pm;case 35665:return Lm;case 35666:return Dm;case 35674:return Im;case 35675:return Um;case 35676:return Nm;case 5124:case 35670:return Fm;case 35667:case 35671:return Om;case 35668:case 35672:return Bm;case 35669:case 35673:return zm;case 5125:return km;case 36294:return Hm;case 36295:return Vm;case 36296:return Gm;case 35678:case 36198:case 36298:case 36306:case 35682:return Wm;case 35679:case 36299:case 36307:return Xm;case 35680:case 36300:case 36308:case 36293:return qm;case 36289:case 36303:case 36311:case 36292:return Ym}}class Jm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Rm(t.type)}}class Zm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Km(t.type)}}class jm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],n)}}}const js=/(\w+)(\])?(\[|\.)?/g;function vc(i,e){i.seq.push(e),i.map[e.id]=e}function $m(i,e,t){const n=i.name,r=n.length;for(js.lastIndex=0;;){const s=js.exec(n),o=js.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){vc(t,c===void 0?new Jm(a,i,e):new Zm(a,i,e));break}else{let h=t.map[a];h===void 0&&(h=new jm(a),vc(t,h)),t=h}}}class Kr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);$m(s,o,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&n.push(o)}return n}}function xc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Qm=37297;let eg=0;function tg(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Mc=new Ve;function ng(i){Ze._getMatrix(Mc,Ze.workingColorSpace,i);const e=`mat3( ${Mc.elements.map(t=>t.toFixed(4))} )`;switch(Ze.getTransfer(i)){case $r:return[e,"LinearTransferOETF"];case tt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Sc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+tg(i.getShaderSource(e),a)}else return s}function ig(i,e){const t=ng(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function rg(i,e){let t;switch(e){case du:t="Linear";break;case pu:t="Reinhard";break;case mu:t="Cineon";break;case Oc:t="ACESFilmic";break;case _u:t="AgX";break;case vu:t="Neutral";break;case gu:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Gr=new D;function sg(){Ze.getLuminanceCoefficients(Gr);const i=Gr.x.toFixed(4),e=Gr.y.toFixed(4),t=Gr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function og(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ji).join(`
`)}function ag(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function cg(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Ji(i){return i!==""}function yc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ec(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const lg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Vo(i){return i.replace(lg,hg)}const ug=new Map;function hg(i,e){let t=Ge[e];if(t===void 0){const n=ug.get(e);if(n!==void 0)t=Ge[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Vo(t)}const fg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Tc(i){return i.replace(fg,dg)}function dg(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Ac(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function pg(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Uc?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Nc?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===vn&&(e="SHADOWMAP_TYPE_VSM"),e}function mg(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case bi:case wi:e="ENVMAP_TYPE_CUBE";break;case us:e="ENVMAP_TYPE_CUBE_UV";break}return e}function gg(i){let e="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===wi&&(e="ENVMAP_MODE_REFRACTION"),e}function _g(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Fc:e="ENVMAP_BLENDING_MULTIPLY";break;case hu:e="ENVMAP_BLENDING_MIX";break;case fu:e="ENVMAP_BLENDING_ADD";break}return e}function vg(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function xg(i,e,t,n){const r=i.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=pg(t),c=mg(t),u=gg(t),h=_g(t),p=vg(t),m=og(t),g=ag(s),_=r.createProgram();let d,f,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ji).join(`
`),d.length>0&&(d+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ji).join(`
`),f.length>0&&(f+=`
`)):(d=[Ac(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ji).join(`
`),f=[Ac(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Nn?"#define TONE_MAPPING":"",t.toneMapping!==Nn?Ge.tonemapping_pars_fragment:"",t.toneMapping!==Nn?rg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,ig("linearToOutputTexel",t.outputColorSpace),sg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ji).join(`
`)),o=Vo(o),o=yc(o,t),o=Ec(o,t),a=Vo(a),a=yc(a,t),a=Ec(a,t),o=Tc(o),a=Tc(a),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,d=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,f=["#define varying in",t.glslVersion===Aa?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Aa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const v=M+d+o,x=M+f+a,R=xc(r,r.VERTEX_SHADER,v),w=xc(r,r.FRAGMENT_SHADER,x);r.attachShader(_,R),r.attachShader(_,w),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function C(L){if(i.debug.checkShaderErrors){const U=r.getProgramInfoLog(_)||"",V=r.getShaderInfoLog(R)||"",N=r.getShaderInfoLog(w)||"",k=U.trim(),K=V.trim(),j=N.trim();let G=!0,ce=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,R,w);else{const pe=Sc(r,R,"vertex"),xe=Sc(r,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+k+`
`+pe+`
`+xe)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(K===""||j==="")&&(ce=!1);ce&&(L.diagnostics={runnable:G,programLog:k,vertexShader:{log:K,prefix:d},fragmentShader:{log:j,prefix:f}})}r.deleteShader(R),r.deleteShader(w),P=new Kr(r,_),E=cg(r,_)}let P;this.getUniforms=function(){return P===void 0&&C(this),P};let E;this.getAttributes=function(){return E===void 0&&C(this),E};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=r.getProgramParameter(_,Qm)),y},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=eg++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=w,this}let Mg=0;class Sg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new yg(e),t.set(e,n)),n}}class yg{constructor(e){this.id=Mg++,this.code=e,this.usedTimes=0}}function Eg(i,e,t,n,r,s,o){const a=new jc,l=new Sg,c=new Set,u=[],h=r.logarithmicDepthBuffer,p=r.vertexTextures;let m=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return c.add(E),E===0?"uv":`uv${E}`}function d(E,y,L,U,V){const N=U.fog,k=V.geometry,K=E.isMeshStandardMaterial?U.environment:null,j=(E.isMeshStandardMaterial?t:e).get(E.envMap||K),G=j&&j.mapping===us?j.image.height:null,ce=g[E.type];E.precision!==null&&(m=r.getMaxPrecision(E.precision),m!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",m,"instead."));const pe=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,xe=pe!==void 0?pe.length:0;let le=0;k.morphAttributes.position!==void 0&&(le=1),k.morphAttributes.normal!==void 0&&(le=2),k.morphAttributes.color!==void 0&&(le=3);let Ie,We,Le,Z;if(ce){const $e=sn[ce];Ie=$e.vertexShader,We=$e.fragmentShader}else Ie=E.vertexShader,We=E.fragmentShader,l.update(E),Le=l.getVertexShaderID(E),Z=l.getFragmentShaderID(E);const te=i.getRenderTarget(),Me=i.state.buffers.depth.getReversed(),Ce=V.isInstancedMesh===!0,Ee=V.isBatchedMesh===!0,Xe=!!E.map,je=!!E.matcap,b=!!j,$=!!E.aoMap,H=!!E.lightMap,O=!!E.bumpMap,Y=!!E.normalMap,oe=!!E.displacementMap,ne=!!E.emissiveMap,ue=!!E.metalnessMap,ze=!!E.roughnessMap,Ne=E.anisotropy>0,A=E.clearcoat>0,S=E.dispersion>0,F=E.iridescence>0,X=E.sheen>0,ee=E.transmission>0,J=Ne&&!!E.anisotropyMap,Re=A&&!!E.clearcoatMap,he=A&&!!E.clearcoatNormalMap,Ae=A&&!!E.clearcoatRoughnessMap,be=F&&!!E.iridescenceMap,ie=F&&!!E.iridescenceThicknessMap,ve=X&&!!E.sheenColorMap,Oe=X&&!!E.sheenRoughnessMap,Pe=!!E.specularMap,ge=!!E.specularColorMap,He=!!E.specularIntensityMap,I=ee&&!!E.transmissionMap,ae=ee&&!!E.thicknessMap,fe=!!E.gradientMap,ye=!!E.alphaMap,re=E.alphaTest>0,Q=!!E.alphaHash,we=!!E.extensions;let ke=Nn;E.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(ke=i.toneMapping);const rt={shaderID:ce,shaderType:E.type,shaderName:E.name,vertexShader:Ie,fragmentShader:We,defines:E.defines,customVertexShaderID:Le,customFragmentShaderID:Z,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:m,batching:Ee,batchingColor:Ee&&V._colorsTexture!==null,instancing:Ce,instancingColor:Ce&&V.instanceColor!==null,instancingMorph:Ce&&V.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:te===null?i.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:Ri,alphaToCoverage:!!E.alphaToCoverage,map:Xe,matcap:je,envMap:b,envMapMode:b&&j.mapping,envMapCubeUVHeight:G,aoMap:$,lightMap:H,bumpMap:O,normalMap:Y,displacementMap:p&&oe,emissiveMap:ne,normalMapObjectSpace:Y&&E.normalMapType===yu,normalMapTangentSpace:Y&&E.normalMapType===qc,metalnessMap:ue,roughnessMap:ze,anisotropy:Ne,anisotropyMap:J,clearcoat:A,clearcoatMap:Re,clearcoatNormalMap:he,clearcoatRoughnessMap:Ae,dispersion:S,iridescence:F,iridescenceMap:be,iridescenceThicknessMap:ie,sheen:X,sheenColorMap:ve,sheenRoughnessMap:Oe,specularMap:Pe,specularColorMap:ge,specularIntensityMap:He,transmission:ee,transmissionMap:I,thicknessMap:ae,gradientMap:fe,opaque:E.transparent===!1&&E.blending===Ei&&E.alphaToCoverage===!1,alphaMap:ye,alphaTest:re,alphaHash:Q,combine:E.combine,mapUv:Xe&&_(E.map.channel),aoMapUv:$&&_(E.aoMap.channel),lightMapUv:H&&_(E.lightMap.channel),bumpMapUv:O&&_(E.bumpMap.channel),normalMapUv:Y&&_(E.normalMap.channel),displacementMapUv:oe&&_(E.displacementMap.channel),emissiveMapUv:ne&&_(E.emissiveMap.channel),metalnessMapUv:ue&&_(E.metalnessMap.channel),roughnessMapUv:ze&&_(E.roughnessMap.channel),anisotropyMapUv:J&&_(E.anisotropyMap.channel),clearcoatMapUv:Re&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:he&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ae&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:be&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:ie&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:ve&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&_(E.sheenRoughnessMap.channel),specularMapUv:Pe&&_(E.specularMap.channel),specularColorMapUv:ge&&_(E.specularColorMap.channel),specularIntensityMapUv:He&&_(E.specularIntensityMap.channel),transmissionMapUv:I&&_(E.transmissionMap.channel),thicknessMapUv:ae&&_(E.thicknessMap.channel),alphaMapUv:ye&&_(E.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(Y||Ne),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!k.attributes.uv&&(Xe||ye),fog:!!N,useFog:E.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:E.flatShading===!0&&E.wireframe===!1,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Me,skinning:V.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:xe,morphTextureStride:le,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:ke,decodeVideoTexture:Xe&&E.map.isVideoTexture===!0&&Ze.getTransfer(E.map.colorSpace)===tt,decodeVideoTextureEmissive:ne&&E.emissiveMap.isVideoTexture===!0&&Ze.getTransfer(E.emissiveMap.colorSpace)===tt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===xn,flipSided:E.side===Rt,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:we&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(we&&E.extensions.multiDraw===!0||Ee)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return rt.vertexUv1s=c.has(1),rt.vertexUv2s=c.has(2),rt.vertexUv3s=c.has(3),c.clear(),rt}function f(E){const y=[];if(E.shaderID?y.push(E.shaderID):(y.push(E.customVertexShaderID),y.push(E.customFragmentShaderID)),E.defines!==void 0)for(const L in E.defines)y.push(L),y.push(E.defines[L]);return E.isRawShaderMaterial===!1&&(M(y,E),v(y,E),y.push(i.outputColorSpace)),y.push(E.customProgramCacheKey),y.join()}function M(E,y){E.push(y.precision),E.push(y.outputColorSpace),E.push(y.envMapMode),E.push(y.envMapCubeUVHeight),E.push(y.mapUv),E.push(y.alphaMapUv),E.push(y.lightMapUv),E.push(y.aoMapUv),E.push(y.bumpMapUv),E.push(y.normalMapUv),E.push(y.displacementMapUv),E.push(y.emissiveMapUv),E.push(y.metalnessMapUv),E.push(y.roughnessMapUv),E.push(y.anisotropyMapUv),E.push(y.clearcoatMapUv),E.push(y.clearcoatNormalMapUv),E.push(y.clearcoatRoughnessMapUv),E.push(y.iridescenceMapUv),E.push(y.iridescenceThicknessMapUv),E.push(y.sheenColorMapUv),E.push(y.sheenRoughnessMapUv),E.push(y.specularMapUv),E.push(y.specularColorMapUv),E.push(y.specularIntensityMapUv),E.push(y.transmissionMapUv),E.push(y.thicknessMapUv),E.push(y.combine),E.push(y.fogExp2),E.push(y.sizeAttenuation),E.push(y.morphTargetsCount),E.push(y.morphAttributeCount),E.push(y.numDirLights),E.push(y.numPointLights),E.push(y.numSpotLights),E.push(y.numSpotLightMaps),E.push(y.numHemiLights),E.push(y.numRectAreaLights),E.push(y.numDirLightShadows),E.push(y.numPointLightShadows),E.push(y.numSpotLightShadows),E.push(y.numSpotLightShadowsWithMaps),E.push(y.numLightProbes),E.push(y.shadowMapType),E.push(y.toneMapping),E.push(y.numClippingPlanes),E.push(y.numClipIntersection),E.push(y.depthPacking)}function v(E,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),y.gradientMap&&a.enable(22),E.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reversedDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),E.push(a.mask)}function x(E){const y=g[E.type];let L;if(y){const U=sn[y];L=fh.clone(U.uniforms)}else L=E.uniforms;return L}function R(E,y){let L;for(let U=0,V=u.length;U<V;U++){const N=u[U];if(N.cacheKey===y){L=N,++L.usedTimes;break}}return L===void 0&&(L=new xg(i,y,E,s),u.push(L)),L}function w(E){if(--E.usedTimes===0){const y=u.indexOf(E);u[y]=u[u.length-1],u.pop(),E.destroy()}}function C(E){l.remove(E)}function P(){l.dispose()}return{getParameters:d,getProgramCacheKey:f,getUniforms:x,acquireProgram:R,releaseProgram:w,releaseShaderCache:C,programs:u,dispose:P}}function Tg(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,l){i.get(o)[a]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function Ag(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function bc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function wc(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function o(h,p,m,g,_,d){let f=i[e];return f===void 0?(f={id:h.id,object:h,geometry:p,material:m,groupOrder:g,renderOrder:h.renderOrder,z:_,group:d},i[e]=f):(f.id=h.id,f.object=h,f.geometry=p,f.material=m,f.groupOrder=g,f.renderOrder=h.renderOrder,f.z=_,f.group=d),e++,f}function a(h,p,m,g,_,d){const f=o(h,p,m,g,_,d);m.transmission>0?n.push(f):m.transparent===!0?r.push(f):t.push(f)}function l(h,p,m,g,_,d){const f=o(h,p,m,g,_,d);m.transmission>0?n.unshift(f):m.transparent===!0?r.unshift(f):t.unshift(f)}function c(h,p){t.length>1&&t.sort(h||Ag),n.length>1&&n.sort(p||bc),r.length>1&&r.sort(p||bc)}function u(){for(let h=e,p=i.length;h<p;h++){const m=i[h];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function bg(){let i=new WeakMap;function e(n,r){const s=i.get(n);let o;return s===void 0?(o=new wc,i.set(n,[o])):r>=s.length?(o=new wc,s.push(o)):o=s[r],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function wg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new Ke};break;case"SpotLight":t={position:new D,direction:new D,color:new Ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new Ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new Ke,groundColor:new Ke};break;case"RectAreaLight":t={color:new Ke,position:new D,halfWidth:new D,halfHeight:new D};break}return i[e.id]=t,t}}}function Rg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Cg=0;function Pg(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Lg(i){const e=new wg,t=Rg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new D);const r=new D,s=new st,o=new st;function a(c){let u=0,h=0,p=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let m=0,g=0,_=0,d=0,f=0,M=0,v=0,x=0,R=0,w=0,C=0;c.sort(Pg);for(let E=0,y=c.length;E<y;E++){const L=c[E],U=L.color,V=L.intensity,N=L.distance,k=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=U.r*V,h+=U.g*V,p+=U.b*V;else if(L.isLightProbe){for(let K=0;K<9;K++)n.probe[K].addScaledVector(L.sh.coefficients[K],V);C++}else if(L.isDirectionalLight){const K=e.get(L);if(K.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const j=L.shadow,G=t.get(L);G.shadowIntensity=j.intensity,G.shadowBias=j.bias,G.shadowNormalBias=j.normalBias,G.shadowRadius=j.radius,G.shadowMapSize=j.mapSize,n.directionalShadow[m]=G,n.directionalShadowMap[m]=k,n.directionalShadowMatrix[m]=L.shadow.matrix,M++}n.directional[m]=K,m++}else if(L.isSpotLight){const K=e.get(L);K.position.setFromMatrixPosition(L.matrixWorld),K.color.copy(U).multiplyScalar(V),K.distance=N,K.coneCos=Math.cos(L.angle),K.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),K.decay=L.decay,n.spot[_]=K;const j=L.shadow;if(L.map&&(n.spotLightMap[R]=L.map,R++,j.updateMatrices(L),L.castShadow&&w++),n.spotLightMatrix[_]=j.matrix,L.castShadow){const G=t.get(L);G.shadowIntensity=j.intensity,G.shadowBias=j.bias,G.shadowNormalBias=j.normalBias,G.shadowRadius=j.radius,G.shadowMapSize=j.mapSize,n.spotShadow[_]=G,n.spotShadowMap[_]=k,x++}_++}else if(L.isRectAreaLight){const K=e.get(L);K.color.copy(U).multiplyScalar(V),K.halfWidth.set(L.width*.5,0,0),K.halfHeight.set(0,L.height*.5,0),n.rectArea[d]=K,d++}else if(L.isPointLight){const K=e.get(L);if(K.color.copy(L.color).multiplyScalar(L.intensity),K.distance=L.distance,K.decay=L.decay,L.castShadow){const j=L.shadow,G=t.get(L);G.shadowIntensity=j.intensity,G.shadowBias=j.bias,G.shadowNormalBias=j.normalBias,G.shadowRadius=j.radius,G.shadowMapSize=j.mapSize,G.shadowCameraNear=j.camera.near,G.shadowCameraFar=j.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=k,n.pointShadowMatrix[g]=L.shadow.matrix,v++}n.point[g]=K,g++}else if(L.isHemisphereLight){const K=e.get(L);K.skyColor.copy(L.color).multiplyScalar(V),K.groundColor.copy(L.groundColor).multiplyScalar(V),n.hemi[f]=K,f++}}d>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=me.LTC_FLOAT_1,n.rectAreaLTC2=me.LTC_FLOAT_2):(n.rectAreaLTC1=me.LTC_HALF_1,n.rectAreaLTC2=me.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=p;const P=n.hash;(P.directionalLength!==m||P.pointLength!==g||P.spotLength!==_||P.rectAreaLength!==d||P.hemiLength!==f||P.numDirectionalShadows!==M||P.numPointShadows!==v||P.numSpotShadows!==x||P.numSpotMaps!==R||P.numLightProbes!==C)&&(n.directional.length=m,n.spot.length=_,n.rectArea.length=d,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=x+R-w,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=C,P.directionalLength=m,P.pointLength=g,P.spotLength=_,P.rectAreaLength=d,P.hemiLength=f,P.numDirectionalShadows=M,P.numPointShadows=v,P.numSpotShadows=x,P.numSpotMaps=R,P.numLightProbes=C,n.version=Cg++)}function l(c,u){let h=0,p=0,m=0,g=0,_=0;const d=u.matrixWorldInverse;for(let f=0,M=c.length;f<M;f++){const v=c[f];if(v.isDirectionalLight){const x=n.directional[h];x.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(d),h++}else if(v.isSpotLight){const x=n.spot[m];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(d),x.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(d),m++}else if(v.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(d),o.identity(),s.copy(v.matrixWorld),s.premultiply(d),o.extractRotation(s),x.halfWidth.set(v.width*.5,0,0),x.halfHeight.set(0,v.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(v.isPointLight){const x=n.point[p];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(d),p++}else if(v.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(v.matrixWorld),x.direction.transformDirection(d),_++}}}return{setup:a,setupView:l,state:n}}function Rc(i){const e=new Lg(i),t=[],n=[];function r(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function Dg(i){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new Rc(i),e.set(r,[a])):s>=o.length?(a=new Rc(i),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const Ig=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ug=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Ng(i,e,t){let n=new ta;const r=new de,s=new de,o=new ht,a=new rf({depthPacking:Su}),l=new sf,c={},u=t.maxTextureSize,h={[Fn]:Rt,[Rt]:Fn,[xn]:xn},p=new An({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new de},radius:{value:4}},vertexShader:Ig,fragmentShader:Ug}),m=p.clone();m.defines.HORIZONTAL_PASS=1;const g=new xt;g.setAttribute("position",new It(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Et(g,p),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Uc;let f=this.type;this.render=function(w,C,P){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||w.length===0)return;const E=i.getRenderTarget(),y=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),U=i.state;U.setBlending(Un),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const V=f!==vn&&this.type===vn,N=f===vn&&this.type!==vn;for(let k=0,K=w.length;k<K;k++){const j=w[k],G=j.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;r.copy(G.mapSize);const ce=G.getFrameExtents();if(r.multiply(ce),s.copy(G.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ce.x),r.x=s.x*ce.x,G.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ce.y),r.y=s.y*ce.y,G.mapSize.y=s.y)),G.map===null||V===!0||N===!0){const xe=this.type!==vn?{minFilter:zt,magFilter:zt}:{};G.map!==null&&G.map.dispose(),G.map=new ei(r.x,r.y,xe),G.map.texture.name=j.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();const pe=G.getViewportCount();for(let xe=0;xe<pe;xe++){const le=G.getViewport(xe);o.set(s.x*le.x,s.y*le.y,s.x*le.z,s.y*le.w),U.viewport(o),G.updateMatrices(j,xe),n=G.getFrustum(),x(C,P,G.camera,j,this.type)}G.isPointLightShadow!==!0&&this.type===vn&&M(G,P),G.needsUpdate=!1}f=this.type,d.needsUpdate=!1,i.setRenderTarget(E,y,L)};function M(w,C){const P=e.update(_);p.defines.VSM_SAMPLES!==w.blurSamples&&(p.defines.VSM_SAMPLES=w.blurSamples,m.defines.VSM_SAMPLES=w.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new ei(r.x,r.y)),p.uniforms.shadow_pass.value=w.map.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(C,null,P,p,_,null),m.uniforms.shadow_pass.value=w.mapPass.texture,m.uniforms.resolution.value=w.mapSize,m.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(C,null,P,m,_,null)}function v(w,C,P,E){let y=null;const L=P.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(L!==void 0)y=L;else if(y=P.isPointLight===!0?l:a,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const U=y.uuid,V=C.uuid;let N=c[U];N===void 0&&(N={},c[U]=N);let k=N[V];k===void 0&&(k=y.clone(),N[V]=k,C.addEventListener("dispose",R)),y=k}if(y.visible=C.visible,y.wireframe=C.wireframe,E===vn?y.side=C.shadowSide!==null?C.shadowSide:C.side:y.side=C.shadowSide!==null?C.shadowSide:h[C.side],y.alphaMap=C.alphaMap,y.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,y.map=C.map,y.clipShadows=C.clipShadows,y.clippingPlanes=C.clippingPlanes,y.clipIntersection=C.clipIntersection,y.displacementMap=C.displacementMap,y.displacementScale=C.displacementScale,y.displacementBias=C.displacementBias,y.wireframeLinewidth=C.wireframeLinewidth,y.linewidth=C.linewidth,P.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const U=i.properties.get(y);U.light=P}return y}function x(w,C,P,E,y){if(w.visible===!1)return;if(w.layers.test(C.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&y===vn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,w.matrixWorld);const V=e.update(w),N=w.material;if(Array.isArray(N)){const k=V.groups;for(let K=0,j=k.length;K<j;K++){const G=k[K],ce=N[G.materialIndex];if(ce&&ce.visible){const pe=v(w,ce,E,y);w.onBeforeShadow(i,w,C,P,V,pe,G),i.renderBufferDirect(P,null,V,pe,w,G),w.onAfterShadow(i,w,C,P,V,pe,G)}}}else if(N.visible){const k=v(w,N,E,y);w.onBeforeShadow(i,w,C,P,V,k,null),i.renderBufferDirect(P,null,V,k,w,null),w.onAfterShadow(i,w,C,P,V,k,null)}}const U=w.children;for(let V=0,N=U.length;V<N;V++)x(U[V],C,P,E,y)}function R(w){w.target.removeEventListener("dispose",R);for(const P in c){const E=c[P],y=w.target.uuid;y in E&&(E[y].dispose(),delete E[y])}}}const Fg={[eo]:to,[no]:so,[io]:oo,[Ai]:ro,[to]:eo,[so]:no,[oo]:io,[ro]:Ai};function Og(i,e){function t(){let I=!1;const ae=new ht;let fe=null;const ye=new ht(0,0,0,0);return{setMask:function(re){fe!==re&&!I&&(i.colorMask(re,re,re,re),fe=re)},setLocked:function(re){I=re},setClear:function(re,Q,we,ke,rt){rt===!0&&(re*=ke,Q*=ke,we*=ke),ae.set(re,Q,we,ke),ye.equals(ae)===!1&&(i.clearColor(re,Q,we,ke),ye.copy(ae))},reset:function(){I=!1,fe=null,ye.set(-1,0,0,0)}}}function n(){let I=!1,ae=!1,fe=null,ye=null,re=null;return{setReversed:function(Q){if(ae!==Q){const we=e.get("EXT_clip_control");Q?we.clipControlEXT(we.LOWER_LEFT_EXT,we.ZERO_TO_ONE_EXT):we.clipControlEXT(we.LOWER_LEFT_EXT,we.NEGATIVE_ONE_TO_ONE_EXT),ae=Q;const ke=re;re=null,this.setClear(ke)}},getReversed:function(){return ae},setTest:function(Q){Q?te(i.DEPTH_TEST):Me(i.DEPTH_TEST)},setMask:function(Q){fe!==Q&&!I&&(i.depthMask(Q),fe=Q)},setFunc:function(Q){if(ae&&(Q=Fg[Q]),ye!==Q){switch(Q){case eo:i.depthFunc(i.NEVER);break;case to:i.depthFunc(i.ALWAYS);break;case no:i.depthFunc(i.LESS);break;case Ai:i.depthFunc(i.LEQUAL);break;case io:i.depthFunc(i.EQUAL);break;case ro:i.depthFunc(i.GEQUAL);break;case so:i.depthFunc(i.GREATER);break;case oo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ye=Q}},setLocked:function(Q){I=Q},setClear:function(Q){re!==Q&&(ae&&(Q=1-Q),i.clearDepth(Q),re=Q)},reset:function(){I=!1,fe=null,ye=null,re=null,ae=!1}}}function r(){let I=!1,ae=null,fe=null,ye=null,re=null,Q=null,we=null,ke=null,rt=null;return{setTest:function($e){I||($e?te(i.STENCIL_TEST):Me(i.STENCIL_TEST))},setMask:function($e){ae!==$e&&!I&&(i.stencilMask($e),ae=$e)},setFunc:function($e,fn,rn){(fe!==$e||ye!==fn||re!==rn)&&(i.stencilFunc($e,fn,rn),fe=$e,ye=fn,re=rn)},setOp:function($e,fn,rn){(Q!==$e||we!==fn||ke!==rn)&&(i.stencilOp($e,fn,rn),Q=$e,we=fn,ke=rn)},setLocked:function($e){I=$e},setClear:function($e){rt!==$e&&(i.clearStencil($e),rt=$e)},reset:function(){I=!1,ae=null,fe=null,ye=null,re=null,Q=null,we=null,ke=null,rt=null}}}const s=new t,o=new n,a=new r,l=new WeakMap,c=new WeakMap;let u={},h={},p=new WeakMap,m=[],g=null,_=!1,d=null,f=null,M=null,v=null,x=null,R=null,w=null,C=new Ke(0,0,0),P=0,E=!1,y=null,L=null,U=null,V=null,N=null;const k=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,j=0;const G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(G)[1]),K=j>=1):G.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),K=j>=2);let ce=null,pe={};const xe=i.getParameter(i.SCISSOR_BOX),le=i.getParameter(i.VIEWPORT),Ie=new ht().fromArray(xe),We=new ht().fromArray(le);function Le(I,ae,fe,ye){const re=new Uint8Array(4),Q=i.createTexture();i.bindTexture(I,Q),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let we=0;we<fe;we++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(ae,0,i.RGBA,1,1,ye,0,i.RGBA,i.UNSIGNED_BYTE,re):i.texImage2D(ae+we,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,re);return Q}const Z={};Z[i.TEXTURE_2D]=Le(i.TEXTURE_2D,i.TEXTURE_2D,1),Z[i.TEXTURE_CUBE_MAP]=Le(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[i.TEXTURE_2D_ARRAY]=Le(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Z[i.TEXTURE_3D]=Le(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),te(i.DEPTH_TEST),o.setFunc(Ai),O(!1),Y(va),te(i.CULL_FACE),$(Un);function te(I){u[I]!==!0&&(i.enable(I),u[I]=!0)}function Me(I){u[I]!==!1&&(i.disable(I),u[I]=!1)}function Ce(I,ae){return h[I]!==ae?(i.bindFramebuffer(I,ae),h[I]=ae,I===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=ae),I===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=ae),!0):!1}function Ee(I,ae){let fe=m,ye=!1;if(I){fe=p.get(ae),fe===void 0&&(fe=[],p.set(ae,fe));const re=I.textures;if(fe.length!==re.length||fe[0]!==i.COLOR_ATTACHMENT0){for(let Q=0,we=re.length;Q<we;Q++)fe[Q]=i.COLOR_ATTACHMENT0+Q;fe.length=re.length,ye=!0}}else fe[0]!==i.BACK&&(fe[0]=i.BACK,ye=!0);ye&&i.drawBuffers(fe)}function Xe(I){return g!==I?(i.useProgram(I),g=I,!0):!1}const je={[Yn]:i.FUNC_ADD,[Kl]:i.FUNC_SUBTRACT,[Jl]:i.FUNC_REVERSE_SUBTRACT};je[Zl]=i.MIN,je[jl]=i.MAX;const b={[$l]:i.ZERO,[Ql]:i.ONE,[eu]:i.SRC_COLOR,[$s]:i.SRC_ALPHA,[ou]:i.SRC_ALPHA_SATURATE,[ru]:i.DST_COLOR,[nu]:i.DST_ALPHA,[tu]:i.ONE_MINUS_SRC_COLOR,[Qs]:i.ONE_MINUS_SRC_ALPHA,[su]:i.ONE_MINUS_DST_COLOR,[iu]:i.ONE_MINUS_DST_ALPHA,[au]:i.CONSTANT_COLOR,[cu]:i.ONE_MINUS_CONSTANT_COLOR,[lu]:i.CONSTANT_ALPHA,[uu]:i.ONE_MINUS_CONSTANT_ALPHA};function $(I,ae,fe,ye,re,Q,we,ke,rt,$e){if(I===Un){_===!0&&(Me(i.BLEND),_=!1);return}if(_===!1&&(te(i.BLEND),_=!0),I!==Yl){if(I!==d||$e!==E){if((f!==Yn||x!==Yn)&&(i.blendEquation(i.FUNC_ADD),f=Yn,x=Yn),$e)switch(I){case Ei:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case xa:i.blendFunc(i.ONE,i.ONE);break;case Ma:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Sa:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case Ei:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case xa:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Ma:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Sa:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}M=null,v=null,R=null,w=null,C.set(0,0,0),P=0,d=I,E=$e}return}re=re||ae,Q=Q||fe,we=we||ye,(ae!==f||re!==x)&&(i.blendEquationSeparate(je[ae],je[re]),f=ae,x=re),(fe!==M||ye!==v||Q!==R||we!==w)&&(i.blendFuncSeparate(b[fe],b[ye],b[Q],b[we]),M=fe,v=ye,R=Q,w=we),(ke.equals(C)===!1||rt!==P)&&(i.blendColor(ke.r,ke.g,ke.b,rt),C.copy(ke),P=rt),d=I,E=!1}function H(I,ae){I.side===xn?Me(i.CULL_FACE):te(i.CULL_FACE);let fe=I.side===Rt;ae&&(fe=!fe),O(fe),I.blending===Ei&&I.transparent===!1?$(Un):$(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),o.setFunc(I.depthFunc),o.setTest(I.depthTest),o.setMask(I.depthWrite),s.setMask(I.colorWrite);const ye=I.stencilWrite;a.setTest(ye),ye&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),ne(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?te(i.SAMPLE_ALPHA_TO_COVERAGE):Me(i.SAMPLE_ALPHA_TO_COVERAGE)}function O(I){y!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),y=I)}function Y(I){I!==Xl?(te(i.CULL_FACE),I!==L&&(I===va?i.cullFace(i.BACK):I===ql?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Me(i.CULL_FACE),L=I}function oe(I){I!==U&&(K&&i.lineWidth(I),U=I)}function ne(I,ae,fe){I?(te(i.POLYGON_OFFSET_FILL),(V!==ae||N!==fe)&&(i.polygonOffset(ae,fe),V=ae,N=fe)):Me(i.POLYGON_OFFSET_FILL)}function ue(I){I?te(i.SCISSOR_TEST):Me(i.SCISSOR_TEST)}function ze(I){I===void 0&&(I=i.TEXTURE0+k-1),ce!==I&&(i.activeTexture(I),ce=I)}function Ne(I,ae,fe){fe===void 0&&(ce===null?fe=i.TEXTURE0+k-1:fe=ce);let ye=pe[fe];ye===void 0&&(ye={type:void 0,texture:void 0},pe[fe]=ye),(ye.type!==I||ye.texture!==ae)&&(ce!==fe&&(i.activeTexture(fe),ce=fe),i.bindTexture(I,ae||Z[I]),ye.type=I,ye.texture=ae)}function A(){const I=pe[ce];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function S(){try{i.compressedTexImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function F(){try{i.compressedTexImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function X(){try{i.texSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ee(){try{i.texSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function J(){try{i.compressedTexSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Re(){try{i.compressedTexSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function he(){try{i.texStorage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ae(){try{i.texStorage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function be(){try{i.texImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ie(){try{i.texImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ve(I){Ie.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),Ie.copy(I))}function Oe(I){We.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),We.copy(I))}function Pe(I,ae){let fe=c.get(ae);fe===void 0&&(fe=new WeakMap,c.set(ae,fe));let ye=fe.get(I);ye===void 0&&(ye=i.getUniformBlockIndex(ae,I.name),fe.set(I,ye))}function ge(I,ae){const ye=c.get(ae).get(I);l.get(ae)!==ye&&(i.uniformBlockBinding(ae,ye,I.__bindingPointIndex),l.set(ae,ye))}function He(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},ce=null,pe={},h={},p=new WeakMap,m=[],g=null,_=!1,d=null,f=null,M=null,v=null,x=null,R=null,w=null,C=new Ke(0,0,0),P=0,E=!1,y=null,L=null,U=null,V=null,N=null,Ie.set(0,0,i.canvas.width,i.canvas.height),We.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:te,disable:Me,bindFramebuffer:Ce,drawBuffers:Ee,useProgram:Xe,setBlending:$,setMaterial:H,setFlipSided:O,setCullFace:Y,setLineWidth:oe,setPolygonOffset:ne,setScissorTest:ue,activeTexture:ze,bindTexture:Ne,unbindTexture:A,compressedTexImage2D:S,compressedTexImage3D:F,texImage2D:be,texImage3D:ie,updateUBOMapping:Pe,uniformBlockBinding:ge,texStorage2D:he,texStorage3D:Ae,texSubImage2D:X,texSubImage3D:ee,compressedTexSubImage2D:J,compressedTexSubImage3D:Re,scissor:ve,viewport:Oe,reset:He}}function Bg(i,e,t,n,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new de,u=new WeakMap;let h;const p=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,S){return m?new OffscreenCanvas(A,S):es("canvas")}function _(A,S,F){let X=1;const ee=Ne(A);if((ee.width>F||ee.height>F)&&(X=F/Math.max(ee.width,ee.height)),X<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const J=Math.floor(X*ee.width),Re=Math.floor(X*ee.height);h===void 0&&(h=g(J,Re));const he=S?g(J,Re):h;return he.width=J,he.height=Re,he.getContext("2d").drawImage(A,0,0,J,Re),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+J+"x"+Re+")."),he}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),A;return A}function d(A){return A.generateMipmaps}function f(A){i.generateMipmap(A)}function M(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(A,S,F,X,ee=!1){if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let J=S;if(S===i.RED&&(F===i.FLOAT&&(J=i.R32F),F===i.HALF_FLOAT&&(J=i.R16F),F===i.UNSIGNED_BYTE&&(J=i.R8)),S===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(J=i.R8UI),F===i.UNSIGNED_SHORT&&(J=i.R16UI),F===i.UNSIGNED_INT&&(J=i.R32UI),F===i.BYTE&&(J=i.R8I),F===i.SHORT&&(J=i.R16I),F===i.INT&&(J=i.R32I)),S===i.RG&&(F===i.FLOAT&&(J=i.RG32F),F===i.HALF_FLOAT&&(J=i.RG16F),F===i.UNSIGNED_BYTE&&(J=i.RG8)),S===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&(J=i.RG8UI),F===i.UNSIGNED_SHORT&&(J=i.RG16UI),F===i.UNSIGNED_INT&&(J=i.RG32UI),F===i.BYTE&&(J=i.RG8I),F===i.SHORT&&(J=i.RG16I),F===i.INT&&(J=i.RG32I)),S===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&(J=i.RGB8UI),F===i.UNSIGNED_SHORT&&(J=i.RGB16UI),F===i.UNSIGNED_INT&&(J=i.RGB32UI),F===i.BYTE&&(J=i.RGB8I),F===i.SHORT&&(J=i.RGB16I),F===i.INT&&(J=i.RGB32I)),S===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&(J=i.RGBA8UI),F===i.UNSIGNED_SHORT&&(J=i.RGBA16UI),F===i.UNSIGNED_INT&&(J=i.RGBA32UI),F===i.BYTE&&(J=i.RGBA8I),F===i.SHORT&&(J=i.RGBA16I),F===i.INT&&(J=i.RGBA32I)),S===i.RGB&&(F===i.UNSIGNED_INT_5_9_9_9_REV&&(J=i.RGB9_E5),F===i.UNSIGNED_INT_10F_11F_11F_REV&&(J=i.R11F_G11F_B10F)),S===i.RGBA){const Re=ee?$r:Ze.getTransfer(X);F===i.FLOAT&&(J=i.RGBA32F),F===i.HALF_FLOAT&&(J=i.RGBA16F),F===i.UNSIGNED_BYTE&&(J=Re===tt?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(J=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(J=i.RGB5_A1)}return(J===i.R16F||J===i.R32F||J===i.RG16F||J===i.RG32F||J===i.RGBA16F||J===i.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function x(A,S){let F;return A?S===null||S===Qn||S===ir?F=i.DEPTH24_STENCIL8:S===an?F=i.DEPTH32F_STENCIL8:S===nr&&(F=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Qn||S===ir?F=i.DEPTH_COMPONENT24:S===an?F=i.DEPTH_COMPONENT32F:S===nr&&(F=i.DEPTH_COMPONENT16),F}function R(A,S){return d(A)===!0||A.isFramebufferTexture&&A.minFilter!==zt&&A.minFilter!==on?Math.log2(Math.max(S.width,S.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?S.mipmaps.length:1}function w(A){const S=A.target;S.removeEventListener("dispose",w),P(S),S.isVideoTexture&&u.delete(S)}function C(A){const S=A.target;S.removeEventListener("dispose",C),y(S)}function P(A){const S=n.get(A);if(S.__webglInit===void 0)return;const F=A.source,X=p.get(F);if(X){const ee=X[S.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&E(A),Object.keys(X).length===0&&p.delete(F)}n.remove(A)}function E(A){const S=n.get(A);i.deleteTexture(S.__webglTexture);const F=A.source,X=p.get(F);delete X[S.__cacheKey],o.memory.textures--}function y(A){const S=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(S.__webglFramebuffer[X]))for(let ee=0;ee<S.__webglFramebuffer[X].length;ee++)i.deleteFramebuffer(S.__webglFramebuffer[X][ee]);else i.deleteFramebuffer(S.__webglFramebuffer[X]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[X])}else{if(Array.isArray(S.__webglFramebuffer))for(let X=0;X<S.__webglFramebuffer.length;X++)i.deleteFramebuffer(S.__webglFramebuffer[X]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let X=0;X<S.__webglColorRenderbuffer.length;X++)S.__webglColorRenderbuffer[X]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[X]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const F=A.textures;for(let X=0,ee=F.length;X<ee;X++){const J=n.get(F[X]);J.__webglTexture&&(i.deleteTexture(J.__webglTexture),o.memory.textures--),n.remove(F[X])}n.remove(A)}let L=0;function U(){L=0}function V(){const A=L;return A>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),L+=1,A}function N(A){const S=[];return S.push(A.wrapS),S.push(A.wrapT),S.push(A.wrapR||0),S.push(A.magFilter),S.push(A.minFilter),S.push(A.anisotropy),S.push(A.internalFormat),S.push(A.format),S.push(A.type),S.push(A.generateMipmaps),S.push(A.premultiplyAlpha),S.push(A.flipY),S.push(A.unpackAlignment),S.push(A.colorSpace),S.join()}function k(A,S){const F=n.get(A);if(A.isVideoTexture&&ue(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&F.__version!==A.version){const X=A.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(F,A,S);return}}else A.isExternalTexture&&(F.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+S)}function K(A,S){const F=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&F.__version!==A.version){Z(F,A,S);return}t.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+S)}function j(A,S){const F=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&F.__version!==A.version){Z(F,A,S);return}t.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+S)}function G(A,S){const F=n.get(A);if(A.version>0&&F.__version!==A.version){te(F,A,S);return}t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+S)}const ce={[jr]:i.REPEAT,[Jn]:i.CLAMP_TO_EDGE,[lo]:i.MIRRORED_REPEAT},pe={[zt]:i.NEAREST,[xu]:i.NEAREST_MIPMAP_NEAREST,[_r]:i.NEAREST_MIPMAP_LINEAR,[on]:i.LINEAR,[vs]:i.LINEAR_MIPMAP_NEAREST,[Zn]:i.LINEAR_MIPMAP_LINEAR},xe={[Eu]:i.NEVER,[Cu]:i.ALWAYS,[Tu]:i.LESS,[Yc]:i.LEQUAL,[Au]:i.EQUAL,[Ru]:i.GEQUAL,[bu]:i.GREATER,[wu]:i.NOTEQUAL};function le(A,S){if(S.type===an&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===on||S.magFilter===vs||S.magFilter===_r||S.magFilter===Zn||S.minFilter===on||S.minFilter===vs||S.minFilter===_r||S.minFilter===Zn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,ce[S.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,ce[S.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,ce[S.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,pe[S.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,pe[S.minFilter]),S.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,xe[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===zt||S.minFilter!==_r&&S.minFilter!==Zn||S.type===an&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");i.texParameterf(A,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function Ie(A,S){let F=!1;A.__webglInit===void 0&&(A.__webglInit=!0,S.addEventListener("dispose",w));const X=S.source;let ee=p.get(X);ee===void 0&&(ee={},p.set(X,ee));const J=N(S);if(J!==A.__cacheKey){ee[J]===void 0&&(ee[J]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,F=!0),ee[J].usedTimes++;const Re=ee[A.__cacheKey];Re!==void 0&&(ee[A.__cacheKey].usedTimes--,Re.usedTimes===0&&E(S)),A.__cacheKey=J,A.__webglTexture=ee[J].texture}return F}function We(A,S,F){return Math.floor(Math.floor(A/F)/S)}function Le(A,S,F,X){const J=A.updateRanges;if(J.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,S.width,S.height,F,X,S.data);else{J.sort((ie,ve)=>ie.start-ve.start);let Re=0;for(let ie=1;ie<J.length;ie++){const ve=J[Re],Oe=J[ie],Pe=ve.start+ve.count,ge=We(Oe.start,S.width,4),He=We(ve.start,S.width,4);Oe.start<=Pe+1&&ge===He&&We(Oe.start+Oe.count-1,S.width,4)===ge?ve.count=Math.max(ve.count,Oe.start+Oe.count-ve.start):(++Re,J[Re]=Oe)}J.length=Re+1;const he=i.getParameter(i.UNPACK_ROW_LENGTH),Ae=i.getParameter(i.UNPACK_SKIP_PIXELS),be=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,S.width);for(let ie=0,ve=J.length;ie<ve;ie++){const Oe=J[ie],Pe=Math.floor(Oe.start/4),ge=Math.ceil(Oe.count/4),He=Pe%S.width,I=Math.floor(Pe/S.width),ae=ge,fe=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,He),i.pixelStorei(i.UNPACK_SKIP_ROWS,I),t.texSubImage2D(i.TEXTURE_2D,0,He,I,ae,fe,F,X,S.data)}A.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,he),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ae),i.pixelStorei(i.UNPACK_SKIP_ROWS,be)}}function Z(A,S,F){let X=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(X=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(X=i.TEXTURE_3D);const ee=Ie(A,S),J=S.source;t.bindTexture(X,A.__webglTexture,i.TEXTURE0+F);const Re=n.get(J);if(J.version!==Re.__version||ee===!0){t.activeTexture(i.TEXTURE0+F);const he=Ze.getPrimaries(Ze.workingColorSpace),Ae=S.colorSpace===In?null:Ze.getPrimaries(S.colorSpace),be=S.colorSpace===In||he===Ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);let ie=_(S.image,!1,r.maxTextureSize);ie=ze(S,ie);const ve=s.convert(S.format,S.colorSpace),Oe=s.convert(S.type);let Pe=v(S.internalFormat,ve,Oe,S.colorSpace,S.isVideoTexture);le(X,S);let ge;const He=S.mipmaps,I=S.isVideoTexture!==!0,ae=Re.__version===void 0||ee===!0,fe=J.dataReady,ye=R(S,ie);if(S.isDepthTexture)Pe=x(S.format===sr,S.type),ae&&(I?t.texStorage2D(i.TEXTURE_2D,1,Pe,ie.width,ie.height):t.texImage2D(i.TEXTURE_2D,0,Pe,ie.width,ie.height,0,ve,Oe,null));else if(S.isDataTexture)if(He.length>0){I&&ae&&t.texStorage2D(i.TEXTURE_2D,ye,Pe,He[0].width,He[0].height);for(let re=0,Q=He.length;re<Q;re++)ge=He[re],I?fe&&t.texSubImage2D(i.TEXTURE_2D,re,0,0,ge.width,ge.height,ve,Oe,ge.data):t.texImage2D(i.TEXTURE_2D,re,Pe,ge.width,ge.height,0,ve,Oe,ge.data);S.generateMipmaps=!1}else I?(ae&&t.texStorage2D(i.TEXTURE_2D,ye,Pe,ie.width,ie.height),fe&&Le(S,ie,ve,Oe)):t.texImage2D(i.TEXTURE_2D,0,Pe,ie.width,ie.height,0,ve,Oe,ie.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){I&&ae&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ye,Pe,He[0].width,He[0].height,ie.depth);for(let re=0,Q=He.length;re<Q;re++)if(ge=He[re],S.format!==Qt)if(ve!==null)if(I){if(fe)if(S.layerUpdates.size>0){const we=rc(ge.width,ge.height,S.format,S.type);for(const ke of S.layerUpdates){const rt=ge.data.subarray(ke*we/ge.data.BYTES_PER_ELEMENT,(ke+1)*we/ge.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,ke,ge.width,ge.height,1,ve,rt)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,0,ge.width,ge.height,ie.depth,ve,ge.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,re,Pe,ge.width,ge.height,ie.depth,0,ge.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else I?fe&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,0,ge.width,ge.height,ie.depth,ve,Oe,ge.data):t.texImage3D(i.TEXTURE_2D_ARRAY,re,Pe,ge.width,ge.height,ie.depth,0,ve,Oe,ge.data)}else{I&&ae&&t.texStorage2D(i.TEXTURE_2D,ye,Pe,He[0].width,He[0].height);for(let re=0,Q=He.length;re<Q;re++)ge=He[re],S.format!==Qt?ve!==null?I?fe&&t.compressedTexSubImage2D(i.TEXTURE_2D,re,0,0,ge.width,ge.height,ve,ge.data):t.compressedTexImage2D(i.TEXTURE_2D,re,Pe,ge.width,ge.height,0,ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):I?fe&&t.texSubImage2D(i.TEXTURE_2D,re,0,0,ge.width,ge.height,ve,Oe,ge.data):t.texImage2D(i.TEXTURE_2D,re,Pe,ge.width,ge.height,0,ve,Oe,ge.data)}else if(S.isDataArrayTexture)if(I){if(ae&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ye,Pe,ie.width,ie.height,ie.depth),fe)if(S.layerUpdates.size>0){const re=rc(ie.width,ie.height,S.format,S.type);for(const Q of S.layerUpdates){const we=ie.data.subarray(Q*re/ie.data.BYTES_PER_ELEMENT,(Q+1)*re/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Q,ie.width,ie.height,1,ve,Oe,we)}S.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,ve,Oe,ie.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Pe,ie.width,ie.height,ie.depth,0,ve,Oe,ie.data);else if(S.isData3DTexture)I?(ae&&t.texStorage3D(i.TEXTURE_3D,ye,Pe,ie.width,ie.height,ie.depth),fe&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,ve,Oe,ie.data)):t.texImage3D(i.TEXTURE_3D,0,Pe,ie.width,ie.height,ie.depth,0,ve,Oe,ie.data);else if(S.isFramebufferTexture){if(ae)if(I)t.texStorage2D(i.TEXTURE_2D,ye,Pe,ie.width,ie.height);else{let re=ie.width,Q=ie.height;for(let we=0;we<ye;we++)t.texImage2D(i.TEXTURE_2D,we,Pe,re,Q,0,ve,Oe,null),re>>=1,Q>>=1}}else if(He.length>0){if(I&&ae){const re=Ne(He[0]);t.texStorage2D(i.TEXTURE_2D,ye,Pe,re.width,re.height)}for(let re=0,Q=He.length;re<Q;re++)ge=He[re],I?fe&&t.texSubImage2D(i.TEXTURE_2D,re,0,0,ve,Oe,ge):t.texImage2D(i.TEXTURE_2D,re,Pe,ve,Oe,ge);S.generateMipmaps=!1}else if(I){if(ae){const re=Ne(ie);t.texStorage2D(i.TEXTURE_2D,ye,Pe,re.width,re.height)}fe&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ve,Oe,ie)}else t.texImage2D(i.TEXTURE_2D,0,Pe,ve,Oe,ie);d(S)&&f(X),Re.__version=J.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function te(A,S,F){if(S.image.length!==6)return;const X=Ie(A,S),ee=S.source;t.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+F);const J=n.get(ee);if(ee.version!==J.__version||X===!0){t.activeTexture(i.TEXTURE0+F);const Re=Ze.getPrimaries(Ze.workingColorSpace),he=S.colorSpace===In?null:Ze.getPrimaries(S.colorSpace),Ae=S.colorSpace===In||Re===he?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);const be=S.isCompressedTexture||S.image[0].isCompressedTexture,ie=S.image[0]&&S.image[0].isDataTexture,ve=[];for(let Q=0;Q<6;Q++)!be&&!ie?ve[Q]=_(S.image[Q],!0,r.maxCubemapSize):ve[Q]=ie?S.image[Q].image:S.image[Q],ve[Q]=ze(S,ve[Q]);const Oe=ve[0],Pe=s.convert(S.format,S.colorSpace),ge=s.convert(S.type),He=v(S.internalFormat,Pe,ge,S.colorSpace),I=S.isVideoTexture!==!0,ae=J.__version===void 0||X===!0,fe=ee.dataReady;let ye=R(S,Oe);le(i.TEXTURE_CUBE_MAP,S);let re;if(be){I&&ae&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ye,He,Oe.width,Oe.height);for(let Q=0;Q<6;Q++){re=ve[Q].mipmaps;for(let we=0;we<re.length;we++){const ke=re[we];S.format!==Qt?Pe!==null?I?fe&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we,0,0,ke.width,ke.height,Pe,ke.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we,He,ke.width,ke.height,0,ke.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?fe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we,0,0,ke.width,ke.height,Pe,ge,ke.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we,He,ke.width,ke.height,0,Pe,ge,ke.data)}}}else{if(re=S.mipmaps,I&&ae){re.length>0&&ye++;const Q=Ne(ve[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ye,He,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(ie){I?fe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,ve[Q].width,ve[Q].height,Pe,ge,ve[Q].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,He,ve[Q].width,ve[Q].height,0,Pe,ge,ve[Q].data);for(let we=0;we<re.length;we++){const rt=re[we].image[Q].image;I?fe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we+1,0,0,rt.width,rt.height,Pe,ge,rt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we+1,He,rt.width,rt.height,0,Pe,ge,rt.data)}}else{I?fe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Pe,ge,ve[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,He,Pe,ge,ve[Q]);for(let we=0;we<re.length;we++){const ke=re[we];I?fe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we+1,0,0,Pe,ge,ke.image[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we+1,He,Pe,ge,ke.image[Q])}}}d(S)&&f(i.TEXTURE_CUBE_MAP),J.__version=ee.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function Me(A,S,F,X,ee,J){const Re=s.convert(F.format,F.colorSpace),he=s.convert(F.type),Ae=v(F.internalFormat,Re,he,F.colorSpace),be=n.get(S),ie=n.get(F);if(ie.__renderTarget=S,!be.__hasExternalTextures){const ve=Math.max(1,S.width>>J),Oe=Math.max(1,S.height>>J);ee===i.TEXTURE_3D||ee===i.TEXTURE_2D_ARRAY?t.texImage3D(ee,J,Ae,ve,Oe,S.depth,0,Re,he,null):t.texImage2D(ee,J,Ae,ve,Oe,0,Re,he,null)}t.bindFramebuffer(i.FRAMEBUFFER,A),ne(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,ee,ie.__webglTexture,0,oe(S)):(ee===i.TEXTURE_2D||ee>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,X,ee,ie.__webglTexture,J),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ce(A,S,F){if(i.bindRenderbuffer(i.RENDERBUFFER,A),S.depthBuffer){const X=S.depthTexture,ee=X&&X.isDepthTexture?X.type:null,J=x(S.stencilBuffer,ee),Re=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,he=oe(S);ne(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,he,J,S.width,S.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,he,J,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,J,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Re,i.RENDERBUFFER,A)}else{const X=S.textures;for(let ee=0;ee<X.length;ee++){const J=X[ee],Re=s.convert(J.format,J.colorSpace),he=s.convert(J.type),Ae=v(J.internalFormat,Re,he,J.colorSpace),be=oe(S);F&&ne(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,be,Ae,S.width,S.height):ne(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,be,Ae,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,Ae,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ee(A,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,A),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const X=n.get(S.depthTexture);X.__renderTarget=S,(!X.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),k(S.depthTexture,0);const ee=X.__webglTexture,J=oe(S);if(S.depthTexture.format===rr)ne(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ee,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ee,0);else if(S.depthTexture.format===sr)ne(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ee,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function Xe(A){const S=n.get(A),F=A.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==A.depthTexture){const X=A.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),X){const ee=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,X.removeEventListener("dispose",ee)};X.addEventListener("dispose",ee),S.__depthDisposeCallback=ee}S.__boundDepthTexture=X}if(A.depthTexture&&!S.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");const X=A.texture.mipmaps;X&&X.length>0?Ee(S.__webglFramebuffer[0],A):Ee(S.__webglFramebuffer,A)}else if(F){S.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[X]),S.__webglDepthbuffer[X]===void 0)S.__webglDepthbuffer[X]=i.createRenderbuffer(),Ce(S.__webglDepthbuffer[X],A,!1);else{const ee=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=S.__webglDepthbuffer[X];i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,J)}}else{const X=A.texture.mipmaps;if(X&&X.length>0?t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),Ce(S.__webglDepthbuffer,A,!1);else{const ee=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,J)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function je(A,S,F){const X=n.get(A);S!==void 0&&Me(X.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&Xe(A)}function b(A){const S=A.texture,F=n.get(A),X=n.get(S);A.addEventListener("dispose",C);const ee=A.textures,J=A.isWebGLCubeRenderTarget===!0,Re=ee.length>1;if(Re||(X.__webglTexture===void 0&&(X.__webglTexture=i.createTexture()),X.__version=S.version,o.memory.textures++),J){F.__webglFramebuffer=[];for(let he=0;he<6;he++)if(S.mipmaps&&S.mipmaps.length>0){F.__webglFramebuffer[he]=[];for(let Ae=0;Ae<S.mipmaps.length;Ae++)F.__webglFramebuffer[he][Ae]=i.createFramebuffer()}else F.__webglFramebuffer[he]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){F.__webglFramebuffer=[];for(let he=0;he<S.mipmaps.length;he++)F.__webglFramebuffer[he]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(Re)for(let he=0,Ae=ee.length;he<Ae;he++){const be=n.get(ee[he]);be.__webglTexture===void 0&&(be.__webglTexture=i.createTexture(),o.memory.textures++)}if(A.samples>0&&ne(A)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let he=0;he<ee.length;he++){const Ae=ee[he];F.__webglColorRenderbuffer[he]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[he]);const be=s.convert(Ae.format,Ae.colorSpace),ie=s.convert(Ae.type),ve=v(Ae.internalFormat,be,ie,Ae.colorSpace,A.isXRRenderTarget===!0),Oe=oe(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,Oe,ve,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,F.__webglColorRenderbuffer[he])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),Ce(F.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(J){t.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture),le(i.TEXTURE_CUBE_MAP,S);for(let he=0;he<6;he++)if(S.mipmaps&&S.mipmaps.length>0)for(let Ae=0;Ae<S.mipmaps.length;Ae++)Me(F.__webglFramebuffer[he][Ae],A,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ae);else Me(F.__webglFramebuffer[he],A,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0);d(S)&&f(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Re){for(let he=0,Ae=ee.length;he<Ae;he++){const be=ee[he],ie=n.get(be);let ve=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ve=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ve,ie.__webglTexture),le(ve,be),Me(F.__webglFramebuffer,A,be,i.COLOR_ATTACHMENT0+he,ve,0),d(be)&&f(ve)}t.unbindTexture()}else{let he=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(he=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(he,X.__webglTexture),le(he,S),S.mipmaps&&S.mipmaps.length>0)for(let Ae=0;Ae<S.mipmaps.length;Ae++)Me(F.__webglFramebuffer[Ae],A,S,i.COLOR_ATTACHMENT0,he,Ae);else Me(F.__webglFramebuffer,A,S,i.COLOR_ATTACHMENT0,he,0);d(S)&&f(he),t.unbindTexture()}A.depthBuffer&&Xe(A)}function $(A){const S=A.textures;for(let F=0,X=S.length;F<X;F++){const ee=S[F];if(d(ee)){const J=M(A),Re=n.get(ee).__webglTexture;t.bindTexture(J,Re),f(J),t.unbindTexture()}}}const H=[],O=[];function Y(A){if(A.samples>0){if(ne(A)===!1){const S=A.textures,F=A.width,X=A.height;let ee=i.COLOR_BUFFER_BIT;const J=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Re=n.get(A),he=S.length>1;if(he)for(let be=0;be<S.length;be++)t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Re.__webglMultisampledFramebuffer);const Ae=A.texture.mipmaps;Ae&&Ae.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Re.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Re.__webglFramebuffer);for(let be=0;be<S.length;be++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(ee|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(ee|=i.STENCIL_BUFFER_BIT)),he){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Re.__webglColorRenderbuffer[be]);const ie=n.get(S[be]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ie,0)}i.blitFramebuffer(0,0,F,X,0,0,F,X,ee,i.NEAREST),l===!0&&(H.length=0,O.length=0,H.push(i.COLOR_ATTACHMENT0+be),A.depthBuffer&&A.resolveDepthBuffer===!1&&(H.push(J),O.push(J),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,O)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,H))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),he)for(let be=0;be<S.length;be++){t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.RENDERBUFFER,Re.__webglColorRenderbuffer[be]);const ie=n.get(S[be]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.TEXTURE_2D,ie,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Re.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const S=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function oe(A){return Math.min(r.maxSamples,A.samples)}function ne(A){const S=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function ue(A){const S=o.render.frame;u.get(A)!==S&&(u.set(A,S),A.update())}function ze(A,S){const F=A.colorSpace,X=A.format,ee=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||F!==Ri&&F!==In&&(Ze.getTransfer(F)===tt?(X!==Qt||ee!==ln)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),S}function Ne(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=U,this.setTexture2D=k,this.setTexture2DArray=K,this.setTexture3D=j,this.setTextureCube=G,this.rebindTextures=je,this.setupRenderTarget=b,this.updateRenderTargetMipmap=$,this.updateMultisampleRenderTarget=Y,this.setupDepthRenderbuffer=Xe,this.setupFrameBufferTexture=Me,this.useMultisampledRTT=ne}function zg(i,e){function t(n,r=In){let s;const o=Ze.getTransfer(r);if(n===ln)return i.UNSIGNED_BYTE;if(n===qo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Yo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Hc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Vc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===zc)return i.BYTE;if(n===kc)return i.SHORT;if(n===nr)return i.UNSIGNED_SHORT;if(n===Xo)return i.INT;if(n===Qn)return i.UNSIGNED_INT;if(n===an)return i.FLOAT;if(n===fr)return i.HALF_FLOAT;if(n===Gc)return i.ALPHA;if(n===Wc)return i.RGB;if(n===Qt)return i.RGBA;if(n===rr)return i.DEPTH_COMPONENT;if(n===sr)return i.DEPTH_STENCIL;if(n===Ko)return i.RED;if(n===Jo)return i.RED_INTEGER;if(n===Xc)return i.RG;if(n===Zo)return i.RG_INTEGER;if(n===jo)return i.RGBA_INTEGER;if(n===Wr||n===Xr||n===qr||n===Yr)if(o===tt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Wr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Xr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===qr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Yr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Wr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Xr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===qr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Yr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===uo||n===ho||n===fo||n===po)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===uo)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ho)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===fo)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===po)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===mo||n===go||n===_o)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===mo||n===go)return o===tt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===_o)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===vo||n===xo||n===Mo||n===So||n===yo||n===Eo||n===To||n===Ao||n===bo||n===wo||n===Ro||n===Co||n===Po||n===Lo)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===vo)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===xo)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Mo)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===So)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===yo)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Eo)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===To)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ao)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===bo)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===wo)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ro)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Co)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Po)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Lo)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Do||n===Io||n===Uo)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Do)return o===tt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Io)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Uo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===No||n===Fo||n===Oo||n===Bo)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===No)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Fo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Oo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Bo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ir?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const kg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Hg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Vg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new al(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new An({vertexShader:kg,fragmentShader:Hg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Et(new dr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Gg extends Ii{constructor(e,t){super();const n=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,p=null,m=null,g=null;const _=typeof XRWebGLBinding<"u",d=new Vg,f={},M=t.getContextAttributes();let v=null,x=null;const R=[],w=[],C=new de;let P=null;const E=new Wt;E.viewport=new ht;const y=new Wt;y.viewport=new ht;const L=[E,y],U=new uf;let V=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let te=R[Z];return te===void 0&&(te=new zs,R[Z]=te),te.getTargetRaySpace()},this.getControllerGrip=function(Z){let te=R[Z];return te===void 0&&(te=new zs,R[Z]=te),te.getGripSpace()},this.getHand=function(Z){let te=R[Z];return te===void 0&&(te=new zs,R[Z]=te),te.getHandSpace()};function k(Z){const te=w.indexOf(Z.inputSource);if(te===-1)return;const Me=R[te];Me!==void 0&&(Me.update(Z.inputSource,Z.frame,c||o),Me.dispatchEvent({type:Z.type,data:Z.inputSource}))}function K(){r.removeEventListener("select",k),r.removeEventListener("selectstart",k),r.removeEventListener("selectend",k),r.removeEventListener("squeeze",k),r.removeEventListener("squeezestart",k),r.removeEventListener("squeezeend",k),r.removeEventListener("end",K),r.removeEventListener("inputsourceschange",j);for(let Z=0;Z<R.length;Z++){const te=w[Z];te!==null&&(w[Z]=null,R[Z].disconnect(te))}V=null,N=null,d.reset();for(const Z in f)delete f[Z];e.setRenderTarget(v),m=null,p=null,h=null,r=null,x=null,Le.stop(),n.isPresenting=!1,e.setPixelRatio(P),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){s=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){a=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return p!==null?p:m},this.getBinding=function(){return h===null&&_&&(h=new XRWebGLBinding(r,t)),h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(Z){if(r=Z,r!==null){if(v=e.getRenderTarget(),r.addEventListener("select",k),r.addEventListener("selectstart",k),r.addEventListener("selectend",k),r.addEventListener("squeeze",k),r.addEventListener("squeezestart",k),r.addEventListener("squeezeend",k),r.addEventListener("end",K),r.addEventListener("inputsourceschange",j),M.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let Me=null,Ce=null,Ee=null;M.depth&&(Ee=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Me=M.stencil?sr:rr,Ce=M.stencil?ir:Qn);const Xe={colorFormat:t.RGBA8,depthFormat:Ee,scaleFactor:s};h=this.getBinding(),p=h.createProjectionLayer(Xe),r.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),x=new ei(p.textureWidth,p.textureHeight,{format:Qt,type:ln,depthTexture:new ol(p.textureWidth,p.textureHeight,Ce,void 0,void 0,void 0,void 0,void 0,void 0,Me),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{const Me={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,Me),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),x=new ei(m.framebufferWidth,m.framebufferHeight,{format:Qt,type:ln,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),Le.setContext(r),Le.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return d.getDepthTexture()};function j(Z){for(let te=0;te<Z.removed.length;te++){const Me=Z.removed[te],Ce=w.indexOf(Me);Ce>=0&&(w[Ce]=null,R[Ce].disconnect(Me))}for(let te=0;te<Z.added.length;te++){const Me=Z.added[te];let Ce=w.indexOf(Me);if(Ce===-1){for(let Xe=0;Xe<R.length;Xe++)if(Xe>=w.length){w.push(Me),Ce=Xe;break}else if(w[Xe]===null){w[Xe]=Me,Ce=Xe;break}if(Ce===-1)break}const Ee=R[Ce];Ee&&Ee.connect(Me)}}const G=new D,ce=new D;function pe(Z,te,Me){G.setFromMatrixPosition(te.matrixWorld),ce.setFromMatrixPosition(Me.matrixWorld);const Ce=G.distanceTo(ce),Ee=te.projectionMatrix.elements,Xe=Me.projectionMatrix.elements,je=Ee[14]/(Ee[10]-1),b=Ee[14]/(Ee[10]+1),$=(Ee[9]+1)/Ee[5],H=(Ee[9]-1)/Ee[5],O=(Ee[8]-1)/Ee[0],Y=(Xe[8]+1)/Xe[0],oe=je*O,ne=je*Y,ue=Ce/(-O+Y),ze=ue*-O;if(te.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(ze),Z.translateZ(ue),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Ee[10]===-1)Z.projectionMatrix.copy(te.projectionMatrix),Z.projectionMatrixInverse.copy(te.projectionMatrixInverse);else{const Ne=je+ue,A=b+ue,S=oe-ze,F=ne+(Ce-ze),X=$*b/A*Ne,ee=H*b/A*Ne;Z.projectionMatrix.makePerspective(S,F,X,ee,Ne,A),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function xe(Z,te){te===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(te.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(r===null)return;let te=Z.near,Me=Z.far;d.texture!==null&&(d.depthNear>0&&(te=d.depthNear),d.depthFar>0&&(Me=d.depthFar)),U.near=y.near=E.near=te,U.far=y.far=E.far=Me,(V!==U.near||N!==U.far)&&(r.updateRenderState({depthNear:U.near,depthFar:U.far}),V=U.near,N=U.far),U.layers.mask=Z.layers.mask|6,E.layers.mask=U.layers.mask&3,y.layers.mask=U.layers.mask&5;const Ce=Z.parent,Ee=U.cameras;xe(U,Ce);for(let Xe=0;Xe<Ee.length;Xe++)xe(Ee[Xe],Ce);Ee.length===2?pe(U,E,y):U.projectionMatrix.copy(E.projectionMatrix),le(Z,U,Ce)};function le(Z,te,Me){Me===null?Z.matrix.copy(te.matrixWorld):(Z.matrix.copy(Me.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(te.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(te.projectionMatrix),Z.projectionMatrixInverse.copy(te.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=or*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(p===null&&m===null))return l},this.setFoveation=function(Z){l=Z,p!==null&&(p.fixedFoveation=Z),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=Z)},this.hasDepthSensing=function(){return d.texture!==null},this.getDepthSensingMesh=function(){return d.getMesh(U)},this.getCameraTexture=function(Z){return f[Z]};let Ie=null;function We(Z,te){if(u=te.getViewerPose(c||o),g=te,u!==null){const Me=u.views;m!==null&&(e.setRenderTargetFramebuffer(x,m.framebuffer),e.setRenderTarget(x));let Ce=!1;Me.length!==U.cameras.length&&(U.cameras.length=0,Ce=!0);for(let b=0;b<Me.length;b++){const $=Me[b];let H=null;if(m!==null)H=m.getViewport($);else{const Y=h.getViewSubImage(p,$);H=Y.viewport,b===0&&(e.setRenderTargetTextures(x,Y.colorTexture,Y.depthStencilTexture),e.setRenderTarget(x))}let O=L[b];O===void 0&&(O=new Wt,O.layers.enable(b),O.viewport=new ht,L[b]=O),O.matrix.fromArray($.transform.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale),O.projectionMatrix.fromArray($.projectionMatrix),O.projectionMatrixInverse.copy(O.projectionMatrix).invert(),O.viewport.set(H.x,H.y,H.width,H.height),b===0&&(U.matrix.copy(O.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Ce===!0&&U.cameras.push(O)}const Ee=r.enabledFeatures;if(Ee&&Ee.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){h=n.getBinding();const b=h.getDepthInformation(Me[0]);b&&b.isValid&&b.texture&&d.init(b,r.renderState)}if(Ee&&Ee.includes("camera-access")&&_){e.state.unbindTexture(),h=n.getBinding();for(let b=0;b<Me.length;b++){const $=Me[b].camera;if($){let H=f[$];H||(H=new al,f[$]=H);const O=h.getCameraImage($);H.sourceTexture=O}}}}for(let Me=0;Me<R.length;Me++){const Ce=w[Me],Ee=R[Me];Ce!==null&&Ee!==void 0&&Ee.update(Ce,te,c||o)}Ie&&Ie(Z,te),te.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:te}),g=null}const Le=new Sl;Le.setAnimationLoop(We),this.setAnimationLoop=function(Z){Ie=Z},this.dispose=function(){}}}const Wn=new qt,Wg=new st;function Xg(i,e){function t(d,f){d.matrixAutoUpdate===!0&&d.updateMatrix(),f.value.copy(d.matrix)}function n(d,f){f.color.getRGB(d.fogColor.value,tl(i)),f.isFog?(d.fogNear.value=f.near,d.fogFar.value=f.far):f.isFogExp2&&(d.fogDensity.value=f.density)}function r(d,f,M,v,x){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(d,f):f.isMeshToonMaterial?(s(d,f),h(d,f)):f.isMeshPhongMaterial?(s(d,f),u(d,f)):f.isMeshStandardMaterial?(s(d,f),p(d,f),f.isMeshPhysicalMaterial&&m(d,f,x)):f.isMeshMatcapMaterial?(s(d,f),g(d,f)):f.isMeshDepthMaterial?s(d,f):f.isMeshDistanceMaterial?(s(d,f),_(d,f)):f.isMeshNormalMaterial?s(d,f):f.isLineBasicMaterial?(o(d,f),f.isLineDashedMaterial&&a(d,f)):f.isPointsMaterial?l(d,f,M,v):f.isSpriteMaterial?c(d,f):f.isShadowMaterial?(d.color.value.copy(f.color),d.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(d,f){d.opacity.value=f.opacity,f.color&&d.diffuse.value.copy(f.color),f.emissive&&d.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(d.map.value=f.map,t(f.map,d.mapTransform)),f.alphaMap&&(d.alphaMap.value=f.alphaMap,t(f.alphaMap,d.alphaMapTransform)),f.bumpMap&&(d.bumpMap.value=f.bumpMap,t(f.bumpMap,d.bumpMapTransform),d.bumpScale.value=f.bumpScale,f.side===Rt&&(d.bumpScale.value*=-1)),f.normalMap&&(d.normalMap.value=f.normalMap,t(f.normalMap,d.normalMapTransform),d.normalScale.value.copy(f.normalScale),f.side===Rt&&d.normalScale.value.negate()),f.displacementMap&&(d.displacementMap.value=f.displacementMap,t(f.displacementMap,d.displacementMapTransform),d.displacementScale.value=f.displacementScale,d.displacementBias.value=f.displacementBias),f.emissiveMap&&(d.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,d.emissiveMapTransform)),f.specularMap&&(d.specularMap.value=f.specularMap,t(f.specularMap,d.specularMapTransform)),f.alphaTest>0&&(d.alphaTest.value=f.alphaTest);const M=e.get(f),v=M.envMap,x=M.envMapRotation;v&&(d.envMap.value=v,Wn.copy(x),Wn.x*=-1,Wn.y*=-1,Wn.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Wn.y*=-1,Wn.z*=-1),d.envMapRotation.value.setFromMatrix4(Wg.makeRotationFromEuler(Wn)),d.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,d.reflectivity.value=f.reflectivity,d.ior.value=f.ior,d.refractionRatio.value=f.refractionRatio),f.lightMap&&(d.lightMap.value=f.lightMap,d.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,d.lightMapTransform)),f.aoMap&&(d.aoMap.value=f.aoMap,d.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,d.aoMapTransform))}function o(d,f){d.diffuse.value.copy(f.color),d.opacity.value=f.opacity,f.map&&(d.map.value=f.map,t(f.map,d.mapTransform))}function a(d,f){d.dashSize.value=f.dashSize,d.totalSize.value=f.dashSize+f.gapSize,d.scale.value=f.scale}function l(d,f,M,v){d.diffuse.value.copy(f.color),d.opacity.value=f.opacity,d.size.value=f.size*M,d.scale.value=v*.5,f.map&&(d.map.value=f.map,t(f.map,d.uvTransform)),f.alphaMap&&(d.alphaMap.value=f.alphaMap,t(f.alphaMap,d.alphaMapTransform)),f.alphaTest>0&&(d.alphaTest.value=f.alphaTest)}function c(d,f){d.diffuse.value.copy(f.color),d.opacity.value=f.opacity,d.rotation.value=f.rotation,f.map&&(d.map.value=f.map,t(f.map,d.mapTransform)),f.alphaMap&&(d.alphaMap.value=f.alphaMap,t(f.alphaMap,d.alphaMapTransform)),f.alphaTest>0&&(d.alphaTest.value=f.alphaTest)}function u(d,f){d.specular.value.copy(f.specular),d.shininess.value=Math.max(f.shininess,1e-4)}function h(d,f){f.gradientMap&&(d.gradientMap.value=f.gradientMap)}function p(d,f){d.metalness.value=f.metalness,f.metalnessMap&&(d.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,d.metalnessMapTransform)),d.roughness.value=f.roughness,f.roughnessMap&&(d.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,d.roughnessMapTransform)),f.envMap&&(d.envMapIntensity.value=f.envMapIntensity)}function m(d,f,M){d.ior.value=f.ior,f.sheen>0&&(d.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),d.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(d.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,d.sheenColorMapTransform)),f.sheenRoughnessMap&&(d.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,d.sheenRoughnessMapTransform))),f.clearcoat>0&&(d.clearcoat.value=f.clearcoat,d.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(d.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,d.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(d.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Rt&&d.clearcoatNormalScale.value.negate())),f.dispersion>0&&(d.dispersion.value=f.dispersion),f.iridescence>0&&(d.iridescence.value=f.iridescence,d.iridescenceIOR.value=f.iridescenceIOR,d.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(d.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,d.iridescenceMapTransform)),f.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),f.transmission>0&&(d.transmission.value=f.transmission,d.transmissionSamplerMap.value=M.texture,d.transmissionSamplerSize.value.set(M.width,M.height),f.transmissionMap&&(d.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,d.transmissionMapTransform)),d.thickness.value=f.thickness,f.thicknessMap&&(d.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=f.attenuationDistance,d.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(d.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(d.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=f.specularIntensity,d.specularColor.value.copy(f.specularColor),f.specularColorMap&&(d.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,d.specularColorMapTransform)),f.specularIntensityMap&&(d.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,d.specularIntensityMapTransform))}function g(d,f){f.matcap&&(d.matcap.value=f.matcap)}function _(d,f){const M=e.get(f).light;d.referencePosition.value.setFromMatrixPosition(M.matrixWorld),d.nearDistance.value=M.shadow.camera.near,d.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function qg(i,e,t,n){let r={},s={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,v){const x=v.program;n.uniformBlockBinding(M,x)}function c(M,v){let x=r[M.id];x===void 0&&(g(M),x=u(M),r[M.id]=x,M.addEventListener("dispose",d));const R=v.program;n.updateUBOMapping(M,R);const w=e.render.frame;s[M.id]!==w&&(p(M),s[M.id]=w)}function u(M){const v=h();M.__bindingPointIndex=v;const x=i.createBuffer(),R=M.__size,w=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,R,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,x),x}function h(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(M){const v=r[M.id],x=M.uniforms,R=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let w=0,C=x.length;w<C;w++){const P=Array.isArray(x[w])?x[w]:[x[w]];for(let E=0,y=P.length;E<y;E++){const L=P[E];if(m(L,w,E,R)===!0){const U=L.__offset,V=Array.isArray(L.value)?L.value:[L.value];let N=0;for(let k=0;k<V.length;k++){const K=V[k],j=_(K);typeof K=="number"||typeof K=="boolean"?(L.__data[0]=K,i.bufferSubData(i.UNIFORM_BUFFER,U+N,L.__data)):K.isMatrix3?(L.__data[0]=K.elements[0],L.__data[1]=K.elements[1],L.__data[2]=K.elements[2],L.__data[3]=0,L.__data[4]=K.elements[3],L.__data[5]=K.elements[4],L.__data[6]=K.elements[5],L.__data[7]=0,L.__data[8]=K.elements[6],L.__data[9]=K.elements[7],L.__data[10]=K.elements[8],L.__data[11]=0):(K.toArray(L.__data,N),N+=j.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,U,L.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(M,v,x,R){const w=M.value,C=v+"_"+x;if(R[C]===void 0)return typeof w=="number"||typeof w=="boolean"?R[C]=w:R[C]=w.clone(),!0;{const P=R[C];if(typeof w=="number"||typeof w=="boolean"){if(P!==w)return R[C]=w,!0}else if(P.equals(w)===!1)return P.copy(w),!0}return!1}function g(M){const v=M.uniforms;let x=0;const R=16;for(let C=0,P=v.length;C<P;C++){const E=Array.isArray(v[C])?v[C]:[v[C]];for(let y=0,L=E.length;y<L;y++){const U=E[y],V=Array.isArray(U.value)?U.value:[U.value];for(let N=0,k=V.length;N<k;N++){const K=V[N],j=_(K),G=x%R,ce=G%j.boundary,pe=G+ce;x+=ce,pe!==0&&R-pe<j.storage&&(x+=R-pe),U.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=x,x+=j.storage}}}const w=x%R;return w>0&&(x+=R-w),M.__size=x,M.__cache={},this}function _(M){const v={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(v.boundary=4,v.storage=4):M.isVector2?(v.boundary=8,v.storage=8):M.isVector3||M.isColor?(v.boundary=16,v.storage=12):M.isVector4?(v.boundary=16,v.storage=16):M.isMatrix3?(v.boundary=48,v.storage=48):M.isMatrix4?(v.boundary=64,v.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),v}function d(M){const v=M.target;v.removeEventListener("dispose",d);const x=o.indexOf(v.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(r[v.id]),delete r[v.id],delete s[v.id]}function f(){for(const M in r)i.deleteBuffer(r[M]);o=[],r={},s={}}return{bind:l,update:c,dispose:f}}class Yg{constructor(e={}){const{canvas:t=qu(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:p=!1}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=o;const g=new Uint32Array(4),_=new Int32Array(4);let d=null,f=null;const M=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Nn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let R=!1;this._outputColorSpace=Lt;let w=0,C=0,P=null,E=-1,y=null;const L=new ht,U=new ht;let V=null;const N=new Ke(0);let k=0,K=t.width,j=t.height,G=1,ce=null,pe=null;const xe=new ht(0,0,K,j),le=new ht(0,0,K,j);let Ie=!1;const We=new ta;let Le=!1,Z=!1;const te=new st,Me=new D,Ce=new ht,Ee={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Xe=!1;function je(){return P===null?G:1}let b=n;function $(T,B){return t.getContext(T,B)}try{const T={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Wo}`),t.addEventListener("webglcontextlost",fe,!1),t.addEventListener("webglcontextrestored",ye,!1),t.addEventListener("webglcontextcreationerror",re,!1),b===null){const B="webgl2";if(b=$(B,T),b===null)throw $(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let H,O,Y,oe,ne,ue,ze,Ne,A,S,F,X,ee,J,Re,he,Ae,be,ie,ve,Oe,Pe,ge,He;function I(){H=new im(b),H.init(),Pe=new zg(b,H),O=new Zp(b,H,e,Pe),Y=new Og(b,H),O.reversedDepthBuffer&&p&&Y.buffers.depth.setReversed(!0),oe=new om(b),ne=new Tg,ue=new Bg(b,H,Y,ne,O,Pe,oe),ze=new $p(x),Ne=new nm(x),A=new ff(b),ge=new Kp(b,A),S=new rm(b,A,oe,ge),F=new cm(b,S,A,oe),ie=new am(b,O,ue),he=new jp(ne),X=new Eg(x,ze,Ne,H,O,ge,he),ee=new Xg(x,ne),J=new bg,Re=new Dg(H),be=new Yp(x,ze,Ne,Y,F,m,l),Ae=new Ng(x,F,O),He=new qg(b,oe,O,Y),ve=new Jp(b,H,oe),Oe=new sm(b,H,oe),oe.programs=X.programs,x.capabilities=O,x.extensions=H,x.properties=ne,x.renderLists=J,x.shadowMap=Ae,x.state=Y,x.info=oe}I();const ae=new Gg(x,b);this.xr=ae,this.getContext=function(){return b},this.getContextAttributes=function(){return b.getContextAttributes()},this.forceContextLoss=function(){const T=H.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=H.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(T){T!==void 0&&(G=T,this.setSize(K,j,!1))},this.getSize=function(T){return T.set(K,j)},this.setSize=function(T,B,W=!0){if(ae.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}K=T,j=B,t.width=Math.floor(T*G),t.height=Math.floor(B*G),W===!0&&(t.style.width=T+"px",t.style.height=B+"px"),this.setViewport(0,0,T,B)},this.getDrawingBufferSize=function(T){return T.set(K*G,j*G).floor()},this.setDrawingBufferSize=function(T,B,W){K=T,j=B,G=W,t.width=Math.floor(T*W),t.height=Math.floor(B*W),this.setViewport(0,0,T,B)},this.getCurrentViewport=function(T){return T.copy(L)},this.getViewport=function(T){return T.copy(xe)},this.setViewport=function(T,B,W,q){T.isVector4?xe.set(T.x,T.y,T.z,T.w):xe.set(T,B,W,q),Y.viewport(L.copy(xe).multiplyScalar(G).round())},this.getScissor=function(T){return T.copy(le)},this.setScissor=function(T,B,W,q){T.isVector4?le.set(T.x,T.y,T.z,T.w):le.set(T,B,W,q),Y.scissor(U.copy(le).multiplyScalar(G).round())},this.getScissorTest=function(){return Ie},this.setScissorTest=function(T){Y.setScissorTest(Ie=T)},this.setOpaqueSort=function(T){ce=T},this.setTransparentSort=function(T){pe=T},this.getClearColor=function(T){return T.copy(be.getClearColor())},this.setClearColor=function(){be.setClearColor(...arguments)},this.getClearAlpha=function(){return be.getClearAlpha()},this.setClearAlpha=function(){be.setClearAlpha(...arguments)},this.clear=function(T=!0,B=!0,W=!0){let q=0;if(T){let z=!1;if(P!==null){const se=P.texture.format;z=se===jo||se===Zo||se===Jo}if(z){const se=P.texture.type,_e=se===ln||se===Qn||se===nr||se===ir||se===qo||se===Yo,Te=be.getClearColor(),Se=be.getClearAlpha(),Fe=Te.r,Be=Te.g,De=Te.b;_e?(g[0]=Fe,g[1]=Be,g[2]=De,g[3]=Se,b.clearBufferuiv(b.COLOR,0,g)):(_[0]=Fe,_[1]=Be,_[2]=De,_[3]=Se,b.clearBufferiv(b.COLOR,0,_))}else q|=b.COLOR_BUFFER_BIT}B&&(q|=b.DEPTH_BUFFER_BIT),W&&(q|=b.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),b.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",fe,!1),t.removeEventListener("webglcontextrestored",ye,!1),t.removeEventListener("webglcontextcreationerror",re,!1),be.dispose(),J.dispose(),Re.dispose(),ne.dispose(),ze.dispose(),Ne.dispose(),F.dispose(),ge.dispose(),He.dispose(),X.dispose(),ae.dispose(),ae.removeEventListener("sessionstart",rn),ae.removeEventListener("sessionend",fa),On.stop()};function fe(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function ye(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const T=oe.autoReset,B=Ae.enabled,W=Ae.autoUpdate,q=Ae.needsUpdate,z=Ae.type;I(),oe.autoReset=T,Ae.enabled=B,Ae.autoUpdate=W,Ae.needsUpdate=q,Ae.type=z}function re(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Q(T){const B=T.target;B.removeEventListener("dispose",Q),we(B)}function we(T){ke(T),ne.remove(T)}function ke(T){const B=ne.get(T).programs;B!==void 0&&(B.forEach(function(W){X.releaseProgram(W)}),T.isShaderMaterial&&X.releaseShaderCache(T))}this.renderBufferDirect=function(T,B,W,q,z,se){B===null&&(B=Ee);const _e=z.isMesh&&z.matrixWorld.determinant()<0,Te=Ol(T,B,W,q,z);Y.setMaterial(q,_e);let Se=W.index,Fe=1;if(q.wireframe===!0){if(Se=S.getWireframeAttribute(W),Se===void 0)return;Fe=2}const Be=W.drawRange,De=W.attributes.position;let Ye=Be.start*Fe,et=(Be.start+Be.count)*Fe;se!==null&&(Ye=Math.max(Ye,se.start*Fe),et=Math.min(et,(se.start+se.count)*Fe)),Se!==null?(Ye=Math.max(Ye,0),et=Math.min(et,Se.count)):De!=null&&(Ye=Math.max(Ye,0),et=Math.min(et,De.count));const ut=et-Ye;if(ut<0||ut===1/0)return;ge.setup(z,q,Te,W,Se);let ot,nt=ve;if(Se!==null&&(ot=A.get(Se),nt=Oe,nt.setIndex(ot)),z.isMesh)q.wireframe===!0?(Y.setLineWidth(q.wireframeLinewidth*je()),nt.setMode(b.LINES)):nt.setMode(b.TRIANGLES);else if(z.isLine){let Ue=q.linewidth;Ue===void 0&&(Ue=1),Y.setLineWidth(Ue*je()),z.isLineSegments?nt.setMode(b.LINES):z.isLineLoop?nt.setMode(b.LINE_LOOP):nt.setMode(b.LINE_STRIP)}else z.isPoints?nt.setMode(b.POINTS):z.isSprite&&nt.setMode(b.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)ar("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),nt.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(H.get("WEBGL_multi_draw"))nt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const Ue=z._multiDrawStarts,at=z._multiDrawCounts,Je=z._multiDrawCount,Ut=Se?A.get(Se).bytesPerElement:1,ii=ne.get(q).currentProgram.getUniforms();for(let Nt=0;Nt<Je;Nt++)ii.setValue(b,"_gl_DrawID",Nt),nt.render(Ue[Nt]/Ut,at[Nt])}else if(z.isInstancedMesh)nt.renderInstances(Ye,ut,z.count);else if(W.isInstancedBufferGeometry){const Ue=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,at=Math.min(W.instanceCount,Ue);nt.renderInstances(Ye,ut,at)}else nt.render(Ye,ut)};function rt(T,B,W){T.transparent===!0&&T.side===xn&&T.forceSinglePass===!1?(T.side=Rt,T.needsUpdate=!0,gr(T,B,W),T.side=Fn,T.needsUpdate=!0,gr(T,B,W),T.side=xn):gr(T,B,W)}this.compile=function(T,B,W=null){W===null&&(W=T),f=Re.get(W),f.init(B),v.push(f),W.traverseVisible(function(z){z.isLight&&z.layers.test(B.layers)&&(f.pushLight(z),z.castShadow&&f.pushShadow(z))}),T!==W&&T.traverseVisible(function(z){z.isLight&&z.layers.test(B.layers)&&(f.pushLight(z),z.castShadow&&f.pushShadow(z))}),f.setupLights();const q=new Set;return T.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const se=z.material;if(se)if(Array.isArray(se))for(let _e=0;_e<se.length;_e++){const Te=se[_e];rt(Te,W,z),q.add(Te)}else rt(se,W,z),q.add(se)}),f=v.pop(),q},this.compileAsync=function(T,B,W=null){const q=this.compile(T,B,W);return new Promise(z=>{function se(){if(q.forEach(function(_e){ne.get(_e).currentProgram.isReady()&&q.delete(_e)}),q.size===0){z(T);return}setTimeout(se,10)}H.get("KHR_parallel_shader_compile")!==null?se():setTimeout(se,10)})};let $e=null;function fn(T){$e&&$e(T)}function rn(){On.stop()}function fa(){On.start()}const On=new Sl;On.setAnimationLoop(fn),typeof self<"u"&&On.setContext(self),this.setAnimationLoop=function(T){$e=T,ae.setAnimationLoop(T),T===null?On.stop():On.start()},ae.addEventListener("sessionstart",rn),ae.addEventListener("sessionend",fa),this.render=function(T,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),ae.enabled===!0&&ae.isPresenting===!0&&(ae.cameraAutoUpdate===!0&&ae.updateCamera(B),B=ae.getCamera()),T.isScene===!0&&T.onBeforeRender(x,T,B,P),f=Re.get(T,v.length),f.init(B),v.push(f),te.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),We.setFromProjectionMatrix(te,cn,B.reversedDepth),Z=this.localClippingEnabled,Le=he.init(this.clippingPlanes,Z),d=J.get(T,M.length),d.init(),M.push(d),ae.enabled===!0&&ae.isPresenting===!0){const se=x.xr.getDepthSensingMesh();se!==null&&gs(se,B,-1/0,x.sortObjects)}gs(T,B,0,x.sortObjects),d.finish(),x.sortObjects===!0&&d.sort(ce,pe),Xe=ae.enabled===!1||ae.isPresenting===!1||ae.hasDepthSensing()===!1,Xe&&be.addToRenderList(d,T),this.info.render.frame++,Le===!0&&he.beginShadows();const W=f.state.shadowsArray;Ae.render(W,T,B),Le===!0&&he.endShadows(),this.info.autoReset===!0&&this.info.reset();const q=d.opaque,z=d.transmissive;if(f.setupLights(),B.isArrayCamera){const se=B.cameras;if(z.length>0)for(let _e=0,Te=se.length;_e<Te;_e++){const Se=se[_e];pa(q,z,T,Se)}Xe&&be.render(T);for(let _e=0,Te=se.length;_e<Te;_e++){const Se=se[_e];da(d,T,Se,Se.viewport)}}else z.length>0&&pa(q,z,T,B),Xe&&be.render(T),da(d,T,B);P!==null&&C===0&&(ue.updateMultisampleRenderTarget(P),ue.updateRenderTargetMipmap(P)),T.isScene===!0&&T.onAfterRender(x,T,B),ge.resetDefaultState(),E=-1,y=null,v.pop(),v.length>0?(f=v[v.length-1],Le===!0&&he.setGlobalState(x.clippingPlanes,f.state.camera)):f=null,M.pop(),M.length>0?d=M[M.length-1]:d=null};function gs(T,B,W,q){if(T.visible===!1)return;if(T.layers.test(B.layers)){if(T.isGroup)W=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(B);else if(T.isLight)f.pushLight(T),T.castShadow&&f.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||We.intersectsSprite(T)){q&&Ce.setFromMatrixPosition(T.matrixWorld).applyMatrix4(te);const _e=F.update(T),Te=T.material;Te.visible&&d.push(T,_e,Te,W,Ce.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||We.intersectsObject(T))){const _e=F.update(T),Te=T.material;if(q&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ce.copy(T.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),Ce.copy(_e.boundingSphere.center)),Ce.applyMatrix4(T.matrixWorld).applyMatrix4(te)),Array.isArray(Te)){const Se=_e.groups;for(let Fe=0,Be=Se.length;Fe<Be;Fe++){const De=Se[Fe],Ye=Te[De.materialIndex];Ye&&Ye.visible&&d.push(T,_e,Ye,W,Ce.z,De)}}else Te.visible&&d.push(T,_e,Te,W,Ce.z,null)}}const se=T.children;for(let _e=0,Te=se.length;_e<Te;_e++)gs(se[_e],B,W,q)}function da(T,B,W,q){const z=T.opaque,se=T.transmissive,_e=T.transparent;f.setupLightsView(W),Le===!0&&he.setGlobalState(x.clippingPlanes,W),q&&Y.viewport(L.copy(q)),z.length>0&&mr(z,B,W),se.length>0&&mr(se,B,W),_e.length>0&&mr(_e,B,W),Y.buffers.depth.setTest(!0),Y.buffers.depth.setMask(!0),Y.buffers.color.setMask(!0),Y.setPolygonOffset(!1)}function pa(T,B,W,q){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[q.id]===void 0&&(f.state.transmissionRenderTarget[q.id]=new ei(1,1,{generateMipmaps:!0,type:H.has("EXT_color_buffer_half_float")||H.has("EXT_color_buffer_float")?fr:ln,minFilter:Zn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ze.workingColorSpace}));const se=f.state.transmissionRenderTarget[q.id],_e=q.viewport||L;se.setSize(_e.z*x.transmissionResolutionScale,_e.w*x.transmissionResolutionScale);const Te=x.getRenderTarget(),Se=x.getActiveCubeFace(),Fe=x.getActiveMipmapLevel();x.setRenderTarget(se),x.getClearColor(N),k=x.getClearAlpha(),k<1&&x.setClearColor(16777215,.5),x.clear(),Xe&&be.render(W);const Be=x.toneMapping;x.toneMapping=Nn;const De=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),f.setupLightsView(q),Le===!0&&he.setGlobalState(x.clippingPlanes,q),mr(T,W,q),ue.updateMultisampleRenderTarget(se),ue.updateRenderTargetMipmap(se),H.has("WEBGL_multisampled_render_to_texture")===!1){let Ye=!1;for(let et=0,ut=B.length;et<ut;et++){const ot=B[et],nt=ot.object,Ue=ot.geometry,at=ot.material,Je=ot.group;if(at.side===xn&&nt.layers.test(q.layers)){const Ut=at.side;at.side=Rt,at.needsUpdate=!0,ma(nt,W,q,Ue,at,Je),at.side=Ut,at.needsUpdate=!0,Ye=!0}}Ye===!0&&(ue.updateMultisampleRenderTarget(se),ue.updateRenderTargetMipmap(se))}x.setRenderTarget(Te,Se,Fe),x.setClearColor(N,k),De!==void 0&&(q.viewport=De),x.toneMapping=Be}function mr(T,B,W){const q=B.isScene===!0?B.overrideMaterial:null;for(let z=0,se=T.length;z<se;z++){const _e=T[z],Te=_e.object,Se=_e.geometry,Fe=_e.group;let Be=_e.material;Be.allowOverride===!0&&q!==null&&(Be=q),Te.layers.test(W.layers)&&ma(Te,B,W,Se,Be,Fe)}}function ma(T,B,W,q,z,se){T.onBeforeRender(x,B,W,q,z,se),T.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),z.onBeforeRender(x,B,W,q,T,se),z.transparent===!0&&z.side===xn&&z.forceSinglePass===!1?(z.side=Rt,z.needsUpdate=!0,x.renderBufferDirect(W,B,q,z,T,se),z.side=Fn,z.needsUpdate=!0,x.renderBufferDirect(W,B,q,z,T,se),z.side=xn):x.renderBufferDirect(W,B,q,z,T,se),T.onAfterRender(x,B,W,q,z,se)}function gr(T,B,W){B.isScene!==!0&&(B=Ee);const q=ne.get(T),z=f.state.lights,se=f.state.shadowsArray,_e=z.state.version,Te=X.getParameters(T,z.state,se,B,W),Se=X.getProgramCacheKey(Te);let Fe=q.programs;q.environment=T.isMeshStandardMaterial?B.environment:null,q.fog=B.fog,q.envMap=(T.isMeshStandardMaterial?Ne:ze).get(T.envMap||q.environment),q.envMapRotation=q.environment!==null&&T.envMap===null?B.environmentRotation:T.envMapRotation,Fe===void 0&&(T.addEventListener("dispose",Q),Fe=new Map,q.programs=Fe);let Be=Fe.get(Se);if(Be!==void 0){if(q.currentProgram===Be&&q.lightsStateVersion===_e)return _a(T,Te),Be}else Te.uniforms=X.getUniforms(T),T.onBeforeCompile(Te,x),Be=X.acquireProgram(Te,Se),Fe.set(Se,Be),q.uniforms=Te.uniforms;const De=q.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(De.clippingPlanes=he.uniform),_a(T,Te),q.needsLights=zl(T),q.lightsStateVersion=_e,q.needsLights&&(De.ambientLightColor.value=z.state.ambient,De.lightProbe.value=z.state.probe,De.directionalLights.value=z.state.directional,De.directionalLightShadows.value=z.state.directionalShadow,De.spotLights.value=z.state.spot,De.spotLightShadows.value=z.state.spotShadow,De.rectAreaLights.value=z.state.rectArea,De.ltc_1.value=z.state.rectAreaLTC1,De.ltc_2.value=z.state.rectAreaLTC2,De.pointLights.value=z.state.point,De.pointLightShadows.value=z.state.pointShadow,De.hemisphereLights.value=z.state.hemi,De.directionalShadowMap.value=z.state.directionalShadowMap,De.directionalShadowMatrix.value=z.state.directionalShadowMatrix,De.spotShadowMap.value=z.state.spotShadowMap,De.spotLightMatrix.value=z.state.spotLightMatrix,De.spotLightMap.value=z.state.spotLightMap,De.pointShadowMap.value=z.state.pointShadowMap,De.pointShadowMatrix.value=z.state.pointShadowMatrix),q.currentProgram=Be,q.uniformsList=null,Be}function ga(T){if(T.uniformsList===null){const B=T.currentProgram.getUniforms();T.uniformsList=Kr.seqWithValue(B.seq,T.uniforms)}return T.uniformsList}function _a(T,B){const W=ne.get(T);W.outputColorSpace=B.outputColorSpace,W.batching=B.batching,W.batchingColor=B.batchingColor,W.instancing=B.instancing,W.instancingColor=B.instancingColor,W.instancingMorph=B.instancingMorph,W.skinning=B.skinning,W.morphTargets=B.morphTargets,W.morphNormals=B.morphNormals,W.morphColors=B.morphColors,W.morphTargetsCount=B.morphTargetsCount,W.numClippingPlanes=B.numClippingPlanes,W.numIntersection=B.numClipIntersection,W.vertexAlphas=B.vertexAlphas,W.vertexTangents=B.vertexTangents,W.toneMapping=B.toneMapping}function Ol(T,B,W,q,z){B.isScene!==!0&&(B=Ee),ue.resetTextureUnits();const se=B.fog,_e=q.isMeshStandardMaterial?B.environment:null,Te=P===null?x.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Ri,Se=(q.isMeshStandardMaterial?Ne:ze).get(q.envMap||_e),Fe=q.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Be=!!W.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),De=!!W.morphAttributes.position,Ye=!!W.morphAttributes.normal,et=!!W.morphAttributes.color;let ut=Nn;q.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(ut=x.toneMapping);const ot=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,nt=ot!==void 0?ot.length:0,Ue=ne.get(q),at=f.state.lights;if(Le===!0&&(Z===!0||T!==y)){const At=T===y&&q.id===E;he.setState(q,T,At)}let Je=!1;q.version===Ue.__version?(Ue.needsLights&&Ue.lightsStateVersion!==at.state.version||Ue.outputColorSpace!==Te||z.isBatchedMesh&&Ue.batching===!1||!z.isBatchedMesh&&Ue.batching===!0||z.isBatchedMesh&&Ue.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&Ue.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&Ue.instancing===!1||!z.isInstancedMesh&&Ue.instancing===!0||z.isSkinnedMesh&&Ue.skinning===!1||!z.isSkinnedMesh&&Ue.skinning===!0||z.isInstancedMesh&&Ue.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Ue.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&Ue.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&Ue.instancingMorph===!1&&z.morphTexture!==null||Ue.envMap!==Se||q.fog===!0&&Ue.fog!==se||Ue.numClippingPlanes!==void 0&&(Ue.numClippingPlanes!==he.numPlanes||Ue.numIntersection!==he.numIntersection)||Ue.vertexAlphas!==Fe||Ue.vertexTangents!==Be||Ue.morphTargets!==De||Ue.morphNormals!==Ye||Ue.morphColors!==et||Ue.toneMapping!==ut||Ue.morphTargetsCount!==nt)&&(Je=!0):(Je=!0,Ue.__version=q.version);let Ut=Ue.currentProgram;Je===!0&&(Ut=gr(q,B,z));let ii=!1,Nt=!1,Bi=!1;const ct=Ut.getUniforms(),kt=Ue.uniforms;if(Y.useProgram(Ut.program)&&(ii=!0,Nt=!0,Bi=!0),q.id!==E&&(E=q.id,Nt=!0),ii||y!==T){Y.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),ct.setValue(b,"projectionMatrix",T.projectionMatrix),ct.setValue(b,"viewMatrix",T.matrixWorldInverse);const Ct=ct.map.cameraPosition;Ct!==void 0&&Ct.setValue(b,Me.setFromMatrixPosition(T.matrixWorld)),O.logarithmicDepthBuffer&&ct.setValue(b,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&ct.setValue(b,"isOrthographic",T.isOrthographicCamera===!0),y!==T&&(y=T,Nt=!0,Bi=!0)}if(z.isSkinnedMesh){ct.setOptional(b,z,"bindMatrix"),ct.setOptional(b,z,"bindMatrixInverse");const At=z.skeleton;At&&(At.boneTexture===null&&At.computeBoneTexture(),ct.setValue(b,"boneTexture",At.boneTexture,ue))}z.isBatchedMesh&&(ct.setOptional(b,z,"batchingTexture"),ct.setValue(b,"batchingTexture",z._matricesTexture,ue),ct.setOptional(b,z,"batchingIdTexture"),ct.setValue(b,"batchingIdTexture",z._indirectTexture,ue),ct.setOptional(b,z,"batchingColorTexture"),z._colorsTexture!==null&&ct.setValue(b,"batchingColorTexture",z._colorsTexture,ue));const Ht=W.morphAttributes;if((Ht.position!==void 0||Ht.normal!==void 0||Ht.color!==void 0)&&ie.update(z,W,Ut),(Nt||Ue.receiveShadow!==z.receiveShadow)&&(Ue.receiveShadow=z.receiveShadow,ct.setValue(b,"receiveShadow",z.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(kt.envMap.value=Se,kt.flipEnvMap.value=Se.isCubeTexture&&Se.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&B.environment!==null&&(kt.envMapIntensity.value=B.environmentIntensity),Nt&&(ct.setValue(b,"toneMappingExposure",x.toneMappingExposure),Ue.needsLights&&Bl(kt,Bi),se&&q.fog===!0&&ee.refreshFogUniforms(kt,se),ee.refreshMaterialUniforms(kt,q,G,j,f.state.transmissionRenderTarget[T.id]),Kr.upload(b,ga(Ue),kt,ue)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(Kr.upload(b,ga(Ue),kt,ue),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&ct.setValue(b,"center",z.center),ct.setValue(b,"modelViewMatrix",z.modelViewMatrix),ct.setValue(b,"normalMatrix",z.normalMatrix),ct.setValue(b,"modelMatrix",z.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){const At=q.uniformsGroups;for(let Ct=0,_s=At.length;Ct<_s;Ct++){const Bn=At[Ct];He.update(Bn,Ut),He.bind(Bn,Ut)}}return Ut}function Bl(T,B){T.ambientLightColor.needsUpdate=B,T.lightProbe.needsUpdate=B,T.directionalLights.needsUpdate=B,T.directionalLightShadows.needsUpdate=B,T.pointLights.needsUpdate=B,T.pointLightShadows.needsUpdate=B,T.spotLights.needsUpdate=B,T.spotLightShadows.needsUpdate=B,T.rectAreaLights.needsUpdate=B,T.hemisphereLights.needsUpdate=B}function zl(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(T,B,W){const q=ne.get(T);q.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,q.__autoAllocateDepthBuffer===!1&&(q.__useRenderToTexture=!1),ne.get(T.texture).__webglTexture=B,ne.get(T.depthTexture).__webglTexture=q.__autoAllocateDepthBuffer?void 0:W,q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,B){const W=ne.get(T);W.__webglFramebuffer=B,W.__useDefaultFramebuffer=B===void 0};const kl=b.createFramebuffer();this.setRenderTarget=function(T,B=0,W=0){P=T,w=B,C=W;let q=!0,z=null,se=!1,_e=!1;if(T){const Se=ne.get(T);if(Se.__useDefaultFramebuffer!==void 0)Y.bindFramebuffer(b.FRAMEBUFFER,null),q=!1;else if(Se.__webglFramebuffer===void 0)ue.setupRenderTarget(T);else if(Se.__hasExternalTextures)ue.rebindTextures(T,ne.get(T.texture).__webglTexture,ne.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const De=T.depthTexture;if(Se.__boundDepthTexture!==De){if(De!==null&&ne.has(De)&&(T.width!==De.image.width||T.height!==De.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ue.setupDepthRenderbuffer(T)}}const Fe=T.texture;(Fe.isData3DTexture||Fe.isDataArrayTexture||Fe.isCompressedArrayTexture)&&(_e=!0);const Be=ne.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Be[B])?z=Be[B][W]:z=Be[B],se=!0):T.samples>0&&ue.useMultisampledRTT(T)===!1?z=ne.get(T).__webglMultisampledFramebuffer:Array.isArray(Be)?z=Be[W]:z=Be,L.copy(T.viewport),U.copy(T.scissor),V=T.scissorTest}else L.copy(xe).multiplyScalar(G).floor(),U.copy(le).multiplyScalar(G).floor(),V=Ie;if(W!==0&&(z=kl),Y.bindFramebuffer(b.FRAMEBUFFER,z)&&q&&Y.drawBuffers(T,z),Y.viewport(L),Y.scissor(U),Y.setScissorTest(V),se){const Se=ne.get(T.texture);b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_CUBE_MAP_POSITIVE_X+B,Se.__webglTexture,W)}else if(_e){const Se=B;for(let Fe=0;Fe<T.textures.length;Fe++){const Be=ne.get(T.textures[Fe]);b.framebufferTextureLayer(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0+Fe,Be.__webglTexture,W,Se)}}else if(T!==null&&W!==0){const Se=ne.get(T.texture);b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,Se.__webglTexture,W)}E=-1},this.readRenderTargetPixels=function(T,B,W,q,z,se,_e,Te=0){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=ne.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&_e!==void 0&&(Se=Se[_e]),Se){Y.bindFramebuffer(b.FRAMEBUFFER,Se);try{const Fe=T.textures[Te],Be=Fe.format,De=Fe.type;if(!O.textureFormatReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!O.textureTypeReadable(De)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=T.width-q&&W>=0&&W<=T.height-z&&(T.textures.length>1&&b.readBuffer(b.COLOR_ATTACHMENT0+Te),b.readPixels(B,W,q,z,Pe.convert(Be),Pe.convert(De),se))}finally{const Fe=P!==null?ne.get(P).__webglFramebuffer:null;Y.bindFramebuffer(b.FRAMEBUFFER,Fe)}}},this.readRenderTargetPixelsAsync=async function(T,B,W,q,z,se,_e,Te=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=ne.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&_e!==void 0&&(Se=Se[_e]),Se)if(B>=0&&B<=T.width-q&&W>=0&&W<=T.height-z){Y.bindFramebuffer(b.FRAMEBUFFER,Se);const Fe=T.textures[Te],Be=Fe.format,De=Fe.type;if(!O.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!O.textureTypeReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ye=b.createBuffer();b.bindBuffer(b.PIXEL_PACK_BUFFER,Ye),b.bufferData(b.PIXEL_PACK_BUFFER,se.byteLength,b.STREAM_READ),T.textures.length>1&&b.readBuffer(b.COLOR_ATTACHMENT0+Te),b.readPixels(B,W,q,z,Pe.convert(Be),Pe.convert(De),0);const et=P!==null?ne.get(P).__webglFramebuffer:null;Y.bindFramebuffer(b.FRAMEBUFFER,et);const ut=b.fenceSync(b.SYNC_GPU_COMMANDS_COMPLETE,0);return b.flush(),await Yu(b,ut,4),b.bindBuffer(b.PIXEL_PACK_BUFFER,Ye),b.getBufferSubData(b.PIXEL_PACK_BUFFER,0,se),b.deleteBuffer(Ye),b.deleteSync(ut),se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,B=null,W=0){const q=Math.pow(2,-W),z=Math.floor(T.image.width*q),se=Math.floor(T.image.height*q),_e=B!==null?B.x:0,Te=B!==null?B.y:0;ue.setTexture2D(T,0),b.copyTexSubImage2D(b.TEXTURE_2D,W,0,0,_e,Te,z,se),Y.unbindTexture()};const Hl=b.createFramebuffer(),Vl=b.createFramebuffer();this.copyTextureToTexture=function(T,B,W=null,q=null,z=0,se=null){se===null&&(z!==0?(ar("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),se=z,z=0):se=0);let _e,Te,Se,Fe,Be,De,Ye,et,ut;const ot=T.isCompressedTexture?T.mipmaps[se]:T.image;if(W!==null)_e=W.max.x-W.min.x,Te=W.max.y-W.min.y,Se=W.isBox3?W.max.z-W.min.z:1,Fe=W.min.x,Be=W.min.y,De=W.isBox3?W.min.z:0;else{const Ht=Math.pow(2,-z);_e=Math.floor(ot.width*Ht),Te=Math.floor(ot.height*Ht),T.isDataArrayTexture?Se=ot.depth:T.isData3DTexture?Se=Math.floor(ot.depth*Ht):Se=1,Fe=0,Be=0,De=0}q!==null?(Ye=q.x,et=q.y,ut=q.z):(Ye=0,et=0,ut=0);const nt=Pe.convert(B.format),Ue=Pe.convert(B.type);let at;B.isData3DTexture?(ue.setTexture3D(B,0),at=b.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(ue.setTexture2DArray(B,0),at=b.TEXTURE_2D_ARRAY):(ue.setTexture2D(B,0),at=b.TEXTURE_2D),b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL,B.flipY),b.pixelStorei(b.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),b.pixelStorei(b.UNPACK_ALIGNMENT,B.unpackAlignment);const Je=b.getParameter(b.UNPACK_ROW_LENGTH),Ut=b.getParameter(b.UNPACK_IMAGE_HEIGHT),ii=b.getParameter(b.UNPACK_SKIP_PIXELS),Nt=b.getParameter(b.UNPACK_SKIP_ROWS),Bi=b.getParameter(b.UNPACK_SKIP_IMAGES);b.pixelStorei(b.UNPACK_ROW_LENGTH,ot.width),b.pixelStorei(b.UNPACK_IMAGE_HEIGHT,ot.height),b.pixelStorei(b.UNPACK_SKIP_PIXELS,Fe),b.pixelStorei(b.UNPACK_SKIP_ROWS,Be),b.pixelStorei(b.UNPACK_SKIP_IMAGES,De);const ct=T.isDataArrayTexture||T.isData3DTexture,kt=B.isDataArrayTexture||B.isData3DTexture;if(T.isDepthTexture){const Ht=ne.get(T),At=ne.get(B),Ct=ne.get(Ht.__renderTarget),_s=ne.get(At.__renderTarget);Y.bindFramebuffer(b.READ_FRAMEBUFFER,Ct.__webglFramebuffer),Y.bindFramebuffer(b.DRAW_FRAMEBUFFER,_s.__webglFramebuffer);for(let Bn=0;Bn<Se;Bn++)ct&&(b.framebufferTextureLayer(b.READ_FRAMEBUFFER,b.COLOR_ATTACHMENT0,ne.get(T).__webglTexture,z,De+Bn),b.framebufferTextureLayer(b.DRAW_FRAMEBUFFER,b.COLOR_ATTACHMENT0,ne.get(B).__webglTexture,se,ut+Bn)),b.blitFramebuffer(Fe,Be,_e,Te,Ye,et,_e,Te,b.DEPTH_BUFFER_BIT,b.NEAREST);Y.bindFramebuffer(b.READ_FRAMEBUFFER,null),Y.bindFramebuffer(b.DRAW_FRAMEBUFFER,null)}else if(z!==0||T.isRenderTargetTexture||ne.has(T)){const Ht=ne.get(T),At=ne.get(B);Y.bindFramebuffer(b.READ_FRAMEBUFFER,Hl),Y.bindFramebuffer(b.DRAW_FRAMEBUFFER,Vl);for(let Ct=0;Ct<Se;Ct++)ct?b.framebufferTextureLayer(b.READ_FRAMEBUFFER,b.COLOR_ATTACHMENT0,Ht.__webglTexture,z,De+Ct):b.framebufferTexture2D(b.READ_FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,Ht.__webglTexture,z),kt?b.framebufferTextureLayer(b.DRAW_FRAMEBUFFER,b.COLOR_ATTACHMENT0,At.__webglTexture,se,ut+Ct):b.framebufferTexture2D(b.DRAW_FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,At.__webglTexture,se),z!==0?b.blitFramebuffer(Fe,Be,_e,Te,Ye,et,_e,Te,b.COLOR_BUFFER_BIT,b.NEAREST):kt?b.copyTexSubImage3D(at,se,Ye,et,ut+Ct,Fe,Be,_e,Te):b.copyTexSubImage2D(at,se,Ye,et,Fe,Be,_e,Te);Y.bindFramebuffer(b.READ_FRAMEBUFFER,null),Y.bindFramebuffer(b.DRAW_FRAMEBUFFER,null)}else kt?T.isDataTexture||T.isData3DTexture?b.texSubImage3D(at,se,Ye,et,ut,_e,Te,Se,nt,Ue,ot.data):B.isCompressedArrayTexture?b.compressedTexSubImage3D(at,se,Ye,et,ut,_e,Te,Se,nt,ot.data):b.texSubImage3D(at,se,Ye,et,ut,_e,Te,Se,nt,Ue,ot):T.isDataTexture?b.texSubImage2D(b.TEXTURE_2D,se,Ye,et,_e,Te,nt,Ue,ot.data):T.isCompressedTexture?b.compressedTexSubImage2D(b.TEXTURE_2D,se,Ye,et,ot.width,ot.height,nt,ot.data):b.texSubImage2D(b.TEXTURE_2D,se,Ye,et,_e,Te,nt,Ue,ot);b.pixelStorei(b.UNPACK_ROW_LENGTH,Je),b.pixelStorei(b.UNPACK_IMAGE_HEIGHT,Ut),b.pixelStorei(b.UNPACK_SKIP_PIXELS,ii),b.pixelStorei(b.UNPACK_SKIP_ROWS,Nt),b.pixelStorei(b.UNPACK_SKIP_IMAGES,Bi),se===0&&B.generateMipmaps&&b.generateMipmap(at),Y.unbindTexture()},this.initRenderTarget=function(T){ne.get(T).__webglFramebuffer===void 0&&ue.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?ue.setTextureCube(T,0):T.isData3DTexture?ue.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?ue.setTexture2DArray(T,0):ue.setTexture2D(T,0),Y.unbindTexture()},this.resetState=function(){w=0,C=0,P=null,Y.reset(),ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ze._getUnpackColorSpace()}}const Go={g2:{id:"g2",name:"KuKirin G2",version:"800 W · peliversio 53 km/h",type:"SÄHKÖPOTKULAUTA",topSpeed:53,wheelTorque:32,torqueLabel:"Kevyt",powerKW:.8,mass:26,wheelbase:.94,radius:.127,seat:1.04,accent:15895072,frame:5857380,electric:!0,scooter:!0,description:"Harmaa runko, oranssit yksityiskohdat ja pienet leveät renkaat. Aja seisten ja nosta keula siirtämällä painoa taakse. Pelin huippunopeus on 53 km/h."},rieju:{id:"rieju",name:"Rieju MRT 50cc",version:"MRT 50 SM · vakio",type:"2-TAHTI / SUPERMOTO",topSpeed:45,wheelTorque:110,torqueLabel:"Pehmeä",powerKW:2.5,mass:85,wheelbase:1.405,radius:.3,seat:.85,accent:14038066,frame:2369838,description:"Punavalkoiset katteet, Minarelli-kaksitahti ja paisuntaputki. Keuliminen vaatii selvän painonsiirron.",electric:!1},light:{id:"light",name:"Sur-Ron Light Bee X",version:"MY26 · 10 kW · off-road",type:"SÄHKÖ / LIGHTWEIGHT",topSpeed:80,wheelTorque:295,torqueLabel:"295 Nm",powerKW:10,mass:59,wheelbase:1.255,radius:.3,seat:.83,accent:6928785,frame:2633009,description:"Kapea akkurunko, kevyt alumiinirakenne ja lyhyt satula. Välitön kaasu ja ketterä keuliminen.",electric:!0},ultra:{id:"ultra",name:"Sur-Ron Ultra Bee",version:"HP X MY26 · 24,5 kW · off-road",type:"SÄHKÖ / PERFORMANCE",topSpeed:95,wheelTorque:520,torqueLabel:"520 Nm",powerKW:24.5,mass:88.5,wheelbase:1.38,radius:.32,seat:.91,accent:15194934,frame:10792369,description:"Leveä hopearunko, suurempi akku ja täysikokoiset katteet. Voimakas vääntö vaatii tarkkaa kaasukättä.",electric:!0}};function tn(i="rieju"){return Go[i]||Go.rieju}function la(i){const e=tn(i);return e.scooter?{reach:.13,rootZ:.07,height:.19,width:.12,thickness:.012,maxBend:.95}:{reach:i==="light"?.26:i==="ultra"?.31:.3,rootZ:.08,height:e.seat-e.radius-.03,width:i==="light"?.13:i==="ultra"?.18:.17,thickness:.016,maxBend:.95}}function bl(){try{return tn(localStorage.getItem("little-fifty-bike")).id}catch{return"rieju"}}const Jr=1/120,Cc=9.81;function Kg(i,e,t,n=0,r){let s=n+Math.min(Math.max(t,0),.25);for(;s+1e-10>=Jr;)r&&Object.assign(r,i),$g(i,e,Jr),s-=Jr;return Math.max(0,s)}const Jg=["x","z","heading","speed","pitch","pitchRate","steer","lean","suspension","throttle","brake","acceleration","crashTime","fenderBend","fenderBreakTime"];function Zg(i,e,t,n={}){Object.assign(n,e);const r=Math.max(0,Math.min(1,t));for(const s of Jg)n[s]=i[s]+(e[s]-i[s])*r;return n}function wl(i){return i.crashed?Math.min(1.38,i.crashTime*1.4):-i.steer*Math.min(i.speed*.012,.17)}function Zr(i,e={},t=i.fenderBend){const n=tn(i.id),r=la(i.id),s=wl(i),o=r.rootZ+r.reach,a=r.height+i.suspension-r.thickness*.5-(t>1e-6?o*(1-Math.cos(t))/t:0),l=r.rootZ-(t>1e-6?o*Math.sin(t)/t:o),c=-a*Math.sin(s),u=-a*Math.cos(s)*Math.sin(i.pitch)+l*Math.cos(i.pitch);return e.x=i.x+c*Math.cos(i.heading)+u*Math.sin(i.heading),e.y=n.radius+a*Math.cos(s)*Math.cos(i.pitch)+l*Math.sin(i.pitch),e.z=i.z-c*Math.sin(i.heading)+u*Math.cos(i.heading),e}function Rl(i,e){return tn(e).scooter?{forward:.55-.2*i,height:.9}:{forward:.95-.25*i,height:.55}}function jg(i,e){const t=Rl(i,e);return Math.atan2(t.forward,t.height)}function ps(i="rieju"){return{id:tn(i).id,throttle:0,brake:0,acceleration:0,x:0,z:0,heading:0,speed:0,pitch:0,pitchRate:0,steer:0,lean:0,suspension:0,springRate:0,scraping:!1,scrapeStrength:0,fenderBend:0,fenderBroken:!1,fenderBreakTime:0,crashed:!1,crashTime:0}}function $g(i,e,t){const n=tn(i.id);if(i.fenderBroken&&(i.fenderBreakTime+=t),i.crashed)i.crashTime+=t,i.speed*=Math.exp(-3*t),i.throttle*=Math.exp(-12*t),i.scraping=!1,i.scrapeStrength=0,i.pitch+=(1.95-i.pitch)*(1-Math.exp(-4*t));else{const r=e.throttle?1:0,s=e.brake?1:0;i.throttle+=(r-i.throttle)*(1-Math.exp(-(r?n.electric?16:9:24)*t)),i.brake+=(s-i.brake)*(1-Math.exp(-18*t));const o=n.mass+75,a=n.topSpeed/3.6,l=Math.min(n.wheelTorque/n.radius,n.powerKW*1e3/Math.max(i.speed,1)),c=Math.max(0,1-(i.speed/a)**12),u=i.throttle*l/o*c,h=(1-i.throttle)*(.2+.003*i.speed**2),p=Math.min(i.brake*12,Math.max(0,i.speed/t+u-h)),m=u-p-h,g=i.speed;i.speed=Math.max(0,Math.min(a,i.speed+m*t)),i.acceleration=(i.speed-g)/t,i.steer+=(Number(e.left||!1)-Number(e.right||!1)-i.steer)*Math.min(1,t*7),i.heading+=i.steer*(e.steeringSensitivity??1)*Math.min(i.speed/7,1)*.95/(1+i.speed*.04)*(i.pitch>.12?.55:1)*t;const _=e.forward?-1:e.back?1:0;i.lean+=(_-i.lean)*(1-Math.exp(-8*t));const d=Rl(i.lean,i.id),f=d.forward*Math.cos(i.pitch)-d.height*Math.sin(i.pitch),M=o*(d.forward**2+d.height**2+.12*n.wheelbase**2),v=-o*Cc*f,R=l*n.radius/o/(110/160),w=n.scooter?n.wheelTorque/n.radius/o*d.height*(1.4+Math.max(0,i.lean)*.5):Cc*.95*(.93+.17*Math.exp(-i.speed/4))*Math.pow(R,.28),C=g<.1?Math.max(0,1-p/Math.max(u,.001)):1,P=n.scooter?Math.pow(c,.45):c,E=o*i.throttle*w*P*C*(e.forward?.15:1),y=o*p*(d.forward*Math.sin(i.pitch)+d.height*Math.cos(i.pitch));i.pitchRate+=((v+E-y)/M-.35*i.pitchRate)*t,i.pitch+=i.pitchRate*t,i.pitch<0&&(i.pitchRate<-.3&&(i.springRate+=i.pitchRate*.12),i.pitch=0,i.pitchRate=0),i.springRate+=(-70*i.suspension-12*i.springRate-i.acceleration*.1)*t,i.suspension=Math.max(-.09,Math.min(.05,i.suspension+i.springRate*t));const L=Math.max(0,.015-Zr(i,{},0).y);if(i.scraping=!i.fenderBroken&&L>0&&i.pitch>.7,i.scrapeStrength=i.scraping?Math.min(1,L*12+.2):0,i.scraping){let U=0,V=la(i.id).maxBend;if(Zr(i,{},V).y<.015)i.fenderBend=V,i.fenderBroken=!0,i.fenderBreakTime=0,i.scraping=!1,i.scrapeStrength=0;else{for(let N=0;N<12;N++){const k=(U+V)*.5;Zr(i,{},k).y<.015?U=k:V=k}i.fenderBend=V}}else i.fenderBroken||(i.fenderBend*=Math.exp(-18*t),i.fenderBend<1e-4&&(i.fenderBend=0));i.pitch>1.85&&(i.crashed=!0,i.crashTime=0)}i.x+=Math.sin(i.heading)*i.speed*t,i.z+=Math.cos(i.heading)*i.speed*t}function Qg(i){const t=new Float32Array(1080),n=new Float32Array(1080),r=new Float32Array(180),s=new Float32Array(180),o=new Float32Array(540),a=new Float32Array(540),l=new xt;l.setAttribute("position",new It(t,3).setUsage(Ta)),l.setAttribute("color",new It(n,3).setUsage(Ta));const c=new rl({vertexColors:!0,transparent:!0,opacity:.55,depthWrite:!1,toneMapped:!1}),u=new Ah(l,c);u.frustumCulled=!1,u.name="plastic-flecks",i.add(u);let h=0,p=0;const m={};return{mesh:u,capacity:180,clear(){r.fill(0),n.fill(0),p=0,u.visible=!1},update(g,_,d=!0){if(u.visible=d,!d)return;const f=Math.min(_,.1);if(g.scraping&&!g.crashed&&g.speed>.8){Zr(g,m),p+=Math.min(_,.08)*(10+Math.min(g.speed,25))*g.scrapeStrength;const M=Math.sin(g.heading),v=Math.cos(g.heading);for(;p>=1;){p--;const x=h++%180,R=x*3;r[x]=s[x]=.18+Math.random()*.34,a[R]=m.x,a[R+1]=.025,a[R+2]=m.z;const w=2+Math.random()*5,C=(Math.random()-.5)*4;o[R]=-M*w+v*C,o[R+1]=.5+Math.random()*2,o[R+2]=-v*w-M*C}}else p=0;for(let M=0;M<180;M++){const v=M*3,x=M*6;if(r[M]=Math.max(0,r[M]-f),r[M]===0){n.fill(0,x,x+6);continue}a[v]+=o[v]*f,a[v+1]+=o[v+1]*f,a[v+2]+=o[v+2]*f,o[v+1]-=9*f,a[v+1]<.018&&(a[v+1]=.018,o[v+1]=Math.abs(o[v+1])*.3),t[x]=a[v],t[x+1]=a[v+1],t[x+2]=a[v+2],t[x+3]=a[v]-o[v]*.025,t[x+4]=Math.max(.018,a[v+1]-o[v+1]*.025),t[x+5]=a[v+2]-o[v+2]*.025;const R=r[M]/s[M];for(const w of[0,3])n[x+w]=R*.55,n[x+w+1]=R*.56,n[x+w+2]=R*.52}l.attributes.position.needsUpdate=!0,l.attributes.color.needsUpdate=!0}}}const qi=new D;function Gt(i,e,t,n,r,s){const o=2*Math.PI*r/4,a=Math.max(s-2*r,0),l=Math.PI/4;qi.copy(e),qi[n]=0,qi.normalize();const c=.5*o/(o+a),u=1-qi.angleTo(i)/l;return Math.sign(qi[t])===1?u*c:a/(o+a)+c+c*(1-u)}class ua extends Tn{constructor(e=1,t=1,n=1,r=2,s=.1){const o=r*2+1;if(s=Math.min(e/2,t/2,n/2,s),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:r,radius:s},o===1)return;const a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;const l=new D,c=new D,u=new D(e,t,n).divideScalar(2).subScalar(s),h=this.attributes.position.array,p=this.attributes.normal.array,m=this.attributes.uv.array,g=h.length/6,_=new D,d=.5/o;for(let f=0,M=0;f<h.length;f+=3,M+=2)switch(l.fromArray(h,f),c.copy(l),c.x-=Math.sign(c.x)*d,c.y-=Math.sign(c.y)*d,c.z-=Math.sign(c.z)*d,c.normalize(),h[f+0]=u.x*Math.sign(l.x)+c.x*s,h[f+1]=u.y*Math.sign(l.y)+c.y*s,h[f+2]=u.z*Math.sign(l.z)+c.z*s,p[f+0]=c.x,p[f+1]=c.y,p[f+2]=c.z,Math.floor(f/g)){case 0:_.set(1,0,0),m[M+0]=Gt(_,c,"z","y",s,n),m[M+1]=1-Gt(_,c,"y","z",s,t);break;case 1:_.set(-1,0,0),m[M+0]=1-Gt(_,c,"z","y",s,n),m[M+1]=1-Gt(_,c,"y","z",s,t);break;case 2:_.set(0,1,0),m[M+0]=1-Gt(_,c,"x","z",s,e),m[M+1]=Gt(_,c,"z","x",s,n);break;case 3:_.set(0,-1,0),m[M+0]=1-Gt(_,c,"x","z",s,e),m[M+1]=1-Gt(_,c,"z","x",s,n);break;case 4:_.set(0,0,1),m[M+0]=1-Gt(_,c,"x","y",s,e),m[M+1]=1-Gt(_,c,"y","x",s,t);break;case 5:_.set(0,0,-1),m[M+0]=Gt(_,c,"x","y",s,e),m[M+1]=1-Gt(_,c,"y","x",s,t);break}}static fromJSON(e){return new ua(e.width,e.height,e.depth,e.segments,e.radius)}}function e0(i,e=!1){const t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),r=new Set(Object.keys(i[0].morphAttributes)),s={},o={},a=i[0].morphTargetsRelative,l=new xt;let c=0;for(let u=0;u<i.length;++u){const h=i[u];let p=0;if(t!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const m in h.attributes){if(!n.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+m+'" attribute exists among all geometries, or in none of them.'),null;s[m]===void 0&&(s[m]=[]),s[m].push(h.attributes[m]),p++}if(p!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const m in h.morphAttributes){if(!r.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[m]===void 0&&(o[m]=[]),o[m].push(h.morphAttributes[m])}if(e){let m;if(t)m=h.index.count;else if(h.attributes.position!==void 0)m=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,m,u),c+=m}}if(t){let u=0;const h=[];for(let p=0;p<i.length;++p){const m=i[p].index;for(let g=0;g<m.count;++g)h.push(m.getX(g)+u);u+=i[p].attributes.position.count}l.setIndex(h)}for(const u in s){const h=Pc(s[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,h)}for(const u in o){const h=o[u][0].length;if(h===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let p=0;p<h;++p){const m=[];for(let _=0;_<o[u].length;++_)m.push(o[u][_][p]);const g=Pc(m);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(g)}}return l}function Pc(i){let e,t,n,r=-1,s=0;for(let c=0;c<i.length;++c){const u=i[c];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=u.gpuType),r!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=u.count*t}const o=new e(s),a=new It(o,t,n);let l=0;for(let c=0;c<i.length;++c){const u=i[c];if(u.isInterleavedBufferAttribute){const h=l/t;for(let p=0,m=u.count;p<m;p++)for(let g=0;g<t;g++){const _=u.getComponent(p,g);a.setComponent(p+h,g,_)}}else o.set(u.array,l);l+=u.count*t}return r!==void 0&&(a.gpuType=r),a}function t0(){const i={},e=new Set,t=new Set,n=new Set;function r(d,f=0,M=.7){const v=[d,f,M].join();return i[v]??=new Zt({color:d,metalness:f,roughness:M})}function s(d,f,M,v=[0,0,0]){e.add(f);const x=new Et(f,M);return x.position.set(...v),x.castShadow=x.receiveShadow=!0,d.add(x),x}function o(d,f,M,v,x=.025){return s(d,new ua(...f,2,Math.min(x,...f.map(R=>R*.4))),r(v),M)}const a=new D(0,1,0),l=new D,c=new D,u=new D;function h(d,f,M){l.set(...f),c.set(...M),u.subVectors(c,l),d.position.copy(l).add(c).multiplyScalar(.5),d.scale.y=u.length(),d.quaternion.setFromUnitVectors(a,u.normalize())}function p(d,f,M,v,x,R=0){const w=s(d,new Sn(v*.85,v,1,10),r(x,R));return h(w,f,M),w}function m(d,f,M,v){const x=s(d,new fs(1,16,12),r(v),M);return x.scale.set(...f),x}function g(d,f,M,v,x=0,R="#edf0e8",w="#23292b"){const C=document.createElement("canvas");C.width=512,C.height=128;const P=C.getContext("2d");P.fillStyle=w,P.fillRect(0,0,C.width,C.height),P.fillStyle=R,P.font="italic bold 66px Arial",P.textAlign="center",P.textBaseline="middle",P.fillText(f,256,66,490);const E=new sl(C);E.colorSpace=Lt,t.add(E);const y=new Zt({map:E,roughness:.7});i["label"+Object.keys(i).length]=y;const L=s(d,new dr(...M),y,v);return L.rotation.y=x,L}function _(d){const f=[];d.traverse(M=>{M.isGroup&&f.push(M)});for(const M of f){const v=new Map;for(const x of M.children){if(!x.isMesh||x.isInstancedMesh||x.userData.animated||Array.isArray(x.material))continue;const R=v.get(x.material)||[];R.push(x),v.set(x.material,R)}for(const[x,R]of v){if(R.length<2)continue;const w=R.map(P=>(P.updateMatrix(),(P.geometry.index?P.geometry.toNonIndexed():P.geometry.clone()).applyMatrix4(P.matrix))),C=e0(w);w.forEach(P=>P.dispose()),C&&(R.forEach(P=>M.remove(P)),s(M,C,x))}}}return{material:r,mesh:s,box:o,bar:p,poseBar:h,sphere:m,label:g,batch:_,trackInstances(d){n.add(d),e.add(d.geometry)},dispose(){n.forEach(d=>d.dispose()),e.forEach(d=>d.dispose()),t.forEach(d=>d.dispose()),Object.values(i).forEach(d=>d.dispose())}}}function n0(i,e,t){const{box:n,bar:r,sphere:s,mesh:o,material:a,poseBar:l,label:c}=t,u=15527651,h=2502966,p=15364680,m=13143147,g=e.seat-e.radius+.1,_=new mt;_.name="rider",i.add(_);const d=new mt;_.add(d);const f=n(_,[.31,.18,.25],[0,g-.02,.45],h,.065);f.userData.animated=!!e.scooter;const M=o(d,new Sn(.23,.17,.43,8),a(p),[0,.25,0]);M.scale.z=.66,n(d,[.29,.27,.07],[0,.28,.15],h,.055),n(d,[.24,.23,.04],[0,.28,-.145],u,.045),c(d,"LF",[.17,.07],[0,.29,-.169],Math.PI,"#273236","#eceee3");for(const N of[-1,1])s(d,[.105,.115,.11],[N*.205,.4,0],p),n(d,[.055,.23,.018],[N*.12,.26,.188],u,.005);r(d,[0,.45,0],[0,.54,.015],.065,m);const v=new mt;v.position.set(0,.68,.025),d.add(v),v.name="rider-head";const x=new ft;x.name="rider-eyes",x.position.set(0,.035,.08),v.add(x),s(v,[.175,.211,.195],[0,0,-.025],u),s(v,[.123,.151,.078],[0,-.008,.163],m),s(v,[.083,.062,.055],[0,-.105,.181],m);for(const N of[-1,1]){s(v,[.048,.04,.029],[N*.068,-.033,.221],14064506),s(v,[.035,.016,.014],[N*.051,.027,.237],16117474),s(v,[.012,.013,.006],[N*.05,.027,.25],5401955),s(v,[.0055,.008,.003],[N*.05,.027,.256],1516326),s(v,[.0025,.003,.002],[N*.047,.031,.259],16777215);const k=n(v,[.066,.012,.012],[N*.053,.056,.24],5717296,.004);k.rotation.z=N*.08,n(v,[.018,.089,.029],[N*.116,.028,.223],h,.007),n(v,[.027,.04,.17],[N*.171,.025,.02],h,.008)}s(v,[.019,.038,.026],[0,-.006,.25],m),s(v,[.025,.016,.02],[0,-.032,.266],14130299),n(v,[.056,.009,.01],[0,-.075,.237],9590605,.004),n(v,[.046,.007,.008],[0,-.085,.236],14920586,.003);for(const N of[-.014,.074])n(v,[.239,.014,.025],[0,N,.236],h,.006);const R=n(v,[.216,.073,.009],[0,.03,.273],12837596,.012);R.material=a(12837596,0,.16),R.material.transparent=!0,R.material.opacity=.14,R.material.depthWrite=!1;for(const N of[-1,1]){const k=n(v,[.047,.105,.15],[N*.139,-.102,.115],u,.018);k.rotation.x=.25}n(v,[.235,.043,.12],[0,-.163,.18],u,.018),n(v,[.115,.017,.012],[0,-.163,.245],h,.004);const w=n(v,[.34,.021,.24],[0,.17,.145],u,.012);w.rotation.x=-.12,n(v,[.12,.015,.11],[0,.204,-.035],h,.005);const C=[],P=[];for(const N of[-1,1]){const k=new mt;k.name=N===-1?"throttle-hand":"left-hand",_.add(k),n(k,[.11,.075,.105],[0,0,0],h,.025),n(k,[.075,.018,.045],[0,.04,-.005],u,.008);for(let G=0;G<3;G++)n(k,[.024,.04,.055],[-.033+G*.033,-.025,.035],h,.01);const K=n(k,[.02,.026,.1],[N*.055,-.005,.025],p,.008);C.push({side:N,glove:k,finger:K,upper:r(_,[0,0,0],[0,1,0],.078,p),lower:r(_,[0,0,0],[0,1,0],.061,u),elbow:s(_,[.079,.075,.078],[0,0,0],h)});const j=new mt;j.name=N===-1?"support-foot":"balance-foot",_.add(j),n(j,[.135,.16,.18],[0,.035,0],u,.03),n(j,[.145,.085,.26],[0,-.06,.065],h,.024);for(let G=0;G<3;G++)n(j,[.15,.016,.025],[0,-.01+G*.04,.09],8688532,.004);P.push({side:N,boot:j,thigh:r(_,[0,0,0],[0,1,0],.105,h),shin:r(_,[0,0,0],[0,1,0],.076,h),knee:s(_,[.1,.11,.085],[0,0,0],u)})}for(const N of C)for(const k of[N.finger,N.upper,N.lower,N.elbow])k.userData.animated=!0;for(const N of P)for(const k of[N.thigh,N.shin,N.knee])k.userData.animated=!0;let E=0,y=0;const L=new D,U=new D,V=new D;return{root:_,head:v,eyes:x,update(N,k,K){E+=k;const j=Math.min(Math.abs(N.acceleration||0),10),G=N.throttle||0,ce=N.brake||0,pe=e.scooter&&!N.crashed?zo.smoothstep(N.pitch,.08,.35):0;y+=(pe-y)*(1-Math.exp(-9*k));const xe=(e.electric?0:Math.sin(E*(18+G*25))*.002)*(N.speed>0||G?1:.35);d.position.set(0,g-.01-j*.003+xe,.45-N.lean*(e.scooter?.15:.075)),e.scooter&&f.position.set(0,d.position.y-.02,d.position.z),d.rotation.set(-N.lean*.32+G*.055-ce*.11,0,-N.steer*.035),v.rotation.set(Math.min(N.pitch,.9)*.1,N.steer*.14,0),d.updateMatrix();for(const le of C){L.set(le.side*.205,.39,0).applyMatrix4(d.matrix),U.copy(K[le.side===-1?0:1]),N.crashed&&U.lerp(V.set(le.side*.48,g+.32,.3),Math.min(1,N.crashTime*5)),le.glove.position.copy(U),le.glove.rotation.set(le.side===-1?-G*.65:0,N.steer*.24,0),le.finger.rotation.x=e.electric&&le.side===1?-ce*.45:0;const Ie=[(L.x+U.x)*.5+le.side*.065,(L.y+U.y)*.5-.11,(L.z+U.z)*.5-.035];l(le.upper,L.toArray(),Ie),l(le.lower,Ie,U.toArray()),le.elbow.position.set(...Ie)}for(const le of P){const Ie=N.crashed?Math.min(1,N.crashTime*3):0,We=e.scooter?[le.side*(.09+.14*Ie),g-.39,.5-N.lean*.09]:[le.side*(.23+.12*Ie),g-.24,.73-N.lean*.025-.14*Ie],Le=e.scooter?[le.side*(.06+.2*Ie),.18+.12*Ie,(le.side===-1?.57:.29)-.35*Ie]:[le.side*(.23+.2*Ie),.1+.12*Ie,.6-.45*Ie];if(e.scooter&&le.side===1&&!N.crashed){const Z=zo.clamp(N.lean*.4+N.pitchRate*.3,-.5,.5);Le[0]+=.1*y,Le[1]+=(.34+Z*.1)*y,Le[2]-=(.66+Z*.18)*y,We[1]+=.035*y,We[2]-=(.3+Z*.08)*y}l(le.thigh,[le.side*.14,g-.01,.45-(e.scooter?N.lean*.15:0)],We),l(le.shin,We,Le),le.knee.position.set(...We),le.boot.position.set(...Le),le.boot.rotation.x=!e.electric&&le.side===-1?ce*.18:0,e.scooter&&le.side===1&&!N.crashed&&(le.boot.rotation.x=-.25*y)}}}}function Cl(i="rieju"){const e=tn(i),t=t0(),{mesh:n,material:r,box:s,bar:o,sphere:a,label:l}=t,c=new mt,u=new mt,h=new mt;c.add(u),u.add(h);const p=2107178,m=10463661,g=15658718,_=e.accent,d=e.seat-e.radius,f=e.wheelbase,M=new mt;M.name="front-steering",M.position.set(0,.59,f-.2),h.add(M);function v(b,$,H=0){const O=new mt;b.add(O),O.position.set(0,H,$);const Y=e.radius,oe=e.scooter?.032:i==="light"?.053:.069,ne=n(O,new er(Y-oe,oe,10,28),r(1514525));ne.rotation.y=Math.PI/2;const ue=n(O,new er(Y-(e.scooter?.045:.09),.019,6,28),r(i==="rieju"?m:p,.65,.32));ue.rotation.y=Math.PI/2;const ze=new Sn(.005,.005,Y-.09,5),Ne=new ts(ze,r(m,.7,.3),20),A=new ft;for(let S=0;S<20;S++){const F=S*Math.PI/10;A.position.set(0,Math.cos(F)*(Y-.09)*.5,Math.sin(F)*(Y-.09)*.5),A.rotation.x=F,A.updateMatrix(),Ne.setMatrixAt(S,A.matrix)}O.add(Ne),t.trackInstances(Ne);for(const S of[-.07,.07]){const F=e.scooter?.073:.115,X=n(O,new Sn(F,F,.012,24),r(m,.75,.35),[S,0,0]);X.rotation.z=Math.PI/2}if(o(O,[-.12,0,0],[.12,0,0],.038,_,.3),e.electric){const S=new Tn(.085,.018,.043),F=new ts(S,r(1514525),32);for(let X=0;X<32;X++){const ee=X*Math.PI/16;A.position.set(0,Math.cos(ee)*Y,Math.sin(ee)*Y),A.rotation.x=ee,A.updateMatrix(),F.setMatrixAt(X,A.matrix)}O.add(F),t.trackInstances(F)}return O}const x=v(u,0),R=v(M,.2,-.59);if(e.scooter){s(h,[.22,.1,.58],[0,.06,.46],e.frame,.015),s(h,[.21,.012,.55],[0,.117,.46],p,.006);for(let H=0;H<9;H++)s(h,[.19,.005,.009],[0,.126,.23+H*.055],4344138,.002);for(const H of[-1,1])o(h,[H*.09,0,0],[H*.09,.075,.26],.025,e.frame,.4),o(h,[H*.094,.015,.04],[H*.094,.06,.21],.019,_),l(h,"G2",[.3,.065],[H*.119,.06,.47],H*Math.PI/2,"#ff971e","#596064"),o(M,[H*.082,-.59,.2],[H*.082,-.4,.03],.025,e.frame,.5),s(M,[.015,.055,.1],[H*.109,-.535,.145],_,.004);o(h,[0,.09,.74],[0,.32,.88],.05,e.frame,.4),o(M,[0,-.29,.14],[0,d+.23-.59,-.01],.031,e.frame,.5),s(M,[.083,.17,.065],[0,-.2,.125],p,.012),l(M,"KUKIRIN G2",[.055,.39],[0,.13,.066],0,"#ff971e","#30383a"),o(M,[.045,-.2,.14],[.045,d+.14-.59,.04],.007,p),s(M,[.105,.025,.19],[0,-.435,.22],p,.009);const b=s(h,[.18,.027,.18],[0,.18,.14],p,.009);b.rotation.x=.28,s(h,[.11,.02,.018],[0,.21,.055],15222326,.004);for(const H of[.16,.83]){o(h,[0,.06,H-.03],[0,.17,H+.04],.022,m,.4);for(let O=0;O<5;O++){const Y=n(h,new er(.029,.006,5,10),r(p),[0,.08+O*.017,H+O*.009]);Y.rotation.x=Math.PI/2}}const $=n(x,new Sn(.076,.076,.09,18),r(p,.4));$.rotation.z=Math.PI/2}else{for(const H of[-1,1]){const O=H*(i==="ultra"?.155:.12);o(h,[O,0,0],[O,.19,.6],i==="light"?.034:.045,e.frame,.6),o(h,[O,.19,.6],[O,d+.02,f-.25],i==="ultra"?.073:.045,e.frame,.6),o(h,[O,d+.02,f-.25],[O,d,.31],.035,e.frame,.5),o(h,[O,d,.31],[O,.19,.6],.032,e.frame,.5),o(M,[H*.12,.1,-.025],[H*.12,-.59,.2],i==="light"?.024:.032,m,.75),o(M,[H*.12,.09,-.025],[H*.12,-.24,.08],i==="light"?.033:.043,i==="rieju"?m:11574631,.6),s(M,[.065,.21,.07],[H*.12,-.42,.15],e.electric?p:g,.02),o(h,[H*.12,.07,.6],[H*.29,.07,.6],.021,m,.7)}o(h,[0,.12,.25],[0,d-.03,.63],.044,m,.65);const b=[];for(let H=0;H<=70;H++){const O=H/70;b.push(new D(Math.cos(O*Math.PI*14)*.06,.17+O*(d-.23),.29+O*.29+Math.sin(O*Math.PI*14)*.04))}n(h,new aa(new cl(b),70,.009,5,!1),r(_,.25,.4)),s(h,[i==="light"?.22:.29,.075,i==="light"?.49:.75],[0,d+.018,i==="light"?.35:.42],p,.035);for(let H=0;H<6;H++)s(h,[i==="light"?.205:.28,.008,.018],[0,d+.059,.2+H*.065],4146756,.003);const $=s(M,[i==="light"?.16:.25,.035,e.electric?.44:.56],[0,-.22,.29],i==="rieju"?_:p,.017);$.rotation.x=-.05}const w=la(i),C=w.reach+w.rootZ,P=new mt;P.name="rear-fender",P.position.set(0,w.height,w.rootZ),h.add(P);const E=new Tn(w.width,w.thickness,C,1,1,14);E.translate(0,0,-C/2);const y=n(P,E,r(i==="rieju"?g:p));y.userData.animated=!0;const L=E.attributes.position.array.slice(),U=E.attributes.position,V=new ft;V.name="scrape-contact",P.add(V);let N=!1,k=-1;const K=new D,j=new Mn,G=new Mn,ce=new En;function pe(b,$,H){const O=new pl;b.forEach(([oe,ne],ue)=>ue?O.lineTo(oe,ne):O.moveTo(oe,ne)),O.closePath();const Y=n(h,new oa(O,{depth:.025,bevelEnabled:!0,bevelSegments:1,steps:1,bevelSize:.008,bevelThickness:.006}),r(H));return Y.rotation.y=-Math.PI/2,Y.position.x=$,Y}if(i==="rieju"){s(h,[.3,.23,.31],[0,.18,.65],m,.04);for(let b=0;b<5;b++)s(h,[.31,.017,.24],[0,.18+b*.035,.64],p,.004);s(h,[.3,.14,.3],[0,d-.075,.88],_,.05);for(const b of[-1,1])pe([[.29,d-.2],[.93,d-.17],[1.1,d+.01],[.69,d+.04]],b*.19,_),pe([[.05,d-.1],[.38,d-.2],[.55,d-.02],[.08,d+.015]],b*.17,g),l(h,"RIEJU",[.35,.085],[b*.218,d-.08,.76],b*Math.PI/2,"#f5f1e4","#c72e2d");a(h,[.14,.115,.25],[.23,.11,.86],m),o(h,[.23,.13,1],[.23,.24,.54],.04,m,.7),o(h,[.23,.24,.54],[.24,d-.09,.14],.035,m,.7),o(h,[.24,d-.09,.24],[.24,d-.055,-.12],.068,m,.75),s(M,[.27,.27,.065],[0,.01,.07],g,.04),l(M,"MRT 50",[.22,.06],[0,-.06,.106])}else if(!e.scooter){const b=i==="ultra",$=s(h,[b?.36:.23,b?.4:.35,b?.45:.29],[0,d-.21,b?.69:.65],p,.04);$.rotation.x=-.15,s(h,[b?.31:.21,.028,.25],[0,d+.004,.76],p,.014);const H=n(h,new Sn(b?.14:.105,b?.14:.105,b?.31:.23,20),r(p,.5,.35),[0,.13,.61]);H.rotation.z=Math.PI/2;for(const O of[-1,1])l(h,b?"ULTRA BEE":"SUR-RON",[b?.36:.27,.065],[O*(b?.205:.15),d-.18,.67],O*Math.PI/2,"#e6eedc","#23292b"),b?(pe([[.39,d-.22],[.95,d-.12],[1.06,d+.01],[.65,d+.015]],O*.22,g),pe([[.52,d-.14],[.85,d-.08],[.95,d],[.69,d]],O*.246,_)):o(h,[O*.145,.19,.6],[O*.145,d-.01,f-.26],.04,_,.25);b&&(s(M,[.26,.25,.06],[0,.015,.07],g,.035),l(M,"ULTRA",[.21,.055],[0,-.05,.105]))}const xe=s(M,[i==="light"?.19:.15,.06,.06],[0,.065,.115],14806495,.018);xe.material=r(14806495,.15,.25);const le=new mt;le.position.set(0,d+.23-.59,-.01),M.add(le),o(le,[-.36,0,0],[-.12,-.035,.02],.018,p,.3),o(le,[-.12,-.035,.02],[.12,-.035,.02],.022,m,.5),o(le,[.12,-.035,.02],[.36,0,0],.018,p,.3),s(le,[.12,.045,.08],[0,-.003,.035],p,.01),s(le,[.085,.006,.044],[0,.023,.035],6852489,.005);const Ie=[new D,new D],We=[];for(const b of[-1,1]){o(le,[b*.28,0,0],[b*.4,0,0],.026,p);const $=new mt;$.position.set(b*.25,0,.035),le.add($),o($,[0,0,0],[b*.13,0,.055],.009,m,.7),We.push($)}const Le=n0(h,e,t);let Z=0,te=!1;const Me=new D,Ce=new Mn,Ee=new D(.65,-e.radius-.25,-1.35),Xe=new Mn().setFromEuler(new qt(-Math.PI/2,0,.12)),je=new En;return t.batch(c),{root:c,spec:e,head:Le.head,eyes:Le.eyes,dispose:t.dispose,update(b,$){c.position.set(b.x,e.radius,b.z),c.rotation.y=b.heading,u.rotation.x=-b.pitch,u.rotation.z=wl(b),h.position.y=b.suspension,R.position.y=-.59-b.suspension,M.rotation.y=b.steer*.25,Z+=b.speed*$/e.radius,x.rotation.x=R.rotation.x=Z,M.updateMatrix(),le.updateMatrix(),Ie[0].set(-.35,0,0).applyMatrix4(le.matrix).applyMatrix4(M.matrix),Ie[1].set(.35,0,0).applyMatrix4(le.matrix).applyMatrix4(M.matrix),We.forEach((O,Y)=>O.rotation.y=e.electric&&Y===1?(b.brake||0)*.35:0),Le.update(b,$,Ie);const H=b.fenderBend;if(H!==k){for(let O=0;O<U.count;O++){const Y=O*3,oe=-L[Y+2],ne=H*oe/C;U.setXYZ(O,L[Y]*(1-.2*oe/C),L[Y+1]-(H>1e-6?C*(1-Math.cos(ne))/H:0),H>1e-6?-C*Math.sin(ne)/H:L[Y+2])}U.needsUpdate=!0,E.computeVertexNormals(),E.computeBoundingBox(),E.computeBoundingSphere(),k=H}if(V.position.set(0,-w.thickness*.5-(H>1e-6?C*(1-Math.cos(H))/H:0),H>1e-6?-C*Math.sin(H)/H:-C),b.fenderBroken){c.updateMatrixWorld(!0),N||(c.attach(P),K.copy(P.position),j.copy(P.quaternion),N=!0);const O=Math.min(b.fenderBreakTime,2);P.position.copy(K),P.position.x+=O*.35,P.position.z-=O*1.8,P.position.y+=.3*O-4.9*O*O,G.setFromEuler(new qt(O*4,O*2,0)),P.quaternion.copy(j).multiply(G),c.updateMatrixWorld(!0),ce.setFromObject(P),P.position.y+=Math.max(0,.018-ce.min.y),P.visible=b.fenderBreakTime<2}else N&&(h.add(P),P.position.set(0,w.height,w.rootZ),P.quaternion.identity(),P.visible=!0,N=!1);if(b.crashed){c.updateMatrixWorld(!0),te||(c.attach(Le.root),Me.copy(Le.root.position),Ce.copy(Le.root.quaternion),te=!0);const O=Math.min(1,b.crashTime/1.15),Y=O*O*(3-2*O);Le.root.position.lerpVectors(Me,Ee,Y),Le.root.position.y+=Math.sin(O*Math.PI)*.25,Le.root.quaternion.slerpQuaternions(Ce,Xe,Y),c.updateMatrixWorld(!0),je.setFromObject(u),c.position.y+=Math.max(0,.015-je.min.y),c.updateMatrixWorld(!0),je.setFromObject(Le.root),Le.root.position.y+=Math.max(0,.025-je.min.y)}else te&&(h.add(Le.root),Le.root.position.set(0,0,0),Le.root.quaternion.identity(),te=!1)}}}function i0(i){const e=document.createElement("canvas");e.width=e.height=128;const t=e.getContext("2d"),n=t.createImageData(128,128);let r=42;for(let o=0;o<n.data.length;o+=4){r=r*1664525+1013904223>>>0;const a=78+r%12;n.data[o]=a,n.data[o+1]=a+3,n.data[o+2]=a+2,n.data[o+3]=255}t.putImageData(n,0,0);const s=new sl(e);return s.wrapS=s.wrapT=jr,s.repeat.set(3,22),s.colorSpace=Lt,s.anisotropy=i,s}function r0(i,e=4){const r=[],s={grass:new Zt({color:9214304,roughness:1}),road:new Zt({map:i0(e),roughness:.96}),edge:new Zt({color:11776916,roughness:1}),line:new Zt({color:15261624,roughness:1}),wood:new Zt({color:7366480,roughness:1}),leaf:new Zt({color:5400897,roughness:1,flatShading:!0}),leaf2:new Zt({color:7241803,roughness:1,flatShading:!0}),rock:new Zt({color:9605754,roughness:1,flatShading:!0})},o=new Tn(1,1,1),a=new rs(1,1,7),l=new os(1,0),c=new ft;function u(M,v,x,R){const w=new Et(o,s[R]);return w.scale.set(...v),w.position.set(...x),w.receiveShadow=!0,M.add(w),w}function h(M,v,x,R,w=!1){const C=new ts(v,s[x],R.length);R.forEach((P,E)=>{c.position.set(...P.p),c.scale.set(...P.s),c.rotation.set(0,P.r||0,0),c.updateMatrix(),C.setMatrixAt(E,c.matrix)}),C.castShadow=w,C.receiveShadow=!0,M.add(C)}for(let M=0;M<11;M++){const v=new mt;v.userData.slot=null,u(v,[2e3,.1,60],[0,-.14,0],"grass"),u(v,[7.2,.06,60],[0,-.06,0],"edge"),u(v,[6.2,.08,60],[0,-.04,0],"road");for(const L of[-2.85,2.85])u(v,[.1,.009,60],[L,.007,0],"line");const x=[],R=[],w=[],C=[],P=[],E=[],y=[];for(let L=-27;L<30;L+=6)x.push({p:[0,.008,L],s:[.12,.012,3]});for(const L of[-1,1]){for(let U=-25;U<30;U+=10)R.push({p:[L*3.8,.48,U],s:[.12,1,.14]}),w.push({p:[L*3.8,.86,U-.08],s:[.14,.13,.025]});for(let U=0;U<13;U++){const V=-28+U*4.5+M%3,N=L*(7+(U*13+M*7)%24),k=4+(U*7+M)%6;C.push({p:[N,k*.23,V],s:[.28,k*.46,.28]}),P.push({p:[N,k*.59,V],s:[k*.31,k*.73,k*.31]}),E.push({p:[N,k*.86,V],s:[k*.22,k*.58,k*.22]}),U%3===0&&y.push({p:[L*(4.3+U%3),.25,V+2],s:[.7,.45,.9],r:U})}}h(v,o,"line",x),h(v,o,"wood",R),h(v,o,"line",w),h(v,o,"wood",C,!0),h(v,a,"leaf",P,!0),h(v,a,"leaf2",E,!0),h(v,l,"rock",y,!0),r.push(v),i.add(v)}const p=new mt;i.add(p);const m=new Zt({color:11844517,flatShading:!0,roughness:1,fog:!1}),g=new rs(1,1,5);for(let M=0;M<18;M++){const v=M/18*Math.PI*2,x=new Et(g,m),R=35+M*17%60;x.position.set(Math.sin(v)*350,R*.5-7,Math.cos(v)*350),x.scale.set(80,R,85),x.rotation.y=v,p.add(x)}const _=new hs({color:15788758,fog:!1}),d=new ts(new os(1,1),_,24);for(let M=0;M<24;M++)c.position.set(M*73%480-240,65+M%4*7,M*109%550-275),c.scale.set(17+M%4*4,2.5,5),c.rotation.set(0,M,0),c.updateMatrix(),d.setMatrixAt(M,c.matrix);p.add(d);const f=new Et(new fs(900,24,12),new An({side:Rt,depthWrite:!1,uniforms:{top:{value:new Ke(5610427)},bottom:{value:new Ke(15259565)}},vertexShader:"varying vec3 v; void main(){v=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",fragmentShader:`varying vec3 v; uniform vec3 top; uniform vec3 bottom; void main(){float h=clamp(normalize(v).y*3.5+0.12,0.0,1.0);gl_FragColor=vec4(mix(bottom,top,h),1.0);
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
}`}));return i.add(f),{chunks:r,update(M,v=0){const x=Math.floor(M/60);for(let R=-5;R<=5;R++){const w=x+R,C=r[(w%11+11)%11];C.userData.slot!==w&&(C.position.z=w*60,C.userData.slot=w),C.children[0].position.x=v}p.position.set(v*.9,0,M),f.position.set(v,0,M)}}}const Pl={quality:"high",fov:62,distance:5,steering:1,controls:!0,volume:.55};function s0(){let i={};try{i=JSON.parse(localStorage.getItem("little-fifty-settings"))||{}}catch{}const e={...Pl};matchMedia("(pointer: coarse)").matches&&(e.quality="low");for(const[t,n,r]of[["fov",50,80],["distance",4,7],["steering",.6,1.5],["volume",0,1]])Number.isFinite(i[t])&&(e[t]=Math.max(n,Math.min(r,i[t])));return["high","low"].includes(i.quality)&&(e.quality=i.quality),typeof i.controls=="boolean"&&(e.controls=i.controls),e}function o0(i,{play:e,change:t,preview:n,equip:r}){let s=bl(),o=s,a=!1;const l=document.getElementById("bike-grid"),c=document.getElementById("shop-details"),u=document.getElementById("menu"),h=document.getElementById("shop-back");for(const _ of Object.values(Go)){const d=document.createElement("button");d.className="bike-tile",d.dataset.bike=_.id,d.setAttribute("aria-label",_.name+" — avaa tiedot"),d.setAttribute("aria-controls","shop-details"),d.setAttribute("aria-expanded","false");const f=document.createElement("img");f.src="./bikes/"+_.id+".png",f.alt=_.name+(_.id==="rieju"||_.scooter?" — pelimalli":" — tuotekuva"),f.width=800,f.height=500,f.decoding="async";const M=document.createElement("span");M.className="bike-tile-photo",M.append(f);const v=document.createElement("span");v.className="bike-tile-info";const x=document.createElement("span");x.className="eyebrow",x.textContent=_.type;const R=document.createElement("strong");R.textContent=_.name;const w=document.createElement("span");w.className="bike-tile-action",w.textContent="TUTUSTU PYÖRÄÄN ↗",v.append(x,R,w),d.append(M,v),d.onclick=()=>{o=_.id,a=!0,l.hidden=!0,c.hidden=!1,document.getElementById("shop-intro").hidden=!0,u.classList.remove("shop-catalog"),h.textContent="← KAIKKI PYÖRÄT",d.setAttribute("aria-expanded","true"),m(),n(o),document.getElementById("shop-panel").scrollTop=0,document.getElementById("shop-name").focus({preventScroll:!0})},l.append(d)}function p(){a=!1,l.hidden=!1,c.hidden=!0,document.getElementById("shop-intro").hidden=!1,u.classList.add("shop-catalog"),h.textContent="← PÄÄVALIKKO",l.querySelectorAll("button").forEach(_=>_.setAttribute("aria-expanded","false")),n(s)}function m(){const _=tn(o);document.getElementById("shop-name").textContent=_.name,document.getElementById("shop-version").textContent=_.version,document.getElementById("shop-description").textContent=_.description,document.getElementById("shop-speed").textContent=_.topSpeed,document.getElementById("shop-torque").textContent=_.torqueLabel,document.getElementById("shop-engine").textContent=_.electric?_.powerKW+" kW":"50cc";const d=document.getElementById("equip");d.disabled=o===s,d.textContent=o===s?"KÄYTÖSSÄ ✓":"OTA KÄYTTÖÖN ↗"}document.getElementById("equip").onclick=()=>{s=o;try{localStorage.setItem("little-fifty-bike",s)}catch{}r(s),m()};const g=_=>{for(const d of["home","settings","shop"])document.getElementById(d+"-panel").hidden=d!==_;u.classList.remove("shop-catalog"),_==="shop"?p():n(s)};h.onclick=()=>{a?(p(),l.querySelector('[data-bike="'+o+'"]').focus({preventScroll:!0})):g("home")},document.querySelectorAll("[data-panel]").forEach(_=>_.onclick=()=>g(_.dataset.panel)),document.getElementById("home").onclick=_=>{_.preventDefault(),g("home")},document.getElementById("play").onclick=e;for(const _ of Object.keys(Pl)){const d=document.getElementById(_);_==="controls"?d.checked=i[_]:d.value=i[_];const f=()=>{const M=document.getElementById(_+"-value");M&&(M.value=_==="volume"?Math.round(i[_]*100)+"%":i[_]+(_==="fov"?"°":_==="distance"?" m":"×"))};f(),d.addEventListener("input",()=>{i[_]=_==="controls"?d.checked:_==="quality"?d.value:Number(d.value),f();try{localStorage.setItem("little-fifty-settings",JSON.stringify(i))}catch{}t()})}return document.getElementById("fullscreen").onclick=async()=>{try{document.fullscreenElement?await document.exitFullscreen():await document.documentElement.requestFullscreen()}catch{}},m(),{show:g}}let bn=bl();const Bt=s0(),pr=Wl(),nn=new vh;nn.fog=new ea(13817015,110,250);nn.add(new of(13231597,7106624,2));const Dt=new lf(16768938,3.1);Dt.position.set(-18,28,-12);Dt.castShadow=!0;Object.assign(Dt.shadow.camera,{left:-24,right:24,top:28,bottom:-24,near:1,far:85});Dt.shadow.bias=-25e-5;Dt.shadow.normalBias=.025;nn.add(Dt,Dt.target);const un=new Yg({antialias:!0,powerPreference:"high-performance"});un.shadowMap.type=Nc;un.toneMapping=Oc;un.toneMappingExposure=1.12;document.body.prepend(un.domElement);const dt=new Wt(Bt.fov,1,.1,1200);let Xt=Cl(bn);nn.add(Xt.root);const a0=r0(nn,Math.min(8,un.capabilities.getMaxAnisotropy())),Ll=Qg(nn),hr=new Et(new na(.8,24),new hs({color:2702118,transparent:!0,opacity:.14,depthWrite:!1}));hr.rotation.x=-Math.PI/2;hr.scale.set(.6,1.7,1);nn.add(hr);const yt=new Set;let it=ps(bn),jn=0,$n=null,en="menu",as=!1,Lc=0;const cs={...it},c0={...it};let tr=0,Li=!1;const jt=Gl({active:()=>en==="ride",camera:()=>{Li=!Li},reset:()=>Oi()}),Dc=document.getElementById("camera-mode");let Dl=ps(bn);function ls(i){Xt.spec.id!==i&&(nn.remove(Xt.root),Xt.dispose(),Xt=Cl(i),nn.add(Xt.root)),Dl=ps(i);const e=tn(i);document.getElementById("preview-name").textContent=e.name,document.getElementById("preview-type").textContent=e.version,document.getElementById("ride-bike").textContent=tn(bn).name}const Pt=Object.fromEntries(["speed","angle","balance-fill","balance-marker","point","state","hint","crash","menu","hud","ride-controls"].map(i=>[i,document.getElementById(i)])),yi=new D,Ic=new D,Di=new D(.9,2.1,-Bt.distance),ha=new D(-18,28,-17),Il=new D().crossVectors(new D(0,1,0),ha).normalize(),l0=new D().crossVectors(ha,Il).normalize(),Yi=new D;function Ul(){pr.setVolume(Bt.volume);const i=Bt.quality==="high";un.setPixelRatio(Math.min(devicePixelRatio,i?1.5:1)),un.shadowMap.enabled=i;const e=i?1024:512;Dt.shadow.mapSize.x!==e&&(Dt.shadow.mapSize.set(e,e),Dt.shadow.map?.dispose(),Dt.shadow.map=null),nn.traverse(t=>{if(t.material)for(const n of[].concat(t.material))n.needsUpdate=!0}),Pt["ride-controls"].hidden=!Bt.controls}function Oi(){pr.quiet(),it=ps(bn),Object.assign(cs,it),Ll.clear(),yt.clear(),jt.clear(),jn=0,$n=null,tr=0,Di.set(.9,2.1,-Bt.distance),dt.position.copy(Di),yi.set(0,1.05,1),Pt.crash.hidden=!0}function ms(){pr.quiet(),en="menu",yt.clear(),jt.clear(),jn=0,$n=null,Pt.menu.hidden=!1,Pt.hud.hidden=!0,document.body.classList.add("in-menu"),u0.show("home"),document.getElementById("play").innerHTML=as?"JATKA AJOA <span>↗</span>":"LÄHDE AJAMAAN <span>↗</span>"}function Nl(){pr.start(),ls(bn),as||(Oi(),as=!0),en="ride",Object.assign(cs,it),yt.clear(),jt.clear(),$n=null,jn=0,tr=0,Pt.menu.hidden=!0,Pt.hud.hidden=!1,document.body.classList.remove("in-menu");const i=it.heading;Di.set(-Math.sin(i)*Bt.distance+Math.cos(i)*.9,2.1,-Math.cos(i)*Bt.distance-Math.sin(i)*.9),dt.position.set(it.x,0,it.z).add(Di),yi.set(it.x,1.1,it.z+.5)}const u0=o0(Bt,{play:Nl,change:Ul,preview:ls,equip(i){bn=i,ls(i),Oi()}});ls(bn);document.getElementById("menu-button").onclick=ms;document.getElementById("reset").onclick=Oi;const h0=["ArrowDown","ArrowUp","Space","ShiftLeft","ShiftRight","KeyW","KeyS","KeyA","KeyD","KeyR","KeyC"];addEventListener("keydown",i=>{if(i.code==="Escape"&&!i.repeat){en==="ride"?ms():as&&Nl();return}en==="ride"&&(h0.includes(i.code)&&i.preventDefault(),yt.add(i.code),i.code==="KeyR"&&!i.repeat&&Oi(),i.code==="KeyC"&&!i.repeat&&(Li=!Li))});addEventListener("keyup",i=>yt.delete(i.code));addEventListener("blur",()=>{yt.clear(),jt.clear(),en==="ride"&&ms()});document.addEventListener("visibilitychange",()=>{yt.clear(),jt.clear(),$n=null,jn=0,document.hidden&&en==="ride"&&ms()});function Fl(){dt.aspect=innerWidth/innerHeight,dt.updateProjectionMatrix(),un.setSize(innerWidth,innerHeight)}addEventListener("resize",Fl);Ul();Fl();Oi();un.setAnimationLoop(i=>{const e=$n===null?0:Math.min((i-$n)/1e3,.25);$n=i;let t=it;if(en==="ride"){const s={throttle:jt.state.throttle||yt.has("KeyW"),brake:jt.state.brake||yt.has("KeyS"),left:yt.has("KeyA")?1:jt.state.left,right:yt.has("KeyD")?1:jt.state.right,back:jt.state.back||yt.has("ArrowDown")||yt.has("Space"),forward:jt.state.forward||yt.has("ArrowUp")||yt.has("ShiftLeft")||yt.has("ShiftRight"),steeringSensitivity:Bt.steering};jn=Kg(it,s,e,jn,cs),t=Zg(cs,it,jn/Jr,c0);const o=zo.smoothstep(t.speed,0,22),a=t.heading,l=Bt.distance-.45*o+(t.crashed?1:0);Ic.set(-Math.sin(a)*l+Math.cos(a)*.9,2.1-.25*o+Math.min(t.pitch,1.2)*.55,-Math.cos(a)*l-Math.sin(a)*.9),Di.lerp(Ic,1-Math.exp(-9*e)),dt.position.set(t.x,0,t.z).add(Di),yi.set(t.x+Math.sin(a)*(t.crashed?-.3:1.2),t.crashed?.7:1.05,t.z+Math.cos(a)*(t.crashed?-.3:1.2));const c=(Li&&!t.crashed?Math.max(Xt.spec.scooter?80:70,Bt.fov):Bt.fov)+10*o;if(dt.fov+=(c-dt.fov)*(1-Math.exp(-4*e)),tr-=e,tr<=0){tr=.1;const u=it.pitch*180/Math.PI,h=jg(it.lean,it.id)*180/Math.PI;Pt.speed.textContent=Math.round(it.speed*3.6),Pt.angle.textContent=Math.round(u)+"°",Pt.point.textContent=Math.round(h)+"°",Pt["balance-fill"].style.width=Math.min(100,u)+"%",Pt["balance-marker"].style.left=h+"%",Pt.state.textContent=it.crashed?"YLIKEULIMINEN":it.fenderBroken?"TAKAKATE POIKKI":it.scraping?"MUOVIKATE TAIPUU":Math.abs(u-h)<4?"TASAPAINOSSA":u>10?"YHDELLÄ PYÖRÄLLÄ":it.speed>1?"VAPAA AJO":"VALMIS AJOON",Pt.hint.textContent=it.crashed?"R — takaisin satulaan.":it.fenderBroken?"Takakate irtosi. R korjaa pyörän.":it.scraping?"Kate ei kannattele! Jarruta: S.":u>h?"↑ Paino eteen / S takajarru.":u>h-12?"Kevennä kaasua. Tasapainota ↓ / ↑.":u>10?"Annostele kaasua ja siirrä painoa.":"W + ↓ nostaa. ↑ pitää keulan alhaalla.",Pt.crash.hidden=!it.crashed||it.crashTime<1.25}}else{t=Dl,Lc+=e;const s=Math.sin(Lc*.12)*.12;dt.position.set(4+s,2,4.3-s),yi.set(-1.35,.8,1.1),dt.fov=43}Xt.update(t,e),a0.update(t.z,t.x);const n=en==="ride"&&Li&&!t.crashed;Xt.head.visible=!n,dt.near=n?.035:.1,n&&(Xt.eyes.getWorldPosition(dt.position),Xt.spec.scooter&&(dt.position.x-=Math.sin(t.heading)*.12,dt.position.z-=Math.cos(t.heading)*.12),dt.position.y=Math.max(.45,dt.position.y),yi.set(dt.position.x+Math.sin(t.heading)*12,dt.position.y-(Xt.spec.scooter?7.5:6)+Math.min(t.pitch,1.5)*3,dt.position.z+Math.cos(t.heading)*12));const r=n?"1. persoona":"3. persoona";Dc.textContent!==r&&(Dc.textContent=r),pr.update(it,tn(bn),en==="ride"),Ll.update(t,e,en==="ride"),hr.position.set(t.x,.018,t.z+.5),hr.rotation.z=-t.heading,Yi.set(t.x,0,t.z+5);for(const[s,o]of[[Il,48],[l0,52]]){const a=o/Dt.shadow.mapSize.x,l=Yi.dot(s);Yi.addScaledVector(s,Math.round(l/a)*a-l)}Dt.target.position.copy(Yi),Dt.position.copy(Yi).add(ha),dt.updateProjectionMatrix(),dt.lookAt(yi),un.render(nn,dt)});
