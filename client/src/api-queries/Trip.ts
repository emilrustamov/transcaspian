import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { AxiosInstance } from "../common/AxiosInstance"

export interface TableI {
  limit: number,
  page: number,
}

// Get all trips
export const getAllTrips = ({ limit, page }: TableI) => {
  return AxiosInstance.get(`public/trips?limit=${limit}&offset=${page * limit}`);
}

export const useGetAllTrips = ({ limit, page }: TableI) => {
  return useQuery(
    {
      queryKey: [`trips`, page],
      queryFn: async () => {
        const res = await getAllTrips({ limit, page })
        return res
      },
      placeholderData: keepPreviousData
    }
  )
}

// Get One
export const getOneTrip = async (id: number) => {
  try {
    const res = await AxiosInstance.get(`public/trips/${id}`);
    return res;
  } catch (error: any) {
    const err = error?.response?.data?.message
    console.log(err);
  }
}

export const useGetOneTrip = (id: number) => {
  return useQuery(
    {
      queryKey: [`trip-${id}`],
      queryFn: async () => {
        const res = await getOneTrip(id);
        return res
      },
      placeholderData: keepPreviousData
    }
  )
}