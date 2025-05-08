import React from 'react';
import image from '../../assets/images/Logo.png';
import { motion } from 'framer-motion';
function Loading() {
  return (
    <div className='fixed z-[100] top-0 left-0 w-full h-full flex bg-white items-center justify-center'>
      <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}>
        <img src={image.src} alt="" />
      </motion.div>
    </div>
  );
}

export default Loading;
