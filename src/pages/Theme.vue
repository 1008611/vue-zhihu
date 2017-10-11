<template>
  <div class="theme">
    <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>

    <div class="header">
      <mu-appbar :title="title">
        <mu-icon-button icon="menu" slot="left" @click="openMenu"/>
        <mu-icon-button icon="add" slot="right"/>
      </mu-appbar>
    </div>

    <mu-card>
      <mu-card-media :title="info.description">
        <img :src="attachImageUrl(info.background)"/>
      </mu-card-media>
    </mu-card>

    <mu-list-item class="author" v-if="info.editors" :title="info.editors[0].bio+'❀❀'+info.editors[0].name">
      <mu-avatar :src="attachImageUrl(info.editors[0].avatar)" slot="leftAvatar"/>
    </mu-list-item>

    <mu-list>
      <template v-for="(item,index) in themeList">
        <mu-list-item @click="toDetail(item.id)">
          <mu-card>
            <mu-card-header :title="item.title">
              <mu-avatar v-if="item.images"  :src="attachImageUrl(item.images[0])" slot="avatar"/>
            </mu-card-header>
          </mu-card>
        </mu-list-item>
      </template>
    </mu-list>
    <drawer></drawer>
  </div>
</template>

<script>
  import api from '../api/index'
  import {bus} from '../common/bus'
  import drawer from '../components/drawer.vue'
  export default {
    name: 'theme',
    components:{
      drawer
    },
    data() {
      return {
        id: '',
        title: '',
        info: '',
        themeList: [],

        refreshing: false,
        trigger: null
      }
    },
    mounted() {
      this.trigger = this.$el
    },
    created() {
      this.id = this.$route.params.id
      this.title = this.$route.params.title
      this.initData()
    },
    methods: {
      //对图片url进行转化
      attachImageUrl: function (srcUrl) {
        if (srcUrl !== undefined) {
          return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
        }
      },
      initData() {
        let self = this
        api.getThemesDetail(this.id).then((response) => {
          this.refreshing = false
          self.themeList = response.data.stories
          self.info = response.data
        })
      },
      openMenu() {
        bus.$emit('open',true)
      },
      //下拉刷新
      refresh() {
        this.refreshing = true
        this.initData()
      },

      //去详情页
      toDetail(id) {
        console.log(id)
        this.$router.push({name: 'Detail', params: {id: id}})
      },

    },

  }
</script>

<style lang="less">
  .theme {

    .mu-card-media {
      img {
        height: 250px;
      }
    }
    .author{
      background-color: #F2F2F2;
    }
    .mu-card-header-title{
      margin-right: 20px;
      padding-right: 20px;
    }
    .mu-list{
      background-color: #F2F2F2;
    }
    .mu-list .mu-item{
      padding: 8px;
    }
  }


</style>
