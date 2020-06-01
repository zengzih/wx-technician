// pages/confirmOrderForm/index.js
const app = getApp().globalData;
import {location as rootLocation} from "../../utils/util";

Page({
    /**
     * 页面的初始数据
     */
    data: {
        back: true,
        address: '',
        location: {},
        submitFormData: {
            uid: '',
            serviceId: '',
            serviceTime: '',
            realPrice: '',
            vipDiscount: '',
            couponPrice: '',
            coupon: '',
            payPrice: '',
            clientAddress: '',
            clientName: '',
            clientPhone: '',
            clientRemark: '',
            classifyId: '',
            classifyNum: '',
            detailAddress: ''
        },
        serviceTime: '',
        classifyInfo: {},
        productDetail: {},
        rootLocation: rootLocation,
        orderId: '',
        payBoxShow: false

    },

    /**
     * 生命周期函数--监听页面加载
     * address: "广东省深圳市宝安区创业一路"
     defaultStatus: 1
     id: 10
     name: "周星星"
     phone: "18400000000"
     remark: "机场东"
     *
     */
    onLoad: function (options) {
        this.init();
        this.init_member_address(options)
        this.getProductInfo();
    },

    init_member_address(options) {
        const {id, clientName, clientPhone, clientAddress, remark} = options;
        debugger;
        if (!clientName) {
            return this.getDefaultAddress();
        }
        if (clientName && clientPhone && clientAddress && remark) {
            this.setData({
                'submitFormData.clientName': clientName,
                'submitFormData.clientPhone': clientPhone,
                'submitFormData.clientAddress': clientAddress,
                'submitFormData.detailAddress': remark,
            });
        }
    },

    getDefaultAddress() {
        app.store.dispatch('getAddressList').then(data => {
            const {records} = data;
            if (records.length) {
                let clientName, clientPhone, clientAddress, detailAddress = ''
                records.forEach(elt => {
                    if (elt.defaultStatus) {
                        clientName = elt.name
                        clientPhone = elt.phone
                        clientAddress = elt.address
                        detailAddress = elt.remark
                       /* this.setData({
                            'submitFormData.clientName': elt.name,
                            'submitFormData.clientPhone': elt.phone,
                            'submitFormData.clientAddress': elt.address,
                            'submitFormData.detailAddress': elt.remark
                        })*/
                    }
                });
                if (!clientName) {
                    const firstRow = records[0];
                    clientName = firstRow.name
                    clientPhone = firstRow.phone
                    clientAddress = firstRow.address
                    detailAddress = firstRow.remark
                }
                this.setData({
                    'submitFormData.clientName': clientName,
                    'submitFormData.clientPhone': clientPhone,
                    'submitFormData.clientAddress': clientAddress,
                    'submitFormData.detailAddress': detailAddress
                })
            }
        });
    },

    // input点击事件
    handleInput(event) {
        const {prop} = event.currentTarget.dataset;
        const {value} = event.detail;
        const {submitFormData} = this.data;
        submitFormData[prop] = value;
        this.setData({
            submitFormData
        });
    },

    // 查询当前商品的详情
    getProductInfo() {
        let {classifyId} = this.data.submitFormData;
        app.store.dispatch('getClassifyDetail', {id: classifyId}).then(res => {
            this.setData({
                productDetail: res
            });
        });
    },

    init() {
        const orderFormInfo = wx.getStorageSync('orderFormInfo');
        const classifyInfo = wx.getStorageSync('classifyInfo');
        const {mapLocations} = app;
        const serviceTime = this.getServiceTime(orderFormInfo.serviceTime)
        this.setData({submitFormData: orderFormInfo, location: mapLocations, classifyInfo, serviceTime});
    },

    getServiceTime(date_num) {
        const date = new Date(date_num);
        const serviceTime = this.getDateDetail(date, 'getFullYear') + '-' +
            this.getDateDetail(date, 'getMonth') + '-' +
            this.getDateDetail(date, 'getDate') + ' ' +
            this.getDateDetail(date, 'getHours') + ':' +
            this.getDateDetail(date, 'getMinutes') + ':' +
            this.getDateDetail(date, 'getSeconds')
        return serviceTime
    },

    getDateDetail(date, property) {
        let value = date[property]();
        if (property == 'getMonth') {
            value += 1
        }
        if (value < 10) {
            return '0' + value
        }
        return value
    },

    handleSubmit() {
        const {submitFormData, serviceTime} = this.data;
        if (this.getCheckFromData()) {
            const param = this.getRequestParams(submitFormData)
            param.serviceTime = serviceTime;
            this.formatParams(param)
            param.clientAddress += submitFormData.detailAddress
            app.store.dispatch('submitOrderAdd', param).then(res => {
                if (res.code == 200) {
                    const {id} = res.data;
                    return this.setData({orderId: id, payBoxShow: true})
                }
                wx.showToast({
                    icon: 'none',
                    title: '下单失败！'
                });
            });
        }
    },

    handleClosePayBox() {
        this.setData({payBoxShow: false});
        wx.navigateTo({
            url: '../myorderList/index'
        })
    },

    handlePayEvent(event) {
        const {paytype} = event.currentTarget.dataset;
        const {orderId} = this.data;
        this.getPayPrice(orderId, paytype)
    },

    getPayPrice(id, paytype) {
        app.store.dispatch('submitOrderPay', {orderId: id, payType: paytype}).then(res => {
            wx.navigateTo({
                url: '../orderStatus/index?msg=' + res.msg + '&status=' + (res.code == 200 ? 1 : 0)
            })
            /*if (res.code == 200) {
              // ...
            }
            wx.showToast({
              icon: 'none',
              title: res.message
            });*/
        })
    },

    formatParams(params) {
        for (let key in params) {
            if (params[key] === null) {
                params[key] = ''
            }
        }
    },

    getRequestParams(submitFormData) {
        const params = {
            uid: '',
            serviceId: '',
            serviceTime: '',
            realPrice: '',
            vipDiscount: '',
            couponPrice: '',
            coupon: '',
            payPrice: '',
            clientAddress: '',
            clientName: '',
            clientPhone: '',
            clientRemark: '',
            classifyId: '',
            classifyNum: ''
        };
        for (let key in submitFormData) {
            if (params.hasOwnProperty(key)) {
                params[key] = submitFormData[key]
            }
        }
        return params;
    },

    getCheckFromData() {
        const {submitFormData, location} = this.data;
        let {clientName, clientAddress, clientPhone} = submitFormData;
        clientAddress += location.text;
        if (!clientAddress) {
            wx.showToast({
                icon: 'none',
                title: '请填写地址！',
            });
            return false;
        }
        if (!clientName) {
            wx.showToast({
                icon: 'none',
                title: '请填姓名！',
            });
            return false;
        }
        if (!clientPhone) {
            wx.showToast({
                icon: 'none',
                title: '请填写手机号！',
            });
            return false;
        }
        const reg = /^[1][3457869][0-9]{9}$/;
        if (!reg.test(clientPhone)) {
            wx.showToast({
                icon: 'none',
                title: '手机号格式不正确！',
            });
            return false;
        }
        return true;
    },

    handleAddAddress() {
        // 选择地址页面
        wx.navigateTo({
            url: '../manageAddress/index'
        })
    },

    handleRemarkEvent(event) {
        const {value} = event.detail;
        this.setData({
            'submitFormData.clientRemark': value
        });
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function (options) {
        console.log(options)
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
