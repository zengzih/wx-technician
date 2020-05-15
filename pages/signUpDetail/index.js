// pages/signUpDetail/index.js
const app = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    layout: [
      { label: '联系人姓名', prop: 'linkName', required: true },
      { label: '手机号码', prop: 'linkTelephone', required: true, reg: '^1[3456789]\\d{9}$' },
      { label: '微信号', prop: 'linkWechat', remake: '微信同手机' }
    ],
    detail: {
      remark: '',
      linkName: '',
      linkTelephone: '',
      linkWechat: '',
      enrollment: 1,
      token: '',
      periodId: '',
      productId: ''
    },
    noteError: false,
    groupStage: {},
    productDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const groupStage = wx.getStorageSync('groupStage'); //  团期
    const productDetail = wx.getStorageSync('productDetail'); // 详情
    const token = wx.getStorageSync('token');
    const { detail } = this.data;
    detail.periodId = groupStage.id;
    detail.token = token;
    this.setData({
      'detail.productId': productDetail.id,
      productDetail,
      groupStage,
      detail
    });
    this.initDetail(detail);
  },
  handleRemake() {
    wx.navigateTo({
      url: '../note/index',
    })
  },
  initDetail(obj) {
    for (let i in obj) {
      this.defineProperty(obj, i, obj[i]);
    }
  },
  defineProperty(obj, key, value) {
      const _this = this;
      Object.defineProperty(obj, key, {
        get() {
          return value
        },
        set(val) {
          if (val !== value) {
            value = val;
            _this.updateDetailStatus(key, value);
          }
        }
      });
  },
  updateDetailStatus(key, val) {
    const { layout } = this.data;
    layout.forEach(row => {
      if (row.prop == key && row.required) {
        row.error = val ? false : true;
      }
    });
    const { detail } = this.data;
    detail[key] = val
    this.setData({
      layout,
      detail
    });
  },

  handleSetWeChat(event) {
    const { detail, layout } = this.data;
    const { prop } = event.target.dataset;
    detail[prop] = detail.linkTelephone;
    this.setData({
      detail
    });
  },

  handleNoteInput(event) {
    const { value } = event.detail;
    const { detail, noteError } = this.data;
    detail.remark = value;
    this.setData({
      detail,
      noteError: !value
    });
  },


  handleInput(event) {
    const { detail } = this.data;
    const { value } = event.detail;
    const { prop, label } = event.target.dataset;
    detail[prop] = value;
  },
  handleBlur(event) {
    const { detail, layout } = this.data;
    const { value } = event.detail;
    const { prop, reg, label } = event.target.dataset;
    layout.forEach(row=> {
      if (row.prop == prop) {
        if (row.reg) {
          const regs = new RegExp(row.reg);
          if (!regs.test(value) && row.required) {
            row['error'] = true;
          }
        } else {
          if (!value && row.required) {
            row['error'] = true;
          }
        }
      }
    });
    this.setData({
      layout
    });
  },
  handleSubmit(prop) {
    const { detail, layout } = this.data;
    const exclude = /linkWechat|remark/;
    let allTrue = true;
    let props = [];
    for (let i in detail) {
      if (!exclude.test(i) && !detail[i]) {
        props.push(i);
      }
    }
    if (props.length) {
      const reg = new RegExp(props.join('|'));
      layout.forEach(elt=> {
        if (reg.test(elt.prop)) {
          elt.error = true;
        }
      });
      this.setData({
        layout
      });
    }
    
    for (let i in detail) {
      if (!detail[i] && !exclude.test(i)) {
        console.log(i);
        allTrue = false;
      }
    }
    this.setData({
      layout,
      noteError: detail.remark ? false : true
    });
    if (allTrue) {
      wx.setStorageSync('signUpData', detail);
      
      app.store.dispatch('signUp', detail, { all: true }).then(res=> {
        if (res.success) {
          wx.navigateTo({
            url: '../prompt/index',
          });
        }
      });
    }
  },
  handleMinus() {
    const { detail } = this.data;
    if (detail.enrollment > 1) {
      detail.enrollment -= 1;
    }
    this.setData({
      detail
    });
  },
  handleAdd() {
    const { detail } = this.data;
    detail.enrollment += 1;
    this.setData({
      detail
    });
  },

  // 收藏
  handleCollection() {
    const { productDetail } = this.data;
    let { followStatus, id: productId } = productDetail;
    let action = '';
    if (followStatus == '1') {
      action = 'unFollow'
    } else {
      action = 'follow'
    }
    app.store.dispatch(action, { productId }).then(res=> {
      if (res.success) {
        productDetail.followStatus = followStatus == '1' ? '0' : '1'
      }
      this.setData({
        productDetail
      });
      wx.showToast({
        icon: 'success',
        title: res.message
      });
    });
  }
})