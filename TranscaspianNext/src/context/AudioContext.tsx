import { createContext, useState, useContext, useRef } from 'react';

const AudioContext = createContext<any>(null);

export const AudioProvider = ({ children }: { children: any }) => {
  const [play, setPlay] = useState(false);
  const audioRef = useRef<any>();
  const pause = () => {
    setPlay(false);
    audioRef.current.pause();
  }

  const notPause = () => {
    setPlay(true);
    audioRef.current.play();
  }
  return (
    <AudioContext.Provider value={{ pause,notPause,play,setPlay }}>
      <audio
        loop
        ref={audioRef} src={process.env.NEXT_PUBLIC_GLOBAL_API + '/image/audio.mp3'}
      >
      </audio>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
