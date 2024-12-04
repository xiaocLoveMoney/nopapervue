<template>
    <div class="common-layout">
        <el-container>
            <!--            <el-header-->
            <!--                style="display: flex; padding-left: 2.3%; align-items: center; background: #2E59A7; justify-content: space-between">-->
            <!--                <el-popconfirm title="打开可视化大屏" @confirm="window_href" style="padding-left: 30%">-->
            <!--                    <template #reference>-->
            <!--                        <h1 style="color: #fff">基于大数据决策系统的无纸化请假系统</h1>-->
            <!--                    </template>-->
            <!--                </el-popconfirm>-->
            <!--                <el-popconfirm title="退出登录" @confirm="logout">-->
            <!--                    <template #reference>-->
            <!--                        <el-image :src="logo" style="height: 70%; border-radius: 50%"></el-image>-->
            <!--                    </template>-->
            <!--                </el-popconfirm>-->
            <!--            </el-header>-->
            <el-main style="height: 100%; padding: 0;margin: 0">
                <el-scrollbar>
                    <router-link to="/home"></router-link>
                    <router-view/>
                </el-scrollbar>
                <br>
                <br>
            </el-main>
            <el-footer
                style="
                    position:fixed;
                    display: flex;
                    align-items: center;
                    background: #fff;
                    justify-content: space-between;
                    height: 50px;
                    border-top: 1px solid #ccc;
                    width: 100%;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    padding: 0 50px;
                    z-index: 100000;
                ">
                <span class="bottom-icon" @click="goto('/home')" :class="{ active: isActive('/home') }">
                    <el-icon :size="25">
                        <House/>
                    </el-icon>
                    <span style="vertical-align: middle; font-size: 12px"> 主页 </span>
                </span>
                <span class="bottom-icon" @click="goto('/attendance')" :class="{ active: isActive('/attendance') }">
                    <el-icon :size="25">
                        <Aim/>
                    </el-icon>
                    <span style="vertical-align: middle; font-size: 12px"> 考勤 </span>
                </span>
                <span class="bottom-icon" @click="goto('/my')" :class="{ active: isActive('/my') }">
                    <el-icon :size="25">
                        <User/>
                    </el-icon>
                    <span style="vertical-align: middle; font-size: 12px"> 我的 </span>
                </span>
            </el-footer>
        </el-container>
    </div>
</template>

<script>

import logo from "@/assets/img.png"
import {logout_token} from "@/API/auth";
import {ElMessage} from "element-plus";
import router from "@/router";

export default {
    name: "MenuBar",
    data() {
        return {
            ip: "",
            info: {},
            logo: logo,
        };
    },
    methods: {
        goto(path) {
            router.push(path);
        },
        getData() {
            // console.log(this.info.avatar);
        },
        logout() {
            logout_token().then(res => {
                console.log(res);
                router.back();
            }).catch(err => {
                console.log(err);
                ElMessage({
                    type: "error",
                    message: "错误, 请重试"
                })
            })
        },
        isActive(path) {
            return this.$route.path === path;
        },
    },
    created() {
        this.ip = this.$BaseIp;
        this.info = JSON.parse(localStorage.getItem("info"))
        this.getData()
    },
};
</script>

<style>
.bottom-icon {
    display: flex; align-items: center; flex-direction: column
}
</style>

<style scoped>
.bottom-icon {
    color: #666;
}

.bottom-icon.active {
    color: #409eff; /* Element Plus 主色 */
}
</style>


