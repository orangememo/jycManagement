import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (RECOMMEND set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
	{
		path: '/',
		component: () => import('@/views/login/index'),
		hidden: true,
	},
	{
		path: '/login',
		component: () => import('@/views/login/index'),
		hidden: true,
	},
	{
		path: '/404',
		component: () => import('@/views/404'),
		hidden: true,
	},
	// {
	// 	path: '/selectCompanyApp',
	// 	name: 'selectCompanyApp',
	// 	component: () => import('@/views/login/selectCompanyApp'),
	// 	hidden: true,
	// },
	{
		path: '/dashboard',
		component: Layout,
		redirect: '/dashboard/index',
		children: [
			{
				path: 'index',
				name: 'Dashboard',
				component: () => import('@/views/dashboard/index'),
				meta: { title: 'Dashboard', icon: 'dashboard' },
			},
			{
				path: 'userInfo',
				name: 'userInfo',
				hidden: true,
				component: () => import('@/views/sys/userInfo/index'),
				meta: { title: '个人资料', icon: 'user' },
			},
		],
	},
	// {
	// 	path: '/appc',
	// 	component: Layout,
	// 	redirect: '/appc/index',
	// 	meta: {
	// 		title: 'appc',
	// 		icon: 'nested',
	// 	},
	// 	children: [
	// 		{
	// 			path: 'Cvideo',
	// 			name: 'Cvideo',
	// 			component: () => import('@/views/appc/appcCvideo'),
	// 			meta: { title: 'Cvideo', icon: '' },
	// 		},
	// 		{
	// 			path: 'appcFakeNews',
	// 			name: 'appcFakeNews',
	// 			component: () => import('@/views/appc/appcFakeNews'),
	// 			meta: { title: '新闻中心', icon: '' },
	// 		},
	// 		{
	// 			path: 'appcBanner',
	// 			name: 'appcBanner',
	// 			component: () => import('@/views/appc/appcBanner'),
	// 			meta: { title: '首页banner', icon: '' },
	// 		},
	// 	],
	// },
	// {
	// 	path: '/test',
	// 	component: Layout,
	// 	redirect: '/product/productList',
	// 	meta: {
	// 		title: '招聘面试',
	// 		icon: 'nested',
	// 	},
	// 	children: [
	// 		{
	// 			path: 'takeJob',
	// 			name: 'takeJob',
	// 			component: () => import('@/views/takeJob'),
	// 			meta: { title: 'takeJob', icon: '' },
	// 		},
	// 		// {
	// 		// 	path: 'upVideo',
	// 		// 	name: 'upVideo',
	// 		// 	component: () => import('@/components/upVideo'),
	// 		// 	meta: { title: 'upVideo', icon: '' },
	// 		// },
	// 	],
	// },
	// {
	// 	path: '/product',
	// 	component: Layout,
	// 	redirect: '/product/productList',
	// 	meta: {
	// 		title: '商品管理',
	// 		icon: 'nested',
	// 	},
	// 	children: [
	// 		{
	// 			path: 'productSkuList',
	// 			name: 'productSkuList',
	// 			component: () => import('@/views/product/productSkuList'),
	// 			meta: { title: 'SKU管理', icon: '' },
	// 		},
	// 		{
	// 			path: 'productSpuList',
	// 			name: 'productSpuList',
	// 			component: () => import('@/views/product/productSpuList'),
	// 			meta: { title: 'SPU管理', icon: '' },
	// 		},
	// 		{
	// 			path: 'productCategory',
	// 			name: 'productCategory',
	// 			component: () => import('@/views/product/productCategory'),

	// 			meta: { title: '商品类目管理', icon: '' },
	// 		},
	// 		{
	// 			path: 'productBrand',
	// 			name: 'productBrand',
	// 			component: () => import('@/views/product/productBrand'),

	// 			meta: { title: '商品品牌管理', icon: '' },
	// 		},
	// 		{
	// 			path: 'productStock',
	// 			name: 'productStock',
	// 			component: () => import('@/views/product/productStock'),

	// 			meta: { title: '商品库存管理', icon: '' },
	// 		},
	// 	],
	// },
	// {
	// 	path: '/my',
	// 	component: Layout,
	// 	redirect: '/manager',
	// 	name: 'my',
	// 	meta: {
	// 		title: '酒友财运营端',
	// 		icon: 'nested'
	// 	},
	// 	children: [
	// 		{
	// 			path: 'hotel',
	// 			component: () => import('@/views/my/manager/index'), // Parent router-view
	// 			name: 'hotel',
	// 			meta: { title: '酒店管理', icon: 'table' },
	// 			children: [
	// 				{
	// 					path: 'hotelList',
	// 					name: 'hotelList',
	// 					component: () => import('@/views/hotel/hotel/hotelList'),
	// 					meta: { title: '酒店列表', icon: 'link' }
	// 				},
	// 				{
	// 					path: 'foodList',
	// 					name: 'foodList',
	// 					component: () => import('@/views/hotel/food/foodList'),
	// 					meta: { title: '菜品列表', icon: 'link' },
	// 					hidden: true
	// 				},
	// 				{
	// 					path: 'houseList',
	// 					name: 'houseList',
	// 					component: () => import('@/views/hotel/house/houseList'),
	// 					meta: { title: '包厢列表', icon: 'link' },
	// 					hidden: true
	// 				},
	// 				{
	// 					path: 'orderList',
	// 					name: 'orderList',
	// 					component: () => import('@/views/hotel/order/orderList'),
	// 					meta: { title: '查看订单', icon: 'link' },
	// 					hidden: true
	// 				},
	// 				{
	// 					path: 'hotelDetal',
	// 					name: 'hotelDetal',
	// 					component: () => import('@/views/hotel/hotel/hotelDetail'),
	// 					meta: { title: '酒店详情', icon: 'link' },
	// 					hidden: true
	// 				}
	// 			]
	// 		},
	// 		{
	// 			path: 'manager',
	// 			component: () => import('@/views/my/manager/index'), // Parent router-view
	// 			name: 'manager',
	// 			meta: { title: '运营统计', icon: 'table' },
	// 			children: [
	// 				{
	// 					path: 'statistics',
	// 					component: () => import('@/views/my/manager/statistics'),
	// 					name: 'statistics',
	// 					meta: { title: '汇总信息', icon: 'link' }
	// 				},
	// 				{
	// 					path: 'regionSum',
	// 					component: () => import('@/views/my/manager/regionSum'),
	// 					name: 'regionSum',
	// 					meta: { title: '区域消费汇总', icon: 'link' }
	// 				},
	// 				{
	// 					path: 'hotelOrder',
	// 					component: () => import('@/views/my/manager/hotelOrder'),
	// 					name: 'hotelOrder',
	// 					meta: { title: '酒店购酒订单', icon: 'link' }
	// 				},
	// 				{
	// 					path: 'stock',
	// 					component: () => import('@/views/my/manager/stock'),
	// 					name: 'stock',
	// 					meta: { title: '总部酒店库存', icon: 'link' }
	// 				}
	// 			]
	// 		},
	// 		{
	// 			path: 'operate',
	// 			component: () => import('@/views/my/operate/index'), // Parent router-view
	// 			name: 'operate',
	// 			meta: { title: '运营中心', icon: 'table' },
	// 			children: [
	// 				{
	// 					path: 'message',
	// 					component: () => import('@/views/my/operate/message'),
	// 					name: 'message',
	// 					meta: { title: '运营资料', icon: 'link' }
	// 				},
	// 				{
	// 					path: 'notice',
	// 					component: () => import('@/views/my/operate/notice'),
	// 					name: 'notice',
	// 					meta: { title: '通知', icon: 'link' }
	// 				},
	// 				{
	// 					path: 'feedback',
	// 					component: () => import('@/views/my/operate/feedback'),
	// 					name: 'feedback',
	// 					meta: { title: '反馈', icon: 'link' }
	// 				}
	// 			]
	// 		}
	// 	]
	// },
	// {
	// 	path: '/myHotel',
	// 	component: Layout,
	// 	name: 'myHotel',
	// 	meta: {
	// 		title: '酒友财酒店端',
	// 		icon: 'nested'
	// 	},
	// 	children: [
	// 		{
	// 			path: 'home',
	// 			component: () => import('@/views/myHotel/home'), // Parent router-view
	// 			name: 'home',
	// 			meta: { title: '首页', icon: 'table' }
	// 		},
	// 		{
	// 			path: 'order',
	// 			component: () => import('@/views/business/commodity'), // Parent router-view
	// 			name: 'order',
	// 			meta: { title: '订单', icon: 'table' }
	// 		},
	// 		{
	// 			path: 'center',
	// 			component: () => import('@/views/myHotel/center/index'), // Parent router-view
	// 			name: 'center',
	// 			meta: { title: '店铺中心', icon: 'table' },
	// 			children: [
	// 				{
	// 					path: 'hotelList',
	// 					name: 'hotelList',
	// 					component: () => import('@/views/myHotel/center/hotelList'),
	// 					meta: { title: '酒店信息', icon: 'link' }
	// 				},
	// 				{
	// 					path: 'seat',
	// 					name: 'seat',
	// 					component: () => import('@/views/myHotel/center/seat'),
	// 					meta: { title: '预定选座', icon: 'link' }
	// 				},
	// 				{
	// 					path: 'stock',
	// 					name: 'stock',
	// 					component: () => import('@/views/myHotel/center/stock'),
	// 					meta: { title: '酒库存数', icon: 'link' }
	// 				},
	// 				{
	// 					path: 'seatManager',
	// 					name: 'seatManager',
	// 					component: () => import('@/views/myHotel/center/seatManager'),
	// 					meta: { title: '卡座管理', icon: 'link' }
	// 				},
	// 				{
	// 					path: 'hisOrder',
	// 					name: 'hisOrder',
	// 					component: () => import('@/views/myHotel/order'),
	// 					meta: { title: '历史订单', icon: 'link' }
	// 				},
	// 				{
	// 					path: 'buyRecords',
	// 					name: 'buyRecords',
	// 					component: () => import('@/views/my/manager/hotelOrder'),
	// 					meta: { title: '采购记录', icon: 'link' }
	// 				},
	// 				{
	// 					path: 'menuManager',
	// 					name: 'menuManager',
	// 					component: () => import('@/views/myHotel/center/menuManager'),
	// 					meta: { title: '菜单管理', icon: 'link' }
	// 				},
	// 				{
	// 					path: 'feedback',
	// 					name: 'feedback',
	// 					component: () => import('@/views/my/operate/feedback'),
	// 					meta: { title: '意见反馈', icon: 'link' }
	// 				},
	// 				{
	// 					path: 'notice',
	// 					name: 'notice',
	// 					component: () => import('@/views/my/operate/notice'),
	// 					meta: { title: '系统通知', icon: 'link' }
	// 				}
	// 			]
	// 		}
	// 	]
	// }
	// 404 page must be placed at the end !!!
]

const createRouter = () =>
	new Router({
		// mode: 'history', // require service support
		scrollBehavior: () => ({ y: 0 }),
		routes: constantRoutes,
	})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
	const newRouter = createRouter()
	router.matcher = newRouter.matcher // reset router
}

export default router
