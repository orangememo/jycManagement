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
					<el-form-item label="名称" :label-width="labelWidth" prop="companyName">
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
					<el-form-item label="缩略图" :label-width="labelWidth" prop="abbreviateImg">
						<div style="display:flex">
							<div v-if="newProd.abbreviateImg" class="img-div-t" style="margin-right:30px">
								<el-image
									style="width: 150px; height: 150px"
									:src="hostUrl+newProd.abbreviateImg"
									:preview-src-list="[hostUrl+newProd.abbreviateImg]"
								/>
								<button class="del-img-btn" @click="newProd.abbreviateImg=''">删除</button>
							</div>
							<div class="img-div-t">
								<upload :showFileList="false" v-on:uploadimg="uImg" />
							</div>
						</div>
					</el-form-item>
					<el-form-item label="背景图片" :label-width="labelWidth" prop="backgroundImg">
						<div style="display:flex">
							<div v-if="newProd.backgroundImg" class="img-div-t" style="margin-right:30px">
								<el-image
									style="width: 150px; height: 150px"
									:src="hostUrl+newProd.backgroundImg"
									:preview-src-list="[hostUrl+newProd.backgroundImg]"
								/>
								<button class="del-img-btn" @click="newProd.backgroundImg=''">删除</button>
							</div>
							<div class="img-div-t">
								<upload :showFileList="false" v-on:uploadimg="uBgImg" />
							</div>
						</div>
					</el-form-item>
					<el-form-item label="图片组" :label-width="labelWidth"  prop="images">
						<div v-if="newProd.images" style="display:inline">
							<div v-for="(item,index) in newProd.images" :key="index" class="img-div">
								<div class="img-div-t">
									<el-image
										style="width: 150px; height: 150px"
										:src="hostUrl+item"
										:preview-src-list="[hostUrl+item]"
										fit="cover"
									></el-image>
									<button class="del-img-btn" @click="newProd.images.splice(index,1)">删除</button>
								</div>
							</div>
						</div>
						<div class="img-div-t" style="float:left;">
							<upload :showFileList="false" v-on:uploadimg="uInImg" />
						</div>
					</el-form-item>
					<el-form-item label="营业时间" :label-width="labelWidth" prop="businessHours">
						<el-input v-model="newProd.businessHours"></el-input>
					</el-form-item>
					<el-form-item label="描述" :label-width="labelWidth" prop="description">
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
			form: {}, //查询条件
			formRules: {
				companyName: [{ required: true, message: '请输入名称', trigger: 'blur' }],
				linkMan: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
				mobile: [{ required: true, message: '请输入电话', trigger: 'blur' }],
				companyAddr: [{ required: true, message: '请输入地址', trigger: 'blur' }],
				abbreviateImg: [{ required: true, message: '请上传酒店缩略图', trigger: 'blur' }],
				backgroundImg: [{ required: true, message: '请上传酒店背景图', trigger: 'blur' }],
				images: [{ required: true, message: '请上传酒店图片组', trigger: 'blur' }],
				businessHours: [{ required: true, message: '请输入营业时间', trigger: 'blur' }],
				description: [{ required: true, message: '请输入描述信息', trigger: 'blur' }],
			},
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
							} else if (item.labelCode == 'RECOMMEND') {
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
		getSearchList(){
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
			console.log('form:' + JSON.stringify(_this.form))
			console.log('p:' + JSON.stringify(p))
			this.searchCompanyPageHotel(p)
		},
		searchCompanyPageHotel(params) {
			let _this = this
			_this.loading = true
			getCompanyPageHotel(params).then(data => {
				if (data.code == '200') {
					_this.total = data.result.total
					if (data.result.records.length > 0) {
						_this.tableData = data.result.records
					} else {
						_this.tableData = []
					}
				} else {
					_this.tableData = []
				}
				_this.loading = false
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
			let sessionProd = {..._this.newProd}
			sessionProd.companyType = 'HOTEL'

			_this.newProd.labelList instanceof Array
				? (sessionProd.flags = _this.newProd.labelList.join(','))
				: ''
			_this.newProd.images instanceof Array
				? (sessionProd.images = _this.newProd.images.join(','))
				: ''
			
			if (_this.editStatus) {
				updateCompany(sessionProd).then(data => {
					if (data.code == '200') {
						_this.alertMessage('修改成功')
						_this.dialogStatus = false
						_this.getList()
					}
				})
			} else {
				addNewCompany(sessionProd).then(data => {
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
				let companyIds = []
				this.chooseList.map(item => {
					companyIds.push(item.companyId)
				})
				this.delete(companyIds.join(','))
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
			companyTopWeight({ cmpId: row.companyId }).then(data => {
				if (data.code == '200') {
					_this.alertMessage('置顶成功')
					_this.getList()
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
				inImg ? row.images.push(inImg) : ''
				this.newProd = { ...row }
				this.newProd.labelList = newLabel
			}
			console.log(this.newProd.images);
		},
		reset() {
			let oldId = this.newProd.companyId
			this.resetForm()
			this.newProd.cmpId = oldId
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
.img-div {
	float: left;
	margin: 0 30px 30px 0;
}
.img-div-t{
	display: flex;
	flex-direction: column;
}
</style>