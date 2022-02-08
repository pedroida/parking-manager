export default [
  {
    path: '/login',
    name: 'login',
    component: 'pages/unauthenticated/Login.vue'
  },
  {
    path: '/recuperar-senha',
    name: 'reset-password',
    component: 'pages/unauthenticated/ResetPassword.vue'
  },
  {
    path: '/request-renew-pass',
    name: 'request-renew-pass',
    component: 'pages/unauthenticated/RequestRenewPass.vue'
  },
  {
    path: '/cadastro',
    name: 'register',
    component: 'pages/unauthenticated/Register.vue'
  },
  {
    path: '/cadastro/concluido',
    name: 'success-register',
    component: 'pages/unauthenticated/SuccessRegister.vue'
  },
  {
    path: '/activate-registry',
    name: 'activate-registry',
    component: 'pages/unauthenticated/ActivateUser.vue'
  }
]
