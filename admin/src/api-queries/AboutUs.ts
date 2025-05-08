import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosInstance, AxiosInstanceFormData } from "../common/AxiosInstance"
import { AboutUsI } from "../interfaces/aboutUs/aboutUs";

// Get all files
export const getAboutUs = () => {
  return AxiosInstance.get('admin/about-us');
}

export const useGetAboutUs = () => {
  return useQuery(
    {
      queryKey: [`aboutUs`],
      queryFn: async () => {
        const res = await getAboutUs()
        return res?.data
      },
      placeholderData: keepPreviousData
    }
  )
}


// Update about us
export const updateAboutUs = async (data: AboutUsI) => {
  const newData: { header: string[], description: string[], meta_name: string, meta_description: string, meta_keyword: string } = {
    meta_name: data.meta_name,
    meta_description: data.meta_description,
    meta_keyword: data.meta_keyword,
    header: [],
    description: []
  }
  for (let i = 0; i < data.contents.length; i++) {
    newData.header.push(data.contents[i].title);
    newData.description.push(data.contents[i].description);
  }
  try {
    if (data.images.length) {
      await imagesUpload(data.images)
    }
    const res = await AxiosInstance.patch('admin/about-us', newData);
    return res.data
  } catch (error) {
    console.log(error);
  }
}

export const useUpdateAboutUs = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateAboutUs,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`aboutUs`] })
    }
  })
}

export const imagesUpload = async (images: any) => {
  try {
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
    const res = await AxiosInstanceFormData.post('admin/about-us/upload-image', formData);
    return res.data
  } catch (error) {
    console.log(error);
  }
}

export const imageDelete = async (id: number) => {
  try {
    const res = await AxiosInstanceFormData.delete('admin/about-us/images/' + id);
    return res.data
  } catch (error) {
    console.log(error);
  }
}

export const useImageDelete = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: imageDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`aboutUs`] })
    }
  })
}