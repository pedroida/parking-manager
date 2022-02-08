<template>
  <modal-default :open="editPasswordModal" hide-submit header-title="Editar senha" @close="editPasswordModal = false">
    <template #activator>
      <button-default
        :block="false"
        label="Alterar senha"
        class="mt-3 float-md-right"
        @click="editPasswordModal = !editPasswordModal"
      />
    </template>

    <template #body>
      <password-default v-model="actualPassword" label="Senha atual" />
      <password-default v-model="password" label="Senha" :error="passwordLengthError" />
      <password-default v-model="confirmPassword" label="Confirmar Senha" :error="confirmPasswordError" />
    </template>

    <template #actions>
      <button-default :disabled="!validPassword" :loading="loading" label="Salvar" @click="update" />
    </template>
  </modal-default>
</template>

<script lang="ts">
import { mapActions } from 'vuex'
import App from '~/components/App'
import ButtonDefault from '~/components/shared/form/ButtonDefault.vue'
import PasswordDefault from '~/components/shared/form/PasswordDefault.vue'
import ModalDefault from '~/components/shared/modal.vue'

export default App.extend({
  name: 'UserEditPassword',

  components: { ModalDefault, ButtonDefault, PasswordDefault },

  data () {
    return {
      actualPassword: '',
      password: '',
      confirmPassword: '',
      editPasswordModal: false,
      loading: false
    }
  },

  computed: {
    validPassword () {
      return (this.actualPassword && this.password && this.confirmPassword) &&
        this.password === this.confirmPassword &&
        this.passwordLength
    },

    passwordLength () {
      return String(this.password).length && (String(this.password).length >= 8 && String(this.password).length <= 16)
    },

    passwordLengthError () {
      if (!this.passwordLength) {
        return ['A senha deve possuir entre 8 e 16 caracteres']
      }
    },

    confirmPasswordError () {
      if (this.password !== this.confirmPassword) {
        return ['A confirmação de senha não confere']
      }
    }
  },

  methods: {
    ...mapActions('current-user', ['updatePassword']),
    update () {
      if (!this.validPassword) {
        return false
      }
      this.loading = true
      this.updatePassword({ actualPassword: this.actualPassword, password: this.password, confirmPassword: this.confirmPassword })
        .then(() => {
          this.editPasswordModal = false
          this.pushAlertSuccess('Senha alterada com sucesso. Por favor, realize o login novamente!')
        }).catch((error: any) => {
          this.pushAlertError(error.response?.data?.message || 'Houve um problema ao atualizar a senha')
        }).finally(() => {
          this.loading = false
        })
    }
  }
})
</script>
<style scoped>
</style>
