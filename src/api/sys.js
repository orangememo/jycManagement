import request from '@/utils/request'

/**
 * 获取权限树
 */

export function getRuleInfoTree(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/rule/ruleInfo/tree/accountId',
		method: 'get',
		params,
	})
}

/**
 * 删除菜单 权限
 */

export function deleteRuleInfo(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/rule/rule',
		method: 'DELETE',
		params,
	})
}
/**
 * 新增菜单 权限
 */

export function addRuleInfo(data) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/rule/rule',
		method: 'POST',
		data,
	})
}
/**
 * 修改菜单 权限
 */

export function putRuleInfo(data) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/rule/ruleInfo/ruleId',
		method: 'PUT',
		data,
	})
}
/**
 * 根据ruleId获取权限信息
 */
export function getRuleInfo(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/rule/ruleInfo/ruleId',
		method: 'GET',
		params,
	})
}

/**
 * 获取角色树
 */
export function getRoleInfoTree(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/role/role/tree/list/accountId',
		method: 'get',
		params,
	})
}
/**
 * 获取账户默认角色和默认不可选角色list
 */
export function getParentRoleIdList(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/role/parentRoleIdList/tree/accountId',
		method: 'get',
		params,
	})
}

/**
 * 获取角色树，不包括默认角色
 */
export function roleInfoTreeAccountId(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/role/role/tree/list/accountId',
		method: 'get',
		params,
	})
}

/**
 * 新增角色信息
 */
export function addRoleInfo(data) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/role/role',
		method: 'post',
		data,
	})
}
/**
 * 删除角色
 */
export function deleteRoleInfo(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/role/role',
		method: 'delete',
		params,
	})
}
/**
 * 获取角色信息
 */
export function getRoleInfo(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/role/roleInfo/roleId',
		method: 'get',
		params,
	})
}

/**
 * 修改角色信息
 */
export function putRoleInfo(data) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/role/roleInfo/roleId',
		method: 'put',
		data,
	})
}

// export function getRoleInfoTree(params) {
//     return request({
//         url: "/rule/ruleInfo/tree",
//         method: "get",
//         params
//     });
// }
/**
 * 分页查询用户列表
 */

export function getManagerUserInfoPageList(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/manager/userInfo/page/list',
		method: 'get',
		params,
	})
}
/**
 * 新增用户信息
 */

export function postManagerUserInfo(data) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/manager/userInfo',
		method: 'post',
		data,
	})
}
/**
 * 修改用户信息
 */

export function putManagerUserInfo(data) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/manager/jyc/v1/improve/user/info',
		method: 'put',
		data,
	})
}

/**
 * 删除用户
 */

export function deleteManagerUserInfo(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/manager/jyc/v1/user/del',
		method: 'DELETE',
		params,
	})
}
/**
 * 获取用户信息
 */

export function getManagerUserInfo(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/manager/userInfo/userInfoId',
		method: 'get',
		params,
	})
}
/**
 * 管理员日志
 */

export function getManagerLogInfo(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/manager/logInfo/page/list',
		method: 'get',
		params,
	})
}
