import { Suspense } from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Search from './Search';
import bgImage from '../../assets/images/background.png';
import Loading from './Loading';
import MobileMenu from './MobileMenu';

function Layout() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: `url('${bgImage}')` }} id='top' className="bg-fixed bg-cover min-h-[100vh]">
      <div
        className="container w-[95%] mx-auto py-[20px] md:py-[30px] lg:py-[30px] xl:py-[50px]"
      >
        <Sidebar />
        <Search />
        <Suspense fallback={<Loading />}>
          <div className='md:pl-[120px] lg:pl-40 pt-[80px] lg:pt-[0]'>
            <Outlet />
          </div>
        </Suspense>
      </div>
    </motion.div>
  );
}

export default Layout;
