import { IStockItem } from '@/models/stock-item.interface';
import { IStockItemsState } from '@/models/stock-items.state'
import { ITableFilter } from '@/models/table-filter.interface'
import { defineStore } from 'pinia'
import repository from './repository.json';

const mockData: IStockItem[] = repository;

export const useAppStore = defineStore('app', {
   state: (): IStockItemsState => {
    const preferences = localStorage['preferences'] && JSON.parse(localStorage['preferences'])

    return {
      items: [],
      total: mockData.length,
      loading: true,
      itemsPerPage: preferences ? preferences.itemsPerPage : 10,
      page: preferences ? preferences.page : 1,
      sortBy: preferences ? preferences.sortBy : []
    }
   },
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
          items = items.slice(slice, slice + itemsPerPage)
          const config: Intl.NumberFormatOptions = {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
            currency: 'BRL',
            style: 'currency',
          };

          this.items = items.map(item => ({
            ...item,
            amount: item.amount.toLocaleString('pt-br', config)
          }))
          this.loading = false
          localStorage['preferences'] = JSON.stringify({
            filter,
            itemsPerPage,
            page,
            sortBy,
          })
          resolve(true)
        }, 500)
      })
    },
    setPage(page: number) {
      this.page = page
    },
  },
})
