<template>
  <card hide-title>
    <v-row>
      <v-col cols="12" md="5" class="avatar-container d-flex justify-center align-center">
        <img :src="recognition.userAvatar" alt="avatar usuário" class="user-avatar">
      </v-col>
      <v-col cols="1" class="d-md-block d-none">
        <v-divider vertical />
      </v-col>
      <v-col cols="12" md="6" class="d-flex flex-column justify-center">
        <p v-if="recognition.plate">
          Placa reconhecida: {{ recognition.plate }}
        </p>
        <p v-else>
          Placa não cadastrada no sistema
        </p>
        <p>
          Taxa de confiança: {{ recognition.confidence }}%
        </p>
        <p v-if="recognition.driverName">
          Motorista: {{ recognition.driverName }}
        </p>
      </v-col>
      <v-col v-if="!manualWorkstation" cols="12" md="5" class="d-flex flex-column justify-center">
        <h2 v-if="recognition.authorize" class="text-center success--text text--darken-4">
          {{ $t('label.authorised') }}
        </h2>

        <h2 v-else class="text-center error--text">
          {{ $t('label.notAuthorised') }}
        </h2>
      </v-col>
      <v-col v-if="manualWorkstation && recognition.authorize" cols="12" class="d-flex justify-center">
        <button-default v-if="showAuthorize" color="primary" label="label.authorise" :block="false" class="px-15 py-5" @click="approve" />
      </v-col>
    </v-row>
  </card>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex'
import App from '~/components/App'
import Card from '~/components/shared/card.vue'
import ButtonDefault from '~/components/shared/form/ButtonDefault.vue'

export default App.extend({
  name: 'RecognitionCard',

  components: { ButtonDefault, Card },

  mounted () {
    this.showAuthorize = true
  },

  computed: {
    ...mapGetters('recognition', ['recognition']),
    ...mapGetters('workstation', ['workstation']),

    manualWorkstation () {
      return this.workstation.mode === 'MANUAL'
    }
  },

  data () {
    return {
      showAuthorize: false
    }
  },

  watch: {
    recognition () {
      this.showAuthorize = true
    }
  },

  methods: {
    ...mapActions('recognition', ['requestApproveAccess']),

    approve () {
      this.showAuthorize = false
      this.requestApproveAccess({
        workstationId: this.workstation.id,
        recognitionId: this.recognition.recognizerId
      }).then(() => {
        this.pushAlertSuccess('Acesso liberado!')
      }).catch(() => (this.showAuthorize = true))
    }
  }
})
</script>

<style scoped>
.avatar-container {
  height: 10em;
}

.user-avatar {
  max-width: 100%;
  max-height: 100%;
  height: auto;
}
</style>
