<template>
  <authenticated-container
    v-if="currentUser"
    page-title="Estações"
    page-subtitle="Estações dos dispositivos de reconhecimento"
  >
    <template #headerAppend>
      <button-default
        v-if="isAdmin"
        :block="false"
        label="Nova estação"
        icon="mdi-plus"
        class="float-md-right"
        @click="newWorkstation"
      />
    </template>
    <workstation-form v-if="isAdmin" />

    <v-row v-if="workstations.length" class="mt-5">
      <v-col v-for="(workstation) in workstations" :key="`workstation-${workstation.id}`" cols="12" md="4">
        <workstation-card :workstation="workstation" />
      </v-col>
    </v-row>
    <h2 v-else class="text-center my-10">
      Não há estações cadastradas até o momento
    </h2>
  </authenticated-container>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex'
import App from '~/components/App'
import AuthenticatedContainer from '~/components/layouts/authenticated/Container.vue'
import WorkstationForm from '~/components/workstation/Form.vue'
import WorkstationCard from '~/components/workstation/WorkstationCard.vue'
import ButtonDefault from '~/components/shared/form/ButtonDefault.vue'
import { WorkstationFactory } from '~/entity/factories/WorkstationFactory'

export default App.extend({
  name: 'Workstations',

  components: { WorkstationForm, WorkstationCard, AuthenticatedContainer, ButtonDefault },

  created () {
    this.getWorkstations()
  },

  computed: {
    ...mapGetters('workstation', ['workstations'])
  },

  methods: {
    ...mapActions('workstation', ['getWorkstations', 'setWorkstation']),

    newWorkstation () {
      this.setWorkstation(WorkstationFactory())
      this.$root.$emit('handleWorkstation', WorkstationFactory())
    }
  }
})
</script>

<style scoped>
</style>
