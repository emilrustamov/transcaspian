import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useGetOneLocation } from '../api-queries/Location';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/zoom';
import 'swiper/css/effect-coverflow'
import { Autoplay, Pagination, Zoom } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { image } from '../utils/files/image';
import { motion } from 'framer-motion';
import { useGetOneTrip } from '../api-queries/Trip';
import { useDoubleTap } from 'use-double-tap';
import { Helmet } from 'react-helmet';

function OneTripPage() {
  const { id } = useParams();
  const [openGalleryImage, setOpenGalleryImage] = useState<boolean>(false);
  const [galleryActiveImage, setGalleryActiveImage] = useState<number>(0);
  const data = useGetOneTrip(Number(id))
  const swiperRef = useRef<any>();
  const swiperRef2 = useRef<any>();

  const bind = useDoubleTap((e: any) => {
    setGalleryActiveImage(Number(e.target.id))
    setOpenGalleryImage(true)
  })

  const handleKeypress = (e: any) => {
    if (e.key === 'ArrowLeft') {
      swiperRef.current?.slidePrev();
      swiperRef2.current?.slidePrev();
    } else if (e.key === 'ArrowRight') {
      swiperRef.current?.slideNext();
      swiperRef2.current?.slideNext();
    }
  }

  useEffect(() => {
    document.querySelector('body')?.addEventListener('keydown', handleKeypress);

    return () => {
      document.querySelector('body')?.removeEventListener('keydown', handleKeypress);
    }
  }, []);

  useEffect(() => {

    const handleClickOutside = (event: any) => {
      if (event?.target?.className?.split(' ')?.[0] !== 'close' && event?.target?.className?.split(' ')?.[0] !== 'open') {
        setOpenGalleryImage(false);
      } else if (event?.target?.className?.split(' ')?.[0] === 'open') {
        setOpenGalleryImage(true)
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const getSwiper = (active: number) => {
    if (!openGalleryImage) return;
    return <Swiper
      ref={swiperRef2}
      className={'w-[90%] h-[90vh] m-auto'}
      modules={[Autoplay, Zoom]}
      spaceBetween={20}
      slidesPerView={1}
      loop={true}
      speed={1000}
      initialSlide={active}
      zoom={true}
      onBeforeInit={(swiper: any) => {
        swiperRef2.current = swiper;
      }}
    >
      {
        data?.data?.data?.images?.map((file: { image: string, type: string }, index: number) => (
          <SwiperSlide key={index} className=''>
            <div className="swiper-zoom-container">
              <img loading="lazy" src={image(file.image)} id={'' + index} alt="" className='close rounded-2xl cursor-pointer' />
            </div>
          </SwiperSlide>
        ))
      }
    </Swiper>
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='lg:pr-[130px]'>
      <Helmet>
        <title>{data.data?.data?.meta_name ? data.data?.data?.meta_name : 'TC Tours'}</title>
        <meta name="description" content={data.data?.data?.meta_description ? data.data?.data?.meta_description : 'TC Tours'} />
        <meta name="keyword" content={data.data?.data?.meta_keyword} />
      </Helmet>
      {
        data?.data?.data?.images?.length > 0 &&
        <div
          className='w-full lg:mt-20 h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] xl:h-[500px] 2xl:h-[600px] rounded-2xl overflow-hidden'
        >
          <Swiper
            className='h-full w-full'
            ref={swiperRef}
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            speed={1000}
            pagination={true}
            autoplay={true}
            onBeforeInit={(swiper: any) => {
              swiperRef.current = swiper;
            }}
          >
            {
              data?.data?.data?.images?.map((img: { image: string }, index: number) => (
                <SwiperSlide key={index} className='w-full h-full bg-gray-300 rounded-2xl'>
                  <img src={image(img?.image)} onClick={() => (setGalleryActiveImage(index), setOpenGalleryImage(true))} alt="" className='open cursor-pointer w-full h-full object-cover rounded-2xl' />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      }

      <h1 className='font-serif text-[24px] md:text-[30px] lg:text-[36px] text-trans-red uppercase text-center my-2 lg:my-5'>{data?.data?.data?.title}</h1>
      <hr className="border border-trans-brown w-[70%] mx-auto mb-2 lg:mb-5 shadow" />
      <p className='text-base lg:text-lg whitespace-pre-line text-justify' dangerouslySetInnerHTML={{__html:data?.data?.data?.description}}></p>

      <motion.div initial={{ scale: 0 }} animate={{ scale: openGalleryImage ? 1 : 0 }} className="fixed z-10 w-full h-[100vh] top-0 left-0  backdrop-blur-lg flex">
        <button onClick={() => setOpenGalleryImage(false)} className='open-image_close-button bg-white fixed z-[18] top-10 right-10 h-10 w-10 flex items-center justify-center rounded-lg'>
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.14645 2.85355C1.95118 2.65829 1.95118 2.34171 2.14645 2.14645C2.34171 1.95118 2.65829 1.95118 2.85355 2.14645L8 7.29289L13.1464 2.14645C13.3417 1.95118 13.6583 1.95118 13.8536 2.14645C14.0488 2.34171 14.0488 2.65829 13.8536 2.85355L8.70711 8L13.8536 13.1464C14.0488 13.3417 14.0488 13.6583 13.8536 13.8536C13.6583 14.0488 13.3417 14.0488 13.1464 13.8536L8 8.70711L2.85355 13.8536C2.65829 14.0488 2.34171 14.0488 2.14645 13.8536C1.95119 13.6583 1.95119 13.3417 2.14645 13.1464L7.29289 8L2.14645 2.85355Z" fill="black" />
          </svg>
        </button>
        {
          getSwiper(galleryActiveImage)
        }

      </motion.div>
    </motion.div>
  );
}

export default OneTripPage;
