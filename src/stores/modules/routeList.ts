import { constantRoute } from '@/router/routes'
import { defineStore } from 'pinia'
import type { menuRoutes } from './types/type'

const useRouteListStore = defineStore('routeList', {
  state: (): menuRoutes => {
    return {
      menuRoutes: constantRoute,
    }
  },
})

export default useRouteListStore
