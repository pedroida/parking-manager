import unauthenticated from './unauthenticated'
import authenticated from './authenticated'

export default [
  {
    path: '/',
    name: 'index',
    component: 'pages/Unauthenticated.vue',
    children: [
      ...unauthenticated
    ]
  },
  {
    path: '/app',
    name: 'app-index',
    component: 'pages/Authenticated.vue',
    children: [
      ...authenticated
    ]
  }
]
