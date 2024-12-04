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
                    <el-carousel :autoplay="false" motion-blur indicator-position="none">
                        <el-carousel-item>
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
                        </el-carousel-item>
                        <el-carousel-item>
                            <el-scrollbar>
                                <el-collapse>
                                    <el-collapse-item :title="item.title" :name="index"
                                                      v-for="(item, index) in announcementlist" :key="index">
                                        <div>
                                            {{ item.content }}
                                        </div>
                                    </el-collapse-item>
                                </el-collapse>
                            </el-scrollbar>
                        </el-carousel-item>
                    </el-carousel>
                    <el-row style="display: flex;justify-content: center; align-content: center">
                        <el-col :span="8" style="width: 100%; padding: 0 15px">
                            <el-button type="primary" style="width: 100%; height: 100%" round
                                       :disabled="!info.role_names.includes('学生')" @click="add_leaves_visible=true">
                                学生请假申请
                            </el-button>
                        </el-col>
                        <el-col :span="8" style="width: 100%; padding: 0 15px">
                            <el-button type="success" style="width: 100%; height: 100%" round
                                       :disabled="info.role_names.includes('学生') || yibiao" @click="add_attendance_visible_fun">
                                提交学生考勤
                            </el-button>
                        </el-col>
                        <el-col :span="8" style="width: 100%; padding: 0 15px">
                            <el-button type="warning" style="width: 100%; height: 100%" round
                                       :disabled="info.role_names.includes('学生')"
                                       @click="add_checkleaves_visible_fun">审批学生请假
                            </el-button>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="12" style="padding-left: .5%; height: 45vh">
                <el-card style="height: 100%">
                    <template #header>
                        <div class="card-header">
                            <h3>每日签到情况</h3>
                        </div>
                    </template>
                    <div id="chart2" style="height: 36vh; width: 100%"></div>
                </el-card>
            </el-col>
            <el-col :span="12" style="padding-right: .5%; padding-top: 1%; height: 45vh">
                <el-card style="height: 100%">
                    <template #header>
                        <div class="card-header">
                            <h3>当天签到情况</h3>
                        </div>
                    </template>
                    <div id="chart1" style="height: 36vh; width: 100%" v-show="yibiao"></div>
                    <el-empty v-show="!yibiao" description="班主任添加当天考勤即可查看"/>
                </el-card>
            </el-col>
            <el-col :span="12" style="padding-left: .5%; padding-top: 1%; height: 45vh">
                <el-card style="height: 100%">
                    <template #header>
                        <div class="card-header">
                            <h3>考勤/请假数据表</h3>
                        </div>
                    </template>
                    <el-carousel :autoplay="false" motion-blur indicator-position="none">
                        <el-carousel-item>
                            <el-scrollbar>
                                <el-table
                                    ref="singleTableRef"
                                    :data="attendance_tableData"
                                    highlight-current-row
                                    style="width: 100%"
                                    @cell-click="tableclick"
                                >
                                    <el-table-column type="index" width="50"/>
                                    <el-table-column property="attendance_id" label="考勤编号" width="100"/>
                                    <el-table-column property="date" label="日期" width="120"/>
                                    <el-table-column property="name" label="姓名" width="80"/>
                                    <el-table-column property="reason" label="请假原因"/>
                                    <el-table-column property="tag" label="状态标签" width="100">
                                        <template #default="scope">
                                            <el-tag
                                                :type="scope.row.tag === '正常到校' ? 'success' : 'warning'"
                                                disable-transitions>
                                                {{ scope.row.tag }}
                                            </el-tag>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div style="padding: 1%">
                                    <el-button type="primary" style="width: 100%" @click="get_attendancelist" plain>
                                        更多数据
                                    </el-button>
                                </div>
                            </el-scrollbar>
                        </el-carousel-item>
                        <el-carousel-item>
                            <el-scrollbar>
                                <el-table
                                    ref="singleTableRef"
                                    :data="leaves_tableData"
                                    highlight-current-row
                                    style="width: 100%"
                                    @cell-click="tableclick"
                                >
                                    <el-table-column type="index" width="50"/>
                                    <el-table-column property="leave_id" label="请假编号" width="100"/>
                                    <el-table-column property="date" label="日期" width="120"/>
                                    <el-table-column property="name" label="姓名" width="80"/>
                                    <el-table-column property="reason" label="请假原因" :show-overflow-tooltip="true"/>
                                    <el-table-column property="tag" label="状态标签" width="100">
                                        <template #default="scope">
                                            <el-tag
                                                :type="scope.row.tag === '拒批' ? 'error' : scope.row.tag == '未审核'? 'warning': 'success'"
                                                disable-transitions>
                                                {{ scope.row.tag }}
                                            </el-tag>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div style="padding: 1%">
                                    <el-button type="primary" style="width: 100%" @click="get_attendancelist" plain>
                                        更多数据
                                    </el-button>
                                </div>
                            </el-scrollbar>
                        </el-carousel-item>
                    </el-carousel>
                </el-card>
            </el-col>
        </el-row>

        <!--   老师提交学生考勤     -->
        <el-dialog v-model="add_attendance_visible" title="学生考勤填写表" width="800">
            <el-scrollbar height="400px">
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
            </el-scrollbar>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="add_attendance_visible = false">取消</el-button>
                    <el-button type="primary" @click="add_attendance_event">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>

        <!--   老师审核学生请假     -->
        <el-dialog v-model="add_checkleaves_visible" title="老师审核学生请假" width="800">
            <el-scrollbar height="400px">
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
            </el-scrollbar>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="add_attendance_visible = false">取消</el-button>
                    <el-button type="primary" @click="add_checkleaves_event">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>

        <!--   学生提交请假申请     -->
        <el-dialog v-model="add_leaves_visible" title="学生提交请假申请" width="800">
            <el-scrollbar height="400px">
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
            </el-scrollbar>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="add_leaves_visible = false">取消</el-button>
                    <el-button type="primary" @click="add_leaves_event"
                               :disabled="add_leaves_form.textarea.length==0 || add_leaves_form.date.length == 0 || add_leaves_form.leave_type.length == 0">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>

    </div>
</template>

<script>

import {
    attendancelist, checkleaves, get_announcementlist,
    get_chart1,
    get_chart2,
    get_students,
    leavelist, leaveserrorfromclassordepartment, leaveserrorfromuserid,
    leaveslistfromdate, leavestextmaker, student_createLeaves, upload_attendance,
} from "@/API/auth";
import {get_chart1_options} from "@/components/echarts/chart1"
import {get_chart2_options} from "@/components/echarts/chart2"
import * as echarts from 'echarts'
import {ElLoading, ElMessage} from "element-plus";

export default {
    name: "Home",
    data() {
        return {
            ip: "",
            currentTime: "",
            yibiao: true,
            attendancelist_page: 1,
            leaveslist_page: 1,
            attendance_tableData: [],
            leaves_tableData: [],
            students: [],
            todayleaves: [],
            add_attendance_visible: false,
            attendance_form: [],
            add_leaves_visible: false,
            add_leaves_form: {
                date: "",
                leave_type: "",
                reason: "",
                textarea: "",
                file_url: ""
            },
            announcementlist: [],
            add_checkleaves_visible: false,
            add_checkleaves_form: false,
            add_checkleaves_allidea: "",
        };
    },
    methods: {
        getData() {
            console.log(this.info)
            get_chart2().then(res => {
                console.log(res)
                var dom = document.getElementById('chart2');
                var myChart = echarts.init(dom);
                var option = get_chart2_options(res)
                console.log(option)
                myChart.setOption(option);
                // 窗口大小变化时，重新调整图表尺寸
                window.addEventListener('resize', () => {
                    myChart.resize();
                });
            })
            get_chart1().then(res => {
                console.log(res)
                var dom = document.getElementById('chart1');
                var myChart2 = echarts.init(dom);
                if (res.code != 200 || res.data.length == 0) {
                    this.yibiao = true
                    return
                }
                var option = get_chart1_options(res)
                myChart2.setOption(option);
                // 窗口大小变化时，重新调整图表尺寸
                window.addEventListener('resize', () => {
                    myChart2.resize();
                });
            }).catch(error => {
                console.log(error);
                this.yibiao = false
            })

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

            get_announcementlist().then(res => {
                console.log(res)
                this.announcementlist = res.data
            })

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

            this.get_attendancelist()
            this.get_leaveslist()
        },
        getCurrentTime() {
            const now = new Date();
            return now.toLocaleString(); // 格式化时间，使用本地格式
        },
        updateTime() {
            this.currentTime = this.getCurrentTime();
        },
        get_attendancelist() {
            attendancelist(this.attendancelist_page).then(res => {
                console.log(res)
                res.data.forEach(item => {
                    this.attendance_tableData.push({
                        attendance_id: item.attendance_id,
                        date: item.date,
                        name: item.stu_name,
                        reason: item.reason == "null" || item.reason == null || item.reason == "" ? "暂无原因" : item.reason,
                        tag: item.status
                    })
                })
                this.attendance_tableData = this.attendance_tableData.sort((a, b) => new Date(b.date) - new Date(a.date))
            })
            console.log(this.attendance_tableData)
            this.attendancelist_page += 1;
        },
        get_leaveslist() {
            leavelist(this.leaveslist_page).then(res => {
                console.log(res)
                res.data.forEach(item => {
                    this.leaves_tableData.push({
                        leave_id: item.leave_id,
                        date: item.date,
                        name: item.username,
                        reason: item.reason == "null" || item.reason == null || item.reason == "" ? "暂无原因" : item.reason,
                        tag: item.status
                    })
                })
                this.leaves_tableData = this.leaves_tableData.sort((a, b) => new Date(b.date) - new Date(a.date))
            })
            this.leaveslist_page += 1;
        },
        add_attendance_visible_fun() {
            console.log(this.todayleaves)
            if (this.todayleaves.filter(item => item.status == "未审核").length == 0) {
                this.add_attendance_visible = true;
            } else {
                ElMessage({
                    type: "warning",
                    message: "请先审批请假信息"
                })
            }
        },
        get_local_date() {
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要+1
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        get_date_format(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要+1
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
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
            ElMessage({
                type: "success",
                message: "操作成功"
            })
            this.add_attendance_visible = false;
            window.location.reload();
        },
        leavesdateDisabler(date) {
            const now = new Date();
            if (now - date < 0) {
                return false;
            }
            return true;
        },
        add_leaves_Blur() {
            if (this.add_leaves_form.reason.length == 0) {
                ElMessage({
                    type: "warning",
                    message: "请假原因不能为空"
                })
                return
            }
            const loading = ElLoading.service({
                lock: true,
                text: 'Loading',
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
        pixupload_event(response, uploadFile, uploadFiles) {
            console.log(response, uploadFile, uploadFiles);
            this.add_leaves_form.file_url = response.file_url
        },
        add_leaves_event() {
            student_createLeaves({
                "leave_type": this.add_leaves_form.leave_type,
                "date": this.get_date_format(this.add_leaves_form.date),
                "reason": this.add_leaves_form.textarea,
                "file_url": this.add_leaves_form.file_url,
            }).then(res => {
                console.log(res)
                window.location.reload();
            }).catch(err => {
                console.log(err);
                ElMessage({
                    type: "error",
                    message: "申请失败请重试"
                })
            })
        },
        async add_checkleaves_event() {
            console.log(this.add_checkleaves_form)
            var idx = this.add_checkleaves_form.findIndex(item => item.status == "未审核")
            console.log(idx)
            if (idx != -1) {
                ElMessage({
                    "type": "warning",
                    "message": "请审核全部内容"
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
                    ElMessage({
                        type: "warning",
                        message: "内部错误联系管理员"
                    })
                }
            }
            loading.close()
            ElMessage({
                type: "success",
                message: "操作成功"
            })
            window.location.reload();

        },
        add_checkleaves_textmaker_user(item) {
            console.log(item)
            const loading = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            leaveserrorfromuserid(item.user_id).then(res => {
                console.log(res)
                item.idea = res.data
                loading.close()
            })
        },
        add_checkleaves_visible_fun() {
            this.add_checkleaves_visible = true;
            leaveserrorfromclassordepartment().then(res => {
                console.log(res)
                this.add_checkleaves_allidea = res.data
            })
        }
    },
    created() {
        this.ip = this.$BaseIp;
        this.info = JSON.parse(localStorage.getItem("info"));
        this.getData()
        const loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
        })
        setTimeout(() => {
            loading.close()
        }, 3000)
    },
    mounted() {
        this.timer = setInterval(this.updateTime, 1000);
    },
};
</script>


