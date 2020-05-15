// pages/detail/index.js
const app = getApp().globalData
const wxParse = require('../../wxParse/wxParse.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    stageList: [],
    stageIndex: -1,
    background: [],
    isCollection: true,
    stageStatus: false,
    iconStyle: '',
    initAnimation: null,
    id: '',
    tabList: [
      { label: '行程描述' },
      { label: '行程安排' },
      { label: '费用说明' },
      { label: '预订须知' }
    ],
    activeIndex: 0,
    animate: null,
    detail: {},
  
    description: {},
    arrangements: {},
    cost: {},
    booking: {},
    tabFixed: false
    
  },
  
  // 滚动
  handleScroll(event) {
    const { scrollTop } = event.detail;
    const query = wx.createSelectorQuery();
    let { tabFixed } = this.data;
    const _this = this;
    query.select('.article').boundingClientRect((rect)=> {
      if (scrollTop >= rect.height - 60) {
        tabFixed = true;
      } else {
        tabFixed = false;
      }
      _this.setData({
        tabFixed
      });
    }).exec();
  },
  
  // 立即报名
  handleSignUp() {
    const { id } = this.data;
    const groupStage = wx.getStorageSync('groupStage');
    if (groupStage.id) {
      wx.navigateTo({
        url: '../signUpDetail/index?id=' + id
      });
    } else {
      wx.showToast({
        icon: 'none',
        title: '请选择团期！',
      });
    }
  },
  
  // 收藏
  handleCollection() {
    const { isCollection } = this.data;
    let action = '';
    if (isCollection) {
      action = 'unFollow';
    } else {
      action = 'follow';
    }
    app.store.dispatch(action, { productId: this.data.id }).then(res=> {
      if (res.success) {
        wx.showToast({
          title: res.message,
          icon: 'success',
          duration: 2000 //持续的时间
        });
        const { isCollection } = this.data;
        this.setData({
          isCollection: !isCollection
        });
      }
    });
  },

  handleDepartData(event) {
    const { item, index: stageIndex } = event.currentTarget.dataset;
    this.setData({
      stageIndex
    });
    wx.setStorageSync('groupStage', item); // 团期
  },
  
  // tab切换
  handleTabEvent(event) {
    const { index, tab } = event.currentTarget.dataset;
    this.setData({
      activeIndex: index
    });
    switch (tab.label) {
      case '行程描述':
        this.tripDescription()
        break;

      case '行程安排':
        this.travelArrangements()
        break;

      case '费用说明':
        this.costsThat();
        break;

      case '预订须知':
        this.bookingInformation();
        break;
    }
   
  },

  // 行程描述
  tripDescription() {
    const { id } = this.data;
    app.store.dispatch('getQueryContent', { id }).then(res=> {
      res = res || {}
      this.setData({
        description: res.description || ''
      });
      wxParse.wxParse('description', 'html', res.description, this, 0)
    });
  },

  // 行程安排
  travelArrangements() {
    const { id:productId } = this.data;
    app.store.dispatch('getListFromPrd', { productId }).then(res=> {
      this.setData({
        arrangements: res
      })
    });
  },

  // 费用说明
  costsThat() {
    const { id } = this.data;
    app.store.dispatch('getQueryExpense', { id }).then(res=> {
      this.setData({
        cost: res || {}
      })
    });
  },

  // 预订须知
  bookingInformation() {
    const { id } = this.data;
    app.store.dispatch('getQueryNotice', { id }).then(res=> {
      let notice = '';
      if (res) {
        notice = res.notice;
      }
      this.setData({
        booking: notice
      });
      // wxParse.wxParse('booking', 'html', notice, this, 0)
    });
  },


  
  // 查看团期
  handleReadStage() {
    let {stageStatus, iconStyle, initAnimation} = this.data;
    stageStatus = !stageStatus
    if (stageStatus) {
      iconStyle = 'transform: rotate(0deg)';
      initAnimation.height('auto');
      initAnimation.opacity(1).step();
    } else {
      iconStyle = 'transform: rotate(180deg)';
      initAnimation.height(0);
      initAnimation.opacity(0).step();
    }
    this.setData({
      iconStyle,
      stageStatus,
      animate: initAnimation.export()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options;
    // const id = 'f7f3843689e411e9909b00163e047c1b';
    this.setData({
      id
    });
    wx.removeStorageSync('groupStage');
    this.getDetail(id);
    this.tripDescription();
  },
  getDetail(id) {
    app.store.dispatch('getThemeDetail', { id }).then(res=> {
      res = res || {};
      let periods = res.periods || [];
      let { isCollection } = this.data;
      if (res.followStatus == '1') {
        isCollection = true;
      } else {
        isCollection = false;
      }
      // wx.setStorageSync('groupStage', periods[0]); // 默认第一个团期
      wx.setStorageSync('productDetail', res);
      this.setData({
        detail: res,
        stageList: periods,
        isCollection
      });
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let { initAnimation } = this.data;
    initAnimation = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease-in'
    });
    this.setData({
      initAnimation
    })
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
