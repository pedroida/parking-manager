import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  name: 'App',

  computed: {
    ...mapGetters('user', ['currentUser']),

    isDesktop () {
      return this.$vuetify.breakpoint.mdAndUp
    },

    isMobile () {
      return !this.isDesktop
    },

    internalCurrentUser () {
      return this.isAdmin || this.isOperator
    },

    isAdmin () {
      if (!this.currentUser) {
        return false
      }

      return !!this.currentUser.roles.find(role => role.id === 3)
    },

    isOperator () {
      if (!this.currentUser) {
        return false
      }

      return !!this.currentUser.roles.find(role => role.id === 2)
    }
  },

  methods: {
    goTo (localePath) {
      this.$router.push(this.localePath(localePath))
    },

    pushAlert (alert) {
      this.$store.dispatch('pushAlert', alert)
    },

    pushAlertSuccess (message, title, counter) {
      const messageText = this.translate(message, counter)
      const titleText = (title) ? this.translate(title, counter) : title
      this.pushAlert({
        message: messageText,
        title: titleText,
        type: 'success'
      })
    },

    pushAlertError (message, title, counter) {
      const messageText = this.translate(message, counter)
      const titleText = (title) ? this.translate(title, counter) : title
      this.pushAlert({
        message: messageText,
        title: titleText,
        type: 'error'
      })
    },

    pushAlertWarning (message, title, counter) {
      const messageText = this.translate(message, counter)
      const titleText = (title) ? this.translate(title, counter) : title
      this.pushAlert({
        message: messageText,
        title: titleText,
        type: 'warning'
      })
    },

    pushAlertInfo (message, title, counter) {
      const messageText = this.translate(message, counter)
      const titleText = (title) ? this.translate(title, counter) : title
      this.pushAlert({
        message: messageText,
        title: titleText,
        type: 'info'
      })
    },

    translate (key, counter) {
      return (typeof counter !== 'undefined') ? this.$tc(key, counter) : this.$t(key)
    }
  }
})
