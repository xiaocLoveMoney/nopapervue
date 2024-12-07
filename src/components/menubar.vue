<template>
    <div class="common-layout">
        <el-container>
            <el-header
                style="display: flex; padding-left: 2.3%; align-items: center; background: #2E59A7; justify-content: space-between;">
                <el-popconfirm title="打开可视化大屏" @confirm="window_href" style="padding-left: 30%">
                    <template #reference>
                        <h1 style="color: #fff; padding: 0">基于大数据决策系统的无纸化请假系统</h1>
                    </template>
                </el-popconfirm>
                <el-popconfirm title="退出登录" @confirm="logout">
                    <template #reference>
                        <el-image :src="logo" style="height: 70%; border-radius: 50%"></el-image>
                    </template>
                </el-popconfirm>
            </el-header>
            <el-main >
                <router-link to="/home"></router-link>
                <router-view/>
            </el-main>
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
            logo: logo
        };
    },
    methods: {
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
        window_href() {
            window.location.href = "/table";
        }
    },
    created() {
        this.ip = this.$BaseIp;
        this.info = JSON.parse(localStorage.getItem("info"))
        this.getData()
    },
};
</script>

<style>
</style>


