import request from '@/utils/request'
let url = "http://192.168.0.108:8085/"

//分页查询酒店信息
export function getLabelList(params){
  return request({
    url: url+'/label/companyInfo',
    method: 'get',
    params: params
  })
}

