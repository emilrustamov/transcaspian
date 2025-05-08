import { t } from 'i18next';
import React, { useEffect, useState } from 'react';

function Pagination({
  offset = 0,
  limit = 10,
  count = 0,
  page = 0,
  setPage = () => { },
  setOffset,
}: {
  offset?: number,
  limit?: number,
  count?: number,
  setOffset?: React.Dispatch<React.SetStateAction<number>>
  page?: number,
  setPage?: (page: number) => void,
}) {

  const leftAction = () => {
    if (page > 0) {
      setPage(page - 1)
    }
  }

  const rightAction = () => {
    const maxPage = Math.ceil(count / limit);
    if (page < maxPage - 1) {
      setPage(page + 1)
    }
  }

  return (
    <div className='pagination py-3 px-4 flex items-center justify-between'>
      <div className="pagination_result">Showing results <b>{count > 0 ? (page * limit + 1) : 0}-{count >= 0 ? (count > (page + 1) * limit ? (page + 1) * limit : count) : 0}</b> of <b>{count}</b> entries</div>
      <div className="pagination_actions flex">
        <button onClick={leftAction} disabled={page === 0} className={'h-10 w-10 flex items-center justify-center bg-gray-100 rounded-full mr-3 ' + (page !== 0 ? 'opacity-[1] hover:bg-gray-200 active:bg-gray-100' : 'opacity-[0.5] cursor-not-allowed')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M11.3536 1.64645C11.5488 1.84171 11.5488 2.15829 11.3536 2.35355L5.70711 8L11.3536 13.6464C11.5488 13.8417 11.5488 14.1583 11.3536 14.3536C11.1583 14.5488 10.8417 14.5488 10.6464 14.3536L4.64645 8.35355C4.45118 8.15829 4.45118 7.84171 4.64645 7.64645L10.6464 1.64645C10.8417 1.45118 11.1583 1.45118 11.3536 1.64645Z" fill="black" />
          </svg>
        </button>
        <button onClick={rightAction} disabled={page * limit >= count} className={'h-10 w-10 flex items-center justify-center bg-gray-100 rounded-full ' + (page) + ' ' + (!((page + 1) * limit >= count) ? 'opacity-[1] hover:bg-gray-200 active:bg-gray-100' : 'opacity-[0.5] cursor-not-allowed')}>
          <svg className='rotate-180' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M11.3536 1.64645C11.5488 1.84171 11.5488 2.15829 11.3536 2.35355L5.70711 8L11.3536 13.6464C11.5488 13.8417 11.5488 14.1583 11.3536 14.3536C11.1583 14.5488 10.8417 14.5488 10.6464 14.3536L4.64645 8.35355C4.45118 8.15829 4.45118 7.84171 4.64645 7.64645L10.6464 1.64645C10.8417 1.45118 11.1583 1.45118 11.3536 1.64645Z" fill="black" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
