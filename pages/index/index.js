//index.js
//获取应用实例
import request from '../../utils/util'
import { Watch } from '../../utils/watch.js'
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
  },

  getUserInfo() {
    app.store.dispatch('getUserInfo').then(data=> {
      console.log(data)
      let { serviceStatus, utype } = data;
      serviceStatus = 3
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
      debugger;
      app.publicParams.userType = utype
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
});
