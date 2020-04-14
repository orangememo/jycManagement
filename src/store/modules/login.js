import { login, logout, getInfo } from '@/api/user'
import { loginJyc, loginInfo } from '@/api/login'
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
	SET_LIST: (state, val) => {
		state.list = val
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
					commit('SET_TOKEN', result.token)
					commit('SET_COMPANY_LIST', result.companyList)
					commit('SET_APPLICATION_LIST', result.applicationList)
					commit('SET_NAME', result.userName)
					commit('SET_ACCOUNT_ID', result.accountId)
					setToken(result.token)
					resolve()
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
					res = ces
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
			commit('RESET_STATE')
			resolve()
		})
	},
	// remove token
	resetRouter({ commit }) {
		return new Promise((resolve) => {
			resetRouter() // must remove  token  first
			commit('SET_RULE_LIST', [])
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
			accessedRouters.push(operatRouter(item))
		})
	}
	return accessedRouters
}
function operatRouter(item) {
	let component = Layout
	let router = {}
	if (item.pruleId !== 0) {
		component = componentsMap[item.ruleCode]
	}
	router = {
		path: item.requestUrl,
		name: item.ruleCode,
		meta: {
			icon: item.icon,
			title: item.ruleName,
		},
		hidden: item.isHide == 0 && item.ruleType == 'MENU' ? false : true,
		component: component,
		children: comparedRouter(item.children),
	}
	return router
}
