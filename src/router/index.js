import App from '../App'
import Login from '../components/layouts/Login.vue'
import Logout from '../components/layouts/Logout.vue'
import SignUp from '../components/layouts/SignUp'
import Home from '../components/Home'
const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/project',
    name: 'project',
    component: App,
    meta: {
      requiresAuth: true,
    }
  }, {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresVisitor: true,
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
    meta: {
      requiresVisitor: true,
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  }
]

export default routes
