export default [
  {
    path: 'dashboard',
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
    path: 'usuarios/:id/veiculos',
    name: 'user-cars',
    component: 'pages/authenticated/Users/Cars.vue'
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
  },
  {
    path: 'estacoes/:id/reconhecimentos',
    name: 'workstation-recognitions',
    component: 'pages/authenticated/WorkstationRecognitions.vue'
  },
  {
    path: 'reconhecimentos',
    name: 'recognitions',
    component: 'pages/authenticated/Recognitions/Index.vue'
  }
]
