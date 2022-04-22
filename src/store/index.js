import Vue from 'vue';
import Vuex from 'vuex';
import volume from '@/data/volume.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    players: {},
    volumeList: {
      dusk: [],
      night: [],
    },
  },
  mutations: {
    addPlayers(state, payload) {
      state.players = payload;
      this.commit('createVolume');
    },
    createVolume(state) {
      let volumeKey = {};
      state.players.forEach((ele) => {
        ele.volumeKey.forEach((key) => {
          if (!volumeKey[key]) {
            volumeKey[key] = key;
          }
        });
      });
      if (volumeKey.assassin && volumeKey.apprenticeAssassin) {
        delete volumeKey.assassin;
      }
      for (let key in volumeKey) {
        state.volumeList[volume[key].stage].push(volume[key]);
      }
      state.volumeList.dusk.sort((a, b) => a.order - b.order);
      state.volumeList.night.sort((a, b) => a.order - b.order);
      console.log(state.volumeList);
    },
  },
  actions: {},
  modules: {},
});
