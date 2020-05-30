// pages/myorderList/index.js
import { location } from '../../utils/util'
const app = getApp().globalData;
// 通过状态查询不同订单 0-待付款 1-待处理 2-进行中 3-已完成
const tabs = [
  { label: '全部', prop: '' },
  { label: '预约单', prop: 0 },
  { label: '待服务', prop: 1 },
  { label: '已完成', prop: 4 }
];

Component({
  /**
   * 页面的初始数据
   */
  properties: {

  },
  data: {
    rootLocation: location,
    tabs: tabs,
    params: {
      size: 10,
      current: 1,
      status: '',
      type: 2
    },
    activeIndex: 0,
    orderData: [],
    confirmReg: '',
    getConfirmShow: '',
    backFunc: ''
  },

  created() {
    this.getOrderList()
  },

  methods: {

    handleTabEvent(event) {
      const {id, index} = event.currentTarget.dataset;
      const {params} = this.data;
      params.status = id;
      this.setData({params, activeIndex: index});
      this.getOrderList();
    },

    getOrderList() {
      debugger;
      const {params} = this.data;
      app.store.dispatch('getOrderList', params).then(data => {
        const {records} = data;
        this.setData({orderData: records});
      });
    },

    handlePayOrder(event) {
      const {item} = event.currentTarget.dataset;
      const {status, id} = item;
      switch (status) {
        case 0:
          this.payOrder(id)
          break
        case 3:
          this.confirmOrder(id)
          break;
        case 4:
          // 评价
          break
      }
    },

    confirmOrder(id) {
      app.store.dispatch('okOrder', {id}).then(res => {
        if (res.code == 200) {
          this.getOrderList()
        }
        wx.showToast({
          icon: 'none',
          title: res.message
        });
      })
    },

    reset_params() {
      const { params } = this.data;
      params.current = 1;
      this.setData({ params });
    },

    payOrder(id) {
      app.store.dispatch('submitOrderPay', {orderId: id, payType: 1}).then(res => {
        console.log(res)
        const {code, message} = res;
        if (code == 200) {
          this.getOrderList()
        }
        wx.showToast({
          title: message,
          icon: 'none',
          duration: 2000
        });
      })
    },

    handleCancelOrder(event) {
      const {item} = event.currentTarget.dataset;
      app.store.dispatch('rejectOrder', { orderId: item.id }).then(res=> {
        if (res.code == 200) {
          this.reset_params();
          return this.getOrderList();
        }
        wx.showToast({
          icon: 'none',
          title: res.message
        })
      })
    },

    // 订单点击
    handleOrderClick(event) {
      const {id} = event.currentTarget.dataset;
      wx.navigateTo({
        url: '../orderFormDetail/index?id=' + id,
      })
    }
  }
})