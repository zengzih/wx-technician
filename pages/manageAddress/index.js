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
      if (!records.length) {
        url: '../addAddress/index?type=edit'
      }
      this.setData({ addressData: records })
    });
  },

  handleEditAddress(event) {
    const { id } = event.currentTarget.dataset;
    wx.navigateTo({
      url: '../addAddress/index?id=' + id + '&type=edit'
    })
  },

  handleAddAddress() {
    wx.navigateTo({
      url: '../addAddress/index?type=edit'
    })
  },

  /*
  * address: "广东省深圳市宝安区创业一路"
    defaultStatus: 1
    id: 10
    name: "周星星"
    phone: "18400000000"
    remark: "机场东"
    uid: 123
  *
  * */

  // 选择地址
  handleSelect(event){
    const { item } = event.currentTarget.dataset;
    wx.setStorageSync('addressDetail', item)
   /* wx.navigateTo({
      url: '../confirmOrderForm/index?clientAddress=' + item.address + '&clientName=' + item.name + '&clientPhone=' + item.phone + '&clientRemark=' + item.remark + '&addressId=' + item.id
    })*/
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