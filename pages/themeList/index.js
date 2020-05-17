// pages/themeList/index.js
const app = getApp().globalData
Page({
  data: {
    back: true,
    tabs: [],
    filterShow: false,
    activeIndex: -1,
    filterData: [],
    queryData: {
      size: 10,
      current: 1
    },
    listData: [],
    scrollType: '',
    triggered: false,
    scrollTop: 0,
    scrollLower: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options;
    const { queryData } = this.data;
    queryData.oneId = 1; //id;
    this.setData({
      queryData
    });
    this.init();
    this.getClassificationList()
  },
  
  getClassificationList() {
    let { queryData, scrollType, listData } = this.data;
    app.store.dispatch('getClassifyDetailList', queryData).then(res=> {
      const { records } = res;
      if (scrollType == 'lower') {
        listData.push(...records);
      }
      if (scrollType == 'upper' || !scrollType) {
        listData = records;
      }
      this.setData({
        listData,
      });
      clearTimeout(timer)
      const timer = setTimeout(()=> {
        this.setData({ scrollLower: false })
      }, 500)
    });
  },
  init() {
    const tabs = [
      { label: '筛选项', id: '' },
      { label: '排序', id: '' }
    ];
    this.setData({
      tabs
    });
  },
  
  // 跳转到详情
  handleSkipDetail(event) {
    const { item } = event.currentTarget.dataset;
    wx.navigateTo({
      url: '../orderDetail/index?id=' + item.id
    });
  },

  // 顶部条件切换
  handleTab(e) {
    const { index, tab } = e.currentTarget.dataset;
    const { activeIndex } = this.data;
    if (index == activeIndex) {
      this.handleCloseFilter();
      return this.setData({
        activeIndex: -1
      });
    }
    this.setData({
      activeIndex: index
    });
    this.getCurrentFilterData(tab)
  },

  // 获取过滤数据
  getCurrentFilterData(tab) {
    let result = [];
    for (let i = 0; i < 5; i++) {
      result.push({ label: tab.label + '牵手手牵手手牵手手', id: i, check: false })
    }
    this.setData({
      filterData: result,
      filterShow: true
    })
  },

  handleFilter(e) {
    const { filter } = e.currentTarget.dataset;
    this.setFilterActive(filter)
  },
  
  setFilterActive(filter) {
    const { filterData } = this.data;
    filterData.forEach(item=> {
      if (item.id == filter.id) {
        item.check = !item.check;
      }
    });
    this.setData({
      filterData
    });
  },




  /*---下拉----*/
  handleScrollUpper() {
    const { queryData } = this.data;
    queryData.current = 1;
    this.setData({
      queryData,
      scrollType: 'upper'
    });
    this.getClassificationList();
    
  },
  
  /*---上拉----*/
  handleScrollLower() {
    const { queryData } = this.data;
    queryData.current += 1;
    this.setData({
      queryData,
      scrollType: 'lower'
    });
    this.getClassificationList();
  },

  // 下拉触发
  onRefresh() {
    this.handleScrollUpper();
    if (this._freshing) return
    this._freshing = true
    setTimeout(() => {
      this.setData({
        triggered: false,
      });
      this._freshing = false
    }, 2000)
  },
  // 下拉复位
  onRestore(event) {
    this.setData({
      scrollLower: false
    });
  },
  // 滚动到底部触发
  handlebScrolltolower() {
    const { scrollLower } = this.data;
    if (scrollLower) {
      return true;
    }
    this.handleScrollLower();
  },
  bindrefresherrestore(event) {
    return true;
  },

  // 重置
  handleReset() {

  },

  // 保存
  handleSave() {

  },

  // 关闭过滤
  handleCloseFilter() {
    this.setData({
      filterShow: false,
      activeIndex: -1
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

  },
  
  scrollToTop() {
    console.log(1111);
    this.setAction({
      scrollTop: 0
    })
  },
})
