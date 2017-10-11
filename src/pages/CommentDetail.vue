<template>
  <div class="comment">

    <div class="header">
      <mu-appbar :title="count+'条点评'">
        <mu-icon-button icon="close" slot="left" @click="goback"/>
        <mu-icon-button icon="touch_app" slot="right"/>
      </mu-appbar>
    </div>

    <mu-list>
      <mu-sub-header>{{LongCommentList.length}} 条长评</mu-sub-header>
      <template v-for="(item,index) in LongCommentList">
        <mu-list-item :title="item.author">
          <mu-avatar v-if="item.avatar" :src="attachImageUrl(item.avatar)" slot="leftAvatar"/>
          <mu-card>
            <mu-card-text>{{item.content}}</mu-card-text>
          </mu-card>
        </mu-list-item>
        <mu-divider/>
      </template>
    </mu-list>

    <div @click="showShortComments">
      <mu-sub-header>{{count - LongCommentList.length}} 条短评</mu-sub-header>
    </div>
    <mu-list v-show="showShort">
      <template v-for="(item,index) in ShortCommentList">
        <mu-list-item :title="item.author">
          <mu-avatar v-if="item.avatar" :src="attachImageUrl(item.avatar)" slot="leftAvatar"/>
          <mu-card>
            <mu-card-text>{{item.content}}</mu-card-text>
          </mu-card>
        </mu-list-item>
        <mu-divider/>
      </template>
    </mu-list>

  </div>
</template>

<script>
  import api from '../api/index'

  export default {
    name: 'comment',
    data() {
      return {
        id: '',
        count: '',
        LongCommentList: [],
        ShortCommentList: [],
        showShort: false
      }
    },

    created() {
      this.id = this.$route.params.id
      this.count = this.$route.params.count
      this.initData()
    },
    methods: {
      goback() {
        this.$router.go(-1)
      },
      //对图片url进行转化
      attachImageUrl: function (srcUrl) {
        if (srcUrl !== undefined) {
          return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
        }
      },
      initData() {
        let self = this
        api.getLongComments(self.id).then((response) => {
          console.log(response)
          self.LongCommentList = response.data.comments
        })
      },

      showShortComments() {
        console.log('123132')
        let self = this
        self.showShort = !self.showShort
        api.getShortComments(self.id).then((response) => {
          console.log(response)
          self.ShortCommentList = response.data.comments
        })
      },
    },

  }
</script>

<style lang="less">
  .comment{
    .mu-card {
      margin-top: 15px;
    }
  }



</style>
