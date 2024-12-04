<template>
    <div class="bigscreen-bak">

        <header>
            <el-popover
                placement="bottom"
                title="选择数据日期"
                :width="200"
                trigger="click"
            >
                <template #reference>
                    <h1 class="tith1 fl" style="color: white">基于大数据的无纸化请假系统可视化大屏</h1>
                </template>
                <el-date-picker
                    v-model="date"
                    type="date"
                    placeholder="请选择日期"
                    style="width: 150px"
                    @change="getData"
                />
            </el-popover>
        </header>
        <div class="container">
            <div class="left_side">
                <article class="moudel">
                    <div class="title-box">
                        <h6>各系部到校情况</h6>
                    </div>
                    <div class="chart-box" id="chart5" style="width: 100%; height: 415px">
                    </div>
                </article>
                <article class="moudel">
                    <div class="title-box">
                        <h6>学生状态分布</h6>
                    </div>
                    <div class="chart-box" id="chart4" style="width: 100%; height: 280px">
                        图表
                    </div>
                </article>
            </div>
            <div class="center_side">
                <!-- 模块一 -->
                <article class="moudel">
                    <div class="title-box">
                        <h6>学生出勤情况</h6>
                    </div>
                    <div class="chart-box" id="chart3" style="width: 100%; height: 415px">
                        图表
                    </div>
                </article>
                <div class="moudel2">
                    <article class="moudel">
                        <div class="title-box">
                            <h6>正常到校最多的班级</h6>
                        </div>
                        <div class="chart-box" id="chart2" style="width: 100%; height: 280px">
                            图表
                        </div>
                    </article>
                    <!-- 模块三 -->
                    <article class="moudel">
                        <div class="title-box">
                            <h6>正常到校最少的班级</h6>
                        </div>
                        <div class="chart-box" id="chart1" style="width: 100%; height: 280px">
                        </div>
                    </article>
                </div>

            </div>


        </div>
    </div>
</template>

<script>

import router from "@/router";
import {get_chart1, get_chart2, get_chart3, get_chart4, get_chart5} from "@/API/charts";
import * as echarts from "echarts";

export default {
    name: router,
    data() {
        return {
            ip: "",
            date: "2024-11-01"
        };
    },
    methods: {
        getData() {
            console.log(this.date)
            var date = this.get_date_format(this.date)
            get_chart1(date).then(res => {
                var option1 = res.data;
                var dom_chart1 = echarts.init(document.getElementById("chart1"));
                dom_chart1.setOption(option1);
            })
            get_chart2(date).then(res => {
                var option2 = res.data;
                var dom_chart2 = echarts.init(document.getElementById("chart2"));
                dom_chart2.setOption(option2);
            })
            get_chart3(date).then(res => {
                var option3 = res.data;
                var dom_chart3 = echarts.init(document.getElementById("chart3"));
                dom_chart3.setOption(option3);
            })
            get_chart4(date).then(res => {
                var option4 = res.data;
                var dom_chart4 = echarts.init(document.getElementById("chart4"));
                dom_chart4.setOption(option4);
            })
            get_chart5(date).then(res => {
                var option5 = res.data;
                var dom_chart5 = echarts.init(document.getElementById("chart5"));
                dom_chart5.setOption(option5);
            })
        },
        get_date_format(date_in) {
            const date = new Date(date_in);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要+1
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
    },
    created() {
        this.ip = this.$BaseIp;
        this.getData()
    },
};
</script>

<style>
.bigscreen-bak {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; /* 保证视频充满页面且不变形 */
    z-index: -1000;
    background-image: url("@/assets/bg3.jpg");
}

header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

header > h1 {
    text-align: center;
    padding-top: 1.0rem;
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 2rem;
}

.container {
    display: flex;
    justify-content: space-between;
    padding: 2rem;
}

.container > div {
    flex: 1;
}

.container > div.center_side {
    flex: 2;
}

article {
    display: flex;
    flex-direction: column;
    width: 99%;
    margin: auto;
}

.left_side {
    width: 100%;
}

.left_side .moudel1 {
    background: url("@/assets/img/border_bg01.png") top left no-repeat;
    background-size: 100% 100%;
    height: 15vh;
    margin: 1rem;
}

.moudel1 > div {
    width: 100%;
    height: 3.2rem;
    line-height: 3.2rem;
    text-align: center;
    background: url("@/assets/img/border_bg01.png") center center no-repeat;
    font-size: 1.5rem;
    color: #0e94ea;
    font-weight: 900;
}

.moudel1 > p {
    font-size: 2.5rem;
    line-height: 5.2rem;
    text-align: center;
    color: white;
}

article > .title-box {
    width: 100%;
    height: 3rem;
    background: url("@/assets/img/box_title.png") top left no-repeat;
    background-size: 100% 100%;
    margin: auto;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    position: relative;
}

.title-box > h6, .title-box > p {
    font-size: 1.2rem;
    font-weight: normal;
    color: white;
    height: 42rem;
    line-height: 42rem;
    margin-left: 2rem;
}

.moudel2 {
    display: flex;
}

.moudel2 > article {
    margin: 0 5px;
}

.chart-box {
    border: 1px solid #0e94ea;
    margin: 10px 0;
}
</style>


