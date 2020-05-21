<template>
  <div></div>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  created() {
    let url = `http://lp-admin.cn:8089/webRecruit/#/?token=${getToken()}`
    window.open(url)
    this.$router.go(-1)
  },
  mounted() {
    // let url = `http://www.baidu.com?token=${getToken()}`
    // window.open(url)
    // window.location.href = url
  }
}
</script>

<style lang="scss" scoped>
</style>