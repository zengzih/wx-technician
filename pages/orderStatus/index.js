// pages/orderStatus/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: '',
    status: '',
    image: '',
    btnText: '',
    orderId: ''
  },

  handlePayOrder() {
    wx.navigateTo({
      url: '../myorderList/index'
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { msg, status, orderId } = options;
    let url = '../../image/icon/loginicon.png';
    let btnText = '查看订单';
    if (status == 0) {
      url = '../../image/icon/orderStatus.png';
      btnText = '去支付';
    }
    this.setData({ msg, status, url, btnText, orderId });
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