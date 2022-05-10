<template>
  <authenticated-container v-if="currentUser" page-title="Meus veículos">
    <user-cars />
  </authenticated-container>
</template>

<script lang="ts">
import { mapActions } from 'vuex'
import App from '~/components/App'
import AuthenticatedContainer from '~/components/layouts/authenticated/Container.vue'
import UserCars from '~/components/account/UserCars.vue'

export default App.extend({
  name: 'MyCars',

  components: { AuthenticatedContainer, UserCars },

  created () {
    this.getCurrentUser()
  },

  methods: {
    ...mapActions('current-user', ['getCurrentUser'])
  }
})
</script>

<style scoped>
.account {
  min-height: 60vh;
}

</style>
