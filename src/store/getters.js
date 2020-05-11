const getters = {
	sidebar: (state) => state.app.sidebar,
	device: (state) => state.app.device,
	token: (state) => state.login.token,
	avatar: (state) => state.login.avatar,
	name: (state) => state.login.name,
	ruleList: (state) => state.login.ruleList,
	permissionRoutes: (state) => state.login.permissionRoutes,
	companyListToSelect: (state) => state.login.companyListToSelect,
}
export default getters
