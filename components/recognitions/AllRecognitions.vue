<template>
  <div>
    <template v-if="recognitions.length">
      <v-data-table
        :headers="headers"
        :items="recognitions"
        hide-default-footer
        @update:sort-by="handleSortBy($event, vm)"
        @update:sort-desc="handleSortDirection($event, vm)"
      >
        <template #[`item.epochTime`]="{ item: { epochTime } }">
          {{ formatDate(epochTime) }}
        </template>
        <template #[`item.accessGranted`]="{ item: { accessGranted } }">
          <v-chip v-if="accessGranted" color="success">
            Sim
          </v-chip>
          <v-chip v-else color="error">
            Não
          </v-chip>
        </template>
        <template #[`item.actions`]="{ item }">
          <action-button
            small
            icon="mdi-pencil"
            color="warning"
            tooltip-text="Editar"
            @click="goTo({ 'name': 'edit-user', params: { 'id': item.id } })"
          />
          <action-button
            small
            icon="mdi-close"
            color="error"
            tooltip-text="Desativar"
            @click="showDisableModal(item)"
          />
          <action-button small icon="mdi-location-enter" color="secondary" tooltip-text="Acessos" />
          <action-button icon-small small icon="mdi-car" color="info" tooltip-text="Veículos" />
          <action-button
            v-if="!item.authorisedAccess"
            small
            icon="mdi-check"
            color="success"
            tooltip-text="Autorizar acesso"
          />
          <action-button
            v-else
            small
            icon="mdi-cancel"
            color="error"
            tooltip-text="Proibir acesso"
          />
        </template>
      </v-data-table>
      <div class="text-center pt-2">
        <v-pagination
          total-visible="10"
          :length="pagination.totalPage"
          :value="pagination.page + 1"
          @input="handlePaginate"
        />
      </div>
    </template>
    <h2 v-else class="text-center my-10">
      Não há reconhecimentos cadastrados até o momento
    </h2>

    <loader :loading="loading" />

  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex'
import debounce from 'lodash/debounce'
import App from '~/components/App'
import ActionButton from '~/components/shared/data-table/ActionButton.vue'
import Loader from '~/components/shared/loader.vue'

export default App.extend({
  name: 'AllRecognitions',

  components: { ActionButton, Loader },

  created () {
    this.getRecognitions()
  },

  watch: {
    'pagination.page' () {
      this.getRecognitions()
    },

    'pagination.sorted' () {
      this.getRecognitions()
    },

    'pagination.direction' () {
      this.getRecognitions()
    }
  },

  computed: {
    ...mapGetters('recognition', ['recognitions', 'loading']),

    vm () {
      return this
    },

    pagination () {
      return this.$store.state.recognition.pagination
    },

    headers () {
      return [
        {
          text: 'Acesso garantido?',
          value: 'accessGranted',
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
          text: 'Data',
          value: 'epochTime',
          sortable: false
        }
      ]
    }
  },

  methods: {
    ...mapActions('recognition', ['getRecognitions']),

    formatDate (epochTime: string) {
      return this.$dayjs(epochTime).format('DD/MM/YYYY HH:ss')
    },

    handleSortBy: debounce(function (field: any, vm: any) {
      if (!field) {
        field[0] = 'name'
      }

      vm.$store.commit('recognition/SET_PAGINATION', {
        sorted: field[0]
      })
    }),

    handleSortDirection: debounce(function (direction: any, vm: any) {
      if (!direction) {
        direction[0] = 'desc'
      }
      vm.$store.commit('recognition/SET_PAGINATION', {
        direction: direction[0]
      })
    }),

    handlePaginate (currentPage: number) {
      const pagination = { ...this.pagination }
      pagination.page = currentPage - 1
      this.$store.commit('recognition/SET_PAGINATION', pagination)
    }
  }
})
</script>

<style scoped>

</style>
