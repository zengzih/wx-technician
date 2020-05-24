// component/view-listly/index.js
const app = getApp().globalData
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Array,
      value: []
    },
    viewStyle: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    location: ''
  },
  onLoad() {
    const location = app.location;
    this.setData({
      location
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleViewEvent(event) {
      const {item} = event.currentTarget.dataset;
      wx.navigateTo({
        url: '../detail/index?id=' + item.id
      });
    }
  }
})
