<template>
  <div id="selectCompanyApp">
    <h1 style="text-align:center">公司应用选择</h1>
    <div class="selectApp">
      <div class="leftCompany posiItem">
        <template v-for="(item,inde) in value1">
          <div class="appItemCss" @click="hendleClick('公司',item)">{{item.name}}</div>
        </template>
      </div>
      <div class="rightApp posiItem">
        <template v-for="(item,inde) in value2">
          <div class="appItemCss" @click="hendleClick('应用',item)">{{item.name}}</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { loginJyc } from '@/api/login'

export default {
  data() {
    return {
      companyId: '',
      appId: '',
      value1: [
        {
          name:
            '呜呜呜呜呜呜呜呜无呜呜呜呜呜呜呜吾问无为谓吾问无为谓吾问无为谓吾问无为谓',
          value: '1'
        },
        {
          name: '123123',
          value: '2'
        }
      ],
      value2: []
    }
  },
  mounted() {
    // let pass = this.$getRsaCode('888888')
    // console.log(pass, '222pass')
  },
  methods: {
    hendleClick(type, val) {
      if (type == '公司') {
        this.companyId = val.companyId
        this.value2 = [
          {
            name: '123123',
            value: '2'
          },
          {
            name: '123123',
            value: '3'
          },
          {
            name: '123123',
            value: '4'
          },
          {
            name: '123123',
            value: '5'
          }
        ]
      } else {
        this.appId = val.appId
        this.$router.push({ path: '/dashboard' })
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
    background: #409eff;
    color: white;
    margin-bottom: 10px;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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