//存储网页相关配置的仓库

import { defineStore } from 'pinia'

const useSettingsStore = defineStore('settings', {
  state: () => {
    return {
      fold: false,
      refresh: false,
    }
  },
})
export default useSettingsStore
