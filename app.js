//app.js
import store from './utils/store'
import { location, global } from './utils/util'
App({
  onLaunch: function () {
    const app_id = 'wx8567c0f287f8d7f5'
    const app_secret = '85d32a4c0a89b2a69ca830c28cdf886f'
    const _this = this
    /*wx.login({
      success(res) {
        wx.setStorageSync('loginData', res);
        wx.getSetting({
          success(setRes) {
            // 判断是否已授权
            if (!setRes.authSetting['scope.userInfo']) {
              // 授权访问
              wx.navigateTo({
                url: '../userInfo/index',
              });
            } else {
              //获取用户信息
              _this.getUserInfo(res.code)
            }
          }
        });
      }
    });*/
  },
  getUserInfo(code) {
    //获取用户信息
    const _this = this
    wx.getUserInfo({
      lang: 'zh_CN',
      success(userRes) {
        //发起网络请求
        _this.globalData.userInfo = userRes.userInfo
        store
          .dispatch('getUserInfo', {
            code,
            encryptedData: userRes.encryptedData,
            iv: userRes.iv,
          })
          .then((res) => {
            // wx.setStorageSync('token', res ? res.data : '');
            _this.globalData.token = res ? res.data : ''
          })
      },
    })
  },
  globalData: {
    location,
    global,
    userInfo: null,
    token: '',
    store,
    userType: '',
    mapLocations: {
      lat: '',
      lng: '',
      text: '',
    },
    publicParams: {
      userType: ''
    },
    mobile: '',
  },
  onShow() {
    console.log(this.route)
  },
})
