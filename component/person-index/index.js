//index.js
//获取应用实例
import request, { location as rootLocation } from '../../utils/util'
import { Watch } from '../../utils/watch.js'
const app = getApp().globalData;
Component({
  data: {
    rootLocation: rootLocation,
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
  
    // 位置
    location: '',

    // 首页图标
    menuList: [],
    menuIcon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588327739518&di=a8408d5b95418302ab96169377c0cf3e&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F35%2F23%2F79573bd94245f5a.jpg',

    // 服务人员
    classifyDict: {
      current: 1,
      size: 10,
      classifyId: '',
      addrName: '',
      weekDay: '',
      date: ''
    },
    serviceData: []
    
  },
  onReady: function () {
  },
  attached: function (options) {
    this.parsingLocation();
    this.getThemeList();
    this.getServiceList();
    this.initWatch()
  },
  methods: {
    handleServiceClick(event) {
      const { item } = event.currentTarget.dataset;
      wx.navigateTo({
        url: '../serviceDetail/index?id=' + item.id
      });
    },
    getServiceList() {
      app.store.dispatch('getServiceList', this.data.classifyDict).then(res=> {
        const { records } = res;
        this.setData({ serviceData: records })
      })
    },
    initWatch() {
      new Watch({
        func: (key, value)=> {
          if (key == 'userType') {
            console.log('--------------', key, value)
          }
        }
      })
    },

    getLocation() {
      const _this = this;
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success (res) {
          _this.transformPoint(res.latitude, res.longitude)
        }
      })
    },

    transformPoint(latitude, longitude) {
      const _this = this;
      wx.request({
        url: 'https://api.map.baidu.com/geocoder/v2/?ak=n3vSa43bGAijQgzlY1NBstBTtnDVNbRL&location=' + latitude + ',' + longitude + '&output=json',
        data: {},
        header: {
          'Content-Type': 'application/json'
        },
        success(res) {
          const { city } = res.data.result.addressComponent;
          const { formatted_address } = res.data.result;
          _this.setData({
            location: city
          });
          app.mapLocations.lat = latitude;
          app.mapLocations.lng = longitude;
          app.mapLocations.text = formatted_address;
          wx.setStorageSync('mapLocations', app.mapLocations);
        },
        fail() {
          // page.city = "获取定位失败"
        },
      });
    },

    handleProductDetail(event) {
      const { item } = event.currentTarget.dataset;
      const url = '../orderDetail/index?id=' + item.id;
      wx.navigateTo({
        url
      });
    },

    parsingLocation() {
      const _this = this;
      this.setData({
        screenWidth: wx.getSystemInfoSync().windowWidth
      });
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userLocation']) {
            _this.getLocation()
          } else {
            _this.getLocation()
          }
        }
      });
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
  }
});
