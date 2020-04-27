import request from '@/utils/request'

//分页查询标签信息
export function getLabelList(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/label/companyInfo',
		method: 'get',
		params: params,
	})
}

//新增标签信息
export function addNewLabel(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/label/addCompanyInfo',
		method: 'post',
		data: params,
	})
}

//修改标签信息
export function updateLabel(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/label/updateCompanyInfo',
		method: 'put',
		data: params,
	})
}

//删除标签信息
export function delLabel(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/label/companyInfo',
		method: 'delete',
		params: params,
	})
}
