<template>
  <div>
    <el-input v-model="message"></el-input>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      default: ''
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
</style>