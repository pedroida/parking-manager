<template>
  <v-select
    v-model="selected"
    dense
    :items="items"
    :item-value="itemValue"
    :item-text="itemText"
    :error-messages="error"
    :return-object="returnObject"
    :label="rawLabel ? rawLabel : $t(label)"
    :placeholder="placeholder ? $t(placeholder) : (rawLabel ? rawLabel : $t(label))"
    :disabled="disabled"
    background-color="white"
    :hide-details="hideDetails"
    outlined
  >
    <template #no-data>
      <small class="pl-3">
        Nenhum item encontrado
      </small>
    </template>
  </v-select>
</template>

<script>
import App from '~/components/App'

export default App.extend({
  name: 'SelectDefault',

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

    items: {
      type: Array,
      required: true
    },

    itemValue: {
      type: String,
      required: false
    },

    itemText: {
      type: String,
      required: false
    },

    returnObject: {
      type: Boolean,
      required: false,
      default: false
    },

    value: {
      type: [String, Number, Object],
      required: false,
      default: ''
    },

    error: {
      type: Array,
      required: false
    },

    disabled: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },

  computed: {
    selected: {
      get () {
        return this.value
      },

      set (val) {
        this.$emit('input', val)
      }
    }
  }
})
</script>
