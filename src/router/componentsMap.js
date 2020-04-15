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
}
