<template>
  <div>
    <div class="flex-row cont">
      <div class="consump-left">
        <div class="consump-order shadow">
          <div class="order-title">
            <i class="title-icon"></i>区域消费订单
          </div>
          <div class="consump-list">
            <div class="consump-item" v-for="(item,index) in consumptionList" :key="index">
              <el-image :src="item.icon" style="width:66px"></el-image>
              <div class="consump-num">{{item.num+'/'+item.unit}}</div>
              <div class="consump-remark">{{item.remark}}</div>
            </div>
          </div>
          <button class="detail-btn">查看详情</button>
        </div>
        <div class="all-order shadow margin-top-xl ">
          <div class="order-title">
            <i class="title-icon"></i>总部库存数量
          </div>
          <div style="width:500px;height:300px" ref="chart"></div>
          <button class="detail-btn">查看详情</button>
        </div>
      </div>
      <div class="consump-right margin-left-lg shadow">
        <div class="order-title">
          <i class="title-icon"></i>购酒订单
        </div>
        <div v-for="(item,index) in buyList" :key='index'>
          <div class="flex-row just-between margin-xl">
            <div class="flex-sub wine-name text-left">
              {{item.jname}}
            </div>
            <div class="flex-sub text-bold wine-num text-right">数量：{{item.num}}</div>
          </div>
          <el-progress :stroke-width="16" :percentage="item.Percentage" :color="item.color" class="margin-xl"></el-progress>
        </div>
        <button class="detail-btn">查看详情</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import echarts from 'echarts'
const colors = ["#fa4140","#2997eb","#fdbd08","#e01d14"]
export default {
  name: 'Dashboard',
  data() {
    return {
      consumptionList: [
        {
          icon: require("@/assets/my/data.png"),
          num: "360",
          unit: "瓶",
          remark: "消费酒的数据"
        },
        {
          icon: require("../../../assets/my/doc.png"),
          num: "320",
          unit: "瓶",
          remark: "购买酒的订单"
        },
        {
          icon: require("../../../assets/my/hous.png"),
          num: "360",
          unit: "瓶",
          remark: "总部库存"
        }
      ],
      orderTotal:0,
      stockTotal:0,
      buyList:[],
      obj:{
        "success": true,
        "message": "操作成功！",
        "code": 200,
        "result": {
          "a": [{
            "num": 0,
            "repertorynum": 12,
            "jname": "豪情",
            "a": null,
            "orders": null
          }, {
            "num": 0,
            "repertorynum": 15,
            "jname": "豪爽",
            "a": null,
            "orders": null
          }, {
            "num": 30,
            "repertorynum": 8,
            "jname": "豪饮",
            "a": null,
            "orders": null
          }],
          "b": {
            "num": 102,
            "num2": 102,
            "num3": 35
          }
        },
        "timestamp": 1585644368266
      }
    };
  },
  mounted(){
    this.getList();
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods:{
    flils(data){
       this.buyList = data.map(item=>{
          return {
            ...item,
            Percentage:this.orderTotal ? parseInt(item.num/this.orderTotal*100) : '0'
          }
        })
    },
    getList(){
      const that = this
      const res = that.obj.result;
        const consumptionList = that.consumptionList
        consumptionList[0].num = res.b.num
        consumptionList[1].num = res.b.num2
        consumptionList[2].num = res.b.num3
        res.a.forEach((item,index) => {
          item.color = colors[index]
          that.orderTotal+=item.num
          that.stockTotal+=item.repertorynum
        });
        that.flils(res.a)
        that.init(res.a)
    },
        init(stockdata) {
      let myChart = echarts.init(this.$refs.chart);
      const names = []
      const datas = stockdata.map(item=>{
        names.push(item.jname)
        return {
          value: item.repertorynum,
                name: item.jname,
                itemStyle: {
                  normal: { color: item.color}
                }
        }
      })
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "right",
          data: names
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "20",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: datas
          }
        ]
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.cont {
  width: 1140px;
  margin: 50px auto;
}
.order-title {
  width: 158px;
  font-size: 20px;
  font-weight: normal;
  line-height: 65px;
  color: #333333;
}
.order-title .title-icon {
  display: inline-block;
  width: 3px;
  height: 16px;
  background-color: #1992eb;
  margin-right: 10px;
}
/* 消费订单样式 */
.consump-right,.consump-order,.all-order {
  padding: 30px;
  width: 600px;
  text-align: center;
}
.consump-list {
  display: flex;
  margin-top: 40px;
}
.consump-item {
  flex: 1;
}
.consump-item .consump-num{
  font-size: 20px;
	font-weight: normal;
	line-height: 36px;
  margin-top:20px;
}
.consump-item .consump-remark{
  margin-top:8px;
	font-size: 14px;
	font-weight: normal;
	line-height: 36px;
	color: #999999;
}
.detail-btn {
  width: 120px;
  height: 36px;
  line-height: 36px;
  background-color: #eb3335;
  border-radius: 5px;
  font-size: 16px;
  color: #ffffff;
  border: none;
  margin: 40px auto 0;
}
.consump-right .wine-name{
  font-size: 16px;
  line-height: 36px;
  font-weight: normal;
  color: #333333;
}
.consump-right .wine-num{
  font-size: 14px;
  line-height: 36px;
  font-weight: normal;
  color: #999999;
}

.flex-row{
  display: flex;
  flex-direction: row;
}
.just-between{
  justify-content: space-between;
}
.shadow{
    box-shadow: 0 4px 8px rgba(0, 0, 0, .12), 0 0 12px rgba(0, 0, 0, .04);
    background: #fff;
}
.margin-left-lg{
  margin-left: 20px;
}
.margin-top-xl{
  margin-top: 25px;
}
.margin-xl{
  margin: 25px;
}
</style>
