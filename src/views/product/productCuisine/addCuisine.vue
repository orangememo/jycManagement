<template>
  <div class="dialogBody" id="addCuisine">
    <div class="body">
      <el-form ref="form" :model="form" :rules="formRules" label-width="140px" size="small">
        <el-row>
          <el-col :span="24">
            <el-form-item label="菜系名称" prop="dishName">
              <el-input v-model="form.dishName" placeholder="请输入" maxlength="50"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="图标" prop="image">
              <div>格式要求：支持jpg/png/jpeg/bmp格式照片，大小不超过5m</div>
              <upLoad ref="Img" :getImgs="getImg" :toImgs="toImgs1" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="权重" prop="weigh">
              <el-input-number v-model="form.weigh" controls-position="right" placeholder="请输入排序"></el-input-number>
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
import { addDishType, getSpuInfo, putDishType } from '@/api/products'
import { mapState } from 'vuex'

export default {
  components: {
    upLoad
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
        dishName: '',
        image: [],
        weigh: ''
      },
      formRules: {
        dishName: [{ required: true, message: '请填写名称', trigger: 'blur' }],
        image: [{ required: true, message: '请选择图片', trigger: 'blur' }],
        weigh: [{ required: true, message: '请填写', trigger: 'blur' }]
      },
      options: {
        catalogOptions: [],
        brandOptions: [],
        supplierOptions: []
      },
      toImgs1: [],
      toImgs2: []
    }
  },
  mounted() {
    if (this.edit == 1) {
      let result = JSON.parse(JSON.stringify(this.editData))
      this.form = result
      if (result.image) {
        this.toImgs1 = [{ url: `${this.hostUrl}${result.image}` }]
      } else {
        this.toImgs1 = []
      }
    }
  },
  computed: {
    ...mapState('login', ['companyList', 'companyId'])
  },
  methods: {
    handleClick(type) {
      switch (type) {
        case '确认':
          this.sumbitLoading = true
          this.$refs.form.validate(valid => {
            if (valid) {
              let obj = JSON.parse(JSON.stringify(this.form))
              let company = this.companyList.find(
                item => item.companyId === this.companyId
              )
              let { companyName } = company
              obj = {
                ...obj,
                hotelId: this.companyId,
                image: obj.image.toString(),
                companyName
              }
              if (this.edit == 1) {
                obj.id = this.editId
                putDishType(obj).then(res => {
                  if (res.code == 200) {
                    this.$message({
                      type: 'success',
                      message: '修改成功'
                    })
                    this.propHandleClick(type)
                  }
                })
              } else {
                addDishType(obj).then(res => {
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
    getImgs(val) {
      this.form.image = val
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mainWrap.scss';
#addCuisine {
  .body {
  }
}
</style>