<template>
    <div>
        <header style="height: 40px;background: #fff;">
            <el-icon :size="20" style="position: absolute; left: 10px; color: #ccc" @click="back()"><ArrowLeft /></el-icon>
            <h4>审批请假申请</h4>
        </header>
        <el-card style="margin: 15px; margin-top: 55px;">
            <template #header>
                <div class="card-header">
                    <label>请假申请列表</label>
                </div>
            </template>
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item :title="item.stu_name + ' 日期：' + item.date" v-for="(item, index) in add_checkleaves_form" :key="index">
                    <el-descriptions :column="2">
                        <el-descriptions-item label="姓名">{{ item.stu_name }}</el-descriptions-item>
                        <!--                            <el-descriptions-item label="请假编号">{{ item.leave_id }}</el-descriptions-item>-->
                        <el-descriptions-item label="学生电话">{{ item.stu_phone }}</el-descriptions-item>
                        <el-descriptions-item label="家长电话">{{ item.parent_phones }}</el-descriptions-item>
                        <el-descriptions-item label="家长邮箱">{{ item.parent_emails }}</el-descriptions-item>
                    </el-descriptions>
                    <el-descriptions :column="1">
                        <el-descriptions-item label="请假原因">
                            {{ item.reason }}
                        </el-descriptions-item>
                        <el-descriptions-item label="大数据决策建议">
                            <el-button type="primary" plain v-if="item.idea.length == 0" @click="add_checkleaves_textmaker_user(item)">获取大数据决策建议</el-button>
                            <div v-else>
                                {{ item.idea }}
                            </div>
                        </el-descriptions-item>
                    </el-descriptions>
                    <el-radio-group v-model="item.status">
                        <el-radio :value="'未审核'">未审核</el-radio>
                        <el-radio :value="'批准'">批准</el-radio>
                        <el-radio :value="'拒批'">拒批</el-radio>
                    </el-radio-group>
                </el-collapse-item>
                <el-collapse-item title="全班/系部 大数据决策建议">
                    <div>{{ add_checkleaves_allidea }}</div>
                </el-collapse-item>
            </el-collapse>
        </el-card>
        <div style="margin: 15px;">

            <el-button type="primary" round style="width: 100%" @click="add_checkleaves_event">提交</el-button>
        </div>
    </div>
</template>

<script>

import router from "@/router";
import {checkleaves, leavelist, leaveserrorfromclassordepartment, leaveserrorfromuserid} from "@/API/auth";
import {ElLoading, ElNotification} from "element-plus";

export default {
    name: router,
    data() {
        return {
            ip: "",
            add_checkleaves_form: [],
            add_checkleaves_allidea: "正在获取大数据决策建议"
        };
    },
    methods: {
        getData() {
            console.log(123123)
            leavelist().then(res => {
                console.log(res)
                this.add_checkleaves_form = res.data.filter(item => item.status == '未审核').map(item => {
                    return {
                        stu_name: item.username,
                        reason: item.reason,
                        stu_phone: item.phone,
                        parent_phones: item.parent_phones,
                        parent_emails: item.parent_emails,
                        date: item.date,
                        status: item.status,
                        leave_id: item.leave_id,
                        idea: "",
                        user_id: item.user_id,
                    }
                })
                console.log(this.add_checkleaves_form)
            })
            leaveserrorfromclassordepartment().then(res => {
                console.log(res)
                this.add_checkleaves_allidea = res.data
            })
        },
        async add_checkleaves_event() {
            console.log(this.add_checkleaves_form)
            var idx = this.add_checkleaves_form.findIndex(item => item.status == "未审核")
            console.log(idx)
            if (idx != -1) {
                ElNotification({
                    "type": "warning",
                    "title": "警告",
                    "message": "请审核全部内容",
                    "offset": 50
                })
                return;
            }
            const loading = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            for await (const item of this.add_checkleaves_form) {
                console.log(item)
                var result = await checkleaves({
                    "leave_id": item.leave_id,
                    "status": item.status,
                })
                if (result.code != 200) {
                    ElNotification({
                        type: "warning",
                        title: "警告",
                        message: "内部错误联系管理员",
                        offset: 50
                    })
                }
            }
            loading.close()
            ElNotification({
                type: "success",
                title: "恭喜",
                message: "操作成功",
                offset: 50
            })
            router.back()
        },
        add_checkleaves_textmaker_user(item) {
            console.log(item)
            const loading = ElLoading.service({
                lock: true,
                text: '正在获取大数据决策建议',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            leaveserrorfromuserid(item.user_id).then(res => {
                console.log(res)
                item.idea = res.data
                loading.close()
            })
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


