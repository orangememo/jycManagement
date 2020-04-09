import request from '@/utils/request'

/**
 * 登录
 */

export function loginJyc(data) {
	return request({
		url: '/manager/jyc/v1/login',
		method: 'post',
		data,
	})
}
export function loginInfo(params) {
	return request({
		url: '/account/roleInfo/ruleInfo',
		method: 'GET',
		params,
	})
}
