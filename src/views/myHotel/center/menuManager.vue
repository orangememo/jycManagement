<template>
	<div style="width: 90%;">
		<div class="filter-container">
			<span>请选择:</span>
			<el-select v-model="floor" style="width: 200px" class="filter-item">
				<el-option label="全部" />
				<el-option v-for="(item,index) in tableType" :key="index" :label="item.name" :value="item.id" />
			</el-select>
			<el-button class="filter-item" type="primary" icon="el-icon-search" @click="getList">查询</el-button>
			<el-popover placement="right" width="400" trigger="click">
				<jselect :url="1" v-on:refresh="refresh" :list="tableType" />
				<el-button class="filter-item" type="primary" icon="el-icon-edit" slot="reference">菜系管理</el-button>
			</el-popover>
			<el-button
				class="filter-item"
				type="primary"
				icon="el-icon-folder-add"
				@click="dialogStatus=true;"
			>添加菜品</el-button>
			<el-button class="filter-item" type="primary" icon="el-icon-download" @click="exportExcel">导出</el-button>
		</div>
		<el-table :data="list" style="width: 100%">
			<el-table-column label="编号" prop="number"></el-table-column>
			<el-table-column label="包厢图片">
				<template slot-scope="scope">
					<img style="width: 100px;" :src="hostUrl+scope.row.images" />
				</template>
			</el-table-column>
			<el-table-column label="包厢名称" prop="number"></el-table-column>
			<el-table-column label="创建时间" prop="createtime"></el-table-column>
		</el-table>

		<el-dialog :title="dialogTitle" :visible.sync="dialogStatus" width="800px">
			<div class="demo-drawer__content form-box" style="width:100%">
				<el-form :model="ruleForm">
					<el-form-item label="菜品名称" :label-width="formLabelWidth">
						<el-input autocomplete="off" v-model="ruleForm.name"></el-input>
					</el-form-item>
					<el-form-item label="菜品类型" :label-width="formLabelWidth">
						<el-select v-model="ruleForm.dishTypeId" style="width: 200px" class="filter-item">
							<el-option
								v-for="(item,index) in tableType"
								:key="index"
								:label="item.name"
								:value="item.id"
								:check="item.id==ruleForm.dishTypeId"
							/>
						</el-select>
					</el-form-item>
					<el-form-item label="菜品价格" :label-width="formLabelWidth">
						<el-input autocomplete="off" v-model="ruleForm.money"></el-input>
					</el-form-item>
					<el-form-item label="菜品图片"  prop="images" :label-width="formLabelWidth">
						<div>请上传包厢图片</div>
						<div class="padding-tb secondary">格式要求：支持jpg.png.jpeg.bmp格式照片，大小不能超过3M。</div>
						<upload v-on:uploadimg="uImg" />
					</el-form-item>
					<el-form-item label="菜品简介" :label-width="formLabelWidth">
						<el-input autocomplete="off" v-model="ruleForm.explaincontent"></el-input>
					</el-form-item>
					<el-form-item label="备注信息" :label-width="formLabelWidth">
						<el-input autocomplete="off" v-model="ruleForm.detailscontent"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="saveMenu">确 定</el-button>
				<el-button @click="dialogStatus = false">取 消</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import Jselect from '@/components/Jselect.vue'
import Upload from '@/components/Upload.vue'
export default {
	components: {
		Jselect,
		Upload
	},
	data() {
		return {
			searchText: '',
			listQuery: {},
			phone: '', //预约号码
			timeType: '5', //午市/晚市
			type: '', //包厢类型
			chooseDate: '', //日期
			floor: '全部',
			show: true,
			tabIndex: 0,
			tableType: [
				{
					id: 32,
					hotelId: 20,
					name: '套餐',
					image:
						'/uploads/20200206/6cbb563b-dd2a-4e81-aa93-4fa9ef15dde6.jpg',
					weigh: null,
					createtime: 1583198149,
					lpDishTypeDetails: null
				},
				{
					id: 12,
					hotelId: 20,
					name: '海鲜',
					image:
						'/uploads/20200115/65f783bfa90cb0ec271ed3b69479d874.png',
					weigh: 12,
					createtime: 1579065185,
					lpDishTypeDetails: null
				},
				{
					id: 13,
					hotelId: 20,
					name: '前菜凉菜',
					image:
						'/uploads/20200115/3efbc99b5adc7a965b981aa66ea437ae.jpg',
					weigh: 13,
					createtime: 1579065227,
					lpDishTypeDetails: null
				},
				{
					id: 14,
					hotelId: 20,
					name: '热菜',
					image:
						'/uploads/20200115/e0c2f546799be0b976d9b174572b1880.jpg',
					weigh: 14,
					createtime: 1579065257,
					lpDishTypeDetails: null
				},
				{
					id: 15,
					hotelId: 20,
					name: '时蔬',
					image:
						'/uploads/20200115/caf3dba68493ab8203ec20872ea00e67.jpg',
					weigh: 15,
					createtime: 1579065292,
					lpDishTypeDetails: null
				},
				{
					id: 16,
					hotelId: 20,
					name: '汤',
					image:
						'/uploads/20200115/78bf02ef60ff3836ae686d197a80f5ac.jpg',
					weigh: 16,
					createtime: 1579065334,
					lpDishTypeDetails: null
				},
				{
					id: 17,
					hotelId: 20,
					name: '主食点心',
					image:
						'/uploads/20200115/6d546ff38d5cc02d93ab5448b327f8b2.jpg',
					weigh: 17,
					createtime: 1579065386,
					lpDishTypeDetails: null
				}
			],
			list: [
				{
					id: 50,
					number: '02',
					name: '02',
					images:
						'/uploads/20200403/4b9c6399-44fa-4470-832e-988d6c8164fb.jpg',
					status: 1,
					createtime: 1579058798,
					type: 1,
					identification: 1,
					explaincontent: '4人坐'
				},
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
					explaincontent: '4人坐'
				}
			],
			dialogStatus: false,
			ruleForm: {
        name: "",
        explaincontent: "",
        detailscontent: "",
        money: "",
        dishTypeId: "",
        images: false
      },
      rules: {
        name: [{ required: true, message: "请输入名称" }],
        dishTypeId: [{ required: true, message: "请选择类型" }],
        money: [{ required: true, message: "请输入单价" }],
        images: [{ required: true, message: "请上传菜品图片" }]
      },
			dialogTitle: '添加菜品',
			formLabelWidth: '180',
			changeTable: false
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
		saveMenu() {},
		exportExcel() {},
		addSeat() {},
		refresh() {
			this.tabIndex = 0
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