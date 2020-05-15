import * as action from './action.js'

function Store(opt) {
  this.action = opt.action || {}
  this.state = opt.state || {}
  this.dispatch = (actionName, ...arg)=> {
    if (this.action[actionName]) {
      return this.action[actionName](...arg)
    } else {
      new Error('action：' + actionName +  '不存在')
    }
  }
  this.commit = ()=> {
    
  },
  this.mutations = ()=> {
    
  }
}

const store = new Store({
  action
})
export default store

