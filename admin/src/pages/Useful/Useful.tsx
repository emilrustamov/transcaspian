import { useEffect, useState } from 'react';
import TableActions from '../../components/layout/TableActions';
import Popup from '../../components/layout/Popup';
import { Link, useNavigate } from 'react-router-dom';
import PopupDelete from '../../components/layout/PopupDelete';
import { Search } from '../../components/Form/Inputs';
import { motion } from 'framer-motion';
import Pagination from '../../components/layout/Pagination';
import { t } from 'i18next';
import Loading from '../../components/layout/Loading';
import Error from '../../components/layout/Error';
import { useTripTipPagination } from '../../common/service/watchers/tripTip';
import { ColumnI } from '../../interfaces/layout/layout';
import { useGetAllTips, useTipDelete } from '../../api-queries/Tips';

const cols: ColumnI[] = [
  {
    id: "id",
    label: "id",
    width: 50,
    side: 'left',
  },
  {
    id: "title",
    label: "title",
    width: 200,
    side: 'left',
  },
  {
    id: "actions",
    label: "actions",
    width: 200,
    side: 'right',
  }
]

const list: any = [

]

function UsefullPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | undefined>();
  const { limit, page, setPage, setSearch, search } = useTripTipPagination((state) => state);

  const useTips = useGetAllTips({ limit, page, search });
  const useDelete = useTipDelete();

  useEffect(() => {
    if (useDelete.isSuccess) setOpen(false)
  }, [useDelete.isSuccess])

  if (useTips.isPending) return <Loading />

  if (useTips.isError) return <Error error={useTips.error.message} />

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='shadow-xl rounded-lg bg-white overflow-hidden'>
        <div className="p-5 flex items-center justify-between">
          <div className="text-semibold text-xl">Useful</div>
          <div className='flex items-center'>
            <div className='mr-3'>
              <Search value={search} onChange={(e) => (setSearch(e.target.value), setPage(0))} />
            </div>
            <Link to={import.meta.env.VITE_API + '/Useful/add'} className="codes_action_add border rounded-lg py-2 px-4 text-gray-500 flex items-center hover:bg-gray-100 active:bg-gray-200">
              <svg className='fill-gray-500 mr-2' width="12" height="12" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 0C4.27614 0 4.5 0.223858 4.5 0.5V3.5H7.5C7.77614 3.5 8 3.72386 8 4C8 4.27614 7.77614 4.5 7.5 4.5H4.5V7.5C4.5 7.77614 4.27614 8 4 8C3.72386 8 3.5 7.77614 3.5 7.5V4.5H0.5C0.223858 4.5 0 4.27614 0 4C0 3.72386 0.223858 3.5 0.5 3.5H3.5V0.5C3.5 0.223858 3.72386 0 4 0Z" />
              </svg>
              <span>Add new</span>
            </Link>
          </div>
        </div>

        <div className="codes_table overflow-auto">
          <table className='table-auto w-full'>
            <thead>
              <tr className='bg-gray-100 text-gray-500 border-b'>
                {
                  cols.map((col: ColumnI, index: number) => (
                    <th className={'uppercase p-3 text-sm ' + ('text-' + col.side)} style={{ minWidth: `${col.width}px`, textAlign: col.side }} key={index}>{col.label}</th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {
                useTips.data.data?.tips.map((tip: any, index: number) => (
                  <tr key={index} className='hover:bg-gray-100 active:bg-gray-200'>
                    {
                      Object.values(cols).map((col, index2: number) => (
                        <td onClick={() => col.id !== 'actions' && navigate(import.meta.env.VITE_API + '/Useful/edit/' + tip.id)} className={'p-3  border-b text-sm ' + ('text-' + col.side) + (col.id !== 'actions' && ' cursor-pointer')} key={index2}>
                          {
                            col.id !== 'action' && tip[col.id]
                          }
                          {
                            col.id === 'actions' &&
                            <div className='flex justify-end'>
                              <TableActions
                                link='/Useful'
                                page={true}
                                id={tip.id}
                                setOpen={setOpen}
                                setDeleteId={setDeleteId}
                                show={false}
                              />
                            </div>
                          }
                        </td>
                      ))
                    }
                  </tr>
                ))
              }
            </tbody>
          </table>
          <Pagination count={useTips.data?.data.count} setPage={setPage} page={page} limit={limit} />
        </div>
      </motion.div>
      <PopupDelete
        open={open}
        setOpen={setOpen}
        id={deleteId}
        loading={useDelete.isPending}
        mutate={useDelete.mutate}
      />
    </>
  );
}

export default UsefullPage;
