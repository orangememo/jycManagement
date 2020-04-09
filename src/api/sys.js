import request from "@/utils/request";

/**
 * 获取权限树
 */

export function getRuleInfoTree(params) {
    return request({
        url: "/rule/ruleInfo/tree",
        method: "get",
        params
    });
}

/**
 * 删除菜单 权限
 */

export function deleteRuleInfo(params) {
    return request({
        url: "/rule/rule",
        method: "DELETE",
        params
    });
}
/**
 * 新增菜单 权限
 */

export function addRuleInfo(data) {
    return request({
        url: "/rule/rule",
        method: "POST",
        data
    });
}
/**
 * 修改菜单 权限
 */

export function putRuleInfo(data) {
    return request({
        url: "/rule/ruleInfo/ruleId",
        method: "PUT",
        data
    });
}
/**
 * 根据ruleId获取权限信息
 */
export function getRuleInfo(params) {
    return request({
        url: "/rule/ruleInfo/ruleId",
        method: "GET",
        params
    });
}

/**
 * 获取角色树
 */
export function getRoleInfoTree(params) {
    return request({
        url: "/role/roleInfo/tree",
        method: "get",
        params
    });
}
/**
 * 新增角色信息
 */
export function addRoleInfo(data) {
    return request({
        url: "/role/role",
        method: "post",
        data
    });
}
/**
 * 删除角色
 */
export function deleteRoleInfo(params) {
    return request({
        url: "/role/role",
        method: "delete",
        params
    });
}
/**
 * 获取角色信息
 */
export function getRoleInfo(params) {
    return request({
        url: "/role/roleInfo/roleId",
        method: "get",
        params
    });
}

/**
 * 修改角色信息
 */
export function putRoleInfo(data) {
    return request({
        url: "/role/roleInfo/roleId",
        method: "put",
        data
    });
}

// export function getRoleInfoTree(params) {
//     return request({
//         url: "/rule/ruleInfo/tree",
//         method: "get",
//         params
//     });
// }
