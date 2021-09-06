<template>
  <nuxt-child />
</template>

<script>
import { mapGetters } from 'vuex'
import App from '~/components/App'

export default App.extend({
  name: 'Authenticated',

  computed: {
    ...mapGetters('user', ['authorization']),

    routeBaseName () {
      return this.getRouteBaseName()
    }
  },

  watch: {
    authorization (value) {
      if (!value) {
        this.goTo('login')
      }
    }
  },

  mounted () {
    if (!this.authorization) {
      return this.goTo('login')
    }
    if (this.getRouteBaseName() === 'app-index' && this.$route.path === this.getRouteBaseName()) {
      console.log('paoskd')
      return this.goTo('dashboard')
    }
  }
})
</script>
