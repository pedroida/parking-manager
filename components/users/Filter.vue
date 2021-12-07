<template>
  <v-row>
    <v-col cols="12" md="4">
      <input-default v-model="pagination.nameOrEmail" label="Nome ou E-mail" />
    </v-col>
    <v-col cols="12" md="4">
      <select-default
        v-model="pagination.type"
        label="Tipo do usuário"
        :items="userTypeItems"
        item-text="label"
        item-value="value"
      />
    </v-col>
    <v-col cols="12" md="4">
      <button-default label="Filtrar" class=" px-10" icon="mdi-magnify" @click="filter" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import App from '~/components/App'
import InputDefault from '~/components/shared/form/InputDefault.vue'
import SelectDefault from '~/components/shared/form/SelectDefault.vue'
import ButtonDefault from '~/components/shared/form/ButtonDefault.vue'
import { UsersPaginationFactory } from '~/entity/factories/UsersPaginationFactory'

export default App.extend({
  name: 'UsersFilter',
  components: { ButtonDefault, SelectDefault, InputDefault },

  computed: {
    userTypeItems () {
      return [
        { label: 'Todos', value: 'ALL' },
        { label: 'Servidor', value: 'SERVICE' },
        { label: 'Estudante', value: 'STUDENTS' },
        { label: 'Palestrante', value: 'SPEAKER' }
      ]
    }
  },

  data () {
    return {
      pagination: UsersPaginationFactory()
    }
  },

  methods: {
    filter () {
      this.$emit('filter', this.pagination)
    }
  }
})
</script>

<style scoped>

</style>
