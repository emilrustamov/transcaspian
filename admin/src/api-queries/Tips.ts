import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosInstance, AxiosInstanceFormData } from "../common/AxiosInstance"
import { UsefulTipsI } from "../interfaces/usefulTips/usefulTips";

export interface TableI {
  limit: number,
  page: number,
  search: string,
}

// Get all trips
export const getAllTips = ({ limit, page, search }: TableI) => {
  return AxiosInstance.get(`admin/tips?keyword=${search}&limit=${limit}&offset=${page * limit}`);
}

export const useGetAllTips = ({ limit, page, search }: TableI) => {
  return useQuery(
    {
      queryKey: [`tips`, page, search],
      queryFn: async () => {
        const res = await getAllTips({ limit, page, search })
        return res
      },
      placeholderData: keepPreviousData
    }
  )
}

// Delete
export const tipDelete = async (id: number) => {
  try {
    const res = await AxiosInstanceFormData.delete('admin/tips/' + id);
    return res.data
  } catch (error) {
    console.log(error);
  }
}

export const useTipDelete = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: tipDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`tips`] })
    }
  })
}

// Add
export const tipAdd = async (data: { title: string, description: string }) => {
  try {
    const res = await AxiosInstance.post('admin/tips/', data);
    return res
  } catch (error) {
    console.log(error);
  }
}

export const useTipAdd = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: tipAdd,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`tips`] })
    }
  })
}


// Get one
export const getOneTip = async (id: number) => {
  try {
    const res = await AxiosInstance.get('admin/tips/' + id);
    return res.data
  } catch (error) {
    console.log(error);
  }
}

export const useGetOneTip = (id: number) => {
  return useQuery(
    {
      queryKey: [`tips-${id}`],
      queryFn: async () => {
        const res = await getOneTip(id)
        return res
      },
      placeholderData: keepPreviousData,
      staleTime: 1
    }
  )
}

// Update
export const tipUpdate = async (data: UsefulTipsI) => {
  try {
    const res = await AxiosInstance.patch('admin/tips/' + data.id, data);
    return res
  } catch (error) {
    console.log(error);
  }
}

export const useTipUpdate = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: tipUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`tips`] })
    }
  })
}