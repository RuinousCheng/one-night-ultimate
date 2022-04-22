import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Start',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Start.vue'),
  },
  {
    path: '/Volume',
    name: 'Volume',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Volume.vue'),
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
