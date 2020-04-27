export const componentsMap = {
	sysMenu: () => import('@/views/sys/menu/index'),
	sysAdmins: () => import('@/views/sys/admins/index'),
	sysRole: () => import('@/views/sys/role/index'),
	sysAdminslog: () => import('@/views/sys/adminLog'),
	memberManagement: () => import('@/views/member/memberManagement'),
	versionManagement: () => import('@/views/member/versionManagement'),
	memberGroup: () => import('@/views/member/memberGroup/index'),
	memberOrder: () => import('@/views/member/memberOrder/index'),
	inviteCode: () => import('@/views/member/inviteCode'),
	consumptionEnvelope: () => import('@/views/member/consumptionEnvelope'),
	businessHotelType: () => import('@/views/business/hotelType'),
	businessTableLabelManager: () => import('@/views/business/tableLabelManager'),
	businessTableManager: () => import('@/views/business/tableManager'),
	operateManager: () => import('@/views/operate/manager'),
	businessLabelManager: () => import('@/views/business/labelManager'),
	applyManager: () => import('@/views/apply/manager'),
	productSkuList: () => import('@/views/product/productSkuList'),
	productSpuList: () => import('@/views/product/productSpuList'),
	productCategory: () => import('@/views/product/productCategory'),
	productBrand: () => import('@/views/product/productBrand'),
	productStock: () => import('@/views/product/productStock'),
}
// {
// 		path: '/product',
// 		component: Layout,
// 		redirect: '/product/productList',
// 		meta: {
// 			title: '商品管理',
// 			icon: 'nested',
// 		},
// 		children: [
// 			{
// 				path: 'productSkuList',
// 				name: 'productSkuList',
// 				component: () => import('@/views/product/productSkuList'),
// 				meta: { title: 'SKU管理', icon: '' },
// 			},
// 			{
// 				path: 'productSpuList',
// 				name: 'productSpuList',
// 				component: () => import('@/views/product/productSpuList'),
// 				meta: { title: 'SPU管理', icon: '' },
// 			},
// 			{
// 				path: 'productCategory',
// 				name: 'productCategory',
// 				component: () => import('@/views/product/productCategory'),

// 				meta: { title: '商品类目管理', icon: '' },
// 			},
// 			{
// 				path: 'productBrand',
// 				name: 'productBrand',
// 				component: () => import('@/views/product/productBrand'),

// 				meta: { title: '商品品牌管理', icon: '' },
// 			},
// 			{
// 				path: 'productStock',
// 				name: 'productStock',
// 				component: () => import('@/views/product/productStock'),

// 				meta: { title: '商品库存管理', icon: '' },
// 			},
// 		],
// 	},
