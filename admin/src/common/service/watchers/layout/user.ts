import { create } from 'zustand';
import { UserStoreI } from '../../../../interfaces/layout/layout';

export const useUser = create<UserStoreI>((set) => ({
  user: {} as any,
  isAuth: false,
  setUser: (user:any) =>
    set({
      user,
      isAuth: true,
    })
}))