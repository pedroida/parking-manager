<template>
  <authenticated-container v-if="currentUser" page-title="Sua conta" page-subtitle="Informações da sua conta">
    <v-row class="account">
      <v-col md="3" sm="12">
        <user-avatar />

        <disable-account />
      </v-col>
      <v-col md="9" sm="12">
        <user-data class="mb-5" />
      </v-col>
    </v-row>
  </authenticated-container>
</template>

<script lang="ts">
import { mapActions } from 'vuex'
import App from '~/components/App'
import AuthenticatedContainer from '~/components/layouts/authenticated/Container.vue'
import ButtonDefault from '~/components/shared/form/ButtonDefault.vue'
import UserAvatar from '~/components/account/UserAvatar.vue'
import UserData from '~/components/account/UserData.vue'
import DisableAccount from '~/components/shared/account/Disable.vue'

export default App.extend({
  name: 'Account',

  components: { DisableAccount, AuthenticatedContainer, ButtonDefault, UserData, UserAvatar },

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
