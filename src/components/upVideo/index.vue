<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="upLoadVideo"
      accept=".mp4, .qlv, .qsv, .ogg, .flv, .avi, .wmv, .rmvb"
      :headers="headers"
      :data="paramsdata"
      :show-file-list="false"
      :before-upload="beforeUploadVideo"
      :on-success="handleVideoSuccess"
      :on-remove.sync="handleRemove"
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
import { upLoadVideo } from '@/api/member'
import { getToken } from '@/utils/auth'

export default {
  props: {
    size: {
      default: 2000
    },
    videoData: {
      default: ''
    },
    getImgs: {}
  },

  data() {
    return {
      upLoadVideo,
      Video: '',
      videoFlag: false, //刚开始的时候显示为flase
      videoUploadPercent: '0%', //进度条刚开始的时候为0%
      paramsdata: {
        //添加其他参数
      },
      headers: { 'X-Access-Token': getToken() }
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
    beforeUploadVideo(file) {
      //视频上传之前判断他的大小
      const isLt10M = file.size / 1024 / 1024 < this.size
      if (!isLt10M) {
        this.$message.error(`上传视频大小不能超过${this.size}MB哦!`)
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
      this.Video = res.result
      console.log(res, 'res')
      let url
      if (res.result) {
        url = res.result
        if (url.indexOf('.com') > -1) {
          url = url.split('.com')[1]
        }
      } else {
        url = res.url
        if (url.indexOf('.com') > -1) {
          url = url.split('.com')[1]
        }
      }
      this.getImgs(url)
    }
  },
  watch: {
    videoData(newValue, oldValue) {
      this.Video = this.videoData
      console.log(this.videoData, this.Video)
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader-icon {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 148px;
  height: 148px;
  line-height: 146px;
  vertical-align: top;
  font-size: 28px;
  color: #8c939d;
}
</style>