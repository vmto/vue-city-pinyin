<script lang="ts">
import {computed, defineComponent, reactive, ref, watch} from 'vue'
import useClassName from '../../utils/gen-class'
import cityList from '../../assets/city-data.json'

interface CityType {
  id: string
  name: string
}

export default defineComponent({
  name: 'CitySelect',
  props: {
    hot: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object as () => CityType,
      required: true,
    },
  },
  emits: ['onChange'],
  setup(props, {emit}) {
    const inputRef = ref()
    const {c, cx} = useClassName('city')

    const panelActive = ref<boolean>(false)
    const isMouseOver = ref<boolean>(false)
    const tagKey = ref<string>('热门')

    const cityItem = reactive<CityType>({
      id: props.data?.id,
      name: props.data?.name,
    })

    let tagsArr: string[] = ['热门', 'ABCDE', 'FGHJ', 'KLMN', 'PQRST', 'WXYZ']
    if (!props.hot) {
      tagsArr = ['ABCD', 'EFGH', 'JKL', 'MNPQ', 'RSTW', 'XYZ']
      tagKey.value = 'ABCD'
    }

    const tags: any = {}
    tagsArr.forEach((item: string) => {
      if (item === '热门')
        tags[item] = ['hot']
      else
        tags[item] = item.split('')
    })

    // 当前标签
    const currTag = computed(() => tags[tagKey.value])

    // 当前城市名字
    const currCityName = computed(() => {
      let cityName = ''
      Object.keys(cityList).forEach((letter: string) => {
        (cityList as any)[letter].forEach((item: CityType) => {
          if (cityItem.id === item.id)
            cityName = item.name
        })
      })
      return cityName
    })

    // 鼠标离开城市选择，关闭面板
    const endChoice = ({type}: any) => {
      if (type === 'mouseout')
        isMouseOver.value = false

      setTimeout(() => {
        if (!isMouseOver.value && inputRef.value !== document.activeElement)
          panelActive.value = false
      }, 300)
    }
    const startMouseOver = () => {
      isMouseOver.value = true
    }

    // 开始城市选择
    const startChoice = (ev: any) => {
      if (ev.type === 'keypress')
        ev.returnValue = false

      panelActive.value = true
    }

    // 选择标签
    const choiceTag = (key: string) => {
      tagKey.value = key
    }

    // 列表是否当前标签
    const currTagIncludes = (initial: any) => {
      return currTag.value.includes(initial)
    }

    // 选中的数据
    const choiceCity = (item: any) => {
      cityItem.id = item.id
      cityItem.name = item.name
      // this.$emit('on-change', item);
      // console.log(150, item.id, item.name);

      // 关闭选择区域
      isMouseOver.value = true
      panelActive.value = false
    }

    watch(() => props.data, (item) => {
      cityItem.id = item?.id
      cityItem.name = item?.name
    }, {immediate: true})

    watch(cityItem, (newValue) => {
      emit('onChange', newValue)
    })

    const wrapCls = cx(() => ({
      [c('select')]: true,
    }))

    const pickerCls = cx(() => ({
      [c('inner')]: true,
    }))

    const inputCls = cx(() => ({
      [c('input')]: true,
    }))

    const panelCls = cx(() => ({
      [c('panel')]: true,
    }))

    const tagsCls = cx(() => ({
      [c('tags')]: true,
    }))

    const itemsCls = cx(() => ({
      [c('items')]: true,
    }))

    return {
      wrapCls,
      pickerCls,
      inputCls,
      panelCls,
      tagsCls,
      itemsCls,
      cityList,
      inputRef,
      isMouseOver,
      panelActive,
      cityItem,
      currTag,
      tagsArr,
      tagKey,
      currCityName,
      endChoice,
      startMouseOver,
      startChoice,
      choiceTag,
      currTagIncludes,
      choiceCity,
    }
  },
})
</script>

<template>
  <div :class="wrapCls">
    <div
        :class="pickerCls"
        @mouseout="endChoice"
        @mouseover="startMouseOver"
    >
      <input
          ref="inputRef"
          :class="inputCls"
          type="text"
          name="city"
          :value="currCityName"
          @blur="endChoice"
          @focus="startChoice"
      >
      <div v-show="panelActive" :class="panelCls">
        <h5>选择城市</h5>

        <ul :class="tagsCls">
          <li
              v-for="(item, idx) in tagsArr"
              :key="idx"
              :class="{ 'z-on': item === tagKey }"
              @click="choiceTag(item)"
          >
            {{ item }}
          </li>
        </ul>

        <div :class="itemsCls">
          <div
              v-for="(citys, initial) in cityList"
              v-show="currTagIncludes(initial)"
              :key="initial"
              :class="{ 'z-hot': initial === 'hot' }"
          >
            <h6 v-if="initial !== 'hot'">
              {{ initial }}
            </h6>
            <ul>
              <li
                  v-for="(v, j) in citys"
                  :key="j"
                  :title="v.name"
                  @click="choiceCity(v)"
              >
                {{ v.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
