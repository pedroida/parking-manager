<template>
  <div class="text-center">
    <v-avatar size="100%" tile class="user-avatar" min-height="100px">
      <img :src="currentUser.avatar" alt="avatar usuário">
    </v-avatar>

    <button-default :loading="loading" :block="false" label="Atualizar foto" class="mt-3" @click="upload" />

    <input
      ref="uploader"
      class="d-none"
      type="file"
      accept="image/png, image/jpeg, image/pjpg"
      @change="onFileChanged"
    >
  </div>
</template>

<script lang="ts">
import { mapActions } from 'vuex'
import App from '~/components/App'
import ButtonDefault from '~/components/shared/form/ButtonDefault.vue'

export default App.extend({
  name: 'UserAvatar',

  components: { ButtonDefault },

  data () {
    return {
      selectedFile: null,
      loading: false
    }
  },

  methods: {
    ...mapActions('user', ['profileUpdateAvatar']),

    upload () {
      this.loading = true
      window.addEventListener('focus', () => {
        this.loading = false
      }, { once: true })

      this.$refs.uploader.click()
    },
    onFileChanged (e: any) {
      this.loading = true
      this.selectedFile = e.target.files[0]
      this.profileUpdateAvatar(this.selectedFile)
        .then((response: any) => {
          console.log(response)
        }).finally(() => {
          this.loading = false
          this.selectedFile = null
          e.target.files = null
        })
    }
  }
})
</script>
<style scoped>
.user-avatar {
  border: 1px solid black;
}
</style>
