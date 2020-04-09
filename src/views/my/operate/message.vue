<template>
	<div id="message">
        <!-- <div class="header-bg"></div> -->
		<div class="form-box" style="margin-top:20px">
			<div class="form-title text-red flex">
				<el-image :src="require('../../../assets/my/auth.png')" class="img-icon margin-lr-sm head_pic"></el-image>
				<div>信息认证</div>
			</div>
		</div>
		<div class="form-types">运营中心信息</div>
		<el-form
			:model="ruleForm"
			:rules="rules"
			ref="loginForm"
			label-width="100px"
			label-position="right"
			class="form-ta"
		>
			<el-form-item label="运营昵称" prop="username">
				<el-input class="input-width" v-model="ruleForm.username"></el-input>
			</el-form-item>
			<el-form-item label="联系方式" prop="mobile">
				<el-input class="input-width" v-model="ruleForm.mobile" disabled></el-input>
			</el-form-item>
			<el-form-item label="联系邮箱" prop="email">
				<el-input class="input-width" v-model="ruleForm.email" type="email"></el-input>
			</el-form-item>
			<el-button @click="submitForm()" type="danger" style="width:300px;margin:30px 60px">提交</el-button>
		</el-form>
	</div>
</template>
<script>
import echarts from 'echarts'
export default {
	data() {
		return {
			ruleForm: {
				username: '浦东运营中心',
				mobile: 13381971639
			},
			rules: {
				username: [{ required: true, message: '请输入名称' }],
				mobile: [
					{ required: true, message: '请输入联系方式' },
					{ min: 11, max: 11, message: '请输入正确的手机号码' }
				],
				email: [
					{
						pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
						message: '请输入正确格式'
					}
				]
			}
		}
	},
	created() {},
	mounted() {},
	computed: {},
	methods: {
		showSum(index) {
			this.activeClass = index
		}
	}
}
</script>

<style scoped>
.header-bg{
    height: 500px;
  width: 100%;
  background-position: center 0;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  zoom: 1;
  background-image: url("../../../assets/my/user-bg.png");
}
.flex{
    display: flex;
}
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
.form-types {
	font-size: 20px;
	font-weight: 700;
	letter-spacing: 0;
	color: #333;
	margin: 45px 32px;
}
.form-box .form-title .img-icon {
	width: 21px;
	height: 24px;
	margin-top: 3px;
}
#message {
	width: 90%;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.input-width {
	width: 300px;
}
.form-ta {
	margin: 20px 10%;
}
.margin-lr-sm{
    margin-right: 20px;
}
</style>