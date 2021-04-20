import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/home/Home.vue';
import Category from '../views/category/Category.vue';
import Label from '../views/label/Label.vue';
import Archive from '../views/archive/Archive.vue';
import About from '../views/about/About.vue';
import Detail from '../views/detail/Detail.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
    children: [
      {path: ':category', component: Category}
    ]
  },
  {
    path: '/label',
    name: 'Label',
    component: Label,
    children: [
      {path: ':label', component: Label}
    ]
  },
  {
    path: '/archive',
    name: 'Archive',
    component: Archive,
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/articles/:id/detail',
    name: 'Detail',
    component: Detail
  }
];

const router = new VueRouter({
  routes,
});

export default router;
