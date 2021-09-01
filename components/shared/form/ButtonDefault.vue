<template>
  <v-btn
    rounded
    color="primary"
    :block="block"
    :x-large="xLarge"
    class="text-transform-none"
    :disabled="disabled"
    :loading="loading"
    @click="$emit('click')"
  >
    {{ $t(label) }}
  </v-btn>
</template>

<script>
import App from '/components/App'

export default App.extend({
  name: 'ButtonDefault',

  props: {
    label: {
      type: String,
      required: true
    },

    disabled: {
      type: Boolean,
      required: false,
      default: false
    },

    loading: {
      type: Boolean,
      required: false,
      default: false
    },

    xLarge: {
      type: Boolean,
      required: false,
      default: true
    },

    block: {
      type: Boolean,
      required: false,
      default: true
    }
  }
})
</script>

<style lang="scss" scoped>
.text-transform-none { text-transform: none !important; }
</style>
