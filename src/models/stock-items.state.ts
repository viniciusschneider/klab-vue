import { IStockItem } from "./stock-item.interface";

export interface IStockItemsState {
  items: IStockItem[]
  total: number
  loading: boolean
}
