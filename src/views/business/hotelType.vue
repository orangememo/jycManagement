<template>
	<div class="app-container">
		<search-form :formConfig="formConfig" :value="form" labelWidth="80px"></search-form>
		<el-popover placement="top-end" trigger="click" v-model="moreStatus">
			<el-link class="set" @click="editStatus(1)">设置为显示</el-link>
			<br />
			<el-link class="set" @click="editStatus(0)">设置为隐藏</el-link>
		</el-popover>
		<jyc-table
			:loading="loading"
			:table-data="tableData"
			:table-label="tableLabel"
			:table-option="tableOption"
			:selectionShow="true"
			@handleButton="handleButton"
			@handleSortChange="handleSortChange"
			@handleSelectionChange="handleSelectionChange"
			ref="table"
		></jyc-table>
		<pagination
			v-show="total>0"
			:total="total"
			:page.sync="listQuery.page"
			:limit.sync="listQuery.limit"
		/>

		<el-dialog :title="dialogTitle" :visible.sync="dialogStatus" width="800px">
			<div>
				<el-form :model="newProd" ref="roleFrom">
					<el-form-item label="标志" :label-width="labelWidth" style="margin-right: -80px;">
						<el-select v-model="newProd.labelList" multiple placeholder="请选择...">
							<el-option
								v-for="(item,index) in labelList"
								:key="index"
								:label="item.labelName"
								:value="item.labelId"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="名称" :label-width="labelWidth">
						<el-input v-model="newProd.companyName"></el-input>
					</el-form-item>
					<el-form-item label="联系人" :label-width="labelWidth" prop="linkMan">
						<el-input v-model="newProd.linkMan"></el-input>
					</el-form-item>
					<el-form-item label="电话" :label-width="labelWidth" prop="mobile">
						<el-input v-model="newProd.mobile"></el-input>
					</el-form-item>
					<el-form-item label="地址" :label-width="labelWidth" prop="companyAddr">
						<el-input v-model="newProd.companyAddr"></el-input>
					</el-form-item>
					<el-form-item label="缩略图" :label-width="labelWidth">
						<el-image v-if="newProd.abbreviateImg"
							style="width: 150px; height: 150px"
							:src="hostUrl+newProd.abbreviateImg"
							fit="cover"
						></el-image>
						<div>请上传酒店缩略图</div>
						<upload v-on:uploadimg="uImg" />
					</el-form-item>
					<el-form-item label="背景图片" :label-width="labelWidth">
						<el-image v-if="newProd.backgroundImg"
							style="width: 150px; height: 150px"
							:src="hostUrl+newProd.backgroundImg"
							fit="cover"
						></el-image>
						<div>请上传酒店背景图</div>
						<upload v-on:uploadimg="uBgImg" />
					</el-form-item>
					<el-form-item label="图片组" :label-width="labelWidth">
						<div v-if="newProd.images">
							<el-image
								v-for="(item,index) in newProd.images"
								:key="index"
								style="width: 150px; height: 150px;margin:0 20px 20px 0;"
								:src="hostUrl+item"
								fit="cover"
							></el-image>
						</div>
						<div>上传图片组</div>
						<upload v-on:uploadimg="uInImg" :limit="pageSize" />
					</el-form-item>
					<el-form-item label="营业时间" :label-width="labelWidth" prop="businessHours">
						<el-input v-model="newProd.businessHours"></el-input>
					</el-form-item>
					<el-form-item label="描述" :label-width="labelWidth">
						<el-input v-model="newProd.description"></el-input>
					</el-form-item>
					<el-form-item label="X" :label-width="labelWidth">
						<el-input v-model="newProd.longitude" type="number"></el-input>
					</el-form-item>
					<el-form-item label="Y" :label-width="labelWidth">
						<el-input v-model="newProd.latitude" type="number"></el-input>
					</el-form-item>
					<el-form-item label="权重" :label-width="labelWidth">
						<el-input v-model="newProd.weight"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="save">确 定</el-button>
				<el-button @click="resetForm">重置</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import SearchForm from '@/components/seachForm/seachForm'
import jycTable from '@/components/table/jycTable'
import Pagination from '@/components/Pagination'
import Upload from '@/components/Upload.vue'
import { getCompanyPageHotel, companyTopWeight, addNewCompany } from '@/api/company'
import { getLabelList } from '@/api/label'
export default {
	components: { Pagination, jycTable, SearchForm, Upload },
	data() {
		return {
			labelWidth: '80px',
			dialogStatus: false,
			dialogTitle: '',
			loading: false,
			total: 0,
			listLoading: true,
			labelList: [],
			newProd: {
				abbreviateImg: '',
				backgroundImg: '',
				businessHours: '',
				companyAddr: '',
				companyCode: '',
				companyId: 0,
				companyName: '',
				companyType: '',
				createAccountId: '',
				createTime: '',
				description: '',
				latitude: '',
				linkMan: '',
				longitude: '',
				mobile: '',
				modifyAccountId: '',
				modifyTime: '',
				pcompanyId: 0,
				pyCode: '',
				state: '',
				vrimage: '',
				weight: 0,
				images:[],
				labelList:[]
			},
			pageSize:20,
			listQuery: {
				page: 1,
				limit: 10,
				importance: '',
				title: '',
				type: '',
				sort: '+id'
			},
			formConfig: {
				formItemList: [
					{
						type: 'input',
						prop: 'companyName',
						label: '名称',
						placeholder: '请输入名称'
					},
					{
						type: 'input',
						prop: 'linkMan',
						label: '联系人',
						placeholder: '请输入联系人'
					},
					{
						type: 'input',
						prop: 'companyAddr',
						label: '地址',
						placeholder: '请输入地址'
					},
					{
						type: 'select',
						prop: 'state',
						label: '状态',
						placeholder: '状态',
						optList: this.labelList
					}
				],
				operate: [
					{
						icon: 'el-icon-search',
						type: 'primary',
						name: '查询',
						handleClick: this.search
					},
					{
						icon: 'el-icon-document-add',
						type: 'primary',
						name: '添加',
						handleClick: this.addNew
					},
					{
						icon: 'el-icon-edit',
						type: 'primary',
						name: '编辑',
						handleClick: this.editAll
					},
					{
						icon: 'el-icon-delete',
						type: 'primary',
						name: '删除',
						handleClick: this.delAll
					},
					{
						icon: 'el-icon-setting',
						type: 'primary',
						name: '更多',
						slot: 'reference',
						handleClick: this.more
					}
				]
			},
			form: {},
			tableData: [],
			tableLabel: [
				{
					label: 'ID',
					param: 'companyId',
					align: 'center',
					type: 'text'
				},
				{
					label: '名称',
					param: 'companyName',
					align: 'center',
					type: 'text'
				},
				{
					label: '标签',
					param: 'labelList',
					align: 'center',
					render: row => {
						let span = ''
						row.labelList.map(item => {
							let bg = 'label-bg'
							if (item.labelCode == 'HOT') {
								bg += ' hot'
							} else if (item.labelCode == 'HOME') {
								bg += ' home'
							} else if (item.labelCode == 'RECO') {
								bg += ' reco'
							}
							span += `<div :class="${bg}">${item.labelName}</div>`
						})
						return span
					}
				},
				{
					label: '联系人',
					param: 'linkMan',
					align: 'center',
					type: 'text'
				},
				{
					label: '电话',
					param: 'mobile',
					align: 'center',
					type: 'text'
				},
				{
					label: '地址',
					param: 'companyAddr',
					align: 'center',
					type: 'text'
				},
				{
					label: '缩略图',
					param: 'abbreviateImg',
					align: 'center',
					type: 'img'
				},
				{
					label: '营业时间',
					param: 'businessHours',
					align: 'center',
					type: 'text'
				},
				{
					label: '创建时间',
					param: 'createTime',
					align: 'center',
					type: 'text'
				},
				{
					label: '权重',
					param: 'weight',
					align: 'center',
					type: 'text'
				},
				{
					label: '状态',
					param: 'state',
					type: 'text',
					align: 'center',
					render: row => {
						if (row.state == 'NORMAL') {
							return '正常'
						} else if (row.state == 'DELETE') {
							return '删除'
						} else if (row.state == 'FROZEN') {
							return '冻结'
						}
					}
				}
			],
			tableOption: [
				{
					label: '操作',
					width: '300',
					options: [
						{
							label: '编辑',
							type: 'primary',
							icon: 'el-icon-edit',
							methods: 'edit'
						},
						{
							label: '删除',
							type: 'danger',
							icon: 'el-icon-delete',
							methods: 'delete'
						},
						{
							label: '置顶',
							type: 'warning',
							icon: 'el-icon-caret-top',
							methods: 'toTop'
						}
					]
				}
			],
			chooseList: [],
			moreStatus: false
		}
	},
	mounted() {
		this.getList()
		this.getLabel();
	},
	methods: {
		handleSortChange() {},
		handleButton(object) {
			let _this = this
			let method = object['methods']
			switch (method) {
				case 'edit':
					_this.edit(object.row)
					break
				case 'delete':
					_this.delete(object.row)
					break
				case 'top':
					_this.top(object.row)
					break
				case 'goOrder':
					_this.goOrder(object.row)
					break
				case 'goMenu':
					_this.goMenu(object.row)
					break
				case 'goSeat':
					_this.goSeat(object.row)
					break
				case 'goHotel':
					_this.goHotel(object.row)
					break
				case 'toTop':
					_this.toTop(object.row)
					break
				default:
					break
			}
		},
		handleSelectionChange(row) {
			this.chooseList = row
		},
		getList() {
			let _this = this
			const params = {
				isPage: 'YES',
				currentPage: 1,
				pageSize: 10,
				state: 'NORMAL'
			}
			getCompanyPageHotel(params).then(data => {
				if (data.code == '200') {
					_this.total = data.result.total
					if (data.result.records.length > 0) {
						_this.tableData = data.result.records
					}
				} else {
					_this.$alert('未获取到有效信息')
				}
			})
		},
		getLabel(){
			let param = {
				isPage:'NO'
			}
			let _this = this;
			getLabelList(param).then(data=>{
				if(data.code == '200'){
					_this.labelList = data.result.records
				}
			})
		},
		addNew() {
			this.resetForm()
			this.dialogTitle = '添加'
			this.dialogStatus = true
		},
		save() {
			let _this = this;
			_this.newProd.labelList instanceof Array ? _this.newProd.labelList = _this.newProd.labelList.join(',') : ''
			_this.newProd.images instanceof Array ?  _this.newProd.images = _this.newProd.images.join(',') : ''
			console.log(JSON.stringify(this.newProd))
			addNewCompany(_this.newProd).then(data=>{

			})
		},
		edit(row) {
			this.setRuleFrom(row)
			this.dialogStatus = true
		},
		delete(row) {
			this.$alert('删除')
		},
		editAll() {
			if (this.chooseList.length > 0) {
			} else {
				this.$alert('请先选择要编辑项')
			}
		},
		delAll() {
			if (this.chooseList.length > 0) {
				// const param = {
				// 	title: '提示',
				// 	message: '确定要删除吗？'
				// }
				this.$confirm('确定要删除吗？')
			} else {
				this.$alert('请先选择要删除项')
			}
		},
		more() {
			if (this.chooseList.length > 0) {
				this.moreStatus = !this.moreStatus
			} else {
				this.$alert('请先选择要处理项')
			}
		},
		editStatus(status) {
			this.chooseList.map(item => {
				item.status = status
			})
			this.$alert('修改成功')
			this.moreStatus = false
		},
		//置顶
		toTop(row) {
			let _this = this
			companyTopWeight({ companyId: row.companyId }).then(data => {
				if (data.code == '200') {
					_this.$alert('置顶成功')
					_this.getList()
				} else {
					_this.$alert('置顶失败,请联系管理员')
				}
			})
		},
		uImg(img) {
			this.newProd.abbreviateImg = img
		},
		uBgImg(img) {
			this.newProd.backgroundImg = img
		},
		uInImg(img) {
			this.newProd.images.push(img)
		},
		setRuleFrom(row) {
			if (row.images instanceof Array) {
				this.newProd = row
			} else if (row.images && row.images.indexOf(',') > -1) {
				row.images = row.images.split(',')
				this.newProd = row
			} else {
				let inImg = row.images
				row.images = []
				row.images.push(inImg)
				this.newProd = row
			}
		},
		resetForm() {
			this.newProd = {
				abbreviateImg: '',
				backgroundImg: '',
				images:[],
				labelList:[],
				businessHours: '',
				companyAddr: '',
				companyCode: '',
				companyId: 0,
				companyName: '',
				companyType: '',
				createAccountId: '',
				createTime: '',
				description: '',
				latitude: '',
				linkMan: '',
				longitude: '',
				mobile: '',
				modifyAccountId: '',
				modifyTime: '',
				pcompanyId: 0,
				pyCode: '',
				state: '',
				vrimage: '',
				weight: 0
			}
		}
	}
}
</script>

<style scoped>
.set {
	height: 50px;
	background: none;
}
.label-bg {
	width: 100px;
	height: 50px;
	color: #fff;
	padding: 10px;
}
.hot {
	background: #f39c12;
}
.home {
	background: #18bc9c;
}
.reco {
	background: #e74c3c;
}
.el-input {
	width: 200px;
}
.el-form-item {
	display: flex;
}
</style>