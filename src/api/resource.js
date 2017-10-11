
import {
  API_ROOT,
} from './config.js'

let zhihu ={
  Latest:'news/latest',
  LatestDetail:'news',
  SearchNews:'news/before',
  Comments:'story-extra',
  ThemesList:'themes',
  ThemesDetail:'theme',
  LongComments:'story',
}
export const Latest = API_ROOT.concat(zhihu.Latest)
export const LatestDetail = API_ROOT.concat(zhihu.LatestDetail)
//过往消息   11 月 18 日的消息，before 后的数字应为 20131119
export const SearchNews = API_ROOT.concat(zhihu.SearchNews)
//新闻额外信息
export const Comments = API_ROOT.concat(zhihu.Comments)
export const ThemesList = API_ROOT.concat(zhihu.ThemesList)
export const ThemesDetail = API_ROOT.concat(zhihu.ThemesDetail)
export const LongComments = API_ROOT.concat(zhihu.LongComments)
// export const ShortComments = API_ROOT.concat(zhihu.ShortCommentList)
//
// //热门消息
export const HotNews = 'api/news/hot'
