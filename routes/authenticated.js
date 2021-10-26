export default [
  {
    path: 'home',
    name: 'dashboard',
    component: 'pages/authenticated/Dashboard.vue'
  },
  {
    path: 'conta',
    name: 'account',
    component: 'pages/authenticated/Account.vue'
  },
  {
    path: 'usuarios',
    name: 'users',
    component: 'pages/authenticated/Users/Index.vue'
  },
  {
    path: 'usuarios/novo',
    name: 'create-user',
    component: 'pages/authenticated/Users/Create.vue'
  },
  {
    path: 'usuarios/:id/editar',
    name: 'edit-user',
    component: 'pages/authenticated/Users/Edit.vue'
  },
  {
    path: 'meus-veiculos',
    name: 'my-cars',
    component: 'pages/authenticated/MyCars.vue'
  },
  {
    path: 'estacoes',
    name: 'workstations',
    component: 'pages/authenticated/Workstations.vue'
  }
]
