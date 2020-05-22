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