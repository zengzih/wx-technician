export const global = {
  transferData(data, column, childCol = {}) {
    const result = [];
    if (data instanceof Array) {
      data.forEach(item => {
        const aliasCol = JSON.parse(JSON.stringify(childCol));
        column.forEach(col => {
          if (item[col.prop] !== undefined && col.alias) {
            aliasCol[col.alias] = item[col.prop];
            if (item[col.prop] instanceof Array) {
              arguments.callee(item[col.prop], col.children, aliasCol[col.alias] = {});
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
    return  JSON.parse(localStorage.getItem(key))
  },
  removeLocal(key) {
    localStorage.removeItem(key)
  },
  setSession(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  getSession(key) {
    return  JSON.parse(sessionStorage.getItem(key))
  },
  removeSession(key) {
    sessionStorage.removeItem(key)
  },
}

const requestFields = {

};

// export const location = 'http://120.77.34.52:8081/rdxx-travel/travel/'
export const location = 'http://hello.dute7liang.com:8080/'
// const sysLocation = 'http://120.77.34.52:8081/rdxx-travel/'
const sysLocation = 'https://www.scf4.online/rdxx-travel/'
const requestUrl = {
  index: {
    list: 'list'
  },
  login: {
    wx: 'wx'
  },
  user: {
    info: 'info'
  },
  theme: {
    preview: 'preview'
  },
  product: {
    classifyList: 'classify/list',
    classifyDetail: 'classify/detail'
  }
  // http://localhost/product/classify/list
  
};
const reg = /wx_login/g;
const getRequestUrl = (url) => {
  for (let i in requestUrl) {
    const controller = i;
    const second = requestUrl[i];
    for (let n in second) {
      if (url === n) {
        if (reg.test(url)) {
          return sysLocation + controller + '/' + second[n];
        }
        return location + controller + '/' + second[n];
      }
    }
  }
  return ''
}

let handler = {
  get(target, property) {
    ['get', 'post', 'delete'].forEach((methods) => {
      target[methods] = (url, params = {}, header = {}) => {
        const reqUrl = getRequestUrl(url);
        if (!reqUrl) return;
        // params['userId'] = wx.getStorageSync('token');
        if (!header['Content-Type']) {
          header['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        const urlReg = /wx/g;
        if (!urlReg.test(url)) {
          header['Authorization'] = wx.getStorageSync('token');
        }
        return new Promise((resolve, reject)=> {
          wx.request({
            method: methods,
            url: reqUrl,
            data: params,
            header,
            success(res) {
              const { data } = res;
              if (requestFields[url]) {
                const dataName = requestFields[url]['dataName'];
                resolve(global.transferData(dataName ? res.data.result[dataName] : res.data.result,requestFields[url]['fields']))
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
            }
          });
        })
      }
    })
    return target[property];
  }
};
let request = new Proxy({}, handler);
export default request
