<template>
    <div class="back-cell">
        <div style="color: white; padding-left: 8%; padding-top: 26vh">
            <h2>欢迎使用</h2>
            <h3>无纸化请假系统</h3>
        </div>
        <el-card class="box-form" style="border-radius: 22% 22% 0 0;">
            <div style="padding: 10%">
                <h3 style="color: #4a9e97; padding-bottom: 10%; text-align: center">登录</h3>
                <el-form ref="ruleFormRef" :label-position="labelPosition" label-width="auto">
                    <el-form-item label="用户名">
                        <el-input v-model="username" placeholder="请输入用户名"/>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="password" placeholder="请输入密码" type="password"/>
                    </el-form-item>
                </el-form>
                <h5 style="text-align: right;color: #4a9e97; margin-bottom: 5%">忘记密码？</h5>
                <el-button type="primary" style="width: 100%" @click="login">登录</el-button>
                <h5 style="text-align: center;color: #4a9e97; margin: 5%">没有账户？现在就去注册！</h5>
            </div>
        </el-card>
    </div>
</template>

<script>

import router from "@/router";
import {info, login} from "@/API/auth";
import {ElMessage} from "element-plus";

export default {
    name: router,
    data() {
        return {
            ip: "",
            username: "",
            password: "",
        };
    },
    methods: {
        getData() {
            console.log("Hello xiaoc!")
        },
        login() {
            login({
                username: this.username,
                password: this.password,
            }).then(res => {
                console.log(res);
                localStorage.setItem("token", res.token);
                info().then(res => {
                    console.log(res);
                    localStorage.setItem("info", JSON.stringify(res.data));
                    ElMessage({
                        type: "success",
                        message: "登录成功"
                    })
                    setTimeout(function () {
                        router.push("/home");
                    }, 1500)
                })
            }).catch(err => {
                console.log(err);
                ElMessage({
                    message: "用户名错误或密码错误",
                    type: "error"
                })
            })
        }
    },
    created() {
        this.ip = this.$BaseIp;
        this.getData()
    },
};
</script>

<style>
.back-cell {
    background: linear-gradient(.6turn, #64d3e6, #9198e5);
    width: 100%;
    height: 100vh;
}
.box-form {
    position: fixed; bottom: 0; left: 0; right: 0;
    width: 100%;
    height: 60vh;
}
</style>


