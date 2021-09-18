<template>
  <modal-default :open="workstationModal" hide-submit :header-title="label" @close="workstationModal = false">
    <template #activator>
      <v-btn
        rounded
        small
        color="error"
        @click="workstationModal = !workstationModal"
        class="float-md-right mb-md-5 mr-md-5"
      >
        <v-icon small>
          mdi-trash-can
        </v-icon>
      </v-btn>
    </template>

    <template #body>
      <div class="text-center">
        <v-icon x-large color="error">
          mdi-trash-can-outline
        </v-icon>
        <h1 class="pa-2 ma-0">
          Deseja realmente excluir a estação?
        </h1>
      </div>
    </template>

    <template #actions>
      <button-default :loading="loading" label="Confirmar" @click="remove" />
    </template>
  </modal-default>
</template>

<script lang="ts">
import { mapActions } from 'vuex'
import App from '~/components/App'
import ButtonDefault from '~/components/shared/form/ButtonDefault.vue'
import InputDefault from '~/components/shared/form/InputDefault.vue'
import LicensePlateInput from '~/components/shared/form/LicensePlateInput.vue'
import ModalDefault from '~/components/shared/modal.vue'
import Workstation from '~/entity/Workstation'

export default App.extend({
  name: 'RemoveWorkstation',

  components: { ModalDefault, ButtonDefault, InputDefault, LicensePlateInput },

  props: {
    workstation: {
      type: Workstation
    }
  },

  data () {
    return {
      workstationModal: false,
      loading: false
    }
  },

  computed: {
    label (): string {
      return 'Excluir estação'
    }
  },

  methods: {
    ...mapActions('workstation', ['removeWorkstation']),
    remove (): boolean | void {
      this.loading = true
      this.removeWorkstation(this.workstation)
        .then(() => {
          this.workstationModal = false
          this.pushAlertSuccess('Estação removida sucesso!')
        }).catch((error: any) => {
          this.pushAlertError(error.response?.data?.message || 'Houve um problema ao remover a estação')
        }).finally(() => {
          this.loading = false
        })
    }
  }
})
</script>
<style scoped>
</style>
