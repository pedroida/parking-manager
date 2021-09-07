<template>
  <collapse-card :show-content="false" title="Veículos cadastrados" icon="mdi-car">
    <v-row>
      <v-col cols="12">
        <car-form v-if="hasMaxCars" v-model="newCar" label="Adicionar veículo" />
      </v-col>
      <v-col v-if="currentUser.cars.length" cols="12">
        <div v-for="(car, index) in currentUser.cars" :key="index" class="cars-container mb-2">
          <div>Modelo: {{ car.modelCar }}</div>
          <div>Placa: {{ car.plateCar }}</div>
          <div>
            <div v-if="car.document" />
            <button-default small :block="false" label="Enviar documento" />
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
    </v-row>
  </collapse-card>
</template>

<script lang="ts">
import App from '~/components/App'
import CollapseCard from '~/components/shared/collapseCard.vue'
import ButtonDefault from '~/components/shared/form/ButtonDefault.vue'
import CarForm from '~/components/shared/car/Form.vue'
import { CarFactory } from '~/entity/factories/CarFactory'
import RemoveCar from '~/components/shared/car/Remove.vue'

export default App.extend({
  name: 'UserCars',

  components: { RemoveCar, CollapseCard, ButtonDefault, CarForm },

  computed: {
    hasMaxCars (): boolean {
      return this.currentUser.cars.length <= 5
    }
  },

  data () {
    return {
      newCar: CarFactory()
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
</style>
