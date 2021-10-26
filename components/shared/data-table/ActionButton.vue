<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <v-btn
        :small="small"
        :color="color"
        class="my-1 action-button"
        :class="buttonClass"
        v-bind="attrs"
        v-on="on"
        @click="$emit('click')"
      >
        <v-icon :small="iconSmall">
          {{ icon }}
        </v-icon>
      </v-btn>
    </template>
    {{ tooltipText }}
  </v-tooltip>
</template>

<script lang="ts">
export default {
  name: 'ActionButton',

  props: {
    small: {
      type: Boolean,
      required: false,
      default: () => true
    },
    iconSmall: {
      type: Boolean,
      required: false,
      default: () => false
    },

    color: {
      type: String,
      required: true,
      default: () => 'primary'
    },

    icon: {
      type: String,
      required: false,
      default: () => ''
    },

    tooltipText: {
      type: String,
      required: false,
      default: () => ''
    },

    buttonClass: {
      type: String,
      required: false,
      default: () => ''
    }
  }
}
</script>

<style scoped>
.action-button {
  min-width: 40px !important;
  padding: 0 !important;
}
</style>
