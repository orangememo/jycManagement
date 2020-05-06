<template>
  <div id="selectCompanyApp">
    <h1 style="text-align:center">公司应用选择</h1>
    <div class="selectApp">
      <div class="leftCompany posiItem">
        <template v-for="(item,inde) in value1">
          <div
            class="appItemCss"
            :class="{'colorCss':item.companyId===companyId}"
            @click="hendleClick('公司',item)"
          >{{item.companyName}}</div>
        </template>
      </div>
      <div class="rightApp posiItem">
        <template v-for="(item,inde) in value2">
          <div
            class="appItemCss"
            :class="{'colorCss':item.applicationId===applicationId}"
            @click="hendleClick('应用',item)"
          >{{item.applicationName}}</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { loginJyc } from '@/api/login'
import { resetRouter } from '@/router'
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      companyId: '',
      applicationId: '',
      value1: [],
      value2: []
    }
  },
  created() {
    this.$store.dispatch('login/resetRouter').then(() => {
      // this.$router.options.routes = this.$router.options.routes.concat(res)
    })
  },
  mounted() {
    this.value1 = this.companyList
    this.hendleClick('公司', this.companyList[0])
  },
  computed: {
    ...mapState('login', ['companyList', 'applicationList', 'accountId'])
  },
  methods: {
    hendleClick(type, val) {
      if (type == '公司') {
        let { companyId, companyType } = val
        this.companyId = companyId
        this.$store.commit('login/SET_COMPANY_ID', companyId)
        this.$store.commit('login/SET_COMPANY_TYPE', companyType)
        this.value2 = []
        let value2 = this.applicationList.filter(
          el => el.companyId == companyId
        )

        this.value2 = value2
      } else {
        let { applicationId } = val
        this.applicationId = applicationId

        let obj = {
          operationType: 'selectList',
          accountId: this.accountId,
          applicationId: this.applicationId,
          companyId: this.companyId
        }
        this.$store.commit('login/SET_APPLICATION_ID', applicationId)
        this.$store.dispatch('login/loginInfo', obj).then(res => {
          this.$router.addRoutes(res)
          this.$router.push({ path: '/dashboard' })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#selectCompanyApp {
  padding: 50px;
  .appItemCss {
    text-overflow: ellipsis;
    height: 40px;
    border-radius: 3px;
    background: #ecf5ff;
    border-color: #b3d8ff;
    margin-bottom: 10px;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
      background: #409eff;
      border-color: #409eff;
      color: #fff;
    }
  }
  .colorCss {
    border: 1px solid #409eff;
    background: #409eff;
    color: white;
  }
  .posiItem {
    overflow: auto;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .selectApp {
    display: flex;
    justify-content: space-between;
    .leftCompany {
      padding: 50px;
      width: 45%;
    }
    .rightApp {
      padding: 50px;
      width: 45%;
    }
  }
}
</style>