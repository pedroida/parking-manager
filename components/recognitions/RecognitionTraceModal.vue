<template>
  <modal-default
    :open="traceModal"
    header-title="Dados do erro"
    hide-submit
    max-width="100%"
    body-class="full-width"
    header-class="full-width"
    @close="closeModal"
  >
    <template #body>
      <div v-if="errorRecognition" class="px-5 trace">
        <p>
          <strong>Estação:</strong>
          {{ errorRecognition.workstationName }}
        </p>
        <p>
          <strong>Erro:</strong>
          {{ errorRecognition.errorMessage }}
        </p>
        <p>
          <strong>IP de origem:</strong>
          {{ errorRecognition.originIp }}
        </p>
        <p>
          <strong>Data da ocorrência:</strong>
          {{ $dayjs(errorRecognition.date).format('DD/MM/YYYY HH:ss') }}
        </p>
        <p>
          <strong>Trace:</strong>
          <span style="white-space: pre">
            {{ errorRecognition.trace }}
          </span>
        </p>
      </div>
    </template>
  </modal-default>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex'
import App from '~/components/App'
import ModalDefault from '~/components/shared/modal.vue'
import ButtonDefault from '~/components/shared/form/ButtonDefault.vue'

export default App.extend({
  name: 'RecognitionTraceModal',
  components: { ButtonDefault, ModalDefault },

  created () {
    this.$parent.$on('show-trace', (error: string | number) => {
      this.errorRecognitionId = error
    })
  },

  watch: {
    errorRecognitionId (errorRecognitionId: string | number) {
      this.getErrorRecognition(errorRecognitionId)
        .then(() => (this.traceModal = true))
    }
  },

  computed: {
    ...mapGetters('recognition', ['errorRecognition'])
  },

  data () {
    return {
      traceModal: false,
      errorRecognitionId: '' as string | number
    }
  },

  methods: {
    ...mapActions('recognition', ['getErrorRecognition']),

    closeModal () {
      this.traceModal = false
      this.errorRecognitionId = ''
    }
  }
})
</script>

<style scoped>
.trace {
  max-width: 100%;
  overflow-x: auto;
}
</style>
