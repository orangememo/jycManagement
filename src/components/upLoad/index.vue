<template>
  <div id="upLoadFile">
    <el-upload
      list-type="picture-card"
      ref="upLoadFile"
      auto-upload
      :action="upLoadImg"
      accept="image/png, image/jpg, image/jpeg"
      :limit="limit"
      :before-upload="beforeAvatarUpload"
      :file-list="fileList"
      :on-success="uploads"
      :on-exceed="handleExceed"
      v-show="false"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <i slot="default" class="el-icon-plus"></i>
    </el-upload>
    <div class="addFile el-upload--picture-card" @click="handleClick">
      <i class="el-icon-plus"></i>
    </div>
  </div>
</template>

<script>
import { upLoadImg } from '@/api/member'

export default {
  props: {
    limit: {
      type: Number,
      default: 1
    },
    fileList: Array
  },
  data() {
    return {
      upLoadImg,
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    handleClick() {
      console.log(this.$refs, 'this.$refs')
      this.$refs.upLoadFile.click()
    },
    uploads(response) {
      let url = response.result
      if (url.indexOf('.com') > -1) {
        url = url.split('.com')[1]
      }
      this.$emit('uploadimg', url)
    },
    handleExceed() {
      this.$message.warning(`当前限制选择 ${this.limit}个文件`)
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isLt3M = file.size / 1024 / 1024 < 3
      if (!isLt3M) {
        this.$message.error('上传头像图片大小不能超过 3MB!')
      }
      return file
    }
  }
}
</script>

<style lang="scss" scoped>
#upLoadFile {
  .addFile {
  }
}
</style>