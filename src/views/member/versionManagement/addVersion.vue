<template>
  <div class="dialogBody" id="addMember">
    <div class="body">
      <el-form ref="form" :model="form" :rules="formRules" label-width="140px" size="small">
        <el-row>
          <!-- <el-col :span="24">
            <el-form-item label="应用id" prop="applicationId">
              <el-input v-model.number="form.applicationId" placeholder="请输入应用id"></el-input>
            </el-form-item>
          </el-col>-->
          <el-col :span="24">
            <el-form-item label="应用" prop="applicationId">
              <el-select
                v-model="form.applicationId"
                placeholder="请选择应用"
                filterable
                style="width:100%"
              >
                <el-option
                  v-for="(item,index) in options.appIdOptions"
                  :key="index"
                  :label="item.applicationName"
                  :value="item.applicationId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="更新标题" prop="title">
              <el-input v-model="form.title" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="新版本号" prop="applicationVersion">
              <el-input v-model="form.applicationVersion" placeholder="请输入新版本号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="包名" prop="packageName">
              <el-input v-model="form.packageName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="包大小" prop="packageSize ">
              <el-input v-model="form.packageSize " placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="升级内容" prop="content">
              <el-input v-model="form.content" placeholder="请输入升级内容"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="图片" prop="applicationImage">
              <div>格式要求：支持jpg/png/jpeg/bmp格式照片，大小不超过5m</div>
              <el-upload
                class="avatar-uploader"
                :action="upLoadImg"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                accept="image/bmp, image/jpeg, image/jpg, image/png"
              >
                <img
                  v-if="form.applicationImage"
                  :src="`${hostUrl}/${form.applicationImage}`"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="下载地址" prop="applicationUrl">
              <el-input v-model="form.applicationUrl" placeholder="请输入下载地址"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="最低支持版本" prop="applicationMin">
              <el-input v-model="form.applicationMin" placeholder="请输入最低支持版本"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="状态" prop="state">
              <el-radio-group v-model="form.state">
                <el-radio label="NORMAL">正常</el-radio>
                <el-radio label="DELETE">隐藏</el-radio>
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
import treeSelect from '@/components/treeSelect'
import {
  addVersionInfo,
  getVersionInfo,
  putVersionInfo,
  upLoadImg,
  getApplication
} from '@/api/member'

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
      upLoadImg,
      sumbitLoading: false,
      form: {
        applicationId: '',
        applicationVersion: '',
        content: '',
        state: 'NORMAL',
        applicationUrl: '',
        applicationImage: '',
        applicationMin: '',
        packageName: '',
        packageSize: '',
        title: ''
      },
      formRules: {
        applicationId: [
          { required: true, message: '请填写应用id', trigger: 'blur' }
        ],
        applicationVersion: [
          { required: true, message: '请填写版本号', trigger: 'blur' }
        ],
        applicationUrl: [
          { required: true, message: '请输入下载地址', trigger: 'blur' }
        ],
        packageName: [{ required: true, message: '请输入', trigger: 'blur' }],
        packageSize: [{ required: true, message: '请输入', trigger: 'blur' }],
        title: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      options: {
        appIdOptions: []
      }
    }
  },
  mounted() {
    if (this.edit == 1) {
      let applicationVersionId = this.editId
      getVersionInfo({ applicationVersionId }).then(res => {
        this.form = res.result
      })
    }
    getApplication().then(res => {
      this.options.appIdOptions = res.result
    })
  },

  methods: {
    handleClick(type) {
      switch (type) {
        case '确认':
          this.sumbitLoading = true
          this.$refs.form.validate(valid => {
            if (valid) {
              let obj = JSON.parse(JSON.stringify(this.form))
              obj.byOperateApplicationId = obj.applicationId
              if (this.edit == 1) {
                obj.applicationVersionId = this.editId
                putVersionInfo(obj).then(res => {
                  if (res.code == 200) {
                    this.$message({
                      type: 'success',
                      message: '修改成功'
                    })
                    this.propHandleClick(type)
                  }
                })
              } else {
                addVersionInfo(obj).then(res => {
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
      let url = res.result
      if (url.indexOf('.com') > -1) {
        url = url.split('.com')[1]
      }
      this.form.applicationImage = url
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
  }
  // watch: {
  //   form: {
  //     handler(newValue, oldValue) {
  //       let roleId = newValue.proleId
  //       let operationType = 'operationType'
  //       if (this.proleId !== roleId) {
  //         this.proleId = roleId
  //         getRuleInfoTree({ operationType, roleId }).then(res => {
  //           this.options.ruleOptions = res.result.list
  //         })
  //       }
  //     },
  //     deep: true
  //   }
  // }
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