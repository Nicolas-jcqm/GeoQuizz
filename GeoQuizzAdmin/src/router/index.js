import Vue from 'vue'
import Router from 'vue-router'
import Signup from '@/components/Signup'
import store from '@/store'
import Test from'@/components/Test'
import Serie from'@/components/Serie'
import Creation from'@/components/Creation'
Vue.use(Router)

 const router= new Router({
  routes: [
    {
      path:'/test',
      component:Test,
      name:"Test",
      children:[
        {
          path:':id',
          component:Serie
        },
        {
          path:'/',
          name:"Creation",
          component:Creation
        }
      ]
    },

    {
        path: '',
        name: 'Signup',
        component: Signup
      }
  ]
})


router.beforeEach((to, from, next) => {
	if(to.name != 'Signup' && ! sessionStorage.getItem("isConnected")) {
    next({name: 'Signup', query: {redirect: to.fullPath}})
  }
  else if (to.name == 'Signup' && sessionStorage.getItem("isConnected")) {
  	next({name: 'Test'})
  }
  else {
    next()
  }

})

export default router
