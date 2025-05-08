import { AnimatePresence, motion } from 'framer-motion'
import Routes from './routes/Routes'
import { useEffect, useState } from 'react'
import Loading from './components/layout/Loading';
import DisableRightClick from './components/layout/DisableRightClick';

function App() {
  const [open, setOpen] = useState(true);
  const [go, setGo] = useState(false)

  useEffect(() => {
    const num = setInterval(() => {
      setOpen(false);
      setGo(true);

      clearInterval(num);
    }, 6000)
  }, []);

  return (
    <>
      <DisableRightClick />
      <AnimatePresence>
        {
          <motion.div
            initial={{ x: 0, opacity: 1 }}
            animate={{
              x: !go ? 0 : '-100%',
              opacity: !go ? 1 : 0,
              transition: {
                duration: 2,
                ease: 'easeInOut',
              },
            }}
            className='fixed top-0 left-0 w-full h-screen z-[101] bg-white'
          >
            <Loading />
          </motion.div>
        }
      </AnimatePresence>
      <Routes />
    </>
  )
}

export default App