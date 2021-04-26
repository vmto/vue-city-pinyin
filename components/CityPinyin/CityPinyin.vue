<template>
  <div>
    <label for="city" v-if="msg">{{msg}}：</label>
    <div
        class="vue-city-picker"
        @mouseout="endChoice"
        @mouseover="startMouseOver"
    >

      <input
          id="city"
          ref='input'
          type="text"
          :value="currCityName"
          name="city"
          @blur="endChoice"
          @focus="startChoice"
          @keypress="startChoice"

      >
      <div class="vcp-panel" v-show="cityPanelIsShow">
        <h5>城市选择</h5>

        <ul class="vcp-tags">
          <li
              v-for="(item,idx) in tagsArr"
              @click="choiceTag(item)"
              :class="{'z-on': item==tagKey}"
              :key="idx"
          >
            {{ item }}
          </li>
        </ul>

        <div class="vcp-list">
          <div
              v-for="(citys, initial) in cityList"
              v-show="currTagIncludes(initial)"
              :class="{'z-hot': initial == 'hot'}"
              :key="initial"
          >
            <h6 v-if="initial !== 'hot'">{{ initial }}</h6>
            <ul>
              <li
                  v-for="(v,j) in citys"
                  @click="choiceCity(v)"
                  :title="v.name"
                  :key="j"
              >{{ v.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import cityList from 'china-city-data';

  export default {
    name: 'CityPinyin',
    props: ['msg', 'value'],
    data() {
      let tagsArr = ['热门', 'ABCDE', 'FGHJ', 'KLMN', 'PQRST', 'WXYZ'],
        tagKey = '热门',
        tags = {};
      if (this.noHot) {
        tagsArr = ['ABCD', 'EFGH', 'JKL', 'MNPQ', 'RSTW', 'XYZ'];
        tagKey = 'ABCD';
      }
      tagsArr.forEach((item) => {
        if (item === '热门') {
          tags[item] = ['hot'];
        } else {
          tags[item] = item.split('');
        }
      });
      return {
        cityPanelIsShow: false,
        isMouseOver: false,
        cityId: this.value,
        noHot: false, // 没有热门城市
        cityList,
        tagsArr,
        tagKey,
        tags,
      }
    },
    watch: {
      value(val) {
        this.cityId = val;
      },
      cityId(val) {
        this.$emit("on-change", val);
      }
    },
    computed: { // 当前城市名字
      currCityName() {
        let {cityId, cityList} = this, cityName = '';
        Object.keys(cityList).forEach((item) => {
          cityList[item].forEach((item) => {
            if (cityId == item.id) {
              cityName = item.name;
            }
          })
        });
        return cityName;
      },
      currTag() {
        let {tagKey, tags} = this;
        return tags[tagKey];
      }
    },
    methods: {
      // 列表是否属于当前标签
      currTagIncludes(ini) {
        let {currTag} = this;
        return currTag.includes(ini);
      },
      // 选择标签
      choiceTag(key) {
        this.tagKey = key;
      },
      // 开始城市选择
      startChoice(e) {
        if (e && e.type == 'keypress') {
          e.returnValue = false;
        }
        this.cityPanelIsShow = true;
      },
      // 鼠标离开城市选择区域时超过一定时间，关闭城市面板
      endChoice(e) {
        let that = this, inputEle = that.$refs.input;
        if (e.type == 'mouseout') {
          that.isMouseOver = false;
        }
        setTimeout(function () {
          if (!that.isMouseOver && inputEle != document.activeElement) {
            that.cityPanelIsShow = false;
          }
        }, 300);
      },
      // 选中de数据
      choiceCity(item) {
        this.cityId = item.id;
        // this.$emit('on-change', item.id);
        // console.log(145, item.id, item.name);

        // 关闭选择区域
        this.isMouseOver = true;
        this.cityPanelIsShow = false;
      },
      startMouseOver() {
        this.isMouseOver = true;
      }
    }
  }
</script>

<style scoped>
  .vue-city-picker {
    margin: 0;
    padding: 0;
    color: #555;
    position: relative;
  }

  .vue-city-picker li {
    list-style-type: none;
  }

  .vue-city-picker input {
    display: block;
    width: 245px;
    height: 28px;
    padding-left: 6px;
    border: 1px solid #ddd;
    outline: none;
    font-size: 14px;
  }

  .vue-city-picker .vcp-panel {
    position: absolute;
    z-index: 99999;
    left: 0;
    padding: 12px 10px 0;
    width: 360px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.18);
    overflow: hidden;
    background-color: #FFF;
    animation: vueCityPicker 0.1s ease-out;
  }

  .vcp-panel * {
    margin: 0;
    padding: 0;
    box-sizing: content-box;
  }

  .vcp-panel h5 {
    margin-bottom: 5px;
    padding-left: 2px;
    color: #aaa;
    line-height: 1.5;
    font-weight: normal;
  }

  .vcp-panel .vcp-tags {
    margin: 5px 0;
    overflow: hidden;
  }

  .vcp-panel .vcp-tags li {
    float: left;
    width: 60px;
    line-height: 20px;
    background-color: #f2f2f3;
    text-align: center;
    border-left: 1px solid #fff;
    cursor: pointer;
    box-sizing: border-box;
  }

  .vcp-panel .vcp-tags li:first-child {
    border-left: none;
  }

  .vcp-panel .vcp-tags li:hover {
    color: #d0000e;
  }

  .vcp-panel .vcp-tags li.z-on {
    background-color: #d0000e;
    color: #fff;
  }

  .vcp-panel .vcp-list {
    overflow: hidden;
    border-bottom: 10px solid #fff;
  }

  .vcp-panel .vcp-list > div {
    margin: 1px 0 -1px;
    padding: 5px 0;
    line-height: 24px;
    border-bottom: 1px dashed #eee;
    overflow: hidden;
  }

  .vcp-panel .vcp-list h6 {
    float: left;
    width: 30px;
    padding-left: 5px;
    font-weight: normal;
    font-size: 13px;
    color: #d0000e;
  }

  .vcp-panel .vcp-list ul {
    overflow: hidden;
  }

  .vcp-panel .vcp-list ul li {
    float: left;
    padding-left: 4px;
    width: 60px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;
  }

  .vcp-panel .vcp-list ul li:hover {
    color: #d0000e;
    background-color: #f2f2f3;
  }

  .vcp-panel .vcp-list > div.z-hot {
    padding-left: 10px;
  }

  .vcp-panel .vcp-list > div.z-hot ul li {
    padding-left: 6px;
  }

  @keyframes vueCityPicker {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0);
    }

    100% {
      opacity: 1;
      transform: translate(0) scale(1);
    }
  }
</style>
