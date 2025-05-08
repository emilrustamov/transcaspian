import { t } from 'i18next';
import React from 'react';

function CheckButton({
  text = '',
  isActive = false,
  name = '',
  extra,
  id,
  className = '',
  label = '',
  readOnly = false,
  setValue = () => { },
}: {
  text?: string,
  isActive?: boolean,
  name?: string,
  id?: number,
  extra?: any,
  className?: string,
  label?: string,
  readOnly?:boolean,
  setValue?: (value: boolean, name: string, id: number, extra: any) => void
}) {
  return (
    <div className={'flex flex-col ' + className}>
      {
        label && <div className='mb-2 block font-semibold'>{t(label)}</div>
      }
      <button type='button' onClick={() => setValue(!isActive, name, id!, extra)} className={' py-2  flex items-center w-full ' + className + (text ? ' hover:bg-gray-100 px-5 ' : '')}>
        {
          isActive ?
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 1C14.5523 1 15 1.44772 15 2V14C15 14.5523 14.5523 15 14 15H2C1.44772 15 1 14.5523 1 14V2C1 1.44772 1.44772 1 2 1H14ZM2 0C0.895431 0 0 0.895431 0 2V14C0 15.1046 0.895431 16 2 16H14C15.1046 16 16 15.1046 16 14V2C16 0.895431 15.1046 0 14 0H2Z" fill="black" />
              <path d="M10.9697 4.96967C11.2626 4.67678 11.7374 4.67678 12.0303 4.96967C12.3196 5.25897 12.3232 5.72582 12.041 6.01947L8.04876 11.0097C8.043 11.0169 8.03685 11.0238 8.03032 11.0303C7.73743 11.3232 7.26256 11.3232 6.96966 11.0303L4.32322 8.38388C4.03032 8.09099 4.03032 7.61612 4.32322 7.32322C4.61611 7.03033 5.09098 7.03033 5.38388 7.32322L7.4774 9.41674L10.9498 4.9921C10.9559 4.98423 10.9626 4.97674 10.9697 4.96967Z" fill="black" />
            </svg>
            :
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 1C14.5523 1 15 1.44772 15 2V14C15 14.5523 14.5523 15 14 15H2C1.44772 15 1 14.5523 1 14V2C1 1.44772 1.44772 1 2 1H14ZM2 0C0.895431 0 0 0.895431 0 2V14C0 15.1046 0.895431 16 2 16H14C15.1046 16 16 15.1046 16 14V2C16 0.895431 15.1046 0 14 0H2Z" fill="black" />
            </svg>
        }

        {
          text && <span className='ml-3'>{t(text)}</span>
        }
      </button>
    </div>
  );
}

export default CheckButton;