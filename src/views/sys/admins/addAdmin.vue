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
            <el-form-item label="所属组别" prop="proleId">
              <!-- <el-input v-model="form.proleId" placeholder="请输入项目名称"></el-input> -->
              <treeSelect
                v-model="form.proleId"
                :data="options.proleIdOptions"
                placeholder="请选择组别"
                style="width:100%"
                node-key="roleId"
                :props="defaultProps"
                size="small"
                :multiple="true"
                :collapseTags="false"
              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="用户名" prop="title">
              <el-input v-model="form.title" placeholder="请输入用户名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Email" prop="ti1tle">
              <el-input v-model="form.ti1tle" placeholder="请输入Email"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="昵称" prop="ti1tl1e">
              <el-input v-model="form.ti1tl1e" placeholder="请输入昵称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="密码" prop="ti1t1le">
              <el-input v-model="form.ti1t1le" placeholder="请输入密码"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="状态" prop="res1ource">
              <el-radio-group v-model="form.res1ource">
                <el-radio :label="1">正常</el-radio>
                <el-radio :label="0">隐藏</el-radio>
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
import { validEmail } from '@/utils/validate'
import { mapGetters, mapActions, mapState } from 'vuex'
import { getRoleInfoTree } from '@/api/sys'
import treeSelect from '@/components/treeSelect'

export default {
  components: {
    treeSelect
  },
  props: {
    propHandleClick: {
      type: Function
    }
  },
  data() {
    return {
      sumbitLoading: false,
      form: {
        proleId: '',
        title: '',
        ti1tle: '',
        ti1t1le: '',
        ti1tl1e: '',
        res1ource: 0
      },

      formRules: {
        title: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        proleId: [{ required: true, message: '请选择组别', trigger: 'change' }],
        ti1tle: [
          { required: true, message: '请输入Email', trigger: 'blur' },
          {
            validator: validEmail,
            message: '请输入正确的Email',
            trigger: 'blur'
          }
        ],
        ti1t1le: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        ti1tl1e: [{ required: true, message: '请输入昵称', trigger: 'blur' }]
      },
      defaultProps: {
        children: 'children',
        label: 'roleName'
      },
      options: {
        fatherOptions: [],
        roleOptions: []
      }
    }
  },
  mounted() {
    getRoleInfoTree().then(res => {
      this.options.proleIdOptions = res.result.list
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
              console.log('提交了')
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