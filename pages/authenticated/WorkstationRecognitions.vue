<template>
  <authenticated-container
    v-if="currentUser"
    page-title="Reconhecimentos"
    :page-subtitle="workstationSubtitle"
  >
    <template #headerAppend>
      <h2>Modo {{ $t(`workstationModes.${workstation.mode}`) }}</h2>
    </template>

    <div class="d-flex justify-center mt-15">
      <recognition-card class="col-12 col-md-8" />
    </div>

  </authenticated-container>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex'
import App from '~/components/App'
import AuthenticatedContainer from '~/components/layouts/authenticated/Container.vue'
import RecognitionCard from '~/components/recognitions/RecognitionCard.vue'

export default App.extend({
  name: 'WorkstationRecognitions',

  components: { RecognitionCard, AuthenticatedContainer },

  mounted () {
    setTimeout(() => {
      this.listenWebsocket(this.workstationId)
    }, 1000)
  },

  computed: {
    ...mapGetters('workstation', ['workstation']),
    ...mapGetters('recognition', ['recognition']),

    workstationSubtitle () {
      return `Estação: ${this.workstation.name} | Ip: ${this.workstation.ip}`
    },

    workstationId () {
      return this.$route.params.id
    }
  },

  methods: {
    ...mapActions('workstation', ['listenWebsocket'])
  }
})
</script>

<style scoped>
</style>
