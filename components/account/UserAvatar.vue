<template>
  <div class="text-center">
    <v-avatar size="100%" tile class="user-avatar" min-height="100px">
      <v-img :src="currentUser.avatar" />
    </v-avatar>

    <button-default :block="false" label="Atualizar foto" class="mt-3" />
  </div>
</template>

<script lang="ts">
import App from '~/components/App'
import ButtonDefault from '~/components/shared/form/ButtonDefault.vue'

export default App.extend({
  name: 'UserAvatar',

  components: { ButtonDefault }
})
</script>
<style scoped>
.user-avatar {
  border: 1px solid black;
}
</style>
