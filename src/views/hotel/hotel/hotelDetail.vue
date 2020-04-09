<template>
	<div>
		<div class="form-box padding text-left">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
				<el-form-item label="酒店头像" prop="name">
					<el-image style="width: 50px; height: 50px" :src="hostUrl+ruleForm.image" fit="cover"></el-image>
				</el-form-item>
				<el-form-item label="酒店全称" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="酒店地址" prop="name">
					<el-input v-model="ruleForm.address"></el-input>
				</el-form-item>
				<el-form-item label="营业时间" prop="name">
					<el-input v-model="ruleForm.businesshours"></el-input>
				</el-form-item>
				<el-form-item label="酒店简介" prop="name">
					<el-input type="textarea" v-model="ruleForm.description"></el-input>
				</el-form-item>
				<el-form-item label="酒店背景" prop="name">
					<el-image style="width: 50px; height: 50px" :src="hostUrl+ruleForm.bg" fit="cover"></el-image>
				</el-form-item>
				<el-form-item label="酒店内景" prop="name">
					<el-image style="width: 100px; height: 100px;margin:10px" :src="item" fit="cover" v-for="(item,index) in imgs" :key='index'></el-image>
				</el-form-item>
				<el-form-item label="联系人姓名" prop="name">
					<el-input type="text" v-model="ruleForm.contacts"></el-input>
				</el-form-item>
				<el-form-item label="联系人座机" prop="name">
					<el-input type="text" v-model="ruleForm.mobile"></el-input>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	props: {
		foo: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			ruleForm: {
				name: '', //酒店名称
				mobile: '', //联系人电话
				contacts: '', //联系人姓名
				address: '', //收货地址
				businessLicense: '', //营业执照
				identityCard: '', //身份证照
				otherMaterials: '', //其他材料
				img: '',
				businesshours: '', //经营时间
				description: '' //酒店简介
			},
			rules: {
				name: [{ required: true, message: '请输入名称' }]
			},
			dialogImageUrl: '',
			dialogVisible: false
		}
	},
	computed: {
		...mapState({ hotelInfo: state => state.hotel.hotelInfo })
	},
	created() {
		this.init()
	},
	methods: {
		init() {
			const hotelInfo = this.hotelInfo
			this.ruleForm = {
				name: hotelInfo ? hotelInfo.name : '', //酒店名称
				mobile: hotelInfo ? hotelInfo.mobile : '', //联系人电话
				contacts: hotelInfo ? hotelInfo.contacts : '', //联系人姓名
				address: hotelInfo ? hotelInfo.address : '', //收货地址
				businessLicense: hotelInfo ? hotelInfo.businessLicense : '', //营业执照
				identityCard: hotelInfo ? hotelInfo.identityCard : '', //身份证照
				otherMaterials: hotelInfo ? hotelInfo.otherMaterials : '', //其他材料
				img: hotelInfo ? this.$imgUrl + hotelInfo.image : '',
				businesshours: hotelInfo ? hotelInfo.businesshours : '', //经营时间
				description: hotelInfo ? hotelInfo.description : '' //酒店简介
			}
		},
		uploads(response, file, fileList) {
			console.log(response, file, fileList)
			this.ruleForm.img = response.result
		},
		submitForm() {
			this.$refs.loginForm.validate(valid => {
				this.$message({
					message: '等待开发',
					type: 'warning'
				})
				if (valid) {
					//   alert("提交登录！");
				} else {
					//   console.log("校验失败");
					return false
				}
			})
		}
	}
}
</script>

<style scoped>
.header {
	position: relative;
}
.form-box .el-form-item .el-input,
.form-box .el-textarea {
	width: 500px;
}
</style>