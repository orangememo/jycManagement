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
