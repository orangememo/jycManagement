<template>
    <div style="width: 1200px;">
        <div class="form-box" style="margin-top:20px">
                <div class="form-title text-red flex">
                    <el-image :src="require('../../../assets/my/feeback.png')" class="img-icon margin-lr-sm head_pic">
                    </el-image>
                    <div>意见反馈</div>
                </div>
            </div>
        <div class="text-box">
        <div class="text-title">反馈内容</div>
        <textarea class="textarea" placeholder="请详细描述您的问题或者建议，我们将及时更进解决。" v-model="desc"></textarea>
        <el-button @click="feeback()" type="danger" style="width:300px;margin:30px 60px">提交</el-button>
        <div class="form-btn text-right">

        </div>
      </div>
    </div>
</template>
<script>
    import echarts from "echarts";
    export default {
        data() {
            return {
              desc:''  
            };
        },
        created() {
        },
        mounted() {
        },
        computed: {
        },
        methods: {
            showSum(index) {
                this.activeClass = index
            },
        }
    };
</script>

<style scoped>
.margin-lr-sm{
    margin-right: 20px;
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
.form-box{
    margin-top: 30px;
}
.text-box {
  margin: 30px 0;
  height: 584px;
  border: solid 1px #e9e9e9;
}
.text-box .text-title {
  font-size: 18px;
  font-weight: normal;
  color: #333333;
  height: 49px;
  line-height: 49px;
  background-color: #e9e9e9;
  padding-left: 50px;
}
.text-box .textarea{
    width: 1016px;
	height: 334px;
    background-color: #f9f9f9;
    margin: 32px 61px;
    padding: 31px;
    font-size: 14px;
    color: #333333;
    border: none;
}
.form-btn{
    margin: 0 81px;
}
.form-btn button{
    width: 141px;
	height: 46px;
	line-height: 46px;
	background-color: #eb3335;
    border-radius: 5px;
    font-size: 20px;
	font-weight: normal;
}
</style>