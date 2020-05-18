// pages/login/index.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userType: 1
  },
  handleService() {
    this.setData({
      userType: 2
    });
  },
  handleUser() {
    this.setData({
      userType: 1
    });
  },
  
  
  getUserInfo(res) {
    const { detail } = res;
    const _this = this;
    wx.login({
      success(res) {
        const { code } = res;
        const { userType } = _this.data;
        app.store.dispatch('login', {
          code,
          userType,
          encryptedData: detail.encryptedData,
          iv: detail.iv,
          parentId: ''
        }).then(data=> {
          const { serviceStatus } = data;
          if (!data.hasOwnProperty('token')) {
            return wx.navigateTo({
              url: '../loginMobile/index?code=' + code + '&userType=' + userType + '&openId=' + data.openId
            });
          }
          const { token, sessionKey, uid} = data;
          wx.setStorageSync('token', token);
          wx.setStorageSync('uid', uid);
          wx.setStorageSync('sessionKey', sessionKey);
          wx.navigateBack({
            delta: 1
          });
        });
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})