import { motion } from "framer-motion";
import Box from "../../components/layout/Box";
import { Input, Submit, Textarea } from "../../components/Form/Inputs";
import ImageSelector from "../../components/Form/ImageSelector";
import { useEffect, useState, useRef } from "react";
import ImagesSelector from "../../components/Form/ImagesSelector";
import { TripTipI } from "../../interfaces/tripTip/tripTip";
import { useGetOneTrip, useImageDelete, useTripUpdate } from "../../api-queries/Trip";
import { useNavigate, useParams } from "react-router-dom";
import Tiny from "../../components/Form/Tiny";

function EditTripTip() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [oldImages, setOldImages] = useState([])
  const editorRef = useRef<any>(null);
  const [data, setData] = useState<TripTipI>({
    meta_description: '',
    meta_keyword: '',
    meta_name: '',
    id: 0,
    title: '',
    description: '',
    images: [],
  })

  const useOneData = useGetOneTrip(Number(id));
  const useUpdate = useTripUpdate();
  const useDelete = useImageDelete();

  const sendData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.images.length || oldImages.length) {
      useUpdate.mutate({ ...data, description: editorRef.current.getContent() });
    } else {
      alert("Add image")
    }
  }

  const handleData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value })
  }

  useEffect(() => {
    if (!useOneData.isFetching) {
      setData(
        {
          meta_description: useOneData.data.meta_description,
          meta_name: useOneData.data.meta_name,
          meta_keyword: useOneData.data.meta_keyword,
          id: useOneData.data.id,
          title: useOneData.data.title,
          description: useOneData.data.description,
          images: []
        }
      )
      setOldImages(useOneData.data.images)
    }

  }, [useOneData.isFetching])

  useEffect(() => {
    if (useUpdate.isSuccess) navigate(import.meta.env.VITE_API + '/Trip-tips')
  }, [useUpdate.isSuccess])

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
            <ImagesSelector
              label="Images"
              pic={oldImages}
              imageDelete={useDelete.mutate}
              setImages={(images) => setData({ ...data, images: images as any[] })}
              heightLabel={200}
            />
          </div>

          <Submit
            className="col-span-12"
            backLink={import.meta.env.VITE_API + '/Trip-tips'}
            loading={useUpdate.isPending}
          />
        </form>
      </Box>
    </motion.div>
  );
}

export default EditTripTip;
