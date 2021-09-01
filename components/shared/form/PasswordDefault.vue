<template>
  <v-text-field
    v-model="content"
    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
    :label="$t(label)"
    :placeholder="$t(label)"
    :error-messages="error"
    :autocomplete="false"
    :type="show ? 'text' : 'password'"
    outlined
    @click:append="show = !show"
    @keydown.enter="$emit('enterkey')"
  />
</template>

<script>
import App from '/components/App'

export default App.extend({
  name: 'PasswordDefault',

  props: {
    label: {
      type: String,
      required: true
    },

    value: {
      type: [String, Number],
      required: false,
      default: ''
    },

    error: {
      type: Array,
      required: false
    }
  },

  computed: {
    content: {
      get () {
        return this.value
      },

      set (val) {
        this.$emit('input', val)
      }
    }
  },

  data () {
    return {
      show: false
    }
  }
})
</script>
