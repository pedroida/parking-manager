<template>
  <authenticated-container
    v-if="currentUser"
    page-title="Reconhecimentos"
    :page-subtitle="workstationSubtitle"
  >
    <template #headerAppend>
      <h2>Modo {{ $t(`workstationModes.${workstation.mode}`) }}</h2>
    </template>

    <div class="mt-15 d-grid recognition-card-container">
      <v-scroll-x-reverse-transition mode="out-in">
        <recognition-card v-if="recognition && showCard" v-show="showCard" class="col-12 col-md-8 ma-auto w-fit-content" />
      </v-scroll-x-reverse-transition>
    </div>

    <last-recognitions class="mt-5" />
  </authenticated-container>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex'
import App from '~/components/App'
import AuthenticatedContainer from '~/components/layouts/authenticated/Container.vue'
import RecognitionCard from '~/components/recognitions/RecognitionCard.vue'
import LastRecognitions from '~/components/workstation/LastRecognitions.vue'

export default App.extend({
  name: 'WorkstationRecognitions',

  components: { LastRecognitions, RecognitionCard, AuthenticatedContainer },

  created () {
    this.getWorkstation(this.$route.params.id)
    this.resetLastRecognitions()
    this.setRecognition(null)
  },

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

  watch: {
    recognition () {
      this.showCard = false

      setTimeout(() => {
        this.showCard = true
      }, 500)
    }
  },

  data () {
    return {
      showCard: true
    }
  },

  methods: {
    ...mapActions('workstation', ['listenWebsocket', 'getWorkstation', 'resetLastRecognitions']),
    ...mapActions('recognition', ['setRecognition'])
  },

  beforeDestroy () {
    this.setRecognition(null)
    this.resetLastRecognitions()
  }
})
</script>

<style scoped>
.w-fit-content {
  width: fit-content;
}

.recognition-card-container {
  min-height: 16em;
}
</style>
