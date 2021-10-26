<template>
  <v-row>
    <v-col cols="12" md="6">
      <input-default v-model="user.name" label="Nome" :error="getErrorMessage('name')" />
    </v-col>
    <v-col cols="12" md="6">
      <email-default v-model="user.email" label="E-mail" :error="getErrorMessage('email')" />
    </v-col>
    <v-col cols="12" md="6">
      <select-default
        v-model="user.type"
        label="Tipo de usuário"
        :items="types"
        item-text="text"
        item-value="value"
        :error="getErrorMessage('typeUser')" />
    </v-col>
    <v-col cols="12" md="6">
      <select-default
        v-model="user.roles"
        multiple
        label="Papéis de usuário"
        :items="roles"
        item-text="text"
        item-value="value"
        :error="getErrorMessage('roles')"
      />
    </v-col>
    <v-col cols="12" class="pt-md-0">
      <switch-default v-model="user.enabled" label="Ativar conta" />

      <text-area-default v-if="!user.enabled && user.id" v-model="user.disableReason" label="Motivo da desativação" />

      <switch-default v-model="user.authorisedAccess" label="Autorizar acesso, habilitando o **usuário terá acesso ao estacionamento**" />
    </v-col>
    <template v-if="!user.id">
      <v-col md="6" sm="12" cols="12">
        <input-default v-model="user.cars[0].modelCar" label="Modelo do veículo (opcional)" :error="getErrorMessage('modelCar')" />
      </v-col>
      <v-col md="6" sm="12" cols="12">
        <license-plate-input v-model="user.cars[0].plateCar" label="Placa do veículo (opcional)" :error="getErrorMessage('plateCar')" />
      </v-col>
    </template>
  </v-row>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import App from '~/components/App'
import User from '@/entity/User'
import InputDefault from '@/components/shared/form/InputDefault.vue'
import LicensePlateInput from '@/components/shared/form/LicensePlateInput.vue'
import EmailDefault from '@/components/shared/form/EmailDefault.vue'
import SelectDefault from '@/components/shared/form/SelectDefault.vue'
import SwitchDefault from '@/components/shared/form/SwitchDefault.vue'
import TextAreaDefault from '@/components/shared/form/TextAreaDefault.vue'
import { RoleFactory } from '~/entity/factories/RoleFactory'

export default App.extend({
  name: 'UserForm',

  props: {
    value: {
      type: User
    },

    errors: {
      type: []
    }
  },

  components: {
    InputDefault,
    EmailDefault,
    SelectDefault,
    SwitchDefault,
    TextAreaDefault,
    LicensePlateInput
  },

  computed: {
    ...mapGetters('shared', ['userTypes', 'userRoles']),

    types (): any[] {
      return this.userTypes.map((type: any): any => {
        return { value: type, text: this.$i18n.t(`userTypes.${type}`) }
      })
    },

    roles (): any[] {
      return [
        { text: 'Perfil Motorista', value: RoleFactory(1, 'ROLE_DRIVER', 'Perfil Motorista') },
        { text: 'Perfil Administrador', value: RoleFactory(2, 'ROLE_ADMIN', 'Perfil Administrador') },
        { text: 'Perfil Operador', value: RoleFactory(3, 'ROLE_OPERATOR', 'Perfil Operdor') }
      ]
    },

    user: {
      get (): User {
        return this.value
      },

      set (user: User): void {
        this.$emit('input', user)
      }
    }
  },

  methods: {
    getErrorMessage (field: string) {
      const error = this.errors.find((errorItem: any) => {
        return errorItem.field === field
      })
      if (error) {
        return [error.descriptionError]
      }
    }
  }
})
</script>

<style scoped>

</style>
