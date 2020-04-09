<template>
  <div>
    <el-tag
      :key="index"
      v-for="(tag,index) in list"
      closable
      :disable-transitions="false"
      @close="handleClose(index)"
    >{{tag.name}}</el-tag>
    <div class="margin-top">
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      ></el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    list: Array,
    url: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      inputVisible: false,
      inputValue: ""
    };
  },
  computed: {
    ...mapState({ userMess: state => state.user.userMess })
  },
  methods: {
    async handleClose(tag) {
      const that = this;
      const key = await that.showToast();
      if (key) {
        that.removeType(that.list[tag].id);
      }
    },
    async addType(name) {
      const that = this;
      const res = await that.$Http.addType(that.url, {
        hotelId: that.userMess.hotelId,
        image:"",
        name: name
      });
      if (res) {
        that.inputVisible = false;
        that.inputValue = "";
        that.$message({
          type: "success",
          message: "添加成功"
        });
        that.$emit("refresh");
      }
    },
    async removeType(id) {
      const that = this;
      const res = await that.$Http.removeType(that.url, id);
      if (res) {
        that.$message({
          type: "success",
          message: "删除成功"
        });
        this.$emit("refresh");
      }
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
        console.log(_);
      });
    },
    showToast() {
      return new Promise(resolve => {
        const that = this;
        that
          .$confirm("是否继续此操作?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            resolve(true);
          })
          .catch(() => {
            that.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      });
    },
    async handleInputConfirm() {
      const that = this;
      let inputValue = this.inputValue;
      const key = await that.showToast();
      if (inputValue && key) {
        that.addType(inputValue);
      }
    }
  }
};
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.el-tag {
  margin: 10px;
}
</style>>