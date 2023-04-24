import MainPage from "../components/MainPage.vue";
import AboutPage from "../components/AboutPage.vue";

const routes = [
    {
        path: '/',
        component: () => import('../components/MainPage.vue')
    },
    {
        path: '/about',
        component: () => import('../components/AboutPage.vue')
    },
]

export const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
})
