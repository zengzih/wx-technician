// pages/technicianList/index.js
import {$startWuxRefresher, $stopWuxRefresher, $stopWuxLoader} from '../../miniprogram_npm/wux-weapp/index'

const app = getApp().globalData;
import {location, global} from '../../utils/util'

class mixinsService {
    constructor(self) {
        this.self = self;
        const mapLocations = wx.getStorageSync('mapLocations')
        self.setData({ mapLocations })
        this.bool_load = true;
        self.bool_load = true
        self.handleServiceClick = this.handleServiceClick;
        self.reset_params = this.reset_params;
        self.getService = this.getService;
        self.getServiceDistance = this.getServiceDistance;
    }

    getService() {
        const {params} = this;
        return new Promise((resolve, reject) => {
            app.store.dispatch('getServiceList', params).then(res => {
                const { records } = res;
                const { serviceData, mapLocations } = this.data;
                if (!records.length) {
                    this.bool_load = false;
                }
                this.getServiceDistance(records)
                serviceData.push(...records)
                this.setData({serviceData});
                resolve(records)
            });
        })
    }

    getServiceDistance(data) {
        const { lat, lng } = this.data.mapLocations;
        data.forEach(row=> {
            row.distance = global.distance(lat, lng, row.addrY, row.addrX)
        })
    }

    reset_params() {
        this.params = {
            size: 9,
            current: 1,
            classifyId: '',
            classifyOneId: '',
            addrName: ''
        };
    }

    handleServiceClick(event) {
        const {item} = event.currentTarget.dataset;
        console.log(item)
    }
}


class mixinsProduct {
    constructor(self) {
        this.self = self;
    }
}


Page({

    /**
     * 页面的初始数据
     */
    data: {
        rootLocation: location,
        scrollTop: 0,
        serviceData: [],
        params: {
            size: 9,
            current: 1,
            classifyId: '',
            classifyOneId: '',
            addrName: ''
        },
        mapLocations: {}

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        new mixinsService(this);
        new mixinsProduct(this);
        $startWuxRefresher()
    },

    onPageScroll(e) {
        console.log('--------onPageScroll----------', e.scrollTop)
        this.setData({
            scrollTop: e.scrollTop
        })
    },
    onRefresh() {
        this.reset_params()
        this.setData({serviceData: []})
        this.getService().then(() => {
            console.log('------refresh-----', this)
            $stopWuxRefresher()
        })
    },

    onPulling() {
        console.log('-------onPulling-------')
    },

    onLoadmore() {
        console.log('------onLoadmore---------')
        if (this.bool_load) {
            this.params.current += 1;
            this.getService().then((data) => {
                if (data.length) {
                    $stopWuxLoader()
                } else {
                    console.log('------一滴也没有了-------')
                    $stopWuxLoader('#wux-refresher', this, true)
                }
            })
        }
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