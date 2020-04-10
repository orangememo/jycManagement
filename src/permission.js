import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
	// start progress bar
	NProgress.start()
	console.log(1111)
	// set page title
	document.title = getPageTitle(to.meta.title)
	console.log(2222)
	// determine whether the user has logged in
	const hasToken = getToken()
	console.log(3333, hasToken)
	if (hasToken) {
		console.log(55555)
		if (to.path === '/login') {
			console.log(66666)
			await store.dispatch('login/resetToken')
			// if is logged in, redirect to the home page
			next({ path: '/login' })
			NProgress.done()
		} else {
			console.log(7777)
			const hasGetUserInfo = store.getters.name
			if (hasGetUserInfo) {
				console.log(8888)
				next()
			} else {
				console.log(9999)
				next(`/login`)
				Message.error('请重新登录')
				// try {
				// 	// get user info
				// 	await store.dispatch('user/getInfo')
				// 	next()
				// } catch (error) {
				// 	// remove token and go to login page to re-login
				// 	await store.dispatch('user/resetToken')
				// 	Message.error(error || 'Has Error')
				// 	next(`/login?redirect=${to.path}`)
				// 	NProgress.done()
				// }
			}
		}
	} else {
		/* has no token*/

		if (whiteList.indexOf(to.path) !== -1) {
			// in the free login whitelist, go directly
			next()
		} else {
			// other pages that do not have permission to access are redirected to the login page.
			next(`/login?redirect=${to.path}`)
			NProgress.done()
		}
	}
})

router.afterEach(() => {
	// finish progress bar
	NProgress.done()
})
