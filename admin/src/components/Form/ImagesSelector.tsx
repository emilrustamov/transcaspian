import { useState, useEffect } from 'react';
import { image } from '../../utils/files/image';

type ImageSource = {
  url: string;
  id?: number;
};

interface Prop {
  pic?: any,
  heightLabel?: any,
  className?: string,
  readOnly?: boolean,
  label?: string,
  setImages?: React.Dispatch<React.SetStateAction<string | any[]>>,
  imageDelete?: (id: number) => void
}

function ImagesSelector(
  {
    pic = [],
    heightLabel,
    className,
    readOnly,
    label = 'image',
    setImages,
    imageDelete,
  }: Prop) {

  const [imageSources, setImageSources] = useState<ImageSource[]>([]);
  const [imagesLocal, setImagesLocal] = useState<any>([]);

  const handleImage = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const images = []
      const source = []
      for (let i = 0; i < event.target.files.length; i++) {
        source.push({
          url: URL.createObjectURL(event.target.files[i]),
        })
        images.push(event.target.files[i])
      }
      setImagesLocal([...imagesLocal, ...images]);
      setImages && setImages([...imagesLocal, ...images])
      setImageSources([...imageSources, ...source])
    }
  }

  const deleteImage = (index: number) => {
    if (imageSources[index].id) {
      imageDelete && imageDelete(imageSources[index].id!)
    }
    const newData = [...imageSources]
    setImageSources([...newData])
    const newImagesLocale = [...imagesLocal];
    newImagesLocale.splice(index - pic.length, 1);
    setImagesLocal([...newImagesLocale]);
    setImages && setImages([...newImagesLocale])

    imageSources.splice(index, 1);
    setImageSources(imageSources);
  }
  useEffect(() => {
    const arr = []
    for (let i = 0; i < pic?.length!; i++) {
      arr.push({
        url: pic[i].image,
        id: pic[i].id
      })
    }
    setImageSources(arr);
  }, [pic.length]);
  return (
    <div className={className}>
      <label htmlFor={label} className='mb-2 block font-semibold flex justify-between items-center'>
        {label}
        <div className='px-3 bg-gray-100 border rounded-lg cursor-pointer'>Add image</div>
      </label>
      <input
        type="file"
        accept={`image/*`}
        id={label}
        onChange={handleImage}
        hidden
        multiple={true}
        disabled={readOnly}
      />
      {
        imageSources.length > 0 ?
          <div
            className={imageSources.length > 0 ? 'overflow-auto grid grid-cols-5 gap-2 p-2 w-full border rounded-lg bg-gray-100' : 'hidden'}
            style={imageSources.length > 0 ? { height: heightLabel } : { display: 'none' }}>
            {
              imageSources.map((source, index) => {
                return (
                  <div key={index} className='bg-white rounded border relative h-fit p-2'>
                    {
                      source.id ?
                        <img loading='lazy' className={'object-contain rounded'} style={{ width: '100%', height: '100%' }} src={image(source.url)} />
                        :
                        <img loading='lazy' className={'object-contain rounded'} style={{ width: '100%', height: '100%' }} src={source.url} />
                    }
                    <button onClick={() => deleteImage(index)} type='button' className='bg-red-500 rounded-lg h-[30px] w-[30px] absolute top-1 right-1 flex items-center justify-center'>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 1.5V2.5H14.5C14.7761 2.5 15 2.72386 15 3C15 3.27614 14.7761 3.5 14.5 3.5H13.9616L13.1088 14.1595C13.0257 15.1989 12.1579 16 11.1152 16H4.88479C3.84207 16 2.97431 15.1989 2.89116 14.1595L2.0384 3.5H1.5C1.22386 3.5 1 3.27614 1 3C1 2.72386 1.22386 2.5 1.5 2.5H5V1.5C5 0.671573 5.67157 0 6.5 0H9.5C10.3284 0 11 0.671573 11 1.5ZM6 1.5V2.5H10V1.5C10 1.22386 9.77614 1 9.5 1H6.5C6.22386 1 6 1.22386 6 1.5ZM4.49999 5.0285L4.99999 13.5285C5.0162 13.8042 5.25282 14.0145 5.52849 13.9983C5.80415 13.9821 6.01448 13.7454 5.99826 13.4698L5.49826 4.96978C5.48205 4.69411 5.24543 4.48379 4.96976 4.5C4.6941 4.51622 4.48377 4.75283 4.49999 5.0285ZM11.0302 4.50086C10.7546 4.48465 10.5179 4.69497 10.5017 4.97064L10.0017 13.4706C9.98552 13.7463 10.1958 13.9829 10.4715 13.9991C10.7472 14.0154 10.9838 13.805 11 13.5294L11.5 5.02936C11.5162 4.75369 11.3059 4.51708 11.0302 4.50086ZM8 4.5C7.72386 4.5 7.5 4.72386 7.5 5V13.5C7.5 13.7761 7.72386 14 8 14C8.27615 14 8.5 13.7761 8.5 13.5V5C8.5 4.72386 8.27615 4.5 8 4.5Z" fill="white" />
                      </svg>
                    </button>
                  </div>
                )
              })
            }
          </div>
          :
          <div
            className='bg-gray-100 border bg-gray-100'
            style={{ width: '100%', height: heightLabel, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '10px' }}
          >
            <div className='h-full flex justify-center items-center overflow-hidden rounded-lg'>
              {
                <svg width="100" height="100" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.50153 9C5.32995 9 6.00153 8.32843 6.00153 7.5C6.00153 6.67157 5.32995 6 4.50153 6C3.6731 6 3.00153 6.67157 3.00153 7.5C3.00153 8.32843 3.6731 9 4.50153 9Z" fill="black" />
                  <path d="M14.0015 13C14.0015 14.1046 13.1061 15 12.0015 15H2.00153C0.896956 15 0.00152588 14.1046 0.00152588 13V5C0.00152588 3.89594 0.896124 3.00083 1.99998 3C1.99998 1.89543 2.89542 1 3.99998 1H14C15.1046 1 16 1.89543 16 3V11C16 12.1041 15.1054 12.9992 14.0015 13ZM14 2H3.99998C3.4477 2 2.99998 2.44772 2.99998 3L12.0015 3C13.1061 3 14.0015 3.89543 14.0015 5V12C14.5531 11.9992 15 11.5518 15 11V3C15 2.44772 14.5523 2 14 2ZM2.00153 4C1.44924 4 1.00153 4.44772 1.00153 5V13L3.64797 10.6465C3.8165 10.4779 4.08056 10.4518 4.27888 10.584L6.93782 12.3566L10.648 8.64646C10.8002 8.49428 11.0326 8.45655 11.2251 8.5528L13.0015 10.5V5C13.0015 4.44772 12.5538 4 12.0015 4H2.00153Z" fill="black" />
                </svg>
              }
            </div>
          </div>
      }
    </div >
  );
}

export default ImagesSelector;
