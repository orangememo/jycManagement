import request from '@/utils/request'

//分页查询运营商信息
export function getCompanyPageHotel(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/company/page/operator',
		method: 'get',
		params: params,
	})
}
//置顶
export function companyTopWeight(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/company/top/weight',
		method: 'post',
		params: params,
	})
}
//新增运营商信息
export function addNewCompany(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/company/info/operator',
		method: 'post',
		data: params,
	})
}
//删除公司信息
export function delCompany(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/company/info',
		method: 'delete',
		params: params,
	})
}
//修改公司信息
export function updateCompany(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/company/operator/info',
		method: 'put',
		data: params,
	})
}
