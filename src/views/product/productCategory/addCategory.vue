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
            <el-form-item label="父级类目" prop="parentId">
              <el-select
                v-model="form.parentId"
                placeholder="请选择父级类目"
                filterable
                style="width:100%"
              >
                <el-option
                  v-for="item in options.catalogOptions"
                  :key="item.catalogId"
                  :label="item.name"
                  :value="item.catalogId"
                >
                  <span style="float: left">{{ item.name }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.depth }}级类目</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="图片" prop="imageUrl">
              <div>格式要求：支持jpg/png/jpeg/bmp格式照片，大小不超过5m</div>
              <el-upload
                class="avatar-uploader"
                :action="upLoadImg"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                accept="image/bmp, image/jpeg, image/jpg, image/png"
              >
                <img v-if="form.imageUrl" :src="`${hostUrl}/${form.imageUrl}`" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="权重" prop="weight">
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
import {
  addCatalogInfo,
  getCatalogInfo,
  putCatalogInfo,
  getCatalogList
} from '@/api/products'

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
        parentId: null,
        state: 'NORMAL',
        imageUrl: '',
        weight: ''
      },
      formRules: {
        name: [{ required: true, message: '请填写名称', trigger: 'blur' }],
        parentId: [
          { required: true, message: '请选择父级类目', trigger: 'blur' }
        ],
        weight: [{ required: true, message: '请填写权重', trigger: 'blur' }]
        // applicationUrl: [
        //   { required: true, message: '请上传logo', trigger: 'blur' }
        // ]
      },
      options: {
        catalogOptions: []
      }
    }
  },
  mounted() {
    getCatalogList({ state: 'NORMAL' }).then(res => {
      let { result } = res
      let options = {
        name: '顶级类目',
        catalogId: 0,
        depth: 0
      }
      result.unshift(options)
      this.options.catalogOptions = result
    })
    if (this.edit == 1) {
      let catalogId = this.editId
      getCatalogInfo({ catalogId }).then(res => {
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
                obj.catalogId = this.editId
                putCatalogInfo(obj).then(res => {
                  if (res.code == 200) {
                    this.$message({
                      type: 'success',
                      message: '修改成功'
                    })
                    this.propHandleClick(type)
                  }
                })
              } else {
                addCatalogInfo(obj).then(res => {
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
      this.form.imageUrl = url
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