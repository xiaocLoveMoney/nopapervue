<template>
    <div>
        <h1>hello xiaoc</h1>
        <el-image :src="logo"></el-image>
    </div>
</template>

<script>

import router from "@/router";
import logo from "@/assets/logo.png"

export default {
    name: router,
    data() {
        return {
            ip: null,
            logo: logo
        }
    },
    methods: {
        getData() {
            console.log(this.ip);
        },
        btn_login() {
        }
    },
    created() {
        this.ip = this.$BaseIp
        this.getData()
    }
}
</script>

<style>
</style>
