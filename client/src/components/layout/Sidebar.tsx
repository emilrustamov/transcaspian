import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RouteI } from '../../interfaces/layout/layout';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll'

const api = import.meta.env.VITE_API
import Logo from '../../assets/images/Logo.png'
import { useEffect, useState, useRef } from 'react';

const routes: RouteI[] = [
  {
    link: 'aboutUs',
    linkName: 'About Us',
    icon: <svg className='w-5 lg:w-6 xl:w-7 h-5 lg:h-6 xl:h-7' viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_643_443)">
        <path d="M30 0H0V30H30V0Z" fill="white" fillOpacity="0.01" />
        <path d="M15 12.5C17.4162 12.5 19.375 10.5412 19.375 8.125C19.375 5.70876 17.4162 3.75 15 3.75C12.5838 3.75 10.625 5.70876 10.625 8.125C10.625 10.5412 12.5838 12.5 15 12.5Z" stroke="#C2974A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7.5 4.53418C6.36656 5.32477 5.625 6.63825 5.625 8.125C5.625 9.71644 6.47475 11.1094 7.74525 11.875" stroke="#C2974A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22.5 4.53418C23.6334 5.32477 24.375 6.63825 24.375 8.125C24.375 9.61169 23.6334 10.9253 22.5 11.7158" stroke="#C2974A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7.5 25V26.25H22.5V25C22.5 22.6703 22.5 21.5054 22.1194 20.5866C21.6119 19.3614 20.6386 18.3881 19.4134 17.8806C18.4946 17.5 17.3297 17.5 15 17.5C12.6703 17.5 11.5054 17.5 10.5866 17.8806C9.36144 18.3881 8.38806 19.3614 7.88063 20.5866C7.5 21.5054 7.5 22.6703 7.5 25Z" stroke="#C2974A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M27.5001 26.25V25.5C27.5001 22.6997 27.5001 21.2996 26.9551 20.23C26.4758 19.2892 25.7108 18.5243 24.77 18.0449" stroke="#C2974A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2.5 26.25V25.5C2.5 22.6997 2.5 21.2996 3.04497 20.23C3.52433 19.2892 4.28924 18.5243 5.23004 18.0449" stroke="#C2974A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_643_443">
          <rect width="30" height="30" fill="white" />
        </clipPath>
      </defs>
    </svg>
  },
  {
    link: 'gallery',
    linkName: 'Gallery',
    icon: <svg className='w-4 lg:w-5 xl:w-6 h-4 lg:h-5 xl:h-6' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.5 3H4.5C3.67158 3 3 3.67158 3 4.5V19.5C3 20.3285 3.67158 21 4.5 21H19.5C20.3285 21 21 20.3285 21 19.5V4.5C21 3.67158 20.3285 3 19.5 3Z" stroke="#C2974A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 11.5C10.3807 11.5 11.5 10.3807 11.5 9C11.5 7.6193 10.3807 6.5 9 6.5C7.6193 6.5 6.5 7.6193 6.5 9C6.5 10.3807 7.6193 11.5 9 11.5Z" stroke="#C2974A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 18L15.5 13L10.5 17.5L7 14.5L3 17.5" stroke="#C2974A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  },
  {
    link: 'tripTip',
    linkName: 'Trip tips',
    icon: <svg className='w-4 lg:w-5 xl:w-6 h-4 lg:h-5 xl:h-6' viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.666 8.33379C16.666 9.22252 15.3335 9.22252 15.3335 8.33379C15.3335 7.44505 16.666 7.44505 16.666 8.33379Z" fill="#C2974A" />
      <path d="M14.6661 0.33374L5.3323 2.33374L-0.00146484 0.33374V15.6675L5.3323 17.6675L14.6661 15.6675L19.9998 17.6675V2.33374L14.6661 0.33374ZM11.9998 13.5337L7.99982 14.4V4.46622L11.9998 3.59998V13.5337ZM15.9998 12.3337C15.9998 12.3337 13.9998 9.4675 13.9998 8.33374C13.9998 7.19998 14.8661 6.33374 15.9998 6.33374C17.1336 6.33374 17.9998 7.19998 17.9998 8.33374C17.9998 9.46625 15.9998 12.3337 15.9998 12.3337Z" fill="#C2974A" />
    </svg>

  },
  {
    link: 'useful',
    linkName: 'Useful',
    icon: <svg className='w-5 lg:w-6 xl:w-7 h-5 lg:h-6 xl:h-7' viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.0025 22.7639L14.0027 22.743L15.0025 22.7639ZM10.9975 22.7639L9.99775 22.7848L10.9975 22.7639ZM10.1438 18.6858L9.21957 19.0677L9.21957 19.0677L10.1438 18.6858ZM9.91839 18.2337L9.12816 18.8465L9.91839 18.2337ZM16.0816 18.2337L16.8718 18.8465L16.0816 18.2337ZM18 13C18 14.6366 17.2147 16.0895 15.9962 17.0033L17.1961 18.6034C18.8966 17.3282 20 15.2928 20 13H18ZM13 8C15.7614 8 18 10.2386 18 13H20C20 9.13401 16.866 6 13 6V8ZM8 13C8 10.2386 10.2386 8 13 8V6C9.13401 6 6 9.13401 6 13H8ZM10.0038 17.0033C8.78526 16.0895 8 14.6366 8 13H6C6 15.2928 7.1034 17.3282 8.80393 18.6034L10.0038 17.0033ZM11.9973 22.743C11.9654 21.2148 11.6489 19.7097 11.068 18.3039L9.21957 19.0677C9.70598 20.2449 9.97101 21.5051 9.99775 22.7848L11.9973 22.743ZM14.3416 22.2111C13.4971 22.6334 12.5029 22.6334 11.6584 22.2111L10.7639 24C12.1716 24.7038 13.8284 24.7038 15.2361 24L14.3416 22.2111ZM14.932 18.3039C14.3511 19.7097 14.0346 21.2148 14.0027 22.743L16.0022 22.7848C16.029 21.5051 16.294 20.2449 16.7804 19.0677L14.932 18.3039ZM15.2361 24C15.708 23.764 15.9917 23.2888 16.0022 22.7848L14.0027 22.743C14.0072 22.5284 14.1285 22.3177 14.3416 22.2111L15.2361 24ZM9.99775 22.7848C10.0083 23.2888 10.292 23.764 10.7639 24L11.6584 22.2111C11.8715 22.3177 11.9928 22.5284 11.9973 22.743L9.99775 22.7848ZM8.80393 18.6034C8.95483 18.7165 9.04298 18.7829 9.10525 18.8338C9.16783 18.885 9.15598 18.8824 9.12816 18.8465L10.7086 17.6209C10.5215 17.3795 10.2307 17.1734 10.0038 17.0033L8.80393 18.6034ZM11.068 18.3039C10.9896 18.1144 10.8913 17.8565 10.7086 17.6209L9.12816 18.8465C9.11465 18.8291 9.11215 18.8197 9.12521 18.8469C9.13306 18.8632 9.14391 18.8872 9.1602 18.9253C9.17665 18.9639 9.19514 19.0086 9.21957 19.0677L11.068 18.3039ZM15.9962 17.0033C15.7693 17.1734 15.4785 17.3795 15.2914 17.6209L16.8718 18.8465C16.844 18.8824 16.8322 18.885 16.8948 18.8338C16.957 18.7829 17.0452 18.7165 17.1961 18.6034L15.9962 17.0033ZM16.7804 19.0677C16.8049 19.0086 16.8233 18.9639 16.8398 18.9253C16.8561 18.8872 16.8669 18.8632 16.8748 18.8469C16.8879 18.8197 16.8853 18.8291 16.8718 18.8465L15.2914 17.6209C15.1087 17.8565 15.0104 18.1144 14.932 18.3039L16.7804 19.0677Z" fill="#C2974A" />
      <path d="M15.992 19V19C14.181 20.2106 11.8189 20.2106 10.0078 19V19" stroke="#C2974A" strokeWidth="2" />
      <path d="M13.5652 4.87805V-4.76837e-07M7.91304 6.82927L4.52174 2.92683M21.4783 12.6829H26M19.2174 6.82927L22.6087 3.90244M0 12.6829H4.52174M19.7826 17.561L22.6087 20M6.78261 17.561L3.3913 20" stroke="#C2974A" strokeWidth="1.5" />
    </svg>

  },
  {
    link: 'contact',
    linkName: 'Contact',
    icon: <svg className='w-4 lg:w-5 xl:w-6 h-4 lg:h-5 xl:h-6' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_643_454)">
        <path d="M24 0H0V24H24V0Z" fill="white" fillOpacity="0.01" />
        <path d="M2 19.5H22V12V4.5H12H2V12V19.5Z" stroke="#C2974A" strokeWidth="2" strokeLinejoin="round" />
        <path d="M2 4.5L12 12L22 4.5" stroke="#C2974A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_643_454">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>

  },
]

function Sidebar() {
  const { pathname, hash }: { pathname: string, hash: string } = useLocation();
  const [open, setOpen] = useState(false);
  const [play, setPlay] = useState(true);
  const audioRef = useRef<any>();
  const navigate = useNavigate();

  const pause = () => {
    setPlay(false);
    audioRef.current.pause();
  }

  const notPause = () => {
    setPlay(true);
    audioRef.current.play();
  }

  useEffect(() => {
    if (hash) {
      const a = document.createElement('a');
      a.setAttribute('href', hash)
      a.click();
    } else {
      window.scrollY = 0
    }
  }, [hash])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='sidebar sticky z-[10] top-[20px] md:top-[-80px] lg:top-[30px] xl:top-[50px] left-0'>
      <div className="sidebar_left float-left flex flex-col items-center">
        {
          pathname === '/' ?
            <ScrollLink to={'top'} onClick={() => navigate('/#top')} className='cursor-pointer md:mb-[14px] xl:mb-[20px]'>
              <img src={Logo} alt="" className='h-[60px] md:h-[80px] xl:h-[80px] w-[45px] md:w-[60px] xl:w-[60px]' />
            </ScrollLink> :
            <Link to={api + '/#top'} className='cursor-pointer md:mb-[14px] xl:mb-[20px]'>
              <img src={Logo} alt="" className='h-[60px] md:h-[80px] xl:h-[80px] w-[45px] md:w-[60px] xl:w-[60px]' />
            </Link>
        }
        <div className="hidden overflow-hidden sidebar_left_routes w-fit backdrop-blur-lg border border-trans-brown py-1 xl:py-2 rounded-lg lg:rounded-xl md:flex flex-col items-center">
          {routes.map((route: RouteI, index: number) => {
            if (pathname !== '/') {
              return (
                <Link to={api + '/#' + route.link!} key={index} className={'flex flex-col items-center w-full hover:bg-trans-light-gray px-2 xl:px-3 py-1 mb-2' + ('/' + pathname.split('/')[1] === route.link && 'bg-gray-200')}>
                  {route.icon}
                  <span className='mt-1 text-trans-brown text-sm lg:text-base'>{route.linkName as string}</span>
                </Link>
              )
            } else {
              return <ScrollLink onClick={() => navigate(api + '/#' + route.link)} to={route.link!} key={index} className={'flex cursor-pointer flex-col items-center w-full hover:bg-trans-light-gray px-2 xl:px-3 py-1 mb-2' + ('/' + pathname.split('/')[1] === route.link && 'bg-gray-200')}>
                {route.icon}
                <span className='mt-1 text-trans-brown text-sm lg:text-base'>{route.linkName as string}</span>
              </ScrollLink>
            }
          }
          )}
          <div className="sidebar_left_socials">
            <Link target='_blank' to={'https://www.instagram.com/silk.road.tours?igsh=MjRmeDZ1eXcxNHI1'} className='block mt-2'>
              <svg className='w-4 lg:w-5 xl:w-6 h-4 lg:h-5 xl:h-6' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_643_456)">
                  <g filter="url(#filter0_d_643_456)">
                    <path d="M24 0H0V24H24V0Z" fill="white" fillOpacity="0.01" shapeRendering="crispEdges" />
                  </g>
                  <path d="M17 3H7C4.79086 3 3 4.79086 3 7V17C3 19.2092 4.79086 21 7 21H17C19.2092 21 21 19.2092 21 17V7C21 4.79086 19.2092 3 17 3Z" stroke="#C2974A" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M12 16C14.2092 16 16 14.2092 16 12C16 9.79085 14.2092 8 12 8C9.79085 8 8 9.79085 8 12C8 14.2092 9.79085 16 12 16Z" stroke="#C2974A" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M17.5 7.5C18.0523 7.5 18.5 7.0523 18.5 6.5C18.5 5.9477 18.0523 5.5 17.5 5.5C16.9477 5.5 16.5 5.9477 16.5 6.5C16.5 7.0523 16.9477 7.5 17.5 7.5Z" fill="#C2974A" />
                </g>
                <defs>
                  <filter id="filter0_d_643_456" x="-4" y="0" width="32" height="32" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_643_456" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_643_456" result="shape" />
                  </filter>
                  <clipPath id="clip0_643_456">
                    <rect className='w-6 h-6' fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>
          </div>
          <button>
            {
              play ?
                <svg onClick={pause} className='fill-trans-brown h-6 lg:h-7 w-6 lg:w-7 mt-3' viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.5355 14.0104C13.0737 12.4722 14.0251 10.3472 14.0251 8.00003C14.0251 5.65282 13.0737 3.52782 11.5355 1.98962L10.8284 2.69673C12.1857 4.05396 13.0251 5.92896 13.0251 8.00003C13.0251 10.0711 12.1857 11.9461 10.8284 13.3033L11.5355 14.0104Z" />
                  <path d="M10.1213 12.5962C11.2976 11.42 12.0251 9.79496 12.0251 8.00003C12.0251 6.20511 11.2976 4.58011 10.1213 3.40384L9.41421 4.11094C10.4095 5.10625 11.0251 6.48125 11.0251 8.00003C11.0251 9.51882 10.4095 10.8938 9.41421 11.8891L10.1213 12.5962Z" />
                  <path d="M10.0251 8.00003C10.0251 9.24267 9.52145 10.3677 8.70711 11.182L8 10.4749C8.63338 9.84153 9.02513 8.96653 9.02513 8.00003C9.02513 7.03353 8.63338 6.15853 8 5.52516L8.70711 4.81805C9.52145 5.63239 10.0251 6.75739 10.0251 8.00003Z" />
                  <path d="M7 4C7 3.8078 6.88983 3.63261 6.71659 3.54935C6.54336 3.46609 6.33774 3.4895 6.18765 3.60957L3.82461 5.5H1.5C1.22386 5.5 1 5.72386 1 6V10C1 10.2761 1.22386 10.5 1.5 10.5H3.82461L6.18765 12.3904C6.33774 12.5105 6.54336 12.5339 6.71659 12.4507C6.88983 12.3674 7 12.1922 7 12V4ZM4.31235 6.39044L6 5.04032V10.9597L4.31235 9.60957C4.22369 9.53865 4.11354 9.5 4 9.5H2V6.5H4C4.11354 6.5 4.22369 6.46136 4.31235 6.39044Z" />
                </svg> :
                <svg onClick={notPause} className="fill-trans-brown h-6 lg:h-7 w-6 lg:h-7 mt-3" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.71659 3.54935C6.88983 3.63261 7 3.8078 7 4V12C7 12.1922 6.88983 12.3674 6.71659 12.4507C6.54336 12.5339 6.33774 12.5105 6.18765 12.3904L3.82461 10.5H1.5C1.22386 10.5 1 10.2761 1 10V6C1 5.72386 1.22386 5.5 1.5 5.5H3.82461L6.18765 3.60957C6.33774 3.4895 6.54336 3.46609 6.71659 3.54935ZM6 5.04032L4.31235 6.39044C4.22369 6.46136 4.11354 6.5 4 6.5H2V9.5H4C4.11354 9.5 4.22369 9.53865 4.31235 9.60957L6 10.9597V5.04032Z" />
                  <path d="M13.8536 5.64645C14.0488 5.84171 14.0488 6.15829 13.8536 6.35355L12.2071 8L13.8536 9.64645C14.0488 9.84171 14.0488 10.1583 13.8536 10.3536C13.6583 10.5488 13.3417 10.5488 13.1464 10.3536L11.5 8.70711L9.85355 10.3536C9.65829 10.5488 9.34171 10.5488 9.14645 10.3536C8.95118 10.1583 8.95118 9.84171 9.14645 9.64645L10.7929 8L9.14645 6.35355C8.95118 6.15829 8.95118 5.84171 9.14645 5.64645C9.34171 5.45118 9.65829 5.45118 9.85355 5.64645L11.5 7.29289L13.1464 5.64645C13.3417 5.45118 13.6583 5.45118 13.8536 5.64645Z" />
                </svg>
            }
          </button>

        </div>

        <div className='mobileMenu md:hidden fixed right-6 bottom-10 flex flex-col items-center'>
          <motion.div initial={{ height: '0', borderWidth: '0' }} animate={{ height: open ? 'auto' : '0', borderWidth: open ? '1px' : '0' }} className="sidebar_left_routes border-trans-brown mb-3 rounded-2xl overflow-hidden w-fit backdrop-blur-lg flex flex-col items-center">
            <div className='py-3 rounded-2xl flex flex-col items-center'>
              {routes.map((route: RouteI, index: number) => {
                return (
                  <Link to={api + '/#' + route.link!} key={index} className={'flex flex-col items-center w-full hover:bg-trans-light-gray px-3 xl:px-5 py-1 mb-1 xl:mb-2 ' + ('/' + pathname.split('/')[1] === route.link && 'bg-gray-200')}>
                    {route.icon}
                    <span className='mt-1 text-trans-brown text-sm lg:text-base'>{route.linkName as string}</span>
                  </Link>
                )
              }
              )}
              <div className="sidebar_left_socials">
                <Link target='_blank' to={'https://www.instagram.com/silk.road.tours?igsh=MjRmeDZ1eXcxNHI1'} className='block mt-4 lg:mt-6'>
                  <svg className='w-5 lg:w-6 h-5 lg:h-6' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_643_456)">
                      <g filter="url(#filter0_d_643_456)">
                        <path d="M24 0H0V24H24V0Z" fill="white" fillOpacity="0.01" shapeRendering="crispEdges" />
                      </g>
                      <path d="M17 3H7C4.79086 3 3 4.79086 3 7V17C3 19.2092 4.79086 21 7 21H17C19.2092 21 21 19.2092 21 17V7C21 4.79086 19.2092 3 17 3Z" stroke="#C2974A" strokeWidth="2" strokeLinejoin="round" />
                      <path d="M12 16C14.2092 16 16 14.2092 16 12C16 9.79085 14.2092 8 12 8C9.79085 8 8 9.79085 8 12C8 14.2092 9.79085 16 12 16Z" stroke="#C2974A" strokeWidth="2" strokeLinejoin="round" />
                      <path d="M17.5 7.5C18.0523 7.5 18.5 7.0523 18.5 6.5C18.5 5.9477 18.0523 5.5 17.5 5.5C16.9477 5.5 16.5 5.9477 16.5 6.5C16.5 7.0523 16.9477 7.5 17.5 7.5Z" fill="#C2974A" />
                    </g>
                    <defs>
                      <filter id="filter0_d_643_456" x="-4" y="0" width="32" height="32" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_643_456" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_643_456" result="shape" />
                      </filter>
                      <clipPath id="clip0_643_456">
                        <rect className='w-6 h-6' fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
              </div>
              <button onClick={() => (setPlay(!play), play ? audioRef!.current!.pause() : audioRef!.current!.play())}>
                {
                  play ?
                    <svg className='fill-trans-brown h-7 w-7 mt-6' viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.5355 14.0104C13.0737 12.4722 14.0251 10.3472 14.0251 8.00003C14.0251 5.65282 13.0737 3.52782 11.5355 1.98962L10.8284 2.69673C12.1857 4.05396 13.0251 5.92896 13.0251 8.00003C13.0251 10.0711 12.1857 11.9461 10.8284 13.3033L11.5355 14.0104Z" />
                      <path d="M10.1213 12.5962C11.2976 11.42 12.0251 9.79496 12.0251 8.00003C12.0251 6.20511 11.2976 4.58011 10.1213 3.40384L9.41421 4.11094C10.4095 5.10625 11.0251 6.48125 11.0251 8.00003C11.0251 9.51882 10.4095 10.8938 9.41421 11.8891L10.1213 12.5962Z" />
                      <path d="M10.0251 8.00003C10.0251 9.24267 9.52145 10.3677 8.70711 11.182L8 10.4749C8.63338 9.84153 9.02513 8.96653 9.02513 8.00003C9.02513 7.03353 8.63338 6.15853 8 5.52516L8.70711 4.81805C9.52145 5.63239 10.0251 6.75739 10.0251 8.00003Z" />
                      <path d="M7 4C7 3.8078 6.88983 3.63261 6.71659 3.54935C6.54336 3.46609 6.33774 3.4895 6.18765 3.60957L3.82461 5.5H1.5C1.22386 5.5 1 5.72386 1 6V10C1 10.2761 1.22386 10.5 1.5 10.5H3.82461L6.18765 12.3904C6.33774 12.5105 6.54336 12.5339 6.71659 12.4507C6.88983 12.3674 7 12.1922 7 12V4ZM4.31235 6.39044L6 5.04032V10.9597L4.31235 9.60957C4.22369 9.53865 4.11354 9.5 4 9.5H2V6.5H4C4.11354 6.5 4.22369 6.46136 4.31235 6.39044Z" />
                    </svg> :
                    <svg className="fill-trans-brown h-7 w-7 mt-6" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.71659 3.54935C6.88983 3.63261 7 3.8078 7 4V12C7 12.1922 6.88983 12.3674 6.71659 12.4507C6.54336 12.5339 6.33774 12.5105 6.18765 12.3904L3.82461 10.5H1.5C1.22386 10.5 1 10.2761 1 10V6C1 5.72386 1.22386 5.5 1.5 5.5H3.82461L6.18765 3.60957C6.33774 3.4895 6.54336 3.46609 6.71659 3.54935ZM6 5.04032L4.31235 6.39044C4.22369 6.46136 4.11354 6.5 4 6.5H2V9.5H4C4.11354 9.5 4.22369 9.53865 4.31235 9.60957L6 10.9597V5.04032Z" />
                      <path d="M13.8536 5.64645C14.0488 5.84171 14.0488 6.15829 13.8536 6.35355L12.2071 8L13.8536 9.64645C14.0488 9.84171 14.0488 10.1583 13.8536 10.3536C13.6583 10.5488 13.3417 10.5488 13.1464 10.3536L11.5 8.70711L9.85355 10.3536C9.65829 10.5488 9.34171 10.5488 9.14645 10.3536C8.95118 10.1583 8.95118 9.84171 9.14645 9.64645L10.7929 8L9.14645 6.35355C8.95118 6.15829 8.95118 5.84171 9.14645 5.64645C9.34171 5.45118 9.65829 5.45118 9.85355 5.64645L11.5 7.29289L13.1464 5.64645C13.3417 5.45118 13.6583 5.45118 13.8536 5.64645Z" />
                    </svg>
                }
              </button>
            </div>
          </motion.div>
          <button className={"menu bg-white hover:bg-gray-100 rounded-full p-1 shadow-3xl " + (open ? 'opened' : '')} onClick={() => { setOpen(!open) }} aria-label="Main Menu">
            <svg width="40" height="40" viewBox="0 0 100 100">
              <path className="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
              <path className="line line2" d="M 20,50 H 80" />
              <path className="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
            </svg>
          </button>
        </div>
      </div>
      <audio
        loop
        autoPlay
        ref={audioRef} src={import.meta.env.VITE_URL + '/image/audio.mp3'}
      >
      </audio>
    </motion.div>
  );
}

export default Sidebar;
