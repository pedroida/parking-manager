<template>
  <v-text-field
    v-model="content"
    v-mask="mask"
    dense
    :label="rawLabel ? rawLabel : $t(label)"
    :error-messages="error"
    :maxlength="maxlength"
    :autocomplete="false"
    :disabled="disabled"
    :placeholder="placeholder ? $t(placeholder) : (rawLabel ? rawLabel : $t(label))"
    outlined
    :hide-details="hideDetails"
    background-color="white"
    @keydown.enter="$emit('enterkey')"
  />
</template>

<script>
import App from '~/components/App'

export default App.extend({
  name: 'PortInput',

  props: {
    hideDetails: {
      type: [String, Boolean],
      required: false,
      default: () => false
    },
    label: {
      type: String,
      required: false,
      default: () => ''
    },

    rawLabel: {
      type: String,
      required: false,
      default: () => ''
    },

    placeholder: {
      type: String,
      required: false,
      default: () => ''
    },

    value: {
      type: [String, Number],
      required: false,
      default: ''
    },

    error: {
      type: Array,
      required: false
    },

    maxlength: {
      type: [String, Number],
      required: false
    },

    disabled: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },

  computed: {
    content: {
      get () {
        return this.value
      },

      set (value) {
        this.$emit('input', value)
      }
    }
  },

  watch: {
    content () {
      this.mask = '#####'
    }
  },

  data: () => {
    return {
      mask: '#####'
    }
  }
})
</script>
