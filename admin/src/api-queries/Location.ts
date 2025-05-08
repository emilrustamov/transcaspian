import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosInstance, AxiosInstanceFormData } from "../common/AxiosInstance"
import Cookies from 'universal-cookie';
import { OneLocationI } from "../interfaces/map/location";
const cookies = new Cookies(null, { path: '/' });

// Get profile
export const getLocation = async (id: number) => {
  try {
    const res = await AxiosInstance.get(`admin/static/${id}`);
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

export const useGetLocation = (id: number) => {
  return useQuery(
    {
      queryKey: [`location-${id}`],
      queryFn: async () => {
        const res = await getLocation(id);
        return res
      },
      placeholderData: keepPreviousData
    }
  )
}

// Update
export const locationUpdate = async (data: OneLocationI) => {
  console.log(data);
  try {
    if (data.images.length > 0) {
      const imagesRes = await uploadLocationImages(data.images, data.id!);
    }
    if (data.icon) {
      const iconRes = await uploadLocationIcon(data.icon, data.id!);
    }
    const res = await AxiosInstance.patch(`admin/static/${data.id}`, { name: data.name, description: data.description, meta_name: data.meta_name, meta_description: data.meta_description, meta_keyword: data.meta_keyword });
    return res
  } catch (error) {
    console.log(error);
  }
}

export const useLocationUpdate = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: locationUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`location-${id}`] })
    }
  })
}

// upload images
export const uploadLocationImages = async (images: any[], id: number) => {
  try {
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
    const res = await AxiosInstanceFormData.post(`admin/static/upload-image/${id}`, formData);
    return res
  } catch (error) {
    console.log(error);
  }
}

// delete image
export const deleteLocationImage = async (id: number) => {
  try {
    const res = await AxiosInstanceFormData.delete(`admin/static/images/${id}`);
    return res
  } catch (error) {
    console.log(error);
  }
}

export const useDeleteLocationImage = () => {
  return useMutation({
    mutationFn: deleteLocationImage,
  })
}

// icon upload
export const uploadLocationIcon = async (icon: any, id: number) => {
  try {
    const formData = new FormData();
    formData.append('icon', icon);
    const res = await AxiosInstanceFormData.post(`admin/static/upload-icon/${id}`, formData);
    return res
  } catch (error) {
    console.log(error);
  }
}