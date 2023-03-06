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
    itemsPerPage: 10,
    page: 1,
    sortBy: []
   }),
  actions: {
    loadItems({ itemsPerPage, page, sortBy }: ITableFilter, filter: { name: string, quantity: number | null }) {
      this.loading = true;
      new Promise((resolve) => {
        setTimeout(() => {
          let items = [...mockData];

          if (sortBy.length > 0) {
            const order = sortBy[0].order;
            (items as any).sort((a: any, b: any) => {
              if (a[sortBy[0].key] > b[sortBy[0].key]) return order === 'asc' ? 1 : -1
              if (a[sortBy[0].key] < b[sortBy[0].key]) return order === 'asc' ? -1 : 1
              return 0
            })
          }

          if (filter.name) {
            const nameLower = filter.name.toLowerCase();
            items = items.filter(item => item.name.toLowerCase().includes(nameLower))
          }

          if (filter.quantity) {
            items = items.filter(item => item.quantity > (filter.quantity as number))
          }

          this.total = items.length
          const slice = (page - 1) * itemsPerPage;
          this.items = items.slice(slice, slice + itemsPerPage)
          this.loading = false
          resolve(true)
        }, 500)
      })
    },
    setPage(page: number) {
      this.page = page
    },
  },
})
