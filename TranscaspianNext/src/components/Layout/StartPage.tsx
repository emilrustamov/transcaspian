import Image from 'next/image';
import logo from '../../assets/images/Logo.png'
import { motion } from 'framer-motion'

function StartPage({ go, setGo }: { go: boolean, setGo: any }) {
  return (
    <div className='w-full h-full flex items-center justify-center flex-col'>
      <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ repeat: 3, duration: 2, repeatType: 'reverse' }}>
        <img src={logo.src} alt='Logo'/>
      </motion.div>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: go ? 1 : 0 }}
        transition={{duration:2,delay:2}}
        onClick={()=>(setGo(),document.querySelector('audio')?.play())}
        className='bg-trans-brown text-white px-5 py-2 rounded-lg mt-5'
      >
        Start journey
      </motion.button>
    </div>
  );
}

export default StartPage;
