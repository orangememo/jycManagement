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
              <template slot-scope="scope">
                <img
                  style="width:50px;height:50px"
                  :src="scope.row[scope.column.property]"
                  alt
                  v-if="item.prop=='headPortrait'"
                />
                <span v-else-if="item.prop=='icon'">
                  <svg-icon :icon-class="scope.row[scope.column.property]" />
                </span>
                <span v-else>{{scope.row[scope.column.property]}}</span>
              </template>
            </el-table-column>
          </template>
          <el-table-column label="操作" fixed="right" width="250" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleClick('编辑',scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleClick('删除',scope.row)">删除</el-button>
              <el-button size="mini" type="danger" @click="handleClick('重置密码',scope.row)">重置密码</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="mt10">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.page"
          :page-sizes="[10, 20,50]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        ></el-pagination>
      </div>
    </div>
    <div class="dialog">
      <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false">
        <div slot="title" style="padding:20px 30px ;border-bottom:1px solid #DCDFE6">
          <span>{{editTitle[edit]}}</span>
        </div>
        <addAdmin
          :propHandleClick="handleClick"
          v-if="dialogVisible"
          :edit="edit"
          :editId="editId"
        />
        <span slot="footer" class="dialog-footer"></span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import addAdmin from './addAdmin'
import { getManagerUserInfoPageList, deleteManagerUserInfo } from '@/api/sys'
import { putRetrievePassword } from '@/api/login'

import SearchForm from '@/components/seachForm/seachForm'

export default {
  components: {
    addAdmin,
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
        value3: '',
        state: 'ALL'
      },
      formConfig: {
        formItemList: [
          {
            type: 'input',
            prop: 'value3',
            label: '用户名',
            placeholder: '输入用户名'
          },
          {
            type: 'select',
            prop: 'state',
            clearable: '关闭',
            optList: [
              {
                label: '全部',
                value: 'ALL'
              },
              {
                label: '正常',
                value: 'NORMAL'
              },
              {
                label: '冻结',
                value: 'FROZEN'
              }
            ],
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
            icon: 'el-icon-document-add',
            type: 'primary',
            name: '添加',
            handleClick: this.addNew
          }
        ]
      },
      tableTitle: [
        {
          prop: 'userInfoId',
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
          prop: 'nickName',
          name: '昵称',
          width: '',
          align: 'center'
        },
        {
          prop: 'roleNames',
          name: '所属组别',
          width: '',
          align: 'center'
        },
        {
          prop: 'email',
          name: 'email',
          width: '',
          align: 'center'
        },
        {
          prop: 'state',
          name: '状态',
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
        state: this.form.state,
        userName: this.form.value3
      }
      let res = await getManagerUserInfoPageList(obj)
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
        case '重置密码':
          let { accountNum } = val
          putRetrievePassword({ accountNum }).then(res => {
            this.$message({
              type: 'success',
              message: '重置成功'
            })
          })
          thi.getList()
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