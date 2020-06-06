const app = getApp().globalData;
import { location } from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rootLocation: location,
    productForm: {
      oneId: '',
      size: 10,
      current: 1,
      serviceId: 112
    },
    form: {
      serviceId: 112,
      ifPrivate: 1
    },
    statement: [],
    dataInfo: {},
    dataAddress: {},
    dataVideo: [],
    listData: [],
    dataPhoto: [],
    distance: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init_data(options)
    this.getServiceAddress();
    this.getServiceInfo();
    this.getPublicPictures();
    this.getVideo()
  },

  getVideo() {
    app.store.dispatch('getVideo').then(res=> {
      this.setData({ dataVideo: res });
    });
  },

  getProductList() {
    const { productForm } = this.data;
    app.store.dispatch('getClassifyDetailList', productForm).then(res=> {
      const { orders } = res;
      this.setData({ listData: orders });
    });
  },

  init_data(options) {
    const statement = [
      { label: '无额外费用' },
      { label: '未服务全额退回' },
      { label: '爽约包赔' },
      { label: '不满意重服务' }
    ];
    const { id } = options;
    this.setData({ statement });
    this.setData({ statement, 'productForm.serviceId': id, 'form.serviceId': id });
    this.getProductList();
  },

  getServiceInfo() {
    const mapLocations = wx.getStorageSync('mapLocations');
    app.store.dispatch('getServiceInfo', this.data.form).then(res=> {
      let distance = app.global.distance(mapLocations.lat, mapLocations.lng, res.addrY, res.addrX);
      this.setData({ dataInfo: res, distance });
    });
  },

  getServiceAddress() {
    app.store.dispatch('getServiceAddress', this.data.form).then(res=> {

      this.setData({ dataAddress: res })
      console.log('---getServiceAddress---', res);
    });
  },

  getPublicPictures() {
    app.store.dispatch('getPublicPictures', this.data.form).then(res=> {
      this.setData({ dataPhoto: res })
      console.log('---getPublicPictures---', res);
    })
  },

  handleSkipDetail(event) {
    const { item } = event.currentTarget.dataset;
    wx.navigateTo({
      url: '../orderDetail/index?id=' + item.id
    });
  }
})