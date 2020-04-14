import request from '@/utils/request'

//分页查询桌位详情信息
export function getTabelList(params) {
    return request({
        url: '/HotelTableInfo/gethotelTableInfo',
        method: 'get',
        params: params
    })
}

//新增桌位详情信息
export function addNewTabel(params) {
    return request({
        url: '/HotelTableInfo/addhotelTableInfo',
        method: 'post',
        data: params
    })
}

//修改桌位详情信息
export function updateTabel(params) {
    return request({
        url: '/HotelTableInfo/updateHotelTableInfo',
        method: 'put',
        data: params
    })
}

//删除桌位详情信息
export function delTabel(params) {
    return request({
        url: '/HotelTableInfo/removehotelTableInfo',
        method: 'delete',
        params: params
    })
}

//分页查询所有桌位标签
export function getTabelLabelList(params) {
    return request({
        url: '/HotelTable/gethotelTable',
        method: 'get',
        params: params
    })
}

//新增桌位详情信息
export function addNewTabelLabel(params) {
    return request({
        url: '/HotelTable/addhotelTable',
        method: 'post',
        data: params
    })
}

//修改桌位详情信息
export function updateTabelLabel(params) {
    return request({
        url: '/HotelTable/updateHotelTable',
        method: 'put',
        data: params
    })
}

//删除桌位详情信息
export function delTabelLabel(params) {
    return request({
        url: '/HotelTable/removehotelTable',
        method: 'delete',
        params: params
    })
}