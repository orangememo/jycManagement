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
        width="200"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <div slot="title" style="padding:20px 30px ;border-bottom:1px solid #DCDFE6">
          <span>修改状态</span>
        </div>

        <!-- <addInfo :edit="edit" :editId="editId" :propHandleClick="handleClick" /> -->
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getJoinInformationListPage,
  putJoinInformationState,
  cancelVorderInfoState
} from '@/api/member'

import Pagination from '@/components/Pagination'
import jycTable from '@/components/table/jycTable'
import SearchForm from '@/components/seachForm/seachForm'
import { mapState } from 'vuex'
export default {
  components: {
    Pagination,
    jycTable,
    SearchForm
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
            prop: 'region',
            clearable: '关闭',
            label: '加盟类型',
            placeholder: '选择',
            optList: [
              {
                label: '全部',
                value: ''
              },
              {
                label: '加盟酒店',
                value: '1'
              },
              {
                label: '运营中心',
                value: '2'
              }
            ]
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
                label: '待联系',
                value: '0'
              },
              {
                label: '联系中',
                value: '1'
              },
              {
                label: '成功',
                value: '2'
              },
              {
                label: '失败',
                value: '3'
              },
              {
                label: '删除',
                value: '4'
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
        region: ''
      },
      tableTitle: [
        {
          label: '用户名',
          param: 'userName',
          align: 'center',
          width: '',
          type: 'text'
        },
        {
          label: '微信',
          param: 'wechat',
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
          label: '职位',
          param: 'position',
          align: 'center',
          width: '',
          // sortable: true,
          type: 'text'
        },

        {
          label: '状态',
          param: 'state',
          align: 'center',
          type: 'text',
          render: row => {
            switch (row.state) {
              case '0':
                return '待联系'
                break
              case '1':
                return '联系中'
                break
              case '2':
                return '成功'
                break
              case '3':
                return '失败'
                break
              case '4':
                return '删除'
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
          width: '250',
          fixed: 'right',
          options: [
            {
              label: '联系',
              type: 'primary',
              methods: '联系'
            },
            {
              label: '修改状态',
              type: 'primary',
              methods: '修改状态'
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
    ...mapState('login', ['companyId'])
  },
  methods: {
    reset() {
      this.form = {
        state: '',
        region: ''
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
      let res = await getJoinInformationListPage(obj)
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
        case '联系':
          {
            let id = val.id
            putJoinInformationState({ id, state: '1' }).then(res => {
              if (res.code == 200) {
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
                this.getList()
              }
            })
          }

          break

        case '修改状态':
          this.edit = 1
          let id = val.id
          // this.dialogVisible = true
          this.$confirm('修改状态', '提示', {
            confirmButtonText: '成功',
            cancelButtonText: '失败',
            type: 'success'
          })
            .then(() => {
              putJoinInformationState({ id, state: '2' }).then(res => {
                if (res.code == 200) {
                  this.$message({
                    type: 'success',
                    message: '修改成功'
                  })
                  this.getList()
                }
              })
            })
            .catch(() => {
              putJoinInformationState({ id, state: '3' }).then(res => {
                if (res.code == 200) {
                  this.$message({
                    type: 'success',
                    message: '修改成功'
                  })
                  this.getList()
                }
              })
              // this.$message({
              //   type: 'info',
              //   message: '已取消删除'
              // })
            })
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
              let id = val.id

              putJoinInformationState({ id, state: '4' }).then(res => {
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