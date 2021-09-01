<template>
  <div
    v-if="hasAlerts"
    class="alerts"
  >
    <v-alert
      v-for="(alert, index) in alerts"
      :key="`alert-${index}`"
      dismissible
      :type="alert.type"
      @input.once="handleRemove(alert)"
    >
      <div
        v-if="alert.title"
        class="title"
      >
        {{ alert.title }}
      </div>
      <div>{{ alert.message }}</div>
    </v-alert>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import App from '/components/App'

export default App.extend({
  name: 'Alerts',

  data () {
    return { open: true }
  },

  computed: {
    ...mapGetters(['alerts', 'hasAlerts'])
  },

  methods: {
    ...mapActions(['removeAlert']),

    handleRemove (alert) {
      this.removeAlert(alert)
    }
  }
})
</script>

<style lang="scss" scoped>
.alerts {
  position: fixed;
  right: 12px;
  top: 80px;
  max-width: 420px;
  width: 100%;
  z-index: 203;

  @media screen and (max-width: 960px) {
    max-width: calc(100% - 80px);
  }
}
</style>
