export const componentsMap = {
	application_manage: () => import('@/views/my/manager/statistics'), // 添加文章
	sysMenu: () => import('@/views/sys/menu/index'),
	sysAdmins: () => import('@/views/sys/admins/index'),
	sysRole: () => import('@/views/sys/role/index'),
	sysAdminslog: () => import('@/views/sys/adminLog'),
	memberManagement: () => import('@/views/member/memberManagement'),
	versionManagement: () => import('@/views/member/versionManagement'),
	memberGroup: () => import('@/views/member/memberGroup/index'),
	inviteCode: () => import('@/views/member/inviteCode'),
	consumptionEnvelope: () => import('@/views/member/consumptionEnvelope')
	// example_edit: () => import('@/views/example/edit'), // 文章编辑
	// table_index: () => import('@/views/tab/index'), // 表格首页
	// Icon: () => import('@/views/svg-icons/index'), // 图标管理
	// Menu: () => import('@/views/app/sys/menu'), // 菜单
	// Admins: () => import('@/views/app/sys/admins'), // 后台管理员
	// Role: () => import('@/views/app/sys/role'),
}
