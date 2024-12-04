<template>
    <div>
        <div
            style="height: 40vh; background: linear-gradient(#64ace6, #EAEDF1);position: fixed; top: 0px; width: 100%; z-index: -1;"/>
        <div style="margin: 7%; margin-top: 20%; display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center;">
                <el-avatar size="large" shape="square" :src="ip + info.avatar"/>
                <span style="font-weight: bold; margin-left: 15px">{{ info.username }}</span>
            </div>
            <div style="display: flex; align-items: center;">
                <el-icon :size="15">
                    <FullScreen/>
                </el-icon>
                <el-icon :size="15">
                    <ArrowRight/>
                </el-icon>
            </div>
        </div>
        <el-card style="margin: 15px; border-radius: 15px;">
            <el-descriptions direction="vertical" :column="2">
                <el-descriptions-item label="姓名">{{ info.username }}</el-descriptions-item>
                <el-descriptions-item label="学籍号">{{ info.stu_id || "暂无数据" }}</el-descriptions-item>
            </el-descriptions>
        </el-card>
        <el-card style="margin: 15px; border-radius: 15px;">
            <el-descriptions direction="vertical" :column="2">
                <el-descriptions-item label="班级">{{ info.class_name }}</el-descriptions-item>
                <el-descriptions-item label="系部">{{ info.department_name }}</el-descriptions-item>
                <el-descriptions-item label="手机号">{{ info.phone }}</el-descriptions-item>
                <el-descriptions-item label="标签">
                    <el-tag type="success" v-for="(item, index) in info.role_names" :key="index">{{ item }}</el-tag>
                </el-descriptions-item>
            </el-descriptions>
        </el-card>
        <el-menu style="margin: 15px; border-radius: 15px;">
            <el-menu-item @click="goto('/setpasswd')">
                <el-icon><EditPen /></el-icon>
                <span>修改密码</span>
            </el-menu-item>
            <el-menu-item @click="goto('/settings')">
                <el-icon><Setting /></el-icon>
                <span>设置</span>
            </el-menu-item>
        </el-menu>
        <div style="margin: 15px; border-radius: 15px;">
            <el-button type="primary" round @click="logout" style="width: 100%">退出登录</el-button>
        </div>
    </div>
</template>

<script>

import router from "@/router";
import {logout_token} from "@/API/auth";
import {ElMessage} from "element-plus";

export default {
    name: router,
    data() {
        return {
            ip: "",
            info: {}
        };
    },
    methods: {
        getData() {
            console.log(123123)
        },
        goto(path) {
            router.push(path);
        },
        logout() {
            logout_token().then(res => {
                console.log(res);
                ElMessage({
                    type: "success",
                    message: "操作成功"
                })
                setTimeout(() => {
                    router.push('/');
                },500)
            })
        }
    },
    mounted() {
        this.ip = this.$BaseIp;
        this.info = JSON.parse(localStorage.getItem("info"));
        this.getData()
    },
};
</script>

<style>
</style>


