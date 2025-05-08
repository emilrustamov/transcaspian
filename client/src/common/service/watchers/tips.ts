import { create } from 'zustand';
import { PaginationWatcherI } from '../../../interfaces/layout/layout';

export const useTipsPagination = create<PaginationWatcherI>((set) => ({
  page: 0 as number,
  limit: 10 as number,
  setPage: (page: number) =>
    set({
      page,
    }),
  setLimit: (limit: number) =>
    set({
      limit,
    }),
}))