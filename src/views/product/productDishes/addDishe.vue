<template>
  <div class="dialogBody" id="addDishe">
    <div class="body">
      <el-form ref="form" :model="form" :rules="formRules" label-width="140px" size="small">
        <el-row>
          <el-col :span="24">
            <el-form-item label="spu名称" prop="spuName">
              <el-input v-model="form.spuName" placeholder="请输入" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="品牌" prop="brandName">
              <el-input v-model="form.brandName" placeholder="请输入" maxlength="50" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="类目" prop="catalogName">
              <el-input v-model="form.catalogName" placeholder="请输入" maxlength="50" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="供应商" prop="supplierId">
              <el-input v-model="form.supplierName" placeholder="请输入" maxlength="50" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="标题" prop="title">
              <el-input v-model="form.title" placeholder="请输入" maxlength="50"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="简介" prop="brief">
              <el-input
                v-model="form.brief"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 3 }"
                placeholder="请输入"
                maxlength="250"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="描述" prop="spuDescribe">
              <el-input
                v-model="form.spuDescribe"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 3 }"
                placeholder="请输入"
                maxlength="250"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="大图" prop="bitImage">
              <div>格式要求：支持jpg/png/jpeg/bmp格式照片，大小不超过5m</div>
              <upLoad ref="Img" :getImgs="getImg" :toImgs="toImgs1" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="图片组" prop="image">
              <div>格式要求：支持jpg/png/jpeg/bmp格式照片，大小不超过5m</div>
              <upLoad ref="Imgs" :getImgs="getImgs" :limit="5" :toImgs="toImgs2" />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="价格" prop="spuPrice">
              <el-input-number
                v-model="form.spuPrice"
                controls-position="right"
                placeholder="请输入价格"
              ></el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="是否上架" prop="upperShelf">
              <el-radio-group v-model="form.upperShelf">
                <el-radio label="YES">上架</el-radio>
                <el-radio label="NO">下架</el-radio>
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
import {
  addSkuInfo,
  getSpuInfo,
  putSpuInfo,
  getCatalogList,
  getBrandList,
  getSupplierInfoList
} from '@/api/products'

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
        spuName: '',
        brandName: '',
        catalogName: '',
        supplierName: '',
        title: '',
        brief: '',
        spuDescribe: '',
        state: 'NORMAL',
        bitImage: [],
        image: [],
        spuPrice: '',
        upperShelf: 'YES'
      },
      formRules: {},
      options: {
        catalogOptions: [],
        brandOptions: [],
        supplierOptions: []
      },
      toImgs1: [],
      toImgs2: []
    }
  },
  created() {
    if (this.edit == 1) {
      let spuId = this.editId
      getSpuInfo({ spuId }).then(res => {
        let { result } = res
        this.form = result
        if (result.bitImage) {
          this.toImgs1 = [{ url: `${this.hostUrl}${result.bitImage}` }]
        } else {
          this.toImgs1 = []
        }
        if (result.imageList) {
          result.image = result.imageList
          this.toImgs2 = result.imageList.map(i => {
            return {
              url: `${this.hostUrl}${i}`
            }
          })
        } else {
          this.toImgs2 = []
        }
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

              obj.bitImage = obj.bitImage.toString()
              obj.image = obj.image.toString()
              if (this.edit == 1) {
                obj.spuId = this.editId
                putSpuInfo(obj).then(res => {
                  if (res.code == 200) {
                    this.$message({
                      type: 'success',
                      message: '修改成功'
                    })
                    this.propHandleClick(type)
                  }
                })
              } else {
                addSkuInfo(obj).then(res => {
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
      this.form.bitImage = val
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