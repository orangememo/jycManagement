<template>
  <div id="productList" class="mainWrap">
    <search-form :formConfig="formConfig" :value="form" labelWidth="80px">
      <el-form-item label="公司" prop="selectCompanyId" slot="formItem">
        <el-select v-model="form.selectCompanyId" clearable placeholder="请选择">
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
        <addDishe
          :propHandleClick="handleClick"
          v-if="dialogVisible"
          :edit="edit"
          :editId="editId"
        />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getExceptionListPage,
  unDownDishTypeDetails,
  deleteSpuInfo,
  selloutDishTypeDetails,
  firstDishTypeDetails
} from '@/api/products'

import Pagination from '@/components/Pagination'
import addDishe from './addDishe'
import jycTable from '@/components/table/jycTable'
import SearchForm from '@/components/seachForm/seachForm'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    Pagination,
    addDishe,
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
          {
            type: 'input',
            prop: 'dishDetailsName',
            label: '菜品名称',
            placeholder: '请输入名称'
          },
          {
            type: 'input',
            prop: 'dishName',
            label: '菜系名称',
            placeholder: '请输入名称'
          },
          {
            type: 'select',
            prop: 'Hstate',
            clearable: '关闭',
            label: '酒店状态',
            placeholder: '选择状态',
            optList: [
              {
                label: '全部',
                value: ''
              },
              {
                label: '下架',
                value: '0'
              },
              {
                label: '上架',
                value: '1'
              }
            ]
          },
          {
            type: 'select',
            prop: 'Ystate',
            clearable: '关闭',
            label: '运营商状态',
            placeholder: '选择',
            optList: [
              {
                label: '全部',
                value: ''
              },
              {
                label: '审核中',
                value: '0'
              },
              {
                label: '上架',
                value: '1'
              },
              {
                label: '审核未通过',
                value: '2'
              },
              {
                label: '下架',
                value: '3'
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
            icon: 'el-icon-document-add',
            type: 'primary',
            name: '添加',
            handleClick: this.addNew
          },

          // {
          //   icon: 'el-icon-delete',
          //   type: 'primary',
          //   name: '删除',
          //   handleClick: this.deleteItem
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
        selectCompanyId: '',
        Hstate: '',
        Ystate: '',
        dishName: '',
        dishDetailsName: ''
      },
      tableTitle: [
        {
          label: '菜品名称',
          param: 'dishDetailsName',
          align: 'center',
          type: 'text'
        },
        {
          label: '菜系名称',
          param: 'dishName',
          align: 'center',
          type: 'text'
        },
        {
          label: '价格',
          param: 'money',
          align: 'center',
          type: 'text'
        },

        {
          label: '详细内容',
          param: 'detailscontent',
          align: 'center',
          type: 'text'
        },
        {
          label: '说明',
          param: 'explainContent',
          align: 'center',
          type: 'text'
        },
        // {
        //   label: '简介',
        //   param: 'brief',
        //   align: 'center',
        //   type: 'text'
        // },
        {
          label: '运营商审核详情',
          param: 'reviewTheDetails',
          align: 'center',
          type: 'text'
        },
        {
          label: '酒店修改详情',
          param: 'modifyTheDetails',
          type: 'text',
          align: 'center'
        },

        {
          label: '本月销售',
          param: 'monthlySale',
          align: 'center',
          type: 'text'
        },

        {
          label: '售空状态',
          param: 'hotelStatus',
          align: 'center',
          type: 'text',
          render: row => {
            if (row.hotelStatus === '0') {
              return '下架'
            } else {
              return '上架'
            }
          }
        },
        {
          label: '售空状态',
          param: 'bool',
          align: 'center',
          type: 'text',
          render: row => {
            if (row.bool === '0') {
              return '售空'
            } else {
              return '有菜'
            }
          }
        },
        {
          label: '运营商状态',
          param: 'state',
          align: 'center',
          type: 'text',
          render: row => {
            switch (row.state) {
              case '0':
                return '审核中'
                break
              case '1':
                return '上架'
                break
              case '2':
                return '审核未通过'
                break
              case '3':
                return '下架'
                break
            }
          }
        },
        {
          label: '上下架',
          param: 'hotelStatus',
          align: 'center',
          type: 'button',
          items: {
            0: '上架',
            1: '下架'
          },
          button: {
            1: 'danger',
            0: 'primary'
          }
        },
        {
          label: '售空',
          param: 'bool',
          align: 'center',
          type: 'button',
          items: {
            0: '上货',
            1: '售空'
          },
          button: {
            0: 'primary',
            1: 'danger'
          }
        }
      ],
      tableOption: [
        {
          label: '置顶',
          width: '90',
          options: [
            {
              label: '置顶',
              type: 'primary',
              methods: '置顶'
            }
          ]
        },
        {
          label: '操作',
          width: '90',
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
      dialogVisible: false,
      selectData: []
    }
  },
  mounted() {
    this.getList()
  },
  computed: {
    ...mapGetters(['companyListToSelect']),
    ...mapState('login', ['companyType'])
  },
  methods: {
    reset() {
      this.form = {
        selectCompanyId: '',
        Hstate: '',
        Ystate: '',
        dishName: '',
        dishDetailsName: ''
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
    downNew() {
      this.handleClick('批量下架')
    },
    deleteItem() {
      this.handleClick('批量删除')
    },
    getList: async function() {
      this.listLoading = true
      let obj = JSON.parse(JSON.stringify(this.form))
      let cmpType = this.companyType
      obj = {
        ...obj,
        cmpType,
        currentPage: this.page.page,
        pageSize: this.page.size
      }
      let res = await getExceptionListPage(obj)
      if (res.code == 200) {
        let { result } = res
        this.page.total = result.total
        this.tableData = result.records
      }
      this.listLoading = false
    },
    handleClick(type, val) {
      let selectData = this.selectData
      switch (type) {
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
          this.getList()
          this.dialogVisible = false
          break
        case '置顶':
          {
            let id = val.id
            firstDishTypeDetails({ id }).then(res => {
              if (res.code == 200) {
                this.$message({
                  type: 'success',
                  message: '操作成功'
                })
                this.getList()
              }
            })
          }

          break
        case '上货':
          {
            let id = val.id
            let text = '1'
            selloutDishTypeDetails({ id, text }).then(res => {
              if (res.code == 200) {
                this.$message({
                  type: 'success',
                  message: '操作成功'
                })
                this.getList()
              }
            })
          }

          break
        case '售空':
          this.$confirm('售空？', '提示', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning'
          })
            .then(() => {
              let id = val.id
              let text = '0'
              selloutDishTypeDetails({ id, text }).then(res => {
                if (res.code == 200) {
                  this.$message({
                    type: 'success',
                    message: '操作成功'
                  })
                  this.getList()
                }
              })
            })
            .catch(() => {})
          break
        case '上架':
          {
            let dishId = val.id
            let Hstate = '1'
            unDownDishTypeDetails({ dishId, Hstate }).then(res => {
              if (res.code == 200) {
                this.$message({
                  type: 'success',
                  message: '上架成功'
                })
                this.getList()
              }
            })
          }

          break
        case '下架':
          this.$confirm('确认下架？', '提示', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning'
          })
            .then(() => {
              let dishId = val.id
              let Hstate = '0'
              unDownDishTypeDetails({ dishId, Hstate }).then(res => {
                if (res.code == 200) {
                  this.$message({
                    type: 'success',
                    message: '下架成功'
                  })
                  this.getList()
                }
              })
            })
            .catch(() => {})
          break
        case '批量删除':
          {
            if (selectData.length === 0) {
              this.$message.error('请勾选需要删除的项')
            } else {
              this.$confirm('确认批量批量删除选中的？', '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning'
              })
                .then(() => {
                  let dishId = selectData.map(i => i.id)
                  dishId = dishId.toString()
                  deleteSpuInfo({ dishId }).then(res => {
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
          }
          break
        case '删除':
          this.$confirm('确认删除？', '提示', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning'
          })
            .then(() => {
              let dishId = val.id
              deleteSpuInfo({ dishId }).then(res => {
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
      console.log(a, '22')
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
#productList {
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