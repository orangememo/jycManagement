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
export const upLoadVideo = process.env.VUE_APP_WEB_MANAGE + `/video/upload`

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

/**
 * 获取新闻中心列表(PC)
 */
export function getNewsCenterInfoPage(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/jycNewsCenter/jycNewsCenterInfo/page/list',
		method: 'get',
		params,
	})
}
/**
 * 新增新闻中心列表(PC)
 */
export function addNewsCenterInfo(data) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/jycNewsCenter/jycNewsCenterInfo',
		method: 'post',
		data,
	})
}
/**
 * 更新新闻中心列表(PC)
 */
export function putNewsCenterInfo(data) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/jycNewsCenter/centerInfo',
		method: 'put',
		data,
	})
}
/**
 * 更新新闻中心列表(PC)
 */
export function deleteNewsCenterInfo(data) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/jycNewsCenter/jycNewsCenterInfo/id',
		method: 'delete',
		data,
	})
}

/**
 * 获取banner列表(PC)
 */
export function getBannerInfoPage(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/jycHomePage/jycHomePageInfo/page/list',
		method: 'get',
		params,
	})
}
/**
 * 新增banner
 */
export function addBannerInfo(data) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/jycHomePage/jycHomePageInfo',
		method: 'post',
		data,
	})
}
/**
 * 修改banner
 */
export function putBannerInfo(data) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/jycHomePage/homePageInfo',
		method: 'put',
		data,
	})
}
/**
 * 删除banner
 */
export function deleteBannerInfoList(data) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/jycHomePage/jycHomePageInfo/id',
		method: 'DELETE',
		data,
	})
}
/**
 * 获取应用
 */
export function getApplicationList(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/application/applicationInfo',
		method: 'get',
		params,
	})
}
/**
 * 获取公司
 */
export function getcompanyInfoIdList(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/account/companyInfoIdList',
		method: 'get',
		params,
	})
}
/**
 * 获取视频
 */
export function getVideoInfoList(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/jycVideo/jycVideoInfo/page/list',
		method: 'get',
		params,
	})
}
/**
 * 新增视频
 */
export function addVideoInfo(data) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/jycVideo/jycVideoInfo',
		method: 'post',
		data,
	})
}
/**
 * 修改视频
 */
export function putVideoInfo(data) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/jycVideo/jycVideoInfo',
		method: 'put',
		data,
	})
}
/**
 * 修改视频
 */
export function deleteVideoInfo(data) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/jycVideo/jycVideoInfo/id',
		method: 'delete',
		data,
	})
}
/**
 * 新增意见反馈
 */
export function addFeedbackInfo(data) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/jycFeedback/jycFeedback',
		method: 'post',
		data,
	})
}
/**
 * 意见反馈列表
 */
export function getFeedbackInfoListPage(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/jycFeedback/jycFeedback/page/list',
		method: 'get',
		params,
	})
}

/**
 * 运营商采购订单
 */
export function getYyVorderPageList(params) {
	return request({
		url: process.env.VUE_APP_WEB_ORDER + '/jyc/vorder/yy/cancel/order',
		method: 'get',
		params,
	})
}
/**
 * 分页查询采购订单
 */
export function getVorderPageList(params) {
	return request({
		url: process.env.VUE_APP_WEB_ORDER + '/jyc/vorder/page',
		method: 'get',
		params,
	})
}
/**
 * 添加采购订单
 */
export function addVorderInfo(data) {
	return request({
		url: process.env.VUE_APP_WEB_ORDER + '/jyc/vorder/add',
		method: 'post',
		data,
	})
}
/**
 * 修改采购订单状态
 */
export function putVorderInfoState(params) {
	return request({
		url: process.env.VUE_APP_WEB_ORDER + '/jyc/vorder/order/state',
		method: 'PUT',
		params,
	})
}
/**
 * 取消采购订单
 */
export function cancelVorderInfoState(params) {
	return request({
		url: process.env.VUE_APP_WEB_ORDER + '/jyc/vorder/cancel/order',
		method: 'get',
		params,
	})
}
/**
 * 删除采购记录
 */
export function deleteVorderInfoState(params) {
	return request({
		url: process.env.VUE_APP_WEB_ORDER + '/jyc/vorder/order',
		method: 'DELETE',
		params,
	})
}
/**
 * 查看采购订单详情
 */
export function getVorderInfo(params) {
	return request({
		url: process.env.VUE_APP_WEB_ORDER + '/jyc/vorder/order/info',
		method: 'GET',
		params,
	})
}
/**
 * 获取加盟酒店申请信息列表（PC）
 */
export function getJoinInformationListPage(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/jycJoinInformation/jycJoinInformation/page/list',
		method: 'GET',
		params,
	})
}
/**
 * 修改加盟酒店申请信息状态（PC）
 */
export function putJoinInformationState(data) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/jycJoinInformation/jycJoinInformation/id',
		method: 'put',
		data,
	})
}
