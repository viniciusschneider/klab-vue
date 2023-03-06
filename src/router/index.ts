import { useUserStore } from '@/store/user'
import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

const routes = [
  {
    path: '',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ) => {
    const userStore = useUserStore();
    const token = userStore.token
    
    if (to.name !== 'Login' && !token) {
      next({ name: 'Login' });
    } else if (to.name === 'Login' && !!token) {
      next({ name: 'Home' });
    } else {
      next();
    }
  }
)

export default router
