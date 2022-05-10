<template>
  <unauthenticated-container>
    <v-row class="ma-0">
      <v-col class="pa-0">
        <card class="h-100">
          <template #title>
            Olá, usuário
          </template>

          <h3 class="text-center black--text mb-5">
            Para acessar entre com suas credencias
          </h3>

          <email-default v-model="email" label="E-mail" :error="validEmailMessage" @is-valid="validateEmail" />
          <password-default v-model="password" label="Senha" />

          <div class="d-flex justify-space-between align-center">
            <button-default :loading="loading" :block="false" :x-large="false" label="Acessar" @click="submit" />
            <router-link :to="localePath('reset-password')" class="info--text text--darken-2">
              Esqueceu sua senha?
            </router-link>
          </div>
        </card>
      </v-col>
      <v-col class="pa-0">
        <card height-inherit class="bg-secondary h-100 d-flex flex-column">
          <template #title>
            Ainda não tem conta?
          </template>

          <v-container fill-height fluid>
            <div class="ma-auto d-flex flex-column justify-center">
              <p>
                <strong>Crie sua conta</strong> agora mesmo para usufruir de todas as funcionalidades que o Xenon pode lhe
                proporcionar
              </p>

              <button-default :block="false" :x-large="false" label="Criar conta" class="ma-auto" @click="goTo('register')" />
            </div>
          </v-container>
        </card>
      </v-col>
    </v-row>
  </unauthenticated-container>
</template>

<script>
import { mapActions } from 'vuex'
import App from '~/components/App'
import UnauthenticatedContainer from '~/components/layouts/unauthenticated/Container'
import Card from '~/components/shared/card'
import EmailDefault from '~/components/shared/form/EmailDefault'
import PasswordDefault from '~/components/shared/form/PasswordDefault'
import ButtonDefault from '~/components/shared/form/ButtonDefault'

export default App.extend({
  name: 'Login',

  components: { UnauthenticatedContainer, Card, EmailDefault, PasswordDefault, ButtonDefault },

  layout: 'unauthenticated',

  data () {
    return {
      email: '',
      password: '',
      validEmail: true,
      loading: false
    }
  },

  computed: {
    validEmailMessage () {
      if (!this.validEmail) {
        return ['Insira um email válido']
      }
    }
  },

  methods: {
    ...mapActions('current-user', ['login']),

    submit () {
      this.loading = true
      this.login({ email: this.email, password: this.password })
        .then((response) => {
          if (response) {
            this.pushAlertSuccess('Bem-vindo ao sistema!')
            return this.goTo('dashboard')
          }
          this.pushAlertError('Login e/ou senha inválidos')
        }).finally(() => {
          this.loading = false
        })
    },

    validateEmail (isValid) {
      this.validEmail = isValid
    }
  }
})
</script>

<style lang="scss" scoped>
  ::v-deep .bg-secondary {
    background-color: #b2b2b2 !important;
  }
</style>
