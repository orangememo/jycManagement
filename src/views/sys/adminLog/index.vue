<template>
  <div id="admins" class="mainWrap">
    <search-form :formConfig="formConfig" :value="form" labelWidth="80px"></search-form>
    <div class>
      <div class="tableOutBox">
        <el-table
          :data="tableData"
          fit
          border
          stripe
          row-key="id"
          v-loading="listLoading"
          :expand-row-keys="expands"
          :header-row-style="{'background-color':'#152535'}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <!-- <el-table-column type="index" label="序号" width="50" align="center"></el-table-column> -->
          <template v-for="(item , index) in tableTitle ">
            <el-table-column
              :key="index"
              :prop="item.prop"
              :label="item.name"
              :width="item.width"
              :align="item.align"
            >
              <!-- show-overflow-tooltip -->
            </el-table-column>
          </template>
        </el-table>
      </div>
      <div class="mt10">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.page"
          :page-sizes="[10, 20,50]"
          :page-size="page.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getManagerLogInfo, deleteManagerUserInfo } from '@/api/sys'
import SearchForm from '@/components/seachForm/seachForm'

export default {
  components: {
    SearchForm
  },
  data() {
    return {
      edit: 0,
      editId: '',
      editTitle: {
        0: '新增',
        1: '编辑'
      },
      page: {
        total: 0,
        page: 1,
        size: 10
      },
      expands: [],
      form: {
        value3: ''
      },
      formConfig: {
        formItemList: [
          {
            type: 'input',
            prop: 'value3',
            label: '用户名',
            placeholder: '输入用户名'
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
      tableTitle: [
        {
          prop: 'createAccountId',
          name: 'ID',
          width: '',
          align: 'center'
        },
        {
          prop: 'userName',
          name: '用户名',
          width: '',
          align: 'center'
        },
        {
          prop: 'url',
          name: '操作接口',
          width: '',
          align: 'center'
        },
        {
          prop: 'method',
          name: '操作方法',
          width: '',
          align: 'center'
        },
        {
          prop: 'params',
          name: '操作参数',
          width: '',
          align: 'center'
        },
        {
          prop: 'ip',
          name: 'IP',
          width: '',
          align: 'center'
        },
        {
          prop: 'createTime',
          name: '操作时间',
          width: '',
          align: 'center'
        }
      ],
      tableData: [],
      listLoading: false,
      dialogVisible: false,
      dialogVisible1: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    reset() {
      this.form = {
        value3: ''
      }
      this.search()
    },
    addNew() {
      this.handleClick('新增')
    },
    search() {
      this.page.page = 1
      this.getList()
    },
    getList: async function() {
      this.listLoading = true
      let obj = {
        pageSize: this.page.size,
        currentPage: this.page.page,
        userName: this.form.value3
      }
      let res = await getManagerLogInfo(obj)
      this.listLoading = false
      let { result } = res
      this.tableData = result.records
      this.page.total = result.total
    },
    handleClick(type, val) {
      switch (type) {
        case '新增':
          this.edit = 0
          this.dialogVisible = true
          break
        case '编辑':
          console.log(val, 'userInfoIduserInfoId')
          this.edit = 1
          this.editId = val.userInfoId
          this.dialogVisible = true
          break
        case '确认':
          this.dialogVisible = false
          this.getList()
          break
        case '关闭':
          this.dialogVisible = false
          this.getList()
          break

        case '删除':
          this.$confirm('确认删除？', '提示', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning'
          })
            .then(() => {
              let { userInfoId, accountNum } = val
              deleteManagerUserInfo({ userInfoId, accountNum }).then(res => {
                if (res.code === 200) {
                  this.$message({
                    type: 'success',
                    message: '删除成功'
                  })
                  thi.getList()
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
    handleSelectionChange() {}
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mainWrap.scss';
#admins {
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