<!--
 * @Author: makotoo
 * @Date: 2022-04-21 23:16:35
 * @LastEditTime: 2022-04-21 23:48:59
 * @LastEditors: makotoo
 * @Description: 
 * @FilePath: /one-night-ultimate/src/views/Home.vue
-->
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <button @click="speak">播放</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import vol from "@/data/volume.json";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  methods: {
    speak() {
      console.log(vol);
      let speechInstance = new SpeechSynthesisUtterance(vol[0].startVolume);
      speechSynthesis.speak(speechInstance);
    },
  },
};
</script>
