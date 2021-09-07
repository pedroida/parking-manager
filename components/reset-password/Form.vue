<template>
  <div>
    <h2 class="text-center">
      Inclua o e-mail que você utilizar para acessar.
    </h2>

    <v-row class="mt-5">
      <v-col offset-md="3" cols="6" md="6" sm="12">
        <email-default v-model="email" label="E-mail" :error="validEmailMessage" @is-valid="validateEmail" />

        <button-default :disabled="!validEmail || !email.length" label="Solicitar nova senha" :x-large="false" @click="submit" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { mapActions } from 'vuex'
import App from '~/components/App'
import EmailDefault from '~/components/shared/form/EmailDefault.vue'
import ButtonDefault from '~/components/shared/form/ButtonDefault.vue'

export default App.extend({
  name: 'Form',

  components: { EmailDefault, ButtonDefault },

  data () {
    return {
      email: '',
      validEmail: true,
      passwordRequested: false
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
    ...mapActions('user', ['requestPassword']),

    submit () {
      if (this.validEmail) {
        this.requestPassword(this.email).then((response: any) => {
          this.pushAlertSuccess(response?.data?.result)
          this.$emit('request-sent')
        }).catch(() => {
          this.$emit('request-sent')
        })
      }
    },

    validateEmail (isValid: boolean) {
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
