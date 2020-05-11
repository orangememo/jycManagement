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
/**
 * 预定列表
 */
export function getInformationHotelPage(params) {
	return request({
		url: process.env.VUE_APP_WEB_ORDER + '/jyc/table/information/hotel/page',
		method: 'get',
		params,
	})
}
/**
 * 拒绝预定
 */
export function deleteInformationHotel(params) {
	return request({
		url: process.env.VUE_APP_WEB_ORDER + '/jyc/table/information/hotel/del',
		method: 'delete',
		params,
	})
}
/**
 * 预定信息
 */
export function getInformationHotelId(params) {
	return request({
		url: process.env.VUE_APP_WEB_ORDER + '/jyc/table/information/hotel/id',
		method: 'get',
		params,
	})
}
/**
 * 指定预定座位
 */
export function putInformationTable(params) {
	return request({
		url: process.env.VUE_APP_WEB_ORDER + '/jyc/table/information/hotel/table',
		method: 'PUT',
		params,
	})
}

/**
 * 查询可用座位
 */
export function getInformationTable(data) {
	return request({
		url: process.env.VUE_APP_WEB_ORDER + '/jyc/table/information/hotel/floor/table',
		method: 'post',
		data,
	})
}

/**
 * 酒店订单管理
 */
export function getBusinessOrderPage(params) {
	return request({
		url: process.env.VUE_APP_WEB_ORDER + '/jyc/border/page',
		method: 'get',
		params,
	})
}
/**
 * 酒店订单详情
 */
export function getBusinessOrderInfo(params) {
	return request({
		url: process.env.VUE_APP_WEB_ORDER + '/jyc/border/page/info',
		method: 'get',
		params,
	})
}

/**
 * 优惠券列表导出
 */
export function exportMemberCouponList(responseType) {
	return request({
		url: process.env.VUE_APP_WEB_ORDER + '/jyc/user/order/v1/manager/coupon/export',
		method: 'get',
		responseType,
	})
}
/**
 * 会员订单列表导出
 */
export function exportMemberOrderList(responseType) {
	return request({
		url: process.env.VUE_APP_WEB_ORDER + '/jyc/user/order/v1/manager/order/admin/export',
		method: 'get',
		responseType,
	})
}
