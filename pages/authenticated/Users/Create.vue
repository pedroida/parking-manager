<template>
  <authenticated-container
    v-if="currentUser"
    page-title="Novo usuário"
    page-subtitle="Criação de um novo usuário"
  >
    <card>
      <user-form v-model="user" :errors="errors" />

      <v-row>
        <v-col>
          <button-default color="info" :block="false" label="Voltar" @click="goTo('users')" />
          <button-default :disabled="!validUser" :block="false" label="Salvar" class="float-md-right" @click="submit" />
        </v-col>
      </v-row>
    </card>
  </authenticated-container>
</template>

<script lang="ts">
import { mapActions } from 'vuex'
import App from '@/components/App'
import Card from '@/components/shared/card.vue'
import ButtonDefault from '@/components/shared/form/ButtonDefault.vue'
import AuthenticatedContainer from '~/components/layouts/authenticated/Container.vue'
import UserForm from '@/components/users/Form.vue'
import { UserFactory } from '@/entity/factories/UserFactory'
import { RoleFactory } from '@/entity/factories/RoleFactory'

export default App.extend({
  name: 'CreateUser',

  components: { UserForm, AuthenticatedContainer, Card, ButtonDefault },

  computed: {
    validUser (): boolean {
      return this.user.name && this.user.email && this.user.type && this.user.roles.length
    }
  },

  data () {
    return {
      user: UserFactory([], [RoleFactory(1, 'ROLE_DRIVER', 'Perfil Motorista')]),
      errors: []
    }
  },

  methods: {
    ...mapActions('user', ['createUser']),

    submit () {
      if (!this.validUser) { return false }

      this.createUser(this.user).then(() => {
        this.pushAlertSuccess('Usuário criado sucesso!')
        this.goTo('users')
      }).catch((error: any) => {
        if ((error?.response?.data?.message as string).includes('E-mail')) {
          this.errors = [{ field: 'email', descriptionError: error?.response?.data?.message }]
        } else {
          this.errors = error?.response?.data?.details
        }
      })
    }
  }
})
</script>

<style scoped>

</style>
