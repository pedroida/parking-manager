<template>
  <v-tooltip left v-if="hasCarsWaiting">
    <template #activator="{ on, attrs }">
      <v-badge
        color="error"
        left
        overlap
        dot
        transition="slide-x-transition"
      >
        <v-icon
          color="black"
          @click="goTo({ name: 'cars-waiting' })"
          v-bind="attrs"
          v-on="on"
        >
          mdi-car
        </v-icon>
      </v-badge>
    </template>
    <span>Existem carros aguardando análise</span>
  </v-tooltip>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex'
import App from '~/components/App'
export default App.extend({
  name: 'CarsWaitingNotification',

  mounted () {
    this.listenWebsocket()
  },

  computed: {
    ...mapGetters('car-waiting', ['hasCarsWaiting'])
  },

  methods: {
    ...mapActions('car-waiting', ['listenWebsocket'])
  }
})
</script>

<style scoped>

</style>
