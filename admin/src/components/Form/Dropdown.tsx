import { motion } from 'framer-motion';
import { t } from 'i18next';
import React, { Children, useEffect, useRef, useState } from 'react';

export default function Dropdown(
  {
    label = '',
    className = '',
    text = 'Dropdown',
    children,
    readOnly = false,
  }: {
    label?: string,
    className?: string,
    text?: string,
    children?: React.ReactNode,
    readOnly?: boolean,
  }
) {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {

      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className={'dropdown w-full mb-3 relative ' + className} ref={ref}>
      <div className='mb-2 block font-semibold'>{t(label)}</div>
      <button
        type="button"
        disabled={readOnly}
        className={'bg-gray-100 rounded-lg w-full py-2 px-4 border flex items-center justify-between'}
        onClick={() => setOpen(!open)}
      >
        <span className={readOnly ? 'opacity-[0.5]' : ''}>{text}</span>
        {
          !readOnly &&
          <motion.svg initial={{ rotate: open ? 180 : 0 }} animate={{ rotate: !open ? 0 : 180 }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M1.64645 4.64645C1.84171 4.45118 2.15829 4.45118 2.35355 4.64645L8 10.2929L13.6464 4.64645C13.8417 4.45118 14.1583 4.45118 14.3536 4.64645C14.5488 4.84171 14.5488 5.15829 14.3536 5.35355L8.35355 11.3536C8.15829 11.5488 7.84171 11.5488 7.64645 11.3536L1.64645 5.35355C1.45118 5.15829 1.45118 4.84171 1.64645 4.64645Z" fill="black" />
          </motion.svg>
        }
      </button>

      <motion.div onClick={() => setOpen(false)} initial={{ height: open ? 'auto' : 0 }} animate={{ height: !open ? 0 : 'auto' }} className='dropdown_content overflow-hidden rounded-lg absolute top-20 left-0 w-full'>
        <div className='border rounded-lg'>
          {children}
        </div>
      </motion.div>
    </div>
  );
}


