<template>
  <modal-default :open="traceModal" header-title="Dados do erro" hide-submit @close="closeModal">
    <template #body>
      <div v-if="errorRecognition">
        <p>
          <strong>Erro:</strong>
          {{ errorRecognition.errorMessage }}
        </p>
        <p>
          <strong>Trace:</strong>
          {{ errorRecognition.trace }}
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

</style>
