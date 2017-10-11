<template>
    <div class="nav">
      <swiper :options="swiperOption">
        <swiper-slide v-for="item in topNews" :key="item.id">
          <img :src="attachImageUrl(item.image)" alt="">
          <span class="title">{{item.title}}</span>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import api from '../api/index'

  export default {
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        latest: [],
        topNews: [],

        swiperOption: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          height: 200
        }
      }
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
          self.latest = response.data.stories
          self.topNews = response.data.top_stories
        })

      }
    },

  }
</script>

<style lang="less" scoped>

  .nav {
    position: relative;
    margin-top: 40px;
    height: 220px;
    width: 100%;
    overflow: hidden;
    img {
      width :100%;
      height :220px;
      background-size: cover;
      z-index :1
    }
    .title {
      position: absolute;
      left: 10px;
      bottom:25px;
      color: white;
      font-size: 20px;
    }
  }
</style>
