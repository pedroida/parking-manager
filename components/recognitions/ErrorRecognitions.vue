<template>
  <div>
    <template v-if="errorRecognitions.length">
      <v-data-table
        :headers="headers"
        :items="errorRecognitions"
        hide-default-footer
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
            icon="mdi-magnify"
            color="info"
            tooltip-text="Ver erro"
            @click="showTrace(item)"
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

    <recognition-trace-modal />

    <loader :loading="loading" />
  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex'
import debounce from 'lodash/debounce'
import App from '~/components/App'
import ActionButton from '~/components/shared/data-table/ActionButton.vue'
import Loader from '~/components/shared/loader.vue'
import RecognitionTraceModal from '~/components/recognitions/RecognitionTraceModal.vue'
import Recognition from '~/entity/Recognition'

export default App.extend({
  name: 'ErrorRecognitions',

  components: { RecognitionTraceModal, ActionButton, Loader },

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
        },
        {
          text: 'Ação',
          value: 'actions',
          sortable: false
        }
      ]
    }
  },

  methods: {
    ...mapActions('recognition', ['getErrorRecognitions']),

    showTrace (error: Recognition) {
      this.$emit('show-trace', error.id)
    },

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
