<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <v-btn :small="small" :color="color" class="my-1 action-button" :class="buttonClass" v-bind="attrs" v-on="on">
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
      type: String
    },

    icon: {
      type: String
    },

    tooltipText: {
      type: String
    },

    buttonClass: {
      type: String
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
