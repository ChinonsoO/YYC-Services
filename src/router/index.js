import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/signup',
    name: 'Login',
    component: () => import('../views/auth/LoginView.vue')
  },

  {
    path:'/services',
    name:'Services',
    component: () => import('../views/ServicesView.vue')

  },

  {
    path:'/signup/user-details',
    name: 'Complete Your Profile',
    component: () => import('../views/auth/afterGoogleRedirect.vue')
  },

  {
    path:'/signup/email',
    name: 'Signup with Email',
    component: () => import('../views/auth/EmailSignupView.vue')
  },

  {
    path: '/login/email',
    name: 'Login with Email',
    component: () => import ('../views/auth/EmailLoginView.vue')
  },

  {
    //User booking where the second value is the user ID
    // path: '/booking/:id/:imageSource',
    path: '/booking/:id/:name/:location/:services/:selectedTime/:selectedDate',
    name: 'Host Booking',
    component: () => import ('../views/ServiceBookingView.vue')
  },
  {
    path:'/become-a-host',
    name: 'Become a host',
    component: () => import('../views/becomeAHostView.vue')
  },
 
  {
    path:'/Dashboard',
    name: 'Dashboard',
    component: () => import ('../views/UserDashboard.vue'),
    props:true,
  },
  {
    path:'/test',
    name: 'Test',
    component: () => import ('../views/TestStuff.vue'),
    props:true,
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
