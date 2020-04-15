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
						<el-image
							v-if="newProd.abbreviateImg"
							style="width: 150px; height: 150px"
							:src="hostUrl+newProd.abbreviateImg"
							fit="cover"
						></el-image>
						<div>请上传酒店缩略图</div>
						<upload v-on:uploadimg="uImg" />
					</el-form-item>
					<el-form-item label="背景图片" :label-width="labelWidth">
						<el-image
							v-if="newProd.backgroundImg"
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
import Upload from '@/components/Upload.vue'
import store from '@/store'
import {
	getCompanyPageHotel,
	companyTopWeight,
	addNewCompany,
	delCompany,
	updateCompany
} from '@/api/operate/manager'
import { getLabelList } from '@/api/label'
export default {
	components: { Pagination, jycTable, SearchForm, Upload },
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
			labelList: [],
			isEdit: false,
			newProd: {
				abbreviateImg: '',
				backgroundImg: '',
				businessHours: '',
				companyAddr: '',
				companyCode: '',
				cmpId: null,
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
				pcmpId: null,
				pyCode: '',
				state: '',
				vrimage: '',
				weight: 0,
				images: [],
				labelList: []
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
						let _this = this
						let span = `<div style="display: flex;justify-content: center;font-size:10px">`
						row.labelList.map(item => {
							let bg =
								'width: 50px;height: 25px;color: #fff;line-height: 26px;margin: 0 2px;'
							if (item.labelCode == 'HOT') {
								bg += 'background: #f39c12;'
							} else if (item.labelCode == 'INDEX') {
								bg += 'background: #18bc9c;'
							} else if (item.labelCode == 'recommend') {
								bg += 'background: #e74c3c;'
							}
							span += `<div style="${bg}">${item.labelName}</div>`
						})
						span += `</div>`
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
		this.getLabel()
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
					_this.delete(object.row.companyId)
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
			let _this = this;
			const params = {
				isPage: 'YES',
				currentPage: _this.listQuery.page,
				pageSize: _this.listQuery.limit
			}
			let p = { ...params, ..._this.form }
			console.log('form:'+JSON.stringify(_this.form));
			console.log('p:'+JSON.stringify(p));
			this.searchCompanyPageHotel(p)
		},
		searchCompanyPageHotel(params) {
			let _this = this
			_this.loading = true;
			getCompanyPageHotel(params).then(data => {
				if (data.code == '200') {
					_this.total = data.result.total
					if (data.result.records.length > 0) {
						_this.tableData = data.result.records
					} else {
						_this.$alert('未获取到有效信息')
						_this.tableData = [];
					}
				} else {
					_this.$alert('未获取到有效信息')
					_this.tableData = [];
				}
				_this.loading = false;
			}).catch(err=>{
				_this.$alert('服务器异常')
				_this.loading = false;
			})
		},
		getLabel() {
			let _this = this
			getLabelList({ isPage: 'NO' }).then(data => {
				if (data.code == '200') {
					_this.labelList = data.result
				}
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
			_this.newProd.labelList instanceof Array
				? (_this.newProd.flags = _this.newProd.labelList.join(','))
				: ''
			_this.newProd.images instanceof Array
				? (_this.newProd.images = _this.newProd.images.join(','))
				: ''
			_this.newProd.companyType = 'HOTEL';
			if (_this.editStatus) {
				updateCompany(_this.newProd).then(data => {
					if (data.code == '200') {
						_this.$alert('修改成功')
						_this.dialogStatus = false
						_this.getList()
					} else {
						_this.$alert(data.message)
					}
				})
			} else {
				addNewCompany(_this.newProd).then(data => {
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
		delete(cmpId) {
			let _this = this
			this.$confirm('确定删除所选酒店吗?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let params = {
					companyIdList: cmpId,
					state: 'DELETE'
				}
				delCompany(params).then(data => {
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
				let companyIds = [];
				this.chooseList.map(item=>{
					companyIds.push(item.companyId)
				})
				this.delete(companyIds.join(','));
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
			companyTopWeight({ cmpId: row.companyId }).then(data => {
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
			let newLabel = []
			row.cmpId = row.companyId
			row.labelList.map(item => {
				newLabel.push(item.labelId)
			})
			if (row.images instanceof Array) {
				this.newProd = { ...row }
				this.newProd.labelList = newLabel
			} else if (row.images && row.images.indexOf(',') > -1) {
				row.images = row.images.split(',')
				this.newProd = { ...row }
				this.newProd.labelList = newLabel
			} else {
				let inImg = row.images
				row.images = []
				row.images.push(inImg)
				this.newProd = { ...row }
				this.newProd.labelList = newLabel
			}
		},
		reset(){
			let oldId = this.newProd.companyId;
			this.resetForm();
			this.newProd.cmpId = oldId;
		},
		resetForm() {
			this.newProd = {
				abbreviateImg: '',
				backgroundImg: '',
				images: [],
				labelList: [],
				businessHours: '',
				companyAddr: '',
				companyCode: '',
				cmpId: null,
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
				pcmpId: null,
				pyCode: '',
				state: '',
				vrimage: '',
				weight: 0
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/styles/my.scss';
</style>