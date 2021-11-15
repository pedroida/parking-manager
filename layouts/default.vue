<template>
  <v-app light>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
      color="accent"
    >
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              <img src="~/assets/images/xenon.png" alt="" class="ma-auto">
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider />
        <client-only>
          <template v-for="(item, i) in items">
            <v-list-item
              v-if="item.show"
              :key="i"
              :to="item.to"
              router
              :exact="item.exact"
            >
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="item.title" />
              </v-list-item-content>
            </v-list-item>
          </template>
        </client-only>
      </v-list>

      <template #append>
        <v-divider />
        <div class="pa-2">
          <v-btn block color="error" @click="logout">
            <v-icon>
              mdi-logout
            </v-icon>
            Sair
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="primary"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>
    <v-main>
      <v-container class="h-100">
        <alerts />
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      fixed
      app
      color="primary"
      class="py-2 text-center justify-center"
    >
      Feito com
      <v-icon color="red">
        mdi-heart
      </v-icon>
      pelos alunos para a UTFPR
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import App from '~/components/App'
import Alerts from '~/components/layouts/Alerts'

export default App.extend({

  components: { Alerts },

  computed: {
    items () {
      return [
        {
          icon: 'mdi-home',
          title: 'Dashboard',
          to: this.localePath('dashboard'),
          active: true,
          exact: true,
          show: true
        },
        {
          icon: 'mdi-camera-wireless',
          title: 'Estações',
          to: this.localePath('workstations'),
          exact: true,
          show: this.internalCurrentUser
        },
        {
          icon: 'mdi-account',
          title: 'Usuários',
          to: this.localePath('users'),
          exact: false,
          show: this.isAdmin
        },
        {
          icon: 'mdi-card-account-details',
          title: 'Conta',
          to: this.localePath('account'),
          exact: true,
          show: true
        },
        {
          icon: 'mdi-car',
          title: 'Meus veículos',
          to: this.localePath('my-cars'),
          exact: true,
          show: true
        },
        {
          icon: 'mdi-camera-rear',
          title: 'Reconhecimentos',
          to: this.localePath('recognitions'),
          exact: false,
          show: this.isAdmin
        }
      ]
    }
  },

  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false
    }
  },

  methods: {
    ...mapActions('current-user', ['logout'])
  }
})
</script>
