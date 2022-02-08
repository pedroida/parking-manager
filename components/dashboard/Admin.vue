<template>
  <v-row>
    <v-col cols="12">
      <v-card class="py-5">
        <v-row class="ma-0">
          <v-col cols="12" md="4">
            <line-chart :chartdata="registryCarsChartData" :options="options" :height="250" />
          </v-col>
          <v-col cols="12" md="4">
            <bar-chart :chartdata="registryUsersChartData" :options="options" :height="250" />
          </v-col>
          <v-col cols="12" md="4">
            <h3 class="text-center mb-3">
              Veículos
            </h3>
            <v-row>
              <v-col cols="12" md="6">
                <v-card color="success darken-3">
                  <v-card-text>
                    <h2 class="d-flex flex-column text-center white--text">
                      <span class="mb-3">Ativos</span>
                      <strong>
                        {{ groupedCars.approved }}
                      </strong>
                    </h2>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card color="primary darken-1">
                  <v-card-text>
                    <h2 class="d-flex flex-column text-center white--text">
                      <span class="mb-3">Em análise</span>
                      <strong>
                        {{ groupedCars.waiting }}
                      </strong>
                    </h2>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card color="error">
                  <v-card-text>
                    <h2 class="d-flex flex-column text-center white--text">
                      <span class="mb-3">Negados</span>
                      <strong>
                        {{ groupedCars.reproved }}
                      </strong>
                    </h2>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card color="error darken-4">
                  <v-card-text>
                    <h2 class="d-flex flex-column text-center white--text">
                      <span class="mb-3">Bloqueados</span>
                      <strong>
                        {{ groupedCars.block }}
                      </strong>
                    </h2>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
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
          <v-list v-if="workstations.length && !loading">
            <v-list-item v-for="(workstation, index) in workstations" :key="`workstation-${index}`">
              <span class="mr-2">{{ workstation.workstationName }}</span>
              <span class="mr-2"> - Acessos: {{ workstation.amountAccess }}</span>
              <button-default
                :block="false"
                small
                label="Acessar"
                @click="goTo({ name: 'workstation-recognitions', params: { id: workstation.id } })"
              />
            </v-list-item>
          </v-list>
          <h2 v-if="!workstations.length && !loading" class="text-center pa-8">
            Não há estações cadastradas
          </h2>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex'
import App from '~/components/App'
import BarChart from '~/components/charts/BarChart.vue'
import LineChart from '~/components/charts/LineChart.vue'
import ButtonDefault from '~/components/shared/form/ButtonDefault.vue'
import AdminDashboard from '~/components/dashboard/Admin.vue'

export default App.extend({
  name: 'AdminDashboard',

  components: { AdminDashboard, ButtonDefault, BarChart, LineChart },

  computed: {
    ...mapGetters('dashboard', [
      'workstations',
      'groupedCars',
      'lastDaysRecognitions',
      'groupedUsers',
      'loading'
    ]),

    registryCarsChartData (): any {
      const labels = []

      for (let i = 6; i >= 0; i--) {
        const currentDate = new Date()
        currentDate.setDate(currentDate.getDate() - i)
        labels.push(currentDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'numeric' }))
      }
      return {
        labels,
        datasets: [
          {
            label: 'Acessos dos últimos 7 dias',
            backgroundColor: this.$vuetify.theme.themes.light.info,
            data: [
              this.lastDaysRecognitions.now,
              this.lastDaysRecognitions.firstDayBebore,
              this.lastDaysRecognitions.secondDayBebore,
              this.lastDaysRecognitions.thirdhDayBebore,
              this.lastDaysRecognitions.fourthDayBebore,
              this.lastDaysRecognitions.fifthDayBebore,
              this.lastDaysRecognitions.sixthDayBebore
            ]
          }
        ]
      }
    },

    registryUsersChartData (): any {
      return {
        labels: ['Servidores', 'Palestrantes', 'Estudantes'],
        datasets: [
          {
            label: 'Usuários cadastrados por tipo',
            backgroundColor: this.$vuetify.theme.themes.light.primary,
            data: [this.groupedUsers.services, this.groupedUsers.speakers, this.groupedUsers.students]
          }
        ]
      }
    }
  },

  async created () {
    await this.getWorkstationsWithRecognitions()
    await this.getGroupedCarsByStatus()
    await this.getLastDaysRecognitions()
    await this.getGroupedUsersByType()
  },

  data () {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          yAxes: [{
            ticks: {
              min: 0
            }
          }]
        }
      }
    }
  },

  methods: {
    ...mapActions('dashboard', [
      'getWorkstationsWithRecognitions',
      'getGroupedCarsByStatus',
      'getLastDaysRecognitions',
      'getGroupedUsersByType'
    ])
  }
})
</script>

<style scoped>

</style>
