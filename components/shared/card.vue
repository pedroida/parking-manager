<template>
  <v-card class="mb-2 pa-5" :color="color">
    <v-card-title v-if="!hideTitle" class="card-title text-center d-block">
      <slot name="title" />
    </v-card-title>
    <v-card-text :class="{ 'height-inherit': heightInherit }">
      <slot />
    </v-card-text>
  </v-card>
</template>

<script>
import App from '~/components/App'

export default App.extend({
  name: 'Card',

  props: {
    heightInherit: {
      type: Boolean,
      required: false,
      default: () => false
    },

    color: {
      type: String,
      required: false,
      default: () => 'white'
    },

    hideTitle: {
      type: Boolean,
      required: false,
      default: () => false
    }
  }
})
</script>

<style lang="scss" scoped>
  .card-title {
    width: 100%;
  }

  .height-inherit {
    height: inherit;
  }
</style>
