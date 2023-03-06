import { IStockItem } from '@/models/stock-item.interface';
import { IStockItemsState } from '@/models/stock-items.state'
import { ITableFilter } from '@/models/table-filter.interface'
import { defineStore } from 'pinia'
import repository from './repository.json';

const mockData: IStockItem[] = repository;

export const useAppStore = defineStore('app', {
   state: (): IStockItemsState => ({
    items: [],
    total: mockData.length,
    loading: true,
   }),
  actions: {
    loadItems({ itemsPerPage, page, sortBy }: ITableFilter) {
      this.loading = true;
      new Promise((resolve) => {
        setTimeout(() => {
          const items = [...mockData];
          const slice = (page - 1) * itemsPerPage;
          this.items = items.slice(slice, slice + itemsPerPage)
          this.loading = false
          resolve(true)
        }, 2000)
      })
    },
  },
})
