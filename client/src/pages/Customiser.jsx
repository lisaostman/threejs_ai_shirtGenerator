import React, {useState, useEffect} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import config from '../config/config';
import state from '../store';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';

import { AIPicker,ColorPicker, FilePicker, CustomButton, Tab } from '../components';

const Customiser = () => {
  // access state
  const snap = useSnapshot(state);

  // states - are we generating an image? prompting? file uplaodign?
  const [file, setFile] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState('');

  const [activeEditorTab, setActiveEditorTab] = useState('');
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt : false
  });

  // handling click of tab, show tab content depending on the activeTab
  const generateTabContent = () => {
    // checks state of active editor tab each reload to load content comp
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />
        break;
      case "filepicker":
        return <FilePicker 
        // pass it ability to see state (held by parent comp) and affect state change in parent comp
        file={file}
        setFile={setFile}
        readFile={readFile}
        />
        break;
      case "aipicker":
        return <AIPicker 
        prompt={prompt}
        setPrompt={setPrompt}
        generatingImg={generatingImg}
        handleSubmit={handleSubmit}
        />
        break;
      default:
        return null;
        break;
    }
  }

  const handleSubmit = async(type) => {
    if(!prompt) {
      return alert("Please enter a prompt!")
    }

    try {
      //call our backend to generate an AI image !
      setGeneratingImg(true);

      const response = await fetch('https://generator-ai-threejs.onrender.com/api/v1/dalle',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
        })
      })

      const data = await response.json();

      handleDecals(type,`data:image/png;base64,${data.photo}`);
    } catch {
      alert(error)
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab(" ")
    }
  }

  // setting our store state with the decal type
  const handleDecals = (type,result) => {
    // searching for full or logo type
    const decalType = DecalTypes[type];
    // updating state in store
    state[decalType.stateProperty] = result;

    // to see if the logo or texture is not active
    if (!activeFilterTab[decalType.filtertab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  }

  const handleActiveFilterTab = (tabName) => {
    // toggling on and off the active filter tab
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
          state.isFullTexture = !activeFilterTab[tabName];
          break;
      default:
        state.isFullTexture = false;
        state.isLogoTexture = true;
        break;
    }

    // after setting the state, activeFilterTab is updated
    setActiveFilterTab((prevState) =>{
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    } )
  }

  // user uploading file
  const readFile = (type) => {
      reader(file)
      .then((result) => {
        handleDecals(type,result);
        setActiveEditorTab("");
      })
  }

  return (
    // allows for animations
    <AnimatePresence>
      {!snap.intro && (
        <div>
          {/* motion div that slides from left for tabs on left side of screen */}
          <motion.div
          key="custom"
          // position the element on the page to the left
          className="absolute top-0 left-0 z-10"
          // allow for slide animation
          {...slideAnimation("left")}>
            {/* have tabs take up full size of the screen */}
            <div className="flex items-center min-h-screen">
              {/* customisation */}
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  // each tab object should create a tab comp instance
                  <Tab
                  // unique keys using names
                    key={tab.name}
                  // passes name and color pairing to tab comp as prop
                    tab={tab}
                    handleClick={()=> setActiveEditorTab(tab.name)}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          {/* motion div that fades, for back button */}
          <motion.div
          className="absolute z-10 top-5 right-5" {...fadeAnimation}>
            <CustomButton type="filled"
            title="Go Back"
            // changes snapshot state to have intro as true, 'returning user' to homepage
            handleClick={() => state.intro = true}
            customStyles="w-fit px-4 py-2.5 font-bold text-sm"/>
          </motion.div>
          {/* motion div for bottom filter tabs, slides up */}
          <motion.div className="filtertabs-container"
          {...slideAnimation("up")}>
            {/* iterate over filter tabs, also passed isFilterTab and isActiveTab as props */}
                {FilterTabs.map((tab) => (
                  // each tab object should create a tab comp instance
                  <Tab
                  // unique keys using names
                    key={tab.name}
                  // passes name and color pairing to tab comp as prop
                    tab={tab}
                    isFilterTab
                    isActiveTab={activeFilterTab[tab.name]}
                    handleClick={()=> handleActiveFilterTab(tab.name)}
                  />
                ))}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default Customiser