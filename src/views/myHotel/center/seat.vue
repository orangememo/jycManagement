<template>
	<div style="width: 90%;">
		<div class="filter-container">
			<el-select v-model="timeType" placeholder="请选择" style="width: 200px" class="filter-item">
				<el-option label="全部" value="5" />
				<el-option label="午市" value="0" />
				<el-option label="晚市" value="1" />
				<el-option label="失效" value="-1" />
			</el-select>
			<el-select v-model="type" placeholder="请选择" style="width: 200px" class="filter-item">
				<el-option v-for="(item,index) in tableType" :key="index" :label="item.name" :value="item.id" />
			</el-select>
			<span>预约号码:</span>
			<el-input v-model="phone" style="width: 200px;" class="filter-item" />
			<span>日期:</span>
			<el-date-picker v-model="chooseDate" type="date" placeholder="请选择日期"></el-date-picker>
			<el-button class="filter-item" type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
			<el-button class="filter-item" type="primary" icon="el-icon-download" @click="exportExcel">导出</el-button>
		</div>
		<el-table :data="list" style="width: 100%">
			<el-table-column label="订单编号" prop="id"></el-table-column>
			<el-table-column label="所在包厢">
				<template slot-scope="scope">{{scope.row.tableInfos ? scope.row.tableInfos[0].name : '暂未绑定'}}</template>
			</el-table-column>
			<el-table-column label="座位人数" prop="num"></el-table-column>
			<el-table-column label="预约人" prop="username"></el-table-column>
			<el-table-column label="预约菜单">
				<template slot-scope="{row}">
					<el-button type="primary" size="mini" @click="showMenu(row)">查看</el-button>
				</template>
			</el-table-column>
			<el-table-column label="联系方式" prop="mobile"></el-table-column>
			<el-table-column label="订单总价">
				<template slot-scope="scope">{{scope.row.menuInfoList ? scope.row.menuInfoList.price : 0}}</template>
			</el-table-column>
			<el-table-column label="预定时间" width="200" prop="scheduledtime"></el-table-column>
			<el-table-column label="备注" prop="explaincontent"></el-table-column>
			<el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
				<template slot-scope="{row,$index}">
					<el-button type="primary" size="mini" @click="handleUpdate(row)">编辑</el-button>
					<el-button
						v-if="row.status!='deleted'"
						size="mini"
						type="danger"
						@click="handleDelete(row,$index)"
					>删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog :visible.sync="menuStatus" title="预约菜品信息" width="1000px">
			<div class="demo-drawer__content form-box" style="width:100%;">
				<el-table :data="menuList" max-height="500">
					<el-table-column label="菜品名称" prop="name"></el-table-column>
					<el-table-column label="菜品图片">
						<template slot-scope="scope">
							<el-image :src="hostUrl+scope.row.img"></el-image>
						</template>
					</el-table-column>
					<el-table-column label="单价" prop="money"></el-table-column>
					<el-table-column label="数量" prop="nums"></el-table-column>
					<el-table-column label="合计" prop="total"></el-table-column>
				</el-table>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="menuStatus=false">关闭</el-button>
			</span>
		</el-dialog>

		<el-dialog :title="dialogTitle" :visible.sync="dialogStatus" width="800px">
			<div class="demo-drawer__content form-box" style="width:100%">
				<el-form :model="newSeat">
					<el-form-item label="预约人" :label-width="formLabelWidth">
						<el-input autocomplete="off" v-model="newSeat.username" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="联系方式" :label-width="formLabelWidth">
						<div class>{{newSeat.mobile}}</div>
					</el-form-item>
					<el-form-item label="订单总价" :label-width="formLabelWidth">
						<el-input autocomplete="off" v-model="newSeat.menuInfoList.price" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="预定时间">
						<el-date-picker v-model="newSeat.scheduledtime" type="date"></el-date-picker>
					</el-form-item>
					<el-form-item label="所在包厢">
						<el-input type="text" v-model="newSeat.tableInfos[0].name" :disabled="true"></el-input>
					</el-form-item>
					<div class="text-blue" @click="changeTableInfo">选座</div>
					<el-popover placement="right" width="400" trigger="manual" v-model="changeTable">
						<el-cascader :options="options" :show-all-levels="false" @change="clicks"></el-cascader>
						<el-button class="margin-left" @click="bindHouse">确定</el-button>
					</el-popover>
					<el-form-item label="座位人数">
						<el-input type="text" v-model="newSeat.num" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="备注">
						<el-input type="textarea" v-model="newSeat.explaincontent" :disabled="true"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="changeSeat">确 定</el-button>
				<el-button @click="dialogStatus = false">取 消</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	data() {
		return {
			searchText: '',
			listQuery: {},
			phone: '', //预约号码
			timeType: '5', //午市/晚市
			type: '', //包厢类型
			chooseDate: '', //日期
			tableType: [
				{
					id: 8,
					name: '一楼大厅',
					image:
						'/uploads/20200115/3a1032ae8d9158186a64b7df541acdaf.jpg',
					createtime: 1579058646,
					count: 18
				},
				{
					id: 9,
					name: '二楼大厅',
					image:
						'/uploads/20200115/cdf296d7a806fe88d26d2f4ab6d5c854.jpg',
					createtime: 1579058661,
					count: 8
				},
				{
					id: 10,
					name: '一楼包房',
					image:
						'/uploads/20200115/91b40d174de6ddbc959a90a9c8edf54a.jpg',
					createtime: 1579058678,
					count: 11
				},
				{
					id: 11,
					name: '二楼包房',
					image:
						'/uploads/20200115/655e93b6b2abfd9f14ba2241c085b721.jpg',
					createtime: 1579058691,
					count: 9
				}
			],
			list: [
				{
					id: 74,
					createtime: 1582963167,
					username: 'Mr.徐',
					time: 1,
					mobile: '13636310537',
					scheduledtime: 1582971904,
					status: '3',
					lpMenuOrderId: 49,
					menuInfoList: {
						id: 49,
						dishTypeDetailsIds:
							'188:1,134:1,284:1,280:1,347:3,342:1,210:1,234:1',
						price: 300.0,
						status: 2,
						orderIds: '20200120115358s19267408',
						menuInfoList: [
							{
								name: '蟹粉豆腐 ',
								money: 48.0,
								img:
									'/uploads/20200115/862a9c29b53cf1049d9c1d789ffa72f6.png',
								nums: 1,
								total: 48.0
							},
							{
								name: '椒盐龙头烤',
								money: 38.0,
								img:
									'/uploads/20200115/c90cee619bc66def3d53ae8e371ab14b.jpg',
								nums: 1,
								total: 38.0
							},
							{
								name: '芸豆鸡脆骨',
								money: 58.0,
								img:
									'/uploads/20200116/75d4d773098f46d92c6bf2a3306bafbc.jpg',
								nums: 1,
								total: 58.0
							},
							{
								name: '扬州煮干丝',
								money: 32.0,
								img:
									'/uploads/20200116/aeefce2b66b739bee5cc842c2c739d89.jpg',
								nums: 1,
								total: 32.0
							},
							{
								name: '粢饭糕（3只起售) ',
								money: 3.0,
								img:
									'/uploads/20200116/ecd5dba7c536daf4647f8850568586a6.jpg',
								nums: 3,
								total: 9.0
							},
							{
								name: '四川腊肉炒饭',
								money: 28.0,
								img:
									'/uploads/20200116/cf76f7c08dc746800067ef81deba54ae.jpg',
								nums: 1,
								total: 28.0
							},
							{
								name: '金沙藕饼',
								money: 39.0,
								img:
									'/uploads/20200116/b3c54757d347611f853501367d6ad765.jpg',
								nums: 1,
								total: 39.0
							},
							{
								name: '糖醋小排',
								money: 48.0,
								img:
									'/uploads/20200116/62e7fe46fef7d1fc69754d5904b60728.jpg',
								nums: 1,
								total: 48.0
							}
						]
					},
					hotelTableDetailsId: '50',
					tableInfos: [
						{
							id: 50,
							name: '02',
							number: '02',
							hotelTableId: '8',
							images:
								'/uploads/20200403/4b9c6399-44fa-4470-832e-988d6c8164fb.jpg',
							explaincontent: '4人坐'
						}
					],
					userId: null,
					hotelId: null,
					num: 2,
					wineList: [
						{
							price: 300,
							image:
								'/uploads/20190604/f6507d2aaf66f6fb473bce56027ccde9.jpg',
							name: '豪饮',
							num: 1
						}
					]
				},
				{
					id: 53,
					createtime: 1581658037,
					username: 'Mr.徐',
					time: 1,
					mobile: '13636310537',
					scheduledtime: 1581679598,
					status: '3',
					lpMenuOrderId: 27,
					menuInfoList: {
						id: 27,
						dishTypeDetailsIds: '201:1,200:1,199:1',
						price: 304.0,
						status: 2,
						orderIds: '20200120115358s19267408',
						menuInfoList: [
							{
								name: '竹蛏王  一斤',
								money: 68.0,
								img:
									'/uploads/20200115/4e3af38cb2c2b23acb07f8be1be7f535.jpg',
								nums: 1,
								total: 68.0
							},
							{
								name: '珍珠斑  一斤',
								money: 68.0,
								img:
									'/uploads/20200115/82951de0c1d0a796f91080bd5b6d38da.jpg',
								nums: 1,
								total: 68.0
							},
							{
								name: '珍宝蚧  一斤',
								money: 168.0,
								img:
									'/uploads/20200115/b6ba6c79f9ba6deef3294e4710772d7c.jpg',
								nums: 1,
								total: 168.0
							}
						]
					},
					hotelTableDetailsId: '50',
					tableInfos: [
						{
							id: 50,
							name: '02',
							number: '02',
							hotelTableId: '8',
							images:
								'/uploads/20200403/4b9c6399-44fa-4470-832e-988d6c8164fb.jpg',
							explaincontent: '4人坐'
						}
					],
					userId: null,
					hotelId: null,
					num: 3,
					wineList: [
						{
							price: 300,
							image:
								'/uploads/20190604/f6507d2aaf66f6fb473bce56027ccde9.jpg',
							name: '豪饮',
							num: 1
						}
					]
				}
			],
			dialogStatus: false,
			newSeat: {
				username: '',
				mobile: '',
				num: 0,
				menuInfoList: {
					price: 0
				},
				tableInfos: [{ name: '' }],
				scheduledtime: '',
				explaincontent: ''
			},
			dialogTitle: '预约详情',
			formLabelWidth: '180',
			menuStatus: false,
			menuList: [],
			changeTable: false,
			options: [],
			house: [],
			seatId: '',
			res: [
				{
					id: 51,
					number: '05',
					name: '05',
					images:
						'/uploads/20200115/3a1032ae8d9158186a64b7df541acdaf.jpg',
					status: 1,
					createtime: 1579058863,
					type: 1,
					identification: 1,
					hotelTableId: '8',
					explaincontent: '4人坐'
				},
				{
					id: 52,
					number: '06',
					name: '06',
					images:
						'/uploads/20200115/3a1032ae8d9158186a64b7df541acdaf.jpg',
					status: 1,
					createtime: 1579058903,
					type: 1,
					identification: 1,
					hotelTableId: '8',
					explaincontent: '2人坐'
				},
				{
					id: 53,
					number: '07',
					name: '07',
					images:
						'/uploads/20200115/3a1032ae8d9158186a64b7df541acdaf.jpg',
					status: 1,
					createtime: 1579058939,
					type: 1,
					identification: 1,
					hotelTableId: '8',
					explaincontent: '4人坐'
				},
				{
					id: 54,
					number: '08',
					name: '08',
					images:
						'/uploads/20200115/3a1032ae8d9158186a64b7df541acdaf.jpg',
					status: 1,
					createtime: 1579058985,
					type: 1,
					identification: 1,
					hotelTableId: '8',
					explaincontent: '4人坐'
				},
				{
					id: 55,
					number: '09',
					name: '09',
					images:
						'/uploads/20200115/3a1032ae8d9158186a64b7df541acdaf.jpg',
					status: 1,
					createtime: 1579059012,
					type: 1,
					identification: 1,
					hotelTableId: '8',
					explaincontent: '4人坐'
				},
				{
					id: 56,
					number: '11',
					name: '11',
					images:
						'/uploads/20200115/3a1032ae8d9158186a64b7df541acdaf.jpg',
					status: 1,
					createtime: 1579059065,
					type: 1,
					identification: 1,
					hotelTableId: '8',
					explaincontent: '4人坐'
				},
				{
					id: 57,
					number: '12',
					name: '12',
					images:
						'/uploads/20200115/3a1032ae8d9158186a64b7df541acdaf.jpg',
					status: 1,
					createtime: 1579059088,
					type: 1,
					identification: 1,
					hotelTableId: '8',
					explaincontent: '4人坐'
				},
				{
					id: 58,
					number: '15',
					name: '15',
					images:
						'/uploads/20200115/3a1032ae8d9158186a64b7df541acdaf.jpg',
					status: 1,
					createtime: 1579059115,
					type: 1,
					identification: 1,
					hotelTableId: '8',
					explaincontent: '4人坐'
				},
				{
					id: 59,
					number: '16',
					name: '16',
					images:
						'/uploads/20200115/3a1032ae8d9158186a64b7df541acdaf.jpg',
					status: 1,
					createtime: 1579059152,
					type: 1,
					identification: 1,
					hotelTableId: '8',
					explaincontent: '6人坐'
				},
				{
					id: 60,
					number: '17',
					name: '17',
					images:
						'/uploads/20200115/3a1032ae8d9158186a64b7df541acdaf.jpg',
					status: 1,
					createtime: 1579059180,
					type: 1,
					identification: 1,
					hotelTableId: '8',
					explaincontent: '12人坐'
				},
				{
					id: 61,
					number: '18',
					name: '18',
					images:
						'/uploads/20200115/3a1032ae8d9158186a64b7df541acdaf.jpg',
					status: 1,
					createtime: 1579059199,
					type: 1,
					identification: 1,
					hotelTableId: '8',
					explaincontent: '12人坐'
				},
				{
					id: 62,
					number: '19',
					name: '19',
					images:
						'/uploads/20200115/3a1032ae8d9158186a64b7df541acdaf.jpg',
					status: 1,
					createtime: 1579059239,
					type: 1,
					identification: 1,
					hotelTableId: '8',
					explaincontent: '12人坐'
				},
				{
					id: 63,
					number: '20',
					name: '20',
					images:
						'/uploads/20200115/3a1032ae8d9158186a64b7df541acdaf.jpg',
					status: 1,
					createtime: 1579059272,
					type: 1,
					identification: 1,
					hotelTableId: '8',
					explaincontent: '12人坐'
				},
				{
					id: 64,
					number: '21',
					name: '21',
					images:
						'/uploads/20200115/3a1032ae8d9158186a64b7df541acdaf.jpg',
					status: 1,
					createtime: 1579059300,
					type: 1,
					identification: 1,
					hotelTableId: '8',
					explaincontent: '16人坐'
				},
				{
					id: 65,
					number: '22',
					name: '22',
					images:
						'/uploads/20200115/3a1032ae8d9158186a64b7df541acdaf.jpg',
					status: 1,
					createtime: 1579059391,
					type: 1,
					identification: 1,
					hotelTableId: '8',
					explaincontent: '16人坐'
				},
				{
					id: 66,
					number: '25',
					name: '25',
					images:
						'/uploads/20200115/3a1032ae8d9158186a64b7df541acdaf.jpg',
					status: 1,
					createtime: 1579059407,
					type: 1,
					identification: 1,
					hotelTableId: '8',
					explaincontent: '16人坐'
				},
				{
					id: 67,
					number: '26',
					name: '26',
					images:
						'/uploads/20200115/3a1032ae8d9158186a64b7df541acdaf.jpg',
					status: 1,
					createtime: 1579059423,
					type: 1,
					identification: 1,
					hotelTableId: '8',
					explaincontent: '16人坐'
				},
				{
					id: 68,
					number: '103',
					name: '103',
					images:
						'/uploads/20200115/cd8f19c292e33dd6912a34b309969926.jpg',
					status: 1,
					createtime: 1579059975,
					type: 1,
					identification: 1,
					hotelTableId: '10',
					explaincontent: '88人场'
				},
				{
					id: 69,
					number: 'V1',
					name: 'V1',
					images:
						'/uploads/20200115/91b40d174de6ddbc959a90a9c8edf54a.jpg',
					status: 1,
					createtime: 1579060030,
					type: 1,
					identification: 1,
					hotelTableId: '10',
					explaincontent: '16人坐'
				},
				{
					id: 70,
					number: 'V5',
					name: 'V5',
					images:
						'/uploads/20200115/91b40d174de6ddbc959a90a9c8edf54a.jpg',
					status: 1,
					createtime: 1579060071,
					type: 1,
					identification: 1,
					hotelTableId: '10',
					explaincontent: '12人坐'
				},
				{
					id: 71,
					number: 'V7',
					name: 'V7',
					images:
						'/uploads/20200115/91b40d174de6ddbc959a90a9c8edf54a.jpg',
					status: 1,
					createtime: 1579060087,
					type: 1,
					identification: 1,
					hotelTableId: '10',
					explaincontent: '12人坐'
				},
				{
					id: 72,
					number: 'V8',
					name: 'V8',
					images:
						'/uploads/20200115/91b40d174de6ddbc959a90a9c8edf54a.jpg',
					status: 1,
					createtime: 1579060117,
					type: 1,
					identification: 1,
					hotelTableId: '10',
					explaincontent: '16人坐'
				},
				{
					id: 73,
					number: 'V9',
					name: 'V9',
					images:
						'/uploads/20200115/91b40d174de6ddbc959a90a9c8edf54a.jpg',
					status: 1,
					createtime: 1579060133,
					type: 1,
					identification: 1,
					hotelTableId: '10',
					explaincontent: '16人坐'
				},
				{
					id: 74,
					number: '品尊1号',
					name: '品尊1号',
					images:
						'/uploads/20200115/e2025cfd26c33281d61555fd348b11a3.jpg',
					status: 1,
					createtime: 1579060234,
					type: 1,
					identification: 1,
					hotelTableId: '10',
					explaincontent: '12人坐'
				},
				{
					id: 75,
					number: '品尊2号',
					name: '品尊2号',
					images:
						'/uploads/20200115/e2025cfd26c33281d61555fd348b11a3.jpg',
					status: 1,
					createtime: 1579060268,
					type: 1,
					identification: 1,
					hotelTableId: '10',
					explaincontent: '10人坐'
				},
				{
					id: 76,
					number: '品尊3号',
					name: '品尊3号',
					images:
						'/uploads/20200115/e2025cfd26c33281d61555fd348b11a3.jpg',
					status: 1,
					createtime: 1579060294,
					type: 1,
					identification: 1,
					hotelTableId: '10',
					explaincontent: '12人坐'
				},
				{
					id: 77,
					number: '品尊5号',
					name: '品尊5号',
					images:
						'/uploads/20200115/e2025cfd26c33281d61555fd348b11a3.jpg',
					status: 1,
					createtime: 1579060316,
					type: 1,
					identification: 1,
					hotelTableId: '10',
					explaincontent: '16人坐'
				},
				{
					id: 78,
					number: '品尊6号',
					name: '品尊6号',
					images:
						'/uploads/20200115/e2025cfd26c33281d61555fd348b11a3.jpg',
					status: 1,
					createtime: 1579060340,
					type: 1,
					identification: 1,
					hotelTableId: '10',
					explaincontent: '12人坐'
				},
				{
					id: 79,
					number: '01',
					name: '01',
					images:
						'/uploads/20200115/cdf296d7a806fe88d26d2f4ab6d5c854.jpg',
					status: 1,
					createtime: 1579060425,
					type: 1,
					identification: 1,
					hotelTableId: '9',
					explaincontent: '12人坐'
				},
				{
					id: 80,
					number: '02',
					name: '02',
					images:
						'/uploads/20200115/cdf296d7a806fe88d26d2f4ab6d5c854.jpg',
					status: 1,
					createtime: 1579060451,
					type: 1,
					identification: 1,
					hotelTableId: '9',
					explaincontent: '12人坐'
				},
				{
					id: 81,
					number: '05',
					name: '05',
					images:
						'/uploads/20200115/cdf296d7a806fe88d26d2f4ab6d5c854.jpg',
					status: 1,
					createtime: 1579060472,
					type: 1,
					identification: 1,
					hotelTableId: '9',
					explaincontent: '12人坐'
				},
				{
					id: 82,
					number: '06',
					name: '06',
					images:
						'/uploads/20200115/cdf296d7a806fe88d26d2f4ab6d5c854.jpg',
					status: 1,
					createtime: 1579060495,
					type: 1,
					identification: 1,
					hotelTableId: '9',
					explaincontent: '12人坐'
				},
				{
					id: 83,
					number: '08',
					name: '08',
					images:
						'/uploads/20200115/cdf296d7a806fe88d26d2f4ab6d5c854.jpg',
					status: 1,
					createtime: 1579060515,
					type: 1,
					identification: 1,
					hotelTableId: '9',
					explaincontent: '12人坐'
				},
				{
					id: 84,
					number: '09',
					name: '09',
					images:
						'/uploads/20200115/cdf296d7a806fe88d26d2f4ab6d5c854.jpg',
					status: 1,
					createtime: 1579060535,
					type: 1,
					identification: 1,
					hotelTableId: '9',
					explaincontent: '12人坐'
				},
				{
					id: 85,
					number: '11',
					name: '11',
					images:
						'/uploads/20200115/cdf296d7a806fe88d26d2f4ab6d5c854.jpg',
					status: 1,
					createtime: 1579060555,
					type: 1,
					identification: 1,
					hotelTableId: '9',
					explaincontent: '12人坐'
				},
				{
					id: 86,
					number: '12',
					name: '12',
					images:
						'/uploads/20200115/cdf296d7a806fe88d26d2f4ab6d5c854.jpg',
					status: 1,
					createtime: 1579060573,
					type: 1,
					identification: 1,
					hotelTableId: '9',
					explaincontent: '12人坐'
				},
				{
					id: 87,
					number: '雅1',
					name: '雅1',
					images:
						'/uploads/20200115/667552eb95ec7bcc6bc9d9a8f008770c.jpg',
					status: 1,
					createtime: 1579060722,
					type: 1,
					identification: 1,
					hotelTableId: '11',
					explaincontent: '12人坐'
				},
				{
					id: 88,
					number: '雅2',
					name: '雅2',
					images:
						'/uploads/20200115/667552eb95ec7bcc6bc9d9a8f008770c.jpg',
					status: 1,
					createtime: 1579060747,
					type: 1,
					identification: 1,
					hotelTableId: '11',
					explaincontent: '12人坐'
				},
				{
					id: 89,
					number: '雅3',
					name: '雅3',
					images:
						'/uploads/20200115/667552eb95ec7bcc6bc9d9a8f008770c.jpg',
					status: 1,
					createtime: 1579060776,
					type: 1,
					identification: 1,
					hotelTableId: '11',
					explaincontent: '12人坐'
				},
				{
					id: 90,
					number: 'VIP1',
					name: 'VIP1',
					images:
						'/uploads/20200115/d236c7343a7cdc1de3c7c560188f6f58.jpg',
					status: 1,
					createtime: 1579060803,
					type: 1,
					identification: 1,
					hotelTableId: '11',
					explaincontent: '12人坐'
				},
				{
					id: 91,
					number: 'VIP2',
					name: 'VIP2',
					images:
						'/uploads/20200115/d236c7343a7cdc1de3c7c560188f6f58.jpg',
					status: 1,
					createtime: 1579060820,
					type: 1,
					identification: 1,
					hotelTableId: '11',
					explaincontent: '12人坐'
				},
				{
					id: 92,
					number: 'VIP5',
					name: 'VIP5',
					images:
						'/uploads/20200115/d236c7343a7cdc1de3c7c560188f6f58.jpg',
					status: 1,
					createtime: 1579060841,
					type: 1,
					identification: 1,
					hotelTableId: '11',
					explaincontent: '12人坐'
				},
				{
					id: 93,
					number: 'VIP8',
					name: 'VIP8',
					images:
						'/uploads/20200115/d236c7343a7cdc1de3c7c560188f6f58.jpg',
					status: 1,
					createtime: 1579060867,
					type: 1,
					identification: 1,
					hotelTableId: '11',
					explaincontent: '12人坐'
				},
				{
					id: 94,
					number: 'VIP9',
					name: 'VIP9',
					images:
						'/uploads/20200115/d236c7343a7cdc1de3c7c560188f6f58.jpg',
					status: 1,
					createtime: 1579060900,
					type: 1,
					identification: 1,
					hotelTableId: '11',
					explaincontent: '14人坐'
				},
				{
					id: 95,
					number: '宴会厅',
					name: '宴会厅',
					images:
						'/uploads/20200115/cd8f19c292e33dd6912a34b309969926.jpg',
					status: 1,
					createtime: 1579061054,
					type: 1,
					identification: 1,
					hotelTableId: '11',
					explaincontent: '30人场'
				},
				{
					id: 170,
					number: 'A03',
					name: 'A03',
					images:
						'/uploads/20200403/5283c174a4db45d401f839e780bfcd46.jpg',
					status: 1,
					createtime: 1585898341,
					type: 1,
					identification: 1,
					hotelTableId: '17',
					explaincontent: '1'
				},
				{
					id: 171,
					number: 'A03',
					name: 'A03',
					images:
						'/uploads/20200403/5283c174a4db45d401f839e780bfcd46.jpg',
					status: 1,
					createtime: 1585898399,
					type: 1,
					identification: 1,
					hotelTableId: '18',
					explaincontent: '1'
				}
			],
			sessKzId: '',
			kzId: ''
		}
	},
	created() {},
	mounted() {
		this.getList()
	},
	computed: {},
	methods: {
		getList() {
			let _this = this
			this.list.map(item => {
				item.scheduledtime
					? (item.scheduledtime = _this.$dateFormat(item.createtime))
					: ''
				item.createtime = _this.$dateFormat(item.createtime)
			})
		},
		showSum(index) {
			this.activeClass = index
		},
		showMenu(item) {
			this.menuStatus = true
			this.menuList = item.menuInfoList.menuInfoList
		},
		handleUpdate(item) {
			this.dialogStatus = true
			this.newSeat = item
		},
		handleDelete(item, index) {},
		changeSeat() {},
		exportExcel() {},
		changeTableInfo() {
			let _this = this
			_this.changeTable = true
			if (_this.res) {
				_this.houses = _this.res
				_this.options = _this.tableType.map(item => {
					const data = []
					_this.res.forEach(val => {
						if (val.hotelTableId == item.id) {
							data.push({ value: val.id, label: val.name })
						}
					})
					return {
						value: item.id,
						label: item.name,
						children: data
					}
				})
			}
		},
		clicks(value) {
			let _this = this
			_this.sessKzId = value[1]
		},
		bindHouse() {
			let _this = this;
			if (_this.sessKzId) {
				_this.kzId = _this.sessKzId
				_this.res.map(item => {
					if (item.id == _this.kzId) {
						_this.newSeat.tableInfos[0].name = item.name
						return
					}
				})
			}
			_this.changeTable = false
		}
	}
}
</script>

<style scoped>
/* 列表样式 */
.list-box {
	padding-top: 30px;
}
.el-row {
	width: 1220px;
	margin: 0 auto 20px !important;
}
.el-col {
	border-radius: 4px;
	margin-bottom: 20px;
	min-width: 290px;
	position: relative;
}
.el-col:last-child {
	margin-bottom: 0;
}
.bg-purple-dark {
	background: #99a9bf;
}
.el-col .hide-cont {
	position: absolute;
	z-index: 1;
	left: 20px;
	width: 290px;
	opacity: 0;
}
.el-col:hover .hide-cont {
	opacity: 1;
}
.hide-cont > div {
	color: #ffffff;
	z-index: 1;
	position: relative;
}
.el-col .mask {
	position: absolute;
	z-index: 0;
	left: 0;
	width: 290px;
	height: 300px;
	background: #000000;
	opacity: 0.5;
	border-radius: 4px;
}
.hide-cont .hide-title {
	font-size: 24px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 65px;
	margin-top: 15px;
}
.hide-cont .hide-textre {
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 24px;
	width: 244px;
	margin: 0 auto 20px;
}
.hide-cont .hotel-list {
	width: 80px;
	height: 100px;
	position: relative;
}

.hide-cont .hotel-list > .mask {
	position: absolute;
	width: 80px;
	height: 100px;
	background-color: #000000;
	border-radius: 4px;
	opacity: 0;
	z-index: 0;
}
.hide-cont .hotel-list:hover .mask {
	opacity: 0.4;
}
.hotel-list .list-cont {
	width: 80px;
	height: 100px;
	position: relative;
	z-index: 2;
}
.hotel-list .list-cont div {
	font-size: 12px;
	font-weight: normal;
	line-height: 14px;
	color: #ffffff;
}
.hotel-list .list-cont .hotel-icon {
	width: 30px;
	height: 29px;
	margin: 23px auto 10px;
}
.el-col .item-show-text {
	width: 290px;
	background: #000000;
	opacity: 0.5;
	font-size: 24px;
	line-height: 65px;
	color: #ffffff;
	position: absolute;
	bottom: 3px;
	left: 20px;
}
.el-col:hover .item-show-text {
	opacity: 0;
}
.bg-purple {
	background: #d3dce6;
}
.bg-purple-light {
	background: #e5e9f2;
}
.grid-content {
	border-radius: 4px;
	min-height: 36px;
}
.row-bg {
	padding: 10px 0;
	background-color: #f9fafc;
}
.list-box .list-img {
	width: 290px;
	height: 300px;
}
</style>