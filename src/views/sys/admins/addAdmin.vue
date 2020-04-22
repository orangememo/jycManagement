<template>
  <div class="dialogBody" id="addRole">
    <div class="body">
      <el-form ref="form" :model="form" :rules="formRules" label-width="100px" size="small">
        <el-row>
          <el-col :span="24">
            <el-form-item label="所属组别" prop="roleIdList">
              <treeSelect
                v-model="form.roleIdList"
                :data="options.proleIdOptions"
                placeholder="请选择组别"
                style="width:100%"
                node-key="roleId"
                :props="defaultProps"
                size="small"
                :multiple="true"
                :collapseTags="false"
                :optionDisables="optionDisables"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="账号" prop="accountNum">
              <el-input
                v-model.number="form.accountNum"
                :disabled="edit===1?true:false"
                placeholder="请输入账号,目前只支持手机号"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Email" prop="email">
              <el-input v-model="form.email" placeholder="请输入Email"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="昵称" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入昵称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="状态" prop="state">
              <el-radio-group v-model="form.state">
                <el-radio label="NORMAL">正常</el-radio>
                <el-radio label="FROZEN">隐藏</el-radio>
              </el-radio-group>
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
import { validEmail, validateMobile } from '@/utils/validate'
import { mapGetters, mapActions, mapState } from 'vuex'
import {
  roleInfoTreeAccountId,
  postManagerUserInfo,
  putManagerUserInfo,
  getManagerUserInfo,
  getParentRoleIdList
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
    editId: {
      default: null
    }
  },
  data() {
    return {
      sumbitLoading: false,
      form: {
        roleIdList: '',
        userName: '',
        email: '',
        nickName: '',
        accountNum: null,
        state: 'NORMAL'
      },

      formRules: {
        accountNum: [
          {
            required: true,
            message: '请输入手机号码',
            trigger: 'blur'
          },

          { validator: validateMobile, trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        roleIdList: [
          { required: true, message: '请选择组别', trigger: 'change' }
        ],
        email: [
          { required: true, message: '请输入Email', trigger: 'blur' },
          {
            validator: validEmail,
            message: '请输入正确的Email',
            trigger: 'blur'
          }
        ]
      },
      defaultProps: {
        children: 'children',
        label: 'roleName'
      },
      options: {
        fatherOptions: [],
        roleOptions: [],
        proleIdOptions: []
      },
      optionDisables: []
    }
  },
  created() {
    let parentRoleIdList = []
    getParentRoleIdList().then(res => {
      let { result } = res
      parentRoleIdList = result.selectList
      this.form.roleIdList = result.selectList
      this.optionDisables = result.unAbleList
      roleInfoTreeAccountId().then(res => {
        this.options.proleIdOptions = res.result.list
      })
      if (this.edit == 1) {
        let userInfoId = this.editId
        getManagerUserInfo({ userInfoId }).then(res => {
          let { result } = res

          let list = [...new Set([...result.roleIdList, ...parentRoleIdList])]
          result.roleIdList = list
          this.form = result
          console.log(
            this.form,
            'this.form',
            result.roleIdList,
            'result.roleIdList',
            parentRoleIdList,
            'parentRoleIdList'
          )
        })
      }
    })
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
              obj.source = 'PC'
              if (this.edit == 1) {
                obj.roleId = this.editId
                putManagerUserInfo(obj).then(res => {
                  if (res.code == 200) {
                    this.$message({
                      type: 'success',
                      message: '修改成功'
                    })
                    this.propHandleClick(type)
                  }
                })
              } else {
                postManagerUserInfo(obj).then(res => {
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
    handleChange() {}
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mainWrap.scss';
#addRole {
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
        width: 248px;
        height: 248px;
        line-height: 248px;
        text-align: center;
      }
      .avatar {
        width: 248px;
        height: 248px;
        display: block;
      }
    }
  }
}
</style>