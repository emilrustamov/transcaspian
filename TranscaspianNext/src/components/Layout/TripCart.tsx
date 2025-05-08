import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const Popup = dynamic(() => import('./Popup'), { ssr: false })

function TripCart({ tip }: { tip: { title: string, description: string } }) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <div onClick={() => { setOpen(!open) }} className="cursor-pointer md:mt-3">
        <div className="usefulTips_contents_cart h-[245px] bg-trans-light-brown px-2 py-5 rounded-lg shadow leading-[20px] mb-4">
          <p className="line-clamp-[10] text-justify">
            {tip.description}
          </p>
        </div>
        <hr className="border-[1.5px] border-trans-red shadow" />
        <h2 className="text-trans-red font-serif my-2.5 uppercase text-center line-clamp-1">{tip.title}</h2>
        <hr className="border-[1.5px] border-trans-red shadow" />
      </div>
      <Popup open={open} setOpen={setOpen}>
        <h2 className="text-trans-red font-serif my-2.5 text-xl uppercase text-center">{tip.title}</h2>
        <p className='text-justify'>
          {tip.description}
        </p>
      </Popup>
    </>
  );
}

export default TripCart;
