<template>
	<div class="app-container">
		<!-- <search-form :formConfig="formConfig" :value="form" labelWidth="80px"></search-form> -->
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
				<el-form :model="newProd" ref="roleFrom">
					<el-form-item label="应用Key" :label-width="labelWidth">
						<el-input v-model="newProd.applicationKey"></el-input>
					</el-form-item>
					<el-form-item label="应用名称" :label-width="labelWidth">
						<el-input v-model="newProd.applicationName"></el-input>
					</el-form-item>
					<el-form-item label="应用端" :label-width="labelWidth">
						<el-select v-model="newProd.applicationSource" placeholder="请选择...">
							<el-option label="电脑端" value="PC"></el-option>
                            <el-option label="移动端" value="MOBILE"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="类型" :label-width="labelWidth">
						<el-input v-model="newProd.applicationType"></el-input>
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
import { getApplyPageInfo,addNewApply,updateApply,delApply } from '@/api/apply'
export default {
	components: { Pagination, jycTable, SearchForm },
	data() {
		return {
			form: {
				state: 'NORMAL'
			}, //查询条件
			labelWidth: '80px',
			dialogStatus: false,
			dialogTitle: '',
			loading: false,
			total: 0,
			listLoading: true,
			isEdit: false,
			newProd: {
				applicationId: 0,
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
						optList: [
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
						handleClick: this.getList
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
					}
					// {
					// 	icon: 'el-icon-setting',
					// 	type: 'primary',
					// 	name: '更多',
					// 	slot: 'reference',
					// 	handleClick: this.more
					// }
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
					label: '应用KEY',
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
					type: 'text'
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
							return '正常'
						} else if (row.state == 'DELETE') {
							return '删除'
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
			getApplyPageInfo(params)
				.then(data => {
					if (data.code == '200') {
						_this.total = data.result.total
						if (data.result.records.length > 0) {
							_this.tableData = data.result.records
						} else {
							_this.$alert('未获取到有效信息')
						}
					} else {
						_this.$alert('未获取到有效信息')
					}
					_this.loading = false
				})
				.catch(err => {
					_this.$alert('服务器异常')
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
            console.log(JSON.stringify(_this.newProd));
			if (_this.editStatus) {
				updateApply(_this.newProd).then(data => {
					if (data.code == '200') {
						_this.$alert('修改成功')
						_this.dialogStatus = false
						_this.getList()
					} else {
						_this.$alert(data.message)
					}
				})
			} else {
				addNewApply(_this.newProd).then(data => {
					if (data.code == '200') {
						_this.$alert('保存成功')
						_this.dialogStatus = false
						_this.getList()
					} else {
						_this.$alert(data.message)
					}
				})
			}
		},
		edit(row) {
			this.editStatus = true
			this.setRuleFrom(row)
			this.dialogStatus = true
		},
		delete(applicationId) {
			let _this = this
			this.$confirm('确定删除所选酒店吗?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let params = {
					applicationId: applicationId,
					state: 'DELETE'
				}
				delApply(params).then(data => {
					if (data.code == '200') {
						_this.$alert('删除成功')
						_this.getList()
					} else {
						_this.$alert(data.message)
					}
				})
			})
		},
		editAll() {
			if (this.chooseList.length > 0) {
			} else {
				this.$alert('请先选择要编辑项')
			}
		},
		delAll() {
			if (this.chooseList.length > 0) {
				let ids = []
				this.chooseList.map(item => {
					ids.push(item.companyId)
				})
				this.delete(ids.join(','))
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
		setRuleFrom(row) {
            this.newProd = { ...row }
		},
		resetForm() {
			this.newProd = {
				applicationId: null,
				applicationKey: '',
				applicationName: '',
				applicationSource: '',
				applicationType: '',
				weight: 0
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/styles/my.scss';
</style>