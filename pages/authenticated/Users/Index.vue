<template>
  <authenticated-container
    v-if="currentUser"
    page-title="Usuários"
    page-subtitle="Lista de todos os usuários cadastrados no sistema"
  >
    <template #headerAppend>
      <button-default
        v-if="isAdmin"
        :block="false"
        label="Adicionar usuário"
        icon="mdi-plus"
        class="float-md-right"
        @click="newUser"
      />
    </template>

    <users-filter @filter="filterPagination" />

    <template v-if="users.length">
      <v-data-table
        :headers="headers"
        :items="users"
        hide-default-footer
        @update:sort-by="handleSortBy($event, vm)"
        @update:sort-desc="handleSortDirection($event, vm)"
      >
        <template #[`item.name`]="{ item: { name } }">
          {{ formatText(name, 15) }}
        </template>
        <template #[`item.email`]="{ item: { email } }">
          {{ formatText(email) }}
        </template>
        <template #[`item.type`]="{ item: { type } }">
          {{ $t(`userTypes.${type}`) }}
        </template>
        <template #[`item.roles`]="{ item: { roles } }">
          <div v-for="(role, index) in roles" :key="`role-${index}`">
            <v-chip small :color="roleColor(role)" class="my-1">
              {{ role.description }}
            </v-chip>
            <br>
          </div>
        </template>

        <template #[`item.enabled`]="{ item: { enabled, disableReason } }">
          <template v-if="enabled">
            <v-icon color="success" class="mr-2">
              mdi-circle
            </v-icon>
            Sim
          </template>
          <template v-else>
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-icon color="error" class="pointer" v-bind="attrs" v-on="on">
                  mdi-exclamation-thick
                </v-icon>
                Não
              </template>
              {{ disableReason }}
            </v-tooltip>
          </template>
        </template>
        <template #[`item.actions`]="{ item }">
          <action-button
            small
            icon="mdi-pencil"
            color="warning"
            tooltip-text="Editar"
            @click="goTo({ 'name': 'edit-user', params: { id: item.id } })"
          />
          <action-button
            small
            icon="mdi-close"
            color="error"
            tooltip-text="Desativar"
            @click="showDisableModal(item)"
          />
          <action-button
            small
            icon="mdi-location-enter"
            color="secondary"
            tooltip-text="Acessos"
            @click="goTo({ name: 'user-accesses', params: { id: item.id } })"
          />
          <action-button
            icon-small
            small
            icon="mdi-car"
            color="info"
            tooltip-text="Veículos"
            @click="goTo({ 'name': 'user-cars', params: { 'id': item.id } })"
          />
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
      Não há usuários cadastrados até o momento
    </h2>

    <disable-user-modal />

    <loader :loading="loading" />
  </authenticated-container>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex'
import debounce from 'lodash/debounce'
import App from '~/components/App'
import AuthenticatedContainer from '~/components/layouts/authenticated/Container.vue'
import ButtonDefault from '~/components/shared/form/ButtonDefault.vue'
import ActionButton from '~/components/shared/data-table/ActionButton.vue'
import DisableUserModal from '~/components/users/DisableUserModal.vue'
import Role from '~/entity/Role'
import User from '~/entity/User'
import Loader from '~/components/shared/loader.vue'
import UsersFilter from '~/components/users/Filter.vue'
import UsersPagination from '~/entity/UsersPagination'

export default App.extend({
  name: 'Users',

  components: { UsersFilter, Loader, AuthenticatedContainer, ButtonDefault, ActionButton, DisableUserModal },

  created () {
    this.getUsers()
  },

  watch: {
    'pagination.page' () {
      this.getUsers()
    },

    'pagination.nameOrEmail' () {
      this.getUsers()
    },

    'pagination.type' () {
      this.getUsers()
    },

    'pagination.sorted' () {
      this.getUsers()
    },

    'pagination.direction' () {
      this.getUsers()
    }
  },

  computed: {
    ...mapGetters('user', ['users', 'loading']),

    vm () {
      return this
    },

    pagination: {
      get () {
        return this.$store.state.user.pagination
      },

      set (pagination: UsersPagination) {
        this.$store.dispatch('user/setPagination', pagination)
      }
    },

    headers () {
      return [
        {
          text: 'Nome',
          value: 'name',
          sortable: false
        },
        {
          text: 'E-mail',
          value: 'email',
          sortable: false,
          width: '10%'
        },
        {
          text: 'Tipo de usuário',
          value: 'type',
          sortable: false
        },
        {
          text: 'Papéis',
          value: 'roles',
          sortable: false
        },
        {
          text: 'Conta ativa?',
          value: 'enabled',
          sortable: false
        },
        {
          text: 'Ações',
          value: 'actions',
          sortable: false
        }
      ]
    }
  },

  methods: {
    ...mapActions('user', ['getUsers']),

    showDisableModal (user: User) {
      this.$root.$emit('disable-user', user)
    },

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

    formatText (text: string, limit: number = 15) {
      return text.slice(0, limit) + (text.length > limit ? '...' : '')
    },

    handleSortBy: debounce(function (field: any, vm: any) {
      if (!field) {
        field[0] = 'name'
      }

      vm.$store.commit('user/SET_PAGINATION', {
        sorted: field[0]
      })
    }),

    handleSortDirection: debounce(function (direction: any, vm: any) {
      if (!direction) {
        direction[0] = 'desc'
      }
      vm.$store.commit('user/SET_PAGINATION', {
        direction: direction[0]
      })
    }),

    newUser () {
      this.goTo('create-user')
    },

    filterPagination (pagination: UsersPagination) {
      this.$store.commit('user/SET_FILTER_PAGINATION', pagination)
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
