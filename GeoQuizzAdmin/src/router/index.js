import Vue from 'vue'
import Router from 'vue-router'
import Signup from '@/components/Signup'
import Home from '@/components/Home'
import Creation from '@/components/Creation'
import  Serie from '@/components/Serie'
import store from '@/store'
Vue.use(Router)

export  const router= new Router({
  routes: [
    {
      path:'/home',
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
    },
    {
        path: '',
        name: 'signup',
        component: Signup
      }
  ]
})
router.beforeEach((to, from, next) => {
	if(to.name != 'signup' && ! store.getters['auth/isConnected']) {
    next({name: 'signup', query: {redirect: to.fullPath}})
  }
  else if (to.name == 'signup' && store.getters['auth/isConnected']) {
  	next({name: 'home'})
  }
  else {
    next()
  }
})
