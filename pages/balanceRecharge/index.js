const app = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [],
    maskShow: false,
    currentRow: {
      id: '',
      amount: ''
    },
    balance: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo();
    this.getRechargeList();
  },

  getUserInfo() {
    app.store.dispatch('getUserInfo').then(res=> {
      const { balance } = res;
      this.setData({ balance });
    })
  },

  handleAmount(event) {
    const { value } = event.detail;
    const { currentRow } = this.data;
    currentRow.id = '';
    debugger;
    currentRow.amount = value
    this.setData({ currentRow });
  },

  handleClose() {
    this.setData({ maskShow: false });
  },

  handleSubmit() {
    const { currentRow } = this.data;
     app.store.dispatch('submitRecharge', currentRow).then(res=> {
        wx.showToast({
          icon: 'none',
          title: res,
          duration: 3000
        });
        this.getUserInfo();
        this.setData({ maskShow: false });
    });
  },

  handleCustomRecharge() {
    this.setData({ maskShow: true });
  },

  handleRecharge(event) {
    const { id, incomeAmount } = event.currentTarget.dataset.item;
    const { currentRow } = this.data;
    currentRow.id = id;
    currentRow.amount = incomeAmount;
    this.setData({ currentRow, maskShow: true })
  },

  getRechargeList() {
    app.store.dispatch('getRechargeList').then(data=> {
      this.setData({ data });
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