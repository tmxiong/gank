# 基于react native + redux开发的iOS和安卓干果客户端
> ```react native```的优点想必不用多说,就如同facebook开发react native的宗旨所述,```Learn Once ,Write Anywhere```,只用一套js代码即可同时写出接近原生用户体验的安卓和iOS app.让许多中小互联网企业眼前一亮,给他们带来无限希望与可能.
---
![image](https://github.com/tmxiong/gank/blob/master/screenshots/home.gif)
![image](https://github.com/tmxiong/gank/blob/master/screenshots/fuli.gif)
![image](https://github.com/tmxiong/gank/blob/master/screenshots/mine.gif)

## 功能
### 整体分为```首页```／```福利```/```我的```三个底部tab导航
####  首页：
- [x] ```Android``` & ```iOS``` & ```前端``` & ```休息视频``` & ```瞎推荐``` & ```拓展资源```六个顶部tab分类导航；
- [x] 文章列表可下拉刷新／上拉加载 ；
- [x] 文章详情页可进行```收藏```和```分享```；    
![image](https://github.com/tmxiong/gank/blob/master/screenshots/home.png)

#### 福利页：
- [x] 美女图片列表下拉刷新／上拉加载；
- [x] ```最新```／```随机```两种图片排序方式；
- [x] 点击图片进入图片浏览模式，可```缩放```和```保存```；    
![image](https://github.com/tmxiong/gank/blob/master/screenshots/fuli.png)

#### 我的页：
- [x] 每日同步最新头像；
- [x] 查看```阅读记录```；
- [x] 查看```收藏记录```；
- [x] 关于；
---
## 技术
- [x] **```react-native 0.45.1```**；
- [x] **```react-navigation```**：    
如果你还在用```react-navigator```，那么你就out了，马上使用功能强大等 ```react-navigation```,从此告别页面跳转卡顿，还有丰富的自定义功能，包括顶部／底部导航栏和抽屉等；点击进入[react-navigation官网](https://reactnavigation.org)，点击进入我的[react-navigation小demo](https://github.com/tmxiong/react-navigation)：
- [x] **```redux```** ：    
部分页面传值更新状态的地方用到；

- [x] **```react-native-splash-screen```**:    
当项目越庞大时，需要加载的bundle也越大，app首次启动时白屏时间越长，解决白屏的方法可以是让bundle预加载，或者放置首屏图片遮挡白屏，总之都需要修改原生代码。我用的是第二种方法，并且```react-native-splash-screen```已经给你封装好了，你无需再修改原生代码，直接install即可。鉴于安卓和iOS的差异性，我只在安卓中使用了```react-native-splash-screen```,iOS的xcode中自带很完善的设置首屏图片功能。
- [x] **`react-native-fetch-blob`**:
用于安卓部分的图片下载，iOS 上使用的是`react-native`自带的`CameraRoll`进行图片下载保存。
---
## 计划增加的功能：
- [ ] tab栏的排序／增删功能；
- [ ] 阅读记录／收藏的分类／清空功能；
- [ ] 注册／登录功能（使用nodejs实现）；
- ---
>* app所有数据均来自`api/gank/io`；
>* 如果你有好的意见或建议，欢迎联系`tmxiong@foxmail.com`;
>* 如果本代码对你有所帮助，欢迎`Start`和`Fork`，同时，也不妨捐赠一下，请我喝杯可乐。    
![image](https://github.com/tmxiong/gank/blob/master/screenshots/donation.jpg)
