import { createRouter, createWebHistory } from 'vue-router';

// 导入各个页面组件
import Login from '../components/home/login.vue';
import Home from '../components/home/index.vue';
import MenuBar from '../components/menubar.vue';
import Table from '../components/home/table.vue';
import My from '../components/my/index.vue';
import Attendance from '../components/attendance/index.vue';
import SetPassWd from '../components/my/setpasswd.vue';
import Settings from '../components/my/settings.vue';
import CreateLeave from '../components/home/createLeave.vue';

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
        },{
            path: '/my',
            component: My
        },{
            path: '/attendance',
            component: Attendance
        },]
    },{
        path: '/table',
        component: Table,
    },{
        path: '/setpasswd',
        component: SetPassWd,
    },{
        path: '/settings',
        component: Settings,
    },{
        path: '/createleave',
        component: CreateLeave,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
