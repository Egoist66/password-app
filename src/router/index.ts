import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: 'Home'
      },
      component: () => import('../views/HomeView.vue')
    },

    {
      path: '/about',
      name: 'about',
      meta: {
        title: 'About'
      },
      component: () => import('../views/AboutView.vue')
    },
   
  ]
})

router.beforeEach((to, from , next) => {
  document.title = to.meta.title as string
  next()
})

export default router
