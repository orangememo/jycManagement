<template>
  <div class="dialogBody" id="addCVIdeo">
    <div class="body">
      <el-form ref="form" :model="form" :rules="formRules" label-width="140px" size="small">
        <el-row>
          <el-col :span="24">
            <el-form-item label="所属公司" prop="hotelId">
              <el-select v-model="form.hotelId" placeholder="请选择" filterable style="width:100%">
                <el-option
                  v-for="item in options.hotelIdOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="应用" prop="selectApplicationId">
              <el-select v-model="form.selectApplicationId" placeholder="请选择应用" style="width:100%">
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
            <el-form-item label="名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="图片" prop="image">
              <div>格式要求：支持jpg/png/jpeg/bmp格式照片，大小不超过5m</div>
              <upLoad ref="Img" :getImgs="getImg" :toImgs="toImgs1" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="视频" prop="video">
              <div>格式要求：支持mp4/qlv/qsv/ogg/flv/avi/wmv/rmvb格式视频</div>
              <upVideo ref="video" :getImgs="getImg2" :videoData="toVideo" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="描述" prop="describe">
              <el-input v-model="form.describe" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="权重" prop="weigh">
              <el-input-number v-model="form.weigh" placeholder="请输入权重" controls-position="right"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="是否推荐视频" prop="type">
              <el-radio-group v-model="form.type">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
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
import upLoad from '@/components/upLoad/index'
import upVideo from '@/components/upVideo'
import Tinymce from '@/components/Tinymce'
import { getApplicationList, putVideoInfo, addVideoInfo } from '@/api/member'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    upLoad,
    upVideo,
    Tinymce
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
    },
    editData: {
      default: () => {}
    }
  },
  data() {
    return {
      sumbitLoading: false,
      form: {
        hotelId: '',
        selectApplicationId: '',
        content: '',
        state: 'NORMAL',
        name: '',
        image: '',
        video: '',
        weigh: 0,
        describe: '',
        type: 0
      },
      formRules: {
        hotelId: [{ required: true, message: '请选择', trigger: 'blur' }],
        selectApplicationId: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        image: [{ required: true, message: '请上传', trigger: 'blur' }],
        video: [{ required: true, message: '请上传', trigger: 'blur' }],
        describe: [{ required: true, message: '请填写', trigger: 'blur' }],
        name: [{ required: true, message: '请填写', trigger: 'blur' }],
        state: [{ required: true, message: '请选择', trigger: 'blur' }],
        weigh: [{ required: true, message: '请填写', trigger: 'blur' }]
      },
      options: {
        appIdOptions: [],
        hotelIdOptions: []
      },
      toImgs1: [],
      toVideo: ''
    }
  },
  mounted() {
    this.options.hotelIdOptions = this.companyListToSelect
    getApplicationList().then(res => {
      this.options.appIdOptions = res.result
    })
    if (this.edit == 1) {
      let result = JSON.parse(JSON.stringify(this.editData))
      result.selectApplicationId = result.applicationId
      this.form = result
      if (result.image) {
        this.toImgs1 = [{ url: `${this.hostUrl}${result.image}` }]
      } else {
        this.toImgs1 = []
      }
      if (result.video) {
        this.toVideo = `${this.hostUrl}${result.video}`
      } else {
        this.toVideo = ''
      }
    }
  },
  computed: {
    ...mapState('login', ['companyId']),
    ...mapGetters(['companyListToSelect'])
  },
  methods: {
    handleClick(type) {
      switch (type) {
        case '确认':
          this.sumbitLoading = true
          this.$refs.form.validate(valid => {
            if (valid) {
              let obj = JSON.parse(JSON.stringify(this.form))
              obj.image = obj.image.toString()
              if (this.edit == 1) {
                putVideoInfo(obj).then(res => {
                  if (res.code == 200) {
                    this.$message({
                      type: 'success',
                      message: '修改成功'
                    })
                    this.propHandleClick(type)
                  }
                })
              } else {
                addVideoInfo(obj).then(res => {
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
    getImg(val) {
      this.form.image = val
    },
    getImg2(val) {
      this.form.video = val
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
#addCVIdeo {
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