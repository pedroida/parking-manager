<template>
  <modal-default :open="editNameModal" hide-submit header-title="Editar nome" @close="editNameModal = false">
    <template #activator>
      <v-btn rounded icon color="primary" @click="editNameModal = !editNameModal">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>

    <template #body>
      <input-default v-model="name" :value="currentUser.name" label="Nome" />
    </template>

    <template #actions>
      <button-default :loading="loading" label="Salvar" @click="update" />
    </template>
  </modal-default>
</template>

<script lang="ts">
import { mapActions } from 'vuex'
import App from '~/components/App'
import ButtonDefault from '~/components/shared/form/ButtonDefault.vue'
import InputDefault from '~/components/shared/form/InputDefault.vue'
import ModalDefault from '~/components/shared/modal.vue'

export default App.extend({
  name: 'UserEditName',

  components: { ModalDefault, ButtonDefault, InputDefault },

  mounted () {
    this.name = this.currentUser.name
  },

  data () {
    return {
      name: '',
      editNameModal: false,
      loading: false
    }
  },

  methods: {
    ...mapActions('user', ['updateName']),
    update () {
      this.loading = true
      this.updateName(this.name)
        .then((response: any) => {
          this.editNameModal = false
          this.pushAlertSuccess(response.result)
        }).catch((error: any) => {
          this.pushAlertError(error.response?.data?.message || 'Houve um problema ao atualizar o nome')
        }).finally(() => {
          this.loading = false
        })
    }
  }
})
</script>
<style scoped>
</style>
