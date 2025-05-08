import { useState } from 'react';
import { image } from '../../utils/files/image';

type ImageSource = {
  url: string;
};

interface Prop {
  pic?: string,
  heightLabel?: any,
  className?: string,
  readOnly?: boolean,
  label?: string,
  setImage?: React.Dispatch<React.SetStateAction<string | any[]>>,
  type?: 'image',
}

function ImageSelector(
  {
    pic,
    heightLabel,
    className,
    readOnly,
    label = 'image',
    type = 'image',
    setImage,
  }: Prop) {

  const [imageSource, setImageSource] = useState<ImageSource | null>(null);

  const handleImage = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImageSource({
        url: URL.createObjectURL(event.target.files[0]),
      })
      setImage && setImage(event.target.files[0])
    }
  }
  return (
    <div className={className}>
      <label htmlFor={label} className='mb-2 block font-semibold flex justify-between items-center'>
        {label}
      </label>
      <input
        type="file"
        accept={`image/*`}
        id={label}
        onChange={handleImage}
        hidden
        multiple={false}
        disabled={readOnly}
      />
      {
        imageSource ?
          <label htmlFor={label} className={imageSource ? 'overflow-hidden flex w-full justify-center items-center border rounded-lg bg-gray-100' : 'hidden'} style={imageSource ? { height: heightLabel } : { display: 'none' }}>
            {
              <img loading='lazy' className={'object-contain'} style={{ width: '100%', height: '100%' }} src={imageSource.url} />
            }
          </label> :
          <label
            htmlFor={label}
            className='bg-gray-100 border cursor-pointer bg-gray-100'
            style={{ width: '100%', height: heightLabel, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '10px' }}
          >
            <div className='h-full flex justify-center items-center overflow-hidden rounded-lg'>
              {
                pic ? <img loading='lazy' className='w-full h-full' src={image(pic)} alt="" /> :
                  (
                    type === 'image' ?
                      <svg width="100" height="100" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.00153 4.5C6.00153 5.32843 5.32995 6 4.50153 6C3.6731 6 3.00153 5.32843 3.00153 4.5C3.00153 3.67157 3.6731 3 4.50153 3C5.32995 3 6.00153 3.67157 6.00153 4.5Z" fill="black" />
                        <path d="M2.00153 0C0.896956 0 0.00152588 0.89543 0.00152588 2V12C0.00152588 13.1046 0.896956 14 2.00153 14H14.0015C15.1061 14 16.0015 13.1046 16.0015 12V2C16.0015 0.895431 15.1061 0 14.0015 0H2.00153ZM14.0015 1C14.5538 1 15.0015 1.44772 15.0015 2V8.50001L11.2251 6.5528C11.0326 6.45655 10.8002 6.49428 10.648 6.64646L6.93782 10.3566L4.27888 8.58399C4.08056 8.45178 3.8165 8.47793 3.64797 8.64646L1.00153 11V2C1.00153 1.44772 1.44924 1 2.00153 1H14.0015Z" fill="black" />
                      </svg> :
                      <svg width="100" height="100" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 1C0 0.447715 0.447715 0 1 0H15C15.5523 0 16 0.447715 16 1V15C16 15.5523 15.5523 16 15 16H1C0.447715 16 0 15.5523 0 15V1ZM4 1V7H12V1H4ZM12 9H4V15H12V9ZM1 1V3H3V1H1ZM3 4H1V6H3V4ZM1 7V9H3V7H1ZM3 10H1V12H3V10ZM1 13V15H3V13H1ZM15 1H13V3H15V1ZM13 4V6H15V4H13ZM15 7H13V9H15V7ZM13 10V12H15V10H13ZM15 13H13V15H15V13Z" fill="black" />
                      </svg>
                  )
              }
            </div>
          </label>
      }
    </div >
  );
}

export default ImageSelector;
