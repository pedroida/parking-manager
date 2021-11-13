<template>
  <authenticated-container
    v-if="currentUser"
    page-title="Reconhecimentos"
    page-subtitle="Lista de todos os reconhecimentos cadastrados no sistema"
  >

    <v-tabs grow v-model="tab">
      <v-tabs-slider color="primary" />

      <v-tab>
        Reconhecimentos
      </v-tab>

      <v-tab>
        Erros de reconhecimento
      </v-tab>
    </v-tabs>

    <client-only>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <all-recognitions />
        </v-tab-item>
        <v-tab-item>
          <error-recognitions />
        </v-tab-item>
      </v-tabs-items>
    </client-only>
  </authenticated-container>
</template>

<script lang="ts">
import App from '~/components/App'
import AuthenticatedContainer from '~/components/layouts/authenticated/Container.vue'
import AllRecognitions from '~/components/recognitions/AllRecognitions.vue'
import ErrorRecognitions from '~/components/recognitions/ErrorRecognitions.vue'

export default App.extend({
  name: 'Users',

  components: { AllRecognitions, ErrorRecognitions, AuthenticatedContainer },

  data () {
    return {
      tab: 0
    }
  }
})
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
