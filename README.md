# 知乎日报

## 使用到的技术
*  vue2.0
*  axios
*  less
*  muse-ui
*  cordova

使用vue脚手架，使用muse样式库，写的知乎日报手机端，但是发现使用cordova打包生成的apk，不能获取到数据

经测试才发现，当初写手机端时候，修改了proxyTable{...},才实现了接口的访问，这才是重点

删掉删掉，app直接调接口就能实现访问。这~   我得用两个版本了

一个web版本用于看效果，一个就是改吧改吧用于打包生成apk的版本

这叫人情何以堪

如何把vue项目改成可以供cordova打包的项目，网上有方法

ok，没什么技术含量

### 声明

本项目所有文字图片等稿件内容均由 知乎 提供，获取与共享之行为或有侵犯知乎权益的嫌疑。若被告知需停止共享与使用，本人会及时删除整个项目。

### 运行截图
![1](https://github.com/1008611/vue-zhihu/blob/master/img/1.png)
![2](https://github.com/1008611/vue-zhihu/blob/master/img/2.png)
![3](https://github.com/1008611/vue-zhihu/blob/master/img/3.png)
![4](https://github.com/1008611/vue-zhihu/blob/master/img/4.png)
![5](https://github.com/1008611/vue-zhihu/blob/master/img/5.png)

``` dependencies
"dependencies": {
    "axios": "^0.16.2",
    "less": "^2.7.2",
    "less-loader": "^4.0.5",
    "muse-ui": "^2.1.0",
    "vue": "^2.4.2",
    "vue-awesome-swiper": "^2.6.4",
    "vue-router": "^2.7.0"
  },
```
##### 未完待续
