// pages/serviceRegister/index.js
const app = getApp().globalData
Page({
  /**
   * 页面的初始数据
   */
  data: {
    region: [],
    headUrl: '',
    currentStep: 3,
    professionsList: [],
    formData: {
      openId: '',
      mobile: '',
      avatar: '',
      bookName: '',
      sex: '',
      districtsId: '',
      address: '',
      remark: '',
      workImages: '',
      classifyIds: '',
      realName: '',
      cardNum: '',
      cardTop: '',
      cardBottom: '',
      professions: '',
    },
    serviceList: [],
    serviceIndex: 0,
    serviceDetail: []
  },

  /*
   * 省市区级联
   * */
  bindRegionChange(event) {
    const { value } = event.detail
    this.setData({
      region: value,
    })
  },

  handleUpload() {
    const token = wx.getStorageSync('token')
    const self = this
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const { tempFilePaths } = res
        wx.uploadFile({
          header: {
            Authorization: token,
          },
          url: app.location + 'file/upload/image',
          filePath: tempFilePaths[0],
          name: 'file',
          success(res) {
            const { data } = JSON.parse(res.data)
            self.setData({
              'formData.avatar': data.url,
            })
          },
        })
      },
    })
  },

  handleRadioChange(event) {
    const { value } = event.detail
    this.setData({
      'formData.sex': value,
    })
  },

  publicUploadImage(url = '') {
    const token = wx.getStorageSync('token')
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          const { tempFilePaths } = res
          wx.uploadFile({
            header: {
              Authorization: token,
            },
            url: url || app.location + 'file/upload/image',
            filePath: tempFilePaths[0],
            name: 'file',
            success(res) {
              const { data } = JSON.parse(res.data)
              resolve(data)
            },
            reject(err) {
              reject(err)
            },
          })
        },
      })
    })
  },

  handleIdCardImage(event) {
    const { prop } = event.currentTarget.dataset
    const { formData } = this.data
    this.publicUploadImage().then((data) => {
      formData[prop] = data.url
      this.setData({ formData })
    })
  },

  handlePrev() {
    console.log(111)
    let { currentStep } = this.data
    this.setData({
      currentStep: currentStep - 1,
    })
  },

  handleAdd() {
    const { professionsList } = this.data
    professionsList.push({ professionName: '', professionImage: '' })
    this.setData({ professionsList })
  },

  handleCertificate(event) {
    const { value } = event.detail
    const { index } = event.currentTarget.dataset
    const { professionsList } = this.data
    professionsList[index]['professionName'] = value
    this.setData({ professionsList })
  },

  handleUploadCertificate(event) {
    const { index } = event.currentTarget.dataset
    const { professionsList } = this.data
    this.publicUploadImage().then((data) => {
      professionsList[index]['professionImage'] = data.url
      this.setData({ professionsList })
    })
  },

  handleSubmit() {
    // 提交表单
    const { currentStep } = this.data
    if (currentStep == 1) {
      this.setData({
        'formData.districtsId': this.data.region.join(','),
      })
      const verify = [
        { label: '头像', prop: 'avatar' },
        { label: '昵称', prop: 'bookName' },
        { label: '性别', prop: 'sex' },
        { label: '省份', prop: 'avatar' },
        { label: '地址', prop: 'address' },
      ]
      if (this.formDataValidate(verify)) {
        this.setData({ currentStep: 2 })
      }
    }

    if (currentStep == 2) {
      const verify = [
        { label: '姓名', prop: 'realName' },
        { label: '身份证号', prop: 'cardNum' },
        { label: '身份证正面', prop: 'cardTop' },
        { label: '身份证反面', prop: 'cardBottom' },
      ]
      if (this.formDataValidate(verify)) {
        this.setData({ currentStep: 3 })
      }
    }

    if (currentStep == 3) {
      const { professionsList, formData } = this.data
      let bool = true
      for (let i = 0; i < professionsList.length; i++) {
        const professions = professionsList[i]
        if (professions['professionImage'] && !professions['professionName']) {
          wx.showToast({
            icon: 'none',
            title: '第' + i + '个资料证书中缺少证书描述！',
          })
          return
        }
        if (!professions['professionImage'] && professions['professionName']) {
          wx.showToast({
            icon: 'none',
            title: professions['professionName'] + '中缺少证书图片！',
          })
          return
        }
      }
      formData['professions'] = professionsList
      this.submitForm()
    }
  },

  submitForm() {
    const { formData } = this.data
    app.store.dispatch('serviceRegister', formData).then((res) => {
      console.log(res)
    })
  },

  formDataValidate(data) {
    let validate = true
    const { formData } = this.data
    for (let index in data) {
      if (!formData[data[index].prop]) {
        wx.showToast({
          icon: 'none',
          title: data[index].label + '没有填写',
        })
        validate = false
        break
      }
      if (
        data[index].prop == 'cardNum' &&
        formData[data[index].prop].length < 18
      ) {
        wx.showToast({
          icon: 'none',
          title: data[index].label + '号码不正确',
        })
        validate = false
        break
      }
    }
    return validate
  },

  handleInputEvent(event) {
    const { prop } = event.currentTarget.dataset
    const { value } = event.detail
    const { formData } = this.data
    formData[prop] = value
    this.setData({
      formData,
    })
  },

  getClassifyTree() {
    app.store.dispatch('getClassifyTree').then(data=> {
      this.setData({
        serviceList: data
      });
    });
  },

  handlePanelEvent(event) {
    const { item, index } = event.currentTarget.dataset;
    this.getServiceDetail(item);
    this.setData({
      serviceIndex: index
    });
  },
  getServiceDetail(item) {
    const { serviceList } = this.data;
    for (let i = 0; i < serviceList.length; i++) {
      debugger;
      if (item.id == serviceList[i].id) {
        return this.setData({
          serviceDetail: serviceList[i].child
        });
      }
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { openId, mobile } = options
    this.setData({
      'formData.openId': openId,
      'formData.mobile': mobile,
    })
    this.handleAdd()
    this.getClassifyTree();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
