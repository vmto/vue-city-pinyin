import type { App } from 'vue'
import * as components from './components'
import pkg from '../package.json'

// 按需导入
// import { CitySelect } from 'city-select'
export * from './components'

// 批量 全局注册
// import CitySelect from 'city-select'
// app.use(CitySelect)
export default {
  install(app: App) {
    Object.entries(components).forEach(([name, comp]) => {
      // console.log(name, comp)
      if (comp.install)
        app.use(comp as any)
      else
        app.component(name, comp)
    })
  },
  version: pkg.version
}
