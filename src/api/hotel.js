import request from '@/utils/request'

let url = "http://49.234.12.49:9090/lp"

//分页查询代理商下所有酒店
export function getHotelList(params){
  return request({
    url: url+'/lp/lpHotel/list',
    method: 'get',
    params: params
  })
}

//根据代理商ID和酒店名称查询酒店信息
export function getHotelListByName(params){
    return request({
      url: url+'/lp/app/listhotelname',
      method: 'get',
      params: params
    })
}