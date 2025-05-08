import React from 'react';

function Box({children}:{children:React.ReactNode}) {
  return (
    <div className='codes shadow-xl rounded-lg bg-white p-4'>
      {children}
    </div>
  );
}

export default Box;
