import request from '@/utils/request'

/**
 * 分页查询应用版本
 */

export function getVersionPageInfo(params) {
	return request({
		url: '/version/page/info',
		method: 'get',
		params
	})
}

/**
 * 增加应用版本
 */

export function addVersionInfo(data) {
	return request({
		url: '/version/info',
		method: 'post',
		data
	})
}
/**
 * 修改应用版本
 */

export function putVersionInfo(data) {
	return request({
		url: '/version/info',
		method: 'PUT',
		data
	})
}
/**
 * 修改应用版本
 */

export function getVersionInfo(params) {
	return request({
		url: '/version/versionInfo/id',
		method: 'get',
		params
	})
}

export const upLoadImg = `http://49.234.12.49/lp/lp/lpVuser/edits`
