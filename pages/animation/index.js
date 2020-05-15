// pages/animation/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶'
    }, {
      value: '选项3',
      label: '蚵仔煎'
    }, {
      value: '选项4',
      label: '龙须面'
    }, {
      value: '选项5',
      label: '北京烤鸭'
    }],
    toggle: true,
    animateinit: null,
    animate: null,
    show: true,
    style: '',
    height: 0,
    title: '展开'
  },

  handleToggle() {
    let { title, show, style, height, animate, animateinit } = this.data
    show = !show
    if (show) {
      title = '展开';
      // style = `height: ${height};transition: all 0.2s linear`
      animateinit.height('auto')
      animateinit.opacity(1).step()
    } else {
      title = '收起';
      animateinit.height(0)
      animateinit.opacity(0).step()
      // style = 'height: 0; transition: all 0.2s linear'
    }
    this.setData({
      animate: animateinit.export(),
      show,
      title
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { animateinit, style, height, list } = this.data;
    height = list.length * 100 + 'rpx'
    animateinit = wx.createAnimation({
      duration: 100, // 动画执行时间
      timingFunction: 'ease-in' // 动画执行效果
    });
    this.setData({
      height,
      animateinit
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
})