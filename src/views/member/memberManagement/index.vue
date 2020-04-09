<template>
  <div id="memberManagement" class="mainWrap">
    <el-card>
      <div class="topSearch">
        <div class>
          <el-form ref="form" :model="form" label-width="80px" :inline="true" size="small">
            <el-form-item label="名称">
              <el-input v-model.trim="form.value3" placeholder="请输入名称" maxlength="50" clearable />
            </el-form-item>
          </el-form>
        </div>
        <div class="searchButton">
          <el-button size="small" type="primary" @click="search()">查询</el-button>
        </div>
      </div>
    </el-card>
    <div class="ly-flex ly-justify-sb mt40 titleAndButton">
      <div style="padding-left:15px">{{$route.meta.title}}列表</div>
      <div class="buttonCtrl">
        <el-button size="small" type="info" @click="search()">刷新</el-button>
        <el-button size="small" type="primary" @click="handleClick('新增')">新增</el-button>
        <!-- <el-button size="small" type="success" @click="handleClick('编辑')">编辑</el-button> -->
      </div>
    </div>
    <div class="mt25">
      <div class="tableOutBox">
        <el-table
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
                <span v-if="item.prop=='isHide'">{{scope.row[scope.column.property]==0?'显示':'隐藏'}}</span>
                <span v-else-if="item.prop=='icon'">
                  <!-- @click="handleClick('展开',scope.row)" -->
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
        </el-table>
      </div>
      <div class="mt10">
        <pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.page"
          :page-sizes="[10, 20,50]"
          :page-size="100"
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
        <addMember
          :propHandleClick="handleClick"
          v-if="dialogVisible"
          :edit="edit"
          :editRoleId="editRoleId"
        />
        <span slot="footer" class="dialog-footer"></span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getRoleInfoTree, deleteRoleInfo } from '@/api/sys'
import Pagination from '@/components/Pagination'
import addMember from './addMember'
export default {
  components: {
    Pagination,
    addMember
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
      expands: [],
      form: {
        value0: '',
        value1: '',
        value2: '',
        value3: ''
      },
      tableTitle: [
        {
          prop: 'roleId',
          name: 'ID',
          width: '',
          align: 'center'
        },
        {
          prop: 'proleId',
          name: '角色组',
          width: '',
          align: 'center'
        },
        {
          prop: 'roleName',
          name: '一级团队',
          width: '',
          align: 'center'
        },
        {
          prop: 'roleCode',
          name: '二级团队',
          width: '',
          align: 'center'
        },
        {
          prop: 'isHide',
          name: '现有消费红包',
          width: '',
          align: 'center'
        },
        {
          prop: 'roleCode',
          name: '用户名',
          width: '',
          align: 'center'
        },
        {
          prop: 'roleCode',
          name: '昵称',
          width: '',
          align: 'center'
        },
        {
          prop: 'roleCode',
          name: 'classa',
          width: '',
          align: 'center'
        },
        {
          prop: 'roleCode',
          name: '电子邮箱',
          width: '',
          align: 'center'
        },
        {
          prop: 'roleCode',
          name: '手机号',
          width: '',
          align: 'center'
        },
        {
          prop: 'roleCode',
          name: '头像',
          width: '',
          align: 'center'
        },
        {
          prop: 'roleCode',
          name: '等级',
          width: '',
          align: 'center'
        },
        {
          prop: 'roleCode',
          name: '积分',
          width: '',
          align: 'center'
        },
        {
          prop: 'roleCode',
          name: '登录时间',
          width: '',
          align: 'center'
        },
        {
          prop: 'roleCode',
          name: '登录IP',
          width: '',
          align: 'center'
        },
        {
          prop: 'roleCode',
          name: '加入时间',
          width: '',
          align: 'center'
        },
        {
          prop: 'roleCode',
          name: '加入IP',
          width: '',
          align: 'center'
        },
        {
          prop: 'roleCode',
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
    search() {
      this.page.page = 1
      this.getList()
    },
    getList: async function() {
      let res = await getRoleInfoTree()
      this.tableData = res.result.list
    },
    handleClick(type, val) {
      switch (type) {
        case '新增':
          this.edit = 0
          this.dialogVisible = true
          break
        case '编辑':
          this.edit = 1
          this.editRoleId = val.roleId
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
        case '展开':
          console.log(val, 'expands')
          let id = val.id.toString()
          if (this.expands.includes(id)) {
            console.log(1111)
            this.expands = []
          } else {
            console.log(2222)
            let expands = [id]
            this.expands = expands
          }

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
    handleSelectionChange() {}
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mainWrap.scss';
#memberManagement {
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