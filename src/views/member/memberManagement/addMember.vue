<template>
  <div class="dialogBody" id="addMember">
    <div class="body">
      <el-form ref="form" :model="form" :rules="formRules" label-width="140px" size="small">
        <!-- <el-form-item label="创建时间">
                  <el-date-picker v-model="form.value1" type="date" placeholder="请选择开始日期"></el-date-picker>-
                  <el-date-picker v-model="form.value2" type="date" placeholder="请选择结束日期"></el-date-picker>
        </el-form-item>-->

        <el-row>
          <el-col :span="24">
            <el-form-item label="角色组" prop="proleId">
              <treeSelect
                v-model="form.proleId"
                :data="options.proleIdOptions"
                placeholder="请选择父级"
                style="width:100%"
                node-key="roleId"
                :props="roleProps"
                size="small"
                :disabled="fatherDisable"
              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="用户名" prop="roleName">
              <el-input v-model="form.roleName" placeholder="请输入名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="昵称" prop="roleName">
              <el-input v-model="form.roleName" placeholder="请输入名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="密码" prop="roleName">
              <el-input v-model="form.roleName" placeholder="请输入名称"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="24">
            <el-form-item label="用户名" prop="title">
              <el-input v-model="form.title" placeholder="请输入用户名"></el-input>
            </el-form-item>
          </el-col>-->
          <el-col :span="24">
            <el-form-item label="Email" prop="ti1tle">
              <el-input v-model="form.ti1tle" placeholder="请输入Email"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="手机号" prop="ti1t1le">
              <el-input v-model.number="form.ti1t1le" placeholder="请输入密码"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="24">
            <el-form-item label="Code" prop="roleCode">
              <el-input v-model="form.roleCode" placeholder="请输入Code,和其他角色Code不同的英文字符串"></el-input>
            </el-form-item>
          </el-col>-->

          <el-col :span="24">
            <el-form-item label="头像" prop="headPortrait">
              <div>格式要求：支持jpg/png/jpeg/bmp格式照片，大小不超过5m</div>
              <el-upload
                class="avatar-uploader"
                :action="upLoadImg"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                accept="image/bmp, image/jpeg, image/jpg, image/png"
              >
                <img v-if="form.headPortrait" :src="form.headPortrait" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="等级" prop="roleCode">
              <el-input-number v-model="form.roleCode" controls-position="right"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="性别" prop="isHide">
              <el-radio-group v-model="form.isHide">
                <el-radio :label="0">男</el-radio>
                <el-radio :label="1">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="生日" prop="roleCode">
              <el-date-picker v-model="form.roleCode" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="格言" prop="roleCode">
              <el-input v-model="form.roleCode" placeholder="这个用户很懒，什么也没有写！"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="余额" prop="roleCode">
              <el-input-number v-model="form.roleCode" controls-position="right"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="积分" prop="roleCode">
              <el-input-number v-model="form.roleCode" controls-position="right"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="连续登录天数" prop="roleCode">
              <el-input-number v-model="form.roleCode" controls-position="right"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="最大连续登录天数" prop="roleCode">
              <el-input-number v-model="form.roleCode" controls-position="right"></el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="上次登录时间" prop="roleCode">
              <el-date-picker v-model="form.roleCode" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="登录时间" prop="roleCode">
              <el-date-picker v-model="form.roleCode" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="登录ip" prop="roleCode">
              <el-input v-model="form.roleCode" placeholder="选择日期"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="失败次数" prop="roleCode">
              <el-input-number v-model="form.roleCode" controls-position="right"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="加入ip" prop="roleCode">
              <el-input v-model="form.roleCode" placeholder="选择日期"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="加入时间" prop="roleCode">
              <el-date-picker v-model="form.roleCode" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="状态" prop="isHide">
              <el-radio-group v-model="form.isHide">
                <el-radio :label="0">正常</el-radio>
                <el-radio :label="1">隐藏</el-radio>
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
        proleId: [{ required: true, message: '请选择父级', trigger: 'change' }],
        roleName: [
          { required: true, message: '请填写角色名称', trigger: 'blur' }
        ],
        roleCode: [{ required: true, message: '请填写Code', trigger: 'blur' }]
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
    let operationType = 'selectList'
    getRoleInfoTree({ operationType }).then(res => {
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
#addMember {
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