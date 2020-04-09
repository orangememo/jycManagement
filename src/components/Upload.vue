<template>
<div>
  <el-upload
    list-type="picture-card"
    auto-upload
    action="http://49.234.12.49/lp/lp/lpVuser/edits"
    accept="image/png, image/jpg, image/jpeg"
    :limit="limit"
    :before-upload="beforeAvatarUpload"
    :file-list="fileList"
    :on-success="uploads"
    :on-exceed="handleExceed"
  >
    <i slot="default" class="el-icon-plus"></i>
    <!-- <div slot="file" slot-scope="{file}">
      <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
    </div> -->
  </el-upload>
  
</div>
  
  
</template>

<script>
export default {
  props: {
    limit: {
      type: Number,
      default: 1
    },
    fileList: Array
  },
  data(){
    return {
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    uploads(response) {
      this.$emit("uploadimg", response.result);
    },
    handleExceed() {
      this.$message.warning(`当前限制选择 ${this.limit}个文件`);
    },
    beforeAvatarUpload(file) {
      console.log(file);
      const isLt3M = file.size / 1024 / 1024 < 3;
      if (!isLt3M) {
        this.$message.error("上传头像图片大小不能超过 3MB!");
      }
      return file;
    }
  }
};
</script>

<style>
</style>