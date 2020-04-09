<template>
	<div>
		<div class="filter-container">
			<el-select
				v-model="food.type"
				placeholder="菜品分类"
				clearable
				style="width: 90px"
				class="filter-item"
				@command="changeFoodType"
			>
				<el-option
					v-for="(item,index) in foodTypeList"
					:key="index"
					:label="item.name"
					:value="item.id"
				/>
			</el-select>
			<el-input
				v-model="food.title"
				placeholder="请输入菜品名称"
				style="width: 200px;"
				class="filter-item"
				@keyup.enter.native="handleFilter"
			/>
			<el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchFood">搜索</el-button>
			<el-button
				class="filter-item"
				style="margin-left: 10px;"
				type="primary"
				icon="el-icon-edit"
				@click="dialogStatus=true;form = {}"
			>添加</el-button>
			<el-button class="filter-item" type="primary" icon="el-icon-download" @click="exportExcel">导出</el-button>
		</div>
		<div>
			<el-table ref="multipleTable" :data="foodList" tooltip-effect="dark" style="width: 100%">
				<el-table-column prop="name" label="产品名称" width="200"></el-table-column>
				<el-table-column label="产品图片" width="80">
					<template slot-scope="scope">
						<el-image :src="hostUrl+scope.row.images"></el-image>
					</template>
				</el-table-column>
				<el-table-column prop="money" label="价格/元" width="80"></el-table-column>
				<el-table-column label="单位" width="80">盘</el-table-column>
				<el-table-column prop="createtime" label="创建时间" width="150"></el-table-column>
				<el-table-column prop="updatetime" label="更新时间" width="150"></el-table-column>
				<el-table-column label="状态" width="100">
					<template slot-scope="scope">
						<em v-if="scope.row.status==0">正在审核</em>
						<em v-if="scope.row.status==1">上架</em>
						<em v-if="scope.row.status==2">审核失败</em>
						<em v-if="scope.row.status==3">下架</em>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
					<template slot-scope="{row,$index}">
						<el-button type="primary" size="mini" @click="updateFood(row)">修改</el-button>
						<el-button type="danger" size="mini" @click="downFood(row,$index)">下架</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
    <pagination
			v-show="res.total>0"
			:total="res.total"
			:page.sync="res.page"
			:limit.sync="res.limit"
			@pagination="searchFood"
		/>
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
            <upload v-on:uploadimg="uploadimg" :fileList="[{name: 'food.jpeg', url:form.img}]" />
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
  components:{
    Pagination,Upload
  },
	data() {
		return {
      res:{
        total:1000,
        page:1,
        limit:[5,10,15,20]
      },
      food: [],
      form:{},
      formLabelWidth: "80px",
      dialogStatus:false,
      dialogTitle:'菜品信息修改',
			foodTypeList: [
				{ id: 12, hotelId: 20, name: '海鲜' },
				{ id: 13, hotelId: 20, name: '前菜凉菜' },
				{ id: 14, hotelId: 20, name: '热菜' },
				{ id: 15, hotelId: 20, name: '时蔬' },
				{ id: 16, hotelId: 20, name: '汤' },
				{ id: 17, hotelId: 20, name: '主食点心' },
				{ id: 18, hotelId: 20, name: '套餐' }
			],
			foodList: [
				{
					id: 89,
					hotelId: 20,
					dishTypeId: '12',
					name: 'XO酱爆海鲜小炒皇',
					explaincontent: '',
					images:
						'/uploads/20200213/634d26ca-9e47-4ee6-8e78-c66f38c157e3.jpg',
					detailscontent: '测试',
					money: 79.0,
					status: '1',
					createtime: 1579065489,
					modifyTheDetails: null,
					reviewTheDetails: null,
					updatetime: 1581576015,
					bool: '0',
					hotelStatus: '1'
				},
				{
					id: 90,
					hotelId: 20,
					dishTypeId: '12',
					name: '澳龙刺身  时价',
					explaincontent: '',
					images:
						'/uploads/20200115/ec19ee28d5993b5be1b3f45cc082aec7.png',
					detailscontent: '',
					money: 0.0,
					status: '1',
					createtime: 1579065647,
					modifyTheDetails: null,
					reviewTheDetails: null,
					updatetime: 1581576019,
					bool: '0',
					hotelStatus: '1'
				},
				{
					id: 91,
					hotelId: 20,
					dishTypeId: '12',
					name: '澳洲龙虾 一斤',
					explaincontent: '',
					images:
						'/uploads/20200115/475bb48a32f23097c60d291d7244d5f3.jpg',
					detailscontent: '',
					money: 499.0,
					status: '1',
					createtime: 1579066657,
					modifyTheDetails: null,
					reviewTheDetails: null,
					updatetime: 1579066657,
					bool: '0',
					hotelStatus: '1'
				},
				{
					id: 92,
					hotelId: 20,
					dishTypeId: '12',
					name: '八爪鱼 一斤',
					explaincontent: '',
					images:
						'/uploads/20200115/a0377c0fec16bf144d212b504f888862.jpg',
					detailscontent: '',
					money: 48.0,
					status: '1',
					createtime: 1579066700,
					modifyTheDetails: null,
					reviewTheDetails: null,
					updatetime: 1579066700,
					bool: '0',
					hotelStatus: '1'
				},
				{
					id: 93,
					hotelId: 20,
					dishTypeId: '12',
					name: '八爪鱼炒年糕 每例',
					explaincontent: '',
					images:
						'/uploads/20200115/c282361d1a1e763bbf59eb3f63da4532.jpg',
					detailscontent: '',
					money: 58.0,
					status: '1',
					createtime: 1579066781,
					modifyTheDetails: null,
					reviewTheDetails: null,
					updatetime: 1579066781,
					bool: '0',
					hotelStatus: '1'
				},
				{
					id: 94,
					hotelId: 20,
					dishTypeId: '12',
					name: '斑节虾 一斤',
					explaincontent: '',
					images:
						'/uploads/20200115/52121a13a3949e89cd573609403c90c4.jpg',
					detailscontent: '',
					money: 188.0,
					status: '1',
					createtime: 1579066823,
					modifyTheDetails: null,
					reviewTheDetails: null,
					updatetime: 1579066823,
					bool: '1',
					hotelStatus: '1'
				},
				{
					id: 95,
					hotelId: 20,
					dishTypeId: '12',
					name: '鲍蚝拼盘 每盘',
					explaincontent: '',
					images:
						'/uploads/20200115/42c068c80f1b79c6fb71df40b2bbc56e.jpg',
					detailscontent: '',
					money: 128.0,
					status: '1',
					createtime: 1579066901,
					modifyTheDetails: null,
					reviewTheDetails: null,
					updatetime: 1579066901,
					bool: '1',
					hotelStatus: '1'
				},
				{
					id: 96,
					hotelId: 20,
					dishTypeId: '12',
					name: '鲍汁扣辽参',
					explaincontent: '',
					images:
						'/uploads/20200115/15025ccb4afd68620cb6618ccddd06d6.png',
					detailscontent: '',
					money: 68.0,
					status: '1',
					createtime: 1579066927,
					modifyTheDetails: null,
					reviewTheDetails: null,
					updatetime: 1579066927,
					bool: '1',
					hotelStatus: '1'
				},
				{
					id: 97,
					hotelId: 20,
					dishTypeId: '12',
					name: '本帮熏鱼',
					explaincontent: '',
					images:
						'/uploads/20200115/faee58f9f44ff978be01cf06b36c52d5.jpg',
					detailscontent: '',
					money: 48.0,
					status: '1',
					createtime: 1579066956,
					modifyTheDetails: null,
					reviewTheDetails: null,
					updatetime: 1579066956,
					bool: '1',
					hotelStatus: '1'
				},
				{
					id: 98,
					hotelId: 20,
					dishTypeId: '12',
					name: '草虾 一斤',
					explaincontent: '',
					images:
						'/uploads/20200115/3332dcd754b5601c458286ac2872b4ba.jpg',
					detailscontent: '',
					money: 138.0,
					status: '1',
					createtime: 1579066979,
					modifyTheDetails: null,
					reviewTheDetails: null,
					updatetime: 1579066979,
					bool: '1',
					hotelStatus: '1'
				}
			]
		}
	},
	mounted(){
		this.searchFood();
	},
	methods: {
    	searchFood() {
			let _this = this;
			_this.foodList.map(item=>{
				item.createtime = _this.$dateFormat(item.createtime);
				item.updatetime = _this.$dateFormat(item.updatetime);
			})
		},
		addFood() {},
		exportExcel() {},
		changeFoodType() {},
		updateFood(item) {
      this.dialogStatus = true;
    },
    downFood() {},
    uploadimg(img) {
      this.form.images = img;
    },
	}
}
</script>

<style>
</style>