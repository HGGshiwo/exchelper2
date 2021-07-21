import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DoExcise from '../views/DoExcise.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/do-excise/:data',
        name: 'do-excise',
        component: DoExcise,
    }
]

const router = new VueRouter({
  routes
})

export default router
