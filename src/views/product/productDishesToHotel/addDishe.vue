<template>
  <div class="dialogBody" id="addDishe">
    <div class="body">
      <el-form ref="form" :model="form" :rules="formRules" label-width="140px" size="small">
        <el-row>
          <el-col :span="24">
            <el-form-item label="菜品名称" prop="dishDetailsName">
              <el-input v-model="form.dishDetailsName" placeholder="请输入" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="菜系" prop="dishTypeId">
              <el-select v-model="form.dishTypeId" placeholder="请选择" style="width:100%" filterable>
                <el-option
                  v-for="item in options.dishTypeOptions"
                  :key="item.id"
                  :label="item.dishName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="详细内容" prop="detailscontent">
              <el-input
                v-model="form.detailscontent"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 3 }"
                placeholder="请输入"
                maxlength="250"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="说明" prop="explainContent">
              <el-input
                v-model="form.explainContent"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 3 }"
                placeholder="请输入"
                maxlength="250"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="大图" prop="images">
              <div>格式要求：支持jpg/png/jpeg/bmp格式照片，大小不超过5m</div>
              <upLoad ref="Img" :getImgs="getImg" :toImgs="toImgs1" />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="价格" prop="money">
              <el-input-number v-model="form.money" controls-position="right" placeholder="请输入价格"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="权重" prop="weigh">
              <el-input-number v-model="form.weigh" controls-position="right" placeholder="请输入排序"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="是否售空" prop="bool">
              <el-radio-group v-model="form.bool">
                <el-radio label="1">有货</el-radio>
                <el-radio label="0">售空</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="状态" prop="hotelStatus">
              <el-radio-group v-model="form.hotelStatus">
                <el-radio label="1">上架</el-radio>
                <el-radio label="0">下架</el-radio>
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
import {
  addDishDetails,
  getDishTypeDetails,
  putDishTypeDetails,
  getDishTypeList
} from '@/api/products'
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
    }
  },
  data() {
    return {
      sumbitLoading: false,
      form: {
        dishDetailsName: '',
        dishTypeId: '',
        weigh: 0,
        detailscontent: '',
        explainContent: '',
        hotelStatus: '1',
        images: [],
        money: '',
        bool: '1'
      },
      formRules: {
        dishDetailsName: [
          { required: true, message: '请填写', trigger: 'blur' }
        ],
        images: [{ required: true, message: '请选择', trigger: 'change' }],
        dishTypeId: [{ required: true, message: '请选择', trigger: 'change' }],
        weigh: [{ required: true, message: '请填写', trigger: 'blur' }],
        money: [{ required: true, message: '请填写', trigger: 'blur' }],
        hotelStatus: [{ required: true, message: '请填写', trigger: 'change' }],
        bool: [{ required: true, message: '请填写', trigger: 'change' }]
      },
      options: {
        dishTypeOptions: []
      },
      toImgs1: [],
      toImgs2: []
    }
  },
  created() {
    let cmpId = this.companyId
    getDishTypeList({ cmpId }).then(res => {
      this.options.dishTypeOptions = res.result
    })
    if (this.edit == 1) {
      let dishTypeId = this.editId
      getDishTypeDetails({ dishTypeId }).then(res => {
        let { result } = res
        this.form = result
        if (result.images) {
          this.toImgs1 = [{ url: `${this.hostUrl}${result.images}` }]
        } else {
          this.toImgs1 = []
        }
      })
    }
  },
  computed: {
    ...mapState('login', ['companyId'])
  },

  methods: {
    handleClick(type) {
      switch (type) {
        case '确认':
          this.sumbitLoading = true
          this.$refs.form.validate(valid => {
            if (valid) {
              let obj = JSON.parse(JSON.stringify(this.form))
              obj.images = obj.images.toString()
              if (this.edit == 1) {
                obj.id = this.editId
                putDishTypeDetails(obj).then(res => {
                  if (res.code == 200) {
                    this.$message({
                      type: 'success',
                      message: '修改成功'
                    })
                    this.propHandleClick(type)
                  }
                })
              } else {
                addDishDetails(obj).then(res => {
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
      this.form.images = val
    },
    getImgs(val) {
      this.form.image = val
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mainWrap.scss';
#addDishe {
  .body {
  }
}
</style>