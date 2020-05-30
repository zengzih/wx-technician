// pages/myorderList/index.js
const app = getApp().globalData;
// 通过状态查询不同订单 0-待付款 1-待处理 2-进行中 3-已完成
const tabs = [
 /* { label: '全部', prop: '' },*/
  { label: '待支付', prop: '0' },
  { label: '待处理', prop: '1' },
  { label: '进行中', prop: '2' },
  { label: '待确认', prop: '3' },
  { label: '已完成', prop: '4' },
  { label: '已取消', prop: '5' }
];

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: tabs,
    params: {
      size: 10,
      current: 1,
      status: '',
      type: 1
    },
    activeIndex: 0,
    orderData: [],
    confirmReg: '',
    getConfirmShow: ''
  },

  handleTabEvent(event) {
    const { id, index } = event.currentTarget.dataset;
    const { params } = this.data;
    params.status = id;
    this.setData({ params, activeIndex: index  });
    this.getOrderList();
  },

  getOrderList() {
    const { params } = this.data;
    app.store.dispatch('getOrderList', params).then(data=>{
      const { records } = data;
      this.setData({ orderData: records });
    })
  },

  handlePayOrder(event) {
    const { item } = event.currentTarget.dataset;
    const { status, id } = item;
    switch (status) {
      case 0:
        this.payOrder(id)
        break
      case 3:
        this.confirmOrder(id)
        break;
      case 4:
        // 评价
        break
    }
  },

  confirmOrder(id) {
    app.store.dispatch('okOrder', { id }).then(res=> {
      if (res.code == 200) {
        this.getOrderList()
      }
      wx.showToast({
        icon: 'none',
        title: res.message
      });
    })
  },

  payOrder(id) {
    app.store.dispatch('submitOrderPay', { orderId: id, payType: 1 }).then(res=> {
      console.log(res)
      const { code, message } = res;
      if (code == 200) {
        this.getOrderList()
      }
      wx.showToast({
        title: message,
        icon: 'none',
        duration: 2000
      });
    })
  },

  handleCancelOrder(event) {
    const { item } = event.currentTarget.dataset;
    const { status } = item;
    let url = ''
    switch (status) {
      case 0:
        url = '';
        break

      case 3:
        // 评价
        break;
    }
  },

  // 订单点击
  handleOrderClick(event) {
    const { id } = event.currentTarget.dataset;
    wx.navigateTo({
      url: '../orderFormDetail/index?id=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { confirmReg, getConfirmShow } = this.data;
    this.setData({
      getConfirmShow: function (item) {
        console.log(111)
        console.log(item)
      }
    })
    this.getOrderList();
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