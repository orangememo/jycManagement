<template>
    <div style="width: 90%;">
        <!-- <el-image :src="require('../../../assets/my/admin-banner.png')"></el-image> -->
        <div class="cont-body">
            <div class="form-box" style="margin-top:15px">
                <div class="form-title text-red flex">
                    <el-image :src="require('../../../assets/my/ordertotal.png')" class="img-icon margin-lr-sm">
                    </el-image>
                    <div>订单信息汇总</div>
                </div>
            </div>
            <el-table :data="list" stripe style="margin: 30px 0;" row-class-name="row-class-jy" header-row-class-name="head-row-class-jy">
                <el-table-column prop="jname" label="名称" width="180"></el-table-column>
                <el-table-column prop="img" label="图片" width="180">
                    <template slot-scope="scope">
                        <img :src="hostUrl+scope.row.img" width="40" height="40" class="head_pic" />
                    </template>
                </el-table-column>
                <el-table-column prop="everys" :formatter="numEvFormart" label="今日订单" width="180"></el-table-column>
                <el-table-column prop="week" :formatter="numWeekFormart" label="周订单"></el-table-column>
                <el-table-column prop="month" :formatter="numMonFormart" label="月订单" width="180"></el-table-column>
                <el-table-column prop="repertory" label="剩余酒库存"></el-table-column>
            </el-table>

            <div class="form-box" style="margin-top:15px;">
                <div class="form-title text-red flex">
                    <el-image :src="require('../../../assets/my/chart.png')" class="img-icon margin-lr-sm"></el-image>
                    <div>订单统计</div>
                </div>
                <div class="sum-div">
                    <div class="choose-item" :class="activeClass == index ? 'actived':''"
                        v-for="(item,index) in winlist" :key="index" @click="showSum(index)">
                        {{item.jname}}</div>
                </div>
                <!-- <table class="jyc-table margin-top">
          <thead class="jyc-table-head">
            <tr>
              <th
                v-for="(item,index) in winlist"
                :key="item.id"
                style="width:25%"
                :class="tabIndex==index ? 'active' : ''"
                @click="activeHead(index)"
              >{{item.jname}}</th>
            </tr>
          </thead>
        </table>-->
                <div style="width:1140px;height:451px;" class="chart-box" ref="chart"></div>
                <div style="width:1140px;height:451px" class="chart-box" ref="chart1"></div>
                <div style="width:1140px;height:451px" class="chart-box" ref="chart2"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import echarts from "echarts";
    import { mapState } from "vuex";

    export default {
        data() {
            return {
                tabIndex: 0,
                activeClass: 0,
                list: [
                    {
                        img:
                            "/uploads/20190604/5e60fbc0db632a875241736f12b29b06.jpg",
                        jname: "豪情",
                        everys: null,
                        week: null,
                        month: null,
                        repertory: 12
                    },
                    {
                        img:
                            "/uploads/20190604/8d7bf1d8c7572c408564dcffa8ce8ab7.jpg",
                        jname: "豪爽",
                        everys: null,
                        week: null,
                        month: null,
                        repertory: 15
                    },
                    {
                        img:
                            "/uploads/20190604/f6507d2aaf66f6fb473bce56027ccde9.jpg",
                        jname: "豪饮",
                        everys: null,
                        week: null,
                        month: null,
                        repertory: 8
                    }
                ],
                winlist: [
                    {
                        id: 2,
                        jname: "豪情"
                    },
                    {
                        id: 3,
                        jname: "豪爽"
                    },
                    {
                        id: 4,
                        jname: "豪饮"
                    }
                ]
            };
        },
        created() {
        },
        mounted() {
            this.getChart();
        },
        computed: {
            ...mapState({ id: state => state.user.id })
        },
        methods: {
            showSum(index) {
                this.activeClass = index
            },
            numEvFormart(row, column) {
                return this.zero(row.everys);
            },
            numWeekFormart(row, column) {
                return this.zero(row.week);
            },
            numMonFormart(row, column) {
                return this.zero(row.month);
            },
            zero(val) {
                val = val ? val : 0;
                return val;
            },
            async getChart(cid = null) {
                const that = this;
                const res = [
                    {
                        date: ["04-01", "03-31", "03-30", "03-29", "03-28", "03-27", "03-26"],
                        num: [-1, -1, -1, -1, -1, -1, -1]
                    },
                    {
                        date: ["04-01", "03-25", "03-18", "03-11", "03-04", "02-26", "02-19"],
                        num: [-1, -1, -1, -1, 5, -1, -1]
                    },
                    {
                        date: ["04", "03", "02", "01", "12", "11", "10"],
                        num: [4, 1, 1, -1, -1, -1, -1]
                    }
                ];
                if (res) {
                    res.forEach((val, i) => {
                        var data = val;
                        data.num.forEach((item, index) => {
                            data.num[index] = item == "-1" ? 0 : item;
                        });
                        that.init({ date: data.date.reverse(), num: data.num.reverse() }, i);
                    });
                }
            },
            activeHead(e) {
                this.tabIndex = e;
                this.getChart(this.winlist[e].id);
            },
            init(data, index) {
                var datas = [
                    {
                        title: "日统计(近7日)",
                        color: "#00aaff",
                        name: "chart",
                        xname: "日期",
                        yname: "数量(单)"
                    },
                    {
                        title: "周统计(近7周)",
                        color: "#1bb934 ",
                        name: "chart1",
                        xname: "日期",
                        yname: "数量(单)"
                    },
                    {
                        title: "月统计(近7月)",
                        color: "#7f5be6",
                        name: "chart2",
                        xname: "月份",
                        yname: "数量(单)"
                    }
                ];
                let myChart = echarts.init(this.$refs[datas[index].name]);
                myChart.setOption({
                    animation: false,
                    title: {
                        left: "left",
                        text: datas[index].title
                        // lineHeight: 40,
                    },
                    xAxis: {
                        type: "category",
                        boundaryGap: false,
                        data: data.date,
                        name: datas[index].xname
                    },
                    yAxis: {
                        type: "value",
                        name: datas[index].yname
                    },
                    series: [
                        {
                            smooth: true,
                            data: data.num,
                            type: "line",
                            itemStyle: {
                                color: datas[index].color
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: "top"
                                }
                            },
                            areaStyle: {}
                        }
                    ]
                });
            }
        }
    };
</script>

<style scoped>
    .form-box .form-title {
    font-family: SourceHanSansCN-Regular;
    font-size: 24px;
    font-weight: 400;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0;
    color: #eb3335;
    border-bottom: 1px solid #eb3335;
    padding-bottom: 14px;
}
.flex{
    display: flex;
}

    .jyc-table .jyc-table-head th,
    .jyc-table .jyc-table-body td {
        width: 20%;
    }

    .jyc-table .jyc-table-head th.active {
        background: #eb3335;
        color: #ffffff;
    }

    .list-img {
        width: 120px;
        height: 120px;
    }

    .chart-box {
        margin: 30px 0;
    }

    .form-box .form-title .img-icon {
        width: 30px;
    height: 30px;
    margin-right: 20px;
    }

    .row-class-jy {
        font-size: 20px;
        height: 150px;
    }

    .head_pic {
        width: 100%;
        height: 100%;
    }

    .sum-div {
        width: 100%;
        height: 50px;
        background: rgb(245, 245, 245);
        color: #333333;
        display: flex;
        margin-top: 30px;
    }

    .choose-item {
        width: 100%;
        height: 100%;
        text-align: center;
        background: #d1d1d1;
        line-height: 3.5;
    }

    .actived {
        background: #eb3335;
        color: #fff;
    }
</style>