import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosInstance, AxiosInstanceFormData } from "../common/AxiosInstance"
import { TripTipI } from "../interfaces/tripTip/tripTip";

export interface TableI {
  limit: number,
  page: number,
  search: string,
}

// Get all trips
export const getAllTrips = ({ limit, page, search }: TableI) => {
  return AxiosInstance.get(`admin/trips?keyword=${search}&limit=${limit}&offset=${page * limit}`);
}

export const useGetAllTrips = ({ limit, page, search }: TableI) => {
  return useQuery(
    {
      queryKey: [`trips`, page, search],
      queryFn: async () => {
        const res = await getAllTrips({ limit, page, search })
        return res
      },
      placeholderData: keepPreviousData
    }
  )
}

// Delete
export const tripDelete = async (id: number) => {
  try {
    const res = await AxiosInstanceFormData.delete('admin/trips/' + id);
    return res.data
  } catch (error) {
    console.log(error);
  }
}

export const useTripDelete = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: tripDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`trips`] })
    }
  })
}

// Add
export const tripAdd = async (data: TripTipI) => {
  try {
    const image = data.images;
    delete data.images;
    const res = await AxiosInstance.post('admin/trips/', data);
    const resImage = await imagesUpload(image, res.data.id);
    return resImage
  } catch (error) {
    console.log(error);
  }
}

export const useTripAdd = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: tripAdd,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`trips`] })
    }
  })
}

export const imagesUpload = async (images: any, id: number) => {
  try {
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
    const res = await AxiosInstanceFormData.post('admin/trips/upload-image/' + id, formData);
    return res.data
  } catch (error) {
    console.log(error);
  }
}

// Delete image
export const imageDelete = async (id: number) => {
  try {
    const res = await AxiosInstanceFormData.delete('admin/trips/image/' + id);
    return res.data
  } catch (error) {
    console.log(error);
  }
}

export const useImageDelete = () => {
  return useMutation({
    mutationFn: imageDelete,
  })
}



// Get one
export const getOneTrip = async (id: number) => {
  try {
    const res = await AxiosInstance.get('admin/trips/' + id);
    return res.data
  } catch (error) {
    console.log(error);
  }
}

export const useGetOneTrip = (id: number) => {
  return useQuery(
    {
      queryKey: [`trips-${id}`],
      queryFn: async () => {
        const res = await getOneTrip(id)
        return res
      },
      placeholderData: keepPreviousData,
      staleTime: 1
    }
  )
}

// Update
export const tripUpdate = async (data: TripTipI) => {
  try {
    const image = data.images;
    delete data.images;
    const res = await AxiosInstance.patch('admin/trips/' + data.id, data);
    const resImage = await imagesUpload(image, data.id!);
    return resImage
  } catch (error) {
    console.log(error);
  }
}

export const useTripUpdate = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: tripUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`trips`] })
    }
  })
}