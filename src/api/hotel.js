import request from '@/utils/request'

//分页查询代理商下所有酒店
export function getHotelList(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/lp/lp/lpHotel/list',
		method: 'get',
		params: params,
	})
}

//根据代理商ID和酒店名称查询酒店信息
export function getHotelListByName(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/lp/lp/app/listhotelname',
		method: 'get',
		params: params,
	})
}

//订单信息汇总

export function getLpHotelQuyu(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/lp/lp/lpHotel/quyu',
		method: 'get',
		params: params,
	})
}

export function getLpHotelSelectqykc(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/lp/lp/lpHotel/selectqykc',
		method: 'get',
		params: params,
	})
}

export function getLpHotelSelectqyzxt(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/lp/lp/lpHotel/selectqyzxt',
		method: 'get',
		params: params,
	})
}

export function getLpHotelCtxf(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/lp/lp/lpHotel/selectxf',
		method: 'get',
		params: params,
	})
}
