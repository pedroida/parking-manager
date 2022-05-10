<template>
  <v-btn
    rounded
    :color="color"
    :block="block"
    :small="small"
    :x-large="xLarge"
    class="text-transform-none"
    :disabled="disabled"
    :loading="loading"
    @click="$emit('click')"
  >
    <v-icon v-if="icon" :class="{ 'mr-2': label }" :small="iconSmall">
      {{ icon }}
    </v-icon>
    {{ $t(label) }}
  </v-btn>
</template>

<script>
import App from '~/components/App'

export default App.extend({
  name: 'ButtonDefault',

  props: {
    icon: {
      type: String,
      required: false,
      default: () => null
    },

    label: {
      type: String,
      required: false,
      default: () => ''
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
      default: false
    },

    small: {
      type: Boolean,
      required: false,
      default: false
    },

    iconSmall: {
      type: Boolean,
      required: false,
      default: false
    },

    block: {
      type: Boolean,
      required: false,
      default: true
    },

    color: {
      type: String,
      required: false,
      default: () => 'primary'
    }
  }
})
</script>

<style lang="scss" scoped>
.text-transform-none { text-transform: none !important; }
</style>
