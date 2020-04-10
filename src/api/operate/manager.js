import request from '@/utils/request'

//分页查询所有公司信息
export function getCompanyPageOperator(params){
  return request({
    url: '/company/page/operator',
    method: 'get',
    params: params
  })
}
//分页查询子公司信息
export function getCompanyOperatorHotel(params){
  return request({
    url: '/company/operator/hotel',
    method: 'get',
    params: params
  })
}
//分页查询酒店信息
export function getCompanyPageHotel(params){
  return request({
    url: '/company/page/hotel',
    method: 'get',
    params: params
  })
}
//置顶
export function companyTopWeight(params){
  return request({
    url: '/company/top/weight',
    method: 'post',
    params: params
  })
} 
//新增公司信息
export function addNewCompany(params){
  return request({
    url: '/company/info/operator',
    method: 'post',
    data: params
  })
}
//删除公司信息
export function delCompany(params){
  return request({
    url: '/company/info',
    method: 'delete',
    params: params
  })
}
//修改公司信息
export function updateCompany(params){
  return request({
    url: '/company/hotel/info',
    method: 'put',
    data: params
  })
} 

