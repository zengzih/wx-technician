// pages/loginMobile/index.js
let timer = null;
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yzmDisabled: false,
    yzmText: '发送验证码',
    formData: {
      mobile: '',
      code: '',
      userType: '',
      openId: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { code, userType, openId } = options;
    this.setData({
      'formData.code': code,
      'formData.userType': userType,
      'formData.openId': openId
    });
  },
  // 验证码
  handleYzm() {
    clearInterval(timer);
    let count = 60;
    this.setData({
      yzmDisabled: true
    });
    timer = setInterval(()=> {
      this.setData({
        yzmText: count + '秒后重新发送'
      });
      count--;
      if (count == 0) {
        clearInterval(timer);
        this.setData({
          yzmText: '发送验证码',
          yzmDisabled: false
        });
      }
    }, 1000)
  },
  
  handleInput(event) {
    const { value } = event.detail;
    this.setData({
      'formData.mobile': value
    })
    
  },
  
  handleSubmit() {
    const { formData } = this.data;
    if(!(/^1[3456789]\d{9}$/.test(formData.mobile))){
      return wx.showToast({
        icon: 'none',
        title: '手机号码格式不正确',
        duration: 1000
      });
    }
    app.store.dispatch('login', formData).then(res=> {
      console.log(res);
      if (res.hasOwnProperty('token')) {
        wx.setStorageSync('token', res.token);
        wx.showToast({
          icon: 'scuccess',
          title: '登录成功',
          duration: 500
        });
        setTimeout(()=> {
          wx.navigateTo({
            url: '../index/index'
          });
        }, 550);
      }
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
});
