// actual shirt model component
import React from 'react';
import {easing} from 'maath';
import {useSnapshot} from 'valtio';
import {useFrame} from '@react-three/fiber';
// useGLTF allows us to use our 3d models
import {Decal, useGLTF, useTexture} from '@react-three/drei';

import state from '../store';

const Shirt = () => {
  // coming from our proxy set up in our store folder
  const snap = useSnapshot(state);
  // GLTF is allowing us to use our 3d models, searches public folder for shirt_baked.glb
  const {nodes,materials} =useGLTF('/shirt_baked.glb');

  // coming from store
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  // this use frame ensures our colors are rendered smoothly
  useFrame((state,delta) => easing.dampC(materials.lambert1.color,
    snap.color,
    0.25,delta))

  const stateString=JSON.stringify(snap);

  return (
    // ensures the model will be rendered whenever the state changes
    <group
    key={stateString}>
      {/* this mesh create t-shirt*/}
      <mesh
      castShadow
      geometry={nodes.T_Shirt_male.geometry}
      material={materials.lambert1}
      material-roughness={1}
      // ??? why need
      dispose={null}
      >
        {/* // are we showing logo on shirt, if so create a decal in-built comp with map of texture, scale, rotation and position*/}
        {snap.isFullTexture && (
          <Decal 
          position={[0,0,0]}
          rotation={[0,0,0]}
          scale={1}
          map={fullTexture}
          />
        )}
        {/* logo, if on, will display a decal comp inside the mesh */}
        {snap.isLogoTexture && (
          <Decal 
          position={[0,0.04,0.15]}
          rotation={[0,0,0]}
          scale={0.15}
          map={logoTexture}
          // quality of texture
          map-anisotrophy={16}
          // renders on top of other objects in scene
          depthTest={false}
          depthWrite={true}
          />
        )}
      </mesh>
    </group>
  )
}

export default Shirt