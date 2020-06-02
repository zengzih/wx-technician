// pages/modifyUserInfo/index.js
const app = getApp().globalData;
import {$wuxToast} from '../../miniprogram_npm/wux-weapp/index'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        sexList: [
            {name: '男', value: 1 },
            {name: '女', value: 2}
        ],
        form: {
            name: '',
            mobile: '',
            sex: ''
        }
    },

    handleSave() {
        if (this.checkForm()) {
            app.store.dispatch('updateUser', this.data.form).then(res => {
                if (res.code == 200) {
                    setTimeout(()=> {
                        return wx.navigateBack({
                            delta: 1
                        })
                    }, 3000)
                }
                wx.showToast({
                    title: res.message,
                    icon: 'none'
                });
            });
        }
    },

    radioChange(event) {
        const {value} = event.detail;
        this.setData({'form.sex': value});
    },

    handleInput(event) {
        const {prop} = event.currentTarget.dataset;
        const {value} = event.detail;
        const {form} = this.data;
        form[prop] = value;
        this.setData({form})
    },

    checkForm() {
        const {form} = this.data;
        if (!form.name) {
            wx.showToast({
                icon: 'none',
                title: '用户名未填写!'
            })
            return false
        }
        if (!form.mobile) {
            wx.showToast({
                icon: 'none',
                title: '手机号填写!'
            })
            return false
        } else {
            const isTel = (value) => !/^1[34578]\d{9}$/.test(value)
            if (!isTel(form.mobile)) {
                wx.showToast({
                    icon: 'none',
                    title: '手机号填写!'
                })
                return false
            }
        }
        return true
    },

    getUserInfo() {
        app.store.dispatch('getUserInfo').then(data => {
            const {form} = this.data;
            for (let key in data) {
                if (form.hasOwnProperty(key)) {
                    form[key] = data[key]
                }
            }
            this.setData({form});
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getUserInfo()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

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