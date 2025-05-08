import { useState, useRef } from 'react';
import { getOneLocation } from '../../../api-queries/Location';

import { Autoplay, Pagination, Zoom } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { image } from '../../../utils/files/image';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout/Layout';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';
import DarvazaSection from '@/components/DarvazaSection';
const HandleClickOutside = dynamic(() => import('@/components/Layout/HandleClickOutside'), { ssr: false })
const Head = dynamic(() => import('next/head'), { ssr: false })

function OneMapPage({ ssrData }: { ssrData: any }) {
  const [openGalleryImage, setOpenGalleryImage] = useState<boolean>(false);
  const [galleryActiveImage, setGalleryActiveImage] = useState<number>(0);
  const data = ssrData?.queries[0]?.state?.data;
  const swiperRef3 = useRef<any>();
  const swiperRef4 = useRef<any>();

  const handleKeypress2 = (e: any) => {
    if (e.key === 'ArrowLeft') {
      swiperRef3?.current?.slidePrev();
      swiperRef4?.current?.slidePrev();
    } else if (e.key === 'ArrowRight') {
      swiperRef3?.current?.slideNext();
      swiperRef4?.current?.slideNext();
    }
  }


  const getSwiper = (active: number) => {
    if (!openGalleryImage) return;
    return <Swiper
      ref={swiperRef4}
      className={'w-[90%] h-[90vh] m-auto'}
      modules={[Autoplay, Zoom]}
      spaceBetween={20}
      slidesPerView={1}
      loop={true}
      speed={1000}
      initialSlide={active}
      zoom={true}
      onBeforeInit={(swiper: any) => {
        swiperRef4.current = swiper;
      }}
    >
      {
        data && data?.images?.map((file: { image: string, type: string }, index: number) => (
          <SwiperSlide key={index} className=''>
            <div className="swiper-zoom-container">
              {/* <img loading="lazy" src={image(file.image)} {...bind} id={'' + index} alt="" className='close cursor-pointer rounded-2xl' /> */}
              <img loading="lazy" src={image(file.image)} id={'' + index} alt="" className='close cursor-pointer rounded-2xl' />
            </div>
          </SwiperSlide>
        ))
      }
    </Swiper>
  }

  return (
    <>
      <NextSeo
        title={data?.meta_name ? data?.meta_name : 'TC Tours'}
        description={data?.meta_description}
        canonical={`https://transcaspiantours.com/map/${(data?.name || 'default-map').replace(/\s+/g, '_')}/${data?.id || ''}`}
        openGraph={{
          title: data?.meta_name ? data?.meta_name : 'TC Tours',
          description: data?.meta_description,
          url: `https://transcaspiantours.com/map/${(data?.name || 'default-map').replace(/\s+/g, '_')}/${data?.id || ''}`, 
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content: data?.meta_keyword
          },
          {
            name: "author",
            content: "Transcaspian Tours"
          }
        ]}
      />
      <Layout>
        <Head>
          <title>{data?.meta_name ? data?.meta_name : 'TC Tours'}</title>
          <meta
            name="description"
            content={data?.meta_description}
          />
          <meta
            name="keywords"
            content={data?.meta_keyword}
          />

          <meta property="og:title" content={data?.meta_name} />
          <meta property="og:description" content={data?.meta_description} />
          <meta property="og:image" content="@/assets/images/Logo.png" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "TouristDestination",
                "name": data?.name,
                "description": data?.description?.replace(/<\/?[^>]+(>|$)/g, ""),
                "image": data?.images?.map((img: { image: string }) => image(img.image)),
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": "https://transcaspiantours.com/" 
                }
              })
            }}
          />
        </Head>

        <HandleClickOutside handleKeypress2={handleKeypress2} setOpenGalleryImage={setOpenGalleryImage} />

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='lg:pr-[130px]'>
          {
            data?.images?.length > 0 &&
            <div
              className='w-full lg:mt-20 h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] xl:h-[500px] 2xl:h-[600px] rounded-2xl overflow-hidden'
            >
              <Swiper
                ref={swiperRef3}
                className='h-full w-full'
                modules={[Autoplay, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                speed={1000}
                pagination={true}
                autoplay={true}
                onBeforeInit={(swiper: any) => {
                  swiperRef3.current = swiper;
                }}
              >
                {
                  data?.images?.map((img: { image: string }, index: number) => (
                    <SwiperSlide key={index} className='w-full h-full bg-gray-300 rounded-2xl'>
                      <img src={image(img?.image)} onClick={() => (setGalleryActiveImage(index), setOpenGalleryImage(true))} alt="" className='open cursor-pointer w-full h-full object-cover rounded-2xl' />
                    </SwiperSlide>
                  ))
                }
              </Swiper>
            </div>
          }

          <h1 className='font-serif text-[24px] md:text-[30px] lg:text-[36px] text-trans-red uppercase text-center my-2 lg:my-5'>{data?.name}</h1>
          <hr className="border border-trans-brown w-[70%] mx-auto mb-2 lg:mb-5 shadow" />
          <div className='text-base lg:text-lg whitespace-pre-line text-justify' dangerouslySetInnerHTML={{ __html: data?.description }}></div>

          <motion.div initial={{ scale: 0 }} animate={{ scale: openGalleryImage ? 1 : 0 }} className="fixed z-10 top-0 left-0 w-full h-[100vh] backdrop-blur-lg flex">
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
        <DarvazaSection />
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const paths = [
    {
      params: { name: 'Yangykala_Canyons', id: '1' },
    },
    {
      params: { name: 'Darvaza_Gas_Crater', id: '2' },
    },
    {
      params: { name: 'Old_Nisa', id: '3' },
    },
    {
      params: { name: 'Ashgabat', id: '4' },
    },
    {
      params: { name: 'Gonur_Depe', id: '5' },
    },
    {
      params: { name: 'Ancient_Merv', id: '6' },
    },
    {
      params: { name: 'Dinosaur_Plateau', id: '7' },
    },
    {
      params: { name: 'Koneurgench', id: '8' },
    },
  ]

  return { paths, fallback: false }
}

export async function getStaticProps({ params }: { params: { id: number } }) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['ssrData', params.id],
    queryFn: async () => {
      const res = await getOneLocation(Number(params.id));
      const ssrData = res?.data;
      return ssrData;
    },
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default function OneMapPageSSR({ dehydratedState }: any) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <OneMapPage ssrData={dehydratedState} />
    </HydrationBoundary>
  )
}