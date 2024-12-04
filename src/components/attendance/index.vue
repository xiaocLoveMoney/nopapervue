<template>
    <div>
        <header style="height: 40px;background: #64ace6; color: white">
            <h3>考勤状态</h3>
        </header>
        <div style="margin-top: 40px;height: 40vh; background: linear-gradient(#64ace6, #EAEDF1);position: fixed; top: 0px; width: 100%; z-index: -1;"/>
        <el-card style="margin: 15px; border-radius: 15px; margin-top: 45px">
            <template #header>
                <div class="card-header">
                    <h3>每日签到情况</h3>
                </div>
            </template>
            <div style="width: 100%; height: 300px" id="chart2"></div>
        </el-card>
        <el-card style="margin: 15px; border-radius: 15px;">
            <template #header>
                <div class="card-header">
                    <h3>当天签到情况</h3>
                </div>
            </template>
            <div style="width: 100%; height: 300px;" id="chart1" v-show="yibiao"></div>
            <el-empty v-show="!yibiao" description="班主任添加当天考勤即可查看"/>
        </el-card>
        <el-card style="margin: 15px; border-radius: 15px">
            <template #header>
                <div class="card-header">
                    <span>考勤列表</span>
                </div>
            </template>
            <el-table
                ref="singleTableRef"
                :data="attendance_tableData"
                highlight-current-row
                style="width: 100%"
                @cell-click="tableclick"
            >
                <el-table-column type="index" width="50"/>
<!--                <el-table-column property="attendance_id" label="考勤编号" width="100"/>-->
                <el-table-column property="date" label="日期" width="120"/>
                <el-table-column property="name" label="姓名" width="80"/>
                <el-table-column property="reason" label="原因"/>
                <el-table-column property="tag" label="状态标签" width="80">
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
        </el-card>
    </div>
</template>

<script>

import router from "@/router";
import {attendancelist, get_chart1, get_chart2} from "@/API/auth";
import * as echarts from "echarts";
import {get_chart2_options} from "@/components/echarts/chart2";
import {get_chart1_options} from "@/components/echarts/chart1";

export default {
    name: router,
    data() {
        return {
            ip: "",
            attendancelist_page: 1,
            attendance_tableData: [],
            yibiao: true,
        };
    },
    methods: {
        getData() {
            this.get_attendancelist()
        },
        echarts_fun() {
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
    },
    mounted() {
        this.ip = this.$BaseIp;
        this.getData()
        this.echarts_fun()
    }
};
</script>

<style>
header {
    position: fixed;
    top: 0;
    z-index: 1000000;
}
</style>


