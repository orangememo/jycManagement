import request from '@/utils/request'

/**
 * 分页查询应用版本
 */

export function getUserAccountListPage(params) {
	return request({
		url: process.env.VUE_APP_WEB_ACCOUNT + '/user/jyc/v1/account/list',
		method: 'get',
		params,
	})
}
