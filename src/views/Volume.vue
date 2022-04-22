<template>
  <div class="volume">
    <mtd-button @click="back">返回</mtd-button>
    <audio :src="music.info.mp3url" ref="audio" loop></audio>
    <!-- <div v-if="currentIndex !== -1">
      <div v-if="playList[currentIndex].name !== 'transition'">
        <p>现在的阶段：{{ playList[currentIndex].stage }}</p>
        <p>现在行动的角色：{{ playList[currentIndex].name }}</p>
        <p>现在要做的行动：{{ playList[currentIndex].volume }}</p>
      </div>
      <div v-else>现在是黄昏过渡到夜晚的阶段</div>
    </div>
    <div v-else>准备开始</div> -->
    <div v-if="currentStage === 'dusk'">
      <p>现在的阶段：黄昏</p>
      <p>现在行动的角色：{{ duskVolumeList[currentPlayerIndex].name }}</p>
      <p>
        现在要做的行动：{{
          duskVolumeList[currentPlayerIndex].volume[currentVolumeIndex]
        }}
      </p>
    </div>
    <div v-if="currentStage === 'transition'">
      <p>现在的阶段：过渡</p>
      <p>现在是黄昏过渡到夜晚的阶段</p>
      <p>现在要做的行动：{{ transition[currentVolumeIndex] }}</p>
    </div>
    <div v-if="currentStage === 'night'">
      <p>现在的阶段：夜晚</p>
      <p>现在行动的角色：{{ nightVolumeList[currentPlayerIndex].name }}</p>
      <p>
        现在要做的行动：{{
          nightVolumeList[currentPlayerIndex].volume[currentVolumeIndex]
        }}
      </p>
    </div>
    <div v-if="currentStage === 'end'">
      <p>天亮了，开始撕逼吧</p>
    </div>
  </div>
</template>

<script>
// import volume from '@/data/volume.json';
export default {
  name: 'volumePlay',
  data() {
    return {
      dusk: [],
      night: [],
      transition: [
        '所有人，醒来并且秘密的查看自己的标记',
        '所有人，闭上你们的眼睛',
      ],
      playList: [],
      currentStage: 'dusk',
      currentPlayerIndex: 0,
      currentVolumeIndex: -1,
      timer: null,
    };
  },
  computed: {
    players() {
      return this.$store.state.players;
    },
    duskVolumeList() {
      return this.$store.state.volumeList.dusk;
    },
    nightVolumeList() {
      return this.$store.state.volumeList.night;
    },
    music() {
      return this.$store.state.music;
    },
  },
  mounted() {
    // this.playList = this.initVolume();
    // this.speak();
    // this.timer = setInterval(this.speakVolume, 30 * 1000);
    this.speakVolume();
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  methods: {
    playDusk() {
      this.currentVolumeIndex++;
      let msg =
        this.duskVolumeList[this.currentPlayerIndex].volume[
          this.currentVolumeIndex
        ];
      this.speak(msg);
      if (
        this.currentVolumeIndex >=
        this.duskVolumeList[this.currentPlayerIndex].volume.length - 1
      ) {
        this.currentVolumeIndex = -1;
        this.currentPlayerIndex++;
        if (this.currentPlayerIndex >= this.duskVolumeList.length) {
          this.currentPlayerIndex = 0;
          this.currentStage = 'transition';
        }
        clearInterval(this.timer);
        this.timer = null;
        this.speakVolume();
      }
    },
    playNight() {
      this.currentVolumeIndex++;
      let msg =
        this.nightVolumeList[this.currentPlayerIndex].volume[
          this.currentVolumeIndex
        ];
      this.speak(msg);
      if (
        this.currentVolumeIndex >=
        this.nightVolumeList[this.currentPlayerIndex].volume.length - 1
      ) {
        this.currentVolumeIndex = -1;
        this.currentPlayerIndex++;
        if (this.currentPlayerIndex >= this.nightVolumeList.length) {
          this.currentPlayerIndex = 0;
          this.currentStage = 'end';
        }
        clearInterval(this.timer);
        this.timer = null;
        this.speakVolume();
      }
    },
    speakVolume() {
      if (this.currentStage === 'dusk') {
        this.playDusk();
        this.timer = setInterval(this.playDusk, 30 * 1000);
      } else if (this.currentStage === 'transition') {
        this.currentVolumeIndex++;
        this.speak(this.transition[this.currentVolumeIndex]);
        if (this.currentVolumeIndex >= 1) {
          this.currentStage = 'night';
          this.currentVolumeIndex = -1;
          this.speakVolume();
          clearInterval(this.timer);
          this.timer = null;
        }
        this.timer = setInterval(this.speakVolume, 30 * 1000);
      } else if (this.currentStage === 'night') {
        this.playNight();
        this.timer = setInterval(this.playNight, 30 * 1000);
      }
    },
    speak(msg) {
      let speechInstance = new SpeechSynthesisUtterance(msg);
      speechSynthesis.speak(speechInstance);
      speechInstance.onend = () => {
        this.$refs.audio.play();
      };
      speechInstance.onstart = () => {
        this.$refs.audio.pause();
      };
    },
    back() {
      this.$router.push({ name: 'Start' });
    },
  },
};
</script>
<style lang="scss" scoped>
.volume {
  margin: 10px auto;
}
</style>
