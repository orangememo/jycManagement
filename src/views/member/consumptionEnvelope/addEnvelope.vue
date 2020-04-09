<template>
  <div class="dialogBody" id="addEnvelope">
    <div class="body">
      <el-form ref="form" :model="form" :rules="formRules" label-width="140px" size="small">
        <!-- <el-form-item label="创建时间">
                  <el-date-picker v-model="form.value1" type="date" placeholder="请选择开始日期"></el-date-picker>-
                  <el-date-picker v-model="form.value2" type="date" placeholder="请选择结束日期"></el-date-picker>
        </el-form-item>-->
        <el-row>
          <el-col :span="24">
            <el-form-item label="消费红包" prop="roleName">
              <el-input v-model="form.roleName" placeholder="请输入邀请码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="用户id" prop="roleName">
              <el-input v-model="form.roleName" placeholder="请输入邀请码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="红包编号" prop="roleName">
              <el-input v-model="form.roleName" placeholder="请输入邀请码"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="产生id" prop="roleName">
              <el-input v-model="form.roleName" placeholder="请输入邀请码"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="状态" prop="isHide">
              <el-radio-group v-model="form.isHide">
                <el-radio :label="0">过期</el-radio>
                <el-radio :label="1">正常</el-radio>
                <el-radio :label="2">使用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="用户id" prop="roleName">
              <el-input v-model="form.roleName" placeholder="请输入用户id"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="ly-flex ly-justify-e buttonCtrl">
      <div>
        <el-button type="primary" @click="handleClick('确认')" :loading="sumbitLoading">确认</el-button>
        <el-button @click="handleClick('关闭')">关闭</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { validateMobile } from '@/utils/validate'
import { mapGetters, mapActions, mapState } from 'vuex'
import {
  getRoleInfoTree,
  getRuleInfoTree,
  addRoleInfo,
  getRoleInfo,
  putRoleInfo
} from '@/api/sys'
import treeSelect from '@/components/treeSelect'

export default {
  components: {
    treeSelect
  },
  props: {
    propHandleClick: {
      type: Function
    },
    edit: {
      default: 0
    },
    editRoleId: {
      default: null
    }
  },
  data() {
    return {
      proleId: '',
      sumbitLoading: false,
      fatherDisable: false,
      roleProps: {
        label: 'roleName',
        children: 'children',
        disabled: 'disabled'
      },
      form: {
        proleId: '',
        component: '',
        roleName: '',
        isHide: 0,
        roleCode: ''
      },

      formRules: {
        // proleId: [{ required: true, message: '请选择父级', trigger: 'change' }],
        // roleName: [
        //   { required: true, message: '请填写角色名称', trigger: 'blur' }
        // ],
        // roleCode: [{ required: true, message: '请填写Code', trigger: 'blur' }]
      },
      defaultProps: {
        children: 'children',
        label: 'ruleName'
      },
      options: {
        proleIdOptions: [],
        ruleOptions: []
      }
    }
  },
  mounted() {
    getRoleInfoTree().then(res => {
      this.options.proleIdOptions = res.result.list
    })

    if (this.edit == 1) {
      let roleId = this.editRoleId
      getRoleInfo({ roleId }).then(res => {
        this.form = res.result
        let { result } = res
        if (result.proleId == 0) {
          this.fatherDisable = true
        }
        let ruleIdList = result.ruleIdList ? result.ruleIdList.split(',') : []
        this.$refs.tree.setCheckedKeys(ruleIdList)
      })
    }
  },

  methods: {
    getPositionPageList: async function() {},

    handleClick(type) {
      switch (type) {
        case '确认':
          this.sumbitLoading = true
          this.$refs.form.validate(valid => {
            if (valid) {
              let obj = JSON.parse(JSON.stringify(this.form))
              obj.ruleIdList = this.$refs.tree.getCheckedKeys()

              if (this.edit == 1) {
                obj.roleId = this.editRoleId
                putRoleInfo(obj).then(res => {
                  if (res.code == 200) {
                    this.$message({
                      type: 'success',
                      message: '修改成功'
                    })
                    this.propHandleClick(type)
                  }
                })
              } else {
                addRoleInfo(obj).then(res => {
                  if (res.code == 200) {
                    this.$message({
                      type: 'success',
                      message: '新增成功'
                    })
                    this.propHandleClick(type)
                  }
                })
              }

              this.sumbitLoading = false
            } else {
              this.sumbitLoading = false
              return false
            }
          })

          break
        case '关闭':
          this.propHandleClick(type)
          break
      }
    },
    handleChange() {},
    handleAvatarSuccess(res, file) {
      this.form.headPortrait = res
    },
    beforeAvatarUpload(file) {
      let arr = ['image/bmp', 'image/jpeg', 'image/jpg', 'image/png']
      let a = arr.find(e => e === file.type)
      const isJPG = a !== undefined
      const isLt5M = file.size / 1024 / 1024 < 5

      if (!isJPG) {
        this.$message.error('上传图片格式不正确')
      }
      if (!isLt5M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isJPG && isLt5M
    }
  },
  watch: {
    form: {
      handler(newValue, oldValue) {
        let roleId = newValue.proleId
        let operationType = 'operationType'
        if (this.proleId !== roleId) {
          this.proleId = roleId
          getRuleInfoTree({ operationType, roleId }).then(res => {
            this.options.ruleOptions = res.result.list
          })
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mainWrap.scss';
#addEnvelope {
  .body {
  }
  .avatar-uploader {
    >>> .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover {
        border-color: #409eff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 128px;
        height: 128px;
        line-height: 128px;
        text-align: center;
      }
      .avatar {
        width: 128px;
        height: 128px;
        display: block;
      }
    }
  }
}
</style>