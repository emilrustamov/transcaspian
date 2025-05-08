import { motion } from "framer-motion";
import Box from "../../components/layout/Box";
import { Input, Submit, Textarea } from "../../components/Form/Inputs";
import ImageSelector from "../../components/Form/ImageSelector";
import { useEffect, useState } from "react";
import ImagesSelector from "../../components/Form/ImagesSelector";
import { TripTipI } from "../../interfaces/tripTip/tripTip";
import { useTripAdd } from "../../api-queries/Trip";
import { useNavigate } from "react-router-dom";
import { useRef } from 'react';
import Tiny from "../../components/Form/Tiny";

function AddTripTip() {
  const navigate = useNavigate();
  const editorRef = useRef<any>(null);
  const [data, setData] = useState<TripTipI>({
    meta_description: '',
    meta_keyword: '',
    meta_name: '',
    title: '',
    description: '',
    images: [],
  })

  const useAdd = useTripAdd();

  const sendData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.images.length > 0) {
      useAdd.mutate({ ...data, description: editorRef.current.getContent() });
    } else {
      alert("Add image")
    }
  }

  const handleData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value })
  }

  useEffect(() => {
    if (useAdd.isSuccess) navigate(import.meta.env.VITE_API + '/Trip-tips')
  }, [useAdd.isSuccess])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Box>
        <h1 className='font-semibold text-2xl mb-5'>Trip-tips</h1>
        <form onSubmit={sendData} className='grid grid-cols-12 gap-5'>
          <Input className='col-span-4' label='Meta name' placeholder="Meta name" name='meta_name' value={data.meta_name} onChange={handleData} />
          <Input className='col-span-4' label='Meta description' placeholder="Meta description" name='meta_description' value={data.meta_description} onChange={handleData} />
          <Input className='col-span-4' label='Meta keyword' placeholder="Meta keyword" name='meta_keyword' value={data.meta_keyword} onChange={handleData} />

          <Input className='col-span-4' label='Title' placeholder="Title" name='title' value={data.title} onChange={handleData} />
          <div className="col-span-8">
            <h1 className="mb-2 font-semibold">Description</h1>
            <Tiny ref2={editorRef} initialValue={data.description} />
          </div>
          <div className='col-span-12'>
            <ImagesSelector label="Images" setImages={(images) => setData({ ...data, images: images as any[] })} heightLabel={200} />
          </div>

          <Submit className="col-span-12" backLink={import.meta.env.VITE_API + '/Trip-tips'} loading={useAdd.isPending} />
        </form>
      </Box>
    </motion.div>
  );
}

export default AddTripTip;
