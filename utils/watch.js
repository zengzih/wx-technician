const app = getApp().globalData;

export class Watch {
    constructor({ data, func = Function }) {
        this.data = data || app.publicParams;
        this.callbackFunc = func
        this.initDetail()
    }

    initDetail() {
        const { data } = this;
        if (toString.call(data) == '[object Object]') {
            for (let key in data) {
                this.defineProperty(data, key, data[key])
            }
        }
    }

    defineProperty(obj, key, value) {
        const self = this;
        Object.defineProperty(obj, key, {
           get() {
               return value
           },
           set(val) {
               if (val !== value) {
                   value = val;
                   self.callbackFunc(key, val)
               }
           }
        });
    }
}


export function getLocation() {
    const _this = this;
    wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success (res) {
            transformPoint(res.latitude, res.longitude)
        }
    })
}

function transformPoint(latitude, longitude) {
    const _this = this;
    wx.request({
        url: 'https://api.map.baidu.com/geocoder/v2/?ak=n3vSa43bGAijQgzlY1NBstBTtnDVNbRL&location=' + latitude + ',' + longitude + '&output=json',
        data: {},
        header: {
            'Content-Type': 'application/json'
        },
        success(res) {
            const { formatted_address } = res.data.result;
            app.mapLocations.lat = latitude;
            app.mapLocations.lng = longitude;
            app.mapLocations.text = formatted_address;
        },
        fail() {
            // page.city = "获取定位失败"
        },
    });
}