<template>
  <div class="dialogBody" id="addSKU">
    <div class="body">
      <el-form ref="form" :model="form" :rules="formRules" label-width="140px" size="small">
        <el-row>
          <el-col :span="24">
            <el-form-item label="sku名称" prop="skuName">
              <el-input v-model="form.skuName" placeholder="请输入" maxlength="50" :disabled="edit==1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="品牌" prop="brandId">
              <el-select
                v-model="form.brandId"
                placeholder="请选择"
                style="width:100%"
                :disabled="edit==1"
              >
                <el-option
                  v-for="item in options.brandOptions"
                  :key="item.brandId"
                  :label="item.name"
                  :value="item.brandId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="类目" prop="catalogId">
              <el-select
                v-model="form.catalogId"
                placeholder="请选择"
                filterable
                style="width:100%"
                :disabled="edit==1"
              >
                <el-option
                  v-for="item in options.catalogOptions"
                  :key="item.catalogId"
                  :label="item.name"
                  :value="item.catalogId"
                >
                  <span style="float: left">{{ item.name }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.depth }}级类目</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="24">
            <el-form-item label="供应商" prop="supplierId">
              <el-select
                v-model="form.supplierId"
                placeholder="请选择"
                filterable
                style="width:100%"
                :disabled="edit==1"
              >
                <el-option
                  v-for="item in options.supplierOptions"
                  :key="item.companyId"
                  :label="item.companyName"
                  :value="item.companyId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>-->
          <el-col :span="24">
            <el-form-item label="商品描述" prop="describe">
              <el-input
                v-model="form.describe"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 3 }"
                placeholder="请输入"
                maxlength="50"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="缩略图" prop="abbreviateImg">
              <div>格式要求：支持jpg/png/jpeg/bmp格式照片，大小不超过5m</div>
              <upLoad ref="Img" :getImgs="getImg" :toImgs="toImgs1" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="商品图片" prop="images">
              <div>格式要求：支持jpg/png/jpeg/bmp格式照片，大小不超过5m</div>
              <upLoad ref="Imgs" :getImgs="getImgs" :limit="5" :toImgs="toImgs2" />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="市场价" prop="marketPrice">
              <el-input-number
                v-model="form.marketPrice"
                controls-position="right"
                placeholder="请输入排序"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="出售标准价" prop="price">
              <el-input-number v-model="form.price" controls-position="right" placeholder="请输入排序"></el-input-number>
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
  getSkuInfo,
  putSkuInfo,
  getCatalogList,
  getBrandList
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
        skuName: '',
        brandId: null,
        supplierId: '',
        catalogId: '',
        state: 'NORMAL',
        abbreviateImg: [],
        price: '',
        describe: '',
        images: [],
        marketPrice: '',
        upperShelf: 'NO'
      },
      formRules: {
        skuName: [{ required: true, message: '请填写名称', trigger: 'blur' }],
        supplierId: [
          { required: true, message: '请选择供应商', trigger: 'blur' }
        ],
        marketPrice: [
          { required: true, message: '请填写价格', trigger: 'blur' }
        ],
        describe: [{ required: true, message: '请填写描述', trigger: 'blur' }],
        brandId: [{ required: true, message: '请选择品牌', trigger: 'blur' }],
        catalogId: [{ required: true, message: '请选择类目', trigger: 'blur' }],
        abbreviateImg: [
          { required: true, message: '请上传缩略图', trigger: 'change' }
        ],
        images: [{ required: true, message: '请上传图片', trigger: 'change' }],
        price: [{ required: true, message: '请填写价格', trigger: 'blur' }],
        state: [{ required: true, message: '请选择', trigger: 'change' }],
        upperShelf: [{ required: true, message: '请选择', trigger: 'change' }]
        // applicationUrl: [
        //   { required: true, message: '请上传logo', trigger: 'blur' }
        // ]
      },
      options: {
        catalogOptions: [],
        brandOptions: []
        // supplierOptions: []
      },
      toImgs1: [],
      toImgs2: []
    }
  },
  created() {
    getCatalogList({ state: 'NORMAL' }).then(res => {
      let { result } = res
      this.options.catalogOptions = result
    })
    getBrandList({ state: 'NORMAL' }).then(res => {
      let { result } = res
      this.options.brandOptions = result
    })
    // getSupplierInfoList().then(res => {
    //   this.options.supplierOptions = res.result
    // })
    if (this.edit == 1) {
      let skuId = this.editId
      getSkuInfo({ skuId }).then(res => {
        let { result } = res
        this.form = result
        if (result.abbreviateImg) {
          this.toImgs1 = [{ url: `${this.hostUrl}${result.abbreviateImg}` }]
        } else {
          this.toImgs1 = []
        }
        result.images = result.imagesList
        this.toImgs2 = result.imagesList.map(i => {
          return {
            url: `${this.hostUrl}${i}`
          }
        })
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
              obj.abbreviateImg = obj.abbreviateImg.toString()
              obj.images = obj.images.toString()
              // obj.supplierName = this.options.supplierOptions.find(
              //   e => e.companyId === obj.supplierId
              // ).companyName

              if (this.edit == 1) {
                obj.skuId = this.editId
                putSkuInfo(obj).then(res => {
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
      this.form.abbreviateImg = val
    },
    getImgs(val) {
      this.form.images = val
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mainWrap.scss';
#addSKU {
  .body {
  }
}
</style>