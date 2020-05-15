// pages/note/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    note: '',
    isError: false
  },

  handleSubmitNote() {
    let { note, isError } = this.data;
    if (!note) {
      isError = true;
      this.setData({
        isError
      });
      return;
    }
    wx.setStorageSync('note', note);
    wx.navigateTo({
      url: '../signUpDetail/index'
    });
  },

  handleInput(event) {
    const { value } = event.detail;
    this.setData({
      isError: !value,
      note: value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const noteVal = wx.getStorageSync('note') || '';
    const { note } = this.data;
    this.setData({
      note: noteVal
    });
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