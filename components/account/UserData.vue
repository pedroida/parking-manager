<template>
  <collapse-card show-content title="Seus dados" icon="mdi-card-account-details">
    <v-row>
      <v-col md="8" sm="12">
        <h3>
          Nome:
          <span>{{ currentUser.name }}</span>
          <user-edit-name />
        </h3>
        <h3>{{ $t(`userTypes.${currentUser.type}`) }}</h3>
        <h3>E-mail: <span>{{ currentUser.email }}</span></h3>
        <h2 v-if="currentUser.authorisedAccess" class="success--text text--darken-2">
          Acesso autorizado
        </h2>
        <h2 v-else class="error--text">
          Acesso negado
        </h2>
      </v-col>
      <v-col md="4" sm="12">
        <user-edit-password />
      </v-col>
    </v-row>
  </collapse-card>
</template>

<script lang="ts">
import App from '~/components/App'
import CollapseCard from '~/components/shared/collapseCard.vue'
import ButtonDefault from '~/components/shared/form/ButtonDefault.vue'
import InputDefault from '~/components/shared/form/InputDefault.vue'
import ModalDefault from '~/components/shared/modal.vue'
import UserEditName from '~/components/account/UserEditName.vue'
import UserEditPassword from '~/components/account/UserEditPassword.vue'

export default App.extend({
  name: 'UserData',

  components: { ModalDefault, CollapseCard, ButtonDefault, InputDefault, UserEditName, UserEditPassword }
})
</script>

<style scoped>
h3 {
  margin-bottom: 1em;
}

h3 > span {
  font-weight: normal;
}
</style>
