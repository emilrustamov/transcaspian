import { motion } from "framer-motion";
import Box from "../../components/layout/Box";
import { useFileUpload, useGalleryFileDelete, useGetAllFiles } from "../../api-queries/Gallery";
import SimpleVideo from "../../components/Form/SimpleVideo";
import SimpleImage from "../../components/Form/SimpleImage";
import { image } from "../../utils/files/image";
import { video } from "../../utils/files/video";
import { useState } from "react";
function GalleryPage() {
  const fileUpload = useFileUpload();
  const files = useGetAllFiles();
  const deleteFile = useGalleryFileDelete();
  const [loadingLen, setLoadingLen] = useState(0);

  const uploadFiles = ({ target }: any) => {
    const { files } = target;
    setLoadingLen(files.length);
    fileUpload.mutate(files)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Box>
        <h1 className='font-semibold text-2xl mb-5'>Gallery</h1>

        <div className="grid grid-cols-4 gap-5">
          {
            files.data?.data.map((file: { file: string, id: number, type: "image" | 'video' }, index: number) => {
              if (file.type === 'image') {
                return (
                  <div key={index} className="bg-gray-100 rounded flex items-center justify-center">
                    <SimpleImage deleteImage={deleteFile.mutate} success={deleteFile.isSuccess} id={file.id} image={image(file.file)} />
                  </div>
                )
              } else if (file.type === 'video') {
                return (
                  <div key={index} className="bg-gray-100 rounded flex items-center justify-center">
                    <SimpleVideo deleteVideo={deleteFile.mutate} success={deleteFile.isSuccess} id={file.id} video={video(file.file)} className="h-[200px]" />
                  </div>
                )
              }
            })
          }
          {
            fileUpload.isPending && Array(loadingLen).fill(null).map((val, index) => (
              <div key={index} className="bg-gray-100 rounded flex items-center justify-center">
                <div role="status">
                  <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-100 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                </div>
              </div>
            ))
          }
        </div>

        <label
          htmlFor="upload"
          className="cursor-pointer fixed right-10 bottom-20 text-3xl text-white font-semibold rounded-full bg-green-500 hover:bg-green-400 active:bg-green-500 shadow-xl flex items-center justify-center h-14 w-14">
          <svg width="20" height="20" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 0C4.27614 0 4.5 0.223858 4.5 0.5V3.5H7.5C7.77614 3.5 8 3.72386 8 4C8 4.27614 7.77614 4.5 7.5 4.5H4.5V7.5C4.5 7.77614 4.27614 8 4 8C3.72386 8 3.5 7.77614 3.5 7.5V4.5H0.5C0.223858 4.5 0 4.27614 0 4C0 3.72386 0.223858 3.5 0.5 3.5H3.5V0.5C3.5 0.223858 3.72386 0 4 0Z" fill="white" />
          </svg>
        </label>
        <input type="file" id="upload" multiple onChange={uploadFiles} accept="image/*,video/*" className="hidden" />
      </Box>
    </motion.div>
  );
}

export default GalleryPage;
