<template>
  <v-card class="mx-auto">
    <v-card-actions>
      <v-btn
        block
        color="dark"
        text
        class="d-flex justify-space-between"
        @click="show = !show"
      >
        <div>
          <v-icon v-if="icon" class="mr-2">
            {{ icon }}
          </v-icon>

          {{ title }}
        </div>

        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider />

        <v-card-text>
          <slot />
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import App from '~/components/App'
export default App.extend({
  name: 'CollapseCard',

  props: {
    title: {
      type: String
    },

    icon: {
      type: String,
      required: false,
      default: () => ''
    },

    showContent: {
      type: Boolean,
      required: false,
      default: () => true
    }
  },

  data () {
    return {
      show: this.showContent
    }
  }
})
</script>
