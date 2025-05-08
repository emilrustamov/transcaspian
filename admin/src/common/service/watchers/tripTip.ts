import { create } from 'zustand';
import { PaginationWatcherI } from '../../../interfaces/layout/layout';

export const useTripTipPagination = create<PaginationWatcherI>((set) => ({
  page: 0 as number,
  limit: 10 as number,
  search: '',
  setPage: (page: number) =>
    set({
      page,
    }),
  setLimit: (limit: number) =>
    set({
      limit,
    }),
  setSearch: (search: string) =>
    set({
      search,
      page: 0
    })
}))