import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import PopupDelete from '../layout/PopupDelete';

function SimpleVideo(
  {
    video,
    className,
    id,
    success,
    deleteVideo,
  }: {
    video: any,
    className: string,
    id: number,
    success: boolean,
    deleteVideo: (id: number) => void
  }) {
  const [play, setPlay] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (success) setOpen(false);
  }, [success])
  return (
    <div className='relative'>
      <video controls ref={ref} id='video' className={className} onPlay={() => setPlay(true)} onPause={() => setPlay(false)}>
        <source src={video} />
      </video>
      <button
        type="button"
        className="bg-red-500 rounded-lg h-[30px] w-[30px] absolute top-1 right-1 flex items-center justify-center"
        onClick={() => { setOpen(true) }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 1.5V2.5H14.5C14.7761 2.5 15 2.72386 15 3C15 3.27614 14.7761 3.5 14.5 3.5H13.9616L13.1088 14.1595C13.0257 15.1989 12.1579 16 11.1152 16H4.88479C3.84207 16 2.97431 15.1989 2.89116 14.1595L2.0384 3.5H1.5C1.22386 3.5 1 3.27614 1 3C1 2.72386 1.22386 2.5 1.5 2.5H5V1.5C5 0.671573 5.67157 0 6.5 0H9.5C10.3284 0 11 0.671573 11 1.5ZM6 1.5V2.5H10V1.5C10 1.22386 9.77614 1 9.5 1H6.5C6.22386 1 6 1.22386 6 1.5ZM4.49999 5.0285L4.99999 13.5285C5.0162 13.8042 5.25282 14.0145 5.52849 13.9983C5.80415 13.9821 6.01448 13.7454 5.99826 13.4698L5.49826 4.96978C5.48205 4.69411 5.24543 4.48379 4.96976 4.5C4.6941 4.51622 4.48377 4.75283 4.49999 5.0285ZM11.0302 4.50086C10.7546 4.48465 10.5179 4.69497 10.5017 4.97064L10.0017 13.4706C9.98552 13.7463 10.1958 13.9829 10.4715 13.9991C10.7472 14.0154 10.9838 13.805 11 13.5294L11.5 5.02936C11.5162 4.75369 11.3059 4.51708 11.0302 4.50086ZM8 4.5C7.72386 4.5 7.5 4.72386 7.5 5V13.5C7.5 13.7761 7.72386 14 8 14C8.27615 14 8.5 13.7761 8.5 13.5V5C8.5 4.72386 8.27615 4.5 8 4.5Z" fill="white"></path>
        </svg>
      </button>
      <motion.div initial={{ opacity: 0.8 }} animate={{ opacity: !play ? [0, 0.8] : [0.8, 0] }} transition={{ duration: 0.1 }}>
        <svg onClick={() => !play ? ref.current?.play() : ref.current?.pause()} className='cursor-pointer absolute z-[1] top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] opacity-[0.8] fill-gray-100' width="40" height="50" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.271209 0.055418C0.437745 -0.0302842 0.638212 -0.0157272 0.790619 0.0931351L4.29062 2.59314C4.42202 2.68699 4.5 2.83853 4.5 3C4.5 3.16148 4.42202 3.31301 4.29062 3.40687L0.790619 5.90687C0.638212 6.01573 0.437745 6.03029 0.271209 5.94459C0.104674 5.85888 0 5.6873 0 5.5V0.500002C0 0.312708 0.104674 0.14112 0.271209 0.055418Z" />
        </svg>
      </motion.div>

      <PopupDelete open={open} setOpen={setOpen} mutate={deleteVideo} id={id} />
    </div>
  );
}

export default SimpleVideo;
