<template>
  <modal header-title="Desabilitar usuário" header-color="error" hide-submit :open="open" @close="open = false">
    <template #body>
      <text-area-default v-model="reason" label="Motivo da remoção" placeholder="Descreva o motivo da remoção do usuário" />

      <button-default :disabled="!reason" color="error" label="Confirmar" @click="submit" />
    </template>
  </modal>
</template>

<script lang="ts">
import { mapActions } from 'vuex'
import User from '../../entity/User'
import App from '~/components/App'
import Modal from '~/components/shared/modal.vue'
import TextAreaDefault from '~/components/shared/form/TextAreaDefault.vue'
import ButtonDefault from '~/components/shared/form/ButtonDefault.vue'

export default App.extend({
  name: 'DisableUserModal',

  components: { Modal, TextAreaDefault, ButtonDefault },

  mounted () {
    this.$root.$on('disable-user', (user: User) => {
      this.reason = ''
      this.userId = user.id
      this.open = true
    })
  },

  data () {
    return {
      open: false,
      userId: null,
      reason: ''
    }
  },

  methods: {
    ...mapActions('user', ['disableUser']),

    submit () {
      if (!this.reason) {
        return
      }

      this.disableUser({
        userId: this.userId,
        reason: this.reason
      }).then(() => {
        this.pushAlertSuccess('Usuário desabilitado com sucesso!')
      })
    }
  }
})
</script>

<style scoped>

</style>
