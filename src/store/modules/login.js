import { login, logout, getInfo } from '@/api/user'
import { loginJyc } from '@/api/login'

import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
	return {
		token: getToken(),
		name: '',
		avatar: '',
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
	SET_COMPANY_LIST: (state, val) => {
		state.companyList = val
	},
	SET_APPLICATION_LIST: (state, val) => {
		state.applicationList = val
	},
}

const actions = {
	// user login
	login({ commit }, obj) {
		// const { username, password } = userInfo
		return new Promise((resolve, reject) => {
			loginJyc(obj)
				.then((res) => {
					console.log(res, '12313')
					const { result } = res
					commit('SET_TOKEN', result.token)
					commit('SET_COMPANY_LIST', result.companyList)
					commit('SET_APPLICATION_LIST', result.applicationList)
					commit('SET_NAME', result.userName)

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
	getInfo({ commit, state }) {
		return new Promise((resolve, reject) => {
			getInfo(state.token)
				.then((response) => {
					const { data } = response

					if (!data) {
						reject('Verification failed, please Login again.')
					}

					const { name, avatar } = data

					commit('SET_NAME', name)
					commit('SET_AVATAR', avatar)
					resolve(data)
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
			removeToken() // must remove  token  first
			commit('RESET_STATE')
			resolve()
		})
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}
