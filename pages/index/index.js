//index.js
//获取应用实例
import request from '../../utils/util'
const app = getApp().globalData
Page({
  data: {
   
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tabFixedClass: '',
    tagList: [],
    active: 0,
    listParams: {
      pageNo: 1,
      pageSize: 10,
      tagId: ''
    },
    listPush: [],
    themeList: [],

    // 轮播图的属性
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    
    screenWidth: 0,
    
    // 首页banner图
    bannerList: [],
    // 八大类
    classifyOneList: [],
    // 八大类下面的分类展示
    indexDetail: [],


    // 首页图标
    menuList: [],
    menuIcon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588327739518&di=a8408d5b95418302ab96169377c0cf3e&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F35%2F23%2F79573bd94245f5a.jpg'

    
  },
  onReady: function () {
  },
  onLoad: function (options) {
    this.setData({
      screenWidth: wx.getSystemInfoSync().windowWidth
    });
    // wx.showLoading({
    //   title: '加载中',
    // });
    this.getThemeList();
  },

  getThemeList() {
    app.store.dispatch('getIndexList').then(data => {
      const { bannerList, classifyOneList, indexDetail } = data;
      console.log(this.data.screenWidth)
      this.setData({
        bannerList,
        classifyOneList,
        indexDetail
      });
    })
  },
  
  handleShowAll(event) {
    const { item } = event.currentTarget.dataset;
    wx.navigateTo({
      url: '../themeList/index?id=' + item.classifyOneId
    });
  },

  handleThemeEvent(event) {
    const { theme } = event.currentTarget.dataset;
    wx.navigateTo({
      url: '../themeList/index?id=' + theme.id
    });
  },
  handleSlideTag(event) {
    const { tagIndex, item } = event.currentTarget.dataset;
    this.setData({
      active: tagIndex
    });
    this.setData({
      'listParams.tagId': item.id
    });
    this.getListPush();
  },
  getListPush() {
    let { listParams, listPush } = this.data;
    const { pageNo } = listParams;
    app.store.dispatch('getListPush', listParams).then(data=> {
      if (pageNo == 1) {
        listPush = data;
      } else {
        listPush = listPush.concat(data);
      }
      this.setData({
        listPush
      });
      wx.hideLoading()
    });
  },
  upper() {
  
  },
  lower() {
  
  },
  handleSearch(event) {
    const { value } = event.detail;
    wx.navigateTo({
      url: '../mysharpe/index?search=' + value + '&type=search',
    });
  },
  handleScroll(event) {
  },
  onPullDownRefresh() {
  }
});
