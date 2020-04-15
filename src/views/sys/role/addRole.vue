<template>
  <div class="dialogBody" id="addRole">
    <div class="body">
      <el-form ref="form" :model="form" :rules="formRules" label-width="100px" size="small">
        <!-- <el-form-item label="创建时间">
                  <el-date-picker v-model="form.value1" type="date" placeholder="请选择开始日期"></el-date-picker>-
                  <el-date-picker v-model="form.value2" type="date" placeholder="请选择结束日期"></el-date-picker>
        </el-form-item>-->

        <el-row>
          <el-col :span="24">
            <el-form-item label="父级" prop="proleId">
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
            <el-form-item label="名称" prop="roleName">
              <el-input v-model="form.roleName" placeholder="请输入名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Code" prop="roleCode">
              <el-input v-model="form.roleCode" placeholder="请输入Code,和其他角色Code不同的英文字符串"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="权限" prop="empl1o1y1e1e1">
              <el-tree
                :data="options.ruleOptions"
                show-checkbox
                node-key="ruleId"
                ref="tree"
                highlight-current
                :props="defaultProps"
              ></el-tree>
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
        let ruleIdList = result.ruleIdList
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
              obj.ruleIdList = this.$refs.tree
                .getCheckedKeys()
                .concat(this.$refs.tree.getHalfCheckedKeys())
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
    handleChange() {}
  },
  watch: {
    form: {
      handler(newValue, oldValue) {
        let roleId = newValue.proleId
        let operationType = 'selectList'
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