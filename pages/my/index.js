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
    headerList: [],
    name: '',
    balance: '',
    noPayCommission: '',
    orderNum: '',
    userType: '',
    
    // 底部的菜单分类
    menuList: [],
    token: '',
    couponsShow: false,
    couponList: []
  },


  getCouponList() {
    // 优惠券
    app.store.dispatch('getCouponList').then(data=> {
      console.log(data)
      this.setData({ couponList: data });
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const headerList = [
      { label: '余额', prop: 'balance' },
      { label: '未提现金额', prop: 'noPayCommission' },
      { label: '优惠券数量', prop: 'orderNum' },
    ]
    const orderFormGroup = [
      { label: '全部', icon: 'icon-dingdan', prop: '' },
      { label: '待付款', icon: 'icon-dingdan', prop: 0 },
      { label: '待处理', icon: 'icon-dingdan', prop: 1 },
      { label: '已完成', icon: 'icon-dingdan', prop: 4 },
    ];
  
    this.getCouponList();
    this.setData({
      orderFormGroup,
      headerList
    });
  },

  handleHeaderClick(event) {
    const { item } = event.currentTarget.dataset;
    switch (item.prop) {
      case 'balance':
        wx.navigateTo({
          url: '../myBalance/index'
        });
    }
  },

  handleCloseCouponsShow() {
    this.setData({ couponsShow: false });
  },

  handleMenuClick(event) {
    const { id } = event.currentTarget.dataset;
    switch (id) {
      case 2:
        this.getCouponList()
        this.setData({ couponsShow: true });
        break;
      case 3:
        wx.navigateTo({
          url: '../credit/index'
        })
        break;
      case 4:
        wx.navigateTo({
          url: '../balanceRecharge/index'
        })
        break;

      case 8:
        wx.switchTab({
          url: '../journeyState/index'
        });
        break;
    }
  },

  handleSignIn() {
    const token = wx.getStorageSync('token');
    this.setData({token});
    if (!token) {
      wx.navigateTo({
        url: '../login/index'
      });
    }
  },

  handleLogOut() {
    wx.clearStorage();
    this.onLoad();
  },

  
  getUserInfo() {
    const token = wx.getStorageSync('token');
    this.setData({token});
    if (!token) return;
    app.store.dispatch('getUserInfo').then(res=> {
      console.log(res)
      const { name, balance, noPayCommission } = res;
      this.setMenuList(res)
      this.setData({
        userInfo: res,
        name, balance, noPayCommission
      });
    });
  },

  setMenuList(res) {
    const { utype } = res;
    let menuList = [
      { label: '我的优惠券', id: 2 },
      { label: 'VIP充值', id: 3 },
      { label: '充值有礼', id: 4 }
    ];
    if (utype == 2) {
      menuList = [
        /*{ label: '我的收入', id: 9 },*/
        { label: '接单时间', id: 8 }
      ]
    }
    this.setData({ menuList, userType: utype  })
  },

  handleOrderPanelEvent(event) {
    // 单个的点击事件
    const { item, index } = event.currentTarget.dataset;
    wx.navigateTo({
      url: '../myorderList/index?id=' + item.prop + '&activeIndex=' + index
    })

  },

  handleReadAllOrderForm() {
    wx.navigateTo({
      url: '../myorderList/index'
    });
  },

  handleSwitchRole() {
    const { utype } = this.data.userInfo;
    wx.navigateTo({
      url: '../login/index?source=' + utype
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
