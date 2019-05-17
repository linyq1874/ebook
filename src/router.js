import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    // name: 'home',
    // component: () => import('@/views/Home')
    redirect: '/book'
  },
  {
    path: '/book',
    name: 'book',
    component: () => import('@/views/ebook/index'),
    children: [{
      path: ':fileName',
      component: () => import("@/components/book/BookReader")
    }]
  }
  ]
});
