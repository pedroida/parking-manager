<template>
  <v-row>
    <v-col cols="12">
      <car-form v-if="hasMaxCars" v-model="newCar" label="Adicionar veículo" @car-added="carAdded" />
    </v-col>
    <v-col v-if="currentUser.cars.length" cols="12">
      <div v-for="(car, index) in currentUser.cars" :key="index" class="cars-container mb-2" :class="{'mobile-list': isMobile}">
        <div>Modelo: {{ car.modelCar }}</div>
        <div>Placa: {{ car.plateCar }}</div>
        <div>
          <div v-if="car.document" />
          <button-default small :block="false" label="Enviar documento" @click="upload(car.id)" />
        </div>
        <div>Reconhecimentos: {{ car.numberAccess }}</div>
        <div>
          <remove-car :car="car" />
        </div>
      </div>
    </v-col>
    <v-col v-else cols="12">
      <h2 class="text-center">
        <v-divider class="mb-5" />
        Você não possui veículos cadastrados
      </h2>
    </v-col>
    <v-col class="d-none">
      <input
        ref="uploader"
        class="d-none"
        type="file"
        accept="application/pdf"
        @change="onFileChanged"
      >
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { mapActions } from 'vuex'
import App from '~/components/App'
import ButtonDefault from '~/components/shared/form/ButtonDefault.vue'
import CarForm from '~/components/shared/car/Form.vue'
import { CarFactory } from '~/entity/factories/CarFactory'
import RemoveCar from '~/components/shared/car/Remove.vue'

export default App.extend({
  name: 'UserCars',

  components: { RemoveCar, ButtonDefault, CarForm },

  computed: {
    hasMaxCars (): boolean {
      return this.currentUser.cars.length < 5
    }
  },

  data () {
    return {
      newCar: CarFactory(),
      selectedFile: null,
      carId: null
    }
  },

  methods: {
    ...mapActions('current-user', ['sendDoc']),

    carAdded () {
      this.newCar = CarFactory()
    },

    upload (carId: string) {
      this.carId = carId
      this.loading = true
      window.addEventListener('focus', () => {
        this.loading = false
      }, { once: true })

      this.$refs.uploader.click()
    },
    onFileChanged (e: any) {
      this.loading = true
      this.selectedFile = e.target.files[0]
      this.sendDoc({ carId: this.carId, document: this.selectedFile })
        .then(() => {
          this.pushAlertSuccess('Documento enviado com sucesso!')
        }).finally(() => {
          this.loading = false
          this.selectedFile = null
          e.target.files = null
        })
    }
  }
})
</script>

<style scoped lang="scss">
.cars-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 0.3fr;

  div {
    align-self: center;
  }
}

.mobile-list {
  display: flex !important;
  flex-direction: column;

  div {
    margin-bottom: 1em;
  }
}
</style>
