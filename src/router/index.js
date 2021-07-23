import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DoExcise from '../views/DoExcise.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/do-excise/:data',
        name: 'do-excise',
        component: DoExcise,
    },
    {
        path:'/about/:data',
        name:'about',
        component: About,
    }
]

const router = new VueRouter({
  routes
})

export default router
