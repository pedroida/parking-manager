<template>
  <unauthenticated-container>
    <card class="mx-auto">
      <v-row class="ma-0 h-100">
        <v-col class="pa-0 text-center">
          <img src="~/assets/images/xenon.png" alt="" class="logo mb-5 w-50">

          <div>
            <h2 class="text-center">
              Ativando sua conta...
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

<script lang="ts">
import { mapActions } from 'vuex'
import App from '~/components/App'
import UnauthenticatedContainer from '~/components/layouts/unauthenticated/Container.vue'
import Card from '~/components/shared/card.vue'
import EmailDefault from '~/components/shared/form/EmailDefault.vue'
import PasswordDefault from '~/components/shared/form/PasswordDefault.vue'
import ButtonDefault from '~/components/shared/form/ButtonDefault.vue'

export default App.extend({
  name: 'ActivateUser',

  components: { UnauthenticatedContainer, Card, EmailDefault, PasswordDefault, ButtonDefault },

  layout: 'unauthenticated',

  computed: {
    token (): string {
      return this.$route.query?.params
    }
  },

  mounted () {
    this.activateUser(this.token)
      .then((response: any) => {
        if (response?.data?.result) {
          this.pushAlertSuccess(response?.data?.result)
          this.goTo('login')
        }
      }).catch(() => {
        this.pushAlertError('Não foi possível ativar sua conta')
      })
  },

  methods: {
    ...mapActions('user', ['activateUser'])
  }
})
</script>

<style lang="scss" scoped>
  .logo {
    margin: auto;
    max-width: 80%;
  }
</style>
