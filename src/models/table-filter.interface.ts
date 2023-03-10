export interface ITableFilter {
  page: number
  itemsPerPage: number
  sortBy: Array<{ key: string, order: 'desc' | 'asc' }>
}
