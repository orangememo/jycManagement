import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist
let flag = 0
router.beforeEach(async (to, from, next) => {
	NProgress.start()
	document.title = getPageTitle(to.meta.title)
	const hasToken = getToken()
	if (hasToken) {
		console.log(111111)
		if (to.path === '/login' || to.path === '/selectCompanyApp') {
			console.log(2222222)
			next()
			NProgress.done()
		} else {
			console.log(333333)
			const hasGetRuleList = store.getters.ruleList && store.getters.ruleList.length
			console.log(hasGetRuleList, 'hasGetRuleList')
			if (hasGetRuleList == 0) {
				next(`/selectCompanyApp`)
				NProgress.done()
				Message.error('请选择公司和应用')
			} else {
				if (flag === 0) {
					console.log(444444)
					try {
						console.log(555555)
						const accessRoutes = await store.dispatch('login/getRouter')
						router.addRoutes(accessRoutes)
						flag++
						next({ ...to, replace: true })
					} catch (error) {
						console.log(666666)
						next(`/selectCompanyApp`)
						Message.error('请选择公司和应用')
					}
				} else {
					console.log(77777)
					next()
				}
			}

			// if (from.path == '/') {
			// 	// next({ ...to, replace: true })
			// } else {
			// 	router.addRoutes(hasGetRuleList)
			// 	next()
			// }
			// try {
			// 	await store.dispatch('login/resetRouter')

			// } catch (error) {

			// }

			//  if (hasGetRuleList.length == 0) {
			// 	next(`/selectCompanyApp`)
			// 	Message.error('请选择公司和应用')
			// } else {
			// 	console.log(72222)
			// 	if (hasGetRuleList.length === 0) {
			// 		console.log(72222111111)

			// 		next(`/selectCompanyApp`)
			// 		Message.error('请选择公司和应用')
			// 	} else {
			// 		console.log(7333)
			// 		// router.addRoutes(hasGetRuleList)
			// 		console.log(router, 'router7333')
			// 		next()
			// 	}
			// }
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
