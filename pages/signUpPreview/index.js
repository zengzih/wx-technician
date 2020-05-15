// pages/signUpDetail/index.js
const app = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    layout: [
      { label: '联系人姓名', prop: 'linkName' },
      { label: '手机号码', prop: 'linkTelephone' },
      { label: '微信号', prop: 'linkWechat' }
    ],
    detail: {
      remark: '',
      linkName: '',
      linkTelphone: '',
      linkWeChat: '',
      enrollment: 1,
      token: '',
      periodId: ''
    },
    groupStage: {},
    productDetail: {},
    signUpData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { remark } = options;
    console.log(options);
    const groupStage = wx.getStorageSync('groupStage'); //  团期
    const productDetail = wx.getStorageSync('productDetail'); // 详情
    const signUpData = wx.getStorageSync('signUpData'); // 报名信
    this.setData({
      productDetail,
      groupStage,
      signUpData
    });
    console.log(groupStage);
    console.log(productDetail);
    console.log(signUpData);
  },
  handleSubmit(prop) {
    const { detail } = this.data;
    const { layout } = this.data;
    app.store.dispatch('signUp').then(res => {
      if (res.success) {
        wx.showToast({
          title: res.message,
          icon: 'success',
          duration: 2000
        });
      }
    });
  },
})