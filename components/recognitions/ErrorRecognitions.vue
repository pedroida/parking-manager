<template>
  <div>
    <template v-if="errorRecognitions.length">
      <v-data-table
        :headers="headers"
        :items="errorRecognitions"
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
          :length="errorPagination.totalPage"
          :value="errorPagination.page + 1"
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
  name: 'ErrorRecognitions',

  components: { ActionButton, Loader },

  created () {
    this.getErrorRecognitions()
  },

  watch: {
    'errorPagination.page' () {
      this.getErrorRecognitions()
    },

    'errorPagination.sorted' () {
      this.getErrorRecognitions()
    },

    'errorPagination.direction' () {
      this.getErrorRecognitions()
    }
  },

  computed: {
    ...mapGetters('recognition', ['errorRecognitions', 'loading']),

    vm () {
      return this
    },

    errorPagination () {
      return this.$store.state.recognition.errorPagination
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
    ...mapActions('recognition', ['getErrorRecognitions']),

    formatDate (epochTime: string) {
      return this.$dayjs(epochTime).format('DD/MM/YYYY HH:ss')
    },

    handleSortBy: debounce(function (field: any, vm: any) {
      if (!field) {
        field[0] = 'name'
      }

      vm.$store.commit('recognition/SET_ERROR_RECOGNITIONS', {
        sorted: field[0]
      })
    }),

    handleSortDirection: debounce(function (direction: any, vm: any) {
      if (!direction) {
        direction[0] = 'desc'
      }
      vm.$store.commit('recognition/SET_ERROR_RECOGNITIONS', {
        direction: direction[0]
      })
    }),

    handlePaginate (currentPage: number) {
      const errorPagination = { ...this.errorPagination }
      errorPagination.page = currentPage - 1
      this.$store.commit('recognition/SET_ERRORS_PAGINATION', errorPagination)
    }
  }
})
</script>

<style scoped>

</style>
