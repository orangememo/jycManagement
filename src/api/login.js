import request from '@/utils/request'

/**
 * 登录
 */

export function loginJyc(data) {
	return request({
		url: '/manager/jyc/v1/login',
		method: 'post',
		data
	})
}
/**
 * 根据账户获取权限树
 */
export function loginInfo(params) {
	return request({
		url: '/rule/ruleInfo/tree/accountId',
		method: 'GET',
		params
	})
}
/**
 * 修改密码
 */
export function putUserInfoPassword(data) {
	return request({
		url: '/manager/jyc/v1/user/password',
		method: 'put',
		data
	})
}
/**
 * 重置密码
 */
export function putRetrievePassword(data) {
	return request({
		url: '/manager/jyc/v1/retrieve/password',
		method: 'put',
		data
	})
}
