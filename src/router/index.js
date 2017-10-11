import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Index from '../pages/Index.vue'
import Detail from '../pages/Detail.vue'
import Theme from '../pages/Theme.vue'
import Comment from '../pages/CommentDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    }, {
      path: '/',
      name: 'Index',
      component: Index
    },{
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/theme/:id',
      name: 'Theme',
      component: Theme
    },
    {
      path: '/comment/:id',
      name: 'Comment',
      component: Comment
    },
  ]
})
