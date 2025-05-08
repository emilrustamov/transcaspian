import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosInstance, AxiosInstanceFormData } from "../common/AxiosInstance"
import { UsefulTipsI } from "../interfaces/usefulTips/usefulTips";

export interface TableI {
  limit: number,
  page: number,
}

// Get all trips
export const getAllTips = ({ limit, page }: TableI) => {
  return AxiosInstance.get(`public/tips?limit=${limit}&offset=${page * limit}`);
}

export const useGetAllTips = ({ limit, page }: TableI) => {
  return useQuery(
    {
      queryKey: [`tips`, page],
      queryFn: async () => {
        const res = await getAllTips({ limit, page })
        return res
      },
      placeholderData: keepPreviousData
    }
  )
}