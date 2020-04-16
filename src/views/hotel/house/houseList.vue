<template>
	<div>
		<div class="filter-container">
			<el-select
				v-model="house.type"
				placeholder="请选择包厢"
				style="width: 300px"
				class="filter-item"
				@change="changeHouseType"
			>
				<el-option
					v-for="(item,index) in houseTypeList"
					:key="index"
					:label="item.name"
					:value="item.id"
				/>
			</el-select>
			<el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchHouse">搜索</el-button>
			<!-- <el-button
				class="filter-item"
				style="margin-left: 10px;"
				type="primary"
				icon="el-icon-edit"
				@click="dialogStatus=true;form = {}"
			>添加</el-button> -->
			<el-button class="filter-item" type="primary" icon="el-icon-download" @click="exportExcel">导出</el-button>
		</div>
		<div>
			<el-table ref="multipleTable" :data="houseList" tooltip-effect="dark" style="width: 100%">
				<el-table-column prop="number" label="编号" width="200"></el-table-column>
				<el-table-column label="包厢图片" width="80">
					<template slot-scope="scope">
						<el-image :src="hostUrl+scope.row.images"></el-image>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="包厢名称" width="150"></el-table-column>
				<el-table-column prop="explaincontent" label="人数" width="150"></el-table-column>
				<el-table-column prop="createtime" label="创建时间" width="200"></el-table-column>
			</el-table>
		</div>
		<!-- <pagination
			v-show="res.total>0"
			:total="res.total"
			:page.sync="res.page"
			:limit.sync="res.limit"
			@pagination="searchFood"
		/>-->
		<el-dialog :title="dialogTitle" :visible.sync="dialogStatus" width="800px">
			<div class="demo-drawer__content form-box" style="width:100%">
				<el-form :model="form">
					<el-form-item label="菜品名称" :label-width="formLabelWidth" prop="name">
						<el-input autocomplete="off" v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="菜品类型" :label-width="formLabelWidth">
						<div class>{{form.typeTxt}}</div>
					</el-form-item>
					<el-form-item label="菜品价格" :label-width="formLabelWidth" prop="money">
						<el-input autocomplete="off" v-model="form.money"></el-input>
					</el-form-item>
					<el-form-item label="菜品简介">
						<el-input type="textarea" v-model="form.detailscontent"></el-input>
					</el-form-item>
					<el-form-item label="备注信息">
						<el-input type="textarea" v-model="form.explaincontent"></el-input>
					</el-form-item>
					<el-form-item label="修改说明">
						<el-input type="textarea" v-model="form.modifyTheDetails" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="审核说明">
						<el-input type="textarea" v-model="form.reviewTheDetails" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="菜品图片" prop="businessLicense">
						<div>请上传菜品图片</div>
						<div class="padding-tb secondary">格式要求：支持jpg.png.jpeg.bmp格式照片，大小不能超过5M。</div>
						<upload :showFileList="false"  v-on:uploadimg="uploadimg" :fileList="[{name: 'food.jpeg', url:form.img}]" />
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="addFood">确 定</el-button>
				<el-button @click="dialogStatus = false">取 消</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import Pagination from '@/components/Pagination'
import Upload from '@/components/Upload.vue'
export default {
	components: {
		Pagination,
		Upload
	},
	data() {
		return {
			res: {
				total: 1000,
				page: 1,
				limit: [5, 10, 15, 20]
			},
			house: {},
			food: [],
			form: {},
			formLabelWidth: '80px',
			dialogStatus: false,
			dialogTitle: '菜品信息修改',
			houseTypeList: [
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
			houseList: [
				{
					id: 50,
					number: '02',
					name: '02',
					images:
						'/uploads/20200115/3a1032ae8d9158186a64b7df541acdaf.jpg',
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
				}
			]
		}
	},
	mounted(){
		this.searchHouse();
	},
	methods: {
		searchHouse() {
			let _this = this;
			_this.houseList.map(item=>{
				item.createtime = _this.$dateFormat(item.createtime);
				item.updatetime = _this.$dateFormat(item.updatetime);
			})
		},
		addFood() {},
		exportExcel() {},
		changeHouseType(val) {
			alert(val);
		},
		updateFood(item) {
			this.dialogStatus = true
		},
		downFood() {},
		uploadimg(img) {
			this.form.images = img
		}
	}
}
</script>

<style>
</style>