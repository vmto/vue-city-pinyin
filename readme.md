# vue-city-pinyin

> Development based on webstorm2023 and volar plugin

## Install

````
pnpm add vue-city-pinyin
````

## Preview
![color](img/demo.png)

## Example

````base
# main.js

// code...

import cityPinyin from 'vue-city-pinyin';
import 'vue-city-pinyin/dist/index.css';

app.use(cityPinyin);
````

````base
<script setup lang="ts">
import { ref } from 'vue'

type CityType = {
  id: string
  name: string
}

const startCity = ref<CityType>({
  id: '',
  name: '',
})

const endCity = ref<CityType>({
  id: '',
  name: '',
})

function onChange(item: CityType, type: string) {
  if (type === 'start')
    startCity.value = item
  else
    endCity.value = item
}

function onSubmit() {
  console.log('出发城市', startCity.value);
  console.log('到达城市', endCity.value);
}
</script>

<template>
  <div class="demo">
    <div style="padding: 10px;">
      <div>出发城市</div>
      <city-select :data="startCity" @on-change="onChange($event, 'start')" hot/>
    </div>
    <div style="padding: 10px;">
      <div>到达城市</div>
      <city-select :data="endCity" @on-change="onChange($event, 'end')"/>
    </div>
    <div style="padding: 10px;">
      <np-button @click="onSubmit">获取城市</np-button>
    </div>
  </div>
</template>
````
