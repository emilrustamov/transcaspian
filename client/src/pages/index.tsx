import { useGetAboutUs } from "../api-queries/AboutUs";
import Map from "../components/layout/Map";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/zoom';
import 'swiper/css/effect-coverflow'
import { Autoplay, Pagination, Zoom, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { image } from "../utils/files/image";
import { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { useGetAllFiles } from "../api-queries/Gallery";
import VideoSimple from "../components/layout/VideoSimple";
import Loading from "../components/layout/Loading";
import { useGetAllTrips } from "../api-queries/Trip";
import { Link } from "react-router-dom";
import { useGetAllTips } from "../api-queries/Tips";
import TripCart from "../components/layout/TripCart";
import contactImage from '../assets/images/contact.png'
import { useDoubleTap } from 'use-double-tap';
import { AxiosInstance } from "../common/AxiosInstance";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet";

function IndexPage() {
  const [openAboutImage, setOpenAboutImage] = useState<boolean>(false);
  const swiperRef = useRef<any>();
  const swiperRef2 = useRef<any>();
  const [openGalleryImage, setOpenGalleryImage] = useState<boolean>(false);
  const [galleryActiveImage, setGalleryActiveImage] = useState<number>(0);
  const aboutUsData = useGetAboutUs();
  const galleryData = useGetAllFiles();
  const toursData = useGetAllTrips({ limit: 1000, page: 0 });
  const tipsData = useGetAllTips({ limit: 1000, page: 0 });
  const [stretch, setStretch] = useState(0);
  const [data, setData] = useState({
    name: '',
    mail: '',
    text: '',
  })

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setStretch(300)
      } else if (window.innerWidth >= 1024) {
        setStretch(200);
      } else if (window.innerWidth >= 768) {
        setStretch(150);
      } else {
        setStretch(100);
      }
    };

    handleResize();

  }, [stretch])

  useEffect(() => {
    if (openAboutImage) {
      document.querySelector('body')!.style.overflowY = 'hidden';
    } else {
      document.querySelector('body')!.style.overflowY = 'auto';
    }
  }, [openAboutImage]);

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

    document.querySelector('body')?.addEventListener('keydown', handleKeypress)

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

  const bind = useDoubleTap((e: any) => {
    setGalleryActiveImage(Number(e.target.id))
    setOpenGalleryImage(true)
  })

  const handleData = async (e: any) => {
    e.preventDefault()
    try {
      const res = await AxiosInstance.post(import.meta.env.VITE_URL + '/public/contact-us', data)
      if (res.status === 201) {
        setData({
          name: '',
          mail: '',
          text: ''
        })
        toast.success('Sent', { position: 'bottom-right', autoClose: 2000 })
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (galleryData.isPending) return <Loading />

  const getSwiper = (active: number) => {
    if (!openGalleryImage) return;

    return <Swiper
      className={'w-[90%] h-[90vh] m-auto'}
      modules={[Autoplay, Zoom]}
      spaceBetween={20}
      slidesPerView={1}
      loop={true}
      speed={1000}
      initialSlide={active}
      onBeforeInit={(swiper: any) => {
        swiperRef2.current = swiper;
      }}
      zoom={true}
    >
      {
        galleryData?.data?.data?.map((file: { file: string, type: string }, index: number) => (
          <SwiperSlide key={index} className=''>
            <div className="swiper-zoom-container">
              {
                file.type === 'image' &&
                <img loading="lazy" src={image(file.file)} {...bind} id={'' + index} alt="" className='close rounded-2xl' />
              }
              {
                file.type === 'video' &&
                <VideoSimple file={file.file} />
              }
            </div>
          </SwiperSlide>
        ))
      }
    </Swiper>
  }

  const getYear = () => {
    let d = new Date();
    return d.getFullYear();
  }

  console.log(aboutUsData.data)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full swiper-container">
      <Helmet>
        <title>{aboutUsData.data?.meta_name ? aboutUsData.data?.meta_name : 'TC Tours'}</title>
        <meta name="description" content={aboutUsData.data?.meta_description ? aboutUsData.data?.meta_description : 'TC Tours'} />
        <meta name="keyword" content={aboutUsData.data?.meta_keyword} />
      </Helmet>
      {/* Map */}
      <section>
        <h1 className="text-trans-red text-[24px] md:text-[30px] lg:text-[36px] font-serif uppercase text-center md:text-left w-full md:w-4/5 lg:w-1/2">Visit Turkmenistan: Going the extra mile</h1>
        <h2>TEST HEADER</h2>

        <Map />
      </section>

      {/* About us */}
      <section id="aboutUs" className="aboutUs overflow-hidden w-full py-10 md:py-20 flex flex-col md:flex-row">
        <motion.div
          initial={{ opacity: 0, x: '-50px' }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.5,
              ease: 'easeInOut',
            },
          }}
          className="aboutUs_content my-auto w-full max-h-[90%] mb-5 md:mb-auto md:pr-2 lg:pr-5 overflow-auto">
          {
            aboutUsData?.data?.header.map((header: string, index: number) => {
              return (
                <div className="aboutUs_content_part" key={index}>
                  <h2 className="sm:text-[24px] md:text-[30px] lg:text-[36px] text-trans-red uppercase font-serif mb-2 md:mb-5">{header}</h2>
                  <p className="text-base md:text-lg lg:text-xl leading-6 md:leading-8 text-justify" dangerouslySetInnerHTML={{ __html: aboutUsData.data.description?.[index] }}></p>
                  {
                    aboutUsData.data.header.length - 1 !== index &&
                    <hr className="w-[90%] border border-trans-red bg-trans-red shadow mb-5 mt-3" />
                  }
                </div>
              )
            })
          }
          <div className="images flex grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
            {
              aboutUsData?.data?.images.length > 0 && aboutUsData?.data?.images?.map((img: { image: string }, index: number) => (
                <div className="w-full h-[500px] md:h-[200px] lg:h-[230px] xl:h-[300px] rounded-lg bg-cover bg-center" key={index} style={{ backgroundImage: `url(${image(img.image)})` }} />
              ))
            }
          </div>
        </motion.div>
      </section >

      {/* Gallery */}
      <motion.section
        initial={{ opacity: 0, y: '50px' }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: 'easeInOut',
          },
        }}
        id="gallery"
        className="gallery py-10 md:py-20">
        <h2
          className="font-serif text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[36px] text-trans-red text-center">
          <span className="uppercase">SMELL IT! TASTE IT! FEEL IT!</span>
          <br />
          <span className="italic text-[16px] sm:text-[20px] leading-3 md:text-[24px] lg:text-[28px] xl:text-[32px]">“The first condition of understanding a foreign country is to smell it.” Rudyard Kipling</span>
        </h2>
        <div className="py-12">
          <hr className="border border-trans-brown w-[70%] mx-auto mb-10 shadow" />
          <Swiper
            ref={swiperRef}
            className='w-full h-[150px] sm:h-[200px] md:h-[300px] lg:h-[340px] xl:h-[400px] 2xl:h-[600px]'
            modules={[Autoplay, EffectCoverflow, Pagination]}
            pagination={false}
            loop={true}
            speed={1000}
            autoplay={true}
            effect="coverflow"
            centeredSlides={true}
            slidesPerView={1.5}
            grabCursor={true}
            onBeforeInit={(swiper: any) => {
              swiperRef.current = swiper;
            }}
            coverflowEffect={{
              rotate: 0,
              modifier: 1,
              depth: 800,
              stretch: stretch //xl = 300 lg = 200 md = 150 sm = 100
            }}
          >
            {
              galleryData?.data?.data?.map((file: { file: string, type: string }, index: number) => (
                <SwiperSlide key={index} className='w-[600px] h-full'>
                  {
                    file.type === 'image' &&
                    <img src={image(file.file)} {...bind} id={'' + index} onClick={() => (setGalleryActiveImage(index), setOpenGalleryImage(true))} alt="" className='open w-full h-full object-cover rounded-2xl' />
                  }
                  {
                    file.type === 'video' &&
                    <VideoSimple file={file.file} />
                  }
                </SwiperSlide>
              ))
            }
          </Swiper>

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
        </div>
      </motion.section>

      {/* Tours */}
      <section id="tripTip" className="py-10 md:py-20 overflow-hidden">
        <h2 className="font-serif text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[36px] text-trans-red uppercase text-center">Trip tips</h2>
        <hr className="border border-trans-brown w-[70%] mx-auto my-5 shadow" />
        <div className="tours_contents grid grid-cols-center-2 gap-5 md:gap-10 xl:gap-20">
          {
            toursData.data?.data?.data?.map((tour: { id: number, description: string, images: any[], title: string }, index: number) => {
              if (index % 2 === 0) {
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: '-50px' }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.5,
                        ease: 'easeInOut',
                      },
                    }}
                  >
                    <Link to={import.meta.env.VITE_API + '/trip/' + tour.id} className="">
                      <img className="rounded-xl w-full object-cover h-[100px] md:h-[150px] lg:h-[200px] xl:h-[250px] 2xl:h-[300px]" src={image(tour?.images[0]?.image)} loading="lazy" alt="" />
                      <h2 className="text-trans-red text-lg md:text-2xl text-center mt-3">{tour.title}</h2>
                    </Link>
                  </motion.div>
                )
              } else {
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: '50px' }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.5,
                        ease: 'easeInOut',
                      },
                    }}
                  >
                    <Link to={import.meta.env.VITE_API + '/trip/' + tour.id} className="">
                      <img className="rounded-xl w-full object-cover h-[100px] md:h-[150px] lg:h-[200px] xl:h-[250px] 2xl:h-[300px]" src={image(tour.images[0]?.image)} loading="lazy" alt="" />
                      <h2 className="text-trans-red text-lg md:text-2xl text-center mt-3">{tour.title}</h2>
                    </Link>
                  </motion.div>
                )
              }
            })
          }
        </div>
      </section>

      {/* Useful tips */}
      <section id="useful" className="py-10 md:py-20">
        <h2 className="font-serif text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[36px] text-trans-red uppercase text-center">Useful</h2>
        <hr className="border border-trans-brown w-[70%] mx-auto my-5 shadow" />
        <div className="usefulTips_contents grid max-sm:grid-cols-center-2 sm:max-xl:grid-cols-center-3 xl:grid-cols-center-4 gap-10">
          {
            tipsData.data?.data?.tips?.map((tip: { description: string, title: string }, index: number) => {
              // if(tipsData.data?.data?.tips.length % 2 === 1)
              return (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{
                    opacity: 1,
                    transition: {
                      duration: 0.5,
                      ease: 'easeInOut',
                    },
                  }}
                  key={index}>
                  <TripCart tip={tip} />
                </motion.div>
              )
            }
            )
          }
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className=" flex flex-col-reverse md:flex-row w-full md:min-h-auto h-auto py-10 md:py-20 overflow-hidden relative">
        <motion.img
          initial={{ opacity: 0, x: '-50px' }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.8,
              ease: 'easeInOut',
            },
          }}
          src={contactImage}
          alt=""
          className="object-contain md:h-fit lg:h-auto md:hidden lg:block w-full md:w-2/5 mr-3 mt-5 lg:mt-0"
        />
        <motion.div
          initial={{ opacity: 0, x: '50px' }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.8,
              ease: 'easeInOut',
            },
          }}
          className="contact w-full lg:w-3/5 h-full flex flex-col justify-center md:static z-[2]"
        >
          <h2 className="font-serif text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[36px] text-trans-red uppercase text-center">Contact Us</h2>
          <p className="mt-5 mb-6 text-center text-semibold">For more information please feel free to use below form or email us on <a href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCHrgDMjCdvvsstsTvxPHXCzsPzhGjgQDRDFJXFTkgzMNCWbLvWbrFPLtQqjpxbhmlwNLFGq" target="_blank" className="text-blue-700"> tours@transcaspiantours.com</a></p>

          <form onSubmit={handleData} className="grid grid-cols-1 md:flex lg:grid-cols-2 gap-y-4 gap-x-6 mx-8 md:mx-0">
            <motion.img
              initial={{ opacity: 0, x: '-50px' }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.8,
                  ease: 'easeInOut',
                },
              }}
              src={contactImage}
              alt=""
              className="object-cover hidden md:block lg:hidden w-full md:w-2/5"
            />
            <div className="w-full col-span-1 grid grid-cols-2 gap-y-4 gap-x-6 ">
              <input
                type="text"
                name="name"
                required
                value={data.name}
                onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                className="border text-white border-trans-brown focus:border-trans-red rounded px-5 py-2 bg-trans-brown placeholder-trans-text-brown outline-none"
                placeholder="Name"
              />

              <input
                type="email"
                name="mail"
                required
                className="border text-white border-trans-brown focus:border-trans-red rounded px-5 py-2 bg-trans-brown placeholder-trans-text-brown outline-none"
                placeholder="Mail"
                value={data.mail}
                onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
              />

              <textarea
                className="border text-white border-trans-brown focus:border-trans-red rounded px-5 py-2 col-span-2 h-[200px] bg-trans-brown placeholder-trans-text-brown outline-none"
                placeholder="Message"
                name="text"
                required
                value={data.text}
                onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
              />

              <div className="col-span-2">
                <button type="submit" className="block bg-trans-red text-white font-serif rounded mx-auto py-2 px-20">Send</button>
              </div>
            </div>
          </form>


        </motion.div>
      </section>
      <div className="text-center text-xl text-trans-red">All Right Reserved. TC Tours {getYear()}</div>
      <ToastContainer />
    </motion.div >
  );
}

export default IndexPage;