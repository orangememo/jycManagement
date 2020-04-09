<template>
	<div style="width: 90%;">
		<div class="filter-container">
			<el-input
				v-model="listQuery.title"
				placeholder="请输入酒店名称"
				style="width: 200px;"
				class="filter-item"
				@keyup.enter.native="handleFilter"
			/>
			<el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
			<el-button class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button>
		</div>
		<el-table :data="list" style="width: 100%">
			<el-table-column label="酒品名称" prop="jname"></el-table-column>
			<el-table-column label="库存数量" prop="number"></el-table-column>
			<el-table-column label="采购价格" prop="price"></el-table-column>
			<el-table-column label="采购数量(瓶)">
				<template slot-scope="scope">
					<el-input-number v-model="scope.row.need" :step="6"></el-input-number>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	data() {
		return {
			searchText: '',
			listQuery: {},
			list: [
				{ id: 11, jname: "豪情", price: 900, commodityId: 2, number: 38, need: 0 },
				{ id: 12, jname: "豪爽", price: 600, commodityId: 3, number: 77, need: 0 },
				{ id: 13, jname: "豪饮", price: 300, commodityId: 4, number: 15, need: 0 }
			]
		}
	},
	created() {},
	mounted() {
		this.getList();
	},
	computed: {},
	methods: {
		getList(){
			 let _this = this;
			this.list.map(item=>{
				item.createtime = _this.$dateFormat(item.createtime);
			})
		},
		showSum(index) {
			this.activeClass = index
		},
		handleFilter() {},
		handleDownload() {},
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