<template>
  <nuxt-child />
</template>

<script>
import { mapGetters } from 'vuex'
import App from '~/components/App'

export default App.extend({
  name: 'Unauthenticated',

  layout: 'unauthenticated',

  computed: {
    ...mapGetters('current-user', ['authorization']),

    routeBaseName () {
      return this.getRouteBaseName()
    }
  },

  watch: {
    authorization (value) {
      if (!value) {
        this.goTo('index')
      }
    }
  },

  mounted () {
    if (this.authorization) {
      return this.goTo('dashboard')
    }

    if (this.routeBaseName === 'index' && this.$route.path === '/') {
      return this.goTo('login')
    }
  }
})
</script>
