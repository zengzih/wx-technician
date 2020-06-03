const app = getApp().globalData;
class mixinsCredit {
  constructor(self) {
    this.self = self;
    this.getCreditJoin()
    this.getRechargeList()
    this.getVipList()
    self.onTabChange = this.onTabChange.bind(this)
  }

  onTabChange(event) {
    const { key } = event.detail
    this.self.setData({ 'vipForm.vipLevel': key })
    this.getVipList()
  }

  getRechargeList() {
    app.store.dispatch('getRechargeList').then(res=> {
      console.log(res)
    })
  }

  getVipList() {
    const { vipForm } = this.self.data;
    app.store.dispatch('getVipList', vipForm).then(res=> {
      this.self.setData({ vipList: res })
      console.log('----getVipList----', res)
    })
  }

  getCreditJoin() {
    app.store.dispatch('rechargeVip').then(res=> {
      console.log(res)
    })
  }
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    vipList: [],
    vipForm: {
      vipLevel: 1
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    new mixinsCredit(this)
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