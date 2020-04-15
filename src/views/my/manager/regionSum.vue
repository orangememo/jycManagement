<template>
	<div style="width: 90%;">
		<!-- <el-image :src="require('../../../assets/my/admin-banner.png')"></el-image> -->
		<div class="cont-body">
			<div class="form-box" style="margin-top:15px">
				<div class="form-title text-red flex">
					<el-image :src="require('../../../assets/my/ordertotal.png')" class="img-icon margin-lr-sm"></el-image>
					<div>订单信息汇总</div>
				</div>
			</div>
			<el-table
				:data="list"
				stripe
				style="margin: 30px 0;"
				row-class-name="row-class-jy"
				header-row-class-name="head-row-class-jy"
			>
				<el-table-column prop="jname" label="名称" width="180"></el-table-column>
				<el-table-column prop="img" label="图片" width="180">
					<template slot-scope="scope">
						<el-image :src="hostUrl+scope.row.img" width="40" height="40" class="head_pic"></el-image>
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
					<div
						class="choose-item"
						:class="activeClass == index ? 'actived':''"
						v-for="(item,index) in winlist"
						:key="index"
						@click="showSum(index)"
					>{{item.jname}}</div>
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
import echarts from 'echarts'
import store from '@/store'
import {
	getLpHotelQuyu,
	getLpHotelSelectqykc,
	getLpHotelSelectqyzxt
} from '@/api/hotel'

export default {
	data() {
		return {
			tabIndex: 0,
			activeClass: 0,
			list: [],
			winlist: []
		}
	},
	created() {},
	mounted() {
		this.getList()
		this.getWinList()
		this.getChart()
	},
	computed: {},
	methods: {
		getList() {
			let _this = this
			getLpHotelQuyu({ id: store.state.login.companyId }).then(data => {
				_this.list = data.result
			})
		},
		getWinList() {
			let _this = this
			getLpHotelSelectqykc({ id: store.state.login.companyId }).then(
				data => {
					_this.winlist = data.result
				}
			)
		},
		showSum(index) {
			this.activeClass = index
		},
		numEvFormart(row, column) {
			return this.zero(row.everys)
		},
		numWeekFormart(row, column) {
			return this.zero(row.week)
		},
		numMonFormart(row, column) {
			return this.zero(row.month)
		},
		zero(val) {
			val = val ? val : 0
			return val
		},
		async getChart(cid = null) {
			const that = this
			getLpHotelSelectqyzxt({ id: store.state.login.companyId }).then(
				data => {
					const res = data.result
					if (res) {
						res.forEach((val, i) => {
							var data = val
							data.num.forEach((item, index) => {
								data.num[index] = item == '-1' ? 0 : item
							})
							that.init(
								{
									date: data.date.reverse(),
									num: data.num.reverse()
								},
								i
							)
						})
					}
				}
			)
		},
		activeHead(e) {
			this.tabIndex = e
			this.getChart(this.winlist[e].id)
		},
		init(data, index) {
			var datas = [
				{
					title: '日统计(近7日)',
					color: '#00aaff',
					name: 'chart',
					xname: '日期',
					yname: '数量(单)'
				},
				{
					title: '周统计(近7周)',
					color: '#1bb934 ',
					name: 'chart1',
					xname: '日期',
					yname: '数量(单)'
				},
				{
					title: '月统计(近7月)',
					color: '#7f5be6',
					name: 'chart2',
					xname: '月份',
					yname: '数量(单)'
				}
			]
			let myChart = echarts.init(this.$refs[datas[index].name])
			myChart.setOption({
				animation: false,
				title: {
					left: 'left',
					text: datas[index].title
					// lineHeight: 40,
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: data.date,
					name: datas[index].xname
				},
				yAxis: {
					type: 'value',
					name: datas[index].yname
				},
				series: [
					{
						smooth: true,
						data: data.num,
						type: 'line',
						itemStyle: {
							color: datas[index].color
						},
						label: {
							normal: {
								show: true,
								position: 'top'
							}
						},
						areaStyle: {}
					}
				]
			})
		}
	}
}
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
.flex {
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