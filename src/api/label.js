import request from '@/utils/request'

//分页查询酒店信息
export function getLabelList(params){
  return request({
    url: '/label/companyInfo',
    method: 'get',
    params: params
  })
}

