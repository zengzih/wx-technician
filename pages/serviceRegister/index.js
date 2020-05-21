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
      avatar: '',
      bookName: '',
      sex: '', //  1-男 2-女
      districtsId: '',
      address: '',
      remark: '',
      workImages: '',
      classifyIds: '',
      realName: '',
      cardNum: '',
      cardTop: '',
      cardBottom: '',
      professions: ''
    },
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
            console.log(res)
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
    return new Promise((resolve, reject)=> {
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
            }
          })
        },
      });
    })
  },

  handleIdCardImage(event) {
    const { prop } = event.currentTarget.dataset;
    const { formData } = this.data;
    this.publicUploadImage().then(data=> {
      formData[prop] = data.url;
      this.setData({formData});
    })
  },

  handlePrev() {
    console.log(111)
    let { currentStep } = this.data;
    this.setData({
      currentStep: currentStep - 1
    });
  },

  handleAdd() {
    const { professionsList } = this.data;
    professionsList.push({ professionName: '', professionImage: '' })
    this.setData({ professionsList });
  },

  handleCertificate(event) {
    const { value } = event.detail;
    const { index } = event.currentTarget.dataset;
    const { professionsList } = this.data;
    professionsList[index]['professionName'] = value;
    this.setData({ professionsList });
  },

  handleUploadCertificate(event) {
    const { index } = event.currentTarget.dataset;
    const { professionsList } = this.data;
    this.publicUploadImage().then(data=> {
      professionsList[index]['professionImage'] = data.url;
      this.setData({ professionsList });
    });
  },

  handleSubmit() {
    // 提交表单
    const { currentStep } = this.data;
    if (currentStep == 1) {
      this.setData({
        'formData.districtsId': this.data.region.join(',')
      });
      const verify = [
          { label: '头像', prop: 'avatar' },
          { label: '昵称', prop: 'bookName' },
          { label: '性别', prop: 'sex' },
          { label: '省份', prop: 'avatar' },
          { label: '地址', prop: 'address' }
      ]
      if (this.formDataValidate(verify)) {
        this.setData({currentStep: 2})
      }
    }

    if (currentStep == 2) {
      const verify = [
        { label: '姓名', prop: 'realName' },
        { label: '身份证号', prop: 'cardNum' },
        { label: '身份证正面', prop: 'cardTop' },
        { label: '身份证反面', prop: 'cardBottom' }
      ]
      if (this.formDataValidate(verify)) {
        this.setData({currentStep: 3})
      }
    }

    if (currentStep == 3) {

    }
  },

  formDataValidate(data) {
    let validate = true;
    const { formData } = this.data;
    for(let index in data){
      if (!formData[data[index].prop]) {
        wx.showToast({
          icon: 'none',
          title: data[index].label + '没有填写',
        });
        validate = false;
        break
      }
    }
    return validate;
  },

  handleInputEvent(event) {
    const { prop } = event.currentTarget.dataset;
    const { value } = event.target.detail;
    const { formData } = this.data;
    formData[prop] = value
    this.setData({
      formData
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.handleAdd()
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
