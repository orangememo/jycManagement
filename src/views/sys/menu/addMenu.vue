<template>
  <div class="dialogBody" id="addMenu">
    <div class="body">
      <el-form ref="form" :model="form" :rules="formRules" label-width="100px" size="small">
        <!-- <el-form-item label="创建时间">
                  <el-date-picker v-model="form.value1" type="date" placeholder="请选择开始日期"></el-date-picker>-
                  <el-date-picker v-model="form.value2" type="date" placeholder="请选择结束日期"></el-date-picker>
        </el-form-item>-->

        <el-row>
          <el-col :span="24">
            <el-form-item label="菜单" prop="ruleType">
              <el-radio-group v-model="form.ruleType">
                <el-radio label="MENU">是</el-radio>
                <el-radio label="BUTTON">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="父级" prop="pruleId">
              <treeSelect
                v-model="form.pruleId"
                :data="options.pruleIdOptions"
                placeholder="请选择父级"
                style="width:100%"
                node-key="ruleId"
                :props="defaultProps"
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Component" prop="component">
              <el-input v-model="form.component" placeholder="请输入Component"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="标题" prop="title">
              <el-input v-model="form.title" placeholder="请输入标题"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="图标" prop="icon">
              <el-input v-model="form.icon" placeholder="请输入图标"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="权重" prop="weight">
              <el-input v-model.number="form.weight" placeholder="请输入权重"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="路由地址" prop="requestUrl">
              <el-input v-model="form.requestUrl" placeholder="前端路由地址,一级菜单加/如：/url,二级及以下不加如：url"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remarks">
              <el-input
                v-model="form.remarks"
                placeholder="请输入内容"
                type="textarea"
                :autosize="{ minRows: 2, maxRows:3 }"
                maxlength="500"
                show-word-limit
              ></el-input>
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
  addRuleInfo,
  getRuleInfoTree,
  getRuleInfo,
  putRuleInfo
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
    editRuleId: {
      default: null
    }
  },
  data() {
    return {
      defaultProps: {
        label: 'ruleName',
        children: 'children',
        disabled: 'disabled'
      },
      sumbitLoading: false,
      form: {
        ruleType: 'MENU',
        pruleId: '',
        component: '',
        title: '',
        icon: '',
        weight: '',
        requestUrl: '',
        remarks: '',
        isHide: 0
      },

      formRules: {
        ruleType: [{ required: true, message: '请选择菜单', trigger: 'blur' }],
        weight: [{ required: true, message: '请输入权重', trigger: 'blur' }],
        pruleId: [{ required: true, message: '请选择父级', trigger: 'change' }],
        component: [
          { required: true, message: '请选择component', trigger: 'blur' }
        ],
        title: [{ required: true, message: '请填写标题', trigger: 'blur' }],
        requestUrl: [
          { required: true, message: '填写路由地址', trigger: 'blur' }
        ]
      },
      options: {
        pruleIdOptions: []
      }
    }
  },
  mounted() {
    this.getRuleOptions()
    if (this.edit == 1) {
      this.getRule(this.editRuleId)
    }
  },
  methods: {
    getRuleOptions: async function() {
      let operationType = ''
      let res = await getRuleInfoTree({ operationType })
      let obj = {
        ruleId: 0,
        ruleName: '无'
      }
      if (res.result.list.length == 0) {
        this.options.pruleIdOptions.push(obj)
      } else {
        this.options.pruleIdOptions = res.result.list
        this.options.pruleIdOptions.unshift(obj)
      }
    },
    getRule: async function(ruleId) {
      let res = await getRuleInfo({ ruleId })
      let form = res.result
      form.component = form.ruleCode
      form.title = form.ruleName
      this.form = form
    },
    handleClick(type) {
      switch (type) {
        case '确认':
          this.sumbitLoading = true
          this.$refs.form.validate(valid => {
            if (valid) {
              let obj = JSON.parse(JSON.stringify(this.form))
              obj.ruleCode = obj.component
              obj.ruleName = obj.title
              if (this.edit == 1) {
                obj.ruleId = this.editRuleId
                putRuleInfo(obj)
                  .then(res => {
                    if (res.code == 200) {
                      this.propHandleClick(type)
                      this.$message({
                        type: 'success',
                        message: '修改成功'
                      })
                    }
                    this.sumbitLoading = false
                  })
                  .catch(error => {
                    this.sumbitLoading = false
                  })
              } else {
                addRuleInfo(obj)
                  .then(res => {
                    if (res.code == 200) {
                      this.propHandleClick(type)
                      this.$message({
                        type: 'success',
                        message: '新增成功'
                      })
                    }
                    this.sumbitLoading = false
                  })
                  .catch(error => {
                    this.sumbitLoading = false
                  })
              }
              this.propHandleClick(type)
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mainWrap.scss';
#addMenu {
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