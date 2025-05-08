import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosInstance, AxiosInstanceFormData } from "../common/AxiosInstance"

// Get all mails
export const getAllMails = (page:number,limit:number) => {
  return AxiosInstance.get(`admin/mails?limit=${limit}&offset=${page * limit}`);
}

export const useGetAllMails = ({page,limit}:{page:number,limit:number}) => {
  return useQuery(
    {
      queryKey: [`mails`,page,limit],
      queryFn: ()=>getAllMails(page,limit),
      placeholderData: keepPreviousData
    }
  )
}

export const deleteMail = async (id: number) => {
  try {
    return AxiosInstanceFormData.delete('admin/mails/'+id,);
  } catch (error) {
    console.log(error);
  }
}

export const useDeleteMail = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteMail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`mails`] })
    }
  })
}