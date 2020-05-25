// pages/confirmOrderForm/index.js
const app = getApp().globalData;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    back: true,
    address: '',
    location: {},
    submitFormData: {
      uid: '',
      serviceId: '',
      serviceTime: '',
      realPrice: '',
      vipDiscount: '',
      couponPrice: '',
      coupon: '',
      payPrice: '',
      clientAddress: '',
      clientName: '',
      clientPhone: '',
      clientRemark: '',
      classifyId: '',
      classifyNum: ''
    },
    classifyInfo: {},
    productDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options;
    this.init();
    this.getProductInfo();
  },
  
  // input点击事件
  handleInput(event) {
    const { prop } = event.currentTarget.dataset;
    const { value } = event.detail;
    const { submitFormData } = this.data;
    submitFormData[prop] = value;
    this.setData({
      submitFormData
    });
  },
  
  // 查询当前商品的详情
  getProductInfo() {
    const { classifyId } = this.data.submitFormData;
    app.store.dispatch('getClassifyDetail', { id: classifyId }).then(res=> {
      console.log(res)
      this.setData({
        productDetail: res
      });
    });
  },
  
  init() {
    const submitFormData = wx.getStorageSync('submitFormData');
    const classifyInfo = wx.getStorageSync('classifyInfo');
    const { mapLocations } = app;
    this.setData({ submitFormData, classifyInfo, location: mapLocations });
  },
  
  handleSubmit() {
    const { submitFormData } = this.data;
    if (this.getCheckFromData()) {
      app.store.dispatch('submitOrderAdd', submitFormData).then(res=> {
        console.log('-------submit--------', res);
      });
    }
  },
  
  getCheckFromData() {
    const { submitFormData, location } = this.data;
    let { clientName, clientAddress, clientPhone } = submitFormData;
    clientAddress += location.text;
    if (!clientAddress) {
      wx.showToast({
        icon: 'none',
        title: '请填写地址！',
      });
      return false;
    }
    if (!clientName) {
      wx.showToast({
        icon: 'none',
        title: '请填姓名！',
      });
      return false;
    }
    if (!clientPhone) {
      wx.showToast({
        icon: 'none',
        title: '请填写手机号！',
      });
      return false;
    }
    const reg=/^[1][3457869][0-9]{9}$/;
    if (!reg.test(clientPhone)) {
      wx.showToast({
        icon: 'none',
        title: '手机号格式不正确！',
      });
      return false;
    }
    return true;
  },

  handleAddAddress() {
    // 添加地址页面

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
