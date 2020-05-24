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
    this.initWatch()
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
});
