import Vue from 'vue';
import VueRouter from 'vue-router';
import http from '../network/http';
import Main from '../views/Main.vue';
import UserList from '../views/users/UserList';
import CreateUser from '../views/users/CreateUser.vue';
import ArticleList from '../views/articles/ArticleList.vue';
import CreateArticle from '../views/articles/CreateArticle.vue';
import CreateLabel from '../views/labels/CreateLabel.vue';
import LabelList from '../views/labels/LabelList.vue';
import Login from '../views/login/Login.vue';
import CreateCategory from '../views/category/CreateCategory.vue';
import CategoryList from '../views/category/CategoryList.vue';
import About from '../views/about/About.vue';
import ProjectList from '../views/about/project/ProjectList.vue';
import ProjectCreate from '../views/about/project/ProjectCreate.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { path: '/users/list', component: UserList },
      { path: '/users/create', component: CreateUser },
      { path: '/articles/list', component: ArticleList },
      {
        name: 'articles_create',
        path: '/articles/create',
        component: CreateArticle,
      },
      { path: '/labels/list', component: LabelList },
      { path: '/labels/create', component: CreateLabel },
      { path: '/category/list', component: CategoryList },
      { path: '/category/create', component: CreateCategory },
      { path: '/about',  component: About },
      { path: '/about/project/list', component: ProjectList },
      { path: '/about/project/create', component: ProjectCreate }
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach(async (to, from, next) => {
  const token = window.localStorage.getItem('token');

  if (to.path === '/login') {
    if (token) return next('/');
    return next();
  } else {
    const result = await http.post('/login/token', token);
    if (result.status !== 200) {
      window.localStorage.removeItem('token');
      return next('/login');
    }
  }
  if (!token) return next('/login');
  next();
});

export default router;
