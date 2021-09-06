<template>
  <unauthenticated-container>
    <card class="mx-auto">
      <v-row class="ma-0 h-100">
        <v-col class="pa-0 text-center">
          <img src="~/assets/images/xenon.png" alt="" class="logo mb-5 w-50">

          <div>
            <h2 class="text-center">
              Um e-mail foi enviado para você com as instruções para ativar sua conta,
              <br>
              não se esqueça de verificar também sua caixa de spam
            </h2>

            <v-icon size="5em" color="black" class="mt-5">
              mdi-check-circle
            </v-icon>

            <br>

            <button-default :x-large="false" :block="false" label="Voltar ao login" class="mt-5" @click="goTo('login')" />
          </div>
        </v-col>
      </v-row>
    </card>
  </unauthenticated-container>
</template>

<script>
import App from '~/components/App'
import UnauthenticatedContainer from '~/components/layouts/unauthenticated/Container'
import Card from '~/components/shared/card'
import EmailDefault from '~/components/shared/form/EmailDefault'
import PasswordDefault from '~/components/shared/form/PasswordDefault'
import ButtonDefault from '~/components/shared/form/ButtonDefault'

export default App.extend({
  name: 'SuccessRegister',

  components: { UnauthenticatedContainer, Card, EmailDefault, PasswordDefault, ButtonDefault },

  layout: 'unauthenticated'
})
</script>

<style lang="scss" scoped>
  .logo {
    margin: auto;
    max-width: 80%;
  }
</style>
