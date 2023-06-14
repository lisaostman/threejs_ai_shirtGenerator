import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { CustomButton } from '../components';
import { 
    headContainerAnimation, 
    headContentAnimation, 
    headTextAnimation,
    slideAnimation
} from '../config/motion';

import state from '../store';

const Home = () => {
  const snap= useSnapshot(state);

  return (
    <AnimatePresence>
        {/* code only runs if snap intro is set to true */}
        {snap.intro && (
            // --- adjusting left text to bounce onto screen
            // react-motion section, iterates over key and value pairs in slideAnimation function to make object go left
            <motion.section className="home" {...slideAnimation('left')}>
                <motion.header {...slideAnimation("down")}>
                    <img src="./threejs.png"
                    alt="logo"
                    className="w-8 object-contain h-8"/>
                </motion.header>
                <motion.div className="home-content" {...headContainerAnimation}>
                    {/* text animation makes text bounce twice rather than just sliding onto the screen */}
                    <motion.div {...headTextAnimation}>
                        <h1 className="head-text">
                            {/* line break not shown except larger screens */}
                            LET'S <br className="xl:block"/> DO IT.
                        </h1>
                    </motion.div>
                    <motion.div {...headContentAnimation}
                    className='flex flex-col gap-5'>
                        <p className="max-w-md font-normal text-gray-600 text-base">
                            Create a unique addition to your wardrobe with a brand-new 3D customization tool. Define your <strong>style</strong>.
                        </p>
                        {/* creating custom button where we can pass it props, state.intro comes from valitio */}
                        <CustomButton 
                        type="filled" 
                        title="Customize It"
                        handleClick={()=>state.intro=false}
                        customStyle="w-fit px-4 py-2.5 font-bold text-sm" 
                        />
                    </motion.div>
                </motion.div>
            </motion.section>
            // ---
        )}
    </AnimatePresence>
  )
}

export default Home