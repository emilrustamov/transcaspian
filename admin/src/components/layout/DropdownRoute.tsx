import React, { useState, useEffect } from 'react';
import { RouteI } from '../../interfaces/layout/layout';
import { Link } from 'react-router-dom';
import { t } from 'i18next';

const api = import.meta.env.VITE_API;

function DropdownRoute({ route, pathname }: { route: RouteI, pathname: string }) {
  const [open, setOpen] = useState<boolean>(pathname.split('/')[1] === route.dropdown![0].link.split('/')[1]);
  useEffect(() => {
    setOpen(pathname.split('/')[2] === route.dropdown![0].link.split('/')[1])
  }, [pathname]);

  return (
    <button className='dropdown w-full mb-3' onClick={() => setOpen(!open)}>
      <div className={'flex items-center justify-between w-full hover:bg-gray-200 rounded-lg px-5 py-3 mb-3 cursor-pointer ' + (pathname.split('/')[2] === route.dropdown![0].link.split('/')[1] ? 'bg-gray-200' : '')}>
        <div className='flex items-center'>
          {route.icon}
          <span className='ml-5'>{route.dropdownName}</span>
        </div>
        <svg className={'transition ' + (open ? 'rotate-90' : 'rotate-0')} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M4.64645 1.64645C4.84171 1.45118 5.15829 1.45118 5.35355 1.64645L11.3536 7.64645C11.5488 7.84171 11.5488 8.15829 11.3536 8.35355L5.35355 14.3536C5.15829 14.5488 4.84171 14.5488 4.64645 14.3536C4.45118 14.1583 4.45118 13.8417 4.64645 13.6464L10.2929 8L4.64645 2.35355C4.45118 2.15829 4.45118 1.84171 4.64645 1.64645Z" fill="black" />
        </svg>
      </div>
      <div className={'dropdown_content -mt-3 ml-3 overflow-hidden transition-[height]'} style={{ height: open ? `${route.dropdown!.length * 48 + 4}px` : 0 }}>
        {
          route.dropdown && route.dropdown.map((link, index) => (
            <Link to={api + link.link} key={index} className={'flex items-center text-sm w-full hover:bg-gray-200 rounded-lg px-5 py-3 mt-1 ' + (pathname.split('/')[3] === link.link.split('/')[2] ? 'bg-gray-200' : '')}>
              <span className='w-3 h-[2px] bg-black mr-3'></span>
              {link.linkName}
            </Link>
          ))
        }
      </div>
    </button>
  );
}

export default DropdownRoute;
