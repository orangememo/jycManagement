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

		<!-- 添加新的酒店 Dialog-->
		<el-dialog :title="dialogTitle" :visible.sync="dialogStatus" width="1000px">
			<el-form :model="ruleForm" :disabled="dialogEditStatus" @submit.native.prevent>
				<!-- prop用于校验 -->
				<el-form-item v-if="addNewStatus" label="登录号码">
					<el-input v-model="ruleForm.logNum"></el-input>
				</el-form-item>
				<el-form-item label="酒店名称">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="联系昵称">
					<el-input v-model="ruleForm.contacts"></el-input>
				</el-form-item>
				<el-form-item label="联系电话">
					<el-input v-model="ruleForm.mobile"></el-input>
				</el-form-item>
				<el-form-item label="营业时间">
					<el-input v-model="ruleForm.businesshours"></el-input>
				</el-form-item>
				<el-form-item label="酒店地址">
					<el-input v-model="ruleForm.address" disabled="disabled"></el-input>
					<maps
						v-on:location="location"
						:lng="ruleForm.lon"
						:lat="ruleForm.lat"
						:address="ruleForm.address"
					></maps>
				</el-form-item>
				<el-form-item label="酒店图像" prop="image">
					<el-image  v-if="ruleForm.image" style="width: 200px; height: 200px;" :src="hostUrl+ruleForm.image" fit="cover"></el-image>
					<div v-if="!dialogEditStatus">
						<div>请上传酒店缩略图</div>
						<div class="padding-tb secondary">格式要求：支持jpg.png.jpeg.bmp格式照片，大小不能超过3M。</div>
						<upload v-on:uploadimg="uImg" />
					</div>
				</el-form-item>
				<el-form-item label="酒店背景" prop="backgroundPictureImage">
					<el-image  v-if="ruleForm.backgroundPictureImage"
						style="width: 200px; height: 200px"
						:src="hostUrl+ruleForm.backgroundPictureImage"
						fit="cover"
					></el-image>
					<div v-if="!dialogEditStatus">
						<div>请上传酒店背景图</div>
						<div class="padding-tb secondary">格式要求：支持jpg.png.jpeg.bmp格式照片，大小不能超过3M。</div>
						<upload v-on:uploadimg="uBgImg" />
					</div>
				</el-form-item>
				<el-form-item label="酒店内景" prop="backgroundPictureImage">
					<div v-if="ruleForm.images">
						<el-image
						v-for="(item,index) in ruleForm.images"
						:key="index"
						style="width: 200px; height: 200px;margin:20px;"
						:src="hostUrl+item"
						fit="cover"
					></el-image>
					</div>
					<div v-if="!dialogEditStatus">
						<div>请上传酒店内景图</div>
						<div class="padding-tb secondary">格式要求：支持jpg.png.jpeg.bmp格式照片，大小不能超过3M。</div>
						<upload v-on:uploadimg="uInImg" />
					</div>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogStatus = false">取消</el-button>
				<el-button type="primary" @click="saveNewHotel">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import SearchForm from '@/components/seachForm/seachForm'
import jycTable from '@/components/table/jycTable'
import Pagination from '@/components/Pagination'
import Maps from '@/components/map.vue'
import Upload from '@/components/Upload.vue'
import { getHotelList } from '@/api/hotel'
export default {
	components: { Pagination, jycTable, SearchForm, Maps, Upload },
	data() {
		return {
			dialogStatus: false,
			addNewStatus: false,
			dialogTitle: '',
			dialogEditStatus: false,
			loading: false,
			total: 0,
			listLoading: true,
			ruleForm: {
				logNum: '',
				mobile: '',
				name: '',
				contacts: '',
				phone: '',
				backgroundPictureImage: '',
				image: '',
				images: [],
				address: '',
				lon: 121.59996,
				lat: 31.197646,
				businessHours: ''
			},
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
						label: '酒店名称',
						placeholder: '请输入酒店名称'
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
						name: '置顶',
						handleClick: this.top
					}
				]
			},
			form: {},
			tableData: [],
			tableLabel: [
				{
					label: '酒店ID',
					param: 'id',
					align: 'center',
					type: 'text'
				},
				{
					label: '酒店名称',
					param: 'name',
					align: 'center',
					type: 'text'
				},
				{
					label: '酒店头像',
					param: 'image',
					type: 'img',
					align: 'center'
				},
				{
					label: '酒店地址',
					param: 'address',
					align: 'center',
					type: 'text',
					width: 300
				},
				{
					label: '权重',
					param: 'id',
					align: 'center',
					type: 'text'
				}
			],
			tableOption: [
				{
					label: '查看订单',
					width: '100',
					options: [
						{
							type: 'primary',
							icon: 'el-icon-s-order',
							methods: 'goOrder'
						}
					]
				},
				{
					label: '菜单管理',
					width: '100',
					options: [
						{
							type: 'primary',
							icon: 'el-icon-menu',
							methods: 'goMenu'
						}
					]
				},
				{
					label: '包厢管理',
					width: '100',
					options: [
						{
							type: 'primary',
							icon: 'el-icon-s-finance',
							methods: 'goSeat'
						}
					]
				},
				{
					label: '酒店详情',
					width: '100',
					options: [
						{
							type: 'primary',
							icon: 'el-icon-info',
							methods: 'goHotel'
						}
					]
				},
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
							methods: 'top'
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
				default:
					break
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
			const params = {
				id: 15,
				pageNo: 1,
				pageSize: 10
			}
			getHotelList(params).then(data => {
				if (data.code == '200') {
					_this.total = data.result.total
					if (data.result.rows.length > 0) {
						_this.tableData = data.result.rows
						//处理日期
						_this.tableData.map(item => {
							item.createtime = item.createtime
								? _this.$dateFormat(item.createtime)
								: ''
						})
					}
				}
			})
		},
		addNew() {
			this.resetForm()
			this.dialogTitle = '添加酒店信息'
			this.dialogStatus = true
			this.dialogEditStatus = false
			this.addNewStatus = true;
		},
		resetForm() {
			this.ruleForm = {
				mobile: '',
				name: '',
				contacts: '',
				phone: '',
				backgroundPictureImage: '',
				image: '',
				images: [],
				address: '',
				lon: 121.59996,
				lat: 31.197646,
				businessHours: ''
			}
		},
		save() {},
		edit(row) {
			this.setRuleFrom(row)
			this.dialogTitle = '修改酒店信息'
			this.dialogStatus = true
			this.dialogEditStatus = false
			this.addNewStatus = false
		},
		delete(row) {
			this.$alert('删除')
		},
		top(row) {
			if (row.id) {
				this.$alert(row.id)
			} else {
				if (this.chooseList.length > 0) {
					this.$alert('置顶')
				} else {
					this.$alert('请先选择要置顶项')
				}
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
		goOrder(row) {
			this.$router.push({
				name: 'orderList',
				params: { hotelId: row.id }
			})
		},
		goHotel(row) {
			this.setRuleFrom(row)
			this.dialogTitle = '查看酒店信息'
			this.dialogStatus = true
			this.dialogEditStatus = true
			this.addNewStatus = false
		},
		goSeat(row) {
			this.$router.push({
				name: 'houseList',
				params: { hotelId: row.id }
			})
		},
		goMenu(row) {
			this.$router.push({ name: 'foodList', params: { hotelId: row.id } })
		},
		setRuleFrom(row) {
			if (row.images instanceof Array) {
				this.ruleForm = row
			} else if (row.images && row.images.indexOf(',') > -1) {
				row.images = row.images.split(',')
			} else {
				let inImg = row.images
				row.images = []
				row.images.push(inImg)
			}
			this.ruleForm = row
		},
		saveNewHotel() {},
		//地图+图片上传
		location(address, loca) {
			let lon = this.accountNum(loca[0][0])
			let lat = this.accountNum(loca[0][1])
			this.ruleForm.address = address
			this.ruleForm.lon = lon
			this.ruleForm.lat = lat
		},
		//补全经纬度为小数点后10位
		accountNum(value, num = 10) {
			var a, b, c, i
			a = value.toString()
			b = a.indexOf('.')
			c = a.length
			if (num == 0) {
				if (b != -1) {
					a = a.substring(0, b)
				}
			} else {
				//如果没有小数点
				if (b == -1) {
					a = a + '.'
					for (i = 1; i <= num; i++) {
						a = a + '0'
					}
				} else {
					//有小数点，超出位数自动截取，否则补0
					a = a.substring(0, b + num + 1)
					for (i = c; i <= b + num; i++) {
						a = a + '0'
					}
				}
			}
			return a
		},
		uImg(img) {
			this.ruleForm.image = img
		},
		uBgImg(img) {
			this.ruleForm.backgroundPictureImage = img
		},
		uInImg(img) {
			this.ruleForm.images.push(img)
		}
	}
}
</script>

<style scoped>
.set {
	height: 50px;
	background: none;
}
.el-form-item {
	display: flex;
}
</style>