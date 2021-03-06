import request from '@/utils/request'

/**
 * 获取品牌分页
 */

export function getBrandPage(params) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/brand/page',
		method: 'get',
		params,
	})
}

/**
 * 获取品牌分页
 */

export function getBrandList(params) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/brand/list',
		method: 'get',
		params,
	})
}

/**
 * 新增品牌
 */

export function addBrandInfo(data) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/brand/info',
		method: 'POST',
		data,
	})
}

/**
 * 修改品牌
 */

export function putBrandInfo(data) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/brand/info',
		method: 'PUT',
		data,
	})
}

/**
 * 获取品牌信息
 */

export function getBrandInfo(params) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/brand/brandInfo/brandId',
		method: 'get',
		params,
	})
}
/**
 * 删除品牌
 */

export function deleteBrandInfo(params) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/brand/info',
		method: 'delete',
		params,
	})
}
/**
 * 获取类目列表分页
 */

export function getCatalogPage(params) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/catalog/page',
		method: 'get',
		params,
	})
}
/**
 * 类目置顶
 */

export function putCatalogTop(data) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/catalog/top/weight',
		method: 'put',
		data,
	})
}
/**
 * 删除类目
 */

export function deleteCatalogInfo(params) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/catalog/info',
		method: 'delete',
		params,
	})
}
/**
 * 获取类目列表
 */

export function getCatalogList(params) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/catalog/list',
		method: 'get',
		params,
	})
}
/**
 * 获取类目列表
 */

export function addCatalogInfo(data) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/catalog/info',
		method: 'post',
		data,
	})
}
/**
 * 获取类目列表
 */

export function putCatalogInfo(data) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/catalog/info',
		method: 'put',
		data,
	})
}
/**
 * 获取类目信息
 */

export function getCatalogInfo(params) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/catalog/catalogInfo/catalogId',
		method: 'get',
		params,
	})
}
/**
 * 获取库存列表
 */

export function getStockListPage(params) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/stock/JycCommodityStockInfo/page',
		method: 'get',
		params,
	})
}
/**
 * 修改库存数量
 */

export function putStockInfoById(data) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/stock/JycCommodityStockInfo/stockId',
		method: 'put',
		data,
	})
}
/**
 * 分页获取商品sku列表
 */

export function getSkuInfoPage(params) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/sku/JycCommoditySkuInfo/page',
		method: 'get',
		params,
	})
}

/**
 * sku生成spu
 */

export function skuToSpu(data) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/sku/skuIdList',
		method: 'POST',
		data,
	})
}
/**
 * 删除sku
 */

export function deleteSkuInfo(data) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/sku/jycCommoditySkuInfo/skuIdList',
		method: 'delete',
		data,
	})
}
/**
 * 新增sku
 */

export function addSkuInfo(data) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/sku/jycCommoditySkuInfo',
		method: 'post',
		data,
	})
}
/**
 * 修改sku
 */

export function putSkuInfo(data) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/sku/JycCommoditySkuInfo/skuId',
		method: 'put',
		data,
	})
}
/**
 * 获取Sku信息
 */

export function getSkuInfo(params) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/sku/skuInfo/skuId',
		method: 'get',
		params,
	})
}
/**
 * spu上下架
 */

export function postUpperShelfSku(data) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/sku/upperShelf',
		method: 'POST',
		data,
	})
}

/**
 * 获取供应商
 */

export function getSupplierInfoList(params) {
	return request({
		url: process.env.VUE_APP_WEB_MANAGE + '/company/supplierInfo',
		method: 'get',
		params,
	})
}

/**
 * 分页获取SpuList
 */

export function getSpuListPage(params) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/spu/page',
		method: 'get',
		params,
	})
}
/**
 * spu上下架
 */

export function postUpperShelfSpu(data) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/spu/upperShelf',
		method: 'POST',
		data,
	})
}
/**
 * spu删除
 */

export function deleteSpuInfo(params) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/spu/info',
		method: 'delete',
		params,
	})
}
/**
 * spuId获取SPU信息
 */

export function getSpuInfo(params) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/spu/spuInfo/spuId',
		method: 'get',
		params,
	})
}
/**
 * spuId获取SPU信息
 */

export function putSpuInfo(data) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/spu/info',
		method: 'put',
		data,
	})
}
/**
 * 菜品分页
 */

export function getExceptionListPage(params) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/jycDishTypeDetails/exception/page',
		method: 'get',
		params,
	})
}
/**
 * 添加菜品
 */

export function addDishDetails(data) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/jycDishTypeDetails',
		method: 'post',
		data,
	})
}

/**
 * 菜品信息
 */

export function getDishTypeDetails(params) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/jycDishTypeDetails/id',
		method: 'get',
		params,
	})
}

/**
 * 菜系
 */

export function getDishTypeList(params) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/jycDishType/list/by/hotel',
		method: 'get',
		params,
	})
}

/**
 * 菜系分页
 */

export function getDishTypePage(params) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/jycDishType/page',
		method: 'get',
		params,
	})
}

/**
 * 添加菜希
 */

export function addDishType(data) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/jycDishType/info',
		method: 'post',
		data,
	})
}
/**
 * 修改菜希
 */

export function putDishType(data) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/jycDishType/info',
		method: 'put',
		data,
	})
}

/**
 * 删除菜希
 */

export function deleteDishType(params) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/jycDishType/info',
		method: 'delete',
		params,
	})
}
/**
 * 酒店上架和下架
 */

export function unDownDishTypeDetails(params) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/jycDishTypeDetails/up/down/info',
		method: 'PUT',
		params,
	})
}
/**
 * 酒店上架和下架
 */

export function selloutDishTypeDetails(params) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/jycDishTypeDetails/sellout',
		method: 'POST',
		params,
	})
}
/**
 * 置顶
 */

export function firstDishTypeDetails(params) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/jycDishTypeDetails/first/id',
		method: 'PUT',
		params,
	})
}
/**
 * 置顶
 */

export function putDishTypeDetails(data) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/jycDishTypeDetails/info',
		method: 'PUT',
		data,
	})
}
/**
 * 运营商审核
 */

export function checkDishTypeDetails(data) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/jycDishTypeDetails/check',
		method: 'POST',
		data,
	})
}
/**
 * 查询可供应商可采购商品接口（APP）
 */

export function getCommoditySkuInfoList(params) {
	return request({
		url: process.env.VUE_APP_DEV_API + '/purchase/JycCommoditySkuInfo/page',
		method: 'get',
		params,
	})
}
