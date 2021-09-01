<template>
  <div>
    <h2 class="text-center">Inclua o e-mail que você utilizar para acessar.</h2>

    <v-row class="mt-5">
      <v-col offset-md="3" cols="6" md="6" sm="12">
        <email-default v-model="email" label="E-mail" @is-valid="validateEmail" :error="validEmailMessage"/>

        <button-default :disabled="!validEmail || !email.length" label="Solicitar nova senha" :x-large="false" @click="submit" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import App from '/components/App'
import EmailDefault from '/components/shared/form/EmailDefault'
import ButtonDefault from '/components/shared/form/ButtonDefault'

export default App.extend({
  name: "Form",

  components: { EmailDefault, ButtonDefault },


  data() {
    return {
      email: '',
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
    ...mapActions('authentication', ['requestPassword']),

    submit() {
      if (this.validEmail) {
        this.requestPassword(this.email).then((response) => {
          console.log(response)
        }).catch(() => {
          this.$emit('request-sent')
        })
      }
    },

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
