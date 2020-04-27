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
import { getManagerOrderList } from '@/api/member'

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
            prop: 'applicationName',
            label: '应用名称',
            placeholder: '请输入应用名称'
          },
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
            icon: 'el-icon-refresh-left',
            type: 'primary',
            name: '重置',
            handleClick: this.reset
          }
        ]
      },
      form: {
        state: '',
        applicationName: ''
      },
      tableTitle: [
        {
          label: '应用ID',
          param: 'applicationId',
          align: 'center',
          type: 'text'
        },
        // {
        //   label: '旧版本号',
        //   param: 'id',
        //   align: 'center',

        //   type: 'text'
        // },
        {
          label: '应用名称',
          param: 'applicationName',
          align: 'center',
          type: 'text'
        },
        {
          label: '新版本号',
          param: 'applicationVersion',
          align: 'center',

          type: 'text'
        },
        // {
        //   label: '包大小',
        //   param: 'id',
        //   align: 'center',

        //   type: 'text'
        // },
        {
          label: '升级内容',
          param: 'content',
          align: 'center',

          type: 'text'
        },
        {
          label: '图片',
          param: 'applicationImage',
          type: 'img',
          align: 'center'
        },
        {
          label: '下载地址',
          param: 'applicationUrl',
          align: 'center',

          type: 'text'
        },
        {
          label: '最低支持版本',
          param: 'applicationMin',
          align: 'center',
          type: 'text'
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
        // {
        //   label: '权重',
        //   param: 'id',
        //   align: 'center',

        //   type: 'text'
        // },
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
          width: '100',
          options: [
            {
              label: '编辑',
              type: 'primary',
              methods: '编辑'
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
        applicationName: ''
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
      let obj = {
        currentPage: this.page.page,
        pageSize: this.page.size,
        state: this.form.state,
        applicationName: this.form.applicationName
      }
      let res = await getManagerOrderList(obj)
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

        case '删除':
          this.$confirm('确认删除？', '提示', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning'
          })
            .then(() => {
              let roleId = val.roleId
              console.log(val.roleId)
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