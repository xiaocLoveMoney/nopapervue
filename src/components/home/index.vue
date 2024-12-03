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
                        </el-carousel-item>
                    </el-carousel>
                    <el-row style="display: flex;justify-content: center; align-content: center">
                        <el-col :span="8" style="width: 100%; padding: 0 15px">
                            <el-button type="primary" style="width: 100%; height: 100%" round
                                       :disabled="!info.role_names.includes('学生')">学生请假申请
                            </el-button>
                        </el-col>
                        <el-col :span="8" style="width: 100%; padding: 0 15px">
                            <el-button type="success" style="width: 100%; height: 100%" round
                                       :disabled="info.role_names.includes('学生')" @click="add_attendance_visible_fun">
                                提交学生考勤
                            </el-button>
                        </el-col>
                        <el-col :span="8" style="width: 100%; padding: 0 15px">
                            <el-button type="warning" style="width: 100%; height: 100%" round
                                       :disabled="info.role_names.includes('学生')">审批学生请假
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
                                    <el-table-column property="name" label="姓名"/>
                                    <el-table-column property="reason" label="请假原因" width="120"/>
                                    <el-table-column property="tag" label="状态标签" width="100">
                                        <template #default="scope">
                                            <el-tag
                                                :type="scope.row.tag === '已审批' ? 'primary' : scope.row.tag == '未审批'? 'error': 'success'"
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
                                    <el-table-column property="name" label="姓名" />
                                    <el-table-column property="reason" label="请假原因" width="120"/>
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
                    <el-collapse-item :title="item.student_name" :name="index" v-for="(item, index) in attendance_form" :key="index">
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

    </div>
</template>

<script>

import {
    attendancelist,
    get_chart1,
    get_chart2,
    get_students,
    leavelist,
    leaveslistfromdate, upload_attendance,
} from "@/API/auth";
import {get_chart1_options} from "@/components/echarts/chart1"
import {get_chart2_options} from "@/components/echarts/chart2"
import * as echarts from 'echarts'
import {ElMessage} from "element-plus";

export default {
    name: "Home",
    data() {
        return {
            ip: "",
            currentTime: "",
            yibiao: false,
            attendancelist_page: 1,
            leaveslist_page: 1,
            attendance_tableData: [],
            leaves_tableData: [],
            students: [],
            todayleaves: [],
            add_attendance_visible: false,
            attendance_form: []
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

                        var idx = res.data.findIndex(e => e.user_id == item.user_id)
                        if (idx != -1){
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
                        reason: item.reason == "null" || item.reason == null ? "暂无原因" : item.reason,
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
                        reason: item.reason == "null" || item.reason == null ? "暂无原因" : item.reason,
                        tag: item.status
                    })
                })
                this.attendance_tableData = this.attendance_tableData.sort((a, b) => new Date(b.date) - new Date(a.date))
            })
            this.leaveslist_page += 1;
        },
        add_attendance_visible_fun() {
            if (this.todayleaves.filter(item => item.status == '未审批').length == 0) {
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
        async add_attendance_event() {
            for await (const item of this.attendance_form) {
                console.log({
                    user_id : item.student_id,
                    status : item.status,
                    date : item.date,
                    reason : item.reason,
                })
                const result = await upload_attendance({
                    user_id : item.student_id,
                    status : item.status,
                    date : item.date,
                    reason : item.reason || '',
                })
                console.log(result)
            }
            ElMessage({
                type: "success",
                message: "操作成功"
            })
            this.add_attendance_visible = false;
            window.location.reload();
        }
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
</script>

<style>

</style>


