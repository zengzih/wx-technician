// pages/serviceRegister/index.js
import { location } from "../../utils/util";
const app = getApp().globalData
Page({
  /**
   * 页面的初始数据
   */
  data: {
    rootLocation: location,
    region: [],
    headUrl: '',
    currentStep: 1,
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
      cardBottom: ''
    },
    serviceList: [],
    serviceIndex: 0,
    serviceDetail: [],
    serviceSelectIds: {},
    serviceSelectList: [],
    serviceDialog: false,

    serviceWorkPhoto: []
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
          url: app.location + '/file/upload/image',
          filePath: tempFilePaths[0],
          name: 'file',
          success(res) {
            console.log(res);
            const { data } = JSON.parse(res.data)
            self.setData({
              'formData.avatar': data.fileName,
            })
          },
          fail(error) {
            wx.showToast({
              icon: 'null',
              title: '图片上传失败！'
            })
          }
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
            url: url || app.location + '/file/upload/image',
            filePath: tempFilePaths[0],
            name: 'file',
            success(res) {
              const { data } = JSON.parse(res.data)
              resolve(data)
            },
            reject(err) {
              wx.showToast({
                icon: 'none',
                title: '图片上传失败'
              })
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
      formData[prop] = data.fileName
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
      professionsList[index]['professionImage'] = data.fileName
      this.setData({ professionsList })
    })
  },

  handleCheckWorkPhoto() {
    const { serviceWorkPhoto } = this.data;
    const result = [];
    serviceWorkPhoto.forEach(elt=> {
      if (elt.fileName) {
        result.push(elt.fileName)
      }
    });
    return result;
  },

  handleSubmit() {
    // 提交表单
    const { currentStep } = this.data
    let workPhotoImage = []
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
      workPhotoImage = this.handleCheckWorkPhoto();
      if (!workPhotoImage.length) {
        return wx.showToast({
          icon: 'none',
          title: '工作照片未上传',
        })
      }
      if (this.formDataValidate(verify)) {
        this.setData({ currentStep: 3 })
      }
    }

    if (currentStep == 3) {
      const { professionsList, formData, serviceSelectIds } = this.data
      if (JSON.stringify(serviceSelectIds) === '{}') {
        return wx.showToast({
          icon: 'none',
          title: '服务项目未选择！',
        })
      }
      for (let i = 0; i < professionsList.length; i++) {
        const professions = professionsList[i]
        if (professions['professionImage'] && !professions['professionName']) {
          return wx.showToast({
            icon: 'none',
            title: '第' + (i + 1) + '个资料证书中缺少证书描述！',
          })
        }
        if (!professions['professionImage'] && professions['professionName']) {
          return wx.showToast({
            icon: 'none',
            title: professions['professionName'] + '中缺少证书图片！',
          })
        }
      }
      formData['classifyIds'] = Object.keys(serviceSelectIds).join(',');
      formData['professionsStr'] = JSON.stringify(professionsList);
      formData['workImages'] = this.handleCheckWorkPhoto().join(',')
      this.submitForm()
    }
  },

  submitForm() {
    const { formData } = this.data
    app.store.dispatch('serviceRegister', formData).then((res) => {
      wx.showToast({
        icon: '',
        title: res.message
      })
      if(/成功/.test(res.message)) {}
      wx.switchTab({
        url: '../index/index',
      });
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
      let firstChild = {};
      if (data.length) {
        firstChild = data[0]
      }
      this.getServiceDetail(firstChild);
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
      if (item.id == serviceList[i].id) {
        return this.setData({
          serviceDetail: serviceList[i].child
        });
      }
    }
  },

  // 注册选择服务项目
  handleServicePanelEvent(event) {
    const { item } = event.currentTarget.dataset;
    const { id } = item;
    const { serviceSelectIds } = this.data;
    serviceSelectIds[id] = !serviceSelectIds[id];
    this.setServiceSelectList(serviceSelectIds[id], item)
    if (serviceSelectIds[id]) {}
    this.setData({
      serviceSelectIds
    });
  },

  setServiceSelectList(bool, item) {
    const { serviceSelectList } = this.data;
    for (let i = 0; i < serviceSelectList.length; i++) {
      const name = serviceSelectList[i]
      if (name == item.name) {
        if (!bool) {
          serviceSelectList.splice(i, 1);
          i--
        }
      }
    }
    serviceSelectList.push(item.name);
    this.setData({ serviceSelectList });
  },

  handleShowServiceDialog() {
    this.setData({ serviceDialog: true });
  },

  handleServiceConfirm() {
    this.setData({
      serviceDialog: false
    });
  },

  handleAddWord() {
    const { serviceWorkPhoto } = this.data;
    serviceWorkPhoto.push({
      url: '',
      id: new Date().getTime()
    })
    this.setData({ serviceWorkPhoto });
  },

  handleDelWork(event) {
    const { id } = event.currentTarget.dataset;
    const { serviceWorkPhoto } = this.data;
    for (let i = 0; i < serviceWorkPhoto.length; i++) {
      if (serviceWorkPhoto[i].id == id) {
        serviceWorkPhoto.splice(i, 1)
        break;
      }
    }
    this.setData({
      serviceWorkPhoto
    });
  },

  getCurrentWork(id, url) {
    const { serviceWorkPhoto } = this.data;
    for (let i = 0; i < serviceWorkPhoto.length; i++) {
      if (id == serviceWorkPhoto[i].id) {
        serviceWorkPhoto[i].fileName = url
      }
    }
    return serviceWorkPhoto;
  },

  handleWorkImage(event) {
    const { id } = event.currentTarget.dataset;
    this.publicUploadImage().then((data) => {
      this.setData({ serviceWorkPhoto: this.getCurrentWork(id, data.fileName) })
    })
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
    this.handleAdd();
    this.handleAddWord();
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
