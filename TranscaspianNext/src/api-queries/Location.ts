import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { AxiosInstance } from "../common/AxiosInstance"


// Get all locations
export const getLocations = async () => {
  try {
    const res = await AxiosInstance.get(`public/static`);
    return res;
  } catch (error: any) {
    const err = error?.response?.data?.message
    console.log(err)
  }
}

export const useGetLocations = () => {
  return useQuery(
    {
      queryKey: [`locations`],
      queryFn: async () => {
        const res = await getLocations();
        return res
      },
      placeholderData: keepPreviousData
    }
  )
}


// Get One
export const getOneLocation = async (id: number) => {
  try {
    const res = await AxiosInstance.get(`public/static/${id}`);
    return res;
  } catch (error: any) {
    const err = error?.response?.data?.message
    console.log(err);
  }
}

export const useGetOneLocation = (id: number) => {
  return useQuery(
    {
      queryKey: [`location-${id}`],
      queryFn: async () => {
        const res = await getOneLocation(id);
        return res
      },
      placeholderData: keepPreviousData
    }
  )
}