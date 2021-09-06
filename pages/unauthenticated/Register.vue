<template>
  <unauthenticated-container>
    <card class="h-100 ma-auto">
      <template #title>
        Vamos lá
      </template>

      <h3 class="text-center black--text mb-5">
        Entre com seus dados para criar sua conta
      </h3>

      <register-form v-model="user" :value="user" :errors="errors" />

      <div class="d-flex justify-center align-center">
        <button-default
          :loading="loading"
          :disabled="!validForm"
          :block="false"
          :x-large="false"
          label="Criar conta"
          @click="submit"
        />
      </div>
    </card>
  </unauthenticated-container>
</template>

<script lang="ts">
import { mapActions } from 'vuex'
import App from '~/components/App'
import UnauthenticatedContainer from '~/components/layouts/unauthenticated/Container.vue'
import Card from '~/components/shared/card.vue'
import ButtonDefault from '~/components/shared/form/ButtonDefault.vue'
import RegisterForm from '~/components/register/Form.vue'
import { UserFactory } from '~/entity/factories/UserFactory'
import { CarFactory } from '~/entity/factories/CarFactory'

export default App.extend({
  name: 'Register',

  components: { UnauthenticatedContainer, Card, ButtonDefault, RegisterForm },

  data () {
    return {
      user: UserFactory('', '', '', '', '', '', '', [CarFactory()]),
      validEmail: true,
      errors: [],
      loading: false
    }
  },

  computed: {
    validEmailMessage () {
      if (!this.validEmail) {
        return ['Insira um email válido']
      }
    },

    validForm () {
      return this.user.name &&
        this.user.email &&
        this.user.password &&
        this.user.confirmPassword &&
        this.user.cars[0].plateCar &&
        this.user.cars[0].modelCar &&
        (this.user.password === this.user.confirmPassword)
    }
  },

  methods: {
    ...mapActions('user', ['register']),

    submit () {
      this.errors = []
      this.loading = true
      if (this.validForm) {
        this.register(this.user).then(() => {
          this.goTo('success-register')
        }).catch((error: any) => {
          this.errors = error?.response?.data?.details || []
        }).finally(() => {
          this.loading = false
        })
      }
    }
  }
})
</script>

<style scoped>

</style>
