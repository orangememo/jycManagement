<template>
  <div class="dialogBody" id="addDishe">
    <div class="body">
      <el-form ref="form" :model="form" :rules="formRules" label-width="140px" size="small">
        <el-row>
          <el-col :span="24">
            <el-form-item label="楼层" prop="floorId">
              <el-select
                v-model="form.floorId"
                placeholder="请选择"
                style="width:100%"
                @change="getTable"
              >
                <el-option
                  v-for="item in options.floorOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="座位" prop="tableId">
              <el-select
                v-model="form.tableId"
                placeholder="请选择"
                style="width:100%"
                :disabled="disabled"
              >
                <el-option
                  v-for="item in options.tableOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
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
import {
  getInformationTable,
  getInformationHotelId,
  putInformationTable
} from '@/api/member'
import { gettableLabelListForFloolr, gettableList } from '@/api/table'

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
    },
    editData: {
      default: () => {}
    }
  },
  data() {
    return {
      sumbitLoading: false,
      form: {
        floorId: '',
        tableId: ''
      },
      formRules: {
        floorId: [{ required: true, message: '请选择', trigger: 'blur' }],
        tableId: [{ required: true, message: '请选择', trigger: 'blur' }]
      },
      options: {
        floorOptions: [],
        tableOptions: []
      },
      disabled: true
    }
  },
  created() {
    gettableLabelListForFloolr({ pageSize: 999 }).then(res => {
      console.log(res, 'res')
      this.options.floorOptions = res.result.records
    })
    let { floorId, tableId } = this.editData
    this.form = {
      floorId,
      tableId
    }
    gettableList({ pageSize: 999 }).then(res => {
      this.options.tableOptions = res.result.records
    })
  },
  computed: {
    ...mapState('login', ['companyId', 'companyList'])
  },

  methods: {
    handleClick(type) {
      switch (type) {
        case '确认':
          this.sumbitLoading = true
          this.$refs.form.validate(valid => {
            if (valid) {
              let obj = JSON.parse(JSON.stringify(this.form))
              let hotelName = this.companyList.find(
                i => (i.companyId = this.companyId)
              ).companyName
              let tableNumber = this.options.tableOptions.find(
                i => i.id == obj.tableId
              ).number
              obj.id = this.editId
              putInformationTable(obj).then(res => {
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
    },
    getTable(value) {
      this.disabled = false
      this.form.tableId = ''
      let floorId = value
      let { scheduledTime, time } = this.editData
      let hotelId = this.companyId
      getInformationTable({
        scheduledTime: scheduledTime,
        time,
        hotelId,
        floorId
      }).then(res => {
        console.log(res, '')
      })
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