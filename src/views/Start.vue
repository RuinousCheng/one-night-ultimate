<!--
 * @Author: makotoo
 * @Date: 2022-04-21 23:16:35
 * @LastEditTime: 2022-04-21 23:48:59
 * @LastEditors: makotoo
 * @Description: 
 * @FilePath: /one-night-ultimate/src/views/Home.vue
-->
<template>
  <div class="start">
    <div class="container">
      <div
        v-for="(item, index) in character"
        :key="index"
        class="character-card"
        :class="{ active: item.active }"
        @click="handlerClick(item)"
      >
        {{ item.alias }}
        <span class="choose" v-show="item.active">已选</span>
      </div>
    </div>
    <div>
      <div>
        玩家人数：{{ player }}
        <mtd-button @click="play">开始游戏</mtd-button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import character from '@/data/character.json';
import { cloneDeep } from 'lodash';
import api from '@/api/api.js';

export default {
  name: 'startPage',
  data() {
    return {
      character: [],
      choose: [],
    };
  },
  mounted() {
    this.character = this.initCharacter();
  },
  computed: {
    player() {
      return this.choose.length - 3 <= 0
        ? '最少选择5张牌'
        : this.choose.length - 3 + '人';
    },
  },
  methods: {
    initCharacter() {
      let _character = cloneDeep(character);
      _character.forEach((item) => {
        item.active = false;
      });
      return _character;
    },
    handlerClick(item) {
      item.active = !item.active;
      if (item.active) {
        this.choose.push(item);
      } else {
        let index = this.choose.findIndex((ele) => ele.key === item.key);
        if (!index) {
          this.choose.splice(index, 1);
        }
      }
    },
    async play() {
      if (this.choose.length < 5) {
        return;
      }
      console.log(this.choose);
      const res = await api.getMusicUrl();
      console.log(res.data);
      this.$store.commit('addPlayers', this.choose);
      this.$store.commit('addMusic', res.data);
      this.$router.push({ name: 'Volume' });
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  // display: flex;
  // align-items: center;
  // justify-content: center;
  width: 750px;
  margin: 0 auto;
  .character-card {
    position: relative;
    display: inline-block;
    width: 150px;
    height: 150px;
    box-sizing: content-box;
    margin: 10px;
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 1%), 0 3px 6px 3px rgb(0 0 0 / 1%),
      0 2px 6px 0 rgb(0 0 0 / 3%);
    &:hover {
      cursor: pointer;
      border: 1px solid #2a8efe;
    }
    .choose {
      color: #00b365;
      position: absolute;
      right: 6px;
      bottom: 2px;
    }
  }
  .active {
    border: 1px solid #00b365;
    background: #effcf2;
  }
}
</style>
