<template>
  <div id="upLoadFile">
    <el-upload
      :action="upLoadImg"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove.sync="handleRemove"
      :class="{hide:hideUpload}"
      :on-change="changeImg"
      :accept="accept"
      :limit="limit"
      multiple
      :before-upload="beforeAvatarUpload"
      :file-list="fileList"
      :on-success="uploads"
      :on-exceed="handleExceed"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <div class="dialog">
      <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false" :append-to-body="true">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { upLoadImg } from '@/api/member'

export default {
  props: {
    limit: {
      // 上传图片张数限定
      type: Number,
      default: 1
    },
    accept: {
      // 文件类型
      default: 'image/png, image/jpg, image/jpeg'
    },
    toImgs: {
      // 默认图片
      default: () => []
    },
    upLoadImg: {
      // 上传地址
      default: upLoadImg
    },
    max: {
      default: 5
    },
    getImgs: {
      type: Function
    }
  },
  data() {
    return {
      hideUpload: false,
      fileList: [], //必须是对象{url:'xxxx"这样的格式}
      dialogImageUrl: '',
      submitArr: [], //父组件拿的数据
      dialogVisible: false
    }
  },
  mounted() {},
  methods: {
    handleRemove(file, fileList) {
      this.fileList = fileList
      this.submitData()
      setTimeout(() => {
        this.changeHide(fileList.length)
      }, 500)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    uploads(response, file, fileList) {
      this.fileList = fileList
      this.submitData()
    },
    submitData() {
      let arr = []
      let url
      this.fileList.forEach(item => {
        if (item.response) {
          url = item.response.result
          if (url.indexOf('.com') > -1) {
            url = url.split('.com')[1]
          }
        } else {
          url = item.url
          if (url.indexOf('.com') > -1) {
            url = url.split('.com')[1]
          }
        }
        arr.push(url)
      })
      this.submitArr = arr
      this.getImgs(arr)
    },
    handleExceed() {
      this.$message.warning(`当前限制选择 ${this.limit}个文件`)
    },

    beforeAvatarUpload(file) {
      const isLt3M = file.size / 1024 / 1024 < this.max
      if (!isLt3M) {
        this.$message.error(`上传图片大小不能超过 ${this.max}MB!`)
      }
      return file
    },
    changeHide(length) {
      if (this.limit > length) {
        this.hideUpload = false
      } else {
        this.hideUpload = true
      }
    },
    changeImg(file, fileList) {
      this.changeHide(fileList.length)
    }
  },
  watch: {
    toImgs(newValue, oldValue) {
      this.fileList = this.toImgs
      this.changeHide(this.fileList.length)
    }
  }
}
</script>

<style lang="scss" scoped>
#upLoadFile {
  .hide {
    >>> .el-upload--picture-card {
      display: none;
    }
  }
}
</style>