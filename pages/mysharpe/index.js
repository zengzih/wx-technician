// pages/mysharpe/index.js
const app = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [],
    back: true,
    title: '',
    type: '',
    viewStyle: 'margin-bottom: 10rpx;',
    params: {
      pageNo: 1,
      pageSize: 10,
      productName: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { type, search: productName } = options;
    this.setData({
      'params.productName': productName,
      type
    });
    this.getFavorite();
  },

  handleSearch(event) {
    const { value } = event.detail;
    this.setData({
      productName: value,
      pageNo: 1
    });
    this.getFavorite();
  },

  getFavorite() {
    let { params, type, data } = this.data;
    let action = '';
    let title = '';
    if (type == 'search') {
      action = 'getListBrief'
      title = '查询结果';
    } else {
      action = 'getMyFavorite'
      title = '我的收藏';
    }
    this.setData({
      title
    });
    app.store.dispatch(action, params).then(res=> {
      const { records } = res || [];
      if (params.pageNo == 1) {
        data = records;
      } else {
        data = data.concat(records);
      }
      this.setData({
        data
      });
    });
  },

  handleLower() {
    console.log('-----upper-------');
    const { params } = this.data;
    params.pageNo += 1;
    this.setData({
      params
    });
    this.getFavorite();
  },
  
  handleUpper() {
    console.log('----lower-----');
    const { params } = this.data;
    params.pageNo = 1;
    this.setData({
      params
    });
    this.getFavorite();
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