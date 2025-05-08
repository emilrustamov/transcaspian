import { motion } from "framer-motion";
import Box from "../../components/layout/Box";
import { Input, Submit, Textarea } from "../../components/Form/Inputs";
import { useState } from "react";
import { OneLocationI } from "../../interfaces/map/location";
import ImagesSelector from "../../components/Form/ImagesSelector";
import { useDeleteLocationImage, useGetLocation, useLocationUpdate } from "../../api-queries/Location";
import { useEffect, useRef } from 'react'
import Tiny from "../../components/Form/Tiny";

function Location1() {
  const [icon, setIcon] = useState();
  const [images, setImages] = useState([]);
  const editorRef = useRef<any>(null);

  const [data, setData] = useState<OneLocationI>({
    name: '',
    description: '',
    icon: '',
    meta_name: '',
    meta_description: '',
    meta_keyword: '',
    images: [],
  })

  const useData = useGetLocation(Number(6));
  const useUpdate = useLocationUpdate(Number(6));
  const useDelete = useDeleteLocationImage();

  const sendData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.icon || icon) {
      useUpdate.mutate({ ...data, description: editorRef.current.getContent() });
    }
  }

  const handleData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value })
  }

  useEffect(() => {
    if (!useData.isFetching) {
      setData({
        ...data,
        id: useData.data?.data.id,
        description: useData.data?.data.description,
        name: useData.data?.data.name,
        meta_description: useData.data?.data.meta_description,
        meta_name: useData.data?.data.meta_name,
        meta_keyword: useData.data?.data.meta_keyword,
      })
      setIcon(useData.data?.data.icon);
      setImages(useData.data?.data.images);
    }
  }, [useData.isFetching]);

  useEffect(() => {
    if (useUpdate.isSuccess) alert('Saved successfully')
  }, [useUpdate.isSuccess])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Box>
        <h1 className='font-semibold text-2xl mb-5'>Ancient Merv</h1>
        <form onSubmit={sendData} className='grid grid-cols-12 gap-5'>
          <Input className='col-span-4' label='Name' placeholder="Name" name='name' value={data.name} onChange={handleData} />
          <div className="col-span-8">
            <h1 className="mb-2 font-semibold">Description</h1>
            <Tiny ref2={editorRef} initialValue={data.description} />
          </div>

          <Input className='col-span-4' label='Meta name' placeholder="Meta name" name='meta_name' value={data.meta_name} required={false} onChange={handleData} />
          <Input className='col-span-4' label='Meta description' placeholder="Meta description" name='meta_description' value={data.meta_description} required={false} onChange={handleData} />
          <Input className='col-span-4' label='Meta keywords' placeholder="Keyword1, keyword2, keyword3, ..." name='meta_keyword' value={data.meta_keyword} required={false} onChange={handleData} />

          <div className='col-span-8'>
            <ImagesSelector
              label="Images"
              pic={images}
              setImages={(images) => setData({ ...data, images: images as any[] })}
              imageDelete={useDelete.mutate}
              heightLabel={200} />
          </div>

          <Submit className="col-span-12" loading={useUpdate.isPending} />
        </form>
      </Box>
    </motion.div>
  );
}

export default Location1;
