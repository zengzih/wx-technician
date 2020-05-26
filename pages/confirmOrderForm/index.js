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
    productDetail: {},

  },

  /**
   * 生命周期函数--监听页面加载
   * address: "广东省深圳市宝安区创业一路"
     defaultStatus: 1
     id: 10
     name: "周星星"
     phone: "18400000000"
     remark: "机场东"
   *
   */
  onLoad: function (options) {
    this.init();
    this.init_member_address(options)
    this.getProductInfo();
  },

  init_member_address(options) {
    const { id, clientName, clientPhone, clientAddress, clientRemark } = options;
    if (clientName && clientPhone && clientAddress && clientRemark) {
      this.setData({
        'submitFormData.clientName': clientName,
        'submitFormData.clientPhone': clientPhone,
        'submitFormData.clientAddress': clientAddress,
        'submitFormData.clientRemark': clientRemark,
      });
    }
  },

  getDefaultAddress() {
    app.store.dispatch('getAddressList').then(data=> {
      const { records } = data;
      if (records.length) {
        records.forEach(elt=> {
          if (elt.defaultStatus) {
            this.setData({
              'submitFormData.clientName': elt.name,
              'submitFormData.clientPhone': elt.phone,
              'submitFormData.clientAddress': elt.address,
              'submitFormData.clientRemark': elt.remark
            })
          }
        })
      }
    });
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
    let { classifyId } = this.data.submitFormData;
    classifyId = 100
    app.store.dispatch('getClassifyDetail', { id: classifyId }).then(res=> {
      console.log(res)
      this.setData({
        productDetail: res
      });
    });
  },
  
  init() {
    const orderFormInfo = wx.getStorageSync('orderFormInfo');
    const { mapLocations } = app;
    this.setData({ submitFormData: orderFormInfo, location: mapLocations });
  },
  
  handleSubmit() {
    const { submitFormData } = this.data;
    const param = this.getRequestParams(submitFormData)
    console.log(param)
    return
    if (this.getCheckFromData()) {
      app.store.dispatch('submitOrderAdd', submitFormData).then(res=> {
        console.log('-------submit--------', res);
      });
    }
  },

  getRequestParams(submitFormData) {
    const params = {
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
    };
    for (let key in submitFormData){
      if (params.hasOwnProperty(key)) {
        params[key] = submitFormData[key]
      }
    }
    return params;
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
    // 选择地址页面
    wx.navigateTo({
      url: '../manageAddress/index'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    console.log(options)
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
