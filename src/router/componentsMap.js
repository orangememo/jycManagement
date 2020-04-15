export const componentsMap = {
	sysMenu: () => import('@/views/sys/menu/index'),
	sysAdmins: () => import('@/views/sys/admins/index'),
	sysRole: () => import('@/views/sys/role/index'),
	sysAdminslog: () => import('@/views/sys/adminLog'),
	memberManagement: () => import('@/views/member/memberManagement'),
	versionManagement: () => import('@/views/member/versionManagement'),
	memberGroup: () => import('@/views/member/memberGroup/index'),
	inviteCode: () => import('@/views/member/inviteCode'),
	consumptionEnvelope: () => import('@/views/member/consumptionEnvelope'),
	businessHotelType: () => import('@/views/business/hotelType'),
	businessTableLabelManager: () => import('@/views/business/tableLabelManager'),
	businessTableManager: () => import('@/views/business/tableManager'),
	operateManager: () => import('@/views/operate/manager'),
	businessLabelManager: () => import('@/views/business/labelManager'),
	applyManager: () => import('@/views/apply/manager')
}
