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

export const submitOrderAdd = (data = {}) => request.post('add', data, { all: true })

export const submitOrderReady = (data = {}) => request.post('ready', data, { all: true })

export const submitOrderPay = (data = {}) => request.post('pay', data, { all: true })

export const uploadImage = (data = {}) => request.post('upload_image', data)

export const serviceRegister = (data = {}) => request.post('register', data)

export const getClassifyTree = (data= {})=> request.post('classifyTree', data)

export const addAddress = (data= {})=> request.post('addr_add', data, { all: true })

export const getAddressList = (data= {})=> request.post('addr_list', data)

export const editAddress = (data= {})=> request.post('addr_edit', data, { all: true })

export const getAddressDetail = (data= {})=> request.post('addr_detail', data)

export const deleteAddress = (data= {})=> request.post('addr_delete', data, { all: true })

export const getCouponList = (data= {})=> request.post('coupon_list', data)

export const getOrderList = (data= {})=> request.post('order_list', data)

export const okOrder = (data= {})=> request.post('ok_order', data)

export const getOrderDetail = (data= {})=> request.post('order_detail', data)

export const rejectOrder = (data= {})=> request.post('rejectOrder', data)

export const updateUser = (data= {})=> request.post('update', data, { all: true })

export const rechargeVip = (data= {})=> request.post('join', data)

export const getRechargeList = (data= {})=> request.post('recharge_list', data)

export const getVipList = (data= {})=> request.post('vipList', data)

export const submitRecharge = (data= {})=> request.post('recharge', data)

export const getEvaluateList = (data={})=> request.post('evaluate_list', data);

export const initWeek = (data={})=> request.post('init_week', data);

export const updateWeek = (data={})=> request.post('update_week', data, { all: true });

export const getServiceInfo = (data={})=> request.post('service_info', data);

export const getServiceAddress = (data={})=> request.post('service_address', data);

export const getPublicPictures = (data={})=> request.post('getPublicPictures', data);

export const getVideo = (data={})=> request.post('getVideo', data);

export const getServiceTimeAll = (data={})=> request.post('serviceTimeAll', data);




