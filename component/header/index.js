// component/header/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '好易家'
    },
    back: {
      type: Boolean
    },
    backFunc: {
      type: Function
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleBack() {
      const { backFunc } = this.data;
      debugger;
      if (typeof(backFunc) == 'function') {
        return backFunc()
      }
      console.log('---------------header-----------------')
      wx.navigateBack({
        delta: 1
      })
    }
  }
})
