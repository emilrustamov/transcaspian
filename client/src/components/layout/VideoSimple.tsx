import { useRef, useState } from 'react';
import { video } from '../../utils/files/video';

function VideoSimple(file: { file: string }) {
  const [play, setPlay] = useState(false);
  const ref = useRef<any>();


  return (
    <div className="relative w-full h-full backdrop-blur-lg">
      <video ref={ref} onClick={() => (setPlay(!play), play && ref.current.pause())} controls={play} className="h-full w-full backdrop-blur-2xl">
        <source src={video(file.file)} />
      </video>
      {
        !play &&
        <div onClick={() => (setPlay(true),ref.current.play())} className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
          <svg className='w-5 h-5 md:w-8 md:h-8 lg:w-12 lg:h-12 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20 fill-white' viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.8039 8.00003L5 4.63291L5 11.3671L10.8039 8.00003ZM11.5964 7.30373C12.1345 7.6159 12.1345 8.38415 11.5964 8.69633L5.23279 12.3882C4.71256 12.69 4 12.3452 4 11.6919L4 4.30816C4 3.6549 4.71256 3.31005 5.23279 3.61186L11.5964 7.30373Z" />
          </svg>
        </div>
      }
    </div>
  );
}

export default VideoSimple;
