<template>
  <div class="dialogBody" id="addMember">
    <div class="body">
      <el-form ref="form" :model="form" :rules="formRules" label-width="90px" size="small">
        <el-row>
          <!-- <el-col :span="24">
            <el-form-item label="应用id" prop="applicationId">
              <el-input v-model.number="form.applicationId" placeholder="请输入应用id"></el-input>
            </el-form-item>
          </el-col>-->
          <el-col :span="12">
            <el-form-item label="用户" prop="userName">
              <el-input v-model="form.userName" :disabled="edit==2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预定状态" prop="identificationName">
              <el-input v-model="form.identificationName" :disabled="edit==2"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="菜品订单号" prop="menuOrder">
              <el-input v-model="form.menuOrder" :disabled="edit==2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="人数" prop="num">
              <el-input v-model="form.num" :disabled="edit==2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="form.phone" :disabled="edit==2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预定时间" prop="cheduledTime">
              <el-input v-model="form.cheduledTime" :disabled="edit==2"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="状态" prop="state">
              <el-input v-model="form.state" :disabled="edit==2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-divider>
              <i class="el-icon-cold-drink"></i>
            </el-divider>
          </el-col>
          <template v-for="item in form.menuOrderInfoList">
            <el-col :span="24">
              <el-col :span="8">
                <el-form-item label="菜名" prop="dishName">
                  <el-input v-model="item.dishName" :disabled="edit==2"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="单价" prop="dishTypeDetalisPrice">
                  <el-input v-model="item.dishTypeDetalisPrice" :disabled="edit==2"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="数量" prop="num">
                  <el-input v-model="item.num" :disabled="edit==2"></el-input>
                </el-form-item>
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
  getInformationHotelId,
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
      let id = this.editId
      getInformationHotelId({ id }).then(res => {
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