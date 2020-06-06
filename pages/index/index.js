//index.js
//获取应用实例
import request from '../../utils/util'
import { Watch, getLocation } from '../../utils/watch.js'
const app = getApp().globalData;
Page({
  data: {
    userType: 1
  },
  onReady: function () {
  },
  onLoad: function (options) {
    this.getUserInfo()
    this.initWatch()
    getLocation()
  },

  getUserInfo() {
    app.store.dispatch('getUserInfo').then(data=> {
      let { serviceStatus, utype } = data;
      if (serviceStatus == 2) {
        return wx.navigateTo({
          url: '../loginCheck/index?type=check',
        })
      }

      if (serviceStatus == -1) {
        return wx.navigateTo({
          url: '../loginCheck/index?type=error',
        })
      }
      app.publicParams.userType = utype
      wx.setStorageSync('userInfo', data);
      this.setData({ userType: utype })
    });
  },

  initWatch() {
    const self = this;
    new Watch({
      func: (key, value)=> {
        if (key == 'userType') {
          self.setData({
            userType: value
          });
        }
      }
    })
  },
  onShow() {
    const userType = wx.getStorageSync('userType');
    if (userType == 2) {
      wx.setTabBarItem({
        index: 0,
        text: '我的订单',
      })
    }
    if (userType == 1) {
      wx.setTabBarItem({
        index: 0,
        text: '首页',
      })
    }
  }
});
