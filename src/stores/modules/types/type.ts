import type { RouteRecordRaw } from 'vue-router'

//定义仓库中数据state类型
export interface userState {
  token: string | null
  username: string
  avatar: string
}
export interface menuRoutes {
  menuRoutes: RouteRecordRaw[]
}
