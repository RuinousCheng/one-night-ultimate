<template>
  <div class="start">
    <audio :src="music.mp3url" ref="audio" loop autoplay></audio>
    <div class="music-name">{{ music.name }}</div>
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
        <span>卡牌数： {{ choose.length }};</span>
        <span>{{ player }}</span>
        <button @click="play">开始游戏</button>
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
    this.playMusic();
  },
  computed: {
    player() {
      const count = this.choose.length - 3;
      return count <= 1 ? '最少选择5张牌' : `玩家人数：${count}人`;
    },
    music() {
      return this.$store.state?.music?.info;
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
    async playMusic() {
      const res = await api.getMusicUrl();
      this.$store.commit('addMusic', res.data);
    },
    play() {
      if (this.choose.length < 5) {
        return;
      }
      this.$store.commit('addPlayers', this.choose);
      this.$router.push({ name: 'Volume' });
    },
  },
};
</script>
<style lang="scss" scoped>
.music-name {
  position: fixed;
  font-size: 24px;
  top: 20px;
  left: 20px;
  color: rgba($color: #000000, $alpha: 0.3);
  font-weight: 800;
}
.container {
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
