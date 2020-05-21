// pages/serviceRegister/index.js
const app = getApp().globalData
Page({
  /**
   * 页面的初始数据
   */
  data: {
    region: [],
    headUrl: '',
    currentStep: 1,
    formData: {
      avatar: '',
      bookName: '',
      sex: '', //  1-男 2-女
      districtsId: [],
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
          url: app.location + 'file/upload/image', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          success(res) {
            console.log(res)
            const { data } = JSON.parse(res.data)
            self.setData({
              headUrl: data.url,
            })
          },
        })
      },
    })
  },

  selectFile(files) {
    const { tempFilePaths } = files
    let bool = true
    tempFilePaths.forEach((file) => {
      const fileName = file.split('.')
      const fileType = fileName[fileName.length - 1]
      if (!fileType.test(/PNG|JPG|jpeg/i)) {
        bool = false
      }
    })
    return bool
  },

  handleRadioChange(event) {
    const { value } = event.detail
    this.setData({
      'formData.sex': value,
    })
  },

  handleSubmit() {
    // 提交表单
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      selectFile: this.selectFile.bind(this),
      uplaodFile: this.uplaodFile.bind(this),
    })
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
