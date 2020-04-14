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

		<el-popover placement="bottom-end" trigger="click" slot="ref">
			<el-link class="set" @click="editStatus(1)">设置为显示</el-link>
			<br />
			<el-link class="set" @click="editStatus(0)">设置为隐藏</el-link>
		</el-popover>

		<el-dialog :title="dialogTitle" :visible.sync="dialogStatus" width="800px">
			<div>
				<el-form :model="newProd" ref="roleFrom" label-width="80px">
					<el-form-item label="酒店ID" prop="hotel_id">
						<el-select v-model="newProd.hotel_id" placeholder="请选择...">
							<el-option
								v-for="(item,index) in hotelList"
								:key="index"
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="商品" prop="commodity_id">
						<el-select v-model="newProd.commodity_id" placeholder="请选择...">
							<el-option
								v-for="(item,index) in hotelList"
								:key="index"
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="数量" prop="number">
						<el-input-number v-model="newProd.number"></el-input-number>
					</el-form-item>
					<el-form-item label="状态" prop="status">
						<el-radio-group v-model="newProd.status">
							<el-radio label="1">正常</el-radio>
							<el-radio label="0">隐藏</el-radio>
						</el-radio-group>
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
import companyApi from '@/api/company'
export default {
	data() {
		return {
			dialogStatus: false,
			dialogTitle: '',
			loading: false,
			total: 13,
			listLoading: true,
			newProd: {},
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
						prop: 'hotel_id',
						label: '酒店ID',
						placeholder: '请输入酒店ID'
					},
					{
						type: 'input',
						prop: 'commodity_id',
						label: '商品名称',
						placeholder: '请输入商品名称'
					},
					{
						type: 'date',
						prop: 'createtime',
						dateFormate: 'yyyy-MM-dd',
						label: '创建时间',
						placeholder: '创建时间'
					},
					{
						type: 'date',
						prop: 'updatetime',
						dateFormate: 'yyyy-MM-dd',
						label: '修改时间',
						placeholder: '修改时间'
					},
					{
						type: 'select',
						prop: 'status',
						label: '状态',
						placeholder: '状态',
						optList: [
							{ label: '正常', value: '1' },
							{ label: '隐藏', value: '0' }
						]
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
			tableData: [
				{
					id: 23,
					hotel_id: '34',
					commodity_id: '4',
					number: 36,
					status: '1',
					createtime: 1585646587,
					updatetime: 1585646587,
					deletetime: null,
					status_text: '正常'
				},
				{
					id: 22,
					hotel_id: '34',
					commodity_id: '3',
					number: 42,
					status: '1',
					createtime: 1585646574,
					updatetime: 1585646574,
					deletetime: null,
					status_text: '正常'
				},
				{
					id: 21,
					hotel_id: '34',
					commodity_id: '2',
					number: 42,
					status: '1',
					createtime: 1585646561,
					updatetime: 1585646561,
					deletetime: null,
					status_text: '正常'
				},
				{
					id: 20,
					hotel_id: '21',
					commodity_id: '4',
					number: 0,
					status: '1',
					createtime: 1585641697,
					updatetime: 1585641697,
					deletetime: null,
					status_text: '正常'
				},
				{
					id: 19,
					hotel_id: '21',
					commodity_id: '3',
					number: 0,
					status: '1',
					createtime: 1585641679,
					updatetime: 1585641679,
					deletetime: null,
					status_text: '正常'
				},
				{
					id: 18,
					hotel_id: '21',
					commodity_id: '2',
					number: 0,
					status: '1',
					createtime: 1585641647,
					updatetime: 1585641666,
					deletetime: null,
					status_text: '正常'
				},
				{
					id: 17,
					hotel_id: '35',
					commodity_id: '3',
					number: 12,
					status: '1',
					createtime: 1585625469,
					updatetime: 1585625647,
					deletetime: null,
					status_text: '正常'
				},
				{
					id: 16,
					hotel_id: '35',
					commodity_id: '4',
					number: 36,
					status: '1',
					createtime: 1585625457,
					updatetime: 1585625647,
					deletetime: null,
					status_text: '正常'
				},
				{
					id: 15,
					hotel_id: '35',
					commodity_id: '2',
					number: 6,
					status: '1',
					createtime: 1585625443,
					updatetime: 1585625647,
					deletetime: null,
					status_text: '正常'
				},
				{
					id: 14,
					hotel_id: '23',
					commodity_id: '1',
					number: 266,
					status: '1',
					createtime: 1579427932,
					updatetime: null,
					deletetime: null,
					status_text: '正常'
				}
			],
			tableLabel: [
				{ label: 'ID', param: 'id', align: 'center', type: 'text' },
				{
					label: '酒店ID',
					param: 'hotel_id',
					align: 'center',
					type: 'text'
				},
				{
					label: '商品',
					param: 'commodity_id',
					align: 'center',
					type: 'text'
				},
				{
					label: '数量',
					param: 'number',
					align: 'center',
					type: 'text'
				},
				{
					label: '状态',
					param: 'status',
					type: 'text',
					align: 'center',
					render: row => {
						if (row.status == 0) {
							return '隐藏'
						} else if (row.status == 1) {
							return '正常'
						}
					}
				},
				{
					label: '创建时间',
					param: 'createtime',
					align: 'center',
					type: 'text'
				},
				{
					label: '更新时间',
					param: 'updatetime',
					align: 'center',
					type: 'text'
				}
			],
			tableOption: {
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
					}
				]
			},
			hotelList: [
				{ id: 20, name: '上海品尊一号海鲜', pid: 0 },
				{ id: 11, name: '上海宝龙艾美酒店', pid: 0 },
				{ id: 8, name: '上海富建酒店', pid: 0 },
				{ id: 5, name: '丰收日大酒店', pid: 0 },
				{ id: 16, name: '丰鑫渔港', pid: 0 },
				{ id: 14, name: '农家小楼', pid: 0 },
				{ id: 12, name: '南翔公馆', pid: 0 },
				{ id: 13, name: '南翔公馆养生火锅', pid: 0 },
				{ id: 7, name: '天禧大酒楼（闵行店）', pid: 0 },
				{ id: 6, name: '宝燕酒店', pid: 0 }
			],
			chooseList: [],
			moreStatus: false
		}
	},
	components: { Pagination, jycTable, SearchForm },
	mounted() {
		this.getList()
	},
	methods: {
		handleSortChange() {},
		handleButton(object) {
			let method = object['methods']
			if (method == 'edit') {
				this.edit(object.row)
			} else if (method == 'delete') {
				this.delete(object.row)
			}
		},
		handleSelectionChange(row) {
			this.chooseList = row
		},
		search() {
			console.log(this.form)
		},
		getList() {
			let _this = this
			companyApi.getCompanyPageInfo(params).then(data => {
				if (data.code == '200' && data.result.records > 0) {
					_this.tableData = data.result.records;
					//处理日期
					_this.tableData.map(item => {
						item.createtime = item.createtime
							? _this.$dateFormat(item.createtime)
							: ''
						item.updatetime = item.updatetime
							? _this.$dateFormat(item.updatetime)
							: ''
					})
				}
			})
		},
		addNew() {
			this.newProd = {}
			this.dialogTitle = '添加'
			this.dialogStatus = true
		},
		reset(){
			let oldId = this.newProd.id;
			this.resetForm();
			this.newProd.id = oldId;
		},
		resetForm() {
			this.newProd = {}
		},
		save() {
			alert(JSON.stringify(this.newProd))
		},
		edit(row) {
			this.newProd = row
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
		}
	}
}
</script>

<style scoped>
.set {
	height: 50px;
	background: none;
}
</style>