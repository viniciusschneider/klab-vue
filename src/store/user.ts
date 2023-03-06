import { defineStore } from 'pinia'
import { IUserState } from '@/models/user.state'

export const useUserStore = defineStore('user', {
   state: (): IUserState => ({
    token: localStorage['token'] || ''
   }),
  actions: {
    setToken(token: string) {
      localStorage['token'] = token
      this.token = token;
    },
    logout() {
      this.token = '';
      localStorage.clear()
    }
  },
})
