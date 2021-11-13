<template>
  <v-chip small :color="status.color" class="my-1">
    {{ $t(status.text) }}
  </v-chip>
</template>

<script lang="ts">
import App from '~/components/App'
import Car from '~/entity/Car'

export interface CarChip {
  text: string
  color: string
}

export default App.extend({
  name: 'StatusChip',

  props: {
    car: {
      type: Car,
      required: true
    }
  },

  computed: {
    status (): CarChip {
      if (!this.car.document) {
        return { text: 'label.waitingDocument', color: 'secondary' }
      }

      switch (this.car.status) {
        case 'WAITING':
          return { text: 'label.waitingEvaluation', color: 'info' }

        case 'APPROVED':
          return { text: 'label.carApproved', color: 'success' }

        case 'REPROVED':
          return { text: 'label.carReproved', color: 'error' }

        case 'BLOCK':
          return { text: 'label.carBlocked', color: 'error darken-1' }

        default:
          return { text: this.car.status, color: 'secondary' }
      }
    }
  }
})
</script>

<style scoped>

</style>
