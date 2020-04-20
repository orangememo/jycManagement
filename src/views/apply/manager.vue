<template>
	<div class="app-container">
		<search-form :formConfig="formConfig" :value="form" labelWidth="80px"></search-form>
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
					<el-form-item label="应用Key" :label-width="labelWidth" prop="applicationKey">
						<el-input v-model="newProd.applicationKey"></el-input>
					</el-form-item>
					<el-form-item label="应用名称" :label-width="labelWidth" prop="applicationName">
						<el-input v-model="newProd.applicationName"></el-input>
					</el-form-item>
					<el-form-item label="应用端" :label-width="labelWidth"  prop="applicationSource">
						<el-select v-model="newProd.applicationSource" placeholder="请选择...">
							<el-option label="电脑端" value="PC"></el-option>
							<el-option label="移动端" value="MOBILE"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="应用类型" :label-width="labelWidth" prop="applicationType">
						<el-select v-model="newProd.applicationType" placeholder="请选择...">
							<el-option label="后台管理" value="WEB-MANAGE"></el-option>
							<el-option label="客户端" value="APP"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="权重" :label-width="labelWidth">
						<el-input v-model="newProd.weight"></el-input>
					</el-form-item>
					<el-form-item label="状态" :label-width="labelWidth">
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
import {
	getApplyPageInfo,
	addNewApply,
	updateApply,
	delApply,
	companyTopWeight
} from '@/api/apply'
export default {
	components: { Pagination, jycTable, SearchForm },
	data() {
		return {
			form: {}, //查询条件
			formRules: {
				applicationKey: [{ required: true, message: '请输入应用Key', trigger: 'blur' }],
				applicationName: [{ required: true, message: '请输入应用名称', trigger: 'blur' }],
				applicationSource: [{ required: true, message: '请选择应用端', trigger: 'blur' }],
				applicationType: [{ required: true, message: '请选择应用类型', trigger: 'blur' }],
			},
			labelWidth: '80px',
			dialogStatus: false,
			dialogTitle: '',
			loading: false,
			total: 0,
			listLoading: true,
			isEdit: false,
			newProd: {
				appId: 0,
				applicationKey: '',
				applicationName: '',
				applicationSource: '',
				applicationType: '',
				createAccountId: '',
				createTime: '',
				modifyAccountId: '',
				modifyTime: '',
				state: '',
				weight: 0
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
				formItemList: [
					{
						type: 'input',
						prop: 'applicationName',
						label: '应用名称',
						placeholder: '请输入应用名称'
					},
					{
						type: 'input',
						prop: 'applicationKey',
						label: '应用编号',
						placeholder: '请输入应用编号'
					},
					{
						type: 'select',
						prop: 'state',
						label: '版本状态',
						placeholder: '状态',
						optList: [
							{ label: '全部' },
							{ label: '正常', value: 'NORMAL' },
							{ label: '删除', value: 'DELETE' }
						]
					}
				],
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
					label: '应用ID',
					param: 'applicationId',
					align: 'center',
					type: 'text'
				},
				{
					label: '应用编号',
					param: 'applicationKey',
					align: 'center',
					type: 'text'
				},
				{
					label: '应用名称',
					param: 'applicationName',
					align: 'center',
					type: 'text'
				},
				{
					label: '应用端',
					param: 'applicationSource',
					align: 'center',
					render: row => {
						let _this = this
						if (row.applicationSource == 'PC') {
							return '电脑端'
						} else if (row.applicationSource == 'MOBILE') {
							return '移动端'
						} else {
							return row.applicationSource
						}
					}
				},
				{
					label: '类型',
					param: 'applicationType',
					align: 'center',
					render: row => {
						let _this = this
						if (row.applicationType == 'WEB-MANAGE') {
							return '后台管理'
						} else if (row.applicationType == 'APP') {
							return '客户端'
						} else {
							return row.applicationType
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
						},
						{
							label: '置顶',
							type: 'warning',
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
					_this.delete(object.row.applicationId)
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
		getSearchList(){
			this.listQuery.page = 1
			this.getList()
		},
		getList() {
			let _this = this
			const params = {
				currentPage: _this.listQuery.page,
				pageSize: _this.listQuery.limit
			}
			let p = { ...params, ..._this.form }
			this.searchApplyPageInfo(p)
		},
		searchApplyPageInfo(params) {
			let _this = this
			_this.loading = true
			getApplyPageInfo(params).then(data => {
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
			if (_this.editStatus) {
				updateApply(_this.newProd).then(data => {
					if (data.code == '200') {
						_this.$message({
							message: '修改成功',
							type: 'success'
						})
						_this.dialogStatus = false
						_this.getList()
					}
				})
			} else {
				addNewApply(_this.newProd).then(data => {
					if (data.code == '200') {
						_this.$message({
							message: '保存成功',
							type: 'success'
						})
						_this.dialogStatus = false
						_this.getList()
					}
				})
			}
		},
		edit(row) {
			this.editStatus = true
			this.setRuleFrom(row)
			this.dialogStatus = true
		},
		delete(appId) {
			let _this = this
			this.$confirm('确定删除所选应用吗?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let params = {
					appIdList: appId,
					state: 'DELETE'
				}
				delApply(params).then(data => {
					if (data.code == '200') {
						_this.$message({
							message: '删除成功',
							type: 'success'
						})
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
		//置顶
		toTop(row) {
			let _this = this
			companyTopWeight({ appId: row.applicationId }).then(data => {
				if (data.code == '200') {
					_this.alertMessage('置顶成功')
					_this.getList()
				}
			})
		},
		setRuleFrom(row) {
			this.newProd = { ...row }
			this.newProd.appId = row.applicationId
		},
		reset() {
			let oldId = this.newProd.appId
			this.resetForm()
			this.newProd.appId = oldId
		},
		resetForm() {
			this.newProd = {
				appId: null,
				applicationKey: '',
				applicationName: '',
				applicationSource: '',
				applicationType: '',
				weight: 0
			}
		},
		resetSearch(){
			this.form = {}
			this.listQuery.page = 1;
			this.getList()
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/styles/my.scss';
</style>