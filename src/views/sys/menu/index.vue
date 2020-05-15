<template>
  <div id="menu" class="mainWrap">
    <!-- <div class="ly-flex ly-justify-sb mt40 titleAndButton">
      <div style="padding-left:15px">{{$route.meta.title}}列表</div>
      <div class="buttonCtrl">
        <el-button size="mini" type="info" @click="search()">刷新</el-button>
        <el-button size="mini" type="primary" @click="handleClick('新增')">新增</el-button>
      </div>
    </div>-->
    <search-form :formConfig="formConfig" :value="form" labelWidth="80px"></search-form>
    <div class>
      <div class="tableOutBox">
        <el-table
          :data="tableData"
          fit
          border
          stripe
          row-key="ruleId"
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
                <span
                  v-else-if="item.prop=='ruleType'"
                >{{scope.row[scope.column.property]=='MENU'?'菜单':'按钮'}}</span>

                <!-- <img
                  style="width:50px;height:50px"
                  :src="scope.row[scope.column.property]"
                  alt
                  v-if="item.prop=='headPortrait'"
                />-->
                <span v-else-if="item.prop=='icon'">
                  <svg-icon :icon-class="scope.row[scope.column.property]" />
                </span>
                <span v-else>{{scope.row[scope.column.property]}}</span>
              </template>
            </el-table-column>
          </template>
          <el-table-column label="操作" fixed="right" width="180" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleClick('编辑',scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleClick('删除',scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="dialog">
      <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false">
        <div slot="title" style="padding:20px 30px ;border-bottom:1px solid #DCDFE6">
          <span>{{editTitle[edit]}}</span>
        </div>
        <addMenu
          :propHandleClick="handleClick"
          v-if="dialogVisible"
          :edit="edit"
          :editRuleId="editRuleId"
        />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import addMenu from './addMenu'
import { getRuleInfoTree, deleteRuleInfo } from '@/api/sys'
import SearchForm from '@/components/seachForm/seachForm'

export default {
  components: {
    addMenu,
    SearchForm
  },
  data() {
    return {
      edit: 0,
      editRuleId: null,
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
      formConfig: {
        formItemList: [],
        operate: [
          {
            icon: 'el-icon-search',
            type: 'primary',
            name: '刷新',
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
          prop: 'ruleId',
          name: 'ID',
          width: '',
          align: 'center'
        },

        {
          prop: 'ruleName',
          name: '标题',
          width: '',
          align: 'center'
        },
        {
          prop: 'ruleCode',
          name: 'Code',
          width: '',
          align: 'center'
        },
        {
          prop: 'icon',
          name: '图标',
          width: '',
          align: 'center'
        },
        {
          prop: 'requestUrl',
          name: '规则',
          width: '',
          align: 'center'
        },
        {
          prop: 'weight',
          name: '权重',
          width: '',
          align: 'center'
        },
        {
          prop: 'isHide',
          name: '状态',
          width: '',
          align: 'center'
        },
        {
          prop: 'ruleType',
          name: '菜单',
          width: '',
          align: 'center'
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
    addNew() {
      this.handleClick('新增')
    },
    search() {
      this.page.page = 1
      this.getList()
    },
    getList: async function() {
      this.listLoading = true
      let operationType = 'selectList'
      let res = await getRuleInfoTree({ operationType })
      this.listLoading = false
      this.tableData = res.result.list
    },
    deleteData: async function(ruleId) {
      let res = await deleteRuleInfo({ ruleId })
      if (res.code == 200) {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      }
      this.getList()
    },
    handleClick(type, val) {
      switch (type) {
        case '新增':
          this.edit = 0
          this.dialogVisible = true
          break
        case '编辑':
          this.edit = 1
          this.editRuleId = val.ruleId
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
              this.deleteData(val.ruleId)
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
#menu {
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