import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosInstance, AxiosInstanceFormData } from "../common/AxiosInstance"

// Get all files
export const getAllFiles = () => {
  return AxiosInstance.get('admin/gallery');
}

export const useGetAllFiles = () => {
  return useQuery(
    {
      queryKey: [`gallery`],
      queryFn: getAllFiles,
      placeholderData: keepPreviousData
    }
  )
}

export const fileUpload = async (files: any) => {
  try {
    const formData = new FormData();
    for(let i = 0; i<files.length; i++){
      formData.append('images', files[i]);
    }
    const res = await AxiosInstanceFormData.post('admin/gallery', formData);
    return res.data
  } catch (error) {
    console.log(error);
  }
}

export const useFileUpload = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: fileUpload,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`gallery`] })
    }
  })
}

export const galleryFileDelete = async (id: number) => {
  try {
    const res = await AxiosInstanceFormData.delete('admin/gallery/'+id);
    return res.data
  } catch (error) {
    console.log(error);
  }
}

export const useGalleryFileDelete = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: galleryFileDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`gallery`] })
    }
  })
}