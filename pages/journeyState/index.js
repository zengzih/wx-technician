//index.js
//获取应用实例
import request from '../../utils/util.js'
import * as actions from '../../utils/store.js'
import { Watch } from '../../utils/watch.js'
const app = getApp().globalData;
Page({
  data: {
    showLocation: false,
    markers: [{
      iconPath: "../../image/icon/Path.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true,
      userType: 1
    }]
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.detail.markerId)
  },
  controltap(e) {
    console.log(e.detail.controlId)
  },

  getCurrentPos() {
    let mpCtx = wx.createMapContext("map");
    mpCtx.moveToLocation();
  },

  onLoad() {
    this.getCurrentPos();
    console.log(app)
    new Watch({
      func: (key, value)=> {
        if (key == 'userType') {
          this.setData({ userType: value });
        }
      }
    });
    this.setData({ userType: app.publicParams.userType })
  }
})