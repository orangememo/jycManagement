<template>
  <div id="productList" class="mainWrap">
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
        <addSKU :propHandleClick="handleClick" v-if="dialogVisible" :edit="edit" :editId="editId" />
        <span slot="footer" class="dialog-footer"></span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getSkuInfoPage, skuToSpu, deleteSkuInfo } from '@/api/products'

import Pagination from '@/components/Pagination'
import addSKU from './addSKU'
import jycTable from '@/components/table/jycTable'
import SearchForm from '@/components/seachForm/seachForm'
export default {
  components: {
    Pagination,
    addSKU,
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
            prop: 'skuName',
            label: '名称',
            placeholder: '请输入名称'
          },

          {
            type: 'input',
            prop: 'brandName',
            label: '商品品牌',
            placeholder: '请输入品牌'
          },
          {
            type: 'input',
            prop: 'catalogName',
            label: '商品类目',
            placeholder: '请输入类目'
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
                label: '正常',
                value: 'NORMAL'
              },
              {
                label: '隐藏',
                value: 'DELETE'
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
          {
            icon: 'el-icon-delete',
            type: 'primary',
            name: '删除',
            handleClick: this.deleteItem
          },
          {
            icon: 'el-icon-s-promotion',
            type: 'primary',
            name: '生成SPU',
            handleClick: this.addSPU
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
        skuName: '',
        catalogName: '',
        brandName: ''
      },
      tableTitle: [
        {
          label: '商品名称',
          param: 'skuName',
          align: 'center',
          type: 'text'
        },
        {
          label: '类目',
          param: 'catalogName',
          align: 'center',
          type: 'text'
        },
        {
          label: '供应商',
          param: 'supplierName',
          align: 'center',
          type: 'text'
        },
        {
          label: '品牌',
          param: 'brandName',
          align: 'center',
          type: 'text'
        },
        {
          label: '缩略图',
          param: 'abbreviateImg',
          align: 'center',
          type: 'img'
        },

        {
          label: '市场价',
          param: 'marketPrice',
          align: 'center',
          type: 'text'
        },
        {
          label: '出售标准价',
          param: 'price',
          type: 'text',
          align: 'center'
        },
        {
          label: '销量',
          param: 'salesVolume',
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
              return "<span style='color:#409EFF'>正常</span>"
            } else {
              return "<span style='color:#909399'>已删除</span>"
            }
          }
        },
        {
          label: '创建时间',
          param: 'id',
          align: 'center',
          type: 'text'
        },
        {
          label: '更新时间',
          param: 'id',
          align: 'center',
          type: 'text'
        }
      ],
      tableOption: [
        {
          label: '操作',
          width: '270',
          options: [
            {
              label: '生成SPU',
              type: 'primary',
              methods: '生成'
            },
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
      selectData: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    reset() {
      this.form = {
        state: '',
        skuName: '',
        catalogName: '',
        brandName: ''
      }
      this.search()
    },
    addNew() {
      this.handleClick('新增')
    },
    addSPU() {
      this.handleClick('批量生成')
    },
    deleteItem() {
      this.handleClick('批量删除')
    },
    search() {
      this.page.page = 1
      this.getList()
    },

    getList: async function() {
      this.listLoading = true
      let obj = JSON.parse(JSON.stringify(this.form))
      obj = {
        ...obj,
        currentPage: this.page.page,
        pageSize: this.page.size
      }

      let res = await getSkuInfoPage(obj)
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
          this.editId = val.skuId
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
          let skuIdList = [val.skuId]
          let upperShelf = 'YES'
          this.$confirm('确认删除？', '提示', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning'
          })
            .then(() => {
              let skuIdList = [val.skuId]
              deleteSkuInfo({ skuIdList }).then(res => {
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
          {
            if (selectData.length === 0) {
              this.$message.error('请勾选需要上架的品牌')
            } else {
              this.$confirm('确认删除？', '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning'
              })
                .then(() => {
                  let skuIdList = selectData.map(i => i.skuId)
                  let upperShelf = 'NO'
                  deleteSkuInfo({ skuIdList }).then(res => {
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
        case '批量生成':
          {
            if (selectData.length === 0) {
              this.$message.error('请勾选需要上架的品牌')
            } else {
              this.$confirm('确认批量生成SPU？', '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning'
              })
                .then(() => {
                  let skuIdList = selectData.map(i => i.skuId)
                  skuToSpu({ skuIdList }).then(res => {
                    if (res.code == 200) {
                      this.$message({
                        type: 'success',
                        message: '生成成功'
                      })
                      this.getList()
                    }
                  })
                })
                .catch(() => {})
            }
          }
          break

        case '生成':
          {
            let skuIdList = [val.skuId]
            skuToSpu({ skuIdList }).then(res => {
              if (res.code == 200) {
                this.$message({
                  type: 'success',
                  message: '生成成功'
                })
                this.getList()
              }
            })
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