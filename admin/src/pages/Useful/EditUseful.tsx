import { motion } from "framer-motion";
import Box from "../../components/layout/Box";
import { Input, Submit, Textarea } from "../../components/Form/Inputs";
import { useEffect, useState } from "react";
import { UsefulTipsI } from "../../interfaces/usefulTips/usefulTips";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOneTip, useTipUpdate } from "../../api-queries/Tips";

function EditUsefullPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<UsefulTipsI>({
    id: 0,
    title: '',
    description: '',
    meta_description: '',
    meta_keyword: '',
    meta_name: '',
  })

  const useOneData = useGetOneTip(Number(id));
  const useUpdate = useTipUpdate();

  const sendData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    useUpdate.mutate(data);
  }

  const handleData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value })
  }


  useEffect(() => {
    if (!useOneData.isFetching) {
      setData(
        {
          id: useOneData.data.id,
          title: useOneData.data.title,
          description: useOneData.data.description,
          meta_description: useOneData.data.meta_description,
          meta_keyword: useOneData.data.meta_keyword,
          meta_name: useOneData.data.meta_name,
        }
      )
    }
  }, [useOneData.isFetching])

  useEffect(() => {
    if (useUpdate.isSuccess) navigate(import.meta.env.VITE_API + '/Useful')
  }, [useUpdate.isSuccess])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Box>
        <h1 className='font-semibold text-2xl mb-5'>Useful</h1>
        <form onSubmit={sendData} className='grid grid-cols-12 gap-5'>
          <Input className='col-span-6' label='Title' placeholder="Title" name='title' value={data.title} onChange={handleData} />
          <Textarea className='col-span-6' height={200} label='Description' placeholder="Description" name='description' value={data.description} onChange={handleData} />

          <Submit className="col-span-12" backLink={import.meta.env.VITE_API + '/Useful'} loading={useUpdate.isPending} />
        </form>
      </Box>
    </motion.div>
  );
}

export default EditUsefullPage;
