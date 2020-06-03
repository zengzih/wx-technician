const app = getApp().globalData;
class mixinsCredit {
  constructor(self) {
    this.self = self;
    this.getCreditJoin()
    this.getRechargeList()
    this.getVipList()
    self.onTabChange = this.onTabChange.bind(this);
    self.handleVipLevel = this.handleVipLevel.bind(this);
    self.handleSubmit = this.handleSubmit.bind(this);
  }

  handleVipLevel(event) {
    const { index, item } = event.currentTarget.dataset;
    this.self.setData({ activeIndex: index, vipName: item.vipName, amount: item.amount, vipLevel: item });
  }

  onTabChange(event) {
    const { key } = event.detail
    this.self.setData({ 'vipForm.vipLevel': key })
    this.getVipList();
  }

  getRechargeList() {
    app.store.dispatch('getRechargeList').then(res=> {
      console.log(res);
    })
  }

  getVipList() {
    const { vipForm } = this.self.data;
    app.store.dispatch('getVipList', vipForm).then(res=> {
      if (res.length) {
        const first = res[0];
        this.self.setData({ vipName: first.vipName, amount: first.amount, vipLevel: first });
      }
      this.self.setData({ vipList: res })
    })
  }

  handleSubmit() {
    const { id, amount } = this.self.data.vipLevel;
    app.store.dispatch('rechargeVip', { id, vipPrice: amount }).then(res=> {
        wx.showToast({
          title: res,
          icon: 'none',
          duration: 3000
        })
    });
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
    amount: '',
    vipName: '',
    vipList: [],
    activeIndex: 0,
    vipLevel: {},
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