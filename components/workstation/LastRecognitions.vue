<template>
  <v-data-table
    :headers="headers"
    :items="lastRecognitions"
    hide-default-footer
  >
    <template #[`item.authorize`]="{ item: { authorize } }">
      <v-chip v-if="authorize" color="success">
        Sim
      </v-chip>
      <v-chip v-else color="error">
        Não
      </v-chip>
    </template>
    <template #[`item.identifier`]="{ item: { identifier } }">
      <v-chip v-if="identifier" color="success">
        Sim
      </v-chip>
      <v-chip v-else color="error">
        Não
      </v-chip>
    </template>
    <template #no-data>
      <h2 class="text-center">
        Nenhum reconhecimento registrado até o momento
      </h2>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import App from '~/components/App'
import Recognition from '~/entity/Recognition'

export default App.extend({
  name: 'LastRecognitions',

  computed: {
    ...mapGetters('workstation', ['workstation']),

    lastRecognitions (): Recognition[] {
      return this.workstation.lastRecognitions || []
    },

    headers () {
      return [
        {
          text: 'Autorizado?',
          value: 'authorize',
          sortable: false
        },
        {
          text: 'Confiança',
          value: 'confidence',
          sortable: false,
          width: '10%'
        },
        {
          text: 'Nome do usuário',
          value: 'driverName',
          sortable: false
        },
        {
          text: 'Identificado?',
          value: 'identifier',
          sortable: false
        },
        {
          text: 'Modelo do veículo',
          value: 'modelCar',
          sortable: false
        },
        {
          text: 'Placa',
          value: 'plate',
          sortable: false
        }
      ]
    }
  }
})
</script>

<style scoped>

</style>
