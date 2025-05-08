export interface RouteI {
  link?: string,
  linkName?: string,
  icon: any,
  dropdownName?: string,
  dropdown?: dropdown[]
}

export interface dropdown {
  link: string,
  linkName: string,
}

export interface ColumnI {
  id: string,
  label: string,
  width: number,
  side: 'left' | 'right' | 'center'
}

export interface PaginationWatcherI {
  limit: number,
  page: number,
  search: string,
  setPage: (page: number) => void,
  setLimit: (limit: number) => void,
  setSearch: (search: string) => void,
}

export interface UserStoreI {
  user: any,
  isAuth: boolean,
  setUser: (user: any) => void,
}