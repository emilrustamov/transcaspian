import { motion } from "framer-motion";
import Box from "../../components/layout/Box";
import { Input, Submit, Textarea } from "../../components/Form/Inputs";
import { useState, useEffect } from "react";
import { AboutUsI, OneContentI } from "../../interfaces/aboutUs/aboutUs";
import ImagesSelector from "../../components/Form/ImagesSelector";
import { useGetAboutUs, useImageDelete, useUpdateAboutUs } from "../../api-queries/AboutUs";
import { useRef } from 'react';
import Tiny from "../../components/Form/Tiny";

function AboutUsPage() {
  const useData = useGetAboutUs();
  const useUpdate = useUpdateAboutUs();
  const useDelete = useImageDelete();
  const [oldImages, setOldImage] = useState<any>([])
  const editorRef = useRef<any>(null);
  const [data, setData] = useState<AboutUsI>({
    meta_description: '',
    meta_keyword: '',
    meta_name: '',
    contents: [
      {
        title: '',
        description: "",
      }
    ],
    images: [],
  })

  const sendData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newData = data;
    newData.contents[0].description = editorRef.current.getContent();
    useUpdate.mutate(newData);

  }

  const handleData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const [key, index] = name.split(' ')
    if (key === 'title' || key === 'description') {
      data.contents[Number(index)][key] = value;
      setData({ ...data, contents: [...data.contents] })
    } else {
      setData({ ...data, [name]: value })
    }
  }

  useEffect(() => {
    if (useData.data) {
      const arr = []
      for (let i = 0; i < useData.data.header.length; i++) {
        arr.push({
          title: useData.data.header[i],
          description: useData.data.description[i]
        })
      }
      setData({
        meta_description: useData.data.meta_description,
        meta_name: useData.data.meta_name,
        meta_keyword: useData.data.meta_keyword,
        contents: arr,
        images: []
      })
      setOldImage([...useData.data.images])
    }
  }, [useData.isSuccess]);

  useEffect(() => {
    if (useUpdate.isSuccess) {
      alert("Saved successfully");
      setData({ ...data, images: [] })
    }
  }, [useUpdate.isSuccess])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Box>
        <h1 className='font-semibold text-2xl mb-5'>About us</h1>
        <form onSubmit={sendData} className='grid grid-cols-12 gap-5'>
          <Input className='col-span-4' label='Meta name' placeholder="Meta name" name={'meta_name'} value={data.meta_name} onChange={handleData} />
          <Input className='col-span-4' label='Meta description' placeholder="Meta description" name={'meta_description'} value={data.meta_description} onChange={handleData} />
          <Input className='col-span-4' label='Meta keyword' placeholder="Meta keyword" name={'meta_keyword'} value={data.meta_keyword} onChange={handleData} />
          {
            data.contents.map((content: OneContentI, index: number) => (
              <div className="col-span-12 grid grid-cols-12 gap-5" key={index}>
                <Input className='col-span-4' label='Title' placeholder="Title" name={'title ' + index} value={content.title} onChange={handleData} />
                <div className="col-span-8">
                  <h1 className="mb-2 font-semibold">Description</h1>
                  <Tiny ref2={editorRef} initialValue={content.description} />
                </div>
              </div>
            ))
          }

          <div className='col-span-12'>
            <ImagesSelector imageDelete={useDelete.mutate} pic={oldImages} label="Images" setImages={(images) => setData({ ...data, images: images as any[] })} heightLabel={200} />
          </div>

          <Submit className="col-span-12" loading={useUpdate.isPending} />
        </form>
      </Box>
    </motion.div>
  );
}

export default AboutUsPage;