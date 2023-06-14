import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Center } from '@react-three/drei';

import Shirt from './Shirt';
import Backdrop from './Backdrop';
import CameraRig from './CameraRig';

const CanvasModel = () => {
  return (
    <Canvas
      shadows
      // field of view brings camera closer
      camera={{position: [0,0,0], fov:25}}
      // preserves the buffers
      gl={{preserveDrawingBuffer:true}}
      className="w-full max-w-full h-full transition-all ease-in"
      >
      {/* setting lighting */}
      <ambientLight intensity={0.5}/>
      {/* built in environment preset of city */}
      <Environment preset="city" />
      <CameraRig>
        {/* our backdrop comp */}
        <Backdrop />
        {/* center comp in-built */}
        <Center>
          {/* our shirt comp */}
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  )
}

export default CanvasModel