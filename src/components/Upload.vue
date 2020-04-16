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
    :on-remove="handleRemove"
    :show-file-list="showFileList"
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
    limit: Number,
    fileList: Array,
    showFileList: {
      type: Boolean,
      default: true
    }
  },
  data(){
    return {
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    uploads(response) {
      let url = response.result;
      if(url.indexOf(".com") > -1){
         url = url.split(".com")[1]
      }
       this.$emit("uploadimg", url);
    },
    handleExceed() {
      this.$message.warning(`当前限制选择 ${this.limit}个文件`);
    },
    handleRemove(file, fileList){
      this.$emit("removeimg", file, fileList);
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