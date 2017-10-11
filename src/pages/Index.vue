<template>
  <div class="index">
    <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>

    <div class="header">
      <mu-appbar title="首页">
        <mu-icon-button icon="menu" slot="left" @click="openMenu"/>
        <mu-icon-button icon="fingerprint" slot="right"/>
        <mu-icon-menu icon="more_vert" slot="right">
          <mu-menu-item title="夜间模式"/>
          <mu-menu-item title="设置选项"/>
        </mu-icon-menu>

      </mu-appbar>
    </div>

    <drawer></drawer>

    <swiper></swiper>

    <div class="index-container">

      <mu-sub-header class="news-title">今日新闻</mu-sub-header>
      <!--<mu-list>-->
        <!--<template v-for="(item,index) in latest">-->
          <!--<mu-sub-header class="title" v-if="item.date">{{item.date}}</mu-sub-header>-->

          <!--<mu-list-item :title="item.title" @click="toDetail(item.id)">-->
            <!--<mu-avatar :src="attachImageUrl(item.images[0])" slot="rightAvatar"/>-->
          <!--</mu-list-item>-->
          <!--<mu-divider/>-->

        <!--</template>-->
      <!--</mu-list>-->

      <mu-list>
        <template v-for="(item,index) in latest">
          <mu-list-item @click="toDetail(item.id)">
            <mu-sub-header class="title" v-if="item.date">{{item.date}}</mu-sub-header>
            <mu-card>
              <mu-card-header :title="item.title">
                <mu-avatar v-if="item.images"  :src="attachImageUrl(item.images[0])" slot="avatar"/>
              </mu-card-header>
            </mu-card>
          </mu-list-item>
        </template>
      </mu-list>

    </div>
    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>


  </div>
</template>

<script>
  import swiper from '../components/swiper.vue'
  import drawer from '../components/drawer.vue'
  import api from '../api/index'
  import * as format from '../common/DateFormat'
  import {bus} from '../common/bus'

  export default {
    name: 'index',
    components: {
      swiper,
      drawer
    },
    data() {
      return {
        refreshing: false,
        trigger: null,

        latest: [],
        topNews: [],
        oldNews: [],
        themeList: [],
        oldNewsDate: '',

        loading: false,
        scroller: null,

        index: 1,
      }
    },
    mounted() {
      this.trigger = this.$el
      this.scroller = this.$el
    },
    created() {
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
        api.getLatest().then((response) => {
          console.log(response)
          this.refreshing = false
          self.latest = response.data.stories
          self.topNews = response.data.top_stories
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
      //上拉加载
      loadMore() {
        this.loading = true

        let self = this
        let id = format.formatDate(new Date(new Date() - 24 * 60 * 60 * 1000 * self.index))
        let lastDate = format.lastDate(new Date(new Date() - 24 * 60 * 60 * 1000 * self.index))
        console.log(id)
        api.getSearchNews(id).then((response) => {
          self.loading = false
          console.log(response)
          self.index++
          let arr = response.data.stories
          arr[0].date = lastDate
          self.latest = self.latest.concat(arr)
        })
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
  .index {
    .header {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 40px;
      z-index: 9;
    }
    .index-container {
      background: #F2F2F2;
    }
    .mu-card-header-title{
      margin-right: 25px;
      padding-right: 25px;
    }
    .mu-list .mu-item{
      padding: 8px;
    }
  }

</style>
