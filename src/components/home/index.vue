<template>
    <div style="height: 100%">
        <el-row>
            <el-col :span="12" style="padding-right: .5%; height: 45vh">
                <el-card style="height: 100%">
                    <template #header>
                        <div class="card-header">
                            <h3>用户基本信息</h3>
                        </div>
                    </template>
                    <el-descriptions border :column="2" :size="'large'">
                        <el-descriptions-item :rowspan="2" label="头像" align="center">
                            <el-image style="height: 1%" :src="ip + info.avatar"/>
                        </el-descriptions-item>
                        <el-descriptions-item label="姓名">{{ info.username }}</el-descriptions-item>
                        <el-descriptions-item label="学籍号">{{ info.stu_id }}</el-descriptions-item>
                        <el-descriptions-item label="系部">{{ info.department_name }}</el-descriptions-item>
                        <el-descriptions-item label="班级">{{ info.class_name }}</el-descriptions-item>
                        <el-descriptions-item label="手机号">{{ info.phone }}</el-descriptions-item>
                        <el-descriptions-item label="当前时间">{{ currentTime }}</el-descriptions-item>
                        <el-descriptions-item label="标签">
                            <el-tag v-for="(item, index) in info.role_names" :key="index" type="success">
                                {{ item }}
                            </el-tag>
                        </el-descriptions-item>
                    </el-descriptions>
                    <el-row style="display: flex;justify-content: center; padding: 3%">
                        <el-col :span="8">
                            <el-button type="primary" style="width: 85%; height: 100%" round
                                       :disabled="!info.role_names.includes('学生')">学生请假申请
                            </el-button>
                        </el-col>
                        <el-col :span="8">
                            <el-button type="success" style="width: 85%; height: 100%" round
                                       :disabled="info.role_names.includes('学生')">提交学生考勤
                            </el-button>
                        </el-col>
                        <el-col :span="8">
                            <el-button type="warning" style="width: 85%; height: 100%" round
                                       :disabled="info.role_names.includes('学生')">审批学生请假
                            </el-button>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="12" style="padding-left: .5%; height: 45vh">
                <el-card style="height: 100%">
                    <el-scrollbar height="400px">
                        <el-calendar style="height: 100%" v-model="chart2">
                            <template #header="{ date }">
                                <h3>班级考情情况</h3>
                                <span>{{ date }}</span>
                                <el-button-group>
                                    <el-button size="small" @click="selectDate('prev-month')">
                                        上个月
                                    </el-button>
                                    <el-button size="small" @click="selectDate('today')">今天</el-button>
                                    <el-button size="small" @click="selectDate('next-month')">
                                        下个月
                                    </el-button>
                                </el-button-group>
                            </template>
                            <template #date-cell="{ data }">

                                {{ data }}
                            </template>
                        </el-calendar>
                    </el-scrollbar>
                </el-card>
            </el-col>
            <el-col :span="12" style="padding-right: .5%; padding-top: 1%; height: 45vh">
                <el-card style="height: 100%">
                    <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
                </el-card>
            </el-col>
            <el-col :span="12" style="padding-left: .5%; padding-top: 1%">
                <el-card>
                    <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>

import {get_chart2} from "@/API/auth";

export default {
    methods: {
        getData() {
            console.log(this.info)
            get_chart2().then(res => {
                this.chart2 = res.data.map(item => {
                    item.date = new Date(item.date);
                    return item
                });
                console.log(this.chart2);
            })
        },
        getCurrentTime() {
            const now = new Date();
            return now.toLocaleString(); // 格式化时间，使用本地格式
        },
        updateTime() {
            this.currentTime = this.getCurrentTime();
        },
    },
    name: "Home",
    data() {
        return {
            ip: "",
            currentTime: "",
            chart2: []
        };
    },
    created() {
        this.ip = this.$BaseIp;
        this.info = JSON.parse(localStorage.getItem("info"));
        this.getData()
    },
    mounted() {
        this.timer = setInterval(this.updateTime, 1000);
    }
};

/*
*
{ "isSelected": false, "type": "current-month", "day": "2024-12-01", "date": "2024-12-01T07:37:34.726Z" }
{ "isSelected": false, "type": "current-month", "day": "2024-12-02", "date": "2024-12-02T07:37:34.726Z" }
{ "isSelected": false, "type": "current-month", "day": "2024-12-03", "date": "2024-12-03T07:37:34.726Z" }
{ "isSelected": false, "type": "current-month", "day": "2024-12-04", "date": "2024-12-04T07:37:34.726Z" }
{ "isSelected": false, "type": "current-month", "day": "2024-12-05", "date": "2024-12-05T07:37:34.726Z" }
{ "isSelected": false, "type": "current-month", "day": "2024-12-06", "date": "2024-12-06T07:37:34.726Z" }
{ "isSelected": false, "type": "current-month", "day": "2024-12-07", "date": "2024-12-07T07:37:34.726Z" }
{ "isSelected": false, "type": "current-month", "day": "2024-12-08", "date": "2024-12-08T07:37:34.726Z" }
{ "isSelected": false, "type": "current-month", "day": "2024-12-09", "date": "2024-12-09T07:37:34.726Z" }
{ "isSelected": false, "type": "current-month", "day": "2024-12-10", "date": "2024-12-10T07:37:34.726Z" }
{ "isSelected": false, "type": "current-month", "day": "2024-12-11", "date": "2024-12-11T07:37:34.726Z" }
{ "isSelected": false, "type": "current-month", "day": "2024-12-12", "date": "2024-12-12T07:37:34.726Z" }
{ "isSelected": false, "type": "current-month", "day": "2024-12-13", "date": "2024-12-13T07:37:34.726Z" }
{ "isSelected": false, "type": "current-month", "day": "2024-12-14", "date": "2024-12-14T07:37:34.726Z" }
{ "isSelected": false, "type": "current-month", "day": "2024-12-15", "date": "2024-12-15T07:37:34.726Z" }
{ "isSelec
* */
</script>

<style>

</style>


