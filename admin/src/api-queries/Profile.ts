import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosInstance, AxiosInstanceFormData } from "../common/AxiosInstance"
import Cookies from 'universal-cookie';
const cookies = new Cookies(null, { path: '/' });

// Get profile
export const getProfile = async () => {
  try {
    const res = await AxiosInstance.get(`admin/get-me`);
    return res;
  } catch (error: any) {
    const err = error?.response?.data?.message
    if (err === 'Unauthorized') {
      cookies.remove('trans-user-token');
      cookies.remove('trans-user-data');
      window.location.replace('/admin/login');
    }
  }
}

export const useGetProfile = () => {
  return useQuery(
    {
      queryKey: [`profile`],
      queryFn: async () => {
        const res = await getProfile()
        return res
      },
      placeholderData: keepPreviousData
    }
  )
}

// Update
export const profileUpdate = async (data: { username: string, password: string, audio: any, mail: string }) => {
  try {
    if (data.audio) {
      await uploadAudio(data.audio);
    }
    const res = await AxiosInstance.patch('admin/', { username: data.username, password: data.password, mail: data.mail });
    return res
  } catch (error) {
    console.log(error);
    // if(error.response)
  }
}

export const useProfileUpdate = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: profileUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`profile`] })
    }
  })
}

// Audio song
export const uploadAudio = async (audio: any) => {
  try {
    const formData = new FormData();
    formData.append('audio', audio);
    const res = await AxiosInstanceFormData.post('admin/upload-audio', formData);
    return res
  } catch (error) {
    console.log(error);
  }
}