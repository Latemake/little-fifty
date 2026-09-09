import * as T from 'three';
function asphalt(anisotropy){
  const canvas=document.createElement('canvas');canvas.width=canvas.height=128;
  const ctx=canvas.getContext('2d'),pixels=ctx.createImageData(128,128);let seed=42;
  for(let i=0;i<pixels.data.length;i+=4){seed=(seed*1664525+1013904223)>>>0;const shade=78+(seed%12);pixels.data[i]=shade;pixels.data[i+1]=shade+3;pixels.data[i+2]=shade+2;pixels.data[i+3]=255;}
  ctx.putImageData(pixels,0,0);const texture=new T.CanvasTexture(canvas);texture.wrapS=texture.wrapT=T.RepeatWrapping;texture.repeat.set(3,22);texture.colorSpace=T.SRGBColorSpace;texture.anisotropy=anisotropy;return texture;
}
export function createWorld(scene,anisotropy=4){
  const length=60,count=11,chunks=[];
  const materials={grass:new T.MeshStandardMaterial({color:0x8c9960,roughness:1}),road:new T.MeshStandardMaterial({map:asphalt(anisotropy),roughness:.96}),edge:new T.MeshStandardMaterial({color:0xb3b394,roughness:1}),line:new T.MeshStandardMaterial({color:0xe8dfb8,roughness:1}),wood:new T.MeshStandardMaterial({color:0x706750,roughness:1}),leaf:new T.MeshStandardMaterial({color:0x526941,roughness:1,flatShading:true}),leaf2:new T.MeshStandardMaterial({color:0x6e804b,roughness:1,flatShading:true}),rock:new T.MeshStandardMaterial({color:0x92927a,roughness:1,flatShading:true})};
  const box=new T.BoxGeometry(1,1,1),cone=new T.ConeGeometry(1,1,7),rock=new T.IcosahedronGeometry(1,0),dummy=new T.Object3D();
  function solid(group,size,pos,material){const mesh=new T.Mesh(box,materials[material]);mesh.scale.set(...size);mesh.position.set(...pos);mesh.receiveShadow=true;group.add(mesh);return mesh;}
  function instances(group,geometry,material,transforms,shadows=false){const mesh=new T.InstancedMesh(geometry,materials[material],transforms.length);transforms.forEach((t,i)=>{dummy.position.set(...t.p);dummy.scale.set(...t.s);dummy.rotation.set(0,t.r||0,0);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);});mesh.castShadow=shadows;mesh.receiveShadow=true;group.add(mesh);}
  for(let i=0;i<count;i++){
    const chunk=new T.Group();chunk.userData.slot=null;
    solid(chunk,[2000,.1,length],[0,-.14,0],'grass');solid(chunk,[7.2,.06,length],[0,-.06,0],'edge');solid(chunk,[6.2,.08,length],[0,-.04,0],'road');
    for(const x of [-2.85,2.85])solid(chunk,[.10,.009,length],[x,.007,0],'line');
    const stripes=[],posts=[],reflectors=[],trunks=[],leaves=[],tips=[],rocks=[];
    for(let z=-27;z<30;z+=6)stripes.push({p:[0,.008,z],s:[.12,.012,3]});
    for(const side of [-1,1]){
      for(let z=-25;z<30;z+=10){posts.push({p:[side*3.8,.48,z],s:[.12,1,.14]});reflectors.push({p:[side*3.8,.86,z-.08],s:[.14,.13,.025]});}
      for(let j=0;j<13;j++){
        const z=-28+j*4.5+(i%3),x=side*(7+(j*13+i*7)%24),height=4+(j*7+i)%6;
        trunks.push({p:[x,height*.23,z],s:[.28,height*.46,.28]});
        leaves.push({p:[x,height*.59,z],s:[height*.31,height*.73,height*.31]});
        tips.push({p:[x,height*.86,z],s:[height*.22,height*.58,height*.22]});
        if(j%3===0)rocks.push({p:[side*(4.3+j%3),.25,z+2],s:[.7,.45,.9],r:j});
      }
    }
    instances(chunk,box,'line',stripes);instances(chunk,box,'wood',posts);instances(chunk,box,'line',reflectors);
    instances(chunk,box,'wood',trunks,true);instances(chunk,cone,'leaf',leaves,true);instances(chunk,cone,'leaf2',tips,true);instances(chunk,rock,'rock',rocks,true);
    chunks.push(chunk);scene.add(chunk);
  }
  const horizon=new T.Group();scene.add(horizon);
  const mountainMaterial=new T.MeshStandardMaterial({color:0xb4bba5,flatShading:true,roughness:1,fog:false});
  const mountainGeometry=new T.ConeGeometry(1,1,5);
  for(let i=0;i<18;i++){
    const a=i/18*Math.PI*2,m=new T.Mesh(mountainGeometry,mountainMaterial),height=35+(i*17)%60;
    m.position.set(Math.sin(a)*350,height*.5-7,Math.cos(a)*350);m.scale.set(80,height,85);m.rotation.y=a;horizon.add(m);
  }
  const cloudMaterial=new T.MeshBasicMaterial({color:0xf0ead6,fog:false});
  const clouds=new T.InstancedMesh(new T.IcosahedronGeometry(1,1),cloudMaterial,24);
  for(let i=0;i<24;i++){dummy.position.set((i*73%480)-240,65+(i%4)*7,(i*109%550)-275);dummy.scale.set(17+i%4*4,2.5,5);dummy.rotation.set(0,i,0);dummy.updateMatrix();clouds.setMatrixAt(i,dummy.matrix);}horizon.add(clouds);
  const sky=new T.Mesh(new T.SphereGeometry(900,24,12),new T.ShaderMaterial({side:T.BackSide,depthWrite:false,uniforms:{top:{value:new T.Color(0x559bbb)},bottom:{value:new T.Color(0xe8d7ad)}},vertexShader:'varying vec3 v; void main(){v=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:'varying vec3 v; uniform vec3 top; uniform vec3 bottom; void main(){float h=clamp(normalize(v).y*3.5+0.12,0.0,1.0);gl_FragColor=vec4(mix(bottom,top,h),1.0);\n #include <tonemapping_fragment>\n #include <colorspace_fragment>\n}'}));scene.add(sky);
  return {chunks,update(z,x=0){
    const center=Math.floor(z/length);
    // Stable modulo slots avoid moving every tree when crossing a chunk boundary.
    for(let offset=-5;offset<=5;offset++){const slot=center+offset,chunk=chunks[((slot%count)+count)%count];if(chunk.userData.slot!==slot){chunk.position.z=slot*length;chunk.userData.slot=slot;}chunk.children[0].position.x=x;}
    horizon.position.set(x*.9,0,z);sky.position.set(x,0,z);
  }};
}


