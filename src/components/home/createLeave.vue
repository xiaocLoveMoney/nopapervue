<template>
    <div>
        <header style="height: 40px;background: #fff;">
            <el-icon :size="20" style="position: absolute; left: 10px; color: #ccc" @click="back()"><ArrowLeft /></el-icon>
            <h4>提交请假申请</h4>
        </header>

        <div style="border-radius: 15px;margin: 15px; margin-top: 55px">
            <el-form>
                <el-form-item label="请假日期">
                    <el-date-picker
                        v-model="add_leaves_form.date"
                        type="date"
                        placeholder="请选择请假日期"
                        :disabled-date="leavesdateDisabler"
                    />
                </el-form-item>
                <el-form-item label="请假类型">
                    <el-radio-group v-model="add_leaves_form.leave_type">
                        <el-radio value="病假">病假</el-radio>
                        <el-radio value="事假">事假</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="请假原因" v-if="add_leaves_form.textarea.length==0"
                              :disabled="add_leaves_form.leave_type.length==0">
                    <el-input placeholder="请输入请假原因（不超过20字）" v-model="add_leaves_form.reason"
                              :maxlength="20"
                              @blur="add_leaves_Blur"/>
                </el-form-item>
                <el-form-item label="请假书" v-else>
                    <el-input v-model="add_leaves_form.textarea" :autosize="{ minRows: 5}"
                              type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="佐证材料">
                    <el-upload
                        v-model:file-list="fileList"
                        class="upload-demo"
                        :action="ip + '/api/auth/upload'"
                        :on-success="pixupload_event"
                        auto-upload
                        :limit="1"
                    >
                        <el-button type="primary">上传</el-button>
                        <template #tip>
                            <div class="el-upload__tip">
                                提交医院请假条等...
                            </div>
                        </template>
                    </el-upload>
                </el-form-item>
            </el-form>
        </div>
        <div style="margin: 15px">
            <el-button type="primary" round style="width: 100%" @click="add_leaves_event" :disabled="add_leaves_form.textarea.length==0 || add_leaves_form.date.length == 0 || add_leaves_form.leave_type.length == 0">提交申请</el-button>
        </div>
    </div>
</template>

<script>

import router from "@/router";
import {ElLoading, ElNotification} from "element-plus";
import {leavestextmaker, student_createLeaves} from "@/API/auth";

export default {
    name: router,
    data() {
        return {
            ip: "",
            add_leaves_form: {
                date: "",
                leave_type: "",
                reason: "",
                textarea: "",
                file_url: ""
            },
        };
    },
    methods: {
        getData() {
            console.log(123123)
        },
        leavesdateDisabler(date) {
            const now = new Date();
            if (now - date < 0) {
                return false;
            }
            return true;
        },
        add_leaves_Blur() {
            if (!this.add_leaves_form.reason.length) {
                ElNotification({
                    title: '错误',
                    message: "请假原因不能为空",
                    position: 'bottom-right',
                    type: "error",
                    offset: 50
                })
                return
            }
            const loading = ElLoading.service({
                lock: true,
                text: '生成请假书中',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            leavestextmaker({
                reason: this.add_leaves_form.reason,
                type: this.add_leaves_form.leave_type
            }).then(res => {
                console.log(res)
                this.add_leaves_form.textarea = res.data
                loading.close()
            }).catch(error => {
                console.log(error);
                loading.close()
            })
        },
        get_date_format(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要+1
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        add_leaves_event() {
            student_createLeaves({
                "leave_type": this.add_leaves_form.leave_type,
                "date": this.get_date_format(this.add_leaves_form.date),
                "reason": this.add_leaves_form.textarea,
                "file_url": this.add_leaves_form.file_url,
            }).then(res => {
                console.log(res)
                ElNotification({
                    title: '完成',
                    message: "操作成功",
                    position: 'bottom-right',
                    type: "success",
                    offset: 50
                })
                setTimeout(function () {
                    router.back()
                }, 1000);
            }).catch(err => {
                console.log(err);
                ElNotification({
                    title: '错误',
                    message: "申请失败请重试",
                    position: 'bottom-right',
                    type: "error",
                    offset: 50
                })
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


