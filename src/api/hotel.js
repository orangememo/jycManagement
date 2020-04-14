import request from '@/utils/request'

//分页查询代理商下所有酒店
export function getHotelList(params){
  return request({
    url: '/lp/lp/lpHotel/list',
    method: 'get',
    params: params
  })
}

//根据代理商ID和酒店名称查询酒店信息
export function getHotelListByName(params){
    return request({
      url: '/lp/lp/app/listhotelname',
      method: 'get',
      params: params
    })
}