import { proxy, useSnapshot } from 'valtio';
import { devtools } from 'valtio/utils';
import { Pagination } from '@/types';

type PaginationStore = {
  globalFeed: Pagination;
  yourFeed: Pagination;
};

const defaultPagination = {
  limit: 10,
  offset: 0,
};

export const paginationStore = proxy<PaginationStore>({
  globalFeed: defaultPagination,
  yourFeed: defaultPagination,
});

export const usePaginationStore = () => useSnapshot(paginationStore);

export const changeOffset = (offset: number, key: keyof PaginationStore) => {
  paginationStore[key] = { ...paginationStore[key], offset };
};
export const changeLimit = (offset: number, key: keyof PaginationStore) => {
  paginationStore[key].offset = offset;
};

devtools(paginationStore, { name: 'paginationStore', enabled: true });
