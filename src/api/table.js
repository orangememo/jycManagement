import request from '@/utils/request'

//分页查询桌位详情信息
export function gettableList(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/HotelTableInfo/gethotelTableInfo',
		method: 'get',
		params: params,
	})
}

//新增桌位详情信息
export function addNewtable(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/HotelTableInfo/addhotelTableInfo',
		method: 'post',
		data: params,
	})
}

//修改桌位详情信息
export function updatetable(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/HotelTableInfo/updateHotelTableInfo',
		method: 'put',
		data: params,
	})
}

//删除桌位详情信息
export function deltable(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/HotelTableInfo/removehotelTableInfo',
		method: 'delete',
		params: params,
	})
}

//分页查询所有桌位标签
export function gettableLabelList(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/HotelTable/gethotelTable',
		method: 'get',
		params: params,
	})
}

//新增桌位详情信息
export function addNewtableLabel(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/HotelTable/addhotelTable',
		method: 'post',
		data: params,
	})
}

//修改桌位详情信息
export function updatetableLabel(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/HotelTable/updateHotelTable',
		method: 'put',
		data: params,
	})
}

//删除桌位详情信息
export function deltableLabel(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/HotelTable/removehotelTable',
		method: 'delete',
		params: params,
	})
}
