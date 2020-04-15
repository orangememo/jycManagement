<template>
  <div id="userInfo" class="mainWrap">
    <el-card>
      <h3>个人资料</h3>
      <el-row style="width:50%;margin:0 auto">
        <div class="ly-flex ly-justify-c mb30">
          <img class="userInfoAvatar" :src="userInfo.avatar" />
        </div>
        <el-form ref="form" :model="form" label-width="100px" size="small">
          <el-col :span="24">
            <el-form-item label="用户名" prop="roleName">
              <el-input v-model="userInfo.userName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Email:" prop="roleCode">
              <el-input v-model="userInfo.email" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="昵称:" prop="roleCode">
              <el-input v-model="userInfo.nickName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="密码:" prop="roleCode">
              <el-input
                v-model="form.password"
                :type="passwordType"
                autocomplete="new-password"
                placeholder="请输入密码，不修改请置空"
                maxlength="16"
              ></el-input>
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class="ly-flex ly-justify-c mb30">
        <el-button size="small" type="primary" @click="handleClick('提交')">提交</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { putUserInfoPassword } from '@/api/login'

export default {
  data() {
    return {
      passwordType: '',
      form: {
        password: ''
      }
    }
  },
  computed: {
    ...mapState('login', ['userInfo'])
  },
  methods: {
    showPwd() {
      console.log(123132)
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleClick(type) {
      if (type === '提交') {
        let { accountNum } = this.userInfo
        let newPassword = this.$getRsaCode(this.form.password)
        putUserInfoPassword({ accountNum, newPassword }).then(res => {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.$router.push({ path: '/login' })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mainWrap.scss';
#userInfo {
  .userInfoAvatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 0px;
    color: #889aa4;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
  }
}
</style>