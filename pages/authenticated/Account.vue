<template>
  <authenticated-container page-title="Sua conta" page-subtitle="Informações da sua conta">
    <v-row class="account">
      <v-col md="3" sm="12">
        <user-avatar />

        <button-default color="error" :block="false" label="Desativar conta" class="mt-3 deactivate" />
      </v-col>
      <v-col md="9" sm="12">
        <user-data class="mb-5" />

        <user-cars />
      </v-col>
    </v-row>
  </authenticated-container>
</template>

<script lang="ts">
import App from '~/components/App'
import AuthenticatedContainer from '~/components/layouts/authenticated/Container.vue'
import ButtonDefault from '~/components/shared/form/ButtonDefault.vue'
import UserAvatar from '~/components/account/UserAvatar.vue'
import UserData from '~/components/account/UserData.vue'
import UserCars from '~/components/account/UserCars.vue'

export default App.extend({
  name: 'Account',

  components: { AuthenticatedContainer, ButtonDefault, UserData, UserCars, UserAvatar }
})
</script>

<style scoped>
.account {
  min-height: 60vh;
}

.deactivate {
  position: absolute;
  bottom: 1em;
}
</style>
