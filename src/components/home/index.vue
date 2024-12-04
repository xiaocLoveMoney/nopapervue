<template>
    <div>
        <header style="height: 40px;background: #64ace6; color: white">
            <h3>无纸化请假系统</h3>
        </header>
        <div style="height: 17vh; background: linear-gradient(#64ace6, #EAEDF1);
        border-radius: 0 0 15px 15px; margin-top: 40px; position: fixed; top: 0px; width: 100%; z-index: -1;">
        </div>
        <div style="margin: 45px 15px 15px 15px;" :style="'opacity:' + opacity">
            <el-carousel :interval="3000" height="200px" motion-blur v-if="slider.length" style=" border-radius: 15px 15px 0 0" >
                <el-carousel-item v-for="item in slider" :key="item">
                    <el-image :src="ip + item.swiper_url" style="height: 100%; width: 100%;"/>
                </el-carousel-item>
            </el-carousel>
            <el-carousel :interval="3000" height="40px" v-if="announcementlist.length" indicator-position="none"
            direction="vertical" style="border-radius: 0 0 15px 15px" >
                <el-carousel-item v-for="item in announcementlist" :key="item" style="height: 100%; width: 100%;
                 background-color: rgba(236,201,114,0.38); display: flex; align-items: center;color: orange;
                justify-content: space-between;">
                    <label style=" padding-left: 10px">{{item.title}}</label>
                    <el-icon :size="20" style="padding-right: 10px"><ArrowRightBold /></el-icon>
                </el-carousel-item>
            </el-carousel>
        </div>
        <el-card style="margin: 15px; border-radius: 15px">
            <template #header>
                <div class="card-header">
                    <span>用户基本信息</span>
                </div>
            </template>
            <el-descriptions direction="vertical" :column="2">
                <el-descriptions-item label="姓名">{{ info.username }}</el-descriptions-item>
                <el-descriptions-item label="学籍号">{{ info.stu_id || "暂无数据" }}</el-descriptions-item>
                <el-descriptions-item label="班级">{{ info.class_name }}</el-descriptions-item>
                <el-descriptions-item label="系部">{{ info.department_name }}</el-descriptions-item>
                <el-descriptions-item label="手机号">{{ info.phone }}</el-descriptions-item>
                <el-descriptions-item label="标签">
                    <el-tag type="success" v-for="(item, index) in info.role_names" :key="index">{{ item }}</el-tag>
                </el-descriptions-item>
            </el-descriptions>
            <el-row style="display: flex;justify-content: center; align-content: center">
                <el-col :span="8" style="width: 100%; padding: 0 3px">
                    <el-button type="primary" style="width: 100%; height: 100%" round
                               :disabled="!info.role_names.includes('学生')" @click="goto('/createleave')">
                        请假申请
                    </el-button>
                </el-col>
                <el-col :span="8" style="width: 100%; padding: 0 3px">
                    <el-button type="success" style="width: 100%; height: 100%" round
                               :disabled="info.role_names.includes('学生')">
                        提交考勤
                    </el-button>
                </el-col>
                <el-col :span="8" style="width: 100%; padding: 0 3px">
                    <el-button type="warning" style="width: 100%; height: 100%" round
                               :disabled="info.role_names.includes('学生')">
                        审核请假
                    </el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card style="margin: 15px; border-radius: 15px">
            <template #header>
                <div class="card-header">
                    <span>请假申请列表</span>
                </div>
            </template>
            <el-table
                ref="singleTableRef"
                :data="leaves_tableData"
                highlight-current-row
                style="width: 100%"
                @cell-click="tableclick"
            >
                <el-table-column type="index" width="50"/>
<!--                <el-table-column property="leave_id" label="请假编号" width="100"/>-->
                <el-table-column property="date" label="日期" width="120"/>
                <el-table-column property="name" label="姓名" width="80"/>
                <el-table-column property="reason" label="请假原因" :show-overflow-tooltip="true"/>
                <el-table-column property="tag" label="状态标签" width="80">
                    <template #default="scope">
                        <el-tag
                            :type="scope.row.tag === '拒批' ? 'error' : scope.row.tag == '未审核'? 'warning': 'success'"
                            disable-transitions>
                            {{ scope.row.tag }}
                        </el-tag>
                    </template>
                </el-table-column>
            </el-table>
<!--            <div style="padding: 1%">-->
<!--                <el-button type="primary" style="width: 100%" @click="get_attendancelist" plain :disabled="leaveslist_more_btn">-->
<!--                    更多数据-->
<!--                </el-button>-->
<!--            </div>-->
        </el-card>
<!--        <div v-for="item in 100" :key="item">{{item}}</div>-->
    </div>
</template>

<script>

import router from "@/router";
import {announcementlist, leavelist, slider} from "@/API/auth";

export default {
    name: router,
    data() {
        return {
            ip: "",
            slider: [],
            announcementlist: [],
            opacity: 1,
            info: {},
            leaveslist_page: 1,
            leaves_tableData: [],
            leaveslist_more_btn: false,
        };
    },
    methods: {
        getData() {
            console.log(123123)
            slider().then(res => {
                console.log(res)
                this.slider = res.data;
            })
            announcementlist().then(res => {
                console.log(res)
                this.announcementlist = res.data;
            })

            this.get_leaveslist()
        },
        handleScroll() {
            // 获取滚动距离
            const scrollY = window.scrollY;
            this.opacity = Math.max(1 - scrollY / 200, 0);
        },
        get_leaveslist() {
            leavelist(this.leaveslist_page).then(res => {
                console.log(res)
                if (res.data.length < 10) {
                    this.leaveslist_more_btn = true
                }
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
            }).catch(err => {
                console.log(err)
            })
            this.leaveslist_page += 1;
        },
        goto(path) {
            router.push(path)
        }
    },
    created() {

        this.ip = this.$BaseIp;
        this.info = JSON.parse(localStorage.getItem("info"));
        this.getData()
    },
    mounted() {
        // 监听滚动事件
        window.addEventListener("scroll", this.handleScroll);
    },
};
</script>

<style>
header {
    position: fixed;
    top: 0;
    z-index: 1000000;
}
.back-color {
    background: linear-gradient(#9198e5, #64d3e6, #EAEDF1);
}
</style>


