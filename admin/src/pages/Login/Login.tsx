import React, { useState } from 'react';
import { Input, Submit } from '../../components/Form/Inputs';
import { AxiosInstance, AxiosInstanceFormData } from '../../common/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../../common/service/watchers/layout/user';
import Cookies from 'universal-cookie';

const api = import.meta.env.VITE_API

const cookies = new Cookies(null, { path: '/' });

type loginType = {
  username: string;
  password: string;
}

function LoginPage() {
  const navigate = useNavigate();
  const setUser = useUser((state) => state.setUser);
  const [loading,setLoading] = useState(false);
  const [data, setData] = useState<loginType>({
    username: '',
    password: '',
  })

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await AxiosInstance.post('/admin/login', data);
      if (res.status === 200) {
        setLoading(true)
        cookies.set('trans-user-token', res.data.access_token, { maxAge: 86400 });
        cookies.set('trans-user-data', res.data, { maxAge: 86400 });
        
        setUser(res.data)
        window.location.replace(api);
      }
    } catch (error: any) {
      console.log(error);
      alert(error.response.data.msg)
      setLoading(false);
    }
  }

  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='login h-screen w-full flex items-center justify-center bg-gray-50'>
      <form onSubmit={sendData} className='shadow-lg px-8 py-6 rounded-lg bg-white sm:w-3/4 md:w-2/4 lg:w-[400px]'>
        <div className="form_title font-semibold text-2xl mb-5">Login</div>
        <Input label='Username' placeholder='Username' value={data.username} name='username' onChange={handleData} />
        <Input className={'mb-5'} type={'password'} label='Password' placeholder='Password' value={data.password} name='password' onChange={handleData} />
        <Submit text="Login" loading={loading}/>
      </form>
    </motion.div>
  );
}

export default LoginPage;

