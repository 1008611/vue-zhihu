import axios from 'axios'

axios.defaults.withCredentials = true
// axios.defaults.timeout = 5000
//
// 添加请求拦截器
axios.interceptors.request.use(
  response => {
    console.log('请求成功：')
    return response
  },
  error => {
    console.log('请求失败：')
    return Promise.reject(error)
  }
)


// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    console.log('响应成功：' + response)
    return response
  },
  error => {
    console.log('相应失败')
    return Promise.reject(error)
  }
)

//-----------------华丽丽的的分割线---------------------------------
//
import {
  Latest,
  LatestDetail,
  SearchNews,
  Comments,
  ThemesList,
  ThemesDetail,
  LongComments,
  HotNews
} from './resource'

export default {
  //防盗链图片处理
  attachImageUrl(body) {
    return body.replace(/src="http\w{0,1}:\/\//g, 'src="https://images.weserv.nl/?url=')
  },
  getLatest() {
    return axios.get(Latest)
  },
  getLatestDetail(id) {
    return axios.get(LatestDetail + "/" + id)
  },
  getSearchNews(id) {
    return axios.get(SearchNews + "/" + id)
  },
  getComments(id) {
    return axios.get(Comments + "/" + id)
  },
  getThemesList() {
    return axios.get(ThemesList)
  },
  getThemesDetail(id) {
    return axios.get(ThemesDetail+'/'+id)
  },

  getLongComments(id) {
    return axios.get(LongComments+'/'+id+'/long-comments')
  },
  getShortComments(id) {
    return axios.get(LongComments+'/'+id+'/short-comments')
  },

  getHotNews() {
    return axios.get(HotNews)
  },

  getInternet(){
    return axios.get('http://192.168.15.14:9090/bi/hello')
  },

  getInternet2(){
    return axios.get('https://news-at.zhihu.com/api/4/news/latest')
  },
}
