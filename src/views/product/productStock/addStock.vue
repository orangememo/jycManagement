<template>
  <div class="dialogBody" id="addStock">
    <div class="body">
      <el-form ref="form" :model="form" :rules="formRules" label-width="90px" size="small">
        <el-row>
          <el-col :span="24">
            <el-form-item label="可用库存" prop="availableQuantity">
              <el-input-number
                style="width:100%"
                v-model="form.availableQuantity"
                controls-position="right"
                :min="-99999"
                :max="9999999999"
                placeholder="请输入可用库存"
              ></el-input-number>
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
import { putStockInfoById } from '@/api/products'

export default {
  props: {
    propHandleClick: {
      type: Function
    },
    editNumber: {
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
        availableQuantity: 0
      },
      formRules: {
        availableQuantity: [
          { required: true, message: '请填写库存', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.form.availableQuantity = this.editNumber
  },

  methods: {
    handleClick(type) {
      switch (type) {
        case '确认':
          this.sumbitLoading = true
          this.$refs.form.validate(valid => {
            if (valid) {
              let obj = JSON.parse(JSON.stringify(this.form))
              obj.stockId = this.editId
              putStockInfoById(obj).then(res => {
                if (res.code == 200) {
                  this.$message({
                    type: 'success',
                    message: '修改成功'
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
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mainWrap.scss';
#addStock {
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