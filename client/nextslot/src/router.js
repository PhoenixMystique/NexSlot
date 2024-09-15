import { createRouter, createWebHistory } from 'vue-router';
import BookEvent from './views/BookEvent.vue';
// import ShowEvents from './views/ShowEvents.vue';

const routes = [
  {
    path: '/',
    name: 'BookEvent',
    component: BookEvent,
  }
  // {
  //   path: '/show-events',
  //   name: 'ShowEvents',
  //   component: ShowEvents,
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
