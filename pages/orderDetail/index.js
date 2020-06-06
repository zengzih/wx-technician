// pages/orderDetail/index.js
import { getLocation } from '../../utils/watch';
import { location } from '../../utils/util'
const wxParse = require('../../wxParse/wxParse.js');
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rootLocation: location,
    projectDetailShow: false,
    projectNum: 1,
    defaultImage: '',
    formData: {},
    projectId: '',
    technicianShow: false,
    couponsShow: false,
    weeks: [],
    timeDetail: [],
    timeActiveIndex: -1,
    weekActiveIndex: -1,
    classifyActiveIndex: -1,
    isSignIn: false,
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
      clientRemark: '',
      classifyId: '',
      classifyNum: 1,
      yearMonth: ''
    },
    showTimerBox: false,
    showServiceBox: false,
    couponList: [],
    currentService: {},
    dateStatus: [],
    classId: ''
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

  handlerReadEvaluate() {
    const { classifyId } = this.data.submitFormData
    wx.navigateTo({
      url: '../evaluationList/index?id=' + classifyId
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
    const token = wx.getStorageSync('token');
    if (!token) {
      return wx.navigateTo({
        url: '../login/index'
      });
    }
    if (!this.checkFormSubmit(true)) {
      return false;
    }
    submitFormData.serviceTime = weeks[weekActiveIndex].date;
    submitFormData.serviceId = classifyInfo.id;
    submitFormData.realPrice = formData.price;
    submitFormData.vipDiscount = formData.vipDiscount;
    submitFormData.payPrice = formData.vipPrice;
    submitFormData.workTime = formData.workTime;
    /*
    * userAddrId: 用户地址
    * classifyId: 商品id
    * classifyNum： 购买数量
    * serviceId：服务人员id
    * workTime：服务事件
    * */
    const form = { userAddrId: '', classifyId: '', classifyNum: '', serviceId: '', serviceTime: '' }
    for (let key in form) {
      if (submitFormData.hasOwnProperty(key)) {
        form[key] = submitFormData[key]
      }
    }
    const { yearMonth, classifyDict } = this.data;
    form.serviceTime = yearMonth + ' ' + classifyDict.date.local;
    app.store.dispatch('submitOrderReady', form).then(res=> {
      if (res.code == 200) {
        wx.setStorageSync('orderFormInfo', res.data);
        return wx.navigateTo({
         url: '../confirmOrderForm/index?id=' + projectId
       });
      }
      wx.showToast({
        icon: 'none',
        title: res.message
      })
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { id, classId } = options;
    this.init(id, classId);
    getLocation()
    this.getCouponList()
    this.getWeekList();
    this.getWeekTap();
  },

  // 优惠券
  getCouponList() {
    this.getDetail().then(data=> {
      app.store.dispatch('getCouponList', { price: data.price }).then(res=> {
        let { data } = res;
        data = data || [];
        data.forEach(elt=> {
          elt.receive = false;
        });
        this.setData({ couponList: data })
      })
    })
  },
  
  // 技师点击事件
  handleClassifyClick(event) {
    const { item, index } = event.currentTarget.dataset;
    this.setData({
      classifyActiveIndex: index,
      currentService: item
    });
  },

  // 具体时间的点击事件
  handleTimeClick(event) {
    const { index } = event.currentTarget.dataset;
    const detail = this.data.timeDetail[index];
    // if (detail.type != 2) {
    //   return
    // }
    this.setData({
      timeActiveIndex: index,
      'classifyDict.date': this.data.timeDetail[index],
      date: detail.local
    });
  },
  
  // 星期的点击事件
  handleWeekClick(event) {
    console.log('handleWeekClick', event)
    const { week, index } = event.currentTarget.dataset;
    const { weeks, classifyDict } = this.data;
    classifyDict.weekDay = weeks[index].weekDay;
    this.setData({
      month: weeks[index].monthDay,
      yearMonth: weeks[index].date,
      weekActiveIndex: index
    });
    classifyDict.date = '';
    this.setData({ weeks });
    const { id } = this.data.currentService;
    app.store.dispatch('getServiceTimeAll', { date: week.date, serviceId: id }).then(res=> {
      console.log(res);
      this.setData({ timeDetail: res, classifyDict });
    });
    /*app.store.dispatch('getTimeShow', { date: week.date }).then(res=> {
      classifyDict.date = res[0];
      this.setData({ timeDetail: res, classifyDict });
      // 服务人员列表
      this.getServiceList()
    });*/
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
      // this.handleWeekClick({ currentTarget: { dataset: { index: 0, week: res[0] } } });
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
            distance = parseInt(distance)
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
  
  init(id, classId) {
    const { submitFormData } = this.data;
    const token = wx.getStorageSync('token');
    submitFormData.uid = wx.getStorageSync('uid');
    submitFormData.classifyId = id;
    const dateStatus = [
      { label: '过期', id: 1 },
      { label: '可约', id: 2 },
      { label: '休息', id: 3 },
    ]
    this.setData({
      submitFormData,
      classId,
      isSignIn: token ? true : false,
      projectId: id,
      dateStatus,
      'classifyDict.classifyId': id
    });
  },
  
  getDetail() {
    const { projectId } = this.data;
    return new Promise((resolve)=>{
      app.store.dispatch('getClassifyDetail', { id: projectId }).then(res=> {
        wxParse.wxParse('description', 'html', res.description, this, 0)
        // res.evaluateList = res.evaluateList.slice(2);
        this.setData({
          formData: res
        });
        resolve(res)
      });
    })
  },
  
  // 选择技师
  handleSelectTechnician(event) {
    const { type } = event.currentTarget.dataset;
    const { timeActiveIndex, weekActiveIndex, classifyActiveIndex, timeDetail, weeks, classifyList, classifyInfo, showTimerBox, showServiceBox } = this.data;
    if (type == 'confirm') {
      if (!this.checkFormSubmit()) {
        return false;
      }
      if (showTimerBox) {
        classifyInfo.month = weeks[weekActiveIndex].monthDay;
        classifyInfo.date = timeDetail[timeActiveIndex];
      }
      if (showServiceBox) {
        classifyInfo.name = classifyList[classifyActiveIndex].name;
        classifyInfo.id = classifyList[classifyActiveIndex].id;
        classifyInfo.image = classifyList[classifyActiveIndex].image;
      }
    }
    this.setData({
      technicianShow: false,
      classifyInfo
    });
  },
  
  checkFormSubmit(type) {
    const { timeActiveIndex, classifyActiveIndex,  showTimerBox, showServiceBox } = this.data;
    let check = true;

    if ((showTimerBox || type) && timeActiveIndex < 0) {
      wx.showToast({
        icon: 'none',
        title: '请选择服务时间段！',
      });
      check = false;
    }
    if ((showServiceBox || type) && classifyActiveIndex < 0) {
      wx.showToast({
        icon: 'none',
        title: '请选择服务技师！',
      });
      check = false;
    }
    return check
  },
  
  handleShowTechnician(event) {
    const { type } = event.currentTarget.dataset;
    const { currentService } = this.data;
    if (type == 'selectService') {
      this.setData({
        showServiceBox: true,
        showTimerBox: false,
        technicianShow: true
      });
    }

    if (type == 'selectTime') {
      if(!currentService.id) {
        return wx.showToast({
          icon: 'none',
          title: '请先预约技师'
        })
      }
      this.setData({
        showServiceBox: false,
        showTimerBox: true,
        technicianShow: true
      });
    }
  },

  handleBack() {
    const { classId } = this.data;
    wx.navigateTo({
      url: '../themeList/index?id='+ classId
    });
  },

  /* 领取优惠券  */
  handleReceive(event) {
    const {item} = event;
    const { couponPrice, id } = item;
    const { couponList } = this.data;
    couponList.forEach(elt=> {
      if (elt.id == id) {
        elt.receive = true;
      }
    });
    this.setData({
      'submitFormData.couponPrice': couponPrice,
      'submitFormData.coupon': id,
      couponList
    });
  },

  handleCloseCouponsShow() {
    this.setData({ couponsShow: false });
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
