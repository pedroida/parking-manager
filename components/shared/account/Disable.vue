<template>
  <modal-default :open="disableAccountModal" hide-submit :header-title="label" @close="disableAccountModal = false">
    <template #activator>
      <button-default
        color="error"
        :block="false"
        label="Desativar conta"
        class="mt-3 deactivate"
        @click="disableAccountModal = !disableAccountModal"
      />
    </template>

    <template #body>
      <div class="text-center">
        <v-icon x-large color="error">
          mdi-close-circle
        </v-icon>
        <h1 class="pa-2 ma-0">
          Deseja realmente desativar a conta?
        </h1>
      </div>
    </template>

    <template #actions>
      <button-default :loading="loading" label="Confirmar" @click="disable" />
    </template>
  </modal-default>
</template>

<script lang="ts">
import { mapActions } from 'vuex'
import App from '~/components/App'
import ButtonDefault from '~/components/shared/form/ButtonDefault.vue'
import ModalDefault from '~/components/shared/modal.vue'
import Car from '~/entity/Car'

export default App.extend({
  name: 'DisableAccount',

  components: { ModalDefault, ButtonDefault },

  props: {
    car: {
      type: Car
    }
  },

  data () {
    return {
      disableAccountModal: false,
      loading: false
    }
  },

  computed: {
    label (): string {
      return 'Desativar conta'
    }
  },

  methods: {
    ...mapActions('user', ['profileDisableAccount']),
    disable (): boolean | void {
      this.loading = true
      this.profileDisableAccount()
        .then(() => {
          this.disableAccountModal = false
          this.pushAlertSuccess('Conta desativada com sucesso!')
        }).catch((error: any) => {
          this.pushAlertError(error.response?.data?.message || 'Houve um problema ao desativar a conta')
        }).finally(() => {
          this.loading = false
        })
    }
  }
})
</script>
<style scoped>
.deactivate {
  position: absolute;
  bottom: 1em;
}
</style>
