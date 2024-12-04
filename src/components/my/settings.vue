<template>
    <div>
        <header style="height: 40px;background: #fff;">
            <el-icon :size="20" style="position: absolute; left: 10px; color: #ccc" @click="back()"><ArrowLeft /></el-icon>
            <h4>设置</h4>
        </header>
    </div>
</template>

<script>

import router from "@/router";

export default {
    name: router,
    data() {
        return {
            ip: "",
        };
    },
    methods: {
        getData() {
            console.log(123123)
        },
        back() {
            router.back();
        }
    },
    created() {
        this.ip = this.$BaseIp;
        this.getData()
    },
};
</script>

<style>
</style>


