import React from 'react';
import dynamic from "next/dynamic";
import { image } from '@/utils/files/image';
const Link = dynamic(() => import('next/link'), { ssr: true })

function TripTip({ tour }: any) {
  return (
    <Link href={process.env.NEXT_PUBLIC_API + '/trip/' + tour.id} className="">
      <img className="rounded-xl w-full object-cover h-[100px] md:h-[150px] lg:h-[200px] xl:h-[250px] 2xl:h-[300px]" src={image(tour?.images[0]?.image)} loading="lazy" alt="" />
      <h2 className="text-trans-red text-lg md:text-2xl text-center mt-3">{tour.title}</h2>
    </Link>
  );
}

export default TripTip;
