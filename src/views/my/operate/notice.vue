<template>
	<div style="width: 90%;">
		<div class="form-box" style="margin-top:20px">
			<div class="form-title text-red flex">
				<el-image
					:src="require('../../../assets/my/ordertotal.png')"
					class="img-icon margin-lr-sm head_pic"
				></el-image>
				<div>系统通知</div>
			</div>
		</div>
		<el-table
			border
			:data="list"
			stripe
			style="margin: 30px 0;"
			row-class-name="row-class-jy"
			header-row-class-name="head-row-class-jy"
		>
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column prop="id" label="序号" width="180"></el-table-column>
			<el-table-column prop="title" label="消息类型"></el-table-column>
			<el-table-column prop="content" label="消息内容"></el-table-column>
			<el-table-column prop="createtime" label="时间"></el-table-column>
			<el-table-column label="标记已读" width="100">
				<template slot-scope="scope">
                    <!-- <el-button v-if="scope.row.status==0" size="mini" type="success" icon="el-icon-check" circle disabled ></el-button> -->
                    <!-- <el-button v-else type="danger" size="mini" circle @click="handleEdit(scope.$index, scope.row)">NEW</el-button> -->
					<i v-if="scope.row.status==0" class="el-icon-check" style="margin-left:30px"></i>
					<span v-else class="tip" @click="handleEdit(scope.$index, scope.row)">new</span>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			@size-change="pageSizeChange"
			@current-change="currentPageChange"
			:current-page="currentPage"
			:page-sizes="[5, 10, 15, 20]"
			:page-size="100"
			layout="total, sizes, prev, pager, next, jumper"
			:total="100"
		></el-pagination>
	</div>
</template>
<script>
import echarts from 'echarts'
export default {
	data() {
		return {
			currentPage: 1,
			list: [
				{
					id: 243,
					title: '菜品通知',
					content: '有新的菜品通知，请尽快操作',
					createtime: 1585641455,
					uid: '15',
					usersId: 'null,15',
					status: '1'
				},
				{
					id: 242,
					title: '菜品通知',
					content: '有新的菜品通知，请尽快操作',
					createtime: 1585641378,
					uid: '15',
					usersId: 'null,15',
					status: '1'
				},
				{
					id: 241,
					title: '菜品通知',
					content: '有新的菜品通知，请尽快操作',
					createtime: 1585640008,
					uid: '15',
					usersId: 'null,15',
					status: '1'
				},
				{
					id: 240,
					title: '菜品通知',
					content: '有新的菜品通知，请尽快操作',
					createtime: 1585639950,
					uid: '15',
					usersId: 'null,15',
					status: '1'
				},
				{
					id: 239,
					title: '菜品通知',
					content: '有新的菜品通知，请尽快操作',
					createtime: 1585639845,
					uid: '15',
					usersId: null,
					status: '0'
				},
				{
					id: 238,
					title: '菜品通知',
					content: '有新的菜品通知，请尽快操作',
					createtime: 1585638645,
					uid: '15',
					usersId: null,
					status: '0'
				},
				{
					id: 237,
					title: '菜品通知',
					content: '有新的菜品通知，请尽快操作',
					createtime: 1585637683,
					uid: '15',
					usersId: null,
					status: '0'
				},
				{
					id: 236,
					title: '菜品通知',
					content: '有新的菜品通知，请尽快操作',
					createtime: 1585637628,
					uid: '15',
					usersId: null,
					status: '0'
				},
				{
					id: 235,
					title: '菜品通知',
					content: '有新的菜品通知，请尽快操作',
					createtime: 1585636945,
					uid: '15',
					usersId: null,
					status: '0'
				},
				{
					id: 234,
					title: '菜品通知',
					content: '有新的菜品通知，请尽快操作',
					createtime: 1585636836,
					uid: '15',
					usersId: null,
					status: '0'
				}
			]
		}
	},
	created() {},
	mounted() {
		this.getList()
	},
	computed: {},
	methods: {
		getList() {
			let _this = this
			_this.list.map(item => {
				item.createtime = _this.$dateFormat(item.createtime)
			})
		},
		pageSizeChange(val) {
			console.log(`每页 ${val} 条`)
		},
		currentPageChange(val) {
			console.log(`当前页: ${val}`)
		},
		handleEdit(index,item){
			this.list[index].status = 0;
		}
	}
}
</script>

<style scoped>

.form-box .form-title {
	font-family: SourceHanSansCN-Regular;
	font-size: 24px;
	font-weight: 400;
	font-stretch: normal;
	line-height: 30px;
	letter-spacing: 0;
	color: #eb3335;
	border-bottom: 1px solid #eb3335;
	padding-bottom: 14px;
}
.flex {
	display: flex;
}
.form-box .form-title .img-icon {
	width: 30px;
	height: 30px;
	margin-right: 20px;
}
.head_pic {
	width: 100%;
	height: 100%;
}
.tip{
	position: absolute;
    top: 12px;
    left: 30px;
    border-radius: 50%;
    font-style: oblique;
    color: #eb3335;
	    font-weight: bold;
}
</style>