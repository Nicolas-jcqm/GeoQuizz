import Vue from 'vue'
import Router from 'vue-router'
import Signup from '@/components/Signup'
import Home from '@/components/Home'
import Creation from '@/components/Creation'
import  Serie from '@/components/Serie'
import store from '@/store'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path:'',
      name:'home',
      component:Home,
      children:[
        {
          path:'',
          component:Creation
        },
        {
          path:':id',
          component:Serie
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
	if(to.name != 'signin' && ! store.getters['auth/isConnected']) {
    next({name: 'signin', query: {redirect: to.fullPath}})
  }
  else if (to.name == 'signin' && store.getters['auth/isConnected']) {
    console.log("test test test")
  	next({name: 'home'})
  }
  else {
    next()
  }
})
