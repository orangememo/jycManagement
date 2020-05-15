<template>
  <div id="reservationInfo" class="mainWrap">
    <search-form :formConfig="formConfig" :value="form" labelWidth="80px"></search-form>
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
        <!-- <el-table
          :data="tableData"
          fit
          border
          stripe
          row-key="roleId"
          v-loading="listLoading"
          :expand-row-keys="expands"
          :header-row-style="{'background-color':'#152535'}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <template v-for="(item , index) in tableTitle ">
            <el-table-column
              :key="index"
              :prop="item.prop"
              :label="item.name"
              :width="item.width"
              :align="item.align"
            >
              <template slot-scope="scope">
                <span v-if="item.prop=='isHide'">{{scope.row[scope.column.property]==0?'显示':'隐藏'}}</span>
                <span v-else-if="item.prop=='icon'">
                  
                  <svg-icon :icon-class="scope.row[scope.column.property]" />
                </span>
                <span v-else>{{scope.row[scope.column.property]}}</span>
              </template>
            </el-table-column>
          </template>
          <el-table-column label="操作" fixed="right" width="180" align="center">
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="handleClick('编辑',scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="handleClick('删除',scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>-->
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
      <el-dialog title="提示" :visible.sync="dialogVisible" width="65%" :close-on-click-modal="false">
        <div slot="title" style="padding:20px 30px ;border-bottom:1px solid #DCDFE6">
          <span>{{editTitle[edit]}}</span>
        </div>
        <addInfo :edit="edit" :editId="editId" :propHandleClick="handleClick" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getBusinessOrderPage, deleteInformationHotel } from '@/api/member'
import addInfo from './addInfo'
import Pagination from '@/components/Pagination'
import jycTable from '@/components/table/jycTable'
import SearchForm from '@/components/seachForm/seachForm'
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
          {
            type: 'input',
            prop: 'phone',
            label: '手机号',
            placeholder: '请输入手机号'
          },
          {
            type: 'date',
            prop: 'startTime',
            dateFormate: 'yyyy-MM-dd',
            label: '开始日期'
          },
          {
            prop: 'endTime',
            type: 'date',
            dateFormate: 'yyyy-MM-dd',
            label: '结束日期'
          },
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
                label: '待核销',
                value: 'order_1'
              },
              {
                label: '已核销',
                value: 'order_2'
              },
              {
                label: '异常订单',
                value: 'order_3'
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
        phone: '',
        endTime: '',
        startTime: ''
      },
      tableTitle: [
        {
          label: '用户订单',
          param: 'border',
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
          label: '商品价格',
          param: 'commPrice',
          align: 'center',
          width: '',
          type: 'text'
        },
        // {
        //   label: '时间',
        //   param: 'time',
        //   align: 'center',
        //   type: 'text',
        //   render: row => {
        //     if (row.time == 0) {
        //       return '上午'
        //     } else {
        //       return '下午'
        //     }
        //   }
        // },
        {
          label: '原价',
          param: 'originalPrice',
          align: 'center',
          type: 'text'
        },
        {
          label: '用户ID',
          param: 'userId',
          align: 'center',
          type: 'text'
        },
        {
          label: '用户使用红包',
          param: 'consumption',
          align: 'center',
          width: '',
          // sortable: true,
          type: 'text'
        },
        {
          label: '其他费用',
          param: 'otherExpenses',
          align: 'center',
          width: '',
          // sortable: true,
          type: 'text'
        },
        {
          label: '应付金额',
          param: 'paymentamount',
          align: 'center',
          type: 'text'
        },
        {
          label: '总价',
          param: 'totalPrice',
          align: 'center',
          type: 'text'
        },
        {
          label: '支付方式',
          param: '.channel',
          align: 'center',
          type: 'text',
          render: row => {
            switch (row.channel) {
              case '0':
                return '微信'
                break
              case '1':
                return '支付宝'
                break
              case '2':
                return '现金'
                break
              default:
                return '银行卡'
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
                return '待核销'
                break
              case 'order_2':
                return '已核销'
                break
              case 'order_3':
                return '异常订单'
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
          width: '100',
          fixed: 'right',
          options: [
            {
              label: '查看',
              type: '',
              methods: '查看'
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
  methods: {
    reset() {
      this.form = {
        state: '',
        phone: '',
        endTime: '',
        startTime: ''
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
        currentPage: this.page.page,
        pageSize: this.page.size
      }
      let res = await getBusinessOrderPage(obj)
      if (res.code == 200) {
        let { result } = res
        this.page.total = result.total
        this.tableData = result.records
      }
      this.listLoading = false
    },
    handleClick(type, val) {
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
          this.$confirm('确认拒绝？', '提示', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning'
          })
            .then(() => {
              let id = val.id
              console.log(val.roleId)
              deleteInformationHotel({ id }).then(res => {
                if (res.code == 200) {
                  this.$message({
                    type: 'success',
                    message: '拒绝成功'
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