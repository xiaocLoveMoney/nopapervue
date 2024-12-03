import { createRouter, createWebHistory } from 'vue-router';

// 导入各个页面组件
import Login from '../components/home/login.vue';
import Home from '../components/home/index.vue';
import MenuBar from '../components/menubar.vue';

const routes = [
    {
        path: '/',
        component: Login
    },{
        path: '/menuBar',
        component: MenuBar,
        children: [{
            path: '/home',
            component: Home
        },]
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
