// pages/loginCheck/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moreText: '',
    moreText1: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { type } = options;
    let { moreText, moreText1 } = this.data;
    if (type == 'check') {
      moreText = '提交成功，请等待工作人员审核';
      moreText1 = '工作人员将会在24小时内审核您的注册信息，敬请留意审核进度！';
    }
    if (type == 'error') {
      moreText = '您的资料审核失败！';
    }
    this.setData({
      moreText,
      moreText1
    });
  },
  
  handleBackHome() {
    wx.switchTab({
      url: '../index/index'
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
