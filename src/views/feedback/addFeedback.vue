<template>
  <div id="addFeedback" class="mainWrap">
    <h4>
      <i class="el-icon-s-order"></i> 意见反馈
    </h4>

    <el-divider></el-divider>
    <div style="padding:30px">
      <el-input
        type="textarea"
        :autosize="{ minRows: 20, maxRows: 24}"
        placeholder="请详细描述您的问题和建议，我们将及时更进解决"
        maxlength="2500"
        show-word-limit
        v-model="textarea"
      ></el-input>
      <div class="footerButton ly-flex ly-justify-e mt30" style>
        <el-button type="primary" @click="submit" :loading="submitLoading">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { addFeedbackInfo } from '@/api/member'
import { mapState } from 'vuex'

export default {
  components: {},
  data() {
    return {
      textarea: '',
      submitLoading: false
    }
  },
  mounted() {},
  computed: {
    ...mapState('login', ['companyType'])
  },
  methods: {
    submit() {
      this.submitLoading = true
      let obj = {
        content: this.textarea,
        source: this.companyType
      }
      addFeedbackInfo(obj).then(res => {
        this.submitLoading = false
        this.textarea = ''
        this.$message({
          type: 'success',
          message: '提交成功'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mainWrap.scss';
#addFeedback {
  .footerButton {
    // position: absolute;
    // bottom: 80px;
  }
}
</style>