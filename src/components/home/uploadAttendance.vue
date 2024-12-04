<template>
    <div>
        <header style="height: 40px;background: #fff;">
            <el-icon :size="20" style="position: absolute; left: 10px; color: #ccc" @click="back()"><ArrowLeft /></el-icon>
            <h4>上传学生考勤</h4>
        </header>

        <el-card style="margin: 15px;margin-top: 55px;">
            <template #header>
                <div class="card-header">
                    <label>考勤表单</label>
                </div>
            </template>
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item :title="item.student_name" :name="index" v-for="(item, index) in attendance_form"
                                  :key="index">
                    <el-radio-group v-model="item.status">
                        <el-radio value="正常到校">正常到校</el-radio>
                        <el-radio value="病假">病假</el-radio>
                        <el-radio value="事假">事假</el-radio>
                        <el-radio value="迟到">迟到</el-radio>
                        <el-radio value="早退">早退</el-radio>
                        <el-radio value="旷课">旷课</el-radio>
                    </el-radio-group>
                </el-collapse-item>
            </el-collapse>
        </el-card>
        <div style="margin: 15px; position: fixed; bottom: 0; left: 0; right: 0">
            <el-button type="primary" round style="width: 100%" @click="add_attendance_event">提交学生考勤</el-button>
        </div>
    </div>
</template>

<script>

import router from "@/router";
import {get_students, leaveslistfromdate, upload_attendance} from "@/API/auth";
import {ElLoading, ElNotification} from "element-plus";

export default {
    name: router,
    data() {
        return {
            ip: "",
            attendance_form: []
        };
    },
    methods: {
        getData() {
            console.log(123123)
            get_students().then(res => {
                console.log(res)
                this.students = res.data
                var current_date = this.get_local_date()
                leaveslistfromdate(current_date).then(res => {
                    console.log("leaveslistfromdate", res)
                    this.todayleaves = res.data
                    this.attendance_form = this.students.map(item => {
                        var status = '正常到校'
                        var date = this.get_local_date()
                        var reason = null

                        var idx = res.data.filter(item => item.status == '批准').findIndex(e => e.user_id == item.user_id)
                        if (idx != -1) {
                            status = this.todayleaves[idx].leave_type
                            reason = this.todayleaves[idx].reason
                        }
                        return {
                            student_id: item.user_id,
                            status: status,
                            date: date,
                            reason: reason,
                            student_name: item.username
                        }
                    })
                    console.log("attendance_form", this.attendance_form)
                }).catch(error => {
                    console.log(error);
                })
            }).catch(error => {
                console.log(error);
            })
        },
        get_local_date() {
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要+1
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        back() {
            router.back();
        },
        async add_attendance_event() {
            const loading = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            for await (const item of this.attendance_form) {
                console.log({
                    user_id: item.student_id,
                    status: item.status,
                    date: item.date,
                    reason: item.reason,
                })
                const result = await upload_attendance({
                    user_id: item.student_id,
                    status: item.status,
                    date: item.date,
                    reason: item.reason || '',
                })
                console.log(result)
            }
            loading.close()
            ElNotification({
                type: "info",
                title: "信息",
                message: "操作成功"
            })
            setTimeout(function () {
                router.back()

            }, 1000)
        },
    },
    created() {
        this.ip = this.$BaseIp;
        this.getData()
    },
};
</script>

<style>
</style>


