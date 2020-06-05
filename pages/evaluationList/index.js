import {$startWuxRefresher, $stopWuxLoader, $stopWuxRefresher} from "../../miniprogram_npm/wux-weapp/index";

const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      size: 10,
      current: 1,
      classifyId: '',
      serviceId: ''
    },
    evaluateList: [],
    scrollTop: 0,
    bool_load: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options;
    this.setData({ 'form.classifyId': id })
    this.getEvaluateList()
    $startWuxRefresher()
  },

  getEvaluateList() {
    return new Promise((resolve, reject)=> {
      app.store.dispatch('getEvaluateList', this.data.form).then(res=> {
        res = res || []
        const { evaluateList } = this.data;
        if (!res.length) {
          this.setData({ bool_load: false });
        }
        evaluateList.push(...res);
        this.setData({ evaluateList })
        resolve(res)
      })
    })
  },

  onPageScroll(e) {
    console.log('--------onPageScroll----------', e.scrollTop)
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  onRefresh() {
    this.reset_params()
    this.getEvaluateList().then(() => {
      console.log('------refresh-----', this)
      $stopWuxRefresher()
    })
  },

  reset_params() {
    const { form } = this.data;
    form.current = 1;
    this.setData({ form, evaluateList: [] });
  },

  onPulling() {
    console.log('-------onPulling-------')
  },

  onLoadmore() {
    console.log('------onLoadmore---------')
    if (this.bool_load) {
      const { form } = this.data;
      form.current += 1;
      this.setData({ form })
      this.getEvaluateList().then((data) => {
        if (data.length) {
          $stopWuxLoader()
        } else {
          console.log('------一滴也没有了-------')
          $stopWuxLoader('#wux-refresher', this, true)
        }
      })
    }
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