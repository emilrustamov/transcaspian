import { motion } from "framer-motion";
import Box from "../../components/layout/Box";
import { Input, Submit, Textarea } from "../../components/Form/Inputs";
import { useEffect, useState } from "react";
import { UsefulTipsI } from "../../interfaces/usefulTips/usefulTips";
import { useTipAdd } from "../../api-queries/Tips";
import { useNavigate } from "react-router-dom";

function AddUsefullPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<UsefulTipsI>({
    title: '',
    description: '',
    meta_name: '',
    meta_description: '',
    meta_keyword: '',
  })

  const useAdd = useTipAdd();

  const sendData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    useAdd.mutate(data);
  }

  const handleData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value })
  }

  useEffect(() => {
    if (useAdd.isSuccess) navigate(import.meta.env.VITE_API + '/Useful')
  }, [useAdd.isSuccess])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Box>
        <h1 className='font-semibold text-2xl mb-5'>Useful</h1>
        <form onSubmit={sendData} className='grid grid-cols-12 gap-5'>
          <Input className='col-span-6' label='Title' placeholder="Title" name='title' value={data.title} onChange={handleData} />
          <Textarea className='col-span-6' required={true} height={200} label='Description' placeholder="Description" name='description' value={data.description} onChange={handleData} />

          <Submit className="col-span-12" backLink={import.meta.env.VITE_API + '/Trip-tip'} loading={useAdd.isPending} />
        </form>
      </Box>
    </motion.div>
  );
}

export default AddUsefullPage;
