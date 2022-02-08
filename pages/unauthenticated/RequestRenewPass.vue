<template>
  <unauthenticated-container>
    <card class="mx-auto">
      <v-row class="ma-0 h-100">
        <v-col class="pa-0 text-center">
          <img src="~/assets/images/xenon.png" alt="" class="logo mb-5 w-50">

          <h2 v-if="!message">
            Solicitando nova senha...
          </h2>
          <h2 v-else>
            {{ message }}
          </h2>

          <button-default :x-large="false" :block="false" label="Voltar ao login" class="mt-5" @click="goTo('login')" />
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
import ButtonDefault from '~/components/shared/form/ButtonDefault.vue'

export default App.extend({
  name: 'RequestRenewPass',

  components: { ButtonDefault, UnauthenticatedContainer, Card },

  layout: 'unauthenticated',

  mounted () {
    this.requestNewPass()
  },

  computed: {
    token (): string {
      return String(this.$route?.query?.params)
    }
  },

  data () {
    return {
      message: ''
    }
  },

  methods: {
    ...mapActions('current-user', ['confirmRequestPassword']),

    requestNewPass () {
      this.confirmRequestPassword(this.token)
        .then((response: any) => {
          this.message = response?.data?.result
          this.pushAlertSuccess(this.message)
        })
    }
  }
})
</script>

<style lang="scss" scoped>
  .logo {
    margin: auto;
    max-width: 300px;
  }
</style>
