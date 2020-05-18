// pages/my/index.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    // 订单分类
    orderFormGroup: [],
    
    name: '',
    balance: '',
    noPayCommission: '',
    orderNum: '',
    
    // 底部的菜单分类
    menuList: []
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { userInfo } = app;
    const orderFormGroup = [
      { label: '待付款', icon: 'icon-dingdan' },
      { label: '待处理', icon: 'icon-dingdan' },
      { label: '进行中', icon: 'icon-dingdan' },
      { label: '已完成', icon: 'icon-dingdan' },
    ];
  
    const menuList = [
      { label: '我的余额' },
      { label: '我的代金券' },
      { label: '我的评价' },
      { label: '我的关注' },
      { label: '我的足迹' },
      { label: '联系客户' },
    ];
    this.setData({
      userInfo,
      orderFormGroup,
      menuList
    });
    this.getUserInfo()
  },
  
  handleSign() {
    const token = wx.getStorageSync('token');
    if (!token) {
      wx.navigateTo({
        url: '../login/index'
      });
    }
  },
  
  getUserInfo() {
    app.store.dispatch('getUserInfo').then(res=> {
      const { name, balance, noPayCommission } = res;
      this.setData({
        name, balance, noPayCommission
      });
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
    this.getUserInfo();
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
