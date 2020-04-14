import request from '@/utils/request'

//分页查询桌位详情信息
export function gettableList(params) {
    return request({
        url: '/HotelTableInfo/gethotelTableInfo',
        method: 'get',
        params: params
    })
}

//新增桌位详情信息
export function addNewtable(params) {
    return request({
        url: '/HotelTableInfo/addhotelTableInfo',
        method: 'post',
        data: params
    })
}

//修改桌位详情信息
export function updatetable(params) {
    return request({
        url: '/HotelTableInfo/updateHotelTableInfo',
        method: 'put',
        data: params
    })
}

//删除桌位详情信息
export function deltable(params) {
    return request({
        url: '/HotelTableInfo/removehotelTableInfo',
        method: 'delete',
        params: params
    })
}

//分页查询所有桌位标签
export function gettableLabelList(params) {
    return request({
        url: '/HotelTable/gethotelTable',
        method: 'get',
        params: params
    })
}

//新增桌位详情信息
export function addNewtableLabel(params) {
    return request({
        url: '/HotelTable/addhotelTable',
        method: 'post',
        data: params
    })
}

//修改桌位详情信息
export function updatetableLabel(params) {
    return request({
        url: '/HotelTable/updateHotelTable',
        method: 'put',
        data: params
    })
}

//删除桌位详情信息
export function deltableLabel(params) {
    return request({
        url: '/HotelTable/removehotelTable',
        method: 'delete',
        params: params
    })
}