import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { AxiosInstance } from "../common/AxiosInstance"

// Get all files
export const getAboutUs = () => {
  return AxiosInstance.get('public/about-us');
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