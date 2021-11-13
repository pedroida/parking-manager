<template>
  <div>
    <input-default v-model="user.name" label="Nome *" :error="getErrorMessage('name')" />
    <student-email-default v-model="user.email" label="E-mail *" :error="getErrorMessage('email')" @is-valid="validateEmail" />

    <password-default v-model="user.password" label="Senha *" :error="getErrorMessage('password')" />
    <password-default v-model="user.confirmPassword" label="Confirmar senha *" :error="getErrorMessage('confirmPassword')" />

    <small class="red--text">* Campos obrigatórios</small>
  </div>
</template>

<script lang="ts">
import App from '~/components/App'
import User from '~/entity/User'
import StudentEmailDefault from '~/components/shared/form/EmailDefault.vue'
import InputDefault from '~/components/shared/form/InputDefault.vue'
import PasswordDefault from '~/components/shared/form/PasswordDefault.vue'

export default App.extend({
  name: 'RegisterForm',

  components: { StudentEmailDefault, PasswordDefault, InputDefault },

  props: {
    value: {
      type: User
    },
    errors: {
      type: []
    }
  },

  data () {
    return {
      validEmail: true,
      validModel: true
    }
  },

  computed: {
    user: {
      get (): User {
        return this.value
      },
      set (value: User) {
        this.$emit('input', value)
      }
    }
  },

  methods: {
    validateEmail (isValid: boolean) {
      this.validEmail = isValid
    },

    getErrorMessage (field: string) {
      const error = this.errors.find((errorItem: any) => {
        return errorItem.field === field
      })
      if (error) {
        return [error.descriptionError]
      }
    }
  }
})
</script>

<style scoped>

</style>
