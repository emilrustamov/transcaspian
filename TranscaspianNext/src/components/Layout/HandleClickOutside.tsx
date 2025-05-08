import React, { useEffect } from 'react';

function HandleClickOutside(
  {
    setOpenGalleryImage,
    handleKeypress2,
  }: {
    setOpenGalleryImage: (bool: boolean) => void,
    handleKeypress2: (e: any) => void
  }
) {
  useEffect(() => {

    const handleClickOutside = (event: any) => {
      if (typeof event?.target.className === 'string' && event?.target?.className?.split(' ')?.[0] !== 'close' && event?.target?.className?.split(' ')?.[0] !== 'open') {
        setOpenGalleryImage(false);
      } else if (typeof event?.target.className === 'string' && event?.target?.className?.split(' ')?.[0] === 'open') {
        setOpenGalleryImage(true)
      }
    };

    const handleKeypressWrapper = (e: KeyboardEvent) => handleKeypress2(e);

    document.querySelector('body')?.addEventListener('keydown', handleKeypressWrapper)

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.querySelector('body')?.removeEventListener('keydown', handleKeypressWrapper);
    };
  }, [])

  return (
    <div>

    </div>
  );
}

export default HandleClickOutside;
