import type { App } from 'vue'
import CitySelect from './city-select.vue'

CitySelect.install = (app: App) => {
  if (CitySelect.name != null)
    app.component(CitySelect.name, CitySelect)
}
export default CitySelect
