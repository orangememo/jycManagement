<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="upLoadImg"
      accept=".mp4, .qlv, .qsv, .ogg, .flv, .avi, .wmv, .rmvb"
      :data="paramsdata"
      :show-file-list="false"
      :before-upload="beforeUploadVideo"
      :on-success="handleVideoSuccess"
      :on-progress="uploadVideoProcess"
    >
      <video
        v-if="Video !='' && videoFlag == false"
        :src="Video"
        width="350"
        height="180"
        controls="controls"
      >您的浏览器不支持视频播放</video>
      <i v-else-if="Video =='' && videoFlag == false" class="el-icon-plus avatar-uploader-icon"></i>
      <el-progress
        v-if="videoFlag == true"
        type="circle"
        :percentage="videoUploadPercent"
        style="margin-top:30px"
      ></el-progress>
    </el-upload>
  </div>
</template>

<script>
import { upLoadImg } from '@/api/member'
export default {
  props: {
    size: {
      default: 20
    }
  },

  data() {
    return {
      upLoadImg,
      Video: '',
      videoFlag: false, //刚开始的时候显示为flase
      videoUploadPercent: '0%', //进度条刚开始的时候为0%
      paramsdata: {
        参数: '参数值' //添加其他参数
      }
    }
  },
  methods: {
    beforeUploadVideo(file) {
      //视频上传之前判断他的大小
      const isLt10M = file.size / 1024 / 1024 < this.size
      if (!isLt10M) {
        this.$message.error('上传视频大小不能超过2000MB哦!')
        return false
      }
    },
    uploadVideoProcess(event, file, fileList) {
      //视频上传的时候获取上传进度传给进度条
      this.videoFlag = true
      this.videoUploadPercent = parseInt(file.percentage)
      //   console.log(this.videoUploadPercent)
    },
    handleVideoSuccess(res, file) {
      //视频上传成功之后返回视频地址
      this.videoFlag = false
      this.videoUploadPercent = 0
      console.log(res)
      this.Video = res.result
      //   if (item.response) {
      //       url = item.response.result
      //       if (url.indexOf('.com') > -1) {
      //         url = url.split('.com')[1]
      //       }
      //     } else {
      //       url = item.url
      //       if (url.indexOf('.com') > -1) {
      //         url = url.split('.com')[1]
      //       }
      //     }
      //   this.videoToUrl=res.result.
    }
  }
}
</script>

<style lang="scss" scoped>
</style>