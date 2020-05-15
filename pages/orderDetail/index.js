// pages/orderDetail/index.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectDetailShow: false,
    projectNum: 1,
    defaultImage: '',
    formData: {},
    projectId: 100,
    technicianShow: false,
    weeks: []
  },
  
  // 选择项目
  selectProject() {
    this.setData({
      projectDetailShow: true
    });
  },
  
  projectDetailClose() {
    this.setData({
      projectDetailShow: false
    });
  },
  
  handleAdd() {
    let { projectNum } = this.data;
    projectNum += 1;
    this.setData({
      projectNum
    });
  },
  
  handleMinus() {
    let { projectNum } = this.data;
    projectNum -= 1;
    if (projectNum < 1) {
      projectNum = 1
    }
    this.setData({
      projectNum
    });
  },
  
  // 选择项目中的立即购买
  handleDetailSubmit() {
    const { projectId } = this.data;
    wx.navigateTo({
      url: '../confirmOrderForm/index?id=' + projectId
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options;
    this.setData({
      projectId: id || 100
    });
    this.getLocation();
    this.init();
    this.getDetail()
  },
  
  // 获取当前的位置
  getLocation() {
    wx.getLocation({
      type: 'wgs84',
      success (res) {
        console.log(res)
        const latitude = res.latitude // 纬度
        const longitude = res.longitude // 经度
        const speed = res.speed
        const accuracy = res.accuracy
      }
    })
  },
  
  init() {
    const weeks = [
      { label: '今天', date: '05-13', active: true, activeVal: '13' },
      { label: '今天', date: '05-14' },
      { label: '今天', date: '05-15' },
      { label: '今天', date: '05-16' },
      { label: '今天', date: '05-17' }
    ];
    this.setData({
      weeks
    });
  },
  
  getDetail() {
    const { projectId } = this.data;
    app.store.dispatch('getClassifyDetail', { id: projectId }).then(res=> {
      this.setData({
        formData: res
      });
    });
  },
  
  // 选择技师
  handleSelectTechnician(event) {
    const { type } = event.currentTarget.dataset;
    this.setData({
      technicianShow: false
    });
  },
  
  handleShowTechnician() {
    this.setData({
      technicianShow: true
    });
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
