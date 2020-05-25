// pages/manageAddress/index.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddressList()
  },

  getAddressList() {
    app.store.dispatch('getAddressList').then(data=> {
      const { records } = data;
      this.setData({ addressData: records })
    });
  },

  handleClick(event) {
    const { id } = event.currentTarget.dataset;
    wx.navigateTo({
      url: '../addAddress/index?id=' + id
    })
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
    this.getAddressList()
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