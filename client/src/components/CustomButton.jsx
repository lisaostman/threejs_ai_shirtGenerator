import React from 'react';
// retrive default color state
import state from '../store';
import { useSnapshot } from 'valtio';

import {getContrastingColor} from '../config/helpers';

const CustomButton = ({type,title,customStyles,handleClick}) => {
    // function to change type of button depending on type passed as prop
    const snap = useSnapshot(state);
    const generateStyle = (type) => {
        // check if type is filled
        if (type === 'filled') {
            return {
            // if so, set backgroundColor to default snapshotcolor state
                backgroundColor: snap.color,
                color: getContrastingColor(snap.color)
            }
        } else if (type==='outline') {
            return {
                borderWidth: '1px',
                borderColor: snap.color,
                color: snap.color
            }
        }
    }

    return (
    <button 
    // interpolation helps to insert all custom styles in quote
    className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
    style={generateStyle(type)}
    onClick={handleClick}>
        {title}
    </button>
  )
}

export default CustomButton

// control click to go into comps