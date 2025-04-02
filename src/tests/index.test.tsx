// @ts-nocheck
import { expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CitySelect from '@/components/city-select/city-select.vue'

describe('citySelect', () => {
  it('should work', () => {
    console.log(CitySelect)
    // const type = 'primary'
    // expect(type).toBe('primary')

    const wrapper = mount(<CitySelect data="{id: '', name: ''}" msg="出发城市" />)
    const inputEl = wrapper.find('input')
    const hasPrimary = inputEl.element.classList.contains('np-city-input')
    // console.log(hasPrimary, wrapper.text())

    expect(hasPrimary).toBe(true)
    wrapper.unmount()
  })

  it('size', () => {
    const wrapper = mount(<Button size="small">测试</Button>)
    const btnEl = wrapper.find('button')
    const hasPrimary = btnEl.element.classList.contains('np-button-size--small')
    expect(hasPrimary).toBe(true)
    wrapper.unmount()
  })

  it('click', () => {
    let clickState = false
    const handleClick = () => {
      clickState = true
    }
    const wrapper = mount(<Button onClick={handleClick}>测试</Button>)
    wrapper.trigger('click')
    expect(clickState).toBe(true)
    wrapper.unmount()
  })
})
