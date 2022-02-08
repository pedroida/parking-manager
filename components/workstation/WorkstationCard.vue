<template>
  <collapse-card :show-content="false">
    <template #header>
      {{ workstation.name }}
    </template>

    <template v-if="isAdmin">
      <remove-workstation :workstation="workstation" />
      <button-default
        small
        icon-small
        icon="mdi-pencil"
        :block="false"
        title="Editar estação"
        class="float-md-right mb-md-5 mr-md-5"
        @click="editWorkstation"
      />
    </template>

    <div class="d-flex justify-space-around mt-5 w-100">
      <span>
        <strong>IP:</strong>
        {{ workstation.ip }}
      </span>
      <span>
        <strong>Porta:</strong>
        {{ workstation.port }}
      </span>
    </div>

    <div class="text-center mt-5">
      <strong>Chave:</strong>
      <br>
      {{ workstation.key }}
    </div>

    <div class="d-flex justify-center my-7">
      <strong>{{ $t(`workstationModes.${workstation.mode}`) }}</strong>
    </div>

    <button-default
      label="Reconhecimentos"
      @click="goTo({ name: 'workstation-recognitions', params: { id: workstation.id } })"
    />
  </collapse-card>
</template>

<script lang="ts">
import { mapActions } from 'vuex'
import App from '~/components/App'
import CollapseCard from '~/components/shared/collapseCard.vue'
import ButtonDefault from '~/components/shared/form/ButtonDefault.vue'
import Workstation from '~/entity/Workstation'
import RemoveWorkstation from '~/components/workstation/Remove.vue'

export default App.extend({
  name: 'WorkstationCard',

  props: {
    workstation: {
      type: Workstation
    }
  },

  components: { RemoveWorkstation, CollapseCard, ButtonDefault },

  methods: {
    ...mapActions('workstation', ['setWorkstation']),
    editWorkstation () {
      this.setWorkstation(this.workstation)
      this.$root.$emit('handleWorkstation', this.workstation)
    }
  }
})
</script>

<style scoped>

</style>
