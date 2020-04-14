import request from '@/utils/request'

//分页查询所有应用信息
export function getApplyPageInfo(params){
  return request({
    url: '/application/page/info',
    method: 'get',
    params: params
  })
}
//查询公司下应用
export function getApplyByCompany(params){
  return request({
    url: '/application/list',
    method: 'get',
    params: params
  })
}
//置顶
export function companyTopWeight(params){
  return request({
    url: '/application/top/weight',
    method: 'post',
    params: params
  })
} 
//新增应用信息
export function addNewApply(params){
  return request({
    url: '/application/info',
    method: 'post',
    data: params
  })
}

//修改应用信息
export function updateApply(params){
  return request({
    url: '/application/info',
    method: 'put',
    data: params
  })
} 

//删除应用信息
export function delApply(params){
  return request({
    url: '/application/info',
    method: 'delete',
    params: params
  })
} 

