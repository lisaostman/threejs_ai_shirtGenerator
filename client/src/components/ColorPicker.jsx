import React from 'react';
// react color package for palette
import {SketchPicker} from 'react-color';
import { useSnapshot } from 'valtio';

import state from '../store'

const ColorPicker = () => {
  const snap = useSnapshot(state);

  return (
    <div className="absolute left-full ml-3">
      <SketchPicker 
      color={snap.color}
      // opacity disabled
      disableAlpha
      onChange={(color) => state.color = color.hex}
      presetColors = {[
        '#000', '#fff', '#E0BBE4', '#957DAD', '#FEC8D8', 
        '#FFDFD3'
      ]}
      />
    </div>
  )
}

export default ColorPicker