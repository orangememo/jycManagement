import request from '@/utils/request'

//分页查询所有公司信息
export function getCompanyPageInfo(params){
  return request({
    url: '/company/page/info',
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
