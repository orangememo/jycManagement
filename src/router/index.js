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
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
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
		hidden: true
	},
	{
		path: '/login',
		component: () => import('@/views/login/index'),
		hidden: true
	},
	{
		path: '/404',
		component: () => import('@/views/404'),
		hidden: true
	},
	{
		path: '/selectCompanyApp',
		name: 'selectCompanyApp',
		component: () => import('@/views/login/selectCompanyApp'),
		hidden: true
	},
	{
		path: '/dashboard',
		component: Layout,
		redirect: '/dashboard/index',
		children: [
			{
				path: 'index',
				name: 'Dashboard',
				component: () => import('@/views/dashboard/index'),
				meta: { title: 'Dashboard', icon: 'dashboard' }
			},
			{
				path: 'userInfo',
				name: 'userInfo',
				hidden: true,
				component: () => import('@/views/sys/userInfo/index'),
				meta: { title: '个人资料', icon: 'user' }
			}
		]
	}
	// {
	// 	path: '/sys',
	// 	component: Layout,
	// 	redirect: '/sys/menu',
	// 	// name: "Nested",
	// 	meta: {
	// 		title: '权限管理',
	// 		icon: 'nested'
	// 	},
	// 	children: [
	// 		{
	// 			path: 'index',
	// 			name: 'admins',
	// 			component: () => import('@/views/sys/admins/index'),
	// 			meta: { title: '管理员管理', icon: 'form' }
	// 		},
	// 		{
	// 			path: 'adminslog',
	// 			name: 'adminsLog',
	// 			component: () => import('@/views/sys/adminLog/index'),
	// 			meta: { title: '管理员日志', icon: 'form' }
	// 		},
	// 		{
	// 			path: 'role',
	// 			name: 'role',
	// 			component: () => import('@/views/sys/role/index'),
	// 			meta: { title: '角色组', icon: 'form' }
	// 		},
	// 		{
	// 			path: 'menu',
	// 			name: 'menu',
	// 			component: () => import('@/views/sys/menu/index'),
	// 			meta: { title: '菜单规则', icon: 'form' }
	// 		}
	// 		// {
	// 		//   path: "test",
	// 		//   name: "test",
	// 		//   component: () => import("@/views/hotelList"),
	// 		//   meta: { title: "test", icon: "11" }
	// 		// }
	// 	]
	// },
	// {
	// 	path: '/member',
	// 	component: Layout,
	// 	redirect: '/member/index',
	// 	// name: "Nested",
	// 	meta: {
	// 		title: '会员管理',
	// 		icon: 'nested'
	// 	},
	// 	children: [
	// 		{
	// 			path: 'index',
	// 			name: 'memberManagement',
	// 			component: () => import('@/views/member/memberManagement'),
	// 			meta: { title: '会员管理', icon: 'form' }
	// 		},
	// 		// {
	// 		//     path: "membergroup",
	// 		//     name: "memberGroup",
	// 		//     component: () => import("@/views/member/memberGroup"),
	// 		//     meta: { title: "会员分组", icon: "form" }
	// 		// },
	// 		// {
	// 		//     path: "memberrules",
	// 		//     name: "memberRules",
	// 		//     component: () => import("@/views/member/memberRules"),
	// 		//     meta: { title: "会员规则", icon: "form" }
	// 		// },
	// 		{
	// 			path: 'versionManagement',
	// 			name: 'versionManagement',
	// 			component: () => import('@/views/member/versionManagement'),
	// 			meta: { title: '版本管理', icon: 'form' }
	// 		},
	// 		{
	// 			path: 'inviteCode',
	// 			name: 'inviteCode',
	// 			component: () => import('@/views/member/inviteCode'),
	// 			meta: { title: '用户邀请码', icon: 'form' }
	// 		},
	// 		{
	// 			path: 'consumptionEnvelope',
	// 			name: 'consumptionEnvelope',
	// 			component: () => import('@/views/member/consumptionEnvelope'),
	// 			meta: { title: '消费红包', icon: 'form' }
	// 		}
	// 	]
	// },
	// // {
	// //   path: 'foodList',
	// //   name: 'foodList',
	// //   component: () => import('@/views/hotel/food/foodList'),
	// //   hidden: false
	// // },
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
	// 					path: 'messageList',
	// 					name: 'messageList',
	// 					component: () => import('@/views/my/manager/regionSum'),
	// 					meta: { title: '汇总信息', icon: 'link' }
	// 				},
	// 				{
	// 					path: 'statistics',
	// 					component: () => import('@/views/my/manager/statistics'),
	// 					name: 'statistics',
	// 					meta: { title: '平台数据统计', icon: 'link' }
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
	// },
	// {
	// 	path: '/business',
	// 	component: Layout,
	// 	name: 'business',
	// 	meta: {
	// 		title: '商家管理',
	// 		icon: 'nested'
	// 	},
	// 	children: [
	// 		{
	// 			path: 'home',
	// 			component: () => import('@/views/business/commodity'), // Parent router-view
	// 			name: 'home',
	// 			meta: { title: '商家商品库', icon: 'table' }
	// 		},
	// 		{
	// 			path: 'hotelType',
	// 			component: () => import('@/views/business/hotelType'), // Parent router-view
	// 			name: 'hotelType',
	// 			meta: { title: '酒店分类', icon: 'table' }
	// 		},
	// 		{
	// 			path: 'order2',
	// 			component: () => import('@/views/business/commodity'), // Parent router-view
	// 			name: 'order2',
	// 			meta: { title: '菜单标签', icon: 'table' }
	// 		},
	// 		{
	// 			path: 'order3',
	// 			component: () => import('@/views/business/commodity'), // Parent router-view
	// 			name: 'order3',
	// 			meta: { title: '菜单详情管理', icon: 'table' }
	// 		},
	// 		{
	// 			path: 'order4',
	// 			component: () => import('@/views/business/commodity'), // Parent router-view
	// 			name: 'order4',
	// 			meta: { title: '会员管理', icon: 'table' }
	// 		},
	// 		{
	// 			path: 'order5',
	// 			component: () => import('@/views/business/commodity'), // Parent router-view
	// 			name: 'order5',
	// 			meta: { title: '酒店桌位标签管理', icon: 'table' }
	// 		},
	// 		{
	// 			path: 'order6',
	// 			component: () => import('@/views/business/commodity'), // Parent router-view
	// 			name: 'order6',
	// 			meta: { title: '会员分组', icon: 'table' }
	// 		},
	// 		{
	// 			path: 'order7',
	// 			component: () => import('@/views/business/commodity'), // Parent router-view
	// 			name: 'order7',
	// 			meta: { title: '会员规则', icon: 'table' }
	// 		},
	// 		{
	// 			path: 'order8',
	// 			component: () => import('@/views/business/commodity'), // Parent router-view
	// 			name: 'order8',
	// 			meta: { title: '版本管理', icon: 'table' }
	// 		},
	// 		{
	// 			path: 'order9',
	// 			component: () => import('@/views/business/commodity'), // Parent router-view
	// 			name: 'order9',
	// 			meta: { title: '订单管理', icon: 'table' }
	// 		},
	// 		{
	// 			path: 'order10',
	// 			component: () => import('@/views/business/commodity'), // Parent router-view
	// 			name: 'order10',
	// 			meta: { title: '酒店桌位详情管理', icon: 'table' }
	// 		},
	// 		{
	// 			path: 'order11',
	// 			component: () => import('@/views/business/commodity'), // Parent router-view
	// 			name: 'order11',
	// 			meta: { title: '菜品订单', icon: 'table' }
	// 		}
	// 	]
	// },
	// {
	// 	path: '/operateManager',
	// 	component: Layout,
	// 	name: 'operateManager',
	// 	meta: {
	// 		title: '运营商管理',
	// 		icon: 'nested'
	// 	},
	// 	children: [
	// 		{
	// 			path: '/operate/manager',
	// 			component: () => import('@/views/operate/manager'), // Parent router-view
	// 			name: 'operateManager',
	// 			meta: { title: '运营中心管理', icon: 'table' }
	// 		},
	// 		{
	// 			path: 'order15',
	// 			component: () => import('@/views/business/commodity'), // Parent router-view
	// 			name: 'order15',
	// 			meta: { title: '会员规则', icon: 'table' }
	// 		},
	// 		{
	// 			path: 'order21',
	// 			component: () => import('@/views/business/commodity'), // Parent router-view
	// 			name: 'order21',
	// 			meta: { title: '会员分组', icon: 'table' }
	// 		},
	// 		{
	// 			path: 'order31',
	// 			component: () => import('@/views/business/commodity'), // Parent router-view
	// 			name: 'order31',
	// 			meta: { title: '版本管理', icon: 'table' }
	// 		},
	// 		{
	// 			path: 'order41',
	// 			component: () => import('@/views/business/commodity'), // Parent router-view
	// 			name: 'order41',
	// 			meta: { title: '运营端订单', icon: 'table' }
	// 		},
	// 		{
	// 			path: 'order51',
	// 			component: () => import('@/views/business/commodity'), // Parent router-view
	// 			name: 'order51',
	// 			meta: { title: '订单子类管理', icon: 'table' }
	// 		}
	// 	]
	// },
	// {
	// 	path: '/apply',
	// 	component: Layout,
	// 	name: 'apply',
	// 	meta: {
	// 		title: '应用',
	// 		icon: 'nested'
	// 	},
	// 	children: [
	// 		{
	// 			path: '/apply/manager',
	// 			component: () => import('@/views/apply/manager'),
	// 			name: 'applyManager',
	// 			meta: { title: '应用管理', icon: 'table' }
	// 		},
	// 		{
	// 			path: 'order51',
	// 			component: () => import('@/views/business/commodity'), // Parent router-view
	// 			name: 'order51',
	// 			meta: { title: 'Cvideo', icon: 'table' }
	// 		}
	// 	]
	// },
	// {
	// 	path: '/product',
	// 	component: Layout,
	// 	name: 'product',
	// 	meta: {
	// 		title: '产品',
	// 		icon: 'nested'
	// 	},
	// 	children: [
	// 		{
	// 			path: 'home41',
	// 			component: () => import('@/views/business/commodity'), // Parent router-view
	// 			name: 'home41',
	// 			meta: { title: '酒品类', icon: 'table' }
	// 		},
	// 		{
	// 			path: 'order51',
	// 			component: () => import('@/views/business/commodity'), // Parent router-view
	// 			name: 'order51',
	// 			meta: { title: 'Cvideo', icon: 'table' }
	// 		},
	// 		{
	// 			path: 'order61',
	// 			component: () => import('@/views/business/commodity'), // Parent router-view
	// 			name: 'order61',
	// 			meta: { title: '新闻中心', icon: 'table' }
	// 		},
	// 		{
	// 			path: 'order71',
	// 			component: () => import('@/views/business/commodity'), // Parent router-view
	// 			name: 'order71',
	// 			meta: { title: '会首页banner', icon: 'table' }
	// 		}
	// 	]
	// }

	// 404 page must be placed at the end !!!
]

const createRouter = () =>
	new Router({
		// mode: 'history', // require service support
		scrollBehavior: () => ({ y: 0 }),
		routes: constantRoutes
	})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
	const newRouter = createRouter()
	router.matcher = newRouter.matcher // reset router
}

export default router
