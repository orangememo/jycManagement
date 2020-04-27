import request from '@/utils/request'

/**
 * 分页查询应用版本
 */

export function getVersionPageInfo(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/version/page/info',
		method: 'get',
		params,
	})
}

/**
 * 增加应用版本
 */

export function addVersionInfo(data) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/version/info',
		method: 'post',
		data,
	})
}
/**
 * 修改应用版本
 */

export function putVersionInfo(data) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/version/info',
		method: 'PUT',
		data,
	})
}
/**
 * 修改应用版本
 */

export function getVersionInfo(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/version/versionInfo/id',
		method: 'get',
		params,
	})
}

export const upLoadImg = `http://49.234.12.49/lp/lp/lpVuser/edits`
export function getApplication(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/application/list',
		method: 'get',
		params,
	})
}
/**
 * 订单管理
 */
export function getManagerOrderList(params) {
	return request({
		url: process.env.VUE_APP_WEB_ORDER + '/jyc/user/order/v1/manager/order/admin',
		method: 'get',
		params,
	})
}
/**
 * 优惠券管理
 */
export function getManagerCouponList(params) {
	return request({
		url: process.env.VUE_APP_WEB_ORDER + '/jyc/user/order/v1/manager/coupon',
		method: 'get',
		params,
	})
}
