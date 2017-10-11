<template>
  <div class="detail">
    <mu-appbar>
      <mu-icon-button icon="close" slot="left" @click="goback"/>
      <mu-icon-button icon="share" slot="right"/>
      <mu-icon-button icon="grade" slot="right"/>
      <mu-flat-button icon="question_answer" slot="right" :label="extraInfo.comments+''" @click="openComment"/>
      <mu-flat-button icon="thumb_up" slot="right" :label="extraInfo.popularity+''"/>
    </mu-appbar>

    <mu-card>
      <mu-card-media :title="info.title" :subTitle="info.image_source">
        <img :src="attachImageUrl(info.image)"/>
      </mu-card-media>
      <mu-card-text v-html="body"></mu-card-text>
    </mu-card>
  </div>
</template>

<script>
  import api from '../api/index'

  export default {
    name: '',
    data() {
      return {
        id: '',
        info: {},
        extraInfo: '',
        body: '',
      }
    },
    created() {
      this.id = this.$route.params.id
      console.log('获取到的 ID：' + this.id)
      this.getNewsDetail()
      this.getNewsExtra()
    },
    mounted: function () {
      this.$nextTick(function () {
        window.addEventListener('scroll', this.onScroll)
      })
    },

    methods: {
      onScroll() {
        let scrolled = document.documentElement.scrollTop || document.body.scrollTop
        if (scrolled >= 50) {
          console.log(scrolled)
        }
      },
      //对图片url进行转化
      attachImageUrl(srcUrl) {
        if (srcUrl !== undefined) {
          return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
        }
      },
      goback() {
        this.$router.go(-1)
      },
      getNewsDetail() {
        let self = this
        api.getLatestDetail(self.id).then((response) => {
          console.log(response)
          self.info = response.data
          let body = response.data.body
          self.body = body.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, (match) => {
            return self.attachImageUrl(match)
          })
        })
      },
      getNewsExtra() {
        let self = this
        api.getComments(self.id).then((response) => {
          console.log(response)
          self.extraInfo = response.data
        })
      },
      openComment() {
        console.log(this.extraInfo.comments)
//        return
        this.$router.push({name: 'Comment', params: {id: this.id, count: this.extraInfo.comments}})
      }
    }
  }
</script>

<style lang="less">

  .mu-card-sub-title {
    float: right;
  }

  .meta {
    font-size: 20px;
    color: #666;
    .avatar {
      width: 22px;
      height: 22px;
    }
  }

  .content-image {
    width: 100%;
  }

  .view-more {
    padding: 10px;
    text-align: center;
    background-color: #c0c0c0;
  }

  .mu-card-media {
    img {
      height: 250px;
    }
  }
</style>
