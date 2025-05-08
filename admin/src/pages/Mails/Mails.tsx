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
import { useMailsPagination } from '../../common/service/watchers/mails';
import { ColumnI } from '../../interfaces/layout/layout';
import { useDeleteMail, useGetAllMails } from '../../api-queries/Mails';

const cols: ColumnI[] = [
  {
    id: "id",
    label: "id",
    width: 50,
    side: 'left',
  },
  {
    id: "name",
    label: "name",
    width: 200,
    side: 'left',
  },
  {
    id: "mail",
    label: "mail",
    width: 200,
    side: 'left',
  },
  {
    id: "text",
    label: "text",
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

function MailsPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | undefined>();
  const { limit, page, setPage } = useMailsPagination((state) => state);

  const useMails = useGetAllMails({ limit, page });
  const useDelete = useDeleteMail();

  useEffect(() => {
    if (useDelete.isSuccess) setOpen(false)
  }, [useDelete.isSuccess])

  if (useMails.isPending) return <Loading />

  if (useMails.isError) return <Error error={useMails.error.message} />

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='shadow-xl rounded-lg bg-white overflow-hidden'>
        <div className="p-5 flex items-center justify-between">
          <div className="text-semibold text-xl">Mails</div>
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
                useMails.data.data?.tips.map((tip: any, index: number) => (
                  <tr key={index} className='hover:bg-gray-100 active:bg-gray-200'>
                    {
                      Object.values(cols).map((col, index2: number) => (
                        <td className={'p-3  border-b text-sm ' + ('text-' + col.side) + (col.id !== 'actions' && ' ')} key={index2}>
                          {
                            col.id !== 'action' && tip[col.id]
                          }
                          {
                            col.id === 'actions' &&
                            <div className='flex justify-end'>
                              <TableActions
                                page={false}
                                edit={false}
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
          <Pagination count={useMails.data?.data.count} setPage={setPage} page={page} limit={limit} />
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

export default MailsPage;
