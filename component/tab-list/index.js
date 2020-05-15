// component/tab-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Array,
      value: []
    },
    listStyle: {
      type: String,
      value: ''
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
    handleClickEvent(event) {
      const { item } = event.currentTarget.dataset;
      this.triggerEvent('tabevent', item);
    }
  }
})
