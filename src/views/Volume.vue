<template>
  <div class="volume">
    <audio :src="music.info.mp3url" ref="audio" loop></audio>
    <div>
      <p>现在的阶段：{{ stage }}</p>
      <p>现在行动的角色：{{ player }}</p>
      <p>现在要做的行动：{{ behavior }}</p>
    </div>
    <mtd-button @click="back">返回</mtd-button>
  </div>
</template>

<script>
// import volume from '@/data/volume.json';
export default {
  name: 'volumePlay',
  data() {
    return {
      transition: [
        '所有人，醒来并且秘密的查看自己的标记',
        '所有人，闭上你们的眼睛',
      ],
      end: [
        '所有人保持闭着你们的眼睛，然后将你们的牌稍微一动一下。所有人，醒来！',
      ],
      stage: '',
      player: '',
      behavior: '',
      script: true,
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

    /* 播报的入口 */
    this.speakVolume();
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  methods: {
    sleep(delay) {
      return new Promise((resolve) => {
        setTimeout(resolve, delay);
      });
    },
    async speakVolume() {
      /* 
        虚拟主持人将从这里开始播报：
        1. dusk （黄昏） 阶段
        2. Transition （过渡）阶段
        3. Night （夜晚）阶段
        4. end （结束）阶段
        4. 每个阶段先轮询这个阶段的角色，然后轮询这个角色的语音。
        每段语音之间间隔30s。
      */
      let interval = 10 * 1000; // 语音之间的间隔

      // 黄昏阶段
      this.stage = '黄昏';
      for (let i = 0; i < this.duskVolumeList.length; i++) {
        for (let j = 0; j < this.duskVolumeList[i].volume.length; j++) {
          this.player = this.duskVolumeList[i].name;
          this.behavior = this.duskVolumeList[i].volume[j];
          await this.speak(this.duskVolumeList[i].volume[j]);
          await this.sleep(interval);
        }
      }

      // 过渡阶段
      this.stage = '过渡';
      for (let i = 0; i < this.transition.length; i++) {
        this.player = '所有人';
        this.behavior = this.transition[i];
        await this.speak(this.transition[i]);
        await this.sleep(interval);
      }

      // 夜晚阶段
      this.stage = '黄昏';
      for (let i = 0; i < this.nightVolumeList.length; i++) {
        for (let j = 0; j < this.nightVolumeList[i].volume.length; j++) {
          this.player = this.nightVolumeList[i].name;
          this.behavior = this.nightVolumeList[i].volume[j];
          await this.speak(this.nightVolumeList[i].volume[j]);
          await this.sleep(interval);
        }
      }

      // 结束阶段
      this.stage = '结束';
      this.player = '所有人';
      this.behavior = this.end[0];
      await this.speak(this.end[0], false);
    },
    speak(msg, playMusic = true) {
      let speechInstance = new SpeechSynthesisUtterance(msg);
      this.synth = speechInstance;
      speechInstance.onstart = () => {
        this.$refs.audio.pause();
      };
      speechSynthesis.speak(speechInstance);
      return new Promise((resolve) => {
        speechInstance.onend = () => {
          console.log(playMusic);
          playMusic ? this.$refs.audio.play() : null;
          resolve();
        };
      });
    },
    back() {
      this.$router.push({ name: 'Start' });
      speechSynthesis.cancel();
    },
  },
};
</script>
<style lang="scss" scoped>
.volume {
  margin: 10px auto;
}
</style>
