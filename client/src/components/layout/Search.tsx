import { useState } from "react";

function Search() {
  const [search,setSearch] = useState<string>();
  const handleSearch = (e: any) => {
    e.preventDefault();
    window.find(search)
  }
  return (
    <div className='float-right lg:sticky z-[10] flex items-center top-[30px] lg:top-[50px] backdrop-blur-md right-0 border-[1.5px] border-trans-brown rounded md:rounded-lg px-3 lg:px-4 py-1 lg:py-2 text-sm md:text-base shadow w-fit'>
      <form onSubmit={handleSearch} className='flex items-center'>
        <input
          type="text"
          className='search bg-inherit outline-none w-[200px] md:w-[250px] lg:w-[300px]'
          placeholder="SEARCH"
          onChange={(e)=>setSearch(e.target.value)}
        />
        <button
          type='button'
        >
          <svg className="w-5 lg:w-6 h-5 lg:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_418_398)">
              <path d="M24 0H0V24H24V0Z" fill="white" fillOpacity="0.01" />
              <path d="M10.5 19C15.1944 19 19 15.1944 19 10.5C19 5.8056 15.1944 2 10.5 2C5.8056 2 2 5.8056 2 10.5C2 15.1944 5.8056 19 10.5 19Z" stroke="#C2974A" strokeWidth="2" strokeLinejoin="round" />
              <path d="M13.3284 7.17155C12.6046 6.4477 11.6046 6 10.5 6C9.39547 6 8.39547 6.4477 7.67157 7.17155" stroke="#C2974A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16.6109 16.6108L20.8535 20.8535" stroke="#C2974A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
              <clipPath id="clip0_418_398">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </form>
    </div>
  );
}

export default Search;
