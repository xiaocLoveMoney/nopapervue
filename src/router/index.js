import { createRouter, createWebHistory } from 'vue-router';

// 导入各个页面组件
import Home from '../components/home/template.vue';

const routes = [{
        path: '/',
        component: Home
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
