<template>
  <v-card class="mx-auto">
    <v-card-actions>
      <v-btn
        block
        color="dark"
        text
        class="d-flex justify-space-between"
        @click="toggleShow"
      >
        <div>
          <slot name="header">
            <v-icon v-if="icon" class="mr-2">
              {{ icon }}
            </v-icon>

            {{ title }}
          </slot>
        </div>

        <v-icon v-if="!preventCollapse">
          {{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
        </v-icon>
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
    },

    preventCollapse: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },

  data () {
    return {
      show: this.showContent
    }
  },

  methods: {
    toggleShow () {
      if (!this.preventCollapse) {
        this.show = !this.show
      }
    }
  }
})
</script>
