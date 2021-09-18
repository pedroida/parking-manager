<template>
  <modal-default :open="carModal" hide-submit :header-title="label" @close="carModal = false">
    <template #activator>
      <button-default
        :block="false"
        :label="label"
        class="mt-3"
        @click="carModal = !carModal"
      />
    </template>

    <template #body>
      <v-row>
        <v-col md="6" sm="12" cols="12">
          <input-default v-model="car.modelCar" label="Modelo do veículo" />
        </v-col>
        <v-col md="6" sm="12" cols="12">
          <license-plate-input v-model="car.plateCar" label="Placa do veículo" />
        </v-col>
      </v-row>
    </template>

    <template #actions>
      <button-default :disabled="!validCar" :loading="loading" label="Salvar" @click="update" />
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
  name: 'CarForm',

  components: { ModalDefault, ButtonDefault, InputDefault, LicensePlateInput },

  props: {
    label: {
      type: String
    },

    value: {
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
    car: {
      get (): Car {
        return this.value
      },

      set (car: Car): void {
        this.$emit('input', car)
      }
    },

    validCar (): boolean {
      return this.car.plateCar && this.car.modelCar
    }
  },

  watch: {
    value (car: Car): void {
      this.$emit('input', car)
    }
  },

  methods: {
    ...mapActions('user', ['profileNewCar']),
    update (): boolean | void {
      if (!this.validCar) {
        return false
      }
      this.loading = true
      this.profileNewCar({ plate: this.car.plateCar, model: this.car.modelCar })
        .then(() => {
          this.carModal = false
          this.pushAlertSuccess('Veículo adicionado com sucesso!')
          this.$emit('car-added')
        }).catch((error: any) => {
          this.pushAlertError(error.response?.data?.message || 'Houve um problema ao adicionar o veículo')
        }).finally(() => {
          this.loading = false
        })
    }
  }
})
</script>
<style scoped>
</style>
