import map from '../../assets/images/map.png'
import tour1 from '../../assets/images/tours/tour1.png'
import tour2 from '../../assets/images/tours/tour2.png'
import tour3 from '../../assets/images/tours/tour3.png'
import tour4 from '../../assets/images/tours/tour4.png'
import tour5 from '../../assets/images/tours/tour5.png'
import tour6 from '../../assets/images/tours/tour6.png'
import tour7 from '../../assets/images/tours/tour7.png'
import tour8 from '../../assets/images/tours/tour8.png'
import { useState, useEffect } from 'react'
import Popup from './Popup'
import { useRouter } from 'next/router'
import Image from 'next/image'

const classTour = ' cursor-pointer absolute z-[2] sm:hover:border sm:hover:backdrop-blur-lg border-trans-brown hover:z-[3] rounded-lg transition-all'

function Map() {
  const route = useRouter();
  const [open, setOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<any>(null);
  const [activeName, setActiveName] = useState<any>(null);
  const [index, setIndex] = useState('');


  useEffect(() => {
    if (open) {
      const timeoutId = setTimeout(() => {
        route.push(process.env.NEXT_PUBLIC_API + '/map/' + index)
      }, 2000); // Delay in milliseconds

      return () => clearTimeout(timeoutId);
    }
  }, [open, route]);

  return (
    <div
      className="relative overflow-hidden w-full xl:w-[70%] h-auto mx-auto md:overflow-hidden">
      <img
        src={map.src}
        alt=""
        className='w-full h-full'
      />

      <div
        className={`
          absolute
          origin-left
          top-[29%]
          left-[14%]
          w-[15%]
          lg:hover:scale-[3]
          group
        `+ classTour
        }
      >
        <img
          onClick={() => { window.innerWidth > 1024 ? route.push(process.env.NEXT_PUBLIC_API + '/map/Yangykala_Canyons/1') : (setActiveImage(tour1), setActiveName('Yangykala Canyons'), setOpen(true), setIndex('Yangykala_Canyons/1')) }}
          src={tour1.src}
          alt=""
        />
        <h2 className='hidden sm:group-hover:block text-[0.7vw] text-trans-red text-center'>Yangykala Canyons</h2>
      </div>

      <div
        className={`
          absolute
          top-[30%]
          left-[35%]
          w-[14%]
          lg:hover:scale-[3]
          group
        `+ classTour}
      >
        <img
          onClick={() => { window.innerWidth > 1024 ? route.push(process.env.NEXT_PUBLIC_API + '/map/Darvaza_Gas_Crater/2') : (setActiveImage(tour2), setActiveName('Darvaza Gas Crater'), setOpen(true), setIndex('Darvaza_Gas_Crater/2')) }}
          src={tour2.src}
          alt=""
        />
        <h2 className='hidden sm:group-hover:block text-[0.7vw] text-trans-red text-center'>Darvaza Gas Crater</h2>
      </div>

      <div
        className={`
        absolute
        lg:hover:scale-[3]
        top-[47%]
        left-[25%]
        w-[7%]
        group
      `+ classTour}
      >
        <img
          onClick={() => { window.innerWidth > 1024 ? route.push(process.env.NEXT_PUBLIC_API + '/map/Old_Nisa/3') : (setActiveImage(tour3), setActiveName('Old Nisa'), setOpen(true), setIndex('Old_Nisa/3')) }}
          src={tour3.src}
          alt=""
        />
        <h2 className='hidden sm:group-hover:block text-[0.7vw] text-trans-red text-center'>Old Nisa</h2>
      </div>

      <div
        className={`
        absolute
        lg:hover:scale-[3]
        top-[53%]
        left-[35%]
        w-[13%]
        group
      `+ classTour}
      >
        <img
          onClick={() => { window.innerWidth > 1024 ? route.push(process.env.NEXT_PUBLIC_API + '/map/Ashgabat/4') : (setActiveImage(tour4), setActiveName('Ashgabat'), setOpen(true), setIndex('Ashgabat/4')) }}
          src={tour4.src}
          alt=""
        />
        <h2 className='hidden sm:group-hover:block text-[0.7vw] text-trans-red text-center'>Ashgabat</h2>
      </div>

      <div
        className={`
        absolute
        lg:hover:scale-[3]
        top-[42%]
        left-[55%]
        w-[10%]
        px-1
        pt-1
        group
        flex
        items-center
        flex-col
      `+ classTour}
      >
        <img
          onClick={() => { window.innerWidth > 1024 ? route.push(process.env.NEXT_PUBLIC_API + '/map/Gonur_Depe/5') : (setActiveImage(tour5), setActiveName('Gonur Depe'), setOpen(true), setIndex('Gonur_Depe/5')) }}
          src={tour5.src}
          alt=""
          className='w-[60%]'
        />
        <h2 className='hidden sm:group-hover:block text-[0.7vw] text-trans-red text-center min-w-max'>Gonur Depe</h2>
      </div>

      <div
        className={`
        absolute
        lg:hover:scale-[3]
        top-[58%]
        left-[57%]
        w-[15%]
        group
      `+ classTour}
      >
        <img
          onClick={() => { window.innerWidth > 1024 ? route.push(process.env.NEXT_PUBLIC_API + '/map/Ancient_Merv/6') : (setActiveImage(tour6), setActiveName('Ancient Merv'), setOpen(true), setIndex('Ancient_Merv/6')) }}
          src={tour6.src}
          alt=""
        />
        <h2 className='hidden sm:group-hover:block text-[0.7vw] text-trans-red text-center'>Ancient Merv</h2>
      </div>

      <div
        className={`
        absolute
        lg:hover:scale-[3]
        origin-right 
        top-[47%]
        left-[77%]
        w-[16%]
        group
      `+ classTour}
      >
        <img
          onClick={() => { window.innerWidth > 1024 ? route.push(process.env.NEXT_PUBLIC_API + '/map/Dinosaur_Plateau/7') : (setActiveImage(tour7), setActiveName('Dinosaur Plateau'), setOpen(true), setIndex('Dinosaur_Plateau/7')) }}
          src={tour7.src}
          alt=""
        />
        <h2 className='hidden sm:group-hover:block text-[0.7vw] text-trans-red text-center'>Dinosaur Plateau</h2>
      </div>

      <div
        className={`
        absolute
        lg:hover:scale-[3]
        origin-top 
        top-[0%]
        left-[34%]
        w-[14%]
        group
      `+ classTour}
      >
        <img
          onClick={() => { window.innerWidth > 1024 ? route.push(process.env.NEXT_PUBLIC_API + '/map/Koneurgench/8') : (setActiveImage(tour8), setActiveName('Koneurgench'), setOpen(true), setIndex('Koneurgench/8')) }}
          src={tour8.src}
          alt=""
        />
        <h2 className='hidden sm:group-hover:block text-[0.7vw] text-trans-red text-center'>Koneurgench</h2>
      </div>
      
      <Popup open={open} setOpen={setOpen} x={false}>
        <img onClick={() => { route.push(process.env.NEXT_PUBLIC_API + '/map/' + index) }} src={activeImage ? activeImage.src : ''} className='cursor-pointer max-h-[calc(80vh-120px)] mx-auto max-w-full object-contain' alt="" />
        <div className='text-[30px] text-center'>{activeName}</div>
      </Popup>
    </div>
  );
}

export default Map;
