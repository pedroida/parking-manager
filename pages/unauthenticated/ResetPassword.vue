<template>
  <unauthenticated-container>

    <card class="mx-auto">
      <v-row class="ma-0 h-100">
        <v-col class="pa-0 text-center">
          <img src="~/assets/images/xenon.png" alt="" class="logo mb-5 w-50">

          <form-request v-if="!passwordRequested" @request-sent="passwordRequested = !passwordRequested" />
          <request-sent v-else />
        </v-col>
      </v-row>
    </card>

  </unauthenticated-container>
</template>

<script>
import App from '/components/App'
import UnauthenticatedContainer from "~/components/layouts/unauthenticated/Container";
import Card from '/components/shared/card'
import EmailDefault from '/components/shared/form/EmailDefault'
import PasswordDefault from '/components/shared/form/PasswordDefault'
import ButtonDefault from '/components/shared/form/ButtonDefault'
import FormRequest from '/components/reset-password/Form'
import RequestSent from '/components/reset-password/RequestSent'

export default App.extend({
  name: "ResetPassword",

  components: { UnauthenticatedContainer, Card, EmailDefault, PasswordDefault, ButtonDefault, FormRequest, RequestSent },

  layout: 'unauthenticated',

  data() {
    return {
      email: '',
      password: '',
      validEmail: true,
      passwordRequested: false
    }
  },

  computed: {
    validEmailMessage() {
      if (!this.validEmail) {
        return ['Insira um email válido']
      }
    }
  },

  methods: {
    validateEmail(isValid) {
      this.validEmail = isValid
    }
  }
})
</script>

<style lang="scss" scoped>
  .logo {
    margin: auto;
    max-width: 80%;
  }
</style>
