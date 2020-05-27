<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="16">
      <el-col :span="16">
        <el-row>
          <panel-group @handleSetLineChartData="handleSetLineChartData" :propsData="propsData" />
        </el-row>
        <el-row style="padding-bottom:15px" :gutter="15">
          <el-col :span="12">
            <div class="leftTab ly-flex ly-direction-c ly-justify-sa">
              <div style="padding:15px 30px" class="ly-flex">
                <div style="width:3px;height:18px;background-color:#3D90EE"></div>
                <div style="padding-left:15px;line-height:18px; font-weight: 600;">新增用户</div>
              </div>
              <div class="leftTab ly-flex ly-direction-c ly-justify-sa"></div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="leftTab">
              <div style="padding:15px 30px" class="ly-flex">
                <div style="width:3px;height:18px;background-color:#3D90EE"></div>
                <div style="padding-left:15px;line-height:18px; font-weight: 600;">留存用户</div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
          <line-chart :chart-data="lineChartData" />
        </el-row>
      </el-col>
      <el-col :span="8" style="padding:15px">
        <el-col :span="24">
          <div class="rightTab">
            <div style="padding:15px 30px" class="ly-flex">
              <div style="width:3px;height:18px;background-color:#3D90EE"></div>
              <div style="padding-left:15px;line-height:18px; font-weight: 600;">业务管理</div>
            </div>
            <div class="ly-flex ly-direction-c ly-align-c ly-justify-sb rightTabDiv">
              <div
                class="rightTabItem ly-flex ly-align-c"
                style="background-image: linear-gradient( #3D90EE, #80BBFE);"
              >
                <div class="rightTabItemEl ly-flex ly-justify-sa">
                  <svg-icon icon-class="shopping" class-name="iconCss" />
                  <div class="ly-flex ly-direction-c ly-justify-sa">
                    <div class="rightTabItemElNumber">100</div>
                    <div class="rightTabItemElText">运营商总数</div>
                  </div>
                </div>
                <div style="background-color: #FFFFFF;width:1px;height:50%"></div>
                <div class="rightTabItemEl ly-flex ly-justify-sa">
                  <svg-icon icon-class="shopping" class-name="iconCss" />
                  <div class="ly-flex ly-direction-c ly-justify-sa">
                    <div class="rightTabItemElNumber">100</div>
                    <div class="rightTabItemElText">运营商总数</div>
                  </div>
                </div>
              </div>
              <div
                class="rightTabItem ly-flex ly-align-c"
                style="background-image: linear-gradient(#13BC83, #51F1BB);"
              >
                <div class="rightTabItemEl ly-flex ly-justify-sa">
                  <svg-icon icon-class="shopping" class-name="iconCss" />
                  <div class="ly-flex ly-direction-c ly-justify-sa">
                    <div class="rightTabItemElNumber">100</div>
                    <div class="rightTabItemElText">运营商总数</div>
                  </div>
                </div>
                <div style="background-color: #FFFFFF;width:1px;height:50%"></div>
                <div class="rightTabItemEl ly-flex ly-justify-sa">
                  <svg-icon icon-class="shopping" class-name="iconCss" />
                  <div class="ly-flex ly-direction-c ly-justify-sa">
                    <div class="rightTabItemElNumber">100</div>
                    <div class="rightTabItemElText">运营商总数</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="card-panel" @click="handleSetLineChartData('shoppings')">
            <div class="card-panel-icon-wrapper icon-shopping">
              <svg-icon icon-class="shopping" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">Shoppings</div>
              <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num" />
            </div>
          </div>-->
        </el-col>
        <el-col :span="24" style="padding-top: 20px;">
          <div class="rightTabTo2">
            <div style="padding:15px 30px" class="ly-flex">
              <div style="width:3px;height:18px;background-color:#3D90EE"></div>
              <div style="padding-left:15px;line-height:18px; font-weight: 600;">商品30天销量</div>
            </div>
          </div>
          <el-col :span="24"></el-col>
        </el-col>
        <!-- <panel-group @handleSetLineChartData="handleSetLineChartData" :propsData="propsData" />
        <panel-group @handleSetLineChartData="handleSetLineChartData" :propsData="propsData" />-->
      </el-col>
    </el-row>

    <!-- <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>-->

    <!-- <el-row :gutter="8">
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 24}"
        :lg="{span: 12}"
        :xl="{span: 12}"
        style="padding-right:8px;margin-bottom:30px;"
      >
        <transaction-table />
      </el-col>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 12}"
        :md="{span: 12}"
        :lg="{span: 6}"
        :xl="{span: 6}"
        style="margin-bottom:30px;"
      >
        <todo-list />
      </el-col>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 12}"
        :md="{span: 12}"
        :lg="{span: 6}"
        :xl="{span: 6}"
        style="margin-bottom:30px;"
      >
        <box-card />
      </el-col>
    </el-row>-->
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard
  },
  data() {
    return {
      propsData: [
        {
          icon: 'peoples',
          text: '实验',
          end: 240,
          type: 'newVisitis'
        },
        {
          icon: 'message',
          text: '实验2',
          end: 246,
          type: 'messages'
        },
        {
          icon: 'money',
          text: '实验3',
          end: 2046,
          type: 'purchases'
        },
        {
          icon: 'shopping',
          text: '实验4',
          end: 2123,
          type: 'shoppings'
        }
      ],
      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    handleSetLineChartData(type) {
      console.log(type, 'type')
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.leftTab {
  height: 150px;
  background-color: white;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);
}
.rightTab {
  height: 290px;
  background-color: white;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);
  .rightTabDiv {
    height: calc(100% - 76px);
    .rightTabItem {
      border-radius: 3px;
      width: 85%;
      height: 48%;
      .rightTabItemEl {
        width: 48%;
        .iconCss {
          font-size: 48px;
          color: white;
        }
        .rightTabItemElNumber {
          font-size: 20px;
          font-weight: 600;
          line-height: 20px;
          color: #ffffff;
        }
        .rightTabItemElText {
          color: white;
          line-height: 15px;
          font-size: 15px;
        }
      }
    }
  }
}
.rightTabTo2 {
  height: 365px;
  background-color: white;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);
}
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
