import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { AxiosInstance } from "../common/AxiosInstance"

// Get all files
export const getAllFiles = () => {
  return AxiosInstance.get('public/gallery?limit=1');
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