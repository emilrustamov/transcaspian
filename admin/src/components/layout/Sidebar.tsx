import { Suspense } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Header from './Header';
import Loading from './Loading';
import DropdownRoute from './DropdownRoute';
import { RouteI } from '../../interfaces/layout/layout';

const api = import.meta.env.VITE_API


const routes: RouteI[] = [
  {
    link: '/',
    linkName: 'Dashboard',
    icon: <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.9846 8.50001H8.20711L2.70769 13.9994C4.11804 15.2445 5.97079 16 8 16C12.2504 16 15.7265 12.6854 15.9846 8.50001Z" fill="black" />
      <path d="M2.00058 13.2923C0.755509 11.882 0 10.0292 0 8.00001C0 3.74966 3.31464 0.273479 7.5 0.0153809V7.7929L2.00058 13.2923Z" fill="black" />
      <path d="M8.5 0.0153809V7.50001H15.9846C15.7367 3.48 12.52 0.263282 8.5 0.0153809Z" fill="black" />
    </svg>,
  },
  {
    dropdownName: 'Map',
    icon: <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M15.817 0.113333C15.9328 0.208303 16 0.350208 16 0.500004V14.5C16 14.7383 15.8318 14.9436 15.5981 14.9903L10.5981 15.9903C10.5333 16.0032 10.4667 16.0032 10.4019 15.9903L5.5 15.0099L0.598058 15.9903C0.45117 16.0197 0.29885 15.9816 0.183006 15.8867C0.0671615 15.7917 0 15.6498 0 15.5V1.5C0 1.26166 0.16823 1.05646 0.401942 1.00971L5.40194 0.00971396C5.46667 -0.00323223 5.53333 -0.00323223 5.59806 0.00971396L10.5 0.990102L15.4019 0.00971396C15.5488 -0.0196636 15.7012 0.0183639 15.817 0.113333ZM10 1.90991L6 1.10991V14.0901L10 14.8901V1.90991ZM11 14.8901L15 14.0901V1.10991L11 1.90991V14.8901ZM5 14.0901V1.10991L1 1.90991V14.8901L5 14.0901Z" fill="black" />
    </svg>
    ,
    dropdown: [
      {
        link: '/Map/Yangykala_Canyons',
        linkName: 'Yangykala Canyons',
      },
      {
        link: '/Map/Darvaza_Gas_Crater',
        linkName: 'Darvaza Gas Crater',
      },
      {
        link: '/Map/Old_Nisa',
        linkName: 'Old Nisa',
      },
      {
        link: '/Map/Ashgabat',
        linkName: 'Ashgabat',
      },
      {
        link: '/Map/Gonur_Depe',
        linkName: 'Gonur Depe',
      },
      {
        link: '/Map/Ancient_Merv',
        linkName: 'Ancient Merv',
      },
      {
        link: '/Map/Dinosaur_Plateau',
        linkName: 'Dinosaur Plateau',
      },
      {
        link: '/Map/Koneurgench',
        linkName: 'Koneurgench',
      },
    ],
  },
  {
    link: '/AboutUs',
    linkName: 'About us',
    icon: <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_297_429)">
        <path d="M30 0H0V30H30V0Z" fill="white" fillOpacity="0.01" />
        <path d="M15 12.5C17.4162 12.5 19.375 10.5412 19.375 8.125C19.375 5.70876 17.4162 3.75 15 3.75C12.5838 3.75 10.625 5.70876 10.625 8.125C10.625 10.5412 12.5838 12.5 15 12.5Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7.5 4.53418C6.36656 5.32477 5.625 6.63825 5.625 8.125C5.625 9.71644 6.47475 11.1094 7.74525 11.875" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22.5 4.53418C23.6334 5.32477 24.375 6.63825 24.375 8.125C24.375 9.61169 23.6334 10.9253 22.5 11.7158" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7.5 25V26.25H22.5V25C22.5 22.6703 22.5 21.5054 22.1194 20.5866C21.6119 19.3614 20.6386 18.3881 19.4134 17.8806C18.4946 17.5 17.3297 17.5 15 17.5C12.6703 17.5 11.5054 17.5 10.5866 17.8806C9.36144 18.3881 8.38806 19.3614 7.88063 20.5866C7.5 21.5054 7.5 22.6703 7.5 25Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M27.5 26.25V25.5C27.5 22.6997 27.5 21.2996 26.955 20.23C26.4756 19.2892 25.7107 18.5243 24.7699 18.0449" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2.50006 26.25V25.5C2.50006 22.6997 2.50006 21.2996 3.04503 20.23C3.52439 19.2892 4.2893 18.5243 5.2301 18.0449" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_297_429">
          <rect width="30" height="30" fill="white" />
        </clipPath>
      </defs>
    </svg>
    ,
  },
  {
    link: '/Gallery',
    linkName: 'Gallery',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.5 3H4.5C3.67158 3 3 3.67158 3 4.5V19.5C3 20.3285 3.67158 21 4.5 21H19.5C20.3285 21 21 20.3285 21 19.5V4.5C21 3.67158 20.3285 3 19.5 3Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 11.5C10.3807 11.5 11.5 10.3807 11.5 9C11.5 7.6193 10.3807 6.5 9 6.5C7.6193 6.5 6.5 7.6193 6.5 9C6.5 10.3807 7.6193 11.5 9 11.5Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 18L15.5 13L10.5 17.5L7 14.5L3 17.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
  },
  {
    link: '/Trip-tips',
    linkName: 'Trip-tips',
    icon: <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 16C8 16 14 10.3137 14 6C14 2.68629 11.3137 0 8 0C4.68629 0 2 2.68629 2 6C2 10.3137 8 16 8 16ZM8 9C6.34315 9 5 7.65685 5 6C5 4.34315 6.34315 3 8 3C9.65685 3 11 4.34315 11 6C11 7.65685 9.65685 9 8 9Z" fill="black" />
    </svg>
  },
  {
    link: '/Useful',
    linkName: 'Useful',
    icon: <svg width="24" height="24" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.1438 18.6858L9.21957 19.0677L10.1438 18.6858ZM9.91839 18.2337L9.12816 18.8465L9.91839 18.2337ZM16.0816 18.2337L16.8718 18.8465L16.0816 18.2337ZM18 13C18 14.6366 17.2147 16.0895 15.9962 17.0033L17.1961 18.6034C18.8966 17.3282 20 15.2928 20 13H18ZM13 8C15.7614 8 18 10.2386 18 13H20C20 9.13401 16.866 6 13 6V8ZM8 13C8 10.2386 10.2386 8 13 8V6C9.13401 6 6 9.13401 6 13H8ZM10.0038 17.0033C8.78526 16.0895 8 14.6366 8 13H6C6 15.2928 7.1034 17.3282 8.80393 18.6034L10.0038 17.0033ZM11.9973 22.743C11.9654 21.2148 11.6489 19.7097 11.068 18.3039L9.21957 19.0677C9.70598 20.2449 9.97101 21.5051 9.99775 22.7848L11.9973 22.743ZM14.3416 22.2111C13.4971 22.6334 12.5029 22.6334 11.6584 22.2111L10.7639 24C12.1716 24.7038 13.8284 24.7038 15.2361 24L14.3416 22.2111ZM14.932 18.3039C14.3511 19.7097 14.0346 21.2148 14.0027 22.743L16.0022 22.7848C16.029 21.5051 16.294 20.2449 16.7804 19.0677L14.932 18.3039ZM15.2361 24C15.708 23.764 15.9917 23.2888 16.0022 22.7848L14.0027 22.743C14.0072 22.5284 14.1285 22.3177 14.3416 22.2111L15.2361 24ZM9.99775 22.7848C10.0083 23.2888 10.292 23.764 10.7639 24L11.6584 22.2111C11.8715 22.3177 11.9928 22.5284 11.9973 22.743L9.99775 22.7848ZM8.80393 18.6034C8.95483 18.7165 9.04298 18.7829 9.10525 18.8338C9.16783 18.885 9.15598 18.8824 9.12816 18.8465L10.7086 17.6209C10.5215 17.3795 10.2307 17.1734 10.0038 17.0033L8.80393 18.6034ZM11.068 18.3039C10.9896 18.1144 10.8913 17.8565 10.7086 17.6209L9.12816 18.8465C9.11465 18.8291 9.11215 18.8197 9.12521 18.8469C9.13306 18.8632 9.14391 18.8872 9.1602 18.9253C9.17665 18.9639 9.19514 19.0086 9.21957 19.0677L11.068 18.3039ZM15.9962 17.0033C15.7693 17.1734 15.4785 17.3795 15.2914 17.6209L16.8718 18.8465C16.844 18.8824 16.8322 18.885 16.8948 18.8338C16.957 18.7829 17.0452 18.7165 17.1961 18.6034L15.9962 17.0033ZM16.7804 19.0677C16.8049 19.0086 16.8233 18.9639 16.8398 18.9253C16.8561 18.8872 16.8669 18.8632 16.8748 18.8469C16.8879 18.8197 16.8853 18.8291 16.8718 18.8465L15.2914 17.6209C15.1087 17.8565 15.0104 18.1144 14.932 18.3039L16.7804 19.0677Z" fill="black" />
      <path d="M15.9923 19V19C14.1812 20.2106 11.8191 20.2106 10.0081 19V19" stroke="black" strokeWidth="2" />
      <path d="M13.5652 4.87805V-4.76837e-07M7.91304 6.82927L4.52174 2.92683M21.4783 12.6829H26M19.2174 6.82927L22.6087 3.90244M0 12.6829H4.52174M19.7826 17.561L22.6087 20M6.78261 17.561L3.3913 20" stroke="black" strokeWidth="1.5" />
    </svg>
  },
  {
    link: '/Mails',
    linkName: 'Mails',
    icon: <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 4C0 2.89543 0.895431 2 2 2H14C15.1046 2 16 2.89543 16 4V12C16 13.1046 15.1046 14 14 14H2C0.895431 14 0 13.1046 0 12V4ZM2 3C1.44772 3 1 3.44772 1 4V4.2169L8 8.4169L15 4.2169V4C15 3.44772 14.5523 3 14 3H2ZM15 5.3831L10.2919 8.20794L15 11.1052V5.3831ZM14.9662 12.2586L9.32583 8.7876L8 9.5831L6.67417 8.7876L1.03376 12.2586C1.14774 12.6855 1.53715 13 2 13H14C14.4628 13 14.8523 12.6855 14.9662 12.2586ZM1 11.1052L5.70808 8.20794L1 5.3831V11.1052Z" fill="black" />
    </svg>
  },
]



function Sidebar() {
  const { pathname }: { pathname: string } = useLocation();

  return (
    <div className='sidebar'>
      <div className="sidebar_left w-[250px] bg-gray-100 border-r border-gray-300 h-screen fixed p-5">
        <div className="sidebar_left_title font-bold text-2xl mb-10">Admin panel</div>

        <div className="sidebar_left_routes overflow-y-auto h-[calc(100%-60px)]">
          {routes.map((route: RouteI, index: number) => {
            if (!route.dropdown) {
              return (
                <Link to={api + route.link} key={index} className={'flex items-center w-full hover:bg-gray-200 rounded-lg px-5 py-3 mb-3 ' + ('/' + pathname.split('/')[2] === route.link && 'bg-gray-200')}>
                  {route.icon}
                  <span className='ml-5'>{route.linkName as string}</span>
                </Link>
              )
            } else {
              return (
                <DropdownRoute key={index} route={route} pathname={pathname} />
              )
            }
          }
          )}
        </div>
      </div>

      <div className="sidebar_right ml-[250px] px-5 w-[calc(100%-250px)]">
        <Header />

        <div className='mt-8'>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
