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
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
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

export default App.extend({
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: this.localePath('dashboard'),
          active: true
        },
        {
          icon: 'mdi-camera-wireless',
          title: 'Estações',
          to: this.localePath('stations')
        },
        {
          icon: 'mdi-account',
          title: 'Usuários',
          to: this.localePath('users')
        },
        {
          icon: 'mdi-card-account-details',
          title: 'Conta',
          to: this.localePath('account')
        }
      ]
    }
  },

  methods: {
    ...mapActions('user', ['logout'])
  }
})
</script>
