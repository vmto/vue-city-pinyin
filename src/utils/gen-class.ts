import classNames from 'classnames'
import { computed } from 'vue'

// 组件类名：前缀 + 组件名 + 自定义名
// np-button-primary

// a-b__c--d BEM
// Block
// Element
// Modifier --lg --sm

type BEMType = string | [string, 'B' | 'E' | 'M', ...unknown[]]

export default function useClassName(componentName: string) {
  const prefix = 'np'
  const componentClass = `${prefix}-${componentName}`

  // const c = (suffix: string) => `${componentClass}-${suffix}`

  const c = (...arg: BEMType[]) => {
    if (arg.length) {
      return arg.reduce((prev, cur) => {
        if (Array.isArray(cur)) {
          const str = cur[0]
          const type = cur[1]
          if (type === 'E')
            return `${prev}__${str}`
          else if (type === 'M')
            return `${prev}--${str}`
        }
        return `${prev}-${cur}`
      }, componentClass) as string
    }
    return componentClass
  }

  const ce = (e: string) => [e, 'E'] as BEMType

  const cm = (m: string) => [m, 'M'] as BEMType

  const cx = (cls: () => Record<string, boolean>) => {
    return computed(() => classNames(cls()))
  }

  return { c, ce, cm, cx }
}
