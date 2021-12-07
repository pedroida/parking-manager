<template>
  <authenticated-container
    v-if="currentUser"
    page-title="Veículos aguardando avaliação"
    page-subtitle="Lista de todos os veículos que ainda não foram avaliados"
  >
    <template v-if="cars.length">
      <v-data-table
        :headers="headers"
        :items="cars"
        hide-default-footer
      >
        <template #[`item.authorisedAccess`]="{ item: { authorisedAccess } }">
          <template v-if="authorisedAccess">
            <v-icon color="success" class="mr-2">
              mdi-circle
            </v-icon>
            Sim
          </template>
          <template v-else>
            <v-icon color="error">
              mdi-exclamation-thick
            </v-icon>
            Não
          </template>
        </template>
        <template #[`item.status`]="{ item }">
          <status-chip :car="item" />
        </template>
        <template #[`item.actions`]="{ item }">
          <action-button
            v-if="item.document && item.status === 'WAITING'"
            small
            icon="mdi-check"
            color="success"
            tooltip-text="Aprovar documento"
            @click="approve(item.id)"
          />
          <action-button
            v-if="item.document && item.status === 'WAITING'"
            small
            icon="mdi-cancel"
            color="error"
            tooltip-text="Reprovar documento"
            @click="reprove(item.id)"
          />
          <action-button
            v-if="item.document && item.status === 'WAITING'"
            small
            icon="mdi-download"
            color="info"
            tooltip-text="Baixar documento"
            @click="downloadDoc(item)"
          />
        </template>
      </v-data-table>
    </template>
    <h2 v-else class="text-center my-10">
      Não há veículos aguardando avaliação até o momento
    </h2>

    <loader :loading="loading" />
  </authenticated-container>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex'
import App from '~/components/App'
import AuthenticatedContainer from '~/components/layouts/authenticated/Container.vue'
import ButtonDefault from '~/components/shared/form/ButtonDefault.vue'
import ActionButton from '~/components/shared/data-table/ActionButton.vue'
import Loader from '~/components/shared/loader.vue'
import Car from '~/entity/Car'
import StatusChip from '~/components/cars/StatusChip.vue'

export default App.extend({
  name: 'CarsWaiting',

  components: { Loader, AuthenticatedContainer, ButtonDefault, ActionButton, StatusChip },

  created () {
    this.getCarsWaiting()
  },

  computed: {
    ...mapGetters('car-waiting', ['cars', 'loading']),

    vm () {
      return this
    },

    pagination () {
      return this.$store.state.user.pagination
    },

    headers () {
      return [
        {
          text: 'Placa',
          value: 'plateCar',
          sortable: false
        },
        {
          text: 'Modelo',
          value: 'modelCar',
          sortable: false,
          width: '10%'
        },
        {
          text: 'Status',
          value: 'status',
          sortable: false
        },
        {
          text: 'Ações',
          value: 'actions',
          sortable: false,
          width: '200px'
        }
      ]
    }
  },

  methods: {
    ...mapActions('car-waiting', ['getCarsWaiting', 'getCarDoc', 'reproveCar', 'approveCar']),

    downloadDoc (car: Car) {
      this.getCarDoc(car.id).then((docUrl: string) => {
        const link = document.createElement('a')
        link.download = `${car.modelCar}-${car.plateCar}-document.pdf`
        link.href = docUrl
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }).catch(() => {
        this.pushAlertError('Não foi possível baixar o documento do veículo.')
      })
    },

    approve (carId: string) {
      this.approveCar(carId).then(() => {
        this.pushAlertSuccess('Carro aprovado com sucesso!')
      }).catch((error: any) => {
        this.pushAlertError(error.response?.data?.message || 'Houve um problema ao aprovar o veículo')
      })
    },

    reprove (carId: string) {
      this.reproveCar(carId).then(() => {
        this.pushAlertInfo('Carro reprovado com sucesso!')
      }).catch((error: any) => {
        this.pushAlertError(error.response?.data?.message || 'Houve um problema ao reprovar o veículo')
      })
    },

    handlePaginate (currentPage: number) {
      const pagination = { ...this.pagination }
      pagination.page = currentPage - 1
      this.$store.commit('user/SET_PAGINATION', pagination)
    }
  }
})
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
