<template>
  <authenticated-container
    v-if="currentUser"
    page-title="Acessos"
    page-subtitle="Lista de acessos do usuário"
  >
    <template v-if="recognitions.length">
      <v-data-table
        :headers="headers"
        :items="recognitions"
        hide-default-footer
      >
        <template #no-data>
          <h2>Nenhum reconhecimento registrado até o momento</h2>
        </template>
        <template #[`item.grandAccess`]="{ item: { grandAccess } }">
          <v-chip v-if="grandAccess" color="success">
            Sim
          </v-chip>
          <v-chip v-else color="error">
            Não
          </v-chip>
        </template>
        <template #[`item.epochTime`]="{ item: { epochTime } }">
          {{ formatDate(epochTime) }}
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
      Não há usuários cadastrados até o momento
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
import Role from '~/entity/Role'
import Loader from '~/components/shared/loader.vue'

export default App.extend({
  name: 'UserAccesses',

  components: { Loader, AuthenticatedContainer, ButtonDefault, ActionButton },

  created () {
    this.getUserRecognitions(this.$route.params.id)
  },

  computed: {
    ...mapGetters('user', ['recognitions', 'loading']),

    pagination () {
      return this.$store.state.user.recognitionsPagination
    },

    headers () {
      return [
        {
          text: 'Autorizado?',
          value: 'grandAccess',
          sortable: false
        },
        {
          text: 'Confiança',
          value: 'confidence',
          sortable: false,
          width: '10%'
        },
        {
          text: 'Data do acesso',
          value: 'epochTime',
          sortable: false
        },
        {
          text: 'Placa',
          value: 'carPlate',
          sortable: false
        }
      ]
    }
  },

  methods: {
    ...mapActions('user', ['getUserRecognitions']),

    roleColor (role: Role): string {
      switch (role.id) {
        case 1:
          return 'primary'
        case 2:
          return 'info'
        default:
          return 'secondary'
      }
    },

    formatDate (epochTime: string) {
      return this.$dayjs(epochTime).format('DD/MM/YYYY HH:ss')
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
