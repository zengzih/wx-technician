import request from './util'

export const getIndexList = (data = {}) => request.post('list', data)

export const follow = (data = {}) =>
  request.post('follow', data, {
    'Content-Type': 'application/json',
    all: true,
  })

export const unFollow = (data = {}) =>
  request.delete('unFollow', data, {
    'Content-Type': 'application/json',
    all: true,
  })

export const getMyFavorite = (data = {}) => request.get('my_favorite', data)

export const signUp = (data = {}) =>
  request.post('signup', data, {
    'Content-Type': 'application/json',
    all: true,
  })

export const login = (data = {}) => request.post('wx', data)

export const getUserInfo = (data = {}) =>
  request.post('info', data, { all: true })

export const getClassifyDetailList = (data = {}) =>
  request.post('classifyList', data)

export const getClassifyDetail = (data = {}) =>
  request.post('classifyDetail', data)

export const getServiceList = (data = {}) => request.post('service_list', data)

export const getWeekList = (data = {}) => request.post('week_list', data)

export const getWeekTap = (data = {}) => request.post('week_tab', data)

export const getTimeShow = (data = {}) => request.post('getTimeShow', data)

export const submitOrderAdd = (data = {}) => request.post('add', data)

export const submitOrderReady = (data = {}) => request.post('ready', data)

export const uploadImage = (data = {}) => request.post('upload_image', data)

export const serviceRegister = (data = {}) => request.post('register', data)

export const getClassifyTree = (data= {})=> request.post('classifyTree', data)
