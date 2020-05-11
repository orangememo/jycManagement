<template>
  <el-table
    ref="table"
    v-loading="loading"
    element-loading-text="Loading"
    :data="tableData"
    border
    fit
    highlight-current-row
    tooltip-effect="dark"
    style="width:100%"
    @sort-change="handleSortChange"
    @selection-change="handleSelectionChange"
  >
    <!--选择-->
    <el-table-column v-if="selectionShow" type="selection" align="center" :width="selectionWith"></el-table-column>
    <el-table-column
      v-for="(item,index) in tableLabel"
      :width="item.width ? item.width : ''"
      :key="index"
      :align="item.align"
      :label="item.label"
      :prop="item.param"
      :sortable="item.sortable ? 'custom' : false"
    >
      <template slot-scope="scope">
        <span v-if="item.render" v-html="item.render(scope.row)"></span>
        <span v-else-if="item.type==='button'">
          <el-button
            v-if="item['items'][scope.row[item.param]]?true:false"
            :type="item.button[scope.row[item.param]]"
            size="mini"
            @click="handleButton(item['items'][scope.row[item.param]],scope.row)"
          >{{item['items'][scope.row[item.param]]}}</el-button>
        </span>
        <span v-else-if="item.type=='img'">
          <el-image
            style="width: 50px; height: 50px"
            :src="hostUrl+scope.row[item.param]"
            :preview-src-list="[hostUrl+scope.row[item.param]]"
            fit="cover"
          ></el-image>
        </span>
        <span v-else>{{scope.row[item.param]}}</span>
      </template>
    </el-table-column>
    <el-table-column
      v-for="(el,i) in tableOption"
      :key="el.id+'_'+i"
      :fixed="el.fixed"
      :width="el.width"
      :label="el.label"
      align="center"
      class-name="small-padding fixed-width"
    >
      <template slot-scope="scope">
        <el-button
          v-for="(item,index) in el.options"
          :key="scope.row.id+'-'+index"
          :type="item.type"
          :icon="item.icon"
          @click="handleButton(item.methods,scope.row,scope.row)"
          size="mini"
        >{{item.label}}</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    selectionWith: {
      type: Number,
      required: false,
      default: 50
    },
    selectionShow: {
      // 多选   默认显示多选
      type: Boolean,
      default: true
    },
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableLabel: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableOption: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      tableColumnsCheckedShow: [],
      radioVal: -1
    }
  },
  components: {},
  methods: {
    //选中某列
    getRow(row) {
      console.log(row)
      this.$emit('getRow', row)
    },
    handleButton(methods, row, index) {
      // 按钮事件
      this.$emit('handleButton', {
        methods: methods,
        row: row,
        index: index
      })
    },
    handleSortChange(val) {
      // 排序
      this.$emit('handleSortChange', val)
    },
    handleSelectionChange(val) {
      this.$emit('handleSelectionChange', val)
    }
  }
}
</script>


