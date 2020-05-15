// import { login, logout, getInfo } from '@/api/user'
import { loginJyc, loginInfo } from '@/api/login'
import { getcompanyInfoIdList } from '@/api/member'

import { componentsMap } from '@/router/componentsMap'

import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, constantRoutes } from '@/router'
// import router from './router'
// router.addRoutes(ruleList)
import Layout from '@/layout'
import ces from '@/utils/ces'
const getDefaultState = () => {
	return {
		token: getToken(),
		name: '',
		avatar: '',
		companyId: '',
		accountId: '',
		applicationId: '',
		applicationList: '',
		companyList: [],
		ruleList: [],
		permissionRoutes: [],
		list: [],
		userInfo: {},
		companyType: '',
		companyListToSelect: [],
	}
}

const state = getDefaultState()

const mutations = {
	RESET_STATE: (state) => {
		Object.assign(state, getDefaultState())
	},
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_NAME: (state, name) => {
		state.name = name
	},
	SET_AVATAR: (state, avatar) => {
		state.avatar = avatar
	},
	SET_COMPANY_ID: (state, val) => {
		state.companyId = val
	},
	SET_COMPANY_TYPE: (state, val) => {
		state.companyType = val
	},
	SET_COMPANY_LIST: (state, val) => {
		state.companyList = val
	},
	SET_APPLICATION_LIST: (state, val) => {
		state.applicationList = val
	},
	SET_ACCOUNT_ID: (state, val) => {
		state.accountId = val
	},
	SET_APPLICATION_ID: (state, val) => {
		state.applicationId = val
	},
	SET_RULE_LIST: (state, val) => {
		state.ruleList = val
		state.permissionRoutes = constantRoutes.concat(val)
	},
	RESET_ROUTER: (state) => {
		state.ruleList = []
		state.permissionRoutes = constantRoutes
	},
	SET_USER_INFO: (state, val) => {
		state.userInfo = val
	},
	SET_LIST: (state, val) => {
		state.list = val
	},
	SET_COMPANY_LIST_TO_SELECT: (state, val) => {
		state.companyListToSelect = val
	},
}

const actions = {
	// user login
	login({ commit }, obj) {
		// const { username, password } = userInfo
		return new Promise((resolve, reject) => {
			loginJyc(obj)
				.then((res) => {
					const { result } = res
					const { token, companyList, applicationList, userName, avatar, accountId, companyId, ruleList, applicationId, companyType } = result
					commit('SET_TOKEN', token)
					commit('SET_COMPANY_LIST', companyList)
					commit('SET_APPLICATION_LIST', applicationList)
					commit('SET_NAME', userName)
					commit('SET_AVATAR', avatar)
					commit('SET_ACCOUNT_ID', accountId)
					commit('SET_USER_INFO', result)
					commit('SET_COMPANY_ID', companyId)
					let companyListToSelect = companyList.map((item) => {
						let obj = {
							label: item.companyName,
							value: item.companyId,
							parentId: item.pcompanyId,
						}
						return obj
					})
					commit('SET_COMPANY_TYPE', companyType)

					commit('SET_COMPANY_LIST_TO_SELECT', companyListToSelect)
					commit('SET_APPLICATION_ID', applicationId)
					commit('SET_LIST', ruleList)
					setToken(result.token)
					let ruleLists = comparedRouter(ruleList)
					ruleLists.push({ path: '*', redirect: '/404', hidden: true })
					commit('SET_RULE_LIST', ruleLists)
					resolve(ruleLists)
				})
				.catch((error) => {
					reject(error)
				})
			// login({ username: username.trim(), password: password })
			// 	.then((response) => {
			// 		const { data } = response
			// 		commit('SET_TOKEN', data.token)
			// 		setToken(data.token)
			// 		resolve()
			// 	})
			// 	.catch((error) => {
			// 		reject(error)
			// 	})
		})
	},

	// get user info
	loginInfo({ commit, state }, obj) {
		return new Promise((resolve, reject) => {
			loginInfo(obj)
				.then((res) => {
					let { result } = res
					let ruleList = comparedRouter(result.list)
					ruleList.push({ path: '*', redirect: '/404', hidden: true })
					commit('SET_LIST', result.list)
					commit('SET_RULE_LIST', ruleList)
					resolve(ruleList)
				})
				.catch((error) => {
					reject(error)
				})
		})
	},

	// user logout
	logout({ commit, state }) {
		return new Promise((resolve, reject) => {
			removeToken() // must remove  token  first
			resetRouter()
			commit('RESET_STATE')
			resolve()
		})
	},

	// remove token
	resetToken({ commit }) {
		return new Promise((resolve) => {
			removeToken()
			resetRouter() // must remove  token  first
			commit('RESET_ROUTER')
			commit('RESET_STATE')
			resolve()
		})
	},
	// remove token
	resetRouter({ commit }) {
		return new Promise((resolve) => {
			resetRouter() // must remove  token  first
			commit('SET_RULE_LIST', [])
			commit('RESET_ROUTER')
			resolve()
		})
	},
	getRouter({ commit, state }) {
		return new Promise((resolve) => {
			let ruleList = comparedRouter(state.list)
			ruleList.push({ path: '*', redirect: '/404', hidden: true })
			resolve(ruleList)
		})
	},
	setCompanyList({ commit, state }) {
		getcompanyInfoIdList().then((res) => {
			const { result } = res
			let companyListToSelect = result.map((item) => {
				let obj = {
					label: item.companyName,
					value: item.companyId,
					parentId: item.pcompanyId,
				}
				return obj
			})
			commit('SET_COMPANY_LIST_TO_SELECT', companyListToSelect)
		})
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}

function comparedRouter(asyncRouterMap) {
	const accessedRouters = []

	if (asyncRouterMap.length != 0) {
		asyncRouterMap.forEach((item) => {
			if (operatRouter(item)) {
				accessedRouters.push(operatRouter(item))
			}
		})
	}
	accessedRouters.sort((a, b) => {
		return a.weight - b.weight
	})
	return accessedRouters
}
function operatRouter(item) {
	let component = Layout
	let router = {}
	if (item.pruleId !== 0) {
		component = componentsMap[item.ruleCode]
	}
	if (item.isHide == 1 && item.ruleType == 'MENU') {
		return
	}
	router = {
		path: item.requestUrl,
		name: item.ruleCode,
		weight: item.weight,
		meta: {
			icon: item.icon,
			title: item.ruleName,
			isHide: item.isHide,
		},
		hidden: item.isHide == 0 && item.ruleType == 'MENU' ? false : true,
		component: component,
		children: comparedRouter(item.children),
	}
	if (item.pruleId === 0 && item.children.length != 0) {
		let requestUrl = item.children.find((el) => {
			return el.isHide !== 1 && el.ruleType == 'MENU'
		})
		router.redirect = `${item.requestUrl}/${requestUrl.requestUrl}`
	}

	return router
}
