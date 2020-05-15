// pages/settingInfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '设置',
    back: true,
    settings: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const settings = [
      { label: '修改密码' },
      { label: '帮助中心' },
      { label: '隐私政策' },
      { label: '用户协议' },
      { label: '关于我们' }
    ];
    this.setData({
      settings
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
