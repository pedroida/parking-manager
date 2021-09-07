<template>
  <modal-default :open="carModal" hide-submit :header-title="label" @close="carModal = false">
    <template #activator>
      <v-btn
        rounded
        outlined
        icon
        small
        color="error"
        @click="carModal = !carModal"
      >
        <v-icon small>
          mdi-trash-can
        </v-icon>
      </v-btn>
    </template>

    <template #body>
      <div class="text-center">
        <v-icon x-large color="error">
          mdi-trash-can-outline
        </v-icon>
        <h1 class="pa-2 ma-0">
          Deseja realmente excluir o veículo?
        </h1>
      </div>
    </template>

    <template #actions>
      <button-default :disabled="!validCar" :loading="loading" label="Confirmar" @click="removeCar" />
    </template>
  </modal-default>
</template>

<script lang="ts">
import { mapActions } from 'vuex'
import App from '~/components/App'
import ButtonDefault from '~/components/shared/form/ButtonDefault.vue'
import InputDefault from '~/components/shared/form/InputDefault.vue'
import LicensePlateInput from '~/components/shared/form/LicensePlateInput.vue'
import ModalDefault from '~/components/shared/modal.vue'
import Car from '~/entity/Car'

export default App.extend({
  name: 'RemoveCar',

  components: { ModalDefault, ButtonDefault, InputDefault, LicensePlateInput },

  props: {
    car: {
      type: Car
    }
  },

  data () {
    return {
      carModal: false,
      loading: false
    }
  },

  computed: {
    label (): string {
      return 'Excluir veículo'
    },

    validCar (): boolean {
      return this.car.plateCar && this.car.modelCar
    }
  },

  methods: {
    ...mapActions('user', ['profileRemoveCar']),
    removeCar (): boolean | void {
      if (!this.validCar) {
        return false
      }
      this.loading = true
      this.profileRemoveCar(this.car)
        .then(() => {
          this.carModal = false
          this.pushAlertSuccess('Veículo removido sucesso!')
        }).catch((error: any) => {
          this.pushAlertError(error.response?.data?.message || 'Houve um problema ao remover o veículo')
        }).finally(() => {
          this.loading = false
        })
    }
  }
})
</script>
<style scoped>
</style>
