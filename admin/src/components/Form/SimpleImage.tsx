import React, { useState, useEffect } from 'react';
import PopupDelete from '../layout/PopupDelete';
import { Autoplay, Pagination, Zoom } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

function SimpleImage(
  {
    image,
    className,
    id,
    success,
    deleteImage,
  }: {
    image: any,
    className?: string,
    id: number,
    success: boolean,
    deleteImage: (id: number) => void
  }) {
  const [show, setShow] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (success) setOpen(false);
  }, [success]);

  return (
    <div className={'relative h-[200px] w-full ' + className}>
      <img onDoubleClick={() => setShow(true)} className="h-full w-full object-contain" src={image} alt="" loading="lazy" />
      <button
        type="button"
        className="bg-red-500 rounded-lg h-[30px] w-[30px] absolute top-1 right-1 flex items-center justify-center"
        onClick={() => { setOpen(true) }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 1.5V2.5H14.5C14.7761 2.5 15 2.72386 15 3C15 3.27614 14.7761 3.5 14.5 3.5H13.9616L13.1088 14.1595C13.0257 15.1989 12.1579 16 11.1152 16H4.88479C3.84207 16 2.97431 15.1989 2.89116 14.1595L2.0384 3.5H1.5C1.22386 3.5 1 3.27614 1 3C1 2.72386 1.22386 2.5 1.5 2.5H5V1.5C5 0.671573 5.67157 0 6.5 0H9.5C10.3284 0 11 0.671573 11 1.5ZM6 1.5V2.5H10V1.5C10 1.22386 9.77614 1 9.5 1H6.5C6.22386 1 6 1.22386 6 1.5ZM4.49999 5.0285L4.99999 13.5285C5.0162 13.8042 5.25282 14.0145 5.52849 13.9983C5.80415 13.9821 6.01448 13.7454 5.99826 13.4698L5.49826 4.96978C5.48205 4.69411 5.24543 4.48379 4.96976 4.5C4.6941 4.51622 4.48377 4.75283 4.49999 5.0285ZM11.0302 4.50086C10.7546 4.48465 10.5179 4.69497 10.5017 4.97064L10.0017 13.4706C9.98552 13.7463 10.1958 13.9829 10.4715 13.9991C10.7472 14.0154 10.9838 13.805 11 13.5294L11.5 5.02936C11.5162 4.75369 11.3059 4.51708 11.0302 4.50086ZM8 4.5C7.72386 4.5 7.5 4.72386 7.5 5V13.5C7.5 13.7761 7.72386 14 8 14C8.27615 14 8.5 13.7761 8.5 13.5V5C8.5 4.72386 8.27615 4.5 8 4.5Z" fill="white"></path>
        </svg>
      </button>

      {
        show &&
        <div className='backdrop-blur-sm h-full w-full fixed top-0 left-0 z-10'>
          <button onClick={() => setShow(false)}
            className='open-image_close-button bg-white hover:bg-gray-50 border fixed z-[18] top-10 right-10 h-10 w-10 flex items-center justify-center rounded-full'
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.14645 2.85355C1.95118 2.65829 1.95118 2.34171 2.14645 2.14645C2.34171 1.95118 2.65829 1.95118 2.85355 2.14645L8 7.29289L13.1464 2.14645C13.3417 1.95118 13.6583 1.95118 13.8536 2.14645C14.0488 2.34171 14.0488 2.65829 13.8536 2.85355L8.70711 8L13.8536 13.1464C14.0488 13.3417 14.0488 13.6583 13.8536 13.8536C13.6583 14.0488 13.3417 14.0488 13.1464 13.8536L8 8.70711L2.85355 13.8536C2.65829 14.0488 2.34171 14.0488 2.14645 13.8536C1.95119 13.6583 1.95119 13.3417 2.14645 13.1464L7.29289 8L2.14645 2.85355Z" fill="black" />
            </svg>
          </button>
          <Swiper
            className='w-full h-full flex justify-center'
            modules={[Autoplay, Pagination, Zoom]}
            slidesPerView={1}
            loop={true}
            speed={1000}
            zoom={true}
          >
            <SwiperSlide className='w-full h-full' style={{ display: 'flex', justifyContent: 'center' }}>
              <div className='swiper-zoom-container'>
                <img src={image} alt="" className='object-contain h-full rounded-lg' />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      }

      <PopupDelete open={open} setOpen={setOpen} mutate={deleteImage} id={id} />
    </div>
  );
}

export default SimpleImage;