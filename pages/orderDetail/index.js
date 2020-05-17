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
    weeks: [],
    timeDetail: [],
    timeActiveIndex: -1,
    weekActiveIndex: -1,
    classifyActiveIndex: -1,
    classifyDict: {
      current: 1,
      size: 10,
      classifyId: '',
      addrName: '',
      weekDay: '',
      date: ''
    },
    classifyInfo: {
      name: '',
      month: '',
      date: '',
      image: '',
      id: ''
    },
    classifyList: [],
    submitFormData: {
      uid: '',
      serviceId: '',
      serviceTime: '',
      realPrice: '',
      vipDiscount: '',
      couponPrice: '',
      coupon: '',
      payPrice: '',
      clientAddress: '',
      clientName: '',
      clientPhone: '',
      clientRemark: '2222',
      classifyId: '',
      classifyNum: 1
    }
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
    const { projectId, formData, submitFormData, timeActiveIndex, weekActiveIndex, classifyActiveIndex, timeDetail, weeks, classifyList, classifyInfo } = this.data;
    // app.store.dispatch('add', {  })
    if (!this.checkFormSubmit()) {
      return false;
    }
    submitFormData.serviceTime = weeks[weekActiveIndex].date;
    submitFormData.serviceId = classifyInfo.id;
    submitFormData.realPrice = formData.price;
    submitFormData.vipDiscount = formData.vipDiscount;
    submitFormData.payPrice = formData.vipPrice;
    wx.setStorageSync('submitFormData', submitFormData);
    wx.setStorageSync('classifyInfo', classifyInfo);
    wx.navigateTo({
      url: '../confirmOrderForm/index?id=' + projectId
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { id } = options;
    this.setData({
      projectId: id,
      'classifyDict.classifyId': id
    });
    this.getLocation();
    this.init(id);
    this.getDetail();
    // this.getServiceList();
    this.getWeekList();
    this.getWeekTap();
  },
  
  // 技师点击事件
  handleClassifyClick(event) {
    const { item, index } = event.currentTarget.dataset;
    this.setData({
      classifyActiveIndex: index
    });
  },
  
  
  // 具体时间的点击事件
  handleTimeClick(event) {
    const { index } = event.currentTarget.dataset;
    this.setData({
      timeActiveIndex: index,
      'classifyDict.date': this.data.timeDetail[index],
      date: this.data.timeDetail[index]
    });
    this.getServiceList();
  },
  
  // 星期的点击事件
  handleWeekClick(event) {
    const { week, index } = event.currentTarget.dataset;
    const { weeks, classifyDict } = this.data;
    classifyDict.weekDay = weeks[index].weekDay;
    this.setData({
      month: weeks[index].monthDay,
      weekActiveIndex: index
    });
    classifyDict.date = '';
    this.setData({ weeks });
    app.store.dispatch('getTimeShow', { date: week.date }).then(res=> {
      classifyDict.date = res[0];
      this.setData({ timeDetail: res, classifyDict });
      // 服务人员列表
      this.getServiceList()
    });
  },
  
  // 获取星期
  getWeekTap() {
    app.store.dispatch('getWeekTap').then(res=>{
      if (res.length) {
        res[0].active = true;
      } else {
        return;
      }
      this.setData({
        weeks: res
      });
      this.handleWeekClick({ currentTarget: { dataset: { index: 0, week: res[0] } } });
      this.setData({
        'classifyDict.weekDay': res[0].weekDay,
        'classifyDict.date': res[0].date,
      });
      this.getServiceList()
    });
  },
  
  // 获取服务人员列表
  getServiceList() {
    const { mapLocations } = app;
    app.store.dispatch('getServiceList', this.data.classifyDict).then(res=> {
      console.log(res); // records
      const records = res.records || [];
      records.forEach(elt=> {
        if (elt.addrX && elt.addrY) {
          let distance = app.global.distance(mapLocations.lat, mapLocations.lng, elt.addrY, elt.addrX);
          if (distance) {
            distance = distance.toFixed(2)
          }
          elt.distance = distance
        }
      });
      this.setData({
        classifyList: res.records || []
      });
    });
  },
  
  // 获取时间
  getWeekList() {
    app.store.dispatch('getWeekList').then(res=> {
      console.log(res)
    });
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
  
  init(id) {
    const { submitFormData } = this.data;
    submitFormData.uid = wx.getStorageSync('uid');
    debugger;
    submitFormData.classifyId = id;
    this.setData({
      submitFormData
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
    const { timeActiveIndex, weekActiveIndex, classifyActiveIndex, timeDetail, weeks, classifyList, classifyInfo } = this.data;
    if (type == 'confirm') {
      if (!this.checkFormSubmit()) {
        return false;
      }
      classifyInfo.month = weeks[weekActiveIndex].monthDay;
      classifyInfo.date = timeDetail[timeActiveIndex];
      classifyInfo.name = classifyList[classifyActiveIndex].name;
      classifyInfo.id = classifyList[classifyActiveIndex].id;
      classifyInfo.image = classifyList[classifyActiveIndex].image;
    }
    this.setData({
      technicianShow: false,
      classifyInfo
    });
  },
  
  checkFormSubmit() {
    const { timeActiveIndex, weekActiveIndex, classifyActiveIndex, timeDetail, weeks, classifyList, classifyInfo } = this.data;
    let check = true;
    if (timeActiveIndex < 0) {
      wx.showToast({
        icon: 'none',
        title: '请选择服务时间段！',
      });
      check = false;
    }
    if (classifyActiveIndex < 0) {
      wx.showToast({
        icon: 'none',
        title: '请选择服务技师！',
      });
      check = false;
    }
    return check
  },
  
  handleShowTechnician() {
    this.setData({
      technicianShow: true
    });
  },

  handleBack() {
    wx.navigateBack({
      delta: 1
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
