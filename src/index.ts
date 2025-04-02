import type { App, Plugin } from 'vue'
import * as components from './components'

// 按需导入
// import { CitySelect } from 'city-select'
export * from './components'

// 批量 全局注册
// import CitySelect from 'city-select'
// app.use(CitySelect)
export default {
  install(app: App) {
    Object.entries(components).forEach(([_name, comp]) => {
      // console.log(_name, comp)
      if (comp.install)
        app.use(comp as any)
    })
    app.component('')
  },
} as Plugin
