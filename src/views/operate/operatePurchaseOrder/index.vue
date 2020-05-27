<template>
  <div id="reservationInfo" class="mainWrap">
    <search-form :formConfig="formConfig" :value="form" labelWidth="80px">
      <el-form-item label="公司" prop="hotelId" slot="formItem">
        <el-select v-model="form.hotelId" clearable placeholder="请选择">
          <el-option
            v-for="(item,index) in companyListToSelect"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </search-form>
    <!-- <div class="ly-flex ly-justify-sb mt40 titleAndButton">
      <div style="padding-left:15px">{{$route.meta.title}}列表</div>
      <div class="buttonCtrl">
        <el-button size="small" type="info" @click="search()">刷新</el-button>
        <el-button size="small" type="primary" @click="handleClick('新增')">新增</el-button>
      </div>
    </div>-->
    <div class>
      <div class="tableOutBox">
        <jyc-table
          :loading="listLoading"
          :table-data="tableData"
          :table-label="tableTitle"
          :table-option="tableOption"
          :selectionShow="true"
          @handleButton="handleButton"
          @handleSelectionChange="handleSelectionChange"
        ></jyc-table>
      </div>
      <div class="mt10">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.page"
          :page-sizes="[10, 20,50]"
          :page-size.sync="page.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        />
      </div>
    </div>
    <div class="dialog">
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="65%"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <div slot="title" style="padding:20px 30px ;border-bottom:1px solid #DCDFE6">
          <span>{{editTitle[edit]}}</span>
        </div>
        <addInfo :edit="edit" :editId="editId" :propHandleClick="handleClick" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getYyVorderPageList,
  deleteVorderInfoState,
  putVorderInfoState,
  cancelVorderInfoState
} from '@/api/member'
import addInfo from './addInfo'
import Pagination from '@/components/Pagination'
import jycTable from '@/components/table/jycTable'
import SearchForm from '@/components/seachForm/seachForm'
import { mapState, mapGetters } from 'vuex'
export default {
  components: {
    Pagination,
    jycTable,
    SearchForm,
    addInfo
  },
  data() {
    return {
      edit: 0,
      editId: null,
      editTitle: {
        0: '新增',
        1: '编辑',
        2: '查看'
      },
      page: {
        total: 0,
        page: 1,
        size: 10
      },
      formConfig: {
        formItemList: [
          // {
          //   type: 'input',
          //   prop: 'phone',
          //   label: '手机号',
          //   placeholder: '请输入手机号'
          // },
          // {
          //   type: 'date',
          //   prop: 'startTime',
          //   dateFormate: 'yyyy-MM-dd',
          //   label: '开始日期'
          // },
          // {
          //   prop: 'endTime',
          //   type: 'date',
          //   dateFormate: 'yyyy-MM-dd',
          //   label: '结束日期'
          // },
          {
            type: 'select',
            prop: 'state',
            clearable: '关闭',
            label: '状态',
            placeholder: '选择状态',
            optList: [
              {
                label: '全部',
                value: ''
              },
              {
                label: '待处理',
                value: 'order_1'
              },
              {
                label: '配送中',
                value: 'order_2'
              },
              {
                label: '以配送',
                value: 'order_3'
              },
              {
                label: '以完结',
                value: 'order_4'
              },
              {
                label: '取消',
                value: 'order_5'
              }
            ]
          }
        ],
        operate: [
          {
            icon: 'el-icon-search',
            type: 'primary',
            name: '查询',
            handleClick: this.search
          },
          // {
          //   icon: 'el-icon-document-add',
          //   type: 'primary',
          //   name: '添加',
          //   handleClick: this.addNew
          // },
          {
            icon: 'el-icon-refresh-left',
            type: 'primary',
            name: '重置',
            handleClick: this.reset
          }
        ]
      },
      form: {
        state: '',
        hotelId: ''
      },
      tableTitle: [
        {
          label: '单号',
          param: 'orderIds',
          align: 'center',
          width: '',
          type: 'text'
        },
        {
          label: '图片',
          param: 'images',
          align: 'center',
          type: 'img'
        },
        {
          label: '姓名',
          param: 'name',
          align: 'center',
          width: '',
          type: 'text'
        },

        {
          label: '备注',
          param: 'content',
          align: 'center',
          type: 'text'
        },
        {
          label: '酒店名称',
          param: 'hotelName',
          align: 'center',
          type: 'text'
        },
        {
          label: '电话',
          param: 'phone',
          align: 'center',
          width: '',
          // sortable: true,
          type: 'text'
        },
        {
          label: '总价',
          param: 'totalPrice',
          align: 'center',
          width: '',
          // sortable: true,
          type: 'text'
        },

        {
          label: '地址',
          param: 'address',
          align: 'center',
          type: 'text'
        },
        {
          label: '删除状态',
          param: 'orderDel',
          align: 'center',
          type: 'text',
          render: row => {
            switch (row.channel) {
              case '0':
                return '删除'
                break
              case '1':
                return '未删除'
                break
            }
          }
        },
        {
          label: '订单状态',
          param: 'state',
          align: 'center',
          type: 'text',
          render: row => {
            switch (row.state) {
              case 'order_1':
                return '待处理'
                break
              case 'order_2':
                return '配送中'
                break
              case 'order_3':
                return '以配送'
                break
              case 'order_4':
                return '以完结'
                break
            }
          }
        },
        {
          label: '创建时间',
          param: 'createTime',
          align: 'center',
          // sortable: true,
          type: 'text',
          width: '200'
        }

        // {
        //   label: '权重',
        //   param: 'id',
        //   align: 'center',

        //   type: 'text'
        // },
      ],
      tableOption: [
        {
          label: '操作',
          width: '350',
          fixed: 'right',
          options: [
            {
              label: '配送',
              type: 'primary',
              methods: '配送'
            },
            {
              label: '送达',
              type: 'success',
              methods: '送达'
            },
            {
              label: '完结',
              type: 'success',
              methods: '完结'
            },
            {
              label: '取消',
              type: 'danger',
              methods: '取消'
            },
            {
              label: '删除',
              type: 'danger',
              methods: '删除'
            }
          ]
        }
      ],
      tableData: [],
      listLoading: false,
      dialogVisible: false
    }
  },
  mounted() {
    this.getList()
  },
  computed: {
    ...mapState('login', ['companyId']),
    ...mapGetters(['companyListToSelect'])
  },
  methods: {
    reset() {
      this.form = {
        state: '',
        hotelId: ''
      }
      this.search()
    },
    search() {
      this.page.page = 1
      this.getList()
    },
    addNew() {
      this.handleClick('新增')
    },
    getList: async function() {
      this.listLoading = true
      let obj = JSON.parse(JSON.stringify(this.form))
      obj = {
        ...obj,
        companyId: this.companyId,
        currentPage: this.page.page,
        pageSize: this.page.size
      }
      let res = await getYyVorderPageList(obj)
      if (res.code == 200) {
        let { result } = res
        this.page.total = result.total
        this.tableData = result.records
      }
      this.listLoading = false
    },
    handleClick(type, val) {
      if (val) {
        let order = val.id
      }
      switch (type) {
        case '查看':
          this.edit = 2
          this.editId = val.border
          this.dialogVisible = true
          break
        case '新增':
          this.edit = 0
          this.dialogVisible = true
          break
        case '配送':
          putJoinInformationState({ order, type: '2' }).then(res => {
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              this.getList()
            }
          })

          break
        case '送达':
          putJoinInformationState({ order, type: '3' }).then(res => {
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              this.getList()
            }
          })

          break
        case '完结':
          putJoinInformationState({ order, type: '4' }).then(res => {
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              this.getList()
            }
          })

          break

        case '编辑':
          this.edit = 1
          this.editId = val.id
          this.dialogVisible = true
          break
        case '确认':
          this.getList()
          this.dialogVisible = false
          break
        case '关闭':
          //   this.getList()
          this.dialogVisible = false
          break

        case '删除':
          this.$confirm('确认删除？', '提示', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning'
          })
            .then(() => {
              deleteVorderInfoState({ order }).then(res => {
                if (res.code == 200) {
                  this.$message({
                    type: 'success',
                    message: '删除成功'
                  })
                  this.getList()
                }
              })
            })
            .catch(() => {})
          break
        case '取消':
          this.$confirm('确认取消？', '提示', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning'
          })
            .then(() => {
              cancelVorderInfoState({ order }).then(res => {
                if (res.code == 200) {
                  this.$message({
                    type: 'success',
                    message: '取消成功'
                  })
                  this.getList()
                }
              })
            })
            .catch(() => {})
          break
      }
    },

    handleSizeChange(size) {
      // 编辑条数
      this.page.size = size
      this.getList()
    },
    handleCurrentChange(page) {
      //点击页页码
      this.page.page = page
      this.getList()
    },

    handleButton(a) {
      this.handleClick(a.methods, a.row)
    },
    handleSelectionChange() {}
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mainWrap.scss';
#reservationInfo {
  .topSearch {
    justify-content: space-between;
    .searchButton {
      padding-right: 10px;
    }
    >>> .el-form-item {
      margin-bottom: 0px;
    }
  }
  .titleAndButton {
    .buttonCtrl {
      padding-right: 30px;
    }
    .tableOutBox {
      .imgClass {
        width: 50px;
        height: 50px;
      }
    }
  }
  .dialog {
    >>> .el-dialog__header {
      padding: 0;
    }
    >>> .el-dialog__body {
      padding: 0;
    }
  }
}
</style>