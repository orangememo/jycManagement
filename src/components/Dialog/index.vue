<template>
  <div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogStatus" :width="dialogWidth ? dialogWidth : '800px'">
			<div>
				<el-form :model="newProd" ref="roleFrom" :label-width="labelWidth ? labelWidth : '80px'">
          <el-form-item
            v-for="(item,index) in fromList" 
            :key="index"
          >

          </el-form-item>

					<el-form-item label="酒店ID" prop="hotel_id">
						<el-select v-model="newProd.hotel_id" placeholder="请选择...">
							<el-option
								v-for="(item,index) in hotelList"
								:key="index"
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="商品" prop="commodity_id">
						<el-select v-model="newProd.commodity_id" placeholder="请选择...">
							<el-option
								v-for="(item,index) in hotelList"
								:key="index"
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="数量" prop="number">
						<el-input-number v-model="newProd.number"></el-input-number>
					</el-form-item>
					<el-form-item label="状态" prop="status">
						<el-radio-group v-model="newProd.status">
							<el-radio label="1">正常</el-radio>
							<el-radio label="0">隐藏</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="save">确 定</el-button>
				<el-button @click="resetForm">重置</el-button>
			</span>
		</el-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    dialogTitle:String,
    dialogWidth:String,
    dialogStatus:Boolean,
    labelWidth:String,
    fromList:[],
    formConfig: {
      type: Object,
      required: true
    },
    value: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  computed: {},
  methods: {
    setDefaultValue() {
      const formData = { ...this.value };
      // 设置默认值
      this.formConfig.formItemList.forEach(({ key, value }) => {
        if (formData[key] === undefined || formData[key] === null) {
          formData[key] = value;
        }
      });
      this.$emit("input", formData);
    }
  },
  mounted() {
    this.setDefaultValue();
  }
};
</script>