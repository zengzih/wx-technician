// pages/technicianList/index.js
const app = getApp().globalData;
import {location} from '../../utils/util'

class mixinsService {
  constructor(self) {
    self.handleServiceClick = this.handleServiceClick
    self.serviceData = []
    this.self = self
    this.getService();
  }
  getService() {
    const { params } = this.self.data;
    app.store.dispatch('getServiceList', params).then(res=> {
      console.log(res)
    });
  }
  reset_params() {
    const params = {
      size: 9,
      current: 1,
      classifyId: '',
      classifyOneId: '',
      addrName: ''
    };
    this.self.setData({ params })
  }
  handleServiceClick(event) {
      const { item } = event.currentTarget.dataset;
      console.log(item)
  }
}


class mixinsProduct {
  constructor(self) {
    this.self = self;
  }
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    params: {
      size: 9,
      current: 1,
      classifyId: '',
      classifyOneId: '',
      addrName: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    new mixinsService(this);
    new mixinsProduct(this);
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