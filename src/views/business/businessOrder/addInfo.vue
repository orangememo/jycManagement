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
          <el-col :span="12">
            <el-form-item label="用户Id" prop="userId">
              <el-input v-model="form.userId" :readonly="edit==2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="state">
              <el-input v-model="stateInfo[form.state]" :readonly="edit==2"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="用户使用红包" prop="consumption">
              <el-input v-model="form.consumption" :readonly="edit==2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="原价" prop="originalPrice">
              <el-input v-model="form.originalPrice" :readonly="edit==2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="其他费用" prop="otherExpenses">
              <el-input v-model="form.otherExpenses" :readonly="edit==2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="应付金额" prop="paymentamount">
              <el-input v-model="form.paymentamount" :readonly="edit==2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="真实价格" prop="price">
              <el-input v-model="form.price" :readonly="edit==2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="使用时间" prop="refreshtime">
              <el-input v-model="form.refreshtime" :readonly="edit==2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品数量" prop="num">
              <el-input v-model="form.refreshtime" :readonly="edit==2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="总价" prop="totalPrice">
              <el-input v-model="form.totalPrice" :readonly="edit==2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="支付方式" prop="channel">
              <el-input v-model="channelInfo[form.channel]" :readonly="edit==2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="form.phone" :readonly="edit==2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建时间" prop=" createTime">
              <el-input v-model="form.createTime" :readonly="edit==2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-divider>
              <i class="el-icon-cold-drink"></i> 优惠券
            </el-divider>
          </el-col>
          <template v-for="item in form.couponInfoList">
            <el-col :span="12" class="mb10">
              <el-col :span="8" class="ly-flex ly-justify-c">
                <el-image
                  :src="hostUrl+item.images"
                  style="width: 150px; height: 150px; "
                  class="p5"
                ></el-image>
              </el-col>
              <el-col :span="16">
                <el-col :span="24">
                  <el-form-item label="商品名称" prop="skuName" label-width="100px">
                    <el-input v-model="item.skuName" :readonly="edit==2"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="优惠券编码" prop="couponCode" label-width="100px">
                    <el-input v-model="item.couponCode" :readonly="edit==2"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="skuCode" prop="skuCode" label-width="75px">
                    <el-input v-model="item.skuCode" :readonly="edit==2"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="金额" prop="couponSumMoney" label-width="75px">
                    <el-input v-model="item.couponSumMoney" :readonly="edit==2"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-col>
          </template>
          <el-col :span="24">
            <el-divider>
              <i class="el-icon-cold-drink"></i>复消酒
            </el-divider>
          </el-col>
          <template v-for="item in form. jycLiquorProductsList">
            <el-col :span="12" class="mb10">
              <el-col :span="8" class="ly-flex ly-justify-c">
                <el-image
                  :src="hostUrl+item.image"
                  style="width: 150px; height: 150px; "
                  class="p5"
                ></el-image>
              </el-col>
              <el-col :span="16">
                <el-col :span="24">
                  <el-form-item label="商品名称" prop="skuName" label-width="100px">
                    <el-input v-model="item.skuName" :readonly="edit==2"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="skuCode" prop="skuCode">
                    <el-input v-model="item.skuCode" :readonly="edit==2"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="价格" prop="money" label-width="70px">
                    <el-input v-model="item.money" :readonly="edit==2"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="数量" prop="number" label-width="70px">
                    <el-input v-model="item.number" :readonly="edit==2"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-col>
          </template>
        </el-row>
      </el-form>
    </div>
    <div class="ly-flex ly-justify-e buttonCtrl">
      <div>
        <!-- <el-button type="primary" @click="handleClick('确认')" :loading="sumbitLoading">确认</el-button> -->
        <el-button @click="handleClick('关闭')">关闭</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { validateMobile } from '@/utils/validate'
import treeSelect from '@/components/treeSelect'
import {
  addVersionInfo,
  getBusinessOrderInfo,
  putVersionInfo,
  upLoadImg
} from '@/api/member'

export default {
  components: {
    treeSelect
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
      channelInfo: {
        0: '微信',
        1: '支付宝',
        2: '现金',
        3: '银行卡'
      },
      stateInfo: {
        order_1: '待核销',
        order_2: '已核销',
        order_3: '异常订单'
      },
      upLoadImg,
      sumbitLoading: false,
      form: {
        applicationId: '',
        applicationVersion: '',
        content: '',
        state: 'NORMAL',
        applicationUrl: '',
        applicationImage: '',
        applicationMin: ''
      },
      formRules: {},
      options: {
        appIdOptions: []
      }
    }
  },
  mounted() {
    if (this.edit == 2) {
      let order = this.editId
      console.log('12313212')
      getBusinessOrderInfo({ order }).then(res => {
        this.form = res.result
      })
    }
  },

  methods: {
    handleClick(type) {
      switch (type) {
        case '确认':
          break
        case '关闭':
          this.propHandleClick(type)
          break
      }
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