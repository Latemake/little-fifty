import * as T from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
export function modelTools(){
 const materials={},geometries=new Set(),textures=new Set(),instances=new Set();
 function material(color,metal=0,rough=.7){const key=[color,metal,rough].join();return materials[key]??=new T.MeshStandardMaterial({color,metalness:metal,roughness:rough});}
 function mesh(parent,geometry,mat,pos=[0,0,0]){geometries.add(geometry);const o=new T.Mesh(geometry,mat);o.position.set(...pos);o.castShadow=o.receiveShadow=true;parent.add(o);return o;}
 function box(parent,size,pos,color,radius=.025){return mesh(parent,new RoundedBoxGeometry(...size,2,Math.min(radius,...size.map(v=>v*.4))),material(color),pos);}
 const up=new T.Vector3(0,1,0),a=new T.Vector3(),z=new T.Vector3(),delta=new T.Vector3();
 function poseBar(o,start,end){a.set(...start);z.set(...end);delta.subVectors(z,a);o.position.copy(a).add(z).multiplyScalar(.5);o.scale.y=delta.length();o.quaternion.setFromUnitVectors(up,delta.normalize());}
 function bar(parent,start,end,r,color,metal=0){const o=mesh(parent,new T.CylinderGeometry(r*.85,r,1,10),material(color,metal));poseBar(o,start,end);return o;}
 function sphere(parent,size,pos,color){const o=mesh(parent,new T.SphereGeometry(1,16,12),material(color),pos);o.scale.set(...size);return o;}
 function label(parent,text,size,pos,rotation=0,color='#edf0e8',background='#23292b'){
  const c=document.createElement('canvas');c.width=512;c.height=128;const ctx=c.getContext('2d');ctx.fillStyle=background;ctx.fillRect(0,0,c.width,c.height);ctx.fillStyle=color;ctx.font='italic bold 66px Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,256,66,490);
  const map=new T.CanvasTexture(c);map.colorSpace=T.SRGBColorSpace;textures.add(map);const mat=new T.MeshStandardMaterial({map,roughness:.7});materials['label'+Object.keys(materials).length]=mat;
  const o=mesh(parent,new T.PlaneGeometry(...size),mat,pos);o.rotation.y=rotation;return o;
 }
 function batch(root){
  const parents=[];root.traverse(o=>{if(o.isGroup)parents.push(o);});
  for(const parent of parents){
   const buckets=new Map();
   for(const o of parent.children){if(!o.isMesh||o.isInstancedMesh||o.userData.animated||Array.isArray(o.material))continue;const list=buckets.get(o.material)||[];list.push(o);buckets.set(o.material,list);}
   for(const [mat,objects] of buckets){if(objects.length<2)continue;
    const parts=objects.map(o=>{o.updateMatrix();const g=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();return g.applyMatrix4(o.matrix);});
    const merged=mergeGeometries(parts);parts.forEach(g=>g.dispose());
    if(merged){objects.forEach(o=>parent.remove(o));mesh(parent,merged,mat);}
   }
  }
 }
 return {material,mesh,box,bar,poseBar,sphere,label,batch,trackInstances(o){instances.add(o);geometries.add(o.geometry);},dispose(){instances.forEach(o=>o.dispose());geometries.forEach(g=>g.dispose());textures.forEach(t=>t.dispose());Object.values(materials).forEach(m=>m.dispose());}};
}
