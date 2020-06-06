export const global = {
  transferData(data, column, childCol = {}) {
    const result = []
    if (data instanceof Array) {
      data.forEach((item) => {
        const aliasCol = JSON.parse(JSON.stringify(childCol))
        column.forEach((col) => {
          if (item[col.prop] !== undefined && col.alias) {
            aliasCol[col.alias] = item[col.prop]
            if (item[col.prop] instanceof Array) {
              arguments.callee(
                item[col.prop],
                col.children,
                (aliasCol[col.alias] = {})
              )
            }
          }
        })
        result.push(aliasCol)
      })
    }
    return result
  },
  setLocal(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  getLocal(key) {
    return JSON.parse(localStorage.getItem(key))
  },
  removeLocal(key) {
    localStorage.removeItem(key)
  },
  setSession(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  getSession(key) {
    return JSON.parse(sessionStorage.getItem(key))
  },
  removeSession(key) {
    sessionStorage.removeItem(key)
  },
  distance: function (la1, lo1, la2, lo2) {
    var La1 = (la1 * Math.PI) / 180.0
    var La2 = (la2 * Math.PI) / 180.0
    var La3 = La1 - La2
    var Lb3 = (lo1 * Math.PI) / 180.0 - (lo2 * Math.PI) / 180.0
    var s =
      2 *
      Math.asin(
        Math.sqrt(
          Math.pow(Math.sin(La3 / 2), 2) +
            Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)
        )
      )
    s = s * 6378.137 //地球半径
    s = Math.round(s * 10000) / 10000
    return s.toFixed(2)
  },
}

const requestFields = {}
export const location = 'http://8.129.186.208'
const sysLocation = 'https://www.scf4.online/rdxx-travel/'
const requestUrl = {
  index: {
    list: 'list',
    week_tab: 'weekTab',
    getTimeShow: 'getTimeShow',
    classifyTree: 'classifyTree'
  },
  login: {
    wx: 'wx',
  },
  user: {
    info: 'info',
    addr_add: 'addr/add',
    addr_list: 'addr/list',
    addr_detail: 'addr/detail',
    addr_edit: 'addr/edit',
    addr_delete: 'addr/delete',
    update: 'update'
  },
  theme: {
    preview: 'preview',
  },
  product: {
    classifyList: 'classify/list',
    classifyDetail: 'classify/detail',
  },
  service: {
    service_list: 'list',
    week_list: 'week/list',
    register: 'register',
    init_week: 'week/init',
    update_week: 'update',
    service_info: 'info',
    service_address: 'address',
    getPublicPictures: 'getPublicPictures',
    getVideo: 'getServiceVideo',
    serviceTimeAll: 'serviceTimeAll'
  },
  order: {
    ready: 'ready',
    add: 'add',
    pay: 'pay',
    order_list: 'list',
    ok_order: 'okOrder',
    order_detail: 'detail',
    rejectOrder: 'rejectOrder'
  },
  file: {
    upload_image: 'upload/image',
  },
  coupon: {
    coupon_list: 'user/list'
  },
  vip: {
    join: 'join',
    recharge: 'recharge'
  },
  recharge: {
    vipList: 'vipList',
    recharge_list: 'list'
  },
  evaluate: {
    evaluate_list: 'list'
  }
}
const reg = /wx_login/g
const getRequestUrl = (url) => {
  for (let i in requestUrl) {
    const controller = i
    const second = requestUrl[i]
    for (let n in second) {
      if (url === n) {
        if (reg.test(url)) {
          return sysLocation + controller + '/' + second[n]
        }
        return location + '/' + controller + '/' + second[n]
      }
    }
  }
  return ''
}

function requestTntercept(data) {
  const { code } = data
  let bool = true
  switch (code) {
    case 401:
      wx.navigateTo({
        url: '../../pages/login/index',
      })
      bool = false
      break
  }
  return bool
}

let handler = {
  get(target, property) {
    ['get', 'post', 'delete'].forEach((methods) => {
      target[methods] = (url, params = {}, header = {}) => {
        const reqUrl = getRequestUrl(url)
        if (!reqUrl) return
        // params['userId'] = wx.getStorageSync('token');
        if (!header['Content-Type']) {
          header['Content-Type'] = 'application/x-www-form-urlencoded'
        }
        const urlReg = /wx/g
        if (!urlReg.test(url)) {
          header['Authorization'] = wx.getStorageSync('token')
        }
        return new Promise((resolve, reject) => {
          wx.request({
            method: methods,
            url: reqUrl,
            data: params,
            header,
            success(res) {
              const { data } = res
              /*if(!requestTntercept(data)){
                return false;
              }*/
              if (requestFields[url]) {
                const dataName = requestFields[url]['dataName']
                resolve(
                  global.transferData(
                    dataName ? res.data.result[dataName] : res.data.result,
                    requestFields[url]['fields']
                  )
                )
              } else {
                if (header.all) {
                  resolve(data)
                } else {
                  resolve(data.data)
                }
              }
            },
            fail(error) {
              reject(error)
            },
          })
        })
      }
    })
    return target[property]
  },
}
let request = new Proxy({}, handler)
export default request
