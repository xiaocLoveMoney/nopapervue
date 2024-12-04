// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// 引入 Element Plus 和样式
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import echarts from 'echarts';
// main.ts

// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 设置全局变量
app.config.globalProperties.$BaseIp = "http://118.89.171.26:5050";
app.config.globalProperties.$UserInfo = null;

// 全局注册 Element Plus
app.use(ElementPlus);
// 注册 Vue Router
app.use(router);
app.use(echarts);

// 创建并挂载 Vue 实例
router.isReady().then(() => {
    app.mount("#app");
});
