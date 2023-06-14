// going to be the rig for the camera, helps us go closer/angle model
import React, { useRef } from 'react';
import {useFrame} from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';

// imports current state
import state from "../store";

// group?? we pass it child components, so we must use the children react prop to render them
const CameraRig = ({children}) => {
  // reference to update state
  const group = useRef();
  // useSnapshot catches changes to the proxy
  const snap = useSnapshot(state);

  // this hook executes code on every rendered state
  // delta is information from the last frame that happened
  useFrame((state, delta) => {
    //responsiveness
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;
    // set initial position of model
    let targetPosition = [-0.4, 0, 2];
    // if on landing page
    if (snap.intro) {
      if (isBreakpoint) targetPosition = [0,0,2];
      if (isMobile) targetPosition = [0,0.2,2.5]
    } else {
      if (isMobile) targetPosition = [0,0,2.5]
      else targetPosition = [0,0,2]
    }

    // set camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    //set the model rotation smoothly
    easing.dampE(
    // current rotation of the group ref
    group.current.rotation,
    // checks the pointer of the current state of frame, x y z indexes
    [state.pointer.y/10,-state.pointer.x/5,0],
    // smooth time
    0.25,
    delta
  )
  })

  return (
    <group ref={group}>
      {children}
    </group>
  )
}

export default CameraRig