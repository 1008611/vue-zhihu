<template>

  <mu-drawer :open="openLeftMenu" :docked="docked" @close="closeMenu()">
    <div class="drawer-header">
      <mu-list-item title="请登录" disabled class="mt8">
        <mu-avatar slot="left" color="deepOrange300" backgroundColor="purple500">2B</mu-avatar>
      </mu-list-item>

      <mu-flexbox class="mt8">
        <mu-flexbox-item class="flex-demo">
          <mu-flat-button label="我的收藏" icon="grade"/>
        </mu-flexbox-item>

        <mu-flexbox-item class="flex-demo">
          <mu-flat-button label="离线下载" icon="get_app"/>
        </mu-flexbox-item>
      </mu-flexbox>
    </div>

    <!--<router-link to="/" @close="closeMenu()">-->
      <div class="drawer-home" @click="goHome">
        <mu-flat-button label="首页" slot="left" icon="home" primary/>
      </div>
    <!--</router-link>-->

    <mu-list>
      <template v-for="(item,index) in themeList">
        <mu-list-item :title="item.name" @click="openDetail(item.id,item.name)">
          <mu-icon-button icon="add" slot="right"/>
        </mu-list-item>
        <mu-divider/>
      </template>

    </mu-list>
  </mu-drawer>

</template>

<script>
  import api from '../api/index'
  import {bus} from '../common/bus'

  export default {
    name: '',
    data() {
      return {
        themeList: '',
        docked: true,
        openLeftMenu: false,
      }
    },
    created() {
      bus.$on('open', res => {
        console.log(res)
        this.openLeftMenu = true
        this.docked = false
        if (this.themeList == '') {
          this.initData()
        }
      })

    },
    methods: {

      initData() {
        let self = this
        api.getThemesList().then((res) => {
          console.log(res)
          self.themeList = res.data.others
        })
      },
      closeMenu() {
        this.openLeftMenu = false
      },
      goHome(){
        this.openLeftMenu = false
        this.$router.push({path: '/'})
      },
      //去详情页
      openDetail(id, name) {
        this.openLeftMenu = false
        this.$router.push({name: 'Theme', params: {id: id, title: name}})
      }

    }
  }
</script>

<style lang="less" scoped>
  .drawer-header {
    padding: 5px;
    background-color: #e57373;
    .mt8 {
      margin-top: 8px;
    }
    .mu-flat-button {
      color: #fff;
    }
    .mu-item {
      color: #fff;
    }
  }

  .drawer-home {
    width: 100%;
    background-color: #F2F2F2;
    .mu-flat-button {
      height: 50px;
      line-height: 50px;
    }
  }
</style>
