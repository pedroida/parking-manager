<template>
  <modal-default :open="workstationModal" hide-submit :header-title="label" @close="workstationModal = false">
    <template #body>
      <v-row>
        <v-col cols="12">
          <input-default
            v-model="workstation.name"
            label="Nome da estação"
            :error="getErrorMessage('name')"
          />
        </v-col>
        <v-col cols="12">
          <select-default
            v-model="workstation.mode"
            :items="modes"
            label="Modo de execução"
            :error="getErrorMessage('mode')"
          />
        </v-col>
        <v-col md="6" sm="12" cols="12">
          <ip-input
            v-model="workstation.ip"
            label="IP do dispositivo"
            :error="getErrorMessage('ip')"
          />
        </v-col>
        <v-col md="6" sm="12" cols="12">
          <port-input
            v-model="workstation.port"
            label="Porta do dispositivo"
            :error="getErrorMessage('port')"
          />
        </v-col>
        <v-col cols="12">
          <button-default :loading="loading" :disabled="!validWorkstation" label="Salvar" @click="submit" />
        </v-col>
      </v-row>
    </template>
  </modal-default>
</template>

<script lang="ts">
import { mapActions } from 'vuex'
import App from '~/components/App'
import ModalDefault from '~/components/shared/modal.vue'
import PortInput from '~/components/shared/form/PortInput.vue'
import IpInput from '~/components/shared/form/IpInput.vue'
import InputDefault from '~/components/shared/form/InputDefault.vue'
import SelectDefault from '~/components/shared/form/SelectDefault.vue'
import ButtonDefault from '~/components/shared/form/ButtonDefault.vue'
import Workstation from '~/entity/Workstation'

export default App.extend({
  name: 'WorkstationForm',

  components: { ModalDefault, PortInput, IpInput, InputDefault, SelectDefault, ButtonDefault },

  mounted () {
    this.$root.$on('handleWorkstation', (workstation: Workstation) => {
      this.errors = []
      this.workstation = { ...workstation }
      this.workstationModal = true
    })
  },

  computed: {
    label () {
      return this.workstation.id ? 'Editando estação' : 'Nova estação'
    },
    validWorkstation (): boolean {
      return this.workstation.mode && this.workstation.name && this.workstation.ip && this.workstation.port
    }
  },

  data () {
    return {
      workstationModal: false,
      errors: [],
      workstation: this.$store.getters['workstation/workstation'],
      loading: false,
      modes: [
        { value: 'AUTOMATIC', text: 'Automático' },
        { value: 'MANUAL', text: 'Manual' },
        { value: 'NONE', text: 'Desabilitado' }
      ]
    }
  },

  methods: {
    ...mapActions('workstation', ['createWorkstation', 'updateWorkstation']),

    submit (): void {
      if (!this.validWorkstation) {
        return
      }

      this.loading = true

      if (this.workstation.id) {
        this.editWorkstation()
      } else {
        this.newWorkstation()
      }
    },

    newWorkstation () {
      this.errors = []
      this.createWorkstation(this.workstation)
        .then(() => {
          this.pushAlertSuccess('Estação criada com sucesso!')
          this.workstationModal = false
        }).catch((error: any) => {
          if (error?.response?.data?.details) {
            this.errors = error?.response?.data?.details
          }
          this.pushAlertError(error.response?.data?.message || 'Houve um problema ao criar a estação')
        }).finally(() => {
          this.loading = false
        })
    },

    editWorkstation () {
      this.errors = []
      this.updateWorkstation(this.workstation)
        .then(() => {
          this.pushAlertSuccess('Estação atualizada com sucesso!')
          this.workstationModal = false
        }).catch((error: any) => {
          if (error?.response?.data?.details) {
            this.errors = error?.response?.data?.details
          }
          this.pushAlertError(error.response?.data?.message || 'Houve um problema ao salvar a estação')
        }).finally(() => {
          this.loading = false
        })
    },

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
