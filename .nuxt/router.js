import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _35d53ab0 = () => import('..\\pages\\secure\\admin.vue' /* webpackChunkName: "pages_secure_admin" */).then(m => m.default || m)
const _5908e4e2 = () => import('..\\pages\\secure\\partner\\new.vue' /* webpackChunkName: "pages_secure_partner_new" */).then(m => m.default || m)
const _29a445c2 = () => import('..\\pages\\secure\\partner\\edit\\_id.vue' /* webpackChunkName: "pages_secure_partner_edit__id" */).then(m => m.default || m)
const _03989e02 = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/credits/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/secure/admin",
			component: _35d53ab0,
			name: "secure-admin"
		},
		{
			path: "/secure/partner/new",
			component: _5908e4e2,
			name: "secure-partner-new"
		},
		{
			path: "/secure/partner/edit/:id?",
			component: _29a445c2,
			name: "secure-partner-edit-id"
		},
		{
			path: "/",
			component: _03989e02,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
