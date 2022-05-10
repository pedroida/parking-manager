<template>
  <v-app>
    <alerts />
    <nuxt />
  </v-app>
</template>

<script>
import Alerts from '~/components/layouts/Alerts'
export default {
  components: {
    Alerts
  }
}
</script>
