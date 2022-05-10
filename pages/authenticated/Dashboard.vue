<template>
  <v-row>
    <v-col cols="12" class="d-flex flex-column justify-center align-center mt-15">
      <img src="~/assets/images/xenon.png" alt="" class="logo mb-5">

      <p>Bem-vindo ao Sistema Xenon</p>
    </v-col>

    <admin-dashboard v-if="internalCurrentUser" />
  </v-row>
</template>

<script lang="ts">
import App from '~/components/App'
import AdminDashboard from '~/components/dashboard/Admin.vue'

export default App.extend({
  name: 'Dashboard',
  components: { AdminDashboard }
})
</script>

<style scoped>
.logo {
  width: 300px;
  max-width: 80%;
}
</style>
