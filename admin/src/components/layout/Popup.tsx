import React from 'react';
import { motion } from 'framer-motion';
import { t } from 'i18next';

function Popup(
  {
    open,
    title,
    children,
    setOpen,
  }: {
    open: boolean,
    children: React.ReactNode
    title?: string,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  }) {
  return (
    <>
      <motion.div onClick={() => setOpen(false)} className={"popup-back fixed z-[3] top-0 left-0 right-0 bottom-0 bg-gray-500 blur-2xl invert brightness-150 md:filter-none opacity-[0.6] w-full h-screen "+(open ? 'scale-1' : 'scale-0')}></motion.div>
      <motion.div initial={{ scale: 0 }} animate={{ scale: open ? 1 : 0, translateY: '-50%', translateX: '-50%' }} className={'fixed z-[3] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white shadow max-w-[500px] w-2/5 rounded-lg p-5'}>
        <div className='flex justify-between'>
          <span className='font-semibold text-xl'>{title ? t(title) : ''}</span>
          <button onClick={() => setOpen(false)}>
            <svg width="20" height="20" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.646447 0.646447C0.841709 0.451184 1.15829 0.451184 1.35355 0.646447L4 3.29289L6.64645 0.646447C6.84171 0.451184 7.15829 0.451184 7.35355 0.646447C7.54882 0.841709 7.54882 1.15829 7.35355 1.35355L4.70711 4L7.35355 6.64645C7.54882 6.84171 7.54882 7.15829 7.35355 7.35355C7.15829 7.54882 6.84171 7.54882 6.64645 7.35355L4 4.70711L1.35355 7.35355C1.15829 7.54882 0.841709 7.54882 0.646447 7.35355C0.451184 7.15829 0.451184 6.84171 0.646447 6.64645L3.29289 4L0.646447 1.35355C0.451184 1.15829 0.451184 0.841709 0.646447 0.646447Z" fill="black" />
            </svg>
          </button>
        </div>
        {children}
      </motion.div>
    </>
  );
}

export default Popup;
