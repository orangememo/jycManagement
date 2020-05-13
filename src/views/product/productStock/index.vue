<template>
  <div id="productCategory" class="mainWrap">
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
        <addStock
          :propHandleClick="handleClick"
          v-if="dialogVisible"
          :edit="edit"
          :editId="editId"
          :editNumber="editNumber"
        />
        <span slot="footer" class="dialog-footer"></span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getStockListPage,
  deleteCatalogInfo,
  putCatalogTop
} from '@/api/products'

import Pagination from '@/components/Pagination'
import addStock from './addStock'
import jycTable from '@/components/table/jycTable'
import SearchForm from '@/components/seachForm/seachForm'
import { mapGetters } from 'vuex'
export default {
  components: {
    Pagination,
    jycTable,
    addStock,
    SearchForm
  },
  data() {
    return {
      edit: 0,
      editId: null,
      editTitle: {
        0: '新增',
        1: '修改'
      },
      editNumber: 0,
      page: {
        total: 0,
        page: 1,
        size: 10
      },
      formConfig: {
        formItemList: [
          {
            type: 'input',
            prop: 'supplierName',
            label: '公司名称',
            placeholder: '请输入名称'
          },
          {
            type: 'input',
            prop: 'skuName',
            label: 'SKU名称',
            placeholder: '请输入名称'
          }
          // {
          //   type: 'select',
          //   prop: 'state',
          //   clearable: '关闭',
          //   label: '状态',
          //   placeholder: '选择状态',
          //   optList: [
          //     {
          //       label: '全部',
          //       value: ''
          //     },
          //     {
          //       label: '正常',
          //       value: 'NORMAL'
          //     },

          //   ]
          // }
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
        selectCompanyId: '',
        supplierName: '',
        skuName: ''
      },
      tableTitle: [
        {
          label: 'SKU名称',
          param: 'skuName',
          align: 'center',
          type: 'text'
        },
        {
          label: '公司名称',
          param: 'supplierName',
          align: 'center',
          type: 'text'
        },

        {
          label: '销售量',
          param: 'salesVolume',
          align: 'center',
          type: 'text'
        },
        {
          label: '可用数量',
          param: 'availableQuantity',
          align: 'center',
          type: 'text'
        },
        // {
        //   label: '状态',
        //   param: 'state',
        //   align: 'center',
        //   type: 'text',
        //   render: row => {
        //     if (row.state === 'NORMAL') {
        //       return '正常'
        //     } else if (row.state === 'DELETE') {
        //       return '删除'
        //     }
        //   }
        // },
        {
          label: '创建时间',
          param: 'createTime',
          align: 'center',
          type: 'text'
        },
        {
          label: '修改时间',
          param: 'modifyTime',
          align: 'center',
          type: 'text'
        }
      ],
      tableOption: [
        {
          label: '操作',
          width: '100',
          options: [
            {
              label: '修改',
              type: 'primary',
              methods: '修改'
            }
            // {
            //   label: '删除',
            //   type: 'danger',
            //   methods: '删除'
            // }
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
    ...mapGetters(['companyListToSelect'])
  },

  methods: {
    reset() {
      this.form = {
        selectCompanyId: '',
        supplierName: '',
        skuName: ''
      }
      this.search()
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
        state: 'ALL',
        currentPage: this.page.page,
        pageSize: this.page.size
      }
      let res = await getStockListPage(obj)
      if (res.code == 200) {
        let { result } = res
        this.page.total = result.total
        this.tableData = result.records
      }
      this.listLoading = false
    },
    handleClick(type, val) {
      switch (type) {
        case '修改':
          this.edit = 1
          this.editId = val.stockId
          this.editNumber = val.availableQuantity
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
#productCategory {
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