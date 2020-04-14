export const componentsMap = {
	application_manage: () => import('@/views/my/manager/statistics'), // 添加文章
	sysMenu: () => import('@/views/sys/menu/index'),
	sysAdmins: () => import('@/views/sys/admins/index'),
	syeRole: () => import('@/views/sys/role/index'),
	memberManagement: () => import('@/views/member/memberManagement')
	// example_edit: () => import('@/views/example/edit'), // 文章编辑
	// table_index: () => import('@/views/tab/index'), // 表格首页
	// Icon: () => import('@/views/svg-icons/index'), // 图标管理
	// Menu: () => import('@/views/app/sys/menu'), // 菜单
	// Admins: () => import('@/views/app/sys/admins'), // 后台管理员
	// Role: () => import('@/views/app/sys/role'),
}
