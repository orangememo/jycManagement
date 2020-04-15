<template>
	<div class="app-container">
		<search-form :formConfig="formConfig" :value="form" labelWidth="80px"></search-form>
		<el-popover placement="top-end" trigger="click" v-model="moreStatus">
			
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
					<el-form-item label="标签名称" :label-width="labelWidth">
						<el-input v-model="newProd.labelName"></el-input>
					</el-form-item>
					<el-form-item label="标签代码" :label-width="labelWidth">
						<el-input v-model="newProd.labelCode"></el-input>
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
import { getLabelList, addNewLabel, updateLabel, delLabel } from '@/api/label'
export default {
	components: { Pagination, jycTable, SearchForm },
	data() {
		return {
			form: {
			}, //查询条件
			labelWidth: '80px',
			dialogStatus: false,
			dialogTitle: '',
			loading: false,
			total: 0,
			listLoading: true,
			isEdit: false,
			newProd: {
				labelCode: '',
				labelId: null,
				labelName: '',
				state: ''
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
						prop: 'labelName',
						label: '标签名称',
						placeholder: '请输入标签名称'
					},
					{
						type: 'input',
						prop: 'labelCode',
						label: '标签代码',
						placeholder: '请输入标签代码'
					},
					{
						type: 'select',
						prop: 'state',
						label: '标签状态',
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
					label: '标签ID',
					param: 'labelId',
					align: 'center',
					type: 'text'
				},
				{
					label: '标签代码',
					param: 'labelCode',
					align: 'center',
					type: 'text'
				},
				{
					label: '标签名称',
					param: 'labelName',
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
					_this.delete(object.row.labelId)
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
				currentPage: _this.listQuery.page,
				pageSize: _this.listQuery.limit
			}
			let p = { ...params, ..._this.form }
			this.searchApplyPageInfo(p)
		},
		searchApplyPageInfo(params) {
			let _this = this
			_this.loading = true
			getLabelList(params)
				.then(data => {
					if (data.code == '200') {
						_this.total = data.result.total
						if (data.result.records.length > 0) {
							_this.tableData = data.result.records
						} else {
							_this.tableData = [];
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
				updateLabel(_this.newProd).then(data => {
					if (data.code == '200') {
						_this.alertMessage('修改成功')
						_this.dialogStatus = false
						_this.getList()
					}
				})
			} else {
				addNewLabel(_this.newProd).then(data => {
					if (data.code == '200') {
						_this.alertMessage('保存成功')
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
		delete(labelId) {
			let _this = this
			this.$confirm('确定删除所选应用吗?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let params = {
					labelIdList: labelId,
					state: 'DELETE'
				}
				delLabel(params).then(data => {
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
					ids.push(item.labelId)
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
		reset(){
			let oldId = this.newProd.labelId;
			this.resetForm();
			this.newProd.labelId = oldId;
		},
		resetForm() {
			this.newProd = {
				labelCode: '',
				labelId: null,
				labelName: '',
				state: ''
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/styles/my.scss';
</style>