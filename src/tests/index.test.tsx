// @ts-nocheck
import { expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CitySelect from '../components/city-select/city-select.vue'

describe('citySelect', () => {
  it('should work', () => {
    console.log(CitySelect)

    const wrapper = mount(<CitySelect data="{id: '', name: ''}" msg="出发城市" />)
    const inputEl = wrapper.find('input')
    const hasPrimary = inputEl.element.classList.contains('np-city-input')

    expect(hasPrimary).toBe(true)
    wrapper.unmount()
  })
})
