<template>
  <div id="memberOrder" class="mainWrap">
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
      <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false">
        <div slot="title" style="padding:20px 30px ;border-bottom:1px solid #DCDFE6">
          <span>{{editTitle[edit]}}</span>
        </div>

        <span slot="footer" class="dialog-footer"></span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getManagerCouponList, exportMemberCouponList } from '@/api/member'

import Pagination from '@/components/Pagination'
import jycTable from '@/components/table/jycTable'
import SearchForm from '@/components/seachForm/seachForm'
export default {
  components: {
    Pagination,
    jycTable,
    SearchForm
  },
  data() {
    return {
      edit: 0,
      editRoleId: null,
      editTitle: {
        0: '新增',
        1: '编辑'
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
            prop: 'couponCode',
            label: '优惠券编码',
            placeholder: '请输入订单编码'
          },
          {
            type: 'select',
            prop: 'couponStatus',
            clearable: '关闭',
            optList: [
              {
                label: '全部',
                value: ''
              },
              {
                label: '已赠送',
                value: '4'
              },
              {
                label: '待消费',
                value: '1'
              },
              {
                label: '已消费',
                value: '2'
              },
              {
                label: '已预定',
                value: '3'
              }
            ],
            label: '优惠券状态',
            placeholder: '选择状态'
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
            icon: 'el-icon-folder',
            type: 'primary',
            name: '导出',
            handleClick: this.export
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
        couponStatus: '',
        couponCode: ''
      },
      tableTitle: [
        {
          label: '优惠券编码',
          param: 'couponCode',
          align: 'center',
          type: 'text'
        },
        {
          label: '订单编号',
          param: 'orderCode',
          align: 'center',
          width: '220',
          type: 'text'
        },
        {
          label: '账户ID',
          param: 'accountId',
          align: 'center',
          type: 'text'
        },
        {
          label: '酒店ID',
          param: 'companyId',
          align: 'center',
          width: '220',
          type: 'text'
        },
        {
          label: '优惠券状态',
          param: 'couponStatusName',
          align: 'center',
          type: 'text'
        },
        {
          label: '优惠券金额',
          param: 'couponSumMoney',
          align: 'center',
          type: 'text'
        },
        {
          label: '优惠券类型',
          param: 'couponTypeName',
          align: 'center',
          type: 'text'
        },

        {
          label: '状态',
          param: 'state',
          align: 'center',
          type: 'text',

          render: row => {
            if (row.state === 'NORMAL') {
              return '正常'
            } else if (row.state === 'FROZEN') {
              return '冻结'
            } else {
              return '删除'
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
        },
        {
          label: '使用时间',
          param: 'useTime',
          align: 'center',
          width: '200',
          // sortable: true,
          type: 'text'
        },
        {
          label: '删除时间',
          param: 'deleteTime',
          align: 'center',
          width: '200',
          // sortable: true,
          type: 'text'
        }
        // {
        //   label: '权重',
        //   param: 'id',
        //   align: 'center',

        //   type: 'text'
        // },
      ],
      tableOption: [],
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
        orderStatus: '',
        orderCode: '',
        payType: ''
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
    export() {
      this.handleClick('导出')
    },
    getList: async function() {
      this.listLoading = true
      let obj = JSON.parse(JSON.stringify(this.form))
      obj = {
        ...obj,
        currentPage: this.page.page,
        pageSize: this.page.size
      }
      let res = await getManagerCouponList(obj)
      if (res.code == 200) {
        let { result } = res
        this.page.total = result.total
        this.tableData = result.records
      }
      this.listLoading = false
    },
    handleClick(type, val) {
      switch (type) {
        case '新增':
          this.edit = 0
          this.dialogVisible = true
          break
        case '编辑':
          this.edit = 1
          this.editRoleId = val.applicationVersionId
          this.dialogVisible = true
          break
        case '确认':
          this.getList()
          this.dialogVisible = false
          break
        case '关闭':
          this.getList()
          this.dialogVisible = false
          break
        case '导出':
          exportMemberCouponList('blob').then(res => {
            let data = new Blob([res])
            let url = window.URL.createObjectURL(data)
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', `优惠券列表.xlsx`)
            document.body.appendChild(link)
            link.click()
          })
          // this.getList()
          // this.dialogVisible = false
          break

        case '删除':
          this.$confirm('确认删除？', '提示', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning'
          })
            .then(() => {
              let roleId = val.roleId
              deleteRoleInfo({ roleId }).then(res => {
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
#memberOrder {
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