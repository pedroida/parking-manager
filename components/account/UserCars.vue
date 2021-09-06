<template>
  <collapse-card :show-content="false" title="Veículos cadastrados" icon="mdi-car">
    <v-row>
      <v-col cols="12">
        <button-default :block="false" label="Adicionar veículo" class="mt-3" />
      </v-col>
      <v-col cols="12">
        <div v-for="(car, index) in currentUser.cars" :key="index" class="cars-container">
          <div>Modelo: {{ car.modelCar }}</div>
          <div>Placa: {{ car.plateCar }}</div>
          <div>
            <div v-if="car.document" />
            <button-default small :block="false" label="Enviar documento" />
          </div>
          <div>Reconhecimentos: {{ car.numberAccess }}</div>
          <div>
            <v-btn rounded outlined icon color="error">
              <v-icon>mdi-trash-can</v-icon>
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </collapse-card>
</template>

<script lang="ts">
import App from '~/components/App'
import CollapseCard from '~/components/shared/collapseCard.vue'
import ButtonDefault from '~/components/shared/form/ButtonDefault.vue'

export default App.extend({
  name: 'UserCars',

  components: { CollapseCard, ButtonDefault }
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
