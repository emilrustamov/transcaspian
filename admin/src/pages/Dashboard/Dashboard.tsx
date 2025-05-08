import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'
import Box from '../../components/layout/Box';
import { Input, Submit } from '../../components/Form/Inputs';
import { useGetProfile, useProfileUpdate } from '../../api-queries/Profile';
import { files } from '../../utils/files/files';

function DashboardPage() {
  const [data, setData] = useState<{ username: string, password: string, audio: any, mail:string }>({
    username: '',
    password: '',
    audio: null,
    mail:'',
  });
  const [audioFile, setAudioFile] = useState<any>(null);

  const profile = useGetProfile();
  const update = useProfileUpdate();

  useEffect(() => {
    if (!profile.isFetching) {
      setData({
        username: profile.data?.data.username,
        password: '',
        audio: '',
        mail:profile.data?.data?.mail,
      })

      setAudioFile({
        url: profile.data?.data.audio,
        id: 1,
      })
    }
  }, [profile.isFetching])

  useEffect(()=>{
    if(update.isSuccess) alert("Saved successfully")
  },[update.isSuccess])

  const sendData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data)
    update.mutate(data);
  }

  const handleData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value })
  }



  const handleAudioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith('audio/')) {
      return;
    } else {
      setAudioFile({
        url: URL.createObjectURL(event.target.files![0]),
      })
      setData({ ...data, audio: file });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Box>
        <h1 className='font-semibold text-2xl mb-5'>Profile</h1>
        <form onSubmit={sendData} className='grid grid-cols-12 gap-5'>
          <Input className='col-span-4' label='Username' placeholder="Username" name='username' value={data.username} onChange={handleData} />
          <Input className='col-span-4' label='Password' placeholder="Password" name='password' type='password' required={false} value={data.password} onChange={handleData} />
          <Input className='col-span-4' label='Gmail' placeholder="Gmail" name='mail' value={data.mail} onChange={handleData} />

          <label className="cursor-pointer col-span-6 w-full flex flex-col items-center justify-center h-14 bg-gray-100 border rounded-full border-gray-300 p-4">
            <label
              htmlFor="audio-input"
              className="text-md cursor-pointer text-gray-500 w-full hover:text-gray-700 mb-2 flex items-center justify-center"
            >
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.5 9.90002C0.776142 9.90002 1 10.1239 1 10.4V12.9C1 13.4523 1.44772 13.9 2 13.9H14C14.5523 13.9 15 13.4523 15 12.9V10.4C15 10.1239 15.2239 9.90002 15.5 9.90002C15.7761 9.90002 16 10.1239 16 10.4V12.9C16 14.0046 15.1046 14.9 14 14.9H2C0.895431 14.9 0 14.0046 0 12.9V10.4C0 10.1239 0.223858 9.90002 0.5 9.90002Z" fill="black" />
                <path d="M7.64645 1.14645C7.84171 0.951184 8.15829 0.951184 8.35355 1.14645L11.3536 4.14645C11.5488 4.34171 11.5488 4.65829 11.3536 4.85355C11.1583 5.04882 10.8417 5.04882 10.6464 4.85355L8.5 2.70711V11.5C8.5 11.7761 8.27614 12 8 12C7.72386 12 7.5 11.7761 7.5 11.5V2.70711L5.35355 4.85355C5.15829 5.04882 4.84171 5.04882 4.64645 4.85355C4.45118 4.65829 4.45118 4.34171 4.64645 4.14645L7.64645 1.14645Z" fill="black" />
              </svg>

              <span className='ml-5 fong-bold text-lg'>Upload song or music</span>
            </label>
            <input
              id="audio-input"
              type="file"
              accept="audio/*"
              onChange={handleAudioChange}
              className="hidden w-full p-2 mt-2 text-sm border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            />
          </label>
          {
            audioFile?.id ?
              <audio className='col-span-6 w-full' controls src={files(audioFile?.url)} />
              :
              <audio className='col-span-6 w-full' controls src={audioFile?.url} />
          }

          <Submit className="col-span-12" loading={update.isPending}/>
        </form>
      </Box>
    </motion.div>
  );
}

export default DashboardPage;


{/* <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z" fill="black" />
<path d="M10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6C9.10457 6 10 6.89543 10 8Z" fill="black" />
<path d="M7.99994 4C5.7908 4 3.99994 5.79086 3.99994 8C3.99994 8.27614 3.77608 8.5 3.49994 8.5C3.2238 8.5 2.99994 8.27614 2.99994 8C2.99994 5.23858 5.23851 3 7.99994 3C8.27608 3 8.49994 3.22386 8.49994 3.5C8.49994 3.77614 8.27608 4 7.99994 4ZM12.4999 7.5C12.7761 7.5 12.9999 7.72386 12.9999 8C12.9999 10.7614 10.7614 13 7.99994 13C7.7238 13 7.49994 12.7761 7.49994 12.5C7.49994 12.2239 7.7238 12 7.99994 12C10.2091 12 11.9999 10.2091 11.9999 8C11.9999 7.72386 12.2238 7.5 12.4999 7.5Z" fill="black" />
</svg> */}