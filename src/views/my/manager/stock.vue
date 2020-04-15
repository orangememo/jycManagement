<template>
	<div style="width: 90%;">
		<!-- <el-image :src="require('../../../assets/my/admin-banner.png')"></el-image> -->
		<div class="form-box" style="margin-top:20px">
			<div class="form-title text-red flex">
				<el-image
					:src="require('../../../assets/my/ordertotal.png')"
					class="img-icon margin-lr-sm head_pic"
				></el-image>
				<div>总部酒库存</div>
			</div>
		</div>
		<el-table
			:data="list"
			stripe
			style="margin: 30px 0;"
			row-class-name="row-class-jy"
			header-row-class-name="head-row-class-jy"
		>
			<el-table-column prop="jname" label="名称" width="180" align="center"></el-table-column>
			<el-table-column prop="img" label="图片" width="180" align="center">
				<template slot-scope="scope">
					<img :src="hostUrl+scope.row.img" width="40" height="40" class="head_pic" />
				</template>
			</el-table-column>
			<el-table-column prop="repertorynum" label="剩余酒库存"></el-table-column>
		</el-table>
	</div>
</template>
<script>
import { getLpHotelCtxf } from '@/api/hotel'
import store from '@/store'
import echarts from 'echarts'
export default {
	data() {
		return {
			tabIndex: 0,
			activeClass: 0,
			list: []
		}
	},
	created() {},
	mounted() {
		this.getList()
	},
	computed: {},
	methods: {
		getList() {
			const that = this
			getLpHotelCtxf({ id: store.state.login.companyId }).then(data => {
                that.list = data.result.a
                that.list.map(item=>{
                    console.log(item.jname);
                    if(item.jname == '豪情'){
                        item.img = "/uploads/20190604/5e60fbc0db632a875241736f12b29b06.jpg";
                    }else if(item.jname == '豪爽'){
                        item.img = "/uploads/20190604/8d7bf1d8c7572c408564dcffa8ce8ab7.jpg";
                    }if(item.jname == '豪饮'){
                        item.img = "/uploads/20190604/f6507d2aaf66f6fb473bce56027ccde9.jpg";
                    }
                })
			})
		},
		showSum(index) {
			this.activeClass = index
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
</style>