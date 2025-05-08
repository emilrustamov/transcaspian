import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const Sidebar = dynamic(() => import('./Sidebar'), { ssr: false })
import { AnimatePresence, motion } from 'framer-motion';
const Search = dynamic(() => import('./Search'), { ssr: false })
import bgImage from '@/assets/images/background.png';
const Loading = dynamic(() => import('./Loading'), { ssr: false })
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/zoom';
import 'swiper/css/effect-coverflow'

interface ILayout {
  children: React.ReactNode;
  className?: string;
}
function Layout({ children, className }: ILayout) {
  const [open, setOpen] = useState(true);
  const [go, setGo] = useState(false)
  useEffect(() => {
    const num = setInterval(() => {
      setOpen(false);
      setGo(true);

      clearInterval(num);
    }, 3000)
  }, []);
  return (
    <>
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
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: `url('${bgImage.src}')` }} id='top' className="bg-fixed bg-cover min-h-[100vh]">
        <div
          className="container w-[95%] mx-auto py-[20px] md:py-[30px] lg:py-[30px] xl:py-[50px]"
        >
          <Sidebar />
          <Search />
          <Suspense fallback={<Loading />}>
            <div className='md:pl-[120px] lg:pl-40 pt-[80px] lg:pt-[0]'>
              {children}
            </div>
          </Suspense>
        </div>
      </motion.div>
    </>
  );
}

export default Layout