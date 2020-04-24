<template>
  <div class="dialogBody" id="addBrand">
    <div class="body">
      <el-form ref="form" :model="form" :rules="formRules" label-width="140px" size="small">
        <el-row>
          <!-- <el-col :span="24">
            <el-form-item label="应用id" prop="applicationId">
              <el-input v-model.number="form.applicationId" placeholder="请输入应用id"></el-input>
            </el-form-item>
          </el-col>-->

          <el-col :span="24">
            <el-form-item label="品牌名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入品牌名称" maxlength="50"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="说明" prop="remark">
              <el-input v-model="form.remark" placeholder="请输入说明,最大200个字符" maxlength="200"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="logo" prop="logoUrl">
              <div>格式要求：支持jpg/png/jpeg/bmp格式照片，大小不超过5m</div>
              <el-upload
                class="avatar-uploader"
                :action="upLoadImg"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                accept="image/bmp, image/jpeg, image/jpg, image/png"
              >
                <img v-if="form.logoUrl" :src="`${hostUrl}/${form.logoUrl}`" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="排序" prop="weight">
              <el-input-number v-model="form.weight" controls-position="right" placeholder="请输入排序"></el-input-number>
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
import { upLoadImg } from '@/api/member'
import { addBrandInfo, getBrandInfo, putBrandInfo } from '@/api/products'

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
        name: '',
        remark: '',
        state: 'NORMAL',
        logoUrl: '',
        weight: ''
      },
      formRules: {
        name: [{ required: true, message: '请填写名称', trigger: 'blur' }],
        weight: [{ required: true, message: '请填写权重', trigger: 'blur' }]
        // applicationUrl: [
        //   { required: true, message: '请上传logo', trigger: 'blur' }
        // ]
      },
      options: {
        appIdOptions: []
      }
    }
  },
  mounted() {
    if (this.edit == 1) {
      let brandId = this.editId
      getBrandInfo({ brandId }).then(res => {
        this.form = res.result
      })
    }
  },

  methods: {
    handleClick(type) {
      switch (type) {
        case '确认':
          this.sumbitLoading = true
          this.$refs.form.validate(valid => {
            if (valid) {
              let obj = JSON.parse(JSON.stringify(this.form))
              if (this.edit == 1) {
                obj.brandId = this.editId
                putBrandInfo(obj).then(res => {
                  if (res.code == 200) {
                    this.$message({
                      type: 'success',
                      message: '修改成功'
                    })
                    this.propHandleClick(type)
                  }
                })
              } else {
                addBrandInfo(obj).then(res => {
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
      this.form.logoUrl = url
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
#addBrand {
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