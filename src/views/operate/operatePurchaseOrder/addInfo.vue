<template>
  <div class="dialogBody" id="addMember">
    <div class="body">
      <el-form ref="form" :model="form" :rules="formRules" label-width="100px" size="small">
        <el-row>
          <!-- <el-col :span="24">
            <el-form-item label="应用id" prop="applicationId">
              <el-input v-model.number="form.applicationId" placeholder="请输入应用id"></el-input>
            </el-form-item>
          </el-col>-->
          <el-col :span="24">
            <el-form-item label="商品选择" prop="product">
              <el-select v-model="form.product" multiple placeholder="请选择" style="width:100%">
                <el-option
                  v-for="item in options.productOptions"
                  :key="item.skuId"
                  :label="item.spuName"
                  :value="item.skuId"
                >
                  <span style="float: left">{{ item.spuName }}</span>
                  <span
                    style="float: right; color: #8492a6; font-size: 13px;margin-right:18px"
                  >{{ item.supplierName }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="已选择商品" prop="commodity">
              <el-table :data="form.commodity" border fit highlight-current-row style="width: 100%">
                <el-table-column align="center" prop="skuName" label="商品名称"></el-table-column>
                <el-table-column align="center" prop="images" label="图片">
                  <template slot-scope="{row}">
                    <el-image
                      style="width: 50px; height: 50px"
                      :src="hostUrl+row.images"
                      :preview-src-list="[hostUrl+row.images]"
                      fit="cover"
                    ></el-image>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="costPrice" label="价格"></el-table-column>
                <el-table-column align="center" prop="num" label="数量">
                  <template slot-scope="{row}">
                    <el-input-number v-model="row.num" size="small" :min="6" :step="6" />
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="收货人姓名" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="地址" prop="address">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop=" remark">
              <el-input v-model="form.remark"></el-input>
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

import { addVorderInfo } from '@/api/member'
import { getCommoditySkuInfoList } from '@/api/products'
import { mapState } from 'vuex'

export default {
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
        product: [],
        commodity: [],
        name: '',
        phone: '',
        address: '',
        remark: ''
      },
      formRules: {
        product: [{ required: true, message: '请选择', trigger: 'blur' }],
        name: [{ required: true, message: '请填写', trigger: 'blur' }],
        phone: [{ required: true, message: '请填写', trigger: 'blur' }],
        address: [{ required: true, message: '请填写', trigger: 'blur' }]
      },
      options: {
        productOptions: []
      }
    }
  },
  computed: {
    ...mapState('login', ['companyListToSelect', 'companyId'])
  },
  mounted() {
    let supplierId = this.companyListToSelect.find(
      i => i.value == this.companyId
    ).parentId
    getCommoditySkuInfoList({
      isPage: 'NO',
      supplierId
    }).then(res => {
      this.options.productOptions = res.result
    })
  },

  methods: {
    handleClick(type) {
      switch (type) {
        case '确认':
          this.$refs.form.validate(valid => {
            if (valid) {
              let obj = JSON.parse(JSON.stringify(this.form))
              addVorderInfo(obj).then(res => {
                if (res.code == 200) {
                  this.$message({
                    type: 'success',
                    message: '新增成功'
                  })
                  this.propHandleClick(type)
                }
              })

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
    }
  },

  watch: {
    'form.product'(newValue, oldValue) {
      let commodity = []
      newValue.forEach(item => {
        let com = this.form.product.find(i => item === i.skuId)
        if (com) {
          commodity.push(com)
        } else {
          com = this.options.productOptions.find(i => item === i.skuId)
          commodity.push(com)
        }
      })
      this.form.commodity = commodity.map(item => {
        let obj = {
          skuName: item.skuName,
          skuCode: item.skuCode,
          images: item.images,
          costPrice: item.costPrice,
          num: 6
        }
        return obj
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mainWrap.scss';
#addMember {
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