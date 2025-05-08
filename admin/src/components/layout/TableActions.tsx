import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { calcLength, motion } from 'framer-motion';

const api = import.meta.env.VITE_API

function TableActions(
  {
    link = '',
    id = '',
    page = false,
    show = false,
    edit = true,
    children,
    editData,
    setOpenEdit = () => { },
    setDeleteId = () => { },
    setEditData = () => { },
    setOpenShow = () => { },
    setOpen = () => { },
  }: {
    link?: string,
    id: number | string,
    show?: boolean,
    editData?: any,
    page?: boolean,
    children?: ReactNode,
    edit?: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenShow?: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenEdit?: React.Dispatch<React.SetStateAction<boolean>>;
    setEditData?: React.Dispatch<React.SetStateAction<any>>;
    setDeleteId?: React.Dispatch<React.SetStateAction<number | undefined>>;
  }
) {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {

      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='flex items-center'>
      {
        edit &&
        <button type='button' onClick={() => (page ? navigate(api + link + '/edit/' + id) : (setEditData(editData), setOpenEdit(true)))} className='mx-1 p-2 hover:bg-blue-100 rounded-full'>
          <svg className='fill-green-600' width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.1465 0.146447C12.3417 -0.0488155 12.6583 -0.0488155 12.8536 0.146447L15.8536 3.14645C16.0488 3.34171 16.0488 3.65829 15.8536 3.85355L5.85357 13.8536C5.80569 13.9014 5.74858 13.9391 5.68571 13.9642L0.68571 15.9642C0.500001 16.0385 0.287892 15.995 0.146461 15.8536C0.00502989 15.7121 -0.0385071 15.5 0.0357762 15.3143L2.03578 10.3143C2.06092 10.2514 2.09858 10.1943 2.14646 10.1464L12.1465 0.146447ZM11.2071 2.5L13.5 4.79289L14.7929 3.5L12.5 1.20711L11.2071 2.5ZM12.7929 5.5L10.5 3.20711L4.00001 9.70711V10H4.50001C4.77616 10 5.00001 10.2239 5.00001 10.5V11H5.50001C5.77616 11 6.00001 11.2239 6.00001 11.5V12H6.29291L12.7929 5.5ZM3.03167 10.6755L2.92614 10.781L1.39754 14.6025L5.21903 13.0739L5.32456 12.9683C5.13496 12.8973 5.00001 12.7144 5.00001 12.5V12H4.50001C4.22387 12 4.00001 11.7761 4.00001 11.5V11H3.50001C3.28561 11 3.10272 10.865 3.03167 10.6755Z" />
          </svg>
        </button>
      }
      {
        show &&
        <button onClick={() => (page ? navigate(api + link + '/show/' + id) : (setEditData(editData), setOpenShow(true)))} className='mx-1 p-2 hover:bg-blue-100 rounded-full'>
          <svg className='fill-orange-600' width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 8C16 8 13 2.5 8 2.5C3 2.5 0 8 0 8C0 8 3 13.5 8 13.5C13 13.5 16 8 16 8ZM1.1727 8C1.22963 7.91321 1.29454 7.81677 1.36727 7.71242C1.70216 7.23193 2.19631 6.5929 2.83211 5.95711C4.12103 4.66818 5.88062 3.5 8 3.5C10.1194 3.5 11.879 4.66818 13.1679 5.95711C13.8037 6.5929 14.2978 7.23193 14.6327 7.71242C14.7055 7.81677 14.7704 7.91321 14.8273 8C14.7704 8.08679 14.7055 8.18323 14.6327 8.28758C14.2978 8.76807 13.8037 9.4071 13.1679 10.0429C11.879 11.3318 10.1194 12.5 8 12.5C5.88062 12.5 4.12103 11.3318 2.83211 10.0429C2.19631 9.4071 1.70216 8.76807 1.36727 8.28758C1.29454 8.18323 1.22963 8.08679 1.1727 8Z" />
            <path d="M8 5.5C6.61929 5.5 5.5 6.61929 5.5 8C5.5 9.38071 6.61929 10.5 8 10.5C9.38071 10.5 10.5 9.38071 10.5 8C10.5 6.61929 9.38071 5.5 8 5.5ZM4.5 8C4.5 6.067 6.067 4.5 8 4.5C9.933 4.5 11.5 6.067 11.5 8C11.5 9.933 9.933 11.5 8 11.5C6.067 11.5 4.5 9.933 4.5 8Z" />
          </svg>
        </button>
      }
      <button onClick={() => (setOpen(true), setDeleteId(id as number))} className='mx-1 p-2 hover:bg-blue-100 rounded-full'>
        <svg className='fill-red-600' width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.5 5.5C5.77614 5.5 6 5.72386 6 6V12C6 12.2761 5.77614 12.5 5.5 12.5C5.22386 12.5 5 12.2761 5 12V6C5 5.72386 5.22386 5.5 5.5 5.5Z" />
          <path d="M8 5.5C8.27614 5.5 8.5 5.72386 8.5 6V12C8.5 12.2761 8.27614 12.5 8 12.5C7.72386 12.5 7.5 12.2761 7.5 12V6C7.5 5.72386 7.72386 5.5 8 5.5Z" />
          <path d="M11 6C11 5.72386 10.7761 5.5 10.5 5.5C10.2239 5.5 10 5.72386 10 6V12C10 12.2761 10.2239 12.5 10.5 12.5C10.7761 12.5 11 12.2761 11 12V6Z" />
          <path fillRule="evenodd" clipRule="evenodd" d="M14.5 3C14.5 3.55228 14.0523 4 13.5 4H13V13C13 14.1046 12.1046 15 11 15H5C3.89543 15 3 14.1046 3 13V4H2.5C1.94772 4 1.5 3.55228 1.5 3V2C1.5 1.44772 1.94772 1 2.5 1H6C6 0.447715 6.44772 0 7 0H9C9.55229 0 10 0.447715 10 1H13.5C14.0523 1 14.5 1.44772 14.5 2V3ZM4.11803 4L4 4.05902V13C4 13.5523 4.44772 14 5 14H11C11.5523 14 12 13.5523 12 13V4.05902L11.882 4H4.11803ZM2.5 3V2H13.5V3H2.5Z" />
        </svg>
      </button>

      {
        children && <>
          <button
            onClick={() => setOpenDropdown(true)}
            className='flex flex-col justify-center items-center px-4 py-2 rounded-full hover:bg-blue-100'>
            <span className='bg-gray-600 w-[5px] h-[5px] rounded-full block mb-[2px]'></span>
            <span className='bg-gray-600 w-[5px] h-[5px] rounded-full block mb-[2px]'></span>
            <span className='bg-gray-600 w-[5px] h-[5px] rounded-full block mb-[2px]'></span>
          </button>
          <motion.div
            ref={ref}
            initial={{ scale: !openDropdown ? 0 : 1 }}
            animate={{ scale: openDropdown ? 1 : 0 }}
            className='absolute z-[2] top-4 right-5 bg-white py-4 rounded-lg shadow-xl origin-top-right'>
            <div className='flex justify-between w-full px-5'>
              <span className='font-semibold'>{t('edit')}</span>
              <button onClick={() => setOpenDropdown(false)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.14645 2.85355C1.95118 2.65829 1.95118 2.34171 2.14645 2.14645C2.34171 1.95118 2.65829 1.95118 2.85355 2.14645L8 7.29289L13.1464 2.14645C13.3417 1.95118 13.6583 1.95118 13.8536 2.14645C14.0488 2.34171 14.0488 2.65829 13.8536 2.85355L8.70711 8L13.8536 13.1464C14.0488 13.3417 14.0488 13.6583 13.8536 13.8536C13.6583 14.0488 13.3417 14.0488 13.1464 13.8536L8 8.70711L2.85355 13.8536C2.65829 14.0488 2.34171 14.0488 2.14645 13.8536C1.95119 13.6583 1.95119 13.3417 2.14645 13.1464L7.29289 8L2.14645 2.85355Z" fill="black" />
                </svg>
              </button>
            </div>
            {children}
          </motion.div>
        </>
      }
    </div>
  );
}

export default TableActions;
