<template>
  <v-row>
    <v-col cols="12" class="d-flex flex-column justify-center align-center mt-15">
      <img src="~/assets/images/xenon.png" alt="" class="logo mb-5">

      <p>Bem-vindo ao Sistema Xenon</p>
    </v-col>

    <v-col cols="12">
      <v-card class="py-5">
        <v-row class="ma-0">
          <v-col cols="12" md="4">
            <line-chart :chartdata="chartdata" :options="options" :height="250" />
          </v-col>
          <v-col cols="12" md="4">
            <bar-chart :chartdata="chartdata" :options="options" :height="250" />
          </v-col>
          <v-col cols="12" md="4">
            <h3 class="text-center">Veículos</h3>
            <v-card class="mb-2" color="success darken-2" hover>
              <v-card-text>
                <h2 class="d-flex justify-space-between white--text">
                  <span>Ativos:</span>
                  <strong>50</strong>
                </h2>
              </v-card-text>
            </v-card>
            <v-card class="mb-2" color="warning" hover>
              <v-card-text>
                <h2 class="d-flex justify-space-between white--text">
                  <span>Em análise:</span>
                  <strong>10</strong>
                </h2>
              </v-card-text>
            </v-card>
            <v-card color="error" hover>
              <v-card-text>
                <h2 class="d-flex justify-space-between white--text">
                  <span>Negados:</span>
                  <strong>5</strong>
                </h2>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card>
        <v-card-title>
          Estações
        </v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item>
              <span class="mr-2">Portão A</span>
              <span class="mr-2">Modo: <strong>MANUAL</strong></span>
              <span class="mr-2">Acessos: 1000</span>
              <button-default :block="false" small label="Acessar" />
            </v-list-item>

            <v-list-item>
              <span class="mr-2">Portão B</span>
              <span class="mr-2">Modo: <strong>AUTOMÁTICO</strong></span>
              <span class="mr-2">Acessos: 270</span>
              <button-default :block="false" small label="Acessar" />
            </v-list-item>

            <v-list-item>
              <span class="mr-2">Portão C</span>
              <span class="mr-2">Modo: <strong>MANUAL</strong></span>
              <span class="mr-2">Acessos: 2</span>
              <button-default :block="false" small label="Acessar" />
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import App from '~/components/App'
import BarChart from '~/components/charts/BarChart.vue'
import LineChart from '~/components/charts/LineChart.vue'
import ButtonDefault from '~/components/shared/form/ButtonDefault.vue'

export default App.extend({
  name: 'Dashboard',
  components: { ButtonDefault, BarChart, LineChart },
  data () {
    return {
      accessLabels: ['01/11', '02/11', '03/11', '04/11', '05/11', '06/11'],
      chartdata: {
        labels: ['January', 'February', 'January', 'February', 'January', 'February'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: this.$vuetify.theme.themes.light.primary,
            data: [40, 20, 150, 70, 8, 20, 100]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true
      }
    }
  }
})
</script>

<style scoped>
.logo {
  width: 300px;
}
</style>
