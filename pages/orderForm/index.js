// pages/orderForm/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '订单',
    tabs: [],
    activeTab: '0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const tabs = [
      { label: '全部', id: '0' },
      { label: '待付款', id: '1' },
      { label: '待处理', id: '2' },
      { label: '进行中', id: '3' },
      { label: '已完成', id: '4' },
    ];
    this.setData({
      tabs
    });
  },
  
  handleTab(e) {
    const { tab } = e.currentTarget.dataset;
    this.setData({
      activeTab: tab.id
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
