<template>
  <nuxt-child />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import App from '/components/App'

export default App.extend({
  name: 'Authenticated',

  computed: {
    ...mapGetters('session', ['isLogged']),
    ...mapGetters(['supportError', 'currentLanguage']),

    routeBaseName () {
      return this.getRouteBaseName()
    }
  },

  watch: {
    routeBaseName (value) {
      const allowedPages = ['cultural-fit', 'profile']
      if (!allowedPages.includes(value)) {
        this.$router.push(this.localePath('profile'))
      }
    },

    isLogged (value) {
      if (!value) {
        this.goTo('index')
      }
    },

    currentLanguage () {
      this.reloadEnums()
    }
  },

  mounted () {
    if (this.supportError) {
      this.goTo('support-error')
    }
    if (this.getRouteBaseName() === 'app-index') {
      this.goTo('dashboard')
    }
  },

  methods: {
    ...mapActions('enum', {
      reloadEnums: 'reload'
    })
  }
})
</script>
