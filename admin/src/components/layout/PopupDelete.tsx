import React from 'react';
import Popup from './Popup';
import { t } from 'i18next';

function PopupDelete({
  open,
  setOpen,
  loading = false,
  mutate = () => { },
  id = null,
}: {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  loading?: boolean,
  mutate?: any,
  id?: number | null | string | undefined
}) {
  return (
    <Popup open={open} setOpen={setOpen}>
      <div className='text-center text-xl font-semibold'>Do you really want to delete</div>
      <div className='flex justify-center mt-5'>
        <button onClick={() => mutate(id)} disabled={loading} className={'text-red-500 text-xl transition duration-200  border border-red-500 rounded-lg px-5 py-1 ' + (loading ? 'opacity-[0.5]' : 'hover:bg-red-50 active:scale-[0.95]')}>Delete</button>
      </div>
    </Popup>
  );
}

export default PopupDelete;