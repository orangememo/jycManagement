<template>
  <div id="appcFakeNews" class="mainWrap">
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
      <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
        <div slot="title" style="padding:20px 30px ;border-bottom:1px solid #DCDFE6">
          <span>{{editTitle[edit]}}</span>
        </div>
        <addNews
          :propHandleClick="handleClick"
          v-if="dialogVisible"
          :edit="edit"
          :editId="editId"
          :editData="editData"
        />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getNewsCenterInfoPage, deleteNewsCenterInfo } from '@/api/member'

import addNews from './addNews'
import jycTable from '@/components/table/jycTable'
import SearchForm from '@/components/seachForm/seachForm'
export default {
  components: {
    addNews,
    jycTable,
    SearchForm
  },
  data() {
    return {
      edit: 0,
      editId: null,
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
          //     {
          //     type: 'input',
          //     prop: 'state',
          //     clearable: '关闭',
          //     label: '标题',
          //     placeholder: '请输入'
          //   },
          {
            type: 'select',
            prop: 'state',
            clearable: '关闭',
            optList: [
              {
                label: '全部',
                value: ''
              },
              {
                label: '正常',
                value: 'NORMAL'
              },
              {
                label: '隐藏',
                value: 'DELETE'
              }
            ],
            label: '状态',
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
            icon: 'el-icon-document-add',
            type: 'primary',
            name: '添加',
            handleClick: this.addNew
          },
          {
            icon: 'el-icon-delete',
            type: 'primary',
            name: '删除',
            handleClick: this.deleteItem
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
        state: ''
      },
      tableTitle: [
        {
          label: 'id',
          param: 'newsCenterId',
          align: 'center',
          type: 'text'
        },
        {
          label: '标题',
          param: 'title',
          align: 'center',
          type: 'text',
          width: '350'
        },
        {
          label: '图片',
          param: 'image',
          type: 'img',
          align: 'center'
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
          label: '更新时间',
          param: 'modifyTime',
          align: 'center',
          width: '200',
          // sortable: true,
          type: 'text'
        },
        {
          label: '阅读量',
          param: 'clicks',
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
            } else {
              return '隐藏'
            }
          }
        }
      ],
      tableOption: [
        {
          label: '操作',
          width: '180',
          options: [
            {
              label: '编辑',
              type: 'primary',
              methods: '编辑'
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
      dialogVisible: false,
      editData: [],
      selectData: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    reset() {
      this.form = {
        state: ''
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
    deleteItem() {
      this.handleClick('批量删除')
    },
    getList: async function() {
      this.listLoading = true
      let obj = JSON.parse(JSON.stringify(this.form))
      obj = {
        ...obj,
        currentPage: this.page.page,
        pageSize: this.page.size
      }
      let res = await getNewsCenterInfoPage(obj)
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
          this.editId = val.newsCenterId
          this.editData = val
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

        case '删除':
          this.$confirm('确认删除？', '提示', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning'
          })
            .then(() => {
              let newsCenterIdList = val.newsCenterId

              deleteRoleInfo({ newsCenterIdList }).then(res => {
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
        case '批量删除':
          let selectData = this.selectData
          if (selectData.length === 0) {
            this.$message.error('请勾选需要删除')
          } else {
            this.$confirm('确认批量删除选中的？', '提示', {
              cancelButtonText: '取消',
              confirmButtonText: '确定',
              type: 'warning'
            })
              .then(() => {
                let newsCenterIdList = selectData.map(i => i.newsCenterId)
                // newsCenterIdList = newsCenterIdList.toString()
                deleteNewsCenterInfo({ newsCenterIdList }).then(res => {
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
          }

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
    handleSelectionChange(val) {
      this.selectData = val
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mainWrap.scss';
#appcFakeNews {
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