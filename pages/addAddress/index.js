// pages/addAddress/index.js
const app = getApp().globalData;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        formData: {
            address: '',
            phone: '',
            name: '',
            remark: '',
            defaultStatus: 0
        },
        currentId: '',
        location: '',
        type: 'add'
    },

    handleRadioChange(event) {
        const {value} = event.detail;
        this.setData({
            'formData.defaultStatus': value.length ? 1 : 0
        });
    },

    handleInput(event) {
        const {value} = event.detail;
        const {prop} = event.currentTarget.dataset;
        const {formData} = this.data;
        formData[prop] = value;
        this.setData({formData})
    },

    handleGetLocation() {
        const _this = this;
        wx.getLocation({
            type: 'gcj02', //返回可以用于wx.openLocation的经纬度
            success(res) {
                const latitude = res.latitude;
                const longitude = res.longitude;
                wx.chooseLocation({
                    latitude,
                    longitude,
                    success(res) {
                        const {address} = res;
                        _this.setData({
                            'formData.address': address
                        });
                    }
                });
            }
        })
    },

    handleSubmit() {
        const form = [
          { label: '联系人', prop: 'name' },
          { label: '手机号', prop: 'phone' },
          { label: '地址', prop: 'address' },
          { label: '详细地址', prop: 'remark' },
        ];
        const { formData, type } = this.data;
        for (let i = 0 ; i < form.length; i++) {
            const { label, prop } = form[i];
            if (!formData[prop]) {
                return wx.showToast({
                    icon: 'none',
                    title: label + '未填写！'
                })
            }
            if (prop == 'phone' && !/^1[3456789]\d{9}$/.test(formData[prop])) {
                return wx.showToast({
                    icon: 'none',
                    title: label + '格式不正确！'
                })
            }
        }
        let url = 'addAddress'
        if(type == 'edit') {
            url = 'editAddress'
        }
        app.store.dispatch(url, formData).then(res=> {
            if (res.code == 200) {
                wx.showToast({
                    icon: 'success',
                    title: res.message
                });
                wx.navigateBack({
                    delta: 1
                });
            }
        })

    },

    handleDelete() {
        const { currentId } = this.data;
        app.store.dispatch('deleteAddress', { id: currentId }).then(res=> {
            if (res.code == 200) {
                wx.showToast({
                    icon: 'success',
                    title: res.message
                });
                wx.navigateBack({
                    delta: 1
                });
            }
        });
    },

    getAddressDetail(id) {
        if (!id) return;
        app.store.dispatch('getAddressDetail', { id }).then(data=> {
            this.setData({ formData: data });
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const { id, type } = options;
        debugger;
        this.setData({ type, currentId: id });
        this.getAddressDetail(id)
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