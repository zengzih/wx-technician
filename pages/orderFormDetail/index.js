const app = getApp().globalData;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        formData: {},
        infoList: [
            {label: '真实的总价', prop: 'realPrice'},
            {label: 'VIP折扣', prop: 'vipDiscount'},
            {label: '优惠券折扣', prop: 'couponPrice'},
            {label: '购买数量', prop: 'classifyNum'},
            {label: '服务时间', prop: 'classifyMin'},
            {label: '服务时间', prop: 'serviceTime'}
        ],
        formInfo: [
            { label: '订单编号', prop: 'serviceId' },
            { label: '预约时间', prop: 'serviceTime' },
            { label: '服务人员', prop: 'serviceName' },
            { label: '服务人员性别', prop: 'serviceSex' },
            { label: '服务时间', prop: 'classifyMin' }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getOrderDetailInfo()
    },

    getOrderDetailInfo() {
        app.store.dispatch('getOrderDetail', {orderId: 5}).then(data => {
            data.serviceTime = this.getServiceTime(data.serviceTime)
            this.setData({formData: data});
        });
    },


    getServiceTime(date_num) {
        const date = new Date(date_num);
        const serviceTime = this.getDateDetail(date, 'getFullYear') + '-' +
            this.getDateDetail(date, 'getMonth') + '-' +
            this.getDateDetail(date, 'getDate') + ' ' +
            this.getDateDetail(date, 'getHours') + ':' +
            this.getDateDetail(date, 'getMinutes')
        return serviceTime
    },

    getDateDetail(date, property) {
        let value = date[property]();
        if (property == 'getMonth'){
            value += 1
        }
        if (value < 10) {
            return '0' + value
        }
        return value
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