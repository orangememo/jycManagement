<template>
	<div class="app-container">
		<el-form :inline="true" model="form" label-width="80px" size="mini" style="display:flex">
			<el-form-item label="选择酒店">
				<el-select :clearable="true" v-model="form.cmpId" placeholder="请选择酒店">
					<el-option
						v-for="(item,index) in cmpList"
						:key="index"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="桌位名称">
				<el-input v-model="form.name" :clearable="true" placeholder="请输入桌位名称"></el-input>
			</el-form-item>
			<el-form-item label="餐桌编号">
				<el-input v-model="form.number" :clearable="true" placeholder="请输入餐桌编号"></el-input>
			</el-form-item>
			<el-form-item label="标签状态">
				<el-select :clearable="true" v-model="form.state" placeholder="请选择酒店">
					<el-option label="全部"></el-option>
					<el-option label="正常" value="NORMAL"></el-option>
					<el-option label="删除" value="DELETE"></el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<search-form :formConfig="formConfig" :value="form" labelWidth="80px"></search-form>
		<el-popover placement="top-end" trigger="click" v-model="moreStatus"></el-popover>
		<jyc-table
			:loading="loading"
			:table-data="tableData"
			:table-label="tableLabel"
			:table-option="tableOption"
			:selectionShow="true"
			@handleButton="handleButton"
			@handleSelectionChange="handleSelectionChange"
			ref="table"
		></jyc-table>
		<pagination
			v-show="total>0"
			:total="total"
			:page.sync="listQuery.page"
			:limit.sync="listQuery.limit"
			@pagination="getList"
		/>

		<el-dialog :title="dialogTitle" :visible.sync="dialogStatus" width="800px">
			<div>
				<el-form :model="newProd" :rules="formRules" ref="roleFrom">
					<el-form-item label="选择酒店" :label-width="labelWidth" prop="companyId">
						<el-select v-model="newProd.companyId" placeholder="请选择...">
							<el-option
								v-for="(item,index) in hotelList"
								:key="index"
								:label="item.companyName"
								:value="item.companyId"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="座椅标签" :label-width="labelWidth" prop="hotelTableId">
						<el-select v-model="newProd.hotelTableId" placeholder="请选择...">
							<el-option
								v-for="(item,index) in tableLabelList"
								:key="index"
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="餐桌编号" :label-width="labelWidth" prop="number">
						<el-input v-model="newProd.number"></el-input>
					</el-form-item>
					<el-form-item label="餐桌名称" :label-width="labelWidth" prop="name">
						<el-input v-model="newProd.name"></el-input>
					</el-form-item>
					<el-form-item label="说明" :label-width="labelWidth" prop="tableExplain">
						<el-input v-model="newProd.tableExplain"></el-input>
					</el-form-item>
					<el-form-item label="图片" :label-width="labelWidth" prop="images">
						<div style="display:flex">
							<div v-if="newProd.images" style="display:flex;flex-direction: column;margin-right:30px">
								<el-image
									style="width: 150px; height: 150px"
									:src="hostUrl+newProd.images"
									:preview-src-list="[hostUrl+newProd.images]"
									fit="cover"
								></el-image>
								<button class="del-img-btn" @click="newProd.images=''">删除</button>
							</div>
							<div class="img-div-t">
								<upload :showFileList="false" v-on:uploadimg="uImg" />
							</div>
						</div>
					</el-form-item>
					<el-form-item label="桌位状态" :label-width="labelWidth" prop="type">
						<el-select v-model="newProd.type" placeholder="请选择...">
							<el-option label="普通" value="ORDINARY"></el-option>
							<el-option label="包厢" value="BALCONY"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="权重" :label-width="labelWidth" prop="weight">
						<el-input v-model="newProd.weight"></el-input>
					</el-form-item>
					<el-form-item label="状态" :label-width="labelWidth" prop="state">
						<el-select v-model="newProd.state" placeholder="请选择...">
							<el-option label="正常" value="NORMAL"></el-option>
							<el-option label="删除" value="DELETE"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="save">确 定</el-button>
				<el-button @click="reset">重置</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import SearchForm from '@/components/seachForm/seachForm'
import jycTable from '@/components/table/jycTable'
import Pagination from '@/components/Pagination'
import Upload from '@/components/Upload.vue'
import {
	gettableList,
	addNewtable,
	updatetable,
	deltable,
	gettableLabelList
} from '@/api/table'
import { getCompanyPageHotel } from '@/api/company'
export default {
	components: { Pagination, jycTable, SearchForm, Upload },
	data() {
		return {
			form: {}, //查询条件
			formRules: {
				companyId: [
					{ required: true, message: '请选择酒店', trigger: 'blur' }
				],
				hotelTableId: [
					{
						required: true,
						message: '请选择座椅标签',
						trigger: 'blur'
					}
				],
				number: [
					{
						required: true,
						message: '请输入餐桌编号',
						trigger: 'blur'
					}
				],
				name: [
					{
						required: true,
						message: '请输入餐桌名称',
						trigger: 'blur'
					}
				],
				tableExplain: [
					{
						required: true,
						message: '请输入说明信息',
						trigger: 'blur'
					}
				],
				images: [
					{ required: true, message: '请上传图片', trigger: 'blur' }
				],
				type: [
					{
						required: true,
						message: '请选择桌位状态',
						trigger: 'blur'
					}
				],
				weight: [
					{ required: true, message: '请输入权重值', trigger: 'blur' }
				],
				state: [
					{ required: true, message: '请选择状态', trigger: 'blur' }
				]
			},
			hotelList: [],
			tableLabelList: [],
			cmpList: [],
			labelWidth: '80px',
			dialogStatus: false,
			dialogTitle: '',
			loading: false,
			total: 0,
			listLoading: true,
			isEdit: false,
			newProd: {
				companyId: null,
				hotelTableId: null,
				id: null,
				images: '',
				name: '',
				number: '',
				state: '',
				tableExplain: '',
				type: '',
				weight: 0,
				cmpId: null
			},
			pageSize: 10,
			listQuery: {
				page: 1,
				limit: 10,
				importance: '',
				title: '',
				type: '',
				sort: '+id'
			},
			formConfig: {
				operate: [
					{
						icon: 'el-icon-search',
						type: 'primary',
						name: '查询',
						handleClick: this.getSearchList
					},
					{
						icon: 'el-icon-document-add',
						type: 'primary',
						name: '添加',
						handleClick: this.addNew
					},
					// {
					// 	icon: 'el-icon-edit',
					// 	type: 'primary',
					// 	name: '编辑',
					// 	handleClick: this.editAll
					// },
					{
						icon: 'el-icon-delete',
						type: 'primary',
						name: '删除',
						handleClick: this.delAll
					},
					{
						icon: 'el-icon-refresh-left',
						type: 'primary',
						name: '重置',
						slot: 'reference',
						handleClick: this.resetSearch
					}
				]
			},
			tableData: [],
			tableLabel: [
				{
					label: 'ID',
					param: 'id',
					align: 'center',
					type: 'text'
				},
				{
					label: '酒店ID',
					param: 'companyId',
					align: 'center',
					type: 'text'
				},
				{
					label: '餐桌编号',
					param: 'number',
					align: 'center',
					type: 'text'
				},
				{
					label: '商家座椅标签',
					param: 'hotelTableId',
					align: 'center',
					type: 'text'
				},
				{
					label: '桌位名称',
					param: 'name',
					align: 'center',
					type: 'text'
				},
				{
					label: '说明',
					param: 'tableExplain',
					align: 'center',
					type: 'text'
				},
				{
					label: '图片',
					param: 'images',
					align: 'center',
					type: 'img'
				},
				{
					label: '权重',
					param: 'weight',
					align: 'center',
					type: 'text'
				},
				{
					label: '桌位状态',
					param: 'type',
					type: 'text',
					align: 'center',
					render: row => {
						if (row.type == 'ORDINARY') {
							return '普通'
						} else if (row.type == 'BALCONY') {
							return '包厢'
						} else {
							return row.type
						}
					}
				},
				{
					label: '创建人',
					param: 'createAccountId',
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
					label: '修改人',
					param: 'modifyAccountId',
					align: 'center',
					type: 'text'
				},
				{
					label: '修改时间',
					param: 'modifyTime',
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
							return `<span style='color:#18bc9c'>正常</span>`
						} else if (row.state == 'DELETE') {
							return `<span style='color:#d2d6de'>删除</span>`
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
							methods: 'edit'
						},
						{
							label: '删除',
							type: 'danger',
							methods: 'delete'
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
		this.getHotelList()
		this.getHotelTableList()
	},
	methods: {
		handleButton(object) {
			let _this = this
			let method = object['methods']
			switch (method) {
				case 'edit':
					_this.edit(object.row)
					break
				case 'delete':
					_this.delete(object.row.id)
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
		getSearchList() {
			this.listQuery.page = 1
			this.getList()
		},
		getList() {
			let _this = this
			const params = {
				isPage: 'YES',
				currentPage: _this.listQuery.page,
				pageSize: _this.listQuery.limit
			}
			let p = { ...params, ..._this.form }
			this.searchApplyPageInfo(p)
		},
		getHotelList() {
			let _this = this
			let params = {
				isPage: 'NO'
			}
			getCompanyPageHotel(params).then(data => {
				_this.hotelList = data
				if (data.code == '200') {
					_this.hotelList = data.result
				}
				_this.hotelList.map(item => {
					let obj = {
						label: item.companyName,
						value: item.companyId
					}
					_this.cmpList.push(obj)
				})
			})
		},
		getHotelTableList() {
			let _this = this
			let params = {
				isPage: 'NO'
			}
			gettableLabelList().then(data => {
				if (data.code == '200') {
					_this.tableLabelList = data.result.records
				}
			})
		},
		searchApplyPageInfo(params) {
			let _this = this
			_this.loading = true
			gettableList(params).then(data => {
				if (data.code == '200') {
					_this.total = data.result.total
					if (data.result.records.length > 0) {
						_this.tableData = data.result.records
					} else {
						_this.tableData = []
					}
				}
				_this.loading = false
			})
		},
		addNew() {
			this.editStatus = false
			this.resetForm()
			this.dialogTitle = '添加'
			this.dialogStatus = true
		},
		save() {
			let _this = this
			this.$refs.roleFrom.validate(valid => {
				if (valid) {
					_this.newProd.cmpId = _this.newProd.companyId
					if (_this.editStatus) {
						updatetable(_this.newProd).then(data => {
							if (data.code == '200') {
								_this.alertMessage('修改成功')
								_this.dialogStatus = false
								_this.getList()
							}
						})
					} else {
						addNewtable(_this.newProd).then(data => {
							if (data.code == '200') {
								_this.alertMessage('保存成功')
								_this.dialogStatus = false
								_this.getList()
							}
						})
					}
				}
			})
		},
		edit(row) {
			this.dialogTitle = '修改'
			this.editStatus = true
			this.resetForm()
			this.setRuleFrom(row)
			this.dialogStatus = true
		},
		delete(id) {
			let _this = this
			this.$confirm('确定删除所选应用吗?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let params = {
					id: id,
					state: 'DELETE'
				}
				deltable(params).then(data => {
					if (data.code == '200') {
						_this.alertMessage('删除成功')
						_this.getList()
					}
				})
			})
		},
		editAll() {
			if (this.chooseList.length > 0) {
			} else {
				_this.$message.error('请先选择要编辑项')
			}
		},
		delAll() {
			if (this.chooseList.length > 0) {
				let ids = []
				this.chooseList.map(item => {
					ids.push(item.applicationId)
				})
				this.delete(ids.join(','))
			} else {
				_this.$message.error('请先选择要删除项')
			}
		},
		more() {
			if (this.chooseList.length > 0) {
				this.moreStatus = !this.moreStatus
			} else {
				_this.$message.error('请先选择要处理项')
			}
		},
		editStatus(status) {
			this.chooseList.map(item => {
				item.status = status
			})
			this.alertMessage('修改成功')
			this.moreStatus = false
		},

		setRuleFrom(row) {
			this.newProd = { ...row }
		},
		uImg(img) {
			this.newProd.images = img
		},
		reset() {
			let oldId = this.newProd.id
			this.resetForm()
			this.newProd.id = oldId
		},
		resetForm() {
			this.newProd = {
				companyId: null,
				hotelTableId: null,
				id: null,
				images: '',
				name: '',
				number: '',
				state: '',
				tableExplain: '',
				type: '',
				weight: 0,
				cmpId: null
			}
		},
		resetSearch() {
			this.form = {}
			this.listQuery.page = 1
			this.getList()
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/styles/my.scss';
</style>